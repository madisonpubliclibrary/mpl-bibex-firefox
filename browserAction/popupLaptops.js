var defaultMenu = document.getElementById('defaultMenu'),
  laptopMenu = document.getElementById('laptopMenu'),
  laptopFormOn = document.getElementById("laptopFormOn"),
  laptopFormOnSwitch = document.getElementById("laptopFormOnSwitch");

function updateContent() {
  browser.storage.sync.get("laptopFormChecked").then(res => {
    laptopFormOn.checked = res.laptopFormChecked;

    if (res.laptopFormChecked) {
      defaultMenu.style.display = 'none';
      laptopMenu.style.display = '';
    } else {
      defaultMenu.style.display = '';
      laptopMenu.style.display = 'none';
    }
  });
}

updateContent();

laptopFormOnSwitch.addEventListener('click', function() {
  browser.storage.sync.set({"laptopFormChecked": laptopFormOn.checked}).then(updateContent);
});
