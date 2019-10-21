browser.storage.sync.get().then((res) => {
  if (!res.hasOwnProperty('skin')) {
    browser.storage.sync.set({"skin": "MAD"});
  }
  if (!res.hasOwnProperty('parseAddr')) {
    browser.storage.sync.set({"parseAddr": true});
  }
  if (!res.hasOwnProperty('restrictPatronFields')) {
    browser.storage.sync.set({"restrictPatronFields": true});
  }
  if (!res.hasOwnProperty('updateAccountType')) {
    browser.storage.sync.set({"updateAccountType": true});
  }
  if (!res.hasOwnProperty('addPatronNotes')) {
    browser.storage.sync.set({"addPatronNotes": true});
  }
  if (!res.hasOwnProperty("sepAllAV")) {
    browser.storage.sync.set({"sepAllAV": false});
  }
  if (!res.hasOwnProperty("avAndOther")) {
    browser.storage.sync.set({"avAndOther": false});
  }
  if (!res.hasOwnProperty("cassette")) {
    browser.storage.sync.set({"cassette": false});
  }
  if (!res.hasOwnProperty("cd")) {
    browser.storage.sync.set({"cd": true});
  }
  if (!res.hasOwnProperty("dap")) {
    browser.storage.sync.set({"dap": false});
  }
  if (!res.hasOwnProperty("dvd")) {
    browser.storage.sync.set({"dvd": false});
  }
  if (!res.hasOwnProperty("equipment")) {
    browser.storage.sync.set({"equipment": false});
  }
  if (!res.hasOwnProperty("ill")) {
    browser.storage.sync.set({"ill": true});
  }
  if (!res.hasOwnProperty("software")) {
    browser.storage.sync.set({"software": false});
  }
  if (!res.hasOwnProperty("video")) {
    browser.storage.sync.set({"video": false});
  }
  if (!res.hasOwnProperty('receiptFont')) {
    browser.storage.sync.set({"receiptFont": "36px"});
  }
  if (!res.hasOwnProperty('sundayDropbox')) {
    browser.storage.sync.set({"sundayDropbox": true});
  }
  if (!res.hasOwnProperty('getItemUse')) {
    chrome.storage.sync.set({"getItemUse": true});
  }
  if (!res.hasOwnProperty('shortcutText1') || !res.hasOwnProperty('shortcutLink1')) {
    browser.storage.sync.set({
      "shortcutText1": "Koha—Checkin",
      "shortcutLink1": "http://scls-staff.kohalibrary.com/cgi-bin/koha/circ/returns.pl"
    });
  }
  if (!res.hasOwnProperty('shortcutText2') || !res.hasOwnProperty('shortcutLink2')) {
    browser.storage.sync.set({
      "shortcutText2": "Koha—Checkout",
      "shortcutLink2": "http://scls-staff.kohalibrary.com/cgi-bin/koha/circ/circulation.pl"
    });
  }
  if (!res.hasOwnProperty('shortcutText3') || !res.hasOwnProperty('shortcutLink3')) {
    browser.storage.sync.set({
      "shortcutText3": "American Fact Finder",
      "shortcutLink3": "http://factfinder.census.gov/faces/nav/jsf/pages/searchresults.xhtml?refresh=t"
    });
  }
  if (!res.hasOwnProperty('shortcutText4') || !res.hasOwnProperty('shortcutLink4')) {
    browser.storage.sync.set({
      "shortcutText4": "MPL Home Page",
      "shortcutLink4": "http://madisonpubliclibrary.org"
    });
  }
  if (!res.hasOwnProperty('shortcutText5') || !res.hasOwnProperty('shortcutLink5')) {
    browser.storage.sync.set({
      "shortcutText5": "MPLnet",
      "shortcutLink5": "http://www.mplnet.org"
    });
  }
  if (!res.hasOwnProperty('shortcutText6') || !res.hasOwnProperty('shortcutLink6')) {
    browser.storage.sync.set({
      "shortcutText6": "MPL Reference Tools",
      "shortcutLink6": "http://www.madisonpubliclibrary.org/research/referenc2"
    });
  }
});
