var img = document.querySelector('.koha-logo img');

if (img) {
  browser.runtime.sendMessage({"key":"getLogoURL"}).then(res => {
    console.log(res);
    img.src = res.URL;
  });
}
