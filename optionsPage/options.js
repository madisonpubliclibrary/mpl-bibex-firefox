function setDefaultOptions() {    
  browser.storage.sync.set({
    skin: "MAD",
    patronMsg: true,
    validAddr: true,
    autoBarcode: true,
    lookupPSTAT: true,
    digestOnly: true,
    dueDateToggle: true,
    middleInitials: true,
    updateAccountType: true,
    receiptFont: "MPL",
    sundayDropbox: true,
    sundayDropboxPaused: false,
    shortcutText1: "Koha—Checkin",
    shortcutLink1: "http://scls-staff.kohalibrary.com/cgi-bin/koha/circ/returns.pl",
    shortcutText2: "Koha—Checkout",
    shortcutLink2: "http://scls-staff.kohalibrary.com/cgi-bin/koha/circ/circulation.pl",
    shortcutText3: "American Fact Finder",
    shortcutLink3: "http://factfinder.census.gov/faces/nav/jsf/pages/searchresults.xhtml?refresh=t",
    shortcutText4: "MPL Home Page",
    shortcutLink4: "http://madisonpubliclibrary.org",
    shortcutText5: "MPLnet",
    shortcutLink5: "http://www.mplnet.org",
    shortcutText6: "MPL Reference Tools",
    shortcutLink6: "http://www.madisonpubliclibrary.org/research/referenc2"
  });
  browser.runtime.sendMessage({key: "updateExtensionIcon"});
  restoreOptions();
}

function restoreOptions() {
  browser.storage.sync.get('skin').then((res) => {
    document.querySelector("#skin").value = res.skin;
  });
  
  browser.storage.sync.get('patronMsg').then((res) => {
    document.querySelector("#patronMsg").checked = res.patronMsg;
  });
  
  browser.storage.sync.get('validAddr').then((res) => {
    document.querySelector("#validAddr").checked = res.validAddr;
  });
  
  browser.storage.sync.get('autoBarcode').then((res) => {
    document.querySelector("#autoBarcode").checked = res.autoBarcode;
  });
  
  browser.storage.sync.get('lookupPSTAT').then((res) => {
    document.querySelector("#lookupPSTAT").checked = res.lookupPSTAT;
  });
  
  browser.storage.sync.get('digestOnly').then((res) => {
    document.querySelector("#digestOnly").checked = res.digestOnly;
  });
  
  browser.storage.sync.get('dueDateToggle').then((res) => {
    document.querySelector("#dueDateToggle").checked = res.dueDateToggle;
  });
  
  browser.storage.sync.get('middleInitials').then((res) => {
    document.querySelector("#middleInitials").checked = res.middleInitials;
  });
  
  browser.storage.sync.get('updateAccountType').then((res) => {
    document.querySelector("#updateAccountType").checked = res.updateAccountType;
  });
  
  browser.storage.sync.get('receiptFont').then((res) => {
    document.querySelector("#receiptFont").value = res.receiptFont;
  });
  
  browser.storage.sync.get('sundayDropbox').then((res) => {
    document.querySelector("#sundayDropbox").checked = res.sundayDropbox;
  });
  
  browser.storage.sync.get('shortcutText1').then((res) => {
    document.getElementById("shortcutText1").value = res.shortcutText1;
  });
  browser.storage.sync.get('shortcutLink1').then((res) => {
    document.getElementById("shortcutLink1").value = res.shortcutLink1;
  });
  browser.storage.sync.get('shortcutText2').then((res) => {
    document.getElementById("shortcutText2").value = res.shortcutText2;
  });
  browser.storage.sync.get('shortcutLink2').then((res) => {
    document.getElementById("shortcutLink2").value = res.shortcutLink2;
  });
  browser.storage.sync.get('shortcutText3').then((res) => {
    document.getElementById("shortcutText3").value = res.shortcutText3;
  });
  browser.storage.sync.get('shortcutLink3').then((res) => {
    document.getElementById("shortcutLink3").value = res.shortcutLink3;
  });
  browser.storage.sync.get('shortcutText4').then((res) => {
    document.getElementById("shortcutText4").value = res.shortcutText4;
  });
  browser.storage.sync.get('shortcutLink4').then((res) => {
    document.getElementById("shortcutLink4").value = res.shortcutLink4;
  });
  browser.storage.sync.get('shortcutText5').then((res) => {
    document.getElementById("shortcutText5").value = res.shortcutText5;
  });
  browser.storage.sync.get('shortcutLink5').then((res) => {
    document.getElementById("shortcutLink5").value = res.shortcutLink5;
  });
  browser.storage.sync.get('shortcutText6').then((res) => {
    document.getElementById("shortcutText6").value = res.shortcutText6;
  });
  browser.storage.sync.get('shortcutLink6').then((res) => {
    document.getElementById("shortcutLink6").value = res.shortcutLink6;
  });
}

