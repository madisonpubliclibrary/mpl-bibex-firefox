var holdsNotice = document.querySelector(".dialogue.alert b"),
  numHolds,
  title = document.querySelector("#catalogue_detail_biblio h1");
  
if (title) title = title.textContent.replace(/\/ ?$/, '').trim();

if (holdsNotice) {
  numHolds = holdsNotice.textContent.match(/\d+/)[0];
  
  if (numHolds) {
    browser.runtime.sendMessage({
      "key": "returnItemHolds",
      "holds": numHolds,
      "itemTitle": title
    });
  } else {
    browser.runtime.sendMessage({
      "key": "failedItemHolds"
    });
  }
} else {
  browser.runtime.sendMessage({
    "key": "returnItemHolds",
    "holds": 0,
    "itemTitle": title
  });
}