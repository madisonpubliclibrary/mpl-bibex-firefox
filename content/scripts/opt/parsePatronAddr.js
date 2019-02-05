if (/cgi-bin\/koha\/members\/memberentry\.pl/.test(window.location)) {
  var addr = document.getElementById('address'),
    addr2 = document.getElementById('address2'),
    city = document.getElementById('city'),
    expDate = document.getElementById('dateexpiry'),
    bn = document.getElementById('borrowernotes'),
    date = new Date(),
    year,
    month = parseInt(date.getUTCMonth(), 10);

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

  var parseAddr = function() {
    if (addr.value && city.value) {
      browser.runtime.sendMessage({
        "key": "parsePatronAddr"
      }).then(result => {
        for (let item of result) {
          var fullAddr = (addr.value + ' ' + addr2.value).trim();
          var regex = new RegExp(item.regex, 'i');

          if (regex.test(fullAddr)) {
            if (item.type === "dorm") {
              let noteBody = "Special expiration date of 05/15/" + year +
                  " set due to residence at " + item.name + ", a university dorm." +
                  " Patron must verbally update address before account renewal (proof of address not necessary).",
                msg = noteBody;

              if (bn && !bn.value.includes(noteBody)) {
                expDate.value = "05/15/" + year;
                if (bn.value !== "") {
                  if (/Special expiration date of 05\/15\/[0-9]{4} set due to residence at/.test(bn.value)) {
                    msg = "Please remove old dorm expiration note.\n\n" + noteBody;
                  }
                  bn.value += "\n\n";
                }

                alert(msg);
                bn.value += noteBody;
              }
            } else if (item.type === "restricted") {
              alert('restricted');
            } else if (item.type === "unacceptable") {
              alert('unacceptable');
            } else if (item.type === "unique") {
              alert('unique');
            }
          }
        }
      }, reject => {
        console.error(reject.message);
      });
    }
  };

  if (addr && addr2 && city) {
    addr.addEventListener('blur', parseAddr);
    city.addEventListener('blur', parseAddr);
  }
}
