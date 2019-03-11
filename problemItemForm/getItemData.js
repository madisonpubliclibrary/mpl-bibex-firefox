var biblionumberMatchArr = /biblionumber=[0-9]*/.exec(location.toString()),
  itemnumberMatchArr = /itemnumber=[0-9]*/.exec(location.toString()),
  detailsWrap = document.getElementById('catalogue_detail_biblio'),
  copiesWrap = document.querySelector('#catalogue_detail_biblio ol li:last-of-type'),
  cCodeCell = document.querySelector('.yui-g .listgroup:first-of-type .bibliodetails tbody tr:nth-child(3) td:last-of-type'),
  itemBarcodeWrap,
  itemBarcode,
  itemStatus = document.querySelector(".bibliodetails .itemstatus"),
  title,
  copies,
  cCode,
  bibNum,
  itemNum;
  
if (biblionumberMatchArr.length > 0 && itemnumberMatchArr.length > 0) {
  bibNum = biblionumberMatchArr[0].match(/\d+/)[0];
  itemNum = itemnumberMatchArr[0].match(/\d+/)[0];
  
  if (itemStatus.children.length > 0) {
    try {
      browser.runtime.sendMessage({
        "key": "getPatronFromURL",
        "url": itemStatus.children[0].children[0].getAttribute("href")
      });
    } catch (e) {
      console.log(e.message);
    }
  }
  
  if (itemNum) {
    itemBarcodeWrap = /[0-9]{14}/.exec(document.getElementById("item"+itemNum).textContent);
    
    if (itemBarcodeWrap) {
      itemBarcode = itemBarcodeWrap[0];
    }
  }
  
  if (detailsWrap) {
    title = detailsWrap.children[0].textContent.trim();
  }
    
  if (copiesWrap) {
    copies = copiesWrap.textContent.match(/\d+/)[0];
  }
    
  if (cCodeCell) {
    cCode = cCodeCell.textContent.trim();     
  }
    
  //Clean title for books
  if (cCode && title) {
    if (/books/i.test(cCode) && /[/]/.test(title)) {
      var lastChar = "";
      
      while (lastChar !== "/") {
        lastChar = title.substr(-1);
        title = title.substr(0,title.length-1);
      }
      
      title = title.trim();
    }
  }
    
  if (bibNum && itemNum && title && copies && cCode) {
    browser.runtime.sendMessage({
      "key": "returnItemData",
      "bibNum": bibNum,
      "itemNum": itemNum,
      "itemBarcode": itemBarcode,
      "itemTitle": title,
      "copies": copies,
      "cCode": cCode
    });
  } else {
    browser.runtime.sendMessage({
      "key": "failedItemData"
    });
  }

} else {
  browser.runtime.sendMessage({
    "key": "failedItemData"
  });
}
