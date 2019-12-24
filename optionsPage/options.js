const skin = document.getElementById("skin");
const parseAddr = document.getElementById("parseAddr");
const restrictPatronFields = document.getElementById("restrictPatronFields");
const addPatronNotes = document.getElementById("addPatronNotes");
const updateAccountType = document.getElementById("updateAccountType");
const mplInternetCards = document.getElementById("mplInternetCards");
const avAndOther = document.getElementById("avAndOther");
const cassette = document.getElementById("cassette");
const cd = document.getElementById("cd");
const dap = document.getElementById("dap");
const dvd = document.getElementById("dvd");
const equipment = document.getElementById("equipment");
const ill = document.getElementById("ill");
const software = document.getElementById("software");
const video = document.getElementById("video");
const sepAllAV = document.getElementById("sepAllAV");
const receiptFont = document.getElementById("receiptFont");
const sundayDropbox = document.getElementById("sundayDropbox");
const sundayDropboxPaused = document.getElementById("sundayDropboxPaused");
const getItemUse = document.getElementById("getItemUse");
const shortcutText1 = document.getElementById("shortcutText1");
const shortcutLink1 = document.getElementById("shortcutLink1");
const shortcutText2 = document.getElementById("shortcutText2");
const shortcutLink2 = document.getElementById("shortcutLink2");
const shortcutText3 = document.getElementById("shortcutText3");
const shortcutLink3 = document.getElementById("shortcutLink3");
const shortcutText4 = document.getElementById("shortcutText4");
const shortcutLink4 = document.getElementById("shortcutLink4");
const shortcutText5 = document.getElementById("shortcutText5");
const shortcutLink5 = document.getElementById("shortcutLink5");
const shortcutText6 = document.getElementById("shortcutText6");
const shortcutLink6 = document.getElementById("shortcutLink6");
const avCodes = ["avAndOther", "cassette", "cd", "dap", "dvd", "equipment", "software", "video"];

function restoreOptions() {
  browser.storage.sync.get().then((res) => {
    skin.value = res.skin;
    parseAddr.checked = res.parseAddr;
    restrictPatronFields.checked = res.restrictPatronFields;
    updateAccountType.checked = res.updateAccountType;
    mplInternetCards.checked = res.mplInternetCards;
    addPatronNotes.checked = res.addPatronNotes;
    sepAllAV.checked = res.sepAllAV;
    avAndOther.checked = res.avAndOther;
    cassette.checked = res.cassette;
    cd.checked = res.cd;
    dap.checked = res.dap;
    dvd.checked = res.dvd;
    equipment.checked = res.equipment;
    ill.checked = res.ill;
    software.checked = res.software;
    video.checked = res.video;
    receiptFont.value = res.receiptFont;
    sundayDropbox.checked = res.sundayDropbox;
    getItemUse.checked = res.getItemUse;
    shortcutText1.value = res.shortcutText1;
    shortcutLink1.value = res.shortcutLink1;
    shortcutText2.value = res.shortcutText2;
    shortcutLink2.value = res.shortcutLink2;
    shortcutText3.value = res.shortcutText3;
    shortcutLink3.value = res.shortcutLink3;
    shortcutText4.value = res.shortcutText4;
    shortcutLink4.value = res.shortcutLink4;
    shortcutText5.value = res.shortcutText5;
    shortcutLink5.value = res.shortcutLink5;
    shortcutText6.value = res.shortcutText6;
    shortcutLink6.value = res.shortcutLink6;
  });
}

document.addEventListener('DOMContentLoaded', function() {
  restoreOptions();
});

// Check whether the class-level switches should be triggered
function checkAllAV() {
  let numChecked = 0;

  for (let id of avCodes) {
    if (document.getElementById(id).checked) numChecked++;
  }

  sepAllAV.checked = numChecked === avCodes.length;
  browser.storage.sync.set({"sepAllAV": numChecked === avCodes.length});
}

// Listener for Set Default Options Button
document.getElementById("setDefault").addEventListener('click', function() {
  browser.storage.sync.set({
    "skin": "MAD",
    "parseAddr": true,
    "restrictPatronFields": true,
    "dueDateToggle": true,
    "updateAccountType": true,
    "mplInternetCards": false,
    "addPatronNotes": true,
    "sepAllAV": false,
    "avAndOther": false,
    "cassette": false,
    "cd": true,
    "dap": false,
    "dvd": false,
    "equipment": false,
    "ill": true,
    "software": false,
    "video":  false,
    "receiptFont": "36px",
    "sundayDropbox": true,
    "sundayDropboxPaused": false,
    "getItemUse": true,
    "shortcutText1": "Bibliovation—Checkin",
    "shortcutLink1": "https://scls.kohalibrary.com/app/staff/circ/checkin",
    "shortcutText2": "Bibliovation—Checkout",
    "shortcutLink2": "https://scls.kohalibrary.com/app/staff/circ/checkout",
    "shortcutText3": "American Fact Finder",
    "shortcutLink3": "http://factfinder.census.gov/faces/nav/jsf/pages/searchresults.xhtml?refresh=t",
    "shortcutText4": "MPL Home Page",
    "shortcutLink4": "http://madisonpubliclibrary.org",
    "shortcutText5": "MPLnet",
    "shortcutLink5": "http://www.mplnet.org",
    "shortcutText6": "MPL Reference Tools",
    "shortcutLink6": "http://www.madisonpubliclibrary.org/research/referenc2"
  }).then(() => {
    browser.runtime.sendMessage({"key": "updateExtensionIcon"});
  });
});

