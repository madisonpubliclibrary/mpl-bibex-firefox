(function(){
  'use strict';
  return new Promise((resolve, reject) => {
    let data = {'ytd': 0, 'totalUse': 0};
    let itemBC = location.search.match(/mbxItemBC=3[0-9]{13}/)[0].match(/3[0-9]{13}/)[0];

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

        scrapeAllItems().then(res => {
          resolve(res.data);
        });

        async function scrapeAllItems() {
          while(numPages-- > 0) {
            let scrapedPage = await scrapeItemPage(itemStatuses);
            if (scrapedPage.found) return scrapedPage;
            if (pagination) pagination.children[pagination.children.length-2].children[0].click();
            itemStatuses = document.getElementsByClassName('item-status-group');
          }
          return;
        }
        
        async function scrapeItemPage(itemStats) {
          for (let i = 0; i < itemStats.length; i++) {
            let payload = await scrapeItem(itemStats[i]);
            if (payload.found) {
              return payload;
            }
          }
          return {"found": false};
        }

        function scrapeItem(item) {
          let payload = {"found": false, "data": {'ytd': 0, 'totalUse': 0}}
          return new Promise((resolve, reject) => {
            let waitForItemBC = setInterval(() => {
              let foundBC = item.querySelector("h4.itemlabel").textContent.match(/3\d{13}/);
              if (item.textContent.includes('On Order Non-ACQ')) {
                clearInterval(waitForItemBC);
                resolve(payload);
              } else if (foundBC && foundBC.length === 1) {
                clearInterval(waitForItemBC);
                if (itemBC === foundBC[0]) {
                  payload.found = true;

                  let waitForItemData = setInterval(() => {
                    let historyRowsLabels = item.querySelectorAll('.item-circ-history li .itemlabel');
                    for (let i = 0; i < historyRowsLabels.length; i++) {
                      if (historyRowsLabels[i].textContent.includes("Total Checkouts")) {
                        const CKOs = item.querySelector(".item-circ-history li:nth-of-type(" + (i+1) + ") div.itemdata");
                        if (CKOs) {
                          payload.data.totalUse = parseInt(CKOs.children[0].children[0].textContent);
                          payload.data.ytd = parseInt(CKOs.children[1].children[0].textContent);
    
                          clearInterval(waitForItemData);
                          resolve(payload);
                        }
                      }
                    }
                  },100);
                } else {
                  resolve(payload);
                }
              }
            },100);
          });
        }
      }
    });
  });
})();
