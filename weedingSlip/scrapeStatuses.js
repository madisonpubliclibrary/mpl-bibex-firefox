(function(){
  'use strict';
  return new Promise((resolve, reject) => {
    const waitForItemStatuses = setInterval(() => {
      let bibDetails = document.getElementsByClassName('cat-detail-bib');
      let itemStatuses = document.getElementsByClassName('item-status-group');

      if (bibDetails.length > 0 && itemStatuses.length > 0) {
        clearInterval(waitForItemStatuses);
        let pagination = document.getElementsByClassName('pagination');
        bibDetails = document.querySelectorAll(".cat-detail-bib li");
        let numItems;

        for (let r of bibDetails) {
          if (r.textContent.includes("No of items:")) {
            r.children[0].remove();
            numItems = parseInt(r.textContent.trim());
            break;
          }
        }

        let numPages = Math.ceil(numItems/10);
        if (pagination && pagination.length > 0) pagination = pagination[0];
        let allItems = [];

        scrapeAllItems().then(() => {
          allItems.sort((a,b) => {
            if (a.mplLib > b.mplLib) return 1;
            else if (a.mplLib < b.mplLib) return -1;
            else if (a.lastCKO > b.lastCKO) return 1;
            else if (a.lastCKO < b.lastCKO) return -1;
            else return 0;
          });
          resolve({
            "copies": allItems,
            "nonMPLcopies": numItems - allItems.length
          });
        });

        async function scrapeAllItems() {
          while (numPages-- > 0) {
            let itemPage = await scrapeItemPage(itemStatuses);
            allItems = allItems.concat(itemPage);
            if (pagination) pagination.children[pagination.children.length-2].children[0].click();
            itemStatuses = document.getElementsByClassName('item-status-group');
          }
        }

        async function scrapeItemPage(itemStats) {
          let pageItems = [];

          for (let item of itemStats) {
            let res = await scrapeItem(item);
            if (res) pageItems.push(res);
          }

          return pageItems;
        }

        function scrapeItem(item) {
          let MPLs = {
            //"Dane County Library Service-Dream Bus": "MRS",
            "Madison PL-Ashman": "HPB",
            "Madison PL-Central": "MAD",
            "Madison PL-Goodman South Madison": "SMB",
            "Madison PL-Hawthorne": "HAW",
            "Madison PL-Lakeview": "LAK",
            "Madison PL-Meadowridge": "MEA",
            "Madison PL-Monroe St": "MSB",
            "Madison PL-Pinney": "PIN",
            "Madison PL-Sequoya": "SEQ"
            //"SCLS Electronic Library": "SCL"
          };

          return new Promise((resolve, reject) => {
            let waitForItemData = setInterval(() => {
              let itemData = {};
              const infoRowsLabels = document.querySelectorAll("#" + item.id + " .item-info li .itemlabel");
              const infoRowsData = document.querySelectorAll("#" + item.id + " .item-info li .itemdata");
  
              for (let i = 0; i < infoRowsLabels.length; i++) {
                if (infoRowsLabels[i].textContent.includes("Home library") &&
                    Object.keys(MPLs).includes(infoRowsData[i].textContent.trim())) {
                  itemData.mplLib = MPLs[infoRowsData[i].textContent.trim()];
                }
  
                if (itemData.mplLib === "MAD" && infoRowsLabels[i].textContent.includes("Shelving location")) {
                  itemData.storage = infoRowsData[i].textContent.includes("STORAGE, ASK STAFF FOR HELP");
                }
              }

              if (itemData.hasOwnProperty("mplLib")) {
                const statusRowsLabels = document.querySelectorAll("#" + item.id + " .item-circ-status li .itemlabel");
              
                for (let i = 0; i < statusRowsLabels.length; i++) {
                  if (statusRowsLabels[i].textContent.includes("Lost status")) {
                    const lostSelect = document.querySelectorAll("#" + item.id + " .item-circ-status li:nth-of-type(" + (i+1) + ") .itemdata .form-control.lost");
                    if (lostSelect.length === 1) itemData.lostStatus = lostSelect[0].children[lostSelect[0].selectedIndex].textContent;
                  } else if (statusRowsLabels[i].textContent.includes("Damaged status")) {
                    const dmgSelect = document.querySelectorAll("#" + item.id + " .item-circ-status li:nth-of-type(" + (i+1) + ") .itemdata .form-control.damaged");
                    if (dmgSelect.length === 1) itemData.dmgStatus = dmgSelect[0].children[dmgSelect[0].selectedIndex].textContent;
                  } else if (statusRowsLabels[i].textContent.includes("Custom statuses")) {
                    itemData.otherStatus = Array.from(document.querySelectorAll("#" + item.id + " .applied-statuses .label.statusname")).map(e=>e.textContent.trim()).join('; ');
                  }
                }
    
                const historyRowsLabels = document.querySelectorAll("#" + item.id + " .item-circ-history li .itemlabel");
    
                for (let i = 0; i < historyRowsLabels.length; i++) {
                  if (historyRowsLabels[i].textContent.includes("Total Checkouts")) {
                    const CKOs = document.querySelector("#" + item.id + " .item-circ-history li:nth-of-type(" + (i+1) + ") div.itemdata");
                    if (CKOs) {
                      itemData.bvationCKO = parseInt(CKOs.children[0].children[0].textContent);
                      itemData.YTD = parseInt(CKOs.children[1].children[0].textContent);
                    }
    
                  } else if (historyRowsLabels[i].textContent.includes("Last borrowed")) {
                    const lastCKO = document.querySelector("#" + item.id + " .item-circ-history li:nth-of-type(" + (i+1) + ") span.itemdata");
                    if (lastCKO) {
                      itemData.lastCKO = new Date(lastCKO.textContent);
                    }
                  }
                }
  
                if (itemData.hasOwnProperty("bvationCKO") && itemData.bvationCKO !== NaN && itemData.hasOwnProperty("YTD") && itemData.YTD !== NaN) {
                  clearInterval(waitForItemData);
                  resolve(itemData);
                }
              } else {
                clearInterval(waitForItemData);
                resolve();
              }
            }, 100);
          });
        }
      }
    }, 350);
  });
})();