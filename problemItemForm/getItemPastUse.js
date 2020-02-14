(function() {
  'use strict'
  return new Promise((resolve, reject) => {
    let data = {'pastUse': 0, 'acqDate': new Date()};
    let itemBC = location.search.match(/mbxItemBC=3[0-9]{13}/)[0].match(/3[0-9]{13}/)[0];

    let waitForItems = setInterval(() => {
      let items = Array.from(document.querySelectorAll('.item-cell.barcode'));

      if (items.length > 0) {
        clearInterval(waitForItems);
        for (let item of items) {
          if (item.textContent.includes(itemBC)) {
            for (let col of item.parentElement.parentElement.parentElement.children) {
              if (col.classList.contains('952.Z')) {
                data.pastUse = col.textContent.trim();
              } else if (col.classList.contains('dateaccessioned')) {
                data.acqDate = new Date(col.textContent.trim());
              }
            }
            break;
          }
        }
        resolve(data);
      }
    }, 350);
  });
})();
