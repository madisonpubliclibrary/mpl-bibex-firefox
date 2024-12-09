(function(){
  'use strict';

  if (/^https?:\/\/(?:[a-z]{3}\.)?scls\.bibliovation\.com/.test(window.location.origin)) {
    browser.storage.sync.set({'bibliovationBaseURL': window.location.origin});
  }
})();
