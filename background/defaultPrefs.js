browser.storage.sync.get().then((res) => {
  if (!res.hasOwnProperty('skin')) {
    browser.storage.sync.set({skin: "MAD"});
  }
  if (!res.hasOwnProperty('patronMsg')) {
    browser.storage.sync.set({patronMsg: true});
  }
  if (!res.hasOwnProperty('validAddr')) {
    browser.storage.sync.set({validAddr: true});
  }
  if (!res.hasOwnProperty('autoBarcode')) {
    browser.storage.sync.set({autoBarcode: true});
  }
  if (!res.hasOwnProperty('lookupPSTAT')) {
    browser.storage.sync.set({lookupPSTAT: true});
  }
  if (!res.hasOwnProperty('digestOnly')) {
    browser.storage.sync.set({digestOnly: true});
  }
  if (!res.hasOwnProperty('dueDateToggle')) {
    browser.storage.sync.set({dueDateToggle: true});
  }
  if (!res.hasOwnProperty('middleInitials')) {
    browser.storage.sync.set({middleInitials: true});
  }
  if (!res.hasOwnProperty('updateAccountType')) {
    browser.storage.sync.set({updateAccountType: true});
  }
  if (!res.hasOwnProperty('receiptFont')) {
    browser.storage.sync.set({receiptFont: "MPL"});
  }
  if (!res.hasOwnProperty('sundayDropbox')) {
    browser.storage.sync.set({sundayDropbox: true});
  }
  if (!res.hasOwnProperty('shortcutText1') || !res.hasOwnProperty('shortcutLink1')) {
    browser.storage.sync.set({
      shortcutText1: "Koha—Checkin",
      shortcutLink1: "http://scls-staff.kohalibrary.com/cgi-bin/koha/circ/returns.pl"
    });
  }
  if (!res.hasOwnProperty('shortcutText2') || !res.hasOwnProperty('shortcutLink2')) {
    browser.storage.sync.set({
      shortcutText2: "Koha—Checkout",
      shortcutLink2: "http://scls-staff.kohalibrary.com/cgi-bin/koha/circ/circulation.pl"
    });
  }
  if (!res.hasOwnProperty('shortcutText3') || !res.hasOwnProperty('shortcutLink3')) {
    browser.storage.sync.set({
      shortcutText3: "American Fact Finder",
      shortcutLink3: "http://factfinder.census.gov/faces/nav/jsf/pages/searchresults.xhtml?refresh=t"
    });
  }
  if (!res.hasOwnProperty('shortcutText4') || !res.hasOwnProperty('shortcutLink4')) {
    browser.storage.sync.set({
      shortcutText4: "MPL Home Page",
      shortcutLink4: "http://madisonpubliclibrary.org"
    });
  }
  if (!res.hasOwnProperty('shortcutText5') || !res.hasOwnProperty('shortcutLink5')) {
    browser.storage.sync.set({
      shortcutText5: "MPLnet",
      shortcutLink5: "http://www.mplnet.org"
    });
  }
  if (!res.hasOwnProperty('shortcutText6') || !res.hasOwnProperty('shortcutLink6')) {
    browser.storage.sync.set({
      shortcutText6: "MPL Reference Tools",
      shortcutLink6: "http://www.madisonpubliclibrary.org/research/referenc2"
    });
  }
});