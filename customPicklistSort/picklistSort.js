browser.storage.sync.get(["picklistLocColSort","picklistPBJFISort"]).then(res => {
  if (res && res.picklistLocColSort && res.picklistPBJFISort) {
    document.getElementById('picklistCSV').style.display = "block";
    document.getElementById('noConfig').style.display = "none";
    const csvInput = document.getElementById('picklistCSV');
    const table = document.getElementById('picklist');
    const queueLength = document.getElementById('queueLength');

    csvInput.addEventListener('change', function() {
      if (this && this.files) {
        const parseInput = new Promise((resolve,reject) => {
          Papa.parse(this.files[0], {
            skipEmptyLines: true,
            complete: function(results,file) {
              let headers = results.data[0];
              results.data.shift(); // Remove header row
              let data = results.data;

              // Get header indexes
              let titleIdx = -1;
              let ccodeIdx = -1;
              let shelvingLocIdx = -1;
              let callNoIdx = -1;
              let enumIdx = -1
              let barcodeIdx = -1;

              for (let i=0; i<headers.length;i++) {
                if (headers[i] === 'Title') titleIdx = i;
                else if (headers[i] === 'Collection') ccodeIdx = i;
                else if (headers[i] === 'Shelving Location') shelvingLocIdx = i;
                else if (headers[i] === 'Call Number') callNoIdx = i;
                else if (headers[i] === 'Enum/Chron') enumIdx = i;
                else if (headers[i] === 'barcode') barcodeIdx = i;
              }
              
              resolve({
                "headers": headers,
                "picklist": data,
                "titleIdx": titleIdx,
                "ccodeIdx": ccodeIdx,
                "shelvingLocIdx": shelvingLocIdx,
                "callNoIdx": callNoIdx,
                "enumIdx": enumIdx,
                "barcodeIdx": barcodeIdx
              });
            }
          });
        });

        const parseLocColSort = new Promise((resolve, reject) => {
          Papa.parse(res.picklistLocColSort, {
            skipEmptyLines: true,
            complete: function(results,file) {
              results.data.shift(); // Remove readers
              let sortArray = [];

              for (let i = 0,mergeBelow = 0; i < results.data.length;) {
                let ccodeCompare = results.data[i][0] + ':' + results.data[i][1];
                while (results.data[i+mergeBelow][2].toLowerCase() === "true") {
                  ccodeCompare += "|";
                  mergeBelow++;
                  ccodeCompare += results.data[i+mergeBelow][0] + ':' + results.data[i+mergeBelow][1];
                }
                sortArray.push(ccodeCompare);
                i+=1+mergeBelow;
                mergeBelow = 0;
              }
              sortArray.push("[A-Z0-9]*:[A-Z0-9]*"); // Float Loc:Ccodes that are not explicitly listed to the bottom

              resolve(sortArray);
            }
          });
        });

        const parsePBJFISort = new Promise ((resolve, reject) => {
          Papa.parse(res.picklistPBJFISort, {
            skipEmptyLines: true,
            complete: function(results, file) {
              results.data.shift(); // Remove readers
              let pbSortArray = [];

              for (let i = 0; i < results.data.length; i++) {
                pbSortArray.push(results.data[i][1]);
              }

              resolve(pbSortArray);
            }
          });
        });

        Promise.all([parseInput, parseLocColSort, parsePBJFISort]).then(values => {
          const headers = values[0].headers,
                picklist = values[0].picklist,
                titleIdx = values[0].titleIdx,
                ccodeIdx = values[0].ccodeIdx,
                shelvingLocIdx = values[0].shelvingLocIdx,
                callNoIdx = values[0].callNoIdx,
                enumIdx = values[0].enumIdx,
                barcodeIdx = values[0].barcodeIdx,
                sortArray = values[1],
                pbSortArray = values[2];

          picklist.sort(function(a,b) {
            let sortIdxA = sortArray.findIndex(e=>(new RegExp("^("+e+")$")).test(a[shelvingLocIdx]+':'+a[ccodeIdx]));
            let sortIdxB = sortArray.findIndex(e=>(new RegExp("^("+e+")$")).test(b[shelvingLocIdx]+':'+b[ccodeIdx]));

            let callNoA = a[callNoIdx] ? a[callNoIdx] : a[enumIdx];
            let callNoB = b[callNoIdx] ? b[callNoIdx] : b[enumIdx];

            if (sortIdxA > sortIdxB) return 1;
            else if (sortIdxA < sortIdxB) return -1;
            else if (a[ccodeIdx] === "PBJFI") {
              let pbSortIdxA = pbSortArray.findIndex(e=>(new RegExp("^"+e)).test(a[callNoIdx]));
              let pbSortIdxB = pbSortArray.findIndex(e=>(new RegExp("^"+e)).test(b[callNoIdx]));

              if (pbSortIdxA > pbSortIdxB) return 1;
              else if (pbSortIdxA < pbSortIdxB) return -1;
            }

            if (callNoA > callNoB) return 1;
            else if (callNoA < callNoB) return -1;
            else return 0;
          });

          for (let row of picklist) {
            let callNo = row[callNoIdx] ? row[callNoIdx] : row[enumIdx];

            let tr = document.createElement('tr');
            let titleTD = document.createElement('td');
            titleTD.textContent = row[titleIdx];
            tr.append(titleTD);
            let locTD = document.createElement('td');
            locTD.textContent = row[shelvingLocIdx];
            tr.append(locTD);
            let ccodeTD = document.createElement('td');
            ccodeTD.textContent = row[ccodeIdx];
            tr.append(ccodeTD);
            let callNoTD = document.createElement('td');
            callNoTD.textContent = callNo;
            tr.append(callNoTD);
            let barcodeTD = document.createElement('td');
            barcodeTD.textContent = row[barcodeIdx].match(/3\d{13}/)[0];
            tr.append(barcodeTD);

            table.append(tr);
          }

          queueLength.textContent = picklist.length;

          window.print();
        });
      }
    });

    function strikeThrough(e) {
      e.target.parentElement.style.textDecoration = 'line-through';
    }
    function removeStrikeThrough(e) {
      e.target.parentElement.style.textDecoration = 'none';
    }

    function makeDraggable(table) {
      return tableDragger.default(table, {
        'mode': 'row',
        'dragHandler': '.handle',
        'onlyBody': 'true',
        'animation': 200
      });
    }

    let locColDragger;

    const editConfigInstructions = document.getElementById('editConfigInstructions');
    const editPicklistConfig = document.getElementById('editPicklistConfig');

    /** Show PBJFI Order **/
    const pbjfiTable = document.getElementById('pbjfiTable');
    const pbjfiBody = document.getElementById('pbjfiBody');

    // Generate initial list order
    const getPBList = new Promise((resolve,reject) => {
      Papa.parse(res.picklistPBJFISort, {
        skipEmptyLines: true,
        complete: function(results, file) {
          results.data.shift(); // Remove headers

          for (let i = 0; i < results.data.length; i++) {
            const pbjfiCatRow = document.createElement('tr');

            const dragMe = document.createElement('td');
            dragMe.classList.add('handle');

            const pbjfiCat = document.createElement('td');
            pbjfiCat.setAttribute('data-pbCode', results.data[i][1]);
            pbjfiCat.textContent = results.data[i][0];

            pbjfiCatRow.append(dragMe);
            pbjfiCatRow.append(pbjfiCat);
            pbjfiBody.append(pbjfiCatRow);
          }
          resolve();
        }
      });
    });
    getPBList.then(() => {
      /* Make rows draggable */
      const pbjfiDragger = makeDraggable(pbjfiTable);
    });

    /* Generate table of Location/Collection sort order */
    const locColTable = document.getElementById('locColTable');
    const locColBody = document.getElementById('locColBody');

    // Generate initial list order
    const getLocColList = new Promise((resolve,reject) => {
      Papa.parse(res.picklistLocColSort, {
        skipEmptyLines: true,
        complete: function(results, file) {
          results.data.shift(); // Remove headers

          for (let i = 0; i < results.data.length; i++) {
            const locColRow = document.createElement('tr');

            const dragMe = document.createElement('td');
            dragMe.classList.add('handle');

            const location = document.createElement('td');
            location.textContent = results.data[i][0];
            location.contentEditable = true;
            location.spellcheck = false;

            const collection = document.createElement('td');
            collection.textContent = results.data[i][1];
            collection.contentEditable = true;
            collection.spellcheck = false;

            const mergeBelow = document.createElement('td');
            mergeBelow.style.textAlign = 'center';

            const checkbox = document.createElement('input');
            checkbox.type = 'checkbox';
            checkbox.checked = results.data[i][2] === 'true';
            mergeBelow.append(checkbox);
            
            const notes = document.createElement('td');
            notes.textContent = results.data[i][3];
            notes.contentEditable = true;

            const del = document.createElement('td');
            del.classList.add('delete');
            del.addEventListener('click', e => {
              e.target.parentElement.remove();
            });
            del.addEventListener('mouseover',strikeThrough);
            del.addEventListener('mouseout',removeStrikeThrough);


            locColRow.append(dragMe, location, collection, mergeBelow, notes, del);
            locColBody.append(locColRow);
          }
          resolve();
        }
      });
    });
    getLocColList.then(() => {
      /* Make rows draggable */
      locColDragger = makeDraggable(locColTable);
    });

    const editConfigButton = document.getElementById('editConfigButton');
    editConfigButton.addEventListener('click', e => {
      if (editConfigButton.classList.contains('edit')) {
        editConfigButton.classList.remove('edit');
        editConfigButton.classList.add('verify');
        editConfigButton.textContent = "Verify Picklist Sort Order";
        editConfigButton.style.background = "#782c54";

        editConfigInstructions.style.display = 'block';
        editPicklistConfig.style.display = 'flex';


        browser.runtime.sendMessage({"key": "addPicklistContextMenu"});
        browser.runtime.onMessage.addListener(message => {
          if (message.key === "insertBelow") {
            const newRow = document.createElement('tr');
            const newDragMe = document.createElement('td');
            newDragMe.classList.add('handle');

            const newLoc = document.createElement('td')
            newLoc.contentEditable = true;
            newLoc.spellcheck = false;

            const newCol = document.createElement('td');
            newCol.contentEditable = true;
            newCol.spellcheck = false;

            const newMerge = document.createElement('td');
            newMerge.style.textAlign = 'center';

            const newCheckbox = document.createElement('input');
            newCheckbox.type = 'checkbox';
            newMerge.append(newCheckbox);

            const newNotes = document.createElement('td');
            newNotes.contentEditable = true;

            const newDel = document.createElement('td');
            newDel.classList.add('delete');
            newDel.addEventListener('click', e => {
              e.target.parentElement.remove();
            });
            newDel.addEventListener('mouseover',strikeThrough);
            newDel.addEventListener('mouseout',removeStrikeThrough);

            newRow.append(newDragMe, newLoc, newCol, newMerge, newNotes, newDel);
            
            const td = browser.menus.getTargetElement(message.contextInfo.targetElementId);
            td.parentElement.after(newRow);

            /* Refresh draggable table */
            locColDragger.destroy();
            locColDragger = makeDraggable(locColTable);
          }
        });

      } else if (editConfigButton.classList.contains('verify')) {
        let locationWarn = 0;
        let collectionWarn = 0;

        for (const row of locColBody.children) {
          const locationTD = row.children[1];
          const collectionTD = row.children[2];

          if (!locationCodes.hasOwnProperty(locationTD.textContent)) {
            locationTD.style.color = "red";
            locationTD.style.fontWeight = "bold";
            locationWarn++;
          } else {
            locationTD.style.color = "black";
            locationTD.style.fontWeight = "normal";
          }

          if (!collectionCodes.hasOwnProperty(collectionTD.textContent)) {
            collectionTD.style.color = "red";
            collectionTD.style.fontWeight = "bold";
            collectionWarn++;
          } else {
            collectionTD.style.color = "black";
            collectionTD.style.fontWeight = "normal";
          }
        }
        let saveButton = document.getElementById('saveConfigButton');
        saveButton.style.display = 'block';

        saveButton.addEventListener('click', e => {
          let pbjfiCSV = "category,code\r\n";
          for (const row of pbjfiBody.children) {
            pbjfiCSV += row.children[1].textContent + ',' + row.children[1].getAttribute('data-pbcode') + '\r\n';
          }

          let locColCSV = "location,collection,merge_below,notes\r\n";
          for (const row of locColBody.children) {
            locColCSV += row.children[1].textContent.trim() + ',' + row.children[2].textContent.trim() + ',';
            if (row.children[3].children[0].checked) locColCSV += 'true';
            locColCSV += ',' + row.children[4].textContent.trim() + '\r\n';
          }

          const currDate = (new Date()).toLocaleString().toLowerCase().replace(/:\d\d /,"");
          browser.storage.sync.set({
            "picklistLocColSortName": "customLocColSort.csv",
            "picklistLocColSort": locColCSV.trim(),
            "picklistLocColSortUploadDate": currDate,
            "picklistPBJFISortName": "customPBJFISort.csv",
            "picklistPBJFISort": pbjfiCSV.trim(),
            "picklistPBJFISortUploadDate": currDate
          }).then(() => {
            alert("Configuration saved!");
            window.location.reload();
          });

        });

        alert(locationWarn + " location code(s) and " + collectionWarn
        + " collection code(s) did not match SCLS documentation, last updated 8/8/2022."
        + " please confirm the codes in red are typed correctly and either"
        + " verify the codes again, or save the sort order.");
      }
    });
  }
});
