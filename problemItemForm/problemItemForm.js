var d = new Date(),
  month = (d.getMonth()+1).toString(),
  day = d.getDate().toString();

if (month.length == 1) {
   month = "0" + month;
}

if (day.length == 1) {
  day = "0" + day;
}

var patronBarcode = document.getElementById("patronBarcode"),
  getPatronData = document.getElementById("getPatronData"),
  date = document.getElementById('date');

date.value = d.getFullYear() + "-" + month + "-" + day;

getPatronData.addEventListener('click', function() {
  var name = document.getElementById("name"),
    phone = document.getElementById("phone"),
    email = document.getElementById("email"),
    patronDataErrMsg = document.getElementById("patronDataErrMsg");

  name.value = "";
  phone.value = "";
  email.value = "";

  if (patronBarcode.value.length === 8) {
    patronBarcode.value = "290780" + patronBarcode.value;
  }

  if (/^2[0-9]{13}$/.test(patronBarcode.value)) {
    if (patronBarcode.classList.contains("invalidInput")) {
      patronBarcode.classList.remove("invalidInput");
    }
    browser.runtime.sendMessage({
      "key": "getPatronData",
      "patronBarcode": patronBarcode.value
    }).then(result => {
      document.getElementById("patronDataErrMsg").style.display = "none";
      name.value = result.patronName;
      patronBarcode.value = result.patronBarcode;
      phone.value = !!result.patronPhone ? result.patronPhone : "";
      email.value = !!result.patronEmail ? result.patronEmail : "";
    }, reject => {
      patronDataErrMsg.textContent = reject.message;
      patronDataErrMsg.style.display = "";
    });
  } else {
    if (!patronBarcode.classList.contains("invalidInput")) {
      patronBarcode.classList.add("invalidInput");
    }
  }
});
