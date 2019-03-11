var itemBarcode = /mkpItemBarcode=[0-9]*/.exec(location.toString());

if (itemBarcode) {
  itemBarcode = itemBarcode[0].match(/\d+/);
}

//If we successfully extracted the item barcode
if (itemBarcode) {
itemBarcode = itemBarcode[0];  
  
  var barcodeField = document.getElementById('search-form'),
    submitButton = document.getElementById('cat-search-block');
    
  if (barcodeField && submitButton) {
    barcodeField.value = itemBarcode;
    submitButton[0].click();
    submitButton.submit();
  }
}