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
                while (results.data[i+mergeBelow][2] === "true") {
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
  }
});
