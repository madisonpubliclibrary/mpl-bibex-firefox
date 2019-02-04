if (/cgi-bin\/koha\/members\/memberentry\.pl/.test(window.location)) {
  var addr = document.getElementById('address'),
    addr2 = document.getElementById('address2'),
    city = document.getElementById('city'),
    expiry = document.getElementById('dateexpiry'),
    bn = document.getElementById('borrowernotes'),
    date = (new Date(),
    year,
    month = parseInt(date.getUTCMonth(), 10),
    Address = function(addrRegEx, place) {
      this.addrRegEx = addrRegEx;
      this.place = place;
    }, parseAddr = function() {
      if (addr.value && city.value === "MADISON WI") {
        browser.runtime.
      }
    };

  if (month < 4) {
    year = date.getUTCFullYear();
  } else if (month > 4) {
    year = (parseInt(date.getUTCFullYear(), 10) + 1).toString();
  } else {
    if (parseInt(date.getUTCDate(), 10) < 15) {
      year = date.getUTCFullYear();
    } else {
      year = (parseInt(date.getUTCFullYear(), 10) + 1).toString();
    }
  }

  if (addr && addr2 && city) {
    addr.addEventListener('blur', parseAddr);
    city.addEventListener('blur', parseAddr);
  }
}
undefined;