document.addEventListener('DOMContentLoaded', function() {
  restoreOptions();
});

// Listener for Set Default Options Button
document.getElementById("setDefault").addEventListener('click', setDefaultOptions);

// Option update listeners
document.getElementById("skin").addEventListener('change', function() {
  browser.storage.sync.set({skin: document.getElementById("skin").value}).then((res) => {
    browser.runtime.sendMessage({key: "updateExtensionIcon"});
  });
});
document.getElementById("patronMsgSwitch").addEventListener('click', function() {
   browser.storage.sync.set({patronMsg: document.getElementById("patronMsg").checked});
});
document.getElementById("validAddrSwitch").addEventListener('click', function() {
   browser.storage.sync.set({validAddr: document.getElementById("validAddr").checked});
});
document.getElementById("autoBarcodeSwitch").addEventListener('click', function() {
   browser.storage.sync.set({autoBarcode: document.getElementById("autoBarcode").checked});
});
document.getElementById("lookupPSTATSwitch").addEventListener('click', function() {
   browser.storage.sync.set({lookupPSTAT: document.getElementById("lookupPSTAT").checked});
});
document.getElementById("digestOnlySwitch").addEventListener('click', function() {
   browser.storage.sync.set({digestOnly: document.getElementById("digestOnly").checked});
});
document.getElementById("dueDateToggleSwitch").addEventListener('click', function() {
   browser.storage.sync.set({dueDateToggle: document.getElementById("dueDateToggle").checked});
});
document.getElementById("middleInitialsSwitch").addEventListener('click', function() {
   browser.storage.sync.set({middleInitials: document.getElementById("middleInitials").checked});
});
document.getElementById("updateAccountTypeSwitch").addEventListener('click', function() {
   browser.storage.sync.set({updateAccountType: document.getElementById("updateAccountType").checked});
});
document.getElementById("receiptFont").addEventListener('change', function() {
   browser.storage.sync.set({receiptFont: document.getElementById("receiptFont").value});
});
document.getElementById("sundayDropboxSwitch").addEventListener('click', function() {
   browser.storage.sync.set({sundayDropbox: document.getElementById("sundayDropbox").checked});
});
document.getElementById("shortcutText1").addEventListener('blur', function() {
  browser.storage.sync.set({shortcutText1: document.getElementById("shortcutText1").value});
});
document.getElementById("shortcutLink1").addEventListener('blur', function() {
  browser.storage.sync.set({shortcutLink1: document.getElementById("shortcutLink1").value});
});
document.getElementById("shortcutText2").addEventListener('blur', function() {
  browser.storage.sync.set({shortcutText2: document.getElementById("shortcutText2").value});
});
document.getElementById("shortcutLink2").addEventListener('blur', function() {
  browser.storage.sync.set({shortcutLink2: document.getElementById("shortcutLink2").value});
});
document.getElementById("shortcutText3").addEventListener('blur', function() {
  browser.storage.sync.set({shortcutText3: document.getElementById("shortcutText3").value});
});
document.getElementById("shortcutLink3").addEventListener('blur', function() {
  browser.storage.sync.set({shortcutLink3: document.getElementById("shortcutLink3").value});
});
document.getElementById("shortcutText4").addEventListener('blur', function() {
  browser.storage.sync.set({shortcutText4: document.getElementById("shortcutText4").value});
});
document.getElementById("shortcutLink4").addEventListener('blur', function() {
  browser.storage.sync.set({shortcutLink4: document.getElementById("shortcutLink4").value});
});
document.getElementById("shortcutText5").addEventListener('blur', function() {
  browser.storage.sync.set({shortcutText5: document.getElementById("shortcutText5").value});
});
document.getElementById("shortcutLink5").addEventListener('blur', function() {
  browser.storage.sync.set({shortcutLink5: document.getElementById("shortcutLink5").value});
});
document.getElementById("shortcutText6").addEventListener('blur', function() {
  browser.storage.sync.set({shortcutText6: document.getElementById("shortcutText6").value});
});
document.getElementById("shortcutLink6").addEventListener('blur', function() {
  browser.storage.sync.set({shortcutLink6: document.getElementById("shortcutLink6").value});
});