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
  }
});