var skin = document.getElementById("skin"),
  parseAddr = document.getElementById("parseAddr"),
  restrictPatronFields = document.getElementById("restrictPatronFields"),
  updateAccountType = document.getElementById("updateAccountType"),
  cdams = document.getElementById("cdams"),
  cdamsid = document.getElementById("cdamsid"),
  cdjms = document.getElementById("cdjms"),
  cdyms = document.getElementById("cdyms"),
  dbrafe = document.getElementById("dbrafe"),
  dbraff = document.getElementById("dbraff"),
  dbraid = document.getElementById("dbraid"),
  dbranf = document.getElementById("dbranf"),
  dbrarn = document.getElementById("dbrarn"),
  dbratv = document.getElementById("dbratv"),
  dbrj = document.getElementById("dbrj"),
  dvdafe = document.getElementById("dvdafe"),
  dvdaff = document.getElementById("dvdaff"),
  dvdaid = document.getElementById("dvdaid"),
  dvdanf = document.getElementById("dvdanf"),
  dvdarn = document.getElementById("dvdarn"),
  dvdatv = document.getElementById("dvdatv"),
  dvdawl = document.getElementById("dvdawl"),
  dvdjfe = document.getElementById("dvdjfe"),
  dvdjhl = document.getElementById("dvdjhl"),
  dvdjnf = document.getElementById("dvdjnf"),
  dvdjwl = document.getElementById("dvdjwl"),
  dvdyfe = document.getElementById("dvdyfe"),
  vga = document.getElementById("vga"),
  vgj = document.getElementById("vgj"),
  vgy = document.getElementById("vgy"),
  soa = document.getElementById("soa"),
  soawl = document.getElementById("soawl"),
  soj = document.getElementById("soj"),
  sepAllCD = document.getElementById("sepAllCD"),
  sepAllDVD = document.getElementById("sepAllDVD"),
  sepOther = document.getElementById("sepOther"),
  receiptFont = document.getElementById("receiptFont"),
  sundayDropbox = document.getElementById("sundayDropbox"),
  sundayDropboxPaused = document.getElementById("sundayDropboxPaused"),
  shortcutText1 = document.getElementById("shortcutText1"),
  shortcutLink1 = document.getElementById("shortcutLink1"),
  shortcutText2 = document.getElementById("shortcutText2"),
  shortcutLink2 = document.getElementById("shortcutLink2"),
  shortcutText3 = document.getElementById("shortcutText3"),
  shortcutLink3 = document.getElementById("shortcutLink3"),
  shortcutText4 = document.getElementById("shortcutText4"),
  shortcutLink4 = document.getElementById("shortcutLink4"),
  shortcutText5 = document.getElementById("shortcutText5"),
  shortcutLink5 = document.getElementById("shortcutLink5"),
  shortcutText6 = document.getElementById("shortcutText6"),
  shortcutLink6 = document.getElementById("shortcutLink6")
  cdCodes = ["cdams", "cdamsid", "cdjms", "cdyms"],
  dvdCodes = ["dbrafe", "dbraff", "dbraid", "dbranf", "dbrarn", "dbratv", "dbrj", "dvdafe", "dvdaff", "dvdaid", "dvdanf", "dvdarn", "dvdatv", "dvdawl", "dvdjfe", "dvdjhl", "dvdjnf", "dvdjwl", "dvdyfe"],
  otherCodes = ["vga", "vgj", "vgy", "soa", "soawl", "soj"],
  defaultOptions = {
    "skin": "MAD",
    "parseAddr": true,
    "restrictPatronFields": true,
    "dueDateToggle": true,
    "updateAccountType": true,
    "cdams": true, "cdamsid": true, "cdjms": true, "cdyms": true,
    "dbrafe": false, "dbraff": false, "dbraid": false, "dbranf": false, "dbrarn": false, "dbratv": false, "dbrj": false, "dvdafe": false, "dvdaff": false, "dvdaid": false, "dvdanf": false, "dvdarn": false, "dvdatv": false, "dvdawl": false, "dvdjfe": false, "dvdjhl": false, "dvdjnf": false, "dvdjwl": false, "dvdyfe": false,
    "vga": false, "vgj": false, "vgy": false, "soa": false, "soawl": false, "soj": false,
    "sepAllCD": true, "sepAllDVD": false, "sepOther": false,
    "receiptFont": "MPL",
    "sundayDropbox": true,
    "sundayDropboxPaused": false,
    "shortcutText1": "Koha—Checkin",
    "shortcutLink1": "http://scls-staff.kohalibrary.com/cgi-bin/koha/circ/returns.pl",
    "shortcutText2": "Koha—Checkout",
    "shortcutLink2": "http://scls-staff.kohalibrary.com/cgi-bin/koha/circ/circulation.pl",
    "shortcutText3": "American Fact Finder",
    "shortcutLink3": "http://factfinder.census.gov/faces/nav/jsf/pages/searchresults.xhtml?refresh=t",
    "shortcutText4": "MPL Home Page",
    "shortcutLink4": "http://madisonpubliclibrary.org",
    "shortcutText5": "MPLnet",
    "shortcutLink5": "http://www.mplnet.org",
    "shortcutText6": "MPL Reference Tools",
    "shortcutLink6": "http://www.madisonpubliclibrary.org/research/referenc2"
  };

