var setIcon = function() {
  browser.storage.sync.get('skin').then((res) => {
    var skin = res.hasOwnProperty('skin') ? res.skin : 'MAD'

    switch (skin) {
      case "MID":
        browser.browserAction.setIcon({
          path: {
            16: "content/img/mid-icon-16.png",
            32: "content/img/mid-icon-32.png",
            48: "content/img/mid-icon-48.png",
            64: "content/img/mid-icon-64.png",
            128: "content/img/mid-icon-128.png"
          }
        });
        break;
      case "SCLS":
        browser.browserAction.setIcon({
          path: {
            16: "content/img/scls-icon-16.png",
            32: "content/img/scls-icon-32.png",
            48: "content/img/scls-icon-48.png",
            64: "content/img/scls-icon-64.png",
            128: "content/img/scls-icon-128.png"
          }
        });
        break;
      case "SUN":
        browser.browserAction.setIcon({
          path: {
            16: "content/img/sun-icon-16.png",
            32: "content/img/sun-icon-32.png",
            48: "content/img/sun-icon-48.png",
            64: "content/img/sun-icon-64.png",
            128: "content/img/sun-icon-128.png"
          }
        });
        break;
      default:
        browser.browserAction.setIcon({
          path: {
            16: "content/img/mpl-icon-16.png",
            32: "content/img/mpl-icon-32.png",
            48: "content/img/mpl-icon-48.png",
            64: "content/img/mpl-icon-64.png",
            128: "content/img/mpl-icon-128.png"
          }
        });
    }
  });
};

// Load preference-selected function files
browser.webNavigation.onCompleted.addListener(details => {
  browser.storage.sync.get().then(res => {
    if (!res.hasOwnProperty('restrictPatronFields') ||
        (res.hasOwnProperty('restrictPatronFields') && res.restrictPatronFields)) {
      browser.tabs.executeScript(details.tabId, {
        file: "/content/scripts/opt/restrictPatronFields.js",
        allFrames: true
      });
    }
  });
});

