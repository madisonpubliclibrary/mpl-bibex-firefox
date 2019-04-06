(function(){
  'use strict';
  console.log('betterLogo.js');
  var img = document.querySelector('.koha-logo img');

  if (img && !img.classList.contains('bibex-hires')) {
    img.classList.add('bibex-hires');
    img.src = browser.runtime.getURL("/content/img/BibliovationLogo.png");
  }
})();
