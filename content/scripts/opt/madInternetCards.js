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
      yesDebarred.checked = true;
      noDebarred.checked = false;
    }
  }

  accountType.addEventListener('change', makeInternetCard);
  makeInternetCard();
})();
