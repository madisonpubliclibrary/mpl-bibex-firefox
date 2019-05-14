(function() {
  return new Promise((resolve, reject) => {
    let waitForItem = setInterval(() => {
      let marc245a = document.querySelector('.marc245a');

      if (marc245a) {
        clearInterval(waitForItem);
        const data = {};

        let marc245b = document.querySelector('.marc245b');

        let holdsData = document.querySelector('.holds-data').textContent.trim();
        let totalHolds = holdsData.match(/Holds:\d+ total/);
        if (totalHolds.length > 0) totalHolds = totalHolds[0].match(/\d+/)[0];
        let copies = holdsData.match(/on\s+\d+ items/);
        if (copies.length > 0) copies = copies[0].match(/\d+/)[0];

        let itemBC = location.search.match(/mbxItemBC=3[0-9]{13}/)[0].match(/3[0-9]{13}/)[0];
        let items = document.querySelectorAll('a .item-display-value');

        for (let item of items) {
          if (item.textContent.trim() === itemBC) {
            data.itemID = item.parentElement.href.match(/=\d+/)[0].substr(1);
            data.cCode = item.parentElement.parentElement.parentElement.parentElement.parentElement.parentElement.children[6].textContent.trim();
          }
        }

        data.title = marc245a.textContent;
        if (marc245b) data.title += " " + marc245b.textContent;
        data.holds = totalHolds;
        data.copies = copies;

        resolve(data);
      }
    }, 350);
  });
})();
