/**
 * @param {Boolean} bool 
 * @returns The current date, YYYY-MM-DD if bool is false,
 *          or MM/DD/YYYY if bool is true
 */
let getCurrDate = function(bool) {
  const d = new Date();

  let month = (d.getMonth()+1).toString();
  let day = d.getDate().toString();

  if (month.length == 1 && !bool) {
      month = "0" + month;
  }

  if (day.length == 1 && !bool) {
    day = "0" + day;
  }

  return bool ?
    month + "/" + day + "/" + d.getFullYear() :
    d.getFullYear() + "-" + month + "-" + day;
};

browser.runtime.onMessage.addListener(msg => {
  const copies = document.getElementById("copies");
  const inCoreColl = document.getElementById("inCoreColl");
  const inNoveList = document.getElementById("inNoveList");

  if (msg.key === "printWeedingSlip" ) {
    const tbody = copies.tBodies[0];
    for (let item of msg.data.copies) {
      const row = document.createElement('tr');
      let lib = document.createElement('td');
      lib.textContent = item.mplLib;
      if (item.hasOwnProperty("storage") && item.storage) lib.textContent += " (Storage)";
      const circ = document.createElement('td');
      circ.textContent = item.YTD + " / " + item.bvationCKO;
      const status = document.createElement('td');
      status.textContent = [item.lostStatus,item.dmgStatus,item.otherStatus].filter(e => !!e).join('; ');
      const lastCKO = document.createElement('td');
      lastCKO.textContent = item.lastCKO ? item.lastCKO.toLocaleDateString() : "Never";
      row.append(lib,circ,status,lastCKO);
      tbody.append(row);
    }

    document.getElementById("title").textContent = msg.data.title;
    document.getElementById("barcode").textContent = msg.data.barcode;
    document.getElementById("ccode").textContent = msg.data.ccode;
    document.getElementById("pubDate").textContent = msg.data.pubDate;
    document.getElementById("notes").textContent = msg.data.notes;
    document.getElementById("nonMPLcopies").textContent = msg.data.nonMPLcopies;

    if (msg.data.inCoreColl) {
      document.getElementById('recLevelWrap').style.display = "block";
      inCoreColl.textContent = "☑";
      document.getElementById("recLevel").textContent = msg.data.recLevel;
    } else {
      inCoreColl.textContent = "☐";
    }

    if (msg.data.inNoveList) {
      document.getElementById("noveListWrap").style.display = "block";
      const inSeries = document.getElementById("inSeries");
      inNoveList.textContent = "☑";
      if (msg.data.inSeries) {
        inSeries.textContent = "☑";
        document.getElementById("seriesInfo").style.display = "block";
        document.getElementById("seriesName").textContent = msg.data.seriesName;
        document.getElementById("seriesNumber").textContent = msg.data.seriesNumber;
      } else {
        inSeries.textContent = "☐";
      }

      document.getElementById("booklist").textContent = msg.data.booklist ? "☑" : "☐";
      document.getElementById("pubWeekly").textContent = msg.data.pubWeekly ? "☑" : "☐";
      document.getElementById("libJournal").textContent = msg.data.libJournal ? "☑" : "☐";
      document.getElementById("kirkus").textContent = msg.data.kirkus ? "☑" : "☐";
      document.getElementById("awards").textContent = msg.data.awards ? "☑" : "☐";
    } else {
      inNoveList.textContent = "☐";
    }

    document.getElementById('today').textContent = getCurrDate(true);

    window.print();
  }
});
