if (/bibliovation\.com\/app\/staff\/patron/.test(window.location)) {
  var listItem = document.createElement('li'),
    spanOuter = document.createElement('span'),
    spanInner = document.createElement('span'),
    button = document.createElement('a'),
    innerDoc = document.getElementsByTagName('iframe'),
    patronInfo = document.getElementsByClassName('patroninfo'),
    toolbar;

  if (innerDoc.length > 0 && patronInfo) {
    innerDoc = innerDoc[0].contentDocument;
    toolbar = innerDoc.querySelector('#toolbar .toolbar');

    button.setAttribute('tabindex','0');
    button.textContent = 'Print Barcode';

    spanOuter.addEventListener('mouseover', function() {
      this.classList.add('yui-button-hover', 'yui-link-button-hover');
    });
    spanOuter.addEventListener('mouseout', function() {
      this.classList.remove('yui-button-hover', 'yui-link-button-hover');
    });

    button.addEventListener('click', function(e) {
      e.preventDefault();

      patronInfo = patornInfo[0].children[0].textContent;

      browser.runtime.sendMessage({
        "key": "printBarcode",
        "data": patroninfo.trim().substr(-15,14)
      });
    });

    spanInner.classList.add('first-child');
    spanOuter.classList.add('yui-button', 'yui-link-button');
    spanOuter.id = 'bibexSpanOuter';

    spanInner.appendChild(button);
    spanOuter.appendChild(spanInner);
    toolbar.appendChild(spanOuter);
  }
}
