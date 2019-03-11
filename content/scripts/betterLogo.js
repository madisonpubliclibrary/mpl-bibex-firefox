(function(){
  'use strict';
  var img = document.querySelector('.koha-logo img');

  if (img && !img.classList.contains('bibex-hires')) {
    browser.runtime.sendMessage({"key":"getLogoURL"}).then(res => {
      img.classList.add('bibex-hires');
      img.src = res.URL;
    });
  }
})();
