window.onload = function() {
  const data = location.toString().split('?')[1].split('&');

  if (data) {
    const barcode = data[0].split('=')[1];
    const fontSize = data[1].split('=')[1];
      
    browser.storage.sync.get('printBarcodeImage').then(res => {
      if (res.printBarcodeImage) {
        JsBarcode("#barcodeImg", barcode, {
          format: "codabar", // SCLS barcode format
          width: 1.5, // width of individual bar
          height: 50, // height of barcode
          margin: 0,
          textAlign: "center",
          textPosition: "top",
          font: "sans-serif",
          fontSize: 30,
          textMargin: 5
        });
        document.getElementById("barcodeImg").classList.remove("hide");
      } else {
        let bc = document.getElementById("barcode");
        bc.style.fontSize = fontSize;
        bc.textContent = barcode;
        bc.classList.remove("hide");
      }

      window.print();
    });
  }
}
