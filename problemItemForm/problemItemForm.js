let d = new Date();
// Convert date UTC -> CST
d.setHours(d.getHours() - 6);

let month = (d.getMonth()+1).toString(),
  day = d.getDate().toString();

if (month.length == 1) {
   month = "0" + month;
}

if (day.length == 1) {
  day = "0" + day;
}

document.getElementById('date').value = d.getFullYear() + "-" + month + "-" + day;

var prepareItemData = document.getElementById("prepareItemData"),
  itemBarcode = document.getElementById("itemBarcode"),
  patronBarcode = document.getElementById("patronBarcode"),
  getPatronData = document.getElementById("getPatronData"),
  printForm = document.getElementById("printForm");

// Trigger prepareItemData() when enter is pressed in itemBarcode input
itemBarcode.addEventListener("keyup", event => {
  if (event.key !== "Enter") return;
  document.getElementById("prepareItemData").click();
  event.preventDefault();
});

if (prepareItemData) prepareItemData.addEventListener("click", function () {
  var itemTitle = document.getElementById("itemTitle"),
    cCode = document.getElementById("cCode"),
    holds = document.getElementById("holds"),
    copies = document.getElementById("copies"),
    use = document.getElementById("use");

  itemTitle.value = "";
  cCode.value = "";
  holds.value = "";
  copies.value = "";
  use.value = "";

  if (itemBarcode.value.length === 8) {
    itemBarcode.value = "390780" + itemBarcode.value;
  }

  if (/^3[0-9]{13}$/.test(itemBarcode.value)) {
    if (itemBarcode.classList.contains("invalidInput")) {
      itemBarcode.classList.remove("invalidInput");
    }
    browser.runtime.sendMessage({
      "key": "prepareItemData",
      "itemBarcode": itemBarcode.value
    });
  } else {
    if (!itemBarcode.classList.contains("invalidInput")) {
      itemBarcode.classList.add("invalidInput");
    }
  }
});

// Trigger getPatronData() when enter is pressed in patronBarcode input
patronBarcode.addEventListener("keyup", event => {
  if (event.key !== "Enter") return;
  document.getElementById("getPatronData").click();
  event.preventDefault();
});

if (getPatronData) getPatronData.addEventListener("click", function() {
  var name = document.getElementById("name"),
    phone = document.getElementById("phone"),
    email = document.getElementById("email");

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
    });
  } else {
    if (!patronBarcode.classList.contains("invalidInput")) {
      patronBarcode.classList.add("invalidInput");
    }
  }
});

browser.runtime.onMessage.addListener(message => {
  switch (message.key) {
    case "returnItemData":
      document.getElementById("itemDataErrMsg").style.display = "none";
      document.getElementById("itemTitle").value = message.itemTitle;
      document.getElementById("cCode").value = message.cCode;
      document.getElementById("copies").value = message.copies;
      break;
    case "failedItemData":
      document.getElementById("itemDataErrMsg").style.display = "";
      document.getElementById("itemTitle").value = "";
      document.getElementById("cCode").value = "";
      document.getElementById("copies").value = "";
      break;
    case "returnItemHolds":
      document.getElementById("holds").value = message.holds;
      if (message.itemTitle) {
        document.getElementById("itemTitle").value = message.itemTitle;
      }
      break;
    case "failedItemHolds":
      document.getElementById("holds").value = "";
      break;
    case "returnPatronData":
      document.getElementById("patronDataErrMsg").style.display = "none";
      document.getElementById("name").value = message.patronName;
      document.getElementById("patronBarcode").value = message.patronBarcode;
      document.getElementById("phone").value = !!message.patronPhone ? message.patronPhone : "";
      document.getElementById("email").value = !!message.patronEmail ? message.patronEmail : "";
      break;
    case "failedPatronData":
      document.getElementById("patronDataErrMsg").style.display = "";
      document.getElementById("name").value = "";
      document.getElementById("phone").value = "";
      document.getElementById("email").value = "";
      break;
  }
});