// Option update listeners
skin.addEventListener('change', function() {
  browser.storage.sync.set({"skin": skin.value}).then(() => {
    browser.runtime.sendMessage({"key": "updateExtensionIcon"});
    setTimeout(() => {restoreOptions()}, 500);
  });
});
document.getElementById("parseAddrSwitch").addEventListener('click', function() {
  browser.storage.sync.set({"parseAddr": parseAddr.checked});
});
document.getElementById("restrictPatronFieldsSwitch").addEventListener('click', function() {
  browser.storage.sync.set({"restrictPatronFields": restrictPatronFields.checked});
});
document.getElementById("updateAccountTypeSwitch").addEventListener('click', function() {
  browser.storage.sync.set({"updateAccountType": updateAccountType.checked});
});
document.getElementById("mplInternetCardsSwitch").addEventListener('click', function() {
  browser.storage.sync.set({"mplInternetCards": mplInternetCards.checked});
});
document.getElementById("addPatronNotesSwitch").addEventListener('click', function() {
  browser.storage.sync.set({"addPatronNotes": addPatronNotes.checked});
});
document.getElementById("sepAllAV").addEventListener('change', function() {
  for (let id of avCodes) {
    document.getElementById(id).checked = this.checked;
    browser.storage.sync.set({[id]: document.getElementById(id).checked});
  }
});
document.getElementById("avAndOtherSwitch").addEventListener('click', function() {
  checkAllAV();
  browser.storage.sync.set({"avAndOther": avAndOther.checked});
});
document.getElementById("cassetteSwitch").addEventListener('click', function() {
  checkAllAV();
  browser.storage.sync.set({"cassette": cassette.checked});
});
document.getElementById("cdSwitch").addEventListener('click', function() {
  checkAllAV();
  browser.storage.sync.set({"cd": cd.checked});
});
document.getElementById("dapSwitch").addEventListener('click', function() {
  checkAllAV();
  browser.storage.sync.set({"dap": dap.checked});
});
document.getElementById("dvdSwitch").addEventListener('click', function() {
  checkAllAV();
  browser.storage.sync.set({"dvd": dvd.checked});
});
document.getElementById("equipmentSwitch").addEventListener('click', function() {
  checkAllAV();
  browser.storage.sync.set({"equipment": equipment.checked});
});
document.getElementById("illSwitch").addEventListener('click', function() {
  checkAllAV();
  browser.storage.sync.set({"ill": ill.checked});
});
document.getElementById("softwareSwitch").addEventListener('click', function() {
  checkAllAV();
  browser.storage.sync.set({"software": software.checked});
});
document.getElementById("videoSwitch").addEventListener('click', function() {
  checkAllAV();
  browser.storage.sync.set({"video": video.checked});
});
receiptFont.addEventListener('change', function() {
  browser.storage.sync.set({"receiptFont": receiptFont.value});
});
document.getElementById("sundayDropboxSwitch").addEventListener('click', function() {
   browser.storage.sync.set({"sundayDropbox": sundayDropbox.checked});
});
document.getElementById("getItemUseSwitch").addEventListener('click', function() {
   browser.storage.sync.set({"getItemUse": getItemUse.checked});
});
document.getElementById("shortcutText1").addEventListener('blur', function() {
  browser.storage.sync.set({"shortcutText1": shortcutText1.value});
});
document.getElementById("shortcutLink1").addEventListener('blur', function() {
  browser.storage.sync.set({"shortcutLink1": shortcutLink1.value});
});
document.getElementById("shortcutText2").addEventListener('blur', function() {
  browser.storage.sync.set({"shortcutText2": shortcutText2.value});
});
document.getElementById("shortcutLink2").addEventListener('blur', function() {
  browser.storage.sync.set({"shortcutLink2": shortcutLink2.value});
});
document.getElementById("shortcutText3").addEventListener('blur', function() {
  browser.storage.sync.set({"shortcutText3": shortcutText3.value});
});
document.getElementById("shortcutLink3").addEventListener('blur', function() {
  browser.storage.sync.set({"shortcutLink3": shortcutLink3.value});
});
document.getElementById("shortcutText4").addEventListener('blur', function() {
  browser.storage.sync.set({"shortcutText4": shortcutText4.value});
});
document.getElementById("shortcutLink4").addEventListener('blur', function() {
  browser.storage.sync.set({"shortcutLink4": shortcutLink4.value});
});
document.getElementById("shortcutText5").addEventListener('blur', function() {
  browser.storage.sync.set({"shortcutText5": shortcutText5.value});
});
document.getElementById("shortcutLink5").addEventListener('blur', function() {
  browser.storage.sync.set({"shortcutLink5": shortcutLink5.value});
});
document.getElementById("shortcutText6").addEventListener('blur', function() {
  browser.storage.sync.set({"shortcutText6": shortcutText6.value});
});
document.getElementById("shortcutLink6").addEventListener('blur', function() {
  browser.storage.sync.set({"shortcutLink6": shortcutLink6.value});
});
