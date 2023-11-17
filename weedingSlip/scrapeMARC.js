(function(){
  'use strict';
  return new Promise((resolve, reject) => {
    let titleArr = document.querySelectorAll("#tab2XX .subfield-label");

    let data = {};
  
    for (let title of titleArr) {
      // Get Title
      if (title.textContent.includes("Title")) {
        let parent = title.parentElement;
        parent.children[0].remove();
        data.title = parent.textContent.trim();
      // Get publication date
      } else if (title.textContent.includes("Date of production, publication, distribution, manufacture") &&
                 title.parentElement.parentElement.children[0].textContent.includes("264 #1 -")) {
        let parent = title.parentElement;
        parent.children[0].remove();

        let date = parent.textContent.trim()
        data.pubDate = date.replace(/[\[\]().]/g,"");
      }
    }
    resolve(data);
  });
})();