function formatDateForDisplay(date) {
  if (date && date !== "") {
    var d = new Date(date);
    return (d.getUTCMonth()+1) + "/" + d.getUTCDate() + "/" + d.getUTCFullYear();
  } else {
    return "";
  }
}

if (printForm) printForm.addEventListener("click", function() {
  var to = document.getElementById("to"),
    date = document.getElementById("date"),
    from = document.getElementById("from"),
    staffName = document.getElementById("staffInit"),
    type = document.getElementById("problem"),
    idBy = document.getElementById("idBy"),
    receivedVia = document.getElementById("receivedBy"),
    ckiBySorter = document.getElementById("ckiBySorter"),
    details = document.getElementById("details"),
    itemTitle = document.getElementById("itemTitle"),
    itemBarcode = document.getElementById("itemBarcode"),
    cCode = document.getElementById("cCode"),
    holds = document.getElementById("holds"),
    copies = document.getElementById("copies"),
    use = document.getElementById("use"),
    patron = document.getElementById("name"),
    patronBarcode = document.getElementById("patronBarcode"),
    patronPhone = document.getElementById("phone"),
    patronEmail = document.getElementById("email"),
    notified = document.getElementById("dateNotified"),
    staffInit = document.getElementById("notifiedBy"),
    contactedVia = document.getElementById("contactedVia"),
    instructions = document.getElementById("instructions"),
    nonDefectNonHold = document.getElementById("nonDefectNonHold"),
    nonDefectHold = document.getElementById("nonDefectHold"),
    defect = document.getElementById("defect");

  var emailParts = patronEmail

  if (to.value == "" | date.value == "" | from.value == "" | staffName.value == "" | type.value == "" | idBy.value == "" |receivedVia.value == "" | details.value == "" | itemTitle.value == "" | itemBarcode.value == "") {
    alert("Please check that all required fields have been filled in.");
  } else {
    instructions.style.display = "";

    switch(type.value) {
      case "Defect Reported":
          nonDefectNonHold.style.display = "none";
          nonDefectHold.style.display = "none";
          defect.style.display = "";
        break;
      default:
        if (receivedVia.value === "Transit Hold") {
          nonDefectNonHold.style.display = "none";
          nonDefectHold.style.display = "";
          defect.style.display = "none";
        } else {
          nonDefectNonHold.style.display = "";
          nonDefectHold.style.display = "none";
          defect.style.display = "none";
        }
        break;
    }

    window.location.hash = "instructions";

    browser.runtime.sendMessage({
      "key": "printProblemForm",
      "data": [
        ["to", to.value.toUpperCase()],
        ["date", formatDateForDisplay(date.value)],
        ["from", from.value.toUpperCase()],
        ["staffName", staffName.value.toUpperCase()],
        ["type", type.value],
        ["idBy", idBy.value],
        ["receivedVia", receivedVia.value],
        ["ckiBySorter", ckiBySorter.checked.toString()],
        ["details", details.value],
        ["itemTitle", itemTitle.value],
        ["itemBarcode", itemBarcode.value],
        ["cCode", cCode.value],
        ["holds", holds.value],
        ["copies", copies.value],
        ["use", use.value],
        ["patron", patron.value],
        ["patronBarcode", patronBarcode.value],
        ["patronPhone", patronPhone.value],
        ["patronEmail", patronEmail.value],
        ["notified", formatDateForDisplay(notified.value)],
        ["staffInit", staffInit.value],
        ["contactedVia", contactedVia.value]
      ]
    });
  }
});

/*** Handle cases when we're loading the problem form with barcode data ***/
if (location.search.length > 0) {
  var data = location.search.substr(1).split("=");

  if (data && data.length === 2) {
    if (data[0] === "item") {
      itemBarcode.value = data[1];
      prepareItemData.click();
    } else if (data[0] === "patron") {
      patronBarcode.value = data[1];
      getPatronData.click();
    }
  }
}
