(function(){
  'use strict';
  const holdsNotice = document.querySelector(".dialogue.alert b");
  const title = document.querySelector("#catalogue_detail_biblio h1");
  const data = {};

  data.title = title.textContent.replace(/\/ ?$/, '').trim();
  data.holds = holdsNotice !== null ? holdsNotice.textContent.match(/\d+/)[0] || '0' : '0';

  return data;
})();
