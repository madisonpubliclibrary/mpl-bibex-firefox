var addr = document.getElementById('address'),
  addr2 = document.getElementById('address2'),
  city = document.getElementById('city'),
  expiry = document.getElementById('dateexpiry'),
  bn = document.getElementById('borrowernotes'),
  date = (new Date(),
  year,
  month = parseInt(date.getUTCMonth(), 10),
  parseDorms = function() {
    if (/MADISON WI/i.test(city.value) {
      browser.runtime.sendMessage({
        "key": "parseDormAddr",
        "address": (addr.value + " " + addr2.value).trim()
      }).then(result => {

      }, reject => {});
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
  addr.addEventListener('blur', parseDorms);
  city.addEventListener('blur', parseDorms);
}
