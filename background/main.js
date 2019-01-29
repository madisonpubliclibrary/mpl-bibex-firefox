var setIcon = function() {
  browser.storage.sync.get('skin').then((res) => {
    var skin = res.hasOwnProperty('skin') ? res.skin : 'MAD'

    switch (skin) {
      case "MID":
        browser.browserAction.setIcon({
          path: {
            16: "content/img/mid-icon-16.png",
            32: "content/img/mid-icon-32.png",
            48: "content/img/mid-icon-48.png",
            64: "content/img/mid-icon-64.png",
            128: "content/img/mid-icon-128.png"
          }
        });
        break;
      case "SCLS":
        browser.browserAction.setIcon({
          path: {
            16: "content/img/scls-icon-16.png",
            32: "content/img/scls-icon-32.png",
            48: "content/img/scls-icon-48.png",
            64: "content/img/scls-icon-64.png",
            128: "content/img/scls-icon-128.png"
          }
        });
        break;
      case "SUN":
        browser.browserAction.setIcon({
          path: {
            16: "content/img/sun-icon-16.png",
            32: "content/img/sun-icon-32.png",
            48: "content/img/sun-icon-48.png",
            64: "content/img/sun-icon-64.png",
            128: "content/img/sun-icon-128.png"
          }
        });
        break;
      default:
        browser.browserAction.setIcon({
          path: {
            16: "content/img/mpl-icon-16.png",
            32: "content/img/mpl-icon-32.png",
            48: "content/img/mpl-icon-48.png",
            64: "content/img/mpl-icon-64.png",
            128: "content/img/mpl-icon-128.png"
          }
        });
    }
  });
};

// Load preference-selected function files
browser.webNavigation.onCompleted.addListener(details => {
  browser.storage.sync.get().then(res => {
    if (!res.hasOwnProperty('lookupPSTAT') || (res.hasOwnProperty('lookupPSTAT') && res.lookupPSTAT)) {
      browser.tabs.executeScript(details.tabId, {
        file: "/content/scripts/opt/selectPSTAT.js",
        allFrames: true
      });
    }
  });
});

browser.runtime.onMessage.addListener((request, sender, sendResponse) => {
  var responseData = {},
    response = new Promise(resolve, reject)

  switch (request.key) {
    case "updateExtensionIcon":
      setIcon();
      break;
    case "addLostCardNote":
      browser.tabs.executeScript({
        file: "/browserAction/scripts/addLostCardNote.js"
      });
      break;
    case "queryGeocoder":
      /**
       * Query the Census website for data simultaneously in two different ways:
       *
       * 1) A JSON request is made using the Census Geocoder API.
       * 2) An American FactFinder tab is silently opened, a search is performed
       *    based on the address, and the results table is scrapped for data.
       *
       * The data from whichever method returns (positively) first, is used.
       */
      var matchAddr, county, countySub, censusTract, zip;

      // Method 1: Census geocoder
      const baseURL = "https://geocoding.geo.census.gov/geocoder/geographies/address?street="
        countyURL = baseURL + request.addressURI + "&city=" + request.city
            + "&state=wi&benchmark=Public_AR_Current&vintage=Current_Current&layers=Counties&format=json",
        countySubdivisionURL = baseURL + request.addressURI + "&city=" + request.city
            + "&state=wi&benchmark=Public_AR_Current&vintage=Current_Current&layers=County+Subdivisions&format=json",
        censusTractURL = baseURL + request.addressURI + "&city=" + request.city
            + "&state=wi&benchmark=Public_AR_Current&vintage=Current_Current&layers=Census Tracts&format=json";

      const getCounty = fetch(countyURL, {"method": "GET"}).then(response => {
        if(!response.ok) {
          throw new Error('HTTP error, status = ' + response.status);
        }
        return response.json();
      });

      const getCountySub = fetch(countySubdivisionURL, {"method": "GET"}).then(response => {
        if(!response.ok) {
          throw new Error('HTTP error, status = ' + response.status);
        }
        return response.json();
      });

      const getCensusTract = fetch(censusTractURL, {"method": "GET"}).then(response => {
        if(!response.ok) {
          throw new Error('HTTP error, status = ' + response.status);
        }
        return response.json();
      });

      return Promise.all([getCounty,getCountySub,getCensusTract]).then(vals => {
        var countyData = vals[0], countySubData = vals[1],
            censusTractData = vals[2];

        if (countyData && countyData.result && countyData.result.addressMatches.length > 0 &&
            countySubData && countySubData.result && censusTractData &&
            censusTractData.result) {
          const lastIdx = countyData.result.addressMatches.length - 1;

          countyData = countyData.result.addressMatches[lastIdx];
          countySubData = countySubData.result.addressMatches[lastIdx];
          censusTractData = censusTractData.result.addressMatches[lastIdx];

          matchAddr = countyData.matchedAddress.split(',')[0].toUpperCase();
          county = countyData.geographies.Counties[0].BASENAME;
          countySub = countySubData.geographies['County Subdivisions'][0].NAME;
          zip = countyData.addressComponents.zip;
          censusTract = censusTractData.geographies['Census Tracts'];
          if (censusTract) censusTract = censusTract[0].BASENAME;

          if (matchAddr && county && countySub && censusTract && zip) {
            console.log(matchAddr +"|"+ county +"|"+ countySub +"|"+ censusTract +"|"+ zip);
            return Promise.resolve({
              "key": returnCensusData,
              "matchAddr": matchAddr,
              "county": county,
              "countySub": countySub,
              "censusTract": censusTract,
              "zip": zip
            });
          }
        } else {
          //TODO: Handle error
        }
      });
      break;
    case "getPstatException":
      const pstatURL = "https://mpl-bibex.lrschneider.com/pstats/" + request.lib
          + "?val=all&regex=true";
      const getPSTAT = fetch(pstatURL, {"method": "GET"}).then(response => {
        if(!response.ok) {
          throw new Error('HTTP error, status = ' + response.status);
        }
        return response.json();
      });

      getPSTAT.then(json => {
        console.log(json);
      });
      break;
    case "alternatePSTAT":
      break;
  }
});
