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
  if (!res.hasOwnProperty('restrictPatronFields')) {
    browser.storage.sync.set({restrictPatronFields: true});
  }
  if (!res.hasOwnProperty('updateAccountType')) {
    browser.storage.sync.set({updateAccountType: true});
  }
  if (!res.hasOwnProperty("cdams")) {
    browser.storage.sync.set({cdams: true});
  }
  if (!res.hasOwnProperty("cdamsid")) {
    browser.storage.sync.set({cdamsid: true});
  }
  if (!res.hasOwnProperty("cdjms")) {
    browser.storage.sync.set({cdjms: true});
  }
  if (!res.hasOwnProperty("cdyms")) {
    browser.storage.sync.set({cdyms: true});
  }
  if (!res.hasOwnProperty("dbrafe")) {
    browser.storage.sync.set({dbrafe: false});
  }
  if (!res.hasOwnProperty("dbraff")) {
    browser.storage.sync.set({dbraff: false});
  }
  if (!res.hasOwnProperty("dbraid")) {
    browser.storage.sync.set({dbraid: false});
  }
  if (!res.hasOwnProperty("dbranf")) {
    browser.storage.sync.set({dbranf: false});
  }
  if (!res.hasOwnProperty("dbrarn")) {
    browser.storage.sync.set({dbrarn: false});
  }
  if (!res.hasOwnProperty("dbratv")) {
    browser.storage.sync.set({dbratv: false});
  }
  if (!res.hasOwnProperty("dbrj")) {
    browser.storage.sync.set({dbrj: false});
  }
  if (!res.hasOwnProperty("dvdafe")) {
    browser.storage.sync.set({dvdafe: false});
  }
  if (!res.hasOwnProperty("dvdaff")) {
    browser.storage.sync.set({dvdaff: false});
  }
  if (!res.hasOwnProperty("dvdaid")) {
    browser.storage.sync.set({dvdaid: false});
  }
  if (!res.hasOwnProperty("dvdanf")) {
    browser.storage.sync.set({dvdanf: false});
  }
  if (!res.hasOwnProperty("dvdarn")) {
    browser.storage.sync.set({dvdarn: false});
  }
  if (!res.hasOwnProperty("dvdatv")) {
    browser.storage.sync.set({dvdatv: false});
  }
  if (!res.hasOwnProperty("dvdawl")) {
    browser.storage.sync.set({dvdawl: false});
  }
  if (!res.hasOwnProperty("dvdjfe")) {
    browser.storage.sync.set({dvdjfe: false});
  }
  if (!res.hasOwnProperty("dvdjhl")) {
    browser.storage.sync.set({dvdjhl: false});
  }
  if (!res.hasOwnProperty("dvdjnf")) {
    browser.storage.sync.set({dvdjnf: false});
  }
  if (!res.hasOwnProperty("dvdjwl")) {
    browser.storage.sync.set({dvdjwl: false});
  }
  if (!res.hasOwnProperty("dvdyfe")) {
    browser.storage.sync.set({dvdyfe: false});
  }
  if (!res.hasOwnProperty("vga")) {
    browser.storage.sync.set({vga: false});
  }
  if (!res.hasOwnProperty("vgj")) {
    browser.storage.sync.set({vgj: false});
  }
  if (!res.hasOwnProperty("vgy")) {
    browser.storage.sync.set({vgy: false});
  }
  if (!res.hasOwnProperty("soa")) {
    browser.storage.sync.set({soa: false});
  }
  if (!res.hasOwnProperty("soawl")) {
    browser.storage.sync.set({soawl: false});
  }
  if (!res.hasOwnProperty("soj")) {
    browser.storage.sync.set({soj: false});
  }
  if (!res.hasOwnProperty("sepAllCD")) {
    browser.storage.sync.set({sepAllCD: true});
  }
  if (!res.hasOwnProperty("sepAllDVD")) {
    browser.storage.sync.set({sepAllDVD: false});
  }
  if (!res.hasOwnProperty("sepOther")) {
    browser.storage.sync.set({sepOther: false});
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
