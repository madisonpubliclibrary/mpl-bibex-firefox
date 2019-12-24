(function(){
  const accountType = document.getElementById('categorycode');

  function makeInternetCard() {
    if (accountType && accountType.value === "WEB") {
      const addr = document.getElementById('address');
      const city = document.getElementById('city');
      const zip = document.getElementById('zipcode');
      const pstat = document.getElementsByName('sort1')[0];
      const circNote = document.getElementById('borrowernotes');
      const yesDebarred = document.getElementById('yesdebarred');
      const noDebarred = document.getElementById('nodebarred');

      addr.value = "NA";
      city.value = "MADISON WI";
      zip.value = "00088";
      pstat.value = "D-17.04";
      circNote.value = "FOR INTERNET USE ONLY; NO CKO ALLOWED. jfk";

      if (yesDebarred && noDebarred) {
        yesDebarred.checked = true;
        noDebarred.checked = false;

        browser.storage.sync.get('triggerDebarred').then(res => {
          const debarAccount = res.hasOwnProperty('triggerDebarred') ? res.triggerDebarred : false;
          browser.storage.sync.set({'triggerDebarred': false}).then(()=> {
            if (debarAccount) {
              const saveButton = document.getElementById('entryform_submit');
              if (saveButton) saveButton.click();
            }
          });
        });
      } else {
        browser.storage.sync.set({'triggerDebarred': true});
      }
    } else {
      browser.storage.sync.set({'triggerDebarred': false});
    }
  }

  if (accountType) {
    accountType.addEventListener('change', makeInternetCard);
    makeInternetCard();
  }

  /** If we're on the checkout screen, check whether we need to make the account debarred **/
  if (/\/cgi-bin\/koha\/members\/moremember\.pl\?borrowernumber=/.test(window.location)) {
    browser.storage.sync.get('triggerDebarred').then(res => {
      if (res.hasOwnProperty('triggerDebarred') && res.triggerDebarred) {
        const editButton = document.querySelector('#editpatron a:first-of-type');
        if (editButton) editButton.click();
      }
    });
  }
})();
