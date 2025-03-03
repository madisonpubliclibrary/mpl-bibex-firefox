(function(){
  'use strict';
  const patronInfo = document.querySelector('.staff-members-moremember h3');
  const data = {};

  if (patronInfo) {
    data.patronName = patronInfo.textContent.trim()
        .replace(/\s+/g, ' ')
        .replace(/\./g,'').slice(0, -17)
        .replace(/\w+/g, function(w){return w[0].toUpperCase() + w.slice(1).toLowerCase()})
        .replace(/ ii/i,' II').replace(/ iii/i,' III');
    data.patronBarcode = patronInfo.textContent.match(/2[0-9]{13}/)[0];
    let phoneWrap = document.getElementsByClassName('pdetails-phone');
    let phoneMatchArr = phoneWrap && phoneWrap.length > 0 ? /(1-)?[0-9]{3}-[0-9]{3}-[0-9]{4}/.exec(phoneWrap[0].textContent) : null;
    let emailWrap = document.getElementsByClassName('pdetails-email');

    data.patronPhone = phoneMatchArr && phoneMatchArr.length > 0 ? phoneMatchArr[0] : '';
    data.patronEmail = emailWrap && emailWrap.length > 0 ? emailWrap[0].textContent.split(':')[1].trim() : '';
  }
  return data;
})();
