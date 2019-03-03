var t = setInterval(function() {
  if (window.location.toString().includes("/app/staff/circ/checkin/")) {
    browser.storage.sync.get("sundayDropboxPaused").then(res => {
      var dropbox = Array.from(document.getElementsByTagName('button'))
                         .filter(elt => elt.title === "Dropbox mode");

      if (dropbox && dropbox.length > 0) {
        dropbox = dropbox[0];
        if (!res.sundayDropboxPaused && !dropbox.classList.contains("dropbox-active")) {
          dropbox.click();
        }

        if (!dropbox.getAttribute('onclick')) {
          dropbox.onclick = function() {
            if (this.classList.contains("dropbox-active")) {
              browser.storage.sync.set({"sundayDropboxPaused": true});
              setTimeout(() => {
                browser.storage.sync.set({"sundayDropboxPaused": false});
              }, 180000); // 3min
            } else {
              browser.storage.sync.set({"sundayDropboxPaused": false});
            }
          };
        }
      }
    });
  }
}, 250);