browser.runtime.onMessage.addListener((request, sender, sendResponse) => {
  switch (request.key) {
    case "updateExtensionIcon":
      setIcon();
      break;
    case "addLostCardNote":
      browser.tabs.executeScript({
        file: "/browserAction/scripts/addLostCardNote.js",
        allFrames: true
      });
      break;
    case "addPaymentPlanNote":
      browser.tabs.executeScript({
        file: "/browserAction/scripts/addPaymentPlanNote.js",
        allFrames: true
      });
      break;
    case "queryGeocoder":
      var matchAddr, county, countySub, censusTract, zip;

      const baseURL = "https://geocoding.geo.census.gov/geocoder/geographies/address?street="
        countyURL = baseURL + request.addressURI + "&city=" + request.city
            + "&state=wi&benchmark=Public_AR_Current&vintage=Current_Current&layers=Counties&format=json",
        countySubdivisionURL = baseURL + request.addressURI + "&city=" + request.city
            + "&state=wi&benchmark=Public_AR_Current&vintage=Current_Current&layers=County+Subdivisions&format=json",
        censusTractURL = baseURL + request.addressURI + "&city=" + request.city
            + "&state=wi&benchmark=Public_AR_Current&vintage=Current_Current&layers=Census Tracts&format=json";

      const getCounty = fetch(countyURL, {"method": "GET"}).then(response => {
        if(!response.ok && response.status != '400') {
          throw new Error('[census.gov] HTTP error, status = ' + response.status);
        }
        return response.json();
      });

      const getCountySub = fetch(countySubdivisionURL, {"method": "GET"}).then(response => {
        if(!response.ok && response.status != '400') {
          throw new Error('[census.gov] HTTP error, status = ' + response.status);
        }
        return response.json();
      });

      const getCensusTract = fetch(censusTractURL, {"method": "GET"}).then(response => {
        if(!response.ok && response.status != '400') {
          throw new Error('[census.gov] HTTP error, status = ' + response.status);
        }
        return response.json();
      });

      return Promise.all([getCounty,getCountySub,getCensusTract]).then(vals => {
        return new Promise(function(resolve, reject) {
          var countyData = vals[0], countySubData = vals[1],
              censusTractData = vals[2];

          if (countyData.errors) {
            throw new Error(countyData.errors.join("; "));
          } else if (!countyData || !countyData.result || countyData.result.addressMatches.length === 0) {
            throw new Error("No county data matched given address.");
          } else if (countySubData.errors) {
            throw new Error(countySubData.errors.join("; "));
          } else if (!countySubData || !countySubData.result || countySubData.result.addressMatches.length === 0) {
            throw new Error("No county subdivision data matched given address.");
          } else if (censusTractData.errors) {
            throw new Error(censusTractData.errors.join("; "));
          } else if (!censusTractData || !censusTractData.result || censusTractData.result.addressMatches.length === 0) {
            throw new Error("No census tract data matched given address.");
          } else {
            // Select the last match if multiple are found
            // I'm not sure if this works for all cases of multiple addresses,
            // But it does for a particular address in Monona
            const lastIdx = countyData.result.addressMatches.length - 1;

            countyData = countyData.result.addressMatches[lastIdx];
            countySubData = countySubData.result.addressMatches[lastIdx];
            censusTractData = censusTractData.result.addressMatches[lastIdx];

            matchAddr = countyData.matchedAddress.split(',')[0].toUpperCase();
            county = countyData.geographies.Counties[0].BASENAME;
            countySub = countySubData.geographies['County Subdivisions'][0].NAME;
            zip = countyData.addressComponents.zip;
            censusTract = censusTractData.geographies['Census Tracts'];
            if (censusTract) censusTract = censusTract[0].BASENAME;

            if (matchAddr && county && countySub && censusTract && zip) {
              if (county === "Dane" && /^(Middleton|Sun Prairie|Verona) city$/.test(countySub)) {
                const libCode = countySub.substring(0,3).toLowerCase(),
                  alderURL = "https://mpl-bibex.lrschneider.com/pstats/" + libCode +
                    "?val=all&regex=true";

                return resolve(fetch(alderURL, {"method": "GET"}).then(response => {
                  return response.json();
                }).then(json => {
                  var value;

                  for (var i = 0; i < json.length; i++) {
                    var regex = new RegExp(json[i].regex, "i");
                    if (regex.test(matchAddr)) {
                      value = json[i].value;
                    }
                  }

                  return Promise.resolve({
                    "key": "returnCensusData",
                    "matchAddr": matchAddr,
                    "county": county,
                    "countySub": countySub,
                    "censusTract": censusTract,
                    "zip": zip,
                    "value": value
                  });
                }));
              } else {
                resolve({
                  "key": "returnCensusData",
                  "matchAddr": matchAddr,
                  "county": county,
                  "countySub": countySub,
                  "censusTract": censusTract,
                  "zip": zip
                });
              }
            }
          }
        });
      });
      break;
    case "alternatePSTAT":
      browser.tabs.query({
        currentWindow: true,
        active: true
      }).then(tabs => {
        for (let tab of tabs) {
          browser.tabs.sendMessage(tab.id, {
            "key": "findAlternatePSTAT"
          });
        }
      });
      break;
    case "queryAlderDists":
      if (request.code === "mad") request.code = "madExceptions";

      const alderURL = "https://mpl-bibex.lrschneider.com/pstats/"
          + request.code + "?val=all&regex=true";

      return new Promise(function(resolve, reject) {
        return resolve(fetch(alderURL, {"method": "GET"}).then(response => {
          if(!response.ok) {
            throw new Error('[lrschneider.com] HTTP error, status = ' + response.status);
          }
          return response.json();
        }).then(json => {
          var value, zip;
          for (var i = 0; i < json.length; i++) {
            var regex = new RegExp(json[i].regex, "i");

            if (regex.test(request.address)) {
              value = json[i].value;
              zip = json[i].zip
              break;
            }
          }

          if (value && zip) {
            return Promise.resolve({
              "value": value,
              "zip": zip
            })
          } else if (value) {
            return Promise.resolve({"value": "value"});
          } else {
            throw new Error("");
          }
        }));
      });
      break;
    case "openFactFinder":
      let ffTab = browser.tabs.create({
        "url": "https://factfinder.census.gov/faces/nav/jsf/pages/searchresults.xhtml",
        "active": true
      }).then(tab => {
        browser.tabs.executeScript(tab.id, {
          "file": "/content/scripts/openFactFinder.js",
          "allFrames": true
        }).then(() => {
          browser.tabs.sendMessage(tab.id, {
            "key": "addressData",
            "address": request.address,
            "city": request.city
          })
        });
      });
      break;
  }
});
