(function() {
  'use strict'
  return new Promise((resolve, reject) => {
    let itemBC = location.search.match(/mbxItemBC=3[0-9]{13}/)[0].match(/3[0-9]{13}/)[0];

    let waitForItems = setInterval(() => {
      let items = Array.from(document.querySelectorAll('.item-cell.barcode'));

      if (items.length > 0) {
        clearInterval(waitForItems);
        for (let item of items) {
          if (item.textContent.includes(itemBC)) {
            resolve(item.parentElement.parentElement.parentElement.children[12].textContent.trim());
          }
        }
      }
    }, 350);
  });
})();
