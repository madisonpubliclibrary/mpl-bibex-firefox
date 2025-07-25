(function(){
  'use strict';

  const pstatMsg = new function() {
    this.send = (type, message, altPSTAT) => {
      const pstatNotice = document.getElementById('pstatNotice');
      const pstatNoticeAlt = document.getElementById('pstatNoticeAlt');
      const targetNotice = altPSTAT ? pstatNoticeAlt : pstatNotice;
      const otherNotice = !altPSTAT ? pstatNoticeAlt : pstatNotice;

      targetNotice.style.display = "block";
      otherNotice.style.display = "none";

      targetNotice.style.color = type;
      targetNotice.textContent = message;
    }
  }();

  /**
   * Processes the given address to make it more accurately interpreted by
   * the Census Geocoder API
   *
   * @param {HTMLElement} addrElt The address element to be processed
   * @param {boolean} encodeForURI Whether the returned string should be URI encoded
   * @return {string} The cleaned, URI encoded address
   */
  const cleanAddr = (addrElt, encodeForURI) => {
    let addr = "";

    if (addrElt && addrElt.value) {
      addr = addrElt.value.trim().toLowerCase()
        .replace(/[^#a-z0-9/ ]/g, '')
        .replace(/ave (\d+)/, 'ave #$1')
        .replace(/ave (apt|unit|fl) ?/, 'ave #')
        .replace(/ c(ou)?n?ty /, ' co ')
        .replace(' highway ', ' hwy ')
        .replace(/ road(?= )?/, ' rd')
        .replace(/ n\.? /, ' north ')
        .replace(/ s\.? /, ' south ')
        .replace(/ e\.? /, ' east ')
        .replace(/ w\.? /, ' west ')
        .replace(/ hl/,' hill')
        .split('#')[0];
    }

    return encodeForURI ? encodeURI(addr) : addr;
   };

  /**
   * Extracts the city from the city/state input element
   *
   * @param {HTMLElement} cityElt The city/state input HTMLElement
   * @param {boolean} encodeForURI Whether the returned string should be URI encoded
   * @return {string} The URI encoded city
   */
  const getCity = (cityElt, encodeForURI) => {
    if (cityElt && cityElt.value) {
      let cityArr = cityElt.value.replace(/[^a-z0-9 \-]+/ig,'').toLowerCase().split(' ');
      cityArr.pop();
      return encodeForURI ? encodeURI(cityArr.join(' ')) : cityArr.join(' ');
    }

    return "";
  }

  // Message colors
  const MSG_SEARCHING = "#337AB7";
  const MSG_SUCCESS = "#00c000";
  const MSG_ERROR = "#c00c00";

  // Only execute script in the patron edit page
  if (/cgi-bin\/koha\/members\/memberentry\.pl/.test(window.location)) {
    // Variables for PSTAT selection
    const addrElt = document.getElementById('address');
    const addrEltAlt = document.getElementById('B_address');
    const cityElt = document.getElementById('city');
    const cityEltAlt = document.getElementById('B_city');
    const zipElt = document.getElementById('zipcode');
    const zipEltAlt = document.getElementById('B_zipcode');
    const selectList = document.getElementsByName('sort1');
    const patronType = document.getElementById('categorycode');
    const pstatNotice = document.createElement('div');
    const pstatNoticeAlt = document.createElement('div');
    const openTIGERwebWrapper = document.createElement('div');
    const openTIGERweb = document.createElement('a');
    const nearestLib = document.createElement('div');
    const mapRegionList = document.createElement('select');
    const gmapResponse = document.createElement('div');
    const lnBrk = document.createElement('br');

    let targetAddr;
    let targetCity;
    let targetZip;

    const branchList = document.getElementById('branchcode');
    const madison = document.createElement('option');
    const counties = document.createElement('optgroup');
    const adams = document.createElement('option');
    const columbia = document.createElement('option');
    const dane = document.createElement('option');
    const green = document.createElement('option');
    const portage = document.createElement('option');
    const sauk = document.createElement('option');
    const wood = document.createElement('option');
    const scls = document.createElement('option');

    // Build Google Map elements
    nearestLib.id = "nearestLib";
    nearestLib.textContent = "Click to find closest location within...";
    nearestLib.style = "margin-top:0.8em;margin-left:118px;cursor:pointer;color:#337AB7;"+
        "font-size:1.25em;font-weight:bold;font-style:italic;display:none";
    nearestLib.onmouseover = function() {
      document.getElementById('nearestLib').style.color = "#4A90D9";
    };
    nearestLib.onmouseout = function() {
      document.getElementById('nearestLib').style.color = "#337AB7";
    };

    mapRegionList.id = "mapRegionList";
    mapRegionList.style = "margin-left:25px;cursor:pointer;display:none;";

    gmapResponse.id = "gmapResponse";
    gmapResponse.style = "margin-top:0.8em;margin-left:118px;font-size:1.25em;" +
        "font-weight:bold;font-style:italic;display:none";

    scls.textContent = "SCLS";
    scls.value = "SCLS";
    scls.selected = true;
    mapRegionList.appendChild(scls);

    madison.textContent = "Madison";
    madison.value = "MPL";
    mapRegionList.appendChild(madison);

    counties.label = "Counties";

    adams.textContent = "Adams County";
    adams.value = "Adams";
    counties.appendChild(adams);

    columbia.textContent = "Columbia County";
    columbia.value = "Columbia";
    counties.appendChild(columbia);

    dane.textContent = "Dane County";
    dane.value = "Dane";
    counties.appendChild(dane);

    green.textContent = "Green County";
    green.value = "Green";
    counties.appendChild(green);

    portage.textContent = "Portage County";
    portage.value = "Portage";
    counties.appendChild(portage);

    sauk.textContent = "Sauk County";
    sauk.value = "Sauk";
    counties.appendChild(sauk);

    wood.textContent = "Wood County";
    wood.value = "Wood";
    counties.appendChild(wood);

    mapRegionList.appendChild(counties);

    nearestLib.onclick = function() {
      let selected = document.getElementById('mapRegionList').selectedOptions[0].value;

      browser.runtime.sendMessage({
        "key": "findNearestLib",
        "address": encodeURI(cleanAddr(targetAddr, false) + ", " +
            targetCity.value.toLowerCase()),
        "selected": selected
      }).then(result => {
        branchList.value = result;
        showGMapResponse("Closest Library: " + result, MSG_SUCCESS);
      }, reject => {
        showGMapResponse(reject.message, MSG_ERROR);
      });
    };

    /** Build modal dialog in case the US Census Geocoder matches more than one address */
    // Create modal dialog HTML
    const modal = document.createElement('div');
    modal.classList.add('modal');
    const modalBody = document.createElement('div');
    modalBody.classList.add('modalBody');
    const modalTitle = document.createElement('h1');
    modalTitle.textContent = 'Multiple Addresses Matched';
    let modalText = document.createElement('div');
    modalBody.append(modalTitle,modalText);
    modal.appendChild(modalBody);
    document.body.appendChild(modal);

    function closeModal() {
      modal.classList.remove('open');
      document.body.classList.remove('modalOpen');
    }

    // Close modal by clicking grayed background
    //document.addEventListener('click', e => {
    //  if (e.target.classList.contains('modal')) closeModal();
    //});

    // Create modal styling
    const style = document.createElement('style');
    style.textContent = `
      .modal {display:none;position:fixed;inset:0;z-index:10000;background-color:rgba(0,0,0,.75);padding:40px;overflow:auto;}
      .modal.open {display:block;}
      .modalBody {padding:20px;background:#fff;border-radius:25px;position:fixed;top:650px;}
      body.modalOpen {overflow:hidden;}`;
    document.head.append(style);

    // Add event listeners to the primary address and city fields
    if (addrElt && addrEltAlt && cityElt && cityEltAlt) {
      addrElt.addEventListener('blur', function() {
        if (addrElt.value && cityElt.value && addrElt.value !== 'NA') {
          queryPSTAT(false);
        }
      });

      cityElt.addEventListener('blur', function() {
        if (addrElt.value && cityElt.value && addrElt.value !== 'NA') {
          queryPSTAT(false);
        }
      });

      // Style the notification elements
      pstatNotice.id = "pstatNotice";
      pstatNoticeAlt.id = "pstatNoticeAlt";
      openTIGERweb.id = "openTIGERweb";
      openTIGERweb.textContent = "Click to open TIGERweb";
      pstatNotice.setAttribute('style', 'margin-top:.5em;margin-left:118px;font-size:1.25em;font-weight:bold;font-style:italic;display:none;');
      pstatNoticeAlt.setAttribute('style', 'margin-top:.5em;margin-left:118px;font-size:1.25em;font-weight:bold;font-style:italic;display:none;');
      openTIGERweb.setAttribute('style', 'margin-top:.5em;margin-left:118px;font-size:1.25em;font-weight:bold;font-style:italic;color:' +
          MSG_SEARCHING + ';outline:0;text-decoration:none;');
      openTIGERweb.setAttribute('href','https://tigerweb.geo.census.gov/tigerweb');
      openTIGERweb.setAttribute('target','_blank');
      openTIGERwebWrapper.appendChild(openTIGERweb);

      // Append notification elements to their respective address fields
      addrElt.parentElement.appendChild(pstatNotice);
      addrEltAlt.parentElement.appendChild(pstatNoticeAlt);
    }

    /**
     * Queries the US Census Geocoder and a database of PSTAT exceptions and
     * aldermanic districts to determine the proper "sort 1" code for a
     * patron's record.
     *
     * @param {boolean} findAltPSTAT Whether the the query should use the patron's
     *   primary or alternate address
     */
    const queryPSTAT = function(findAltPSTAT) {
      targetAddr = findAltPSTAT ? addrEltAlt : addrElt;
      targetCity = findAltPSTAT ? cityEltAlt : cityElt;
      targetZip = findAltPSTAT ? zipEltAlt : zipElt;

      lnBrk.style.display = 'none';
      gmapResponse.style.display = 'none';
      toggleGMapSearch(false);
      openTIGERwebWrapper.style.display = 'none';
      pstatMsg.send(MSG_SEARCHING, "Finding PSTAT...", findAltPSTAT);

      browser.runtime.sendMessage({
        "key": "getPSTAT",
        "address": targetAddr.value,
        "addressURI": cleanAddr(targetAddr, true),
        "cityURI": getCity(targetCity, true)
      }).then(result => {
        return new Promise((resolve,reject) => {
          if (result.hasGeoResults && result.matches.length > 1) {
            modalText.textContent = ''; // clear new modal text div
            const modalInstructions = document.createElement('p');
            modalInstructions.textContent = "Select the patron's address from the geocoder results:";
            modalText.appendChild(modalInstructions);

            const ul = document.createElement('ul');
            for (let i = 0; i < result.matches.length; i++) {
              const li = document.createElement('li');
              li.style.margin = '1em 0';
              li.textContent = '[' + result.matches[i].countySub + ']';

              let useMatch = document.createElement('button');
              useMatch.style.marginLeft = '1em';
              useMatch.style.cursor = 'pointer';
              useMatch.textContent = result.matches[i].matchAddr;
              useMatch.setAttribute('data-match-index',i);
              useMatch.addEventListener('click', e => {
                closeModal();
                resolve(result.matches[e.target.getAttribute('data-match-index')]);
              });
              li.appendChild(useMatch);

              ul.appendChild(li);
            }
            modalText.appendChild(ul);

            modal.classList.add('open');
            document.body.classList.add('modalOpen');
          } else if (result.matches.length === 1) {
            resolve(result.matches[0]);
          } else {
            throw new Error('An unknown error occurred.');
          }
        }).then(match => {
          const matchData = {
            "success": false,
            "address": targetAddr.value,
            "city": getCity(targetCity, false),
            "pstat": "X-UND",
            "zip": "",
            "reciprocal": false,
            "error": "An unknown error occurred."
          }

          // If Geocoder returned results fill in data fields
          if (!match.hasOwnProperty('geoError')) {
            matchData.success = true;
            matchData.address = match.matchAddr;
            matchData.city = match.countySub;
            matchData.pstat = match.pstat;
            matchData.zip = match.zip;
            matchData.reciprocal = match.reciprocal;
          }

          const followupFulfilled = match.followupQuery.value.filter(q=>{return q.status === 'fulfilled'});
          // If there were followup queries and at least one was fulfilled
          if (followupFulfilled.length > 0) {
            matchData.success = true;
            matchData.address = targetAddr.value + ', ' + targetCity.value + ', ' + targetZip.value;
            matchData.pstat = followupFulfilled[0].value.pstat;
            matchData.zip = followupFulfilled[0].value.zip;
          } else if (match.hasOwnProperty('geoError')) { // Else if there were no fulfilled followup queries and the geocoder failed
            const followupRejected = match.followupQuery.value.filter(q=>{return q.status === 'rejected'});
            matchData.error = match.geoError + '; ' + followupRejected.map(o => {return o.reason.toString().replace(/^Error: /,'')}).join('; ');
          }

          return matchData
        }).then(matchData => {
          if (matchData.success) {
            // Modify account type if applicable
            if (matchData.reciprocal && /haw|hpb|lak|mad|mea|msb|pin|rdl|seq|smb|dcl|pds/i.test(branchList.value)) {
              patronType.value = "RB";
            }

            // Set PSTAT and Zipcode
            if (matchData.pstat === "MI-NOLIB" || matchData.pstat === "MI-LIB") {
              pstatMsg.send(MSG_ERROR, "Ineligible Address Error: Accounts may not be created for Milwaukee County residents.", findAltPSTAT);
            } else {
              selectList[0].value = matchData.pstat;
              targetZip.value = matchData.zip;
              pstatMsg.send(MSG_SUCCESS, "PSTAT matched with: " + matchData.address, findAltPSTAT);
              toggleGMapSearch(true);
            }
          } else {
            if (/^madison/i.test(targetCity.value)) selectList[0].value = 'D-X-MAD';
            if (/^sun(?:%20| )prairie/i.test(targetCity.value)) selectList[0].value = 'D-X-SUN';
            pstatMsg.send(MSG_ERROR, "Error: " + matchData.error, findAltPSTAT);
            openTIGERwebWrapper.style.display = 'block';

            if (findAltPSTAT) {
              addrEltAlt.parentElement.appendChild(openTIGERwebWrapper);
            } else {
              addrElt.parentElement.appendChild(openTIGERwebWrapper);
            }
          }
        });
      });

      // Append Google Map elements
      branchList.parentElement.appendChild(lnBrk);
      branchList.parentElement.appendChild(gmapResponse);
      branchList.parentElement.appendChild(nearestLib);
      branchList.parentElement.appendChild(mapRegionList);
    };

    const toggleGMapSearch = function(display) {
      if (display) {
        lnBrk.style.display = 'block';
        nearestLib.style.display = 'inline-block';
        mapRegionList.style.display = 'inline-block';
      } else {
        lnBrk.style.display = 'none';
        nearestLib.style.display = 'none';
        mapRegionList.style.display = 'none';
      }
    };

    const showGMapResponse = function(msg, msgColor) {
      if (msg) {
        lnBrk.style.display = 'block';
        gmapResponse.textContent = msg;
        gmapResponse.style.color = msgColor;
        gmapResponse.style.display = "block";
        toggleGMapSearch(false);
      }
    };

    // Listen for alternate address PSTAT request
    browser.runtime.onMessage.addListener(message => {
      if (message.key === "getAlternatePSTAT") {
        queryPSTAT(true);
      }
    });
  }
})();
