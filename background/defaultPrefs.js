browser.storage.sync.get().then((res) => {
  // Increment the resetCounter to trigger the extension to restore default settings
  // next time it loads
  let resetCounter = 2;
  let performReset = false;
  if (!res.hasOwnProperty('resetCounter') || (res.hasOwnProperty('resetCounter') && parseInt(res.resetCounter) < resetCounter)) {
    browser.storage.sync.set({"resetCounter": resetCounter});
    performReset = true;
  }

  if (!res.hasOwnProperty('bibliovationBaseURL') || performReset) {
    browser.storage.sync.set({"bibliovationBaseURL": "https://scls.bibliovation.com"});
  }
  if (!res.hasOwnProperty('skin') || performReset) {
    browser.storage.sync.set({"skin": "MAD"});
  }
  if (!res.hasOwnProperty('parseAddr') || performReset) {
    browser.storage.sync.set({"parseAddr": true});
  }
  if (!res.hasOwnProperty('printBarcodeImage') || performReset) {
    browser.storage.sync.set({"printBarcodeImage": true});
  }
  if (!res.hasOwnProperty('restrictPatronFields') || performReset) {
    browser.storage.sync.set({"restrictPatronFields": true});
  }
  if (!res.hasOwnProperty('adultAge') || performReset) {
    browser.storage.sync.set({"adultAge": "16"});
  }
  if (!res.hasOwnProperty('mplInternetCards') || performReset) {
    browser.storage.sync.set({"mplInternetCards": false});
  }

  if (!res.hasOwnProperty('picklistPBJFISortName') || performReset) {
    browser.storage.sync.set({"picklistPBJFISortName": "alphabetical.csv"});
  }

  if (!res.hasOwnProperty('picklistPBJFISort') || performReset) {
    browser.storage.sync.set({"picklistPBJFISort": "category,code\r\nAdvanced,ADV\r\nAnimals,ANI\r\nCelebration,CEL\r\nCharacters,CHA\r\nConcepts,CON\r\nFavorites,FAV\r\nFolk,FOL\r\nGrowing,GRO\r\nNature,NAT\r\nRhymes,RHY\r\nStories,STO\r\nThings that Go,GO"});
  }

  if (!res.hasOwnProperty('picklistPBJFISortUploadDate') || performReset) {
    browser.storage.sync.set({"picklistPBJFISortUploadDate":(new Date()).toLocaleString().toLowerCase().replace(/:\d\d /,"")});
  }

  if (!res.hasOwnProperty('picklistFont') || performReset) {
    browser.storage.sync.set({"picklistFont": "smallFont"});
  }
  if (!res.hasOwnProperty('picklistPad') || performReset) {
    browser.storage.sync.set({"picklistPad": "smallPad"});
  }
  if (!res.hasOwnProperty('addPatronNotes') || performReset) {
    browser.storage.sync.set({"addPatronNotes": true});
  }
  if (!res.hasOwnProperty("sepAllAV") || performReset) {
    browser.storage.sync.set({"sepAllAV": false});
  }
  if (!res.hasOwnProperty("avAndOther") || performReset) {
    browser.storage.sync.set({"avAndOther": false});
  }
  if (!res.hasOwnProperty("cassette") || performReset) {
    browser.storage.sync.set({"cassette": false});
  }
  if (!res.hasOwnProperty("cd") || performReset) {
    browser.storage.sync.set({"cd": true});
  }
  if (!res.hasOwnProperty("dap") || performReset) {
    browser.storage.sync.set({"dap": false});
  }
  if (!res.hasOwnProperty("dvd") || performReset) {
    browser.storage.sync.set({"dvd": false});
  }
  if (!res.hasOwnProperty("equipment") || performReset) {
    browser.storage.sync.set({"equipment": false});
  }
  if (!res.hasOwnProperty("ill") || performReset) {
    browser.storage.sync.set({"ill": true});
  }
  if (!res.hasOwnProperty("software") || performReset) {
    browser.storage.sync.set({"software": false});
  }
  if (!res.hasOwnProperty("video") || performReset) {
    browser.storage.sync.set({"video": false});
  }
  if (!res.hasOwnProperty('receiptFont') || performReset) {
    browser.storage.sync.set({"receiptFont": "36px"});
  }
  if (!res.hasOwnProperty('sundayDropbox') || performReset) {
    browser.storage.sync.set({"sundayDropbox": true});
  }
  if (!res.hasOwnProperty('getItemUse') || performReset) {
    chrome.storage.sync.set({"getItemUse": true});
  }
  if (!res.hasOwnProperty('shortcutText1') || !res.hasOwnProperty('shortcutLink1') || performReset
      || res.shortcutLink1 === "https://scls.bibliovation.com/app/staff/circ/checkin") { // Correct URL if missing final /
    browser.storage.sync.set({
      "shortcutText1": "Bibliovation—Checkin",
      "shortcutLink1": "https://scls.bibliovation.com/app/staff/circ/checkin/"
    });
  }
  if (!res.hasOwnProperty('shortcutText2') || !res.hasOwnProperty('shortcutLink2') || performReset
      || res.shortcutLink2 === "https://scls.bibliovation.com/app/staff/circ/checkin") { // Correct URL if it was set to checkin
    browser.storage.sync.set({
      "shortcutText2": "Bibliovation—Checkout",
      "shortcutLink2": "https://scls.bibliovation.com/app/staff/circ/checkout"
    });
  }
  if (!res.hasOwnProperty('shortcutText3') || !res.hasOwnProperty('shortcutLink3') || performReset) {
    browser.storage.sync.set({
      "shortcutText3": "TIGERweb",
      "shortcutLink3": "https://tigerweb.geo.census.gov/tigerweb/"
    });
  }
  if (!res.hasOwnProperty('shortcutText4') || !res.hasOwnProperty('shortcutLink4') || performReset) {
    browser.storage.sync.set({
      "shortcutText4": "MPL Home Page",
      "shortcutLink4": "https://madisonpubliclibrary.org"
    });
  }
  if (!res.hasOwnProperty('shortcutText5') || !res.hasOwnProperty('shortcutLink5') || performReset) {
    browser.storage.sync.set({
      "shortcutText5": "MPLnet",
      "shortcutLink5": "https://www.mplnet.org"
    });
  }
  if (!res.hasOwnProperty('shortcutText6') || !res.hasOwnProperty('shortcutLink6') || performReset) {
    browser.storage.sync.set({
      "shortcutText6": "MPL Reference Tools",
      "shortcutLink6": "https://www.madisonpubliclibrary.org/research/referenc2"
    });
  }
  if (!res.hasOwnProperty('shortcutText7') || !res.hasOwnProperty('shortcutLink7') || performReset) {
    browser.storage.sync.set({
      "shortcutText7": "SCLS Status Wiki",
      "shortcutLink7": "https://sclsstatus.pbworks.com"
    });
  }
});
