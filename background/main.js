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
}

browser.runtime.onMessage.addListener((request, sender, sendResponse) => {
  switch (request.key) {
    case "updateExtensionIcon":
      setIcon();
      break;
    case "addLostCardNote":
      browser.tabs.executeScript({
        file: "/browserAction/scripts/addLostCardNote.js"
      });
      break;
    case "queryGeocoder":
      /**
       * Query the Census website for data simultaneously in two different ways:
       *
       * 1) A JSON request is made using the Census Geocoder API.
       * 2) An American FactFinder tab is silently opened, a search is performed
       *    based on the address, and the results table is scrapped for data.
       *
       * The data from whichever method returns (positively) first, is used.
       */
      var matchAddr, county, countySub, censusTract, zip;

      // Method 1: Census geocoder
      var baseURL = "https://geocoding.geo.census.gov/geocoder/geographies/address?street="
        countyURL = baseURL + request.addressURI + "&city=" + request.city
            + "&state=wi&benchmark=Public_AR_Current&vintage=Current_Current&layers=Counties&format=json",
        countySubdivisionURL = baseURL + request.addressURI + "&city=" + request.city
            + "&state=wi&benchmark=Public_AR_Current&vintage=Current_Current&layers=County+Subdivisions&format=json",
        censusTractURL = baseURL + request.addressURI + "&city=" + request.city
            + "&state=wi&benchmark=Public_AR_Current&vintage=Current_Current&layers=Census Tracts&format=json",
        xhr = new XMLHttpRequest();

      xhr.onreadystatechange = () => {
        if (this.readyState == XMLHttpRequest.DONE && this.status == 200) {
          console.log(this.responseText);
        }
      };
      xhr.open("GET", countyURL, true);
      xhr.send();
      break;
    case "getPstatException":
      var pstatURL = "https://mpl-bibex.lrschneider.com/pstats/" + request.lib
          + "?val=all&regex=true",
        xhr = new XMLHttpRequest();

      xhr.onreadystatechange = () => {
        if (this.readyState == XMLHttpRequest.DONE && this.status == 200) {
          console.log(this.responseText)
        }
      };
      xhr.open("GET", pstatURL, true);
      xhr.send();
      break;
    case "alternatePSTAT":
      break;
  }
});
