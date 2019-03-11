var patronInfo = document.getElementsByClassName('patroninfo');

if (patronInfo && patronInfo.length > 0) {
  var patronName = patronInfo[0].children[0].textContent.replace(/\s\s+/g, ' ').replace(/\./g,'').slice(0, -17).replace(/\w+/g, function(w){return w[0].toUpperCase() + w.slice(1).toLowerCase()}),
    phoneWrap = document.querySelector(".patroninfo ul"),
    phoneMatchArr = (!!phoneWrap) ? /(1-)?[0-9]{3}-[0-9]{3}-[0-9]{4}/.exec(phoneWrap.textContent) : null,
    patronBarcode = patronInfo[0].children[0].textContent.match(/2[0-9]{13}/)[0],
    patronPhone = "",
    patronEmail = "",
    emailWrap = document.querySelector('.email a');
    
    if (phoneMatchArr && phoneMatchArr.length > 0) {
      patronPhone = phoneMatchArr[0];
    }
    
    if (emailWrap) {
      patronEmail = emailWrap.textContent;
    }
    
    console.log(patronName + "|" + patronPhone + "|" + patronEmail);
    
    browser.runtime.sendMessage({
      "key": "returnPatronData",
      "patronName": patronName,
      "patronBarcode": patronBarcode,
      "patronPhone": patronPhone,
      "patronEmail": patronEmail
    });
} else {
  browser.runtime.sendMessage({
    "key": "failedPatronData"
  });
}
