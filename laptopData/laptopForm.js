var laptopForm = document.getElementById("laptopForm"),
  laptopFormSwitch = document.getElementById("laptopFormSwitch");

browser.storage.sync.get("laptopFormChecked").then(res => {
  laptopForm.checked = res.laptopFormChecked;
}).then(() => {
  if (laptopFormSwitch) laptopFormSwitch.addEventListener('click', function() {
    console.log(laptopForm.checked);
    browser.storage.sync.set({"laptopFormChecked": laptopForm.checked}).then(() => {
      browser.runtime.sendMessage("updatePopup");
    });
  });
});
