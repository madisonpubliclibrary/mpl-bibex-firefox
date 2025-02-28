function setIcon() {
  let defaultLinks = {
    "MAD": {
      "shortcutText4": "MPL Home Page",
      "shortcutLink4": "http://madisonpubliclibrary.org",
      "shortcutText5": "MPLnet",
      "shortcutLink5": "http://www.mplnet.org",
      "shortcutText6": "MPL Reference Tools",
      "shortcutLink6": "http://www.madisonpubliclibrary.org/research/referenc2",
      "shortcutText7": "SCLS Status Wiki",
      "shortcutLink7": "https://sclsstatus.pbworks.com"
    },
    "MID": {
      "shortcutText4": "MID Home Page",
      "shortcutLink4": "https://www.midlibrary.org",
      "shortcutText5": "MID Staff Page",
      "shortcutLink5": "https://www.midlibrary.org/library/staff/login.asp",
      "shortcutText6": "iSolved HCM",
      "shortcutLink6": "https://payrollcompany.myisolved.com/UserLogin.aspx",
      "shortcutText7": "",
      "shortcutLink7": ""
    },
    "SUN": {
      "shortcutText4": "SUN Home Page",
      "shortcutLink4": "https://www.sunprairiepubliclibrary.org",
      "shortcutText5": "",
      "shortcutLink5": "",
      "shortcutText6": "",
      "shortcutLink6": "",
      "shortcutText7": "",
      "shortcutLink7": ""
    },
    "PCPL": {
      "shortcutText4": "PCPL Home Page",
      "shortcutLink4": "https://www.pocolibrary.org",
      "shortcutText5": "",
      "shortcutLink5": "",
      "shortcutText6": "",
      "shortcutLink6": "",
      "shortcutText7": "",
      "shortcutLink7": ""
    },
    "SCLS": {
      "shortcutText4": "SCLS Home Page",
      "shortcutLink4": "https://www.scls.info",
      "shortcutText5": "SCLS Login Page",
      "shortcutLink5": "https://www.scls.info/user",
      "shortcutText6": "SCLS Status Wiki",
      "shortcutLink6": "https://sclsstatus.pbworks.com",
      "shortcutText7": "",
      "shortcutLink7": ""
    },
    "STO": {
      "shortcutText4": "STO Home Page",
      "shortcutLink4": "https://www.stoughtonpubliclibrary.org",
      "shortcutText5": "",
      "shortcutLink5": "",
      "shortcutText6": "",
      "shortcutLink6": "",
      "shortcutText7": "",
      "shortcutLink7": ""
    }
  };

  browser.storage.sync.get('skin').then((res) => {
    var skin = res.hasOwnProperty('skin') ? res.skin : 'MAD';

    switch (skin) {
      case "MID":
        browser.browserAction.setIcon({
          "path": {
            "16": "content/img/mid-icon2-16.png",
            "32": "content/img/mid-icon2-32.png",
            "48": "content/img/mid-icon2-48.png",
            "64": "content/img/mid-icon2-64.png",
            "128": "content/img/mid-icon2-128.png"
          }
        });

        browser.storage.sync.set(defaultLinks['MID']);
        break;
      case "PCPL":
        browser.browserAction.setIcon({
          "path": {
            "16": "content/img/pcpl-icon-16.png",
            "32": "content/img/pcpl-icon-32.png",
            "48": "content/img/pcpl-icon-48.png",
            "64": "content/img/pcpl-icon-64.png",
            "128": "content/img/pcpl-icon-128.png"
          }
        });

        browser.storage.sync.set(defaultLinks['PCPL']);
        break;
      case "SCLS":
        browser.browserAction.setIcon({
          "path": {
            "16": "content/img/scls-icon-16.png",
            "32": "content/img/scls-icon-32.png",
            "48": "content/img/scls-icon-48.png",
            "64": "content/img/scls-icon-64.png",
            "128": "content/img/scls-icon-128.png"
          }
        });

        browser.storage.sync.set(defaultLinks['SCLS']);
        break;
      case "STO":
        browser.browserAction.setIcon({
          "path": {
            "16": "content/img/sto-icon-16.png",
            "32": "content/img/sto-icon-32.png",
            "48": "content/img/sto-icon-48.png",
            "64": "content/img/sto-icon-64.png",
            "128": "content/img/sto-icon-128.png"
          }
        });

        browser.storage.sync.set(defaultLinks['STO']);
        break;
      case "SUN":
        browser.browserAction.setIcon({
          "path": {
            "16": "content/img/sun-icon-16.png",
            "32": "content/img/sun-icon-32.png",
            "48": "content/img/sun-icon-48.png",
            "64": "content/img/sun-icon-64.png",
            "128": "content/img/sun-icon-128.png"
          }
        });

        browser.storage.sync.set(defaultLinks['SUN']);
        break;
      default:
        browser.browserAction.setIcon({
          "path": {
            "16": "content/img/mpl-icon-16.png",
            "32": "content/img/mpl-icon-32.png",
            "48": "content/img/mpl-icon-48.png",
            "64": "content/img/mpl-icon-64.png",
            "128": "content/img/mpl-icon-128.png"
          }
        });

        browser.storage.sync.set(defaultLinks['MAD']);
    }
  });
};