function setDefaultOptions() {
  browser.storage.sync.set(defaultOptions);
  browser.runtime.sendMessage({key: "updateExtensionIcon"});
  restoreOptions();
}

function restoreOptions() {
  browser.storage.sync.get().then((res) => {
    skin.value = res.skin;
    parseAddr.checked = res.parseAddr;
    restrictPatronFields.checked = res.restrictPatronFields;
    updateAccountType.checked = res.updateAccountType;
    cdams.checked = res.cdams;
    cdamsid.checked = res.cdamsid;
    cdjms.checked = res.cdjms;
    cdyms.checked = res.cdyms;
    dbrafe.checked = res.dbrafe;
    dbraff.checked = res.dbraff;
    dbraid.checked = res.dbraid;
    dbranf.checked = res.dbranf;
    dbrarn.checked = res.dbrarn;
    dbratv.checked = res.dbratv;
    dbrj.checked = res.dbrj;
    dvdafe.checked = res.dvdafe;
    dvdaff.checked = res.dvdaff;
    dvdaid.checked = res.dvdaid;
    dvdanf.checked = res.dvdanf;
    dvdarn.checked = res.dvdarn;
    dvdatv.checked = res.dvdatv;
    dvdawl.checked = res.dvdawl;
    dvdjfe.checked = res.dvdjfe;
    dvdjhl.checked = res.dvdjhl;
    dvdjnf.checked = res.dvdjnf;
    dvdjwl.checked = res.dvdjwl;
    dvdyfe.checked = res.dvdyfe;
    vga.checked = res.vga;
    vgj.checked = res.vgj;
    vgy.checked = res.vgy;
    soa.checked = res.soa;
    soawl.checked = res.soawl;
    soj.checked = res.soj;
    sepAllCD.checked = res.sepAllCD;
    sepAllDVD.checked = res.sepAllDVD;
    sepOther.checked = res.sepOther;
    receiptFont.value = res.receiptFont;
    sundayDropbox.checked = res.sundayDropbox;
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

// Functions to check whether the class-level switches should be triggered
function checkAllCD() {
  var numChecked = 0;

  for (var i = 0; i < cdCodes.length; i++) {
    if (document.getElementById(cdCodes[i]).checked) numChecked++;
  }

  sepAllCD.checked = numChecked === cdCodes.length;
  browser.storage.sync.set({sepAllCD: numChecked === cdCodes.length});
}

function checkAllDVD() {
  var numChecked = 0;

  for (var i = 0; i < dvdCodes.length; i++) {
    if (document.getElementById(dvdCodes[i]).checked) numChecked++;
  }

  sepAllDVD.checked = numChecked === dvdCodes.length;
  browser.storage.sync.set({sepAllDVD: numChecked === dvdCodes.length});
}

function checkOther() {
  var numChecked = 0;

  for (var i = 0; i < otherCodes.length; i++) {
    if (document.getElementById(otherCodes[i]).checked) numChecked++;
  }

  sepOther.checked = numChecked === otherCodes.length;
  browser.storage.sync.set({sepOther: numChecked === otherCodes.length});
}

// Functions to see if all items of a collection category has been checked
function toggleAllCD() {
  for (var i = 0; i < cdCodes.length; i++) {
    document.getElementById(cdCodes[i]).checked = sepAllCD.checked;
    browser.storage.sync.set({ [cdCodes[i]]: document.getElementById(cdCodes[i]).checked });
  }
}

function toggleAllDVD() {
  for (var i = 0; i < dvdCodes.length; i++) {
    document.getElementById(dvdCodes[i]).checked = sepAllDVD.checked;
    browser.storage.sync.set({ [dvdCodes[i]]: document.getElementById(dvdCodes[i]).checked });
  }
}

function toggleOther() {
  for (var i = 0; i < otherCodes.length; i++) {
    document.getElementById(otherCodes[i]).checked = sepOther.checked;
    browser.storage.sync.set({ [otherCodes[i]]: document.getElementById(otherCodes[i]).checked });
  }
}

// Listener for Set Default Options Button
document.getElementById("setDefault").addEventListener('click', setDefaultOptions);

// Option update listeners
document.getElementById("skin").addEventListener('change', function() {
  browser.storage.sync.set({skin: skin.value}).then((res) => {
    browser.runtime.sendMessage({key: "updateExtensionIcon"});
  });
});
document.getElementById("parseAddrSwitch").addEventListener('click', function() {
  browser.storage.sync.set({parseAddr: parseAddr.checked});
});
document.getElementById("restrictPatronFieldsSwitch").addEventListener('click', function() {
  browser.storage.sync.set({restrictPatronFields: restrictPatronFields.checked});
});
document.getElementById("updateAccountTypeSwitch").addEventListener('click', function() {
  browser.storage.sync.set({updateAccountType: updateAccountType.checked});
});
document.getElementById("sepAllCDSwitch").addEventListener('click', function() {
  toggleAllCD();
});
document.getElementById("sepAllDVDSwitch").addEventListener('click', function() {
  toggleAllDVD();
});
document.getElementById("sepOtherSwitch").addEventListener('click', function() {
  toggleOther();
});
document.getElementById("cdamsSwitch").addEventListener('click', function() {
  checkAllCD();
  browser.storage.sync.set({cdams: cdams.checked});
});
document.getElementById("cdamsidSwitch").addEventListener('click', function() {
  checkAllCD();
  browser.storage.sync.set({cdamsid: cdamsid.checked});
});
document.getElementById("cdjmsSwitch").addEventListener('click', function() {
  checkAllCD();
  browser.storage.sync.set({cdjms: cdjms.checked});
});
document.getElementById("cdymsSwitch").addEventListener('click', function() {
  checkAllCD();
  browser.storage.sync.set({cdyms: cdyms.checked});
});
document.getElementById("dbrafeSwitch").addEventListener('click', function() {
  checkAllDVD();
  browser.storage.sync.set({dbrafe: dbrafe.checked});
});
document.getElementById("dbraffSwitch").addEventListener('click', function() {
  checkAllDVD();
  browser.storage.sync.set({dbraff: dbraff.checked});
});
document.getElementById("dbraidSwitch").addEventListener('click', function() {
  checkAllDVD();
  browser.storage.sync.set({dbraid: dbraid.checked});
});
document.getElementById("dbranfSwitch").addEventListener('click', function() {
  checkAllDVD();
  browser.storage.sync.set({dbranf: dbranf.checked});
});
document.getElementById("dbrarnSwitch").addEventListener('click', function() {
  checkAllDVD();
  browser.storage.sync.set({dbrarn: dbrarn.checked});
});
document.getElementById("dbratvSwitch").addEventListener('click', function() {
  checkAllDVD();
  browser.storage.sync.set({dbratv: dbratv.checked});
});
document.getElementById("dbrjSwitch").addEventListener('click', function() {
  checkAllDVD();
  browser.storage.sync.set({dbrj: dbrj.checked});
});
document.getElementById("dvdafeSwitch").addEventListener('click', function() {
  checkAllDVD();
  browser.storage.sync.set({dvdafe: dvdafe.checked});
});
document.getElementById("dvdaffSwitch").addEventListener('click', function() {
  checkAllDVD();
  browser.storage.sync.set({dvdaff: dvdaff.checked});
});
document.getElementById("dvdaidSwitch").addEventListener('click', function() {
  checkAllDVD();
  browser.storage.sync.set({dvdaid: dvdaid.checked});
});
document.getElementById("dvdanfSwitch").addEventListener('click', function() {
  checkAllDVD();
  browser.storage.sync.set({dvdanf: dvdanf.checked});
});
document.getElementById("dvdarnSwitch").addEventListener('click', function() {
  checkAllDVD();
  browser.storage.sync.set({dvdarn: dvdarn.checked});
});
document.getElementById("dvdatvSwitch").addEventListener('click', function() {
  checkAllDVD();
  browser.storage.sync.set({dvdatv: dvdatv.checked});
});
document.getElementById("dvdawlSwitch").addEventListener('click', function() {
  checkAllDVD();
  browser.storage.sync.set({dvdawl: dvdawl.checked});
});
document.getElementById("dvdjfeSwitch").addEventListener('click', function() {
  checkAllDVD();
  browser.storage.sync.set({dvdjfe: dvdjfe.checked});
});
document.getElementById("dvdjhlSwitch").addEventListener('click', function() {
  checkAllDVD();
  browser.storage.sync.set({dvdjhl: dvdjhl.checked});
});
document.getElementById("dvdjnfSwitch").addEventListener('click', function() {
  checkAllDVD();
  browser.storage.sync.set({dvdjnf: dvdjnf.checked});
});
document.getElementById("dvdjwlSwitch").addEventListener('click', function() {
  checkAllDVD();
  browser.storage.sync.set({dvdjwl: dvdjwl.checked});
});
document.getElementById("dvdyfeSwitch").addEventListener('click', function() {
  checkAllDVD();
  browser.storage.sync.set({dvdyfe: dvdyfe.checked});
});
document.getElementById("vgaSwitch").addEventListener('click', function() {
  checkOther();
  browser.storage.sync.set({vga: vga.checked});
});
document.getElementById("vgjSwitch").addEventListener('click', function() {
  checkOther();
  browser.storage.sync.set({vgj: vgj.checked});
});
document.getElementById("vgySwitch").addEventListener('click', function() {
  checkOther();
  browser.storage.sync.set({vgy: vgy.checked});
});
document.getElementById("soaSwitch").addEventListener('click', function() {
  checkOther();
  browser.storage.sync.set({soa: soa.checked});
});
document.getElementById("soawlSwitch").addEventListener('click', function() {
  checkOther();
  browser.storage.sync.set({soawl: soawl.checked});
});
document.getElementById("sojSwitch").addEventListener('click', function() {
  checkOther();
  browser.storage.sync.set({soj: soj.checked});
});
document.getElementById("receiptFont").addEventListener('change', function() {
  browser.storage.sync.set({receiptFont: receiptFont.value});
});
document.getElementById("sundayDropboxSwitch").addEventListener('click', function() {
   browser.storage.sync.set({sundayDropbox: sundayDropbox.checked});
});
document.getElementById("shortcutText1").addEventListener('blur', function() {
  browser.storage.sync.set({shortcutText1: shortcutText1.value});
});
document.getElementById("shortcutLink1").addEventListener('blur', function() {
  browser.storage.sync.set({shortcutLink1: shortcutLink1.value});
});
document.getElementById("shortcutText2").addEventListener('blur', function() {
  browser.storage.sync.set({shortcutText2: shortcutText2.value});
});
document.getElementById("shortcutLink2").addEventListener('blur', function() {
  browser.storage.sync.set({shortcutLink2: "shortcutLink2".value});
});
document.getElementById("shortcutText3").addEventListener('blur', function() {
  browser.storage.sync.set({shortcutText3: shortcutText3.value});
});
document.getElementById("shortcutLink3").addEventListener('blur', function() {
  browser.storage.sync.set({shortcutLink3: shortcutLink3.value});
});
document.getElementById("shortcutText4").addEventListener('blur', function() {
  browser.storage.sync.set({shortcutText4: shortcutText4.value});
});
document.getElementById("shortcutLink4").addEventListener('blur', function() {
  browser.storage.sync.set({shortcutLink4: shortcutLink4.value});
});
document.getElementById("shortcutText5").addEventListener('blur', function() {
  browser.storage.sync.set({shortcutText5: shortcutText5.value});
});
document.getElementById("shortcutLink5").addEventListener('blur', function() {
  browser.storage.sync.set({shortcutLink5: shortcutLink5.value});
});
document.getElementById("shortcutText6").addEventListener('blur', function() {
  browser.storage.sync.set({shortcutText6: shortcutText6.value});
});
document.getElementById("shortcutLink6").addEventListener('blur', function() {
  browser.storage.sync.set({shortcutLink6: shortcutLink6.value});
});
