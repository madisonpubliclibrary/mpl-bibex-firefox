(function(){
  'use strict';
  if (/bibliovation\.com\/app\/staff\/patron/.test(window.location)) {
    var patronInfo = document.getElementsByClassName('patroninfo'),
      button = document.getElementById('printBarcode');

    if (!button && patronInfo.length > 0) {

      patronInfo = patronInfo[0];
      button = document.createElement('button');
      button.id = 'printBarcode';

      patronInfo.style.textAlign = "right";
      button.textContent = "Print Barcode";
      button.style.marginBottom = "1em";

      button.addEventListener('click', function() {
        console.log('print bc');
        browser.runtime.sendMessage({
          "key": "printBarcode",
          "barcode": patronInfo[0].children[0].textContent.substr(-15,14)
        });
      });

      patronInfo.insertBefore(button, patronInfo.children[1]);
    }
  }
})();