setIcon();

class libraryDist {
  #code;
  #address;
  #addressURI;
  #distanceAway;

  constructor(code, address) {
    this.#code = code;
    this.#address = address;
    this.#addressURI = address.replaceAll(' ', '+');
    this.#distanceAway = undefined;
  }

  getCode = () => { return this.#code; }
  getAddress = () => { return this.#address; }
  getAddressURI = () => { return this.#addressURI; }
  getDistAway = () => { return this.#distanceAway; }

  setDistanceAway = function(meters) {
    this.#distanceAway = meters;
  };
};

class SCLSlibs {
  #libs;

  constructor() {
    const MPLlibs = [
      new libraryDist("HAW", "2707 E Washington Ave, Madison, WI 53704"),
      new libraryDist("HPB", "733 N High Point Rd, Madison, WI 53717"),
      new libraryDist("LAK", "2845 N Sherman Ave, Madison, WI 53704"),
      new libraryDist("MAD","201 W Mifflin St, Madison, WI 53703"),
      new libraryDist("MEA","5726 Raymond Rd, Madison, WI 53711"),
      new libraryDist("MSB","1705 Monroe St, Madison, WI 53711"),
      new libraryDist("PIN","204 Cottage Grove Rd, Madison, WI 53716"),
      new libraryDist("SEQ","4340 Tokay Blvd, Madison, WI 53711"),
      new libraryDist("SMB","2222 S Park St, Madison, WI 53713")
    ];

    this.#libs = {
      "MPL": MPLlibs,
      "Adams": [
        new libraryDist("ACL", "569 N Cedar St, Adams, WI 53910"),
        new libraryDist("ROM", "1157 Rome Center Dr, Nekoosa, WI 54457")
      ],
      "Columbia": [
        new libraryDist("CIA", "109 W Edgewater St, Cambria, WI 53923"),
        new libraryDist("COL", "223 W James St, Columbus, WI 53925"),
        new libraryDist("LDI", "130 Lodi St, Lodi, WI 53555"),
        new libraryDist("PAR", "119 N Main St, Pardeeville, WI 53954"),
        new libraryDist("POR", "253 W Edgewater St, Portage, WI 53901"),
        new libraryDist("POY", "118 N Main St, Poynette, WI 53955"),
        new libraryDist("RAN", "228 N High St Randolph, WI 53956"),
        new libraryDist("RIO", "324 W Lyons St, Rio, WI 53960"),
        new libraryDist("WID", "620 Elm St, Wisconsin Dells, WI 53965"),
        new libraryDist("WYO", "165 E Dodge St, Wyocena, WI 53969")
      ],
      "Dane": MPLlibs.concat([
        new libraryDist("BLV", "130 S Vine St, Belleville, WI 53508"),
        new libraryDist("BER", "1210 Mills St, Black Earth, WI 53515"),
        new libraryDist("CBR", "101 Spring Water Alley, Cambridge, WI 53523"),
        new libraryDist("CSP", "2107 Julius St, Cross Plains, WI 53528"),
        // new libraryDist("DCL","1874 S Stoughton Rd, Madison, WI 53716"), ** DCL Office **
        new libraryDist("DEE", "12 W Nelson St, Deerfield, WI 53531"),
        new libraryDist("DFT", "203 Library St, DeForest, WI 53532"),
        new libraryDist("FCH", "5530 Lacy Rd, Fitchburg, WI 53711"),
        new libraryDist("MAR", "605 Waterloo Rd, Marshall, WI 53559"),
        new libraryDist("MAZ", "102 Brodhead St, Mazomanie, WI 53560"),
        new libraryDist("MCF", "5920 Milwaukee St, McFarland, WI 53558"),
        new libraryDist("MID", "7425 Hubbard Ave, Middleton, WI 53562"),
        new libraryDist("MOO", "1000 Nichols Rd, Monona, WI 53716"),
        new libraryDist("MTH", "105 Perimeter Rd, Mount Horeb, WI 53572"),
        new libraryDist("ORE", "256 Brook St, Oregon, WI 53575"),
        new libraryDist("STO", "304 S 4th St, Stoughton, WI 53589"),
        new libraryDist("SUN", "1350 Linnerud Dr, Sun Prairie, WI 53590"),
        new libraryDist("VER", "500 Silent St, Verona, WI 53593"),
        new libraryDist("WAU", "710 South St, Waunakee, WI 53597")
      ]),
      "Green": [
        // new libraryDist("ALB","200 N Water St, Albany, WI 53502"), ** NON LINK LIBRARY **
        new libraryDist("BRD", "1207 25th St, Brodhead, WI 53520"),
        new libraryDist("MRO", "925 16th Ave, Monroe, WI 53566"),
        new libraryDist("MNT", "512 E Lake Ave, Monticello, WI 53570"),
        new libraryDist("NGL", "319 Second St, New Glarus, WI 53574")
      ],
      "Portage": [
        new libraryDist("ALM", "122 Main St, Almond, WI 54909"),
        new libraryDist("AMH", "278 N Main St, Amherst, WI 54406"),
        new libraryDist("PLO", "2151 Roosevelt Dr, Plover, WI 54467"),
        new libraryDist("ROS", "137 N Main St, Rosholt, WI 54473"),
        new libraryDist("STP", "1001 Main St, Stevens Point, WI 54481")
      ],
      "Sauk": [
        new libraryDist("BAR", "230 Fourth Ave, Baraboo, WI 53913"),
        new libraryDist("LAV", "101 W Main St, La Valle, WI 53941"),
        new libraryDist("NOF", "105 N Maple St, North Freedom, WI 53951"),
        new libraryDist("PLA", "910 Main St, Plain, WI 53577"),
        new libraryDist("PDS", "540 Water St, Prairie du Sac, WI 53578"),
        new libraryDist("REE", "370 Vine St, Reedsburg, WI 53959"),
        new libraryDist("RKS", "101 First St, Rock Springs, WI 53961"),
        new libraryDist("SKC", "515 Water St, Sauk City, WI 53583"),
        new libraryDist("SGR", "230 E Monroe St, Spring Green, WI 53588")
      ],
      "Wood": [
        new libraryDist("ARP", "8091 County E, Arpin, WI 54410"),
        new libraryDist("MCM", "490 E Grand Ave, Wisconsin Rapids, WI 54494"),
        new libraryDist("MFD", "211 E Second St, Marshfield, WI 54449"),
        new libraryDist("NEK", "100 Park St, Nekoosa, WI 54457")
        // new libraryDist("PIT","5291 Third Ave, Pittsville, WI 54466"), ** NON LINK LIBRARY **
        // new libraryDist("VES","6550 Virginia St, Vesper, WI 54489") ** NON LINK LIBRARY **
      ],
    };
  }

  getLibs = function(scope) {
    if (scope === "SCLS" || !scope) {
      return this.#libs.Adams.concat(this.#libs.Columbia, this.#libs.Dane, this.#libs.Green, this.#libs.Portage, this.#libs.Sauk, this.#libs.Wood);
    } else {
      return this.#libs[scope];
    }
  }
};

// Create and handle context menu item for problem item form
browser.menus.create({
  "id": "start-pi-form",
  "title": "Use Barcode in Problem Item Form",
  "contexts": ["link", "selection"]
});

browser.menus.onClicked.addListener((info, tab) => {
  if (info.menuItemId === "start-pi-form") {
    var barcode;

    function sendErrorMsg(msg) {
      browser.tabs.executeScript(tab.id, {
        "code": "alert('" + msg + "');"
      });
    }

    // Populate barcode based on the particular context type
    if (info.selectionText) {
      barcode = info.selectionText;
    } else if (info.linkText) {
      barcode = info.linkText;
    } else {
      sendErrorMsg("ERROR: Failed to extract text data.");
      return;
    }

    if (barcode.match(/[23]\d{13}/g)) {
      if (barcode.match(/[23]\d{13}/g).length === 1) {
        barcode = /[23]\d{13}/.exec(barcode);

        if (barcode) barcode = barcode[0];

        switch (barcode.substr(0, 1)) {
          case "2":
            browser.tabs.create({
              "url": browser.runtime.getURL("../problemItemForm/problemItemForm.html") + "?patron=" + barcode
            });
            break;
          case "3":
            browser.tabs.create({
              "url": browser.runtime.getURL("../problemItemForm/problemItemForm.html") + "?item=" + barcode
            });
            break;
          default:
            sendErrorMsg("ERROR: Unable to determine barcode type.");
            break;
        }
      } else {
        sendErrorMsg("ERROR: Multiple barcodes found in selection.");
      }
    } else {
      sendErrorMsg("ERROR: Barcode not found in selection or link.");
    }
  }
});

// Load preference-selected function files
browser.webNavigation.onCompleted.addListener(details => {
  if (details.parentFrameId <= 0) {
    // Optional scripts
    browser.storage.sync.get().then(res => {
      if (!res.hasOwnProperty('restrictPatronFields') ||
          (res.hasOwnProperty('restrictPatronFields') && res.restrictPatronFields)) {
        browser.tabs.executeScript(details.tabId, {
          "file": "/content/scripts/opt/restrictPatronFields.js",
          "allFrames": true
        });
      }

      if (!res.hasOwnProperty('parseAddr') ||
          (res.hasOwnProperty('parseAddr') && res.parseAddr)) {
        browser.tabs.executeScript(details.tabId, {
          "file": "/content/scripts/opt/parsePatronAddr.js",
          "allFrames": true
        });
      }

      if (res.hasOwnProperty('mplInternetCards') && res.mplInternetCards) {
        browser.tabs.executeScript(details.tabId, {
          "file": "/content/scripts/opt/mplInternetCards.js",
          "allFrames": true
        });
      }

      if (!res.hasOwnProperty('addPatronNotes') ||
          (res.hasOwnProperty('addPatronNotes') && res.addPatronNotes)) {
        browser.tabs.executeScript(details.tabId, {
          "file": "/content/scripts/opt/patronMessages.js",
          "allFrames": true
        });
      }

      browser.storage.sync.get(['sundayDropbox','sundayDropboxPaused']).then(res => {
        if ((!res.hasOwnProperty('sundayDropbox') ||
            (res.hasOwnProperty('sundayDropbox') && res.sundayDropbox)) && (new Date()).getDay() === 0) {
          // If sundayDropbox is not paused
          if (!res.hasOwnProperty('sundayDropboxPaused') ||
              (res.hasOwnProperty('sundayDropboxPaused') && !res.sundayDropboxPaused)) {
            browser.tabs.executeScript(details.tabId, {
              "file": "/content/scripts/opt/sundayDropbox.js",
              "allFrames": true
            });
          }
        } else {
          if (res.hasOwnProperty('sundayDropboxPaused') && res.sundayDropboxPaused) {
            browser.storage.sync.set({"sundayDropboxPaused": false});
          }
        }
      });
    });

    // Inherent scripts
    browser.tabs.executeScript(details.tabId, {
      "file": "/content/scripts/detectBibliovationURL.js",
      "allFrames": true
    });

    browser.tabs.executeScript(details.tabId, {
      "file": "/content/scripts/fastaddWarning.js",
      "allFrames": true
    });

    browser.tabs.executeScript(details.tabId, {
      "file": "/content/scripts/formatPatronRecord.js",
      "allFrames": true
    });

    browser.tabs.executeScript(details.tabId, {
      "file": "/content/scripts/updateAccountType.js",
      "allFrames": true
    });

    browser.tabs.executeScript(details.tabId, {
      "file": "/content/scripts/patronQuickSave.js",
      "allFrames": true
    });

    browser.tabs.executeScript(details.tabId, {
      "file": "/content/scripts/printPatronBarcode.js",
      "allFrames": true
    });

    browser.tabs.executeScript(details.tabId, {
      "file": "/content/scripts/selectPSTAT.js",
      "allFrames": true
    });

    browser.tabs.executeScript(details.tabId, {
      "file": "/content/scripts/separateHSA.js",
      "allFrames": true
    });

    browser.tabs.executeScript(details.tabId, {
      "file": "/content/scripts/sortItemCheckoutHistory.js",
      "allFrames": true
    });
  }

  browser.tabs.executeScript(details.tabId, {
    "file": "/content/scripts/betterLogo.js",
    "allFrames": true
  });
});

browser.runtime.onMessage.addListener((request, sender, sendResponse) => {
  switch (request.key) {
    case "findNearestLib":
      const libs = (new SCLSlibs()).getLibs(request.selected);
      const googleMapsDistMatrixRequestMax = 25;
      const distanceRequests = [];

      for (let i = 0; i < libs.length; i += googleMapsDistMatrixRequestMax) {
        const libChunk = libs.slice(i, i + googleMapsDistMatrixRequestMax);
        distanceRequests.push("https://maps.googleapis.com/maps/api/distancematrix/json" +
            "?key=AIzaSyACm32waDNAoshMxId42UZNtyMgws7Rv-k&origins=" +
            request.address + "&destinations=" +
            libChunk.map((lib) => `${lib.getAddressURI()}`).join("|"));
      }

      return Promise.all(distanceRequests.map(u=>fetch(u))).then(responses => {
        return Promise.all(responses.map(res => {
          if (!res.ok) {
            throw new Error('[maps.googleapis.com] HTTP error, status = ' + res.status);
          }
          return res.json()
        }));
      }).then(jsons => {
        // Verify all fetch requests succeed
        for (let j of jsons) {
          if (j.status !== "OK") {
            switch (j.status) {
              case "INVALID_REQUEST":
                throw new Error("The provided request was invalid.");
              case "MAX_ELEMENTS_EXCEEDED":
                throw new Error("The product of origins and destinations exceeds the per-query limit.");
              case "MAX_DIMENSIONS_EXCEEDED":
                throw new Error("The number of origins or destinations exceeds the per-query limit.");
              case "OVER_DAILY_LIMIT":
                throw new Error("The daily request limit has been exceeded.");
              case "OVER_QUERY_LIMIT":
                throw new Error("The service has received too many requests from MPL BibEx today.");
              case "REQUEST_DENIED":
                throw new Error("Request denied.");
              case "UNKNOWN_ERROR":
                throw new Error("Unknown error.");
            }
          }
        }

        for (let i = 0; i < jsons.length; i++) {
          const rows = jsons[i].rows[0].elements;
          for (let j = 0; j < rows.length; j++) {
            libs[j+(i*googleMapsDistMatrixRequestMax)].setDistanceAway(jsons[i].rows[0].elements[j].distance.value);
          }
        }

        libs.sort((a,b) => {
          if (a.getDistAway() > b.getDistAway()) return 1;
          else if (a.getDistAway() < b.getDistAway()) return -1;
          else return 0;
        });
        console.log(libs[0].getCode());

        return libs[0].getCode();
      });
    case "printBarcode":
      browser.storage.sync.get('receiptFont').then(res => {
        let receiptFont = res.hasOwnProperty('receiptFont') ? res.receiptFont : "36px";

        browser.tabs.create({
          "url": "/printBarcode/printBarcode.html?barcode=" + request.barcode + "&fontSize=" + receiptFont,
          "active": false
        }).then(tab => {
          setTimeout(() => {
            browser.tabs.remove(tab.id);
          }, 1000);
        });
      });
      break;
    case "parsePatronAddr":
      return fetch("https://www.mplnet.org/bibex/xml/special").then(res => {
        if (!res.ok) {
          throw new Error('[MPLnet] HTTP error, status = ' + res.status);
        }
        return res.text();
      }).then(str => {
        return (new window.DOMParser()).parseFromString(str, "text/xml");
      }).then(data => {
        let cleanedData = [];
        for (let item of data.children[0].children) {
          let i = {};
          for (let tag of item.children) {
            i[tag.tagName] = tag.textContent;
          }
          cleanedData.push(i);
        }
        return cleanedData;
      });
    case "updateExtensionIcon":
      setIcon();
      break;
    case "pauseSundayDropbox":
      browser.storage.sync.set({"sundayDropboxPaused": true});
      setTimeout(() => {
        browser.storage.sync.set({"sundayDropboxPaused": false});
      }, 180000); // 3min
      break;
    case "resumeSundayDropbox":
        browser.storage.sync.set({"sundayDropboxPaused": false});
      break;
    case "addrNoteCooldown":
      chrome.storage.sync.set({"addrNoteCooldown": true});
      setTimeout(() => {
        chrome.storage.sync.set({"addrNoteCooldown": false});
      }, 5000);
      break;
    case "addLostCardNote":
      browser.tabs.executeScript({
        "file": "/browserAction/scripts/addLostCardNote.js",
        "allFrames": true
      });
      break;
    case "getPatronData":
      return browser.storage.sync.get('bibliovationBaseURL').then(urlRes => {
        const baseURL = urlRes.bibliovationBaseURL;
        return new Promise((resolve, reject) => {
          if (request.hasOwnProperty('patronBarcode')) {
            browser.tabs.create({
              "url": baseURL + "/cgi-bin/koha/members/member.pl?member=" +
                  request.patronBarcode,
              "active": false
            }).then(tab => {
              browser.tabs.executeScript(tab.id, {
                "code": "document.querySelector('a[href^=\"/app/staff/patron\"]').href.match(/\\d+/)[0]"
              }).then(patronID => {
                browser.tabs.remove(tab.id);
                if (patronID.length > 0 && /\d+/.test(patronID[0])) {
                  resolve(patronID[0]);
                } else {
                  throw new Error('Failed to get patron ID number.');
                }
              });
            });
          } else if (request.hasOwnProperty('patronID')) {
            resolve(request.patronID);
          } else {
            throw new Error('Failed to get patron ID number.');
          }
        }).then(patronID => {
          return browser.tabs.create({
            "url": baseURL + "/cgi-bin/koha/members/moremember.pl?borrowernumber=" +
                patronID,
            "active": false
          }).then(tab => {
            return browser.tabs.executeScript(tab.id, {
              "file": "/problemItemForm/getPatronData.js"
            }).then(res => {
              browser.tabs.remove(tab.id);
              return res;
            });
          });
        });
      });
    case "getItemData":
      return browser.storage.sync.get('bibliovationBaseURL').then(urlRes => {
        const baseURL = urlRes.bibliovationBaseURL;
        return new Promise((resolve, reject) => {
          browser.tabs.create({
            "url": baseURL + "/app/search/" + request.itemBarcode,
            "active": true
          }).then(tab => {
            browser.tabs.executeScript(tab.id, {
              "file": "/problemItemForm/getItemBib.js"
            }).then(bibNum => {
              browser.tabs.remove(tab.id);
              if (bibNum.length > 0 && /\d+/.test(bibNum[0])) {
                resolve(bibNum[0]);
              } else {
                throw new Error('Failed to get item bib number.');
              }
            });
          });
        }).then(bibNum => {
          return browser.storage.sync.get('getItemUse').then(usePref => {
            let getItemTitleCopiesHolds = new Promise((resolve, reject) => {
              browser.tabs.create({
                "url": baseURL + "/app/staff/bib/" + bibNum + "/details?mbxItemBC=" + request.itemBarcode,
                "active": true
              }).then(tab => {
                browser.tabs.executeScript(tab.id, {
                  "file": "/problemItemForm/getItemTitleCopiesHolds.js"
                }).then(res => {
                  browser.tabs.remove(tab.id);
                  resolve(res[0]);
                });
              });
            });

            if (usePref.hasOwnProperty('getItemUse') && usePref.getItemUse) {
              let getItemUse = new Promise((resolve, reject) => {
                browser.tabs.create({
                  "url": baseURL + "/app/staff/bib/" + bibNum + "/items/circstatus?mbxItemBC=" + request.itemBarcode,
                  "active": true
                }).then(tab => {
                  browser.tabs.executeScript(tab.id, {
                    "file": "/problemItemForm/getItemUse.js"
                  }).then(res => {
                    browser.tabs.remove(tab.id);
                    resolve(res[0]);
                  });
                });
              });

              let getItemPastUse = new Promise((resolve, reject) => {
                browser.tabs.create({
                  "url": baseURL + "/app/staff/bib/" + bibNum + "/items?mbxItemBC=" + request.itemBarcode,
                  "active": true
                }).then(tab => {
                  browser.tabs.executeScript(tab.id, {
                    "file": "/problemItemForm/getItemPastUse.js"
                  }).then(res => {
                    browser.tabs.remove(tab.id);
                    resolve(res[0]);
                  });
                });
              });

              return Promise.all([getItemTitleCopiesHolds, getItemUse, getItemPastUse]).then(res => {
                /**
                 * There is no way to calculate an item's exact total use in Bibliovation if it was
                 * acquired before 2012. If the acquisition date is before 2012, item use should be
                 * calculated by adding Dynix and Koha Past Use and the YTD. If the acquisition date
                 * is after 2012, item use should use only the "total use" value.
                 *
                 * The most accurate use data will always be the larger of these two calculations, which
                 * is what the extension calculates below.
                 */
                res[0].use = Math.max(parseInt(res[1].ytd) + parseInt(res[2].pastUse), parseInt(res[1].totalUse));
                return res[0];
              });
            } else {
              return getItemTitleCopiesHolds.then(res => {return res});
            }
          });
        });
      });
    case "printProblemForm":
      browser.tabs.create({
        "active": false,
        "url": browser.runtime.getURL("../problemItemForm/printProblemForm.html")
      }).then(tab => {
        setTimeout(() => {
          browser.tabs.sendMessage(tab.id, {
            "key": "printProblemForm",
            "data": request.data
          }).then(() => {
            browser.tabs.remove(tab.id);
          });
        }, 500);
      });
      break;
    case "addPicklistContextMenu":
      browser.menus.create({
        "id": "insert-picklist-sort-below",
        "title": "Insert Row Below",
        "contexts": ["editable"]
      });
      
      browser.menus.onClicked.addListener((info, tab) => {
        browser.tabs.sendMessage(tab.id,{"key": "insertBelow", "contextInfo": info});
      });
      break;
    case "removePicklistContextMenu":
      browser.menus.remove("insert-picklist-sort-below");
      break;
    case "getWeedingData":
      return browser.storage.sync.get('bibliovationBaseURL').then(urlRes => {
        const baseURL = urlRes.bibliovationBaseURL;
        return browser.tabs.create({
          "url": baseURL + "/app/search/" + request.barcode,
          "active": true
        }).then(tab => {
          return browser.tabs.executeScript(tab.id, {
            "file": "/weedingSlip/getItemBib.js"
          }).then(res => {
            browser.tabs.remove(tab.id);
            return res;
          });
        }).then(resArr => {
          let payload = resArr[0];
          
          return browser.tabs.create({
            "url": baseURL + "/cgi-bin/koha/catalogue/MARCdetail.pl?biblionumber=" + payload.itemBib,
            "active": true
          }).then(tab => {
            return browser.tabs.executeScript(tab.id, {
              "file": "/weedingSlip/scrapeMARC.js"
            }).then(resArr => {
              browser.tabs.remove(tab.id);
              // For now, we'll include the full title scraped form the Detail page in getItemBib.js
              // rather than the MARC Title field (which is just one part of the full title).
              //payload.title = resArr[0].title;
              payload.pubDate = resArr[0].pubDate;
              return payload;
            });
          });
        }).then(res => {
          let payload = res;
    
          return browser.tabs.create({
            "url": baseURL + "/app/staff/bib/" + payload.itemBib + "/items/circstatus",
            "active": true
          }).then(tab => {
            return browser.tabs.executeScript(tab.id, {
              "file": "/weedingSlip/scrapeStatuses.js"
            }).then(resArr => {
              browser.tabs.remove(tab.id);
              payload.mplItems = resArr[0].copies;
              payload.nonMPLcopies = resArr[0].nonMPLcopies;
              return payload;
            });
          });
        });
      });
    case "printWeedingSlip":
      browser.tabs.create({
        "active": false,
        "url": browser.runtime.getURL("/weedingSlip/printWeedingSlip.html")
      }).then(tab => {
        setTimeout(() => {
          browser.tabs.sendMessage(tab.id, {
            "key": "printWeedingSlip",
            "data": request.data
          }).then(() => {
            browser.tabs.remove(tab.id);
          });
        }, 500);
      });
      break;
  }
});
