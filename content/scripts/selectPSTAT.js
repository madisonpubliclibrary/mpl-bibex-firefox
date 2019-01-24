var PSTATS = function() {
  this.data = {
    "Adams": {
      "Adams city": "A-ADM-C",
      "Adams town": "A-ADM-T",
      "Big Flats town": "A-BIG-T",
      "Colburn town": "A-COL-T",
      "Dell Prairie town": "A-DEL-T",
      "Easton town": "A-EST-T",
      "Friendship village": "A-FRN-V",
      "Jackson town": "A-JAK-T",
      "Leola town": "A-LEO-T",
      "Lincoln town": "A-LIN-T",
      "Monroe town": "A-MON-T",
      "New Chester town": "A-NCH-T",
      "New Haven town": "A-NHV-T",
      "Preston town": "A-PRS-T",
      "Quincy town": "A-QUI-T",
      "Richfield town": "A-RCH-T",
      "Rome town": "A-ROM-T",
      "Springville town": "A-SPV-T",
      "Strongs Prairie town": "A-STP-T",
      "Wisconsin Dells city": "A-WID-C"
    },
    "Columbia": {
      "Arlington town": "C-ARL-T",
      "Arlington village": "C-ARL-V",
      "Caledonia town": "C-CAL-T",
      "Cambria village": "C-CAM-V",
      "Columbus city": "C-COL-C",
      "Columbus town": "C-COL-T",
      "Courtland town":  "C-COU-T",
      "Dekorra town": "C-DEK-T",
      "Doylestown village": "C-DOY-V",
      "Fountain Prairie town": "C-FP-T",
      "Fall River village": "C-FR-V",
      "Friesland village": "C-FRI-V",
      "Fort Winnebago town": "C-FW-T",
      "Hampden town": "C-HAM-T",
      "Leeds town": "C-LEE-T",
      "Lewiston town": "C-LEW-T",
      "Lodi city": "C-LOD-C",
      "Lodi town": "C-LOD-T",
      "Lowville town": "C-LOW-T",
      "Marcellon town": "C-MARC-T",
      "Newport town": "C-NEW-T",
      "Otsego town": "C-OTS-T",
      "Pacific town": "C-PAC-T",
      "Pardeeville village": "C-PAR-V",
      "Portage city": "C-POR-C",
      "Poynette village": "C-POY-V",
      "Randolph town": "C-RAN-T",
      "Randolph village": "C-RAN-VC",
      "Rio village": "C-RIO-V",
      "Scott town": "C-SCO-T",
      "Springvale town": "C-SPV-T",
      "Wisconsin Dells city": "C-WD-CC",
      "West Point town": "C-WP-T",
      "Wyocena town": "C-WYO-T",
      "Wyocena village": "C-WYO-V"
    },
    "Dane": {
      "Albion town": "D-ALB-T";
      "Black Earth town": "D-BE-T";
      "Black Earth village": "D-BE-V";
      "Belleville village": "D-BEL-VD";
      "Berry town": "D-BERR-T";
      "Blooming Grove town": "D-BG-T";
      "Blue Mounds town": "D-BM-T";
      "Blue Mounds village": "D-BM-V";
      "Bristol town": "D-BRI-T";
      "Brooklyn village": "D-BRO-VD";
      "Burke town": "D-BUR-T";
      "Cambridge village": "D-CAM-VD";
      "Cottage Grove town": "D-CG-T";
      "Cottage Grove village": "D-CG-V";
      "Christiana town": "D-CHR-T";
      "Cross Plains town": "D-CP-T";
      "Cross Plains village": "D-CP-V";
      "Dane town": "D-DAN-T";
      "Dane village": "D-DAN-V";
      "Deerfield town": "D-DEE-T";
      "Deerfield village": "D-DEE-V";
      "DeForest village": "D-DF-V";
      "Dunkirk town": "D-DUNK-T";
      "Dunn town": "D-DUNN-T";
      "Fitchburg city": "D-FIT-T";
      //"Madison city": "", // Handled separately
      "Madison town": "D-MAD-T";
      "Marshall village": "D-MARS-V";
      "Mazomanie town": "D-MAZ-T";
      "Mazomanie village": "D-MAZ-V";
      "Maple Bluff village": "D-MB-V";
      "McFarland village": "D-MCF-V";
      "Medina town": "D-MED-T";
      "Mount Horeb village": "D-MH-V";
      //"Middleton city": "", // Handled separately
      "Middleton town": "D-MID-T";
      "Monona city": "D-MON-C1";
      "Montrose town": "D-MONT-T";
      "Oregon town": "D-ORE-T";
      "Oregon village": "D-ORE-V";
      "Perry town": "D-PER-T";
      "Primrose town": "D-PRI-T";
      "Pleasant Springs town": "D-PS-T";
      "Rockdale village": "D-ROC-V";
      "Roxbury town": "D-ROX-T";
      "Rutland town": "D-RUT-T";
      "Shorewood Hills village": "D-SH-V";
      //"Sun Prairie city": "", // Handled separately
      "Sun Prairie town": "D-SP-T";
      "Springdale town": "D-SPD-T";
      "Springfield town": "D-SPF-T";
      "Stoughton city": "D-STO-C1";
      "Vermont town": "D-VERM-T";
      //"Verona city": "", // Handled separately
      "Verona town": "D-VERO-T";
      "Vienna town": "D-VIE-T";
      "Waunakee village": "D-WAU-V";
      "Westport town": "D-WESP-T";
      "Windsor village": "D-WIN-T";
      "York town": "D-YOR-TD";
    },
    "Green": {
      "Adams town": "G-ADA-T";
      "Albany town": "G-ALB-T2";
      "Albany village": "G-ALB-V";
      "Belleville village": "G-BEL-VG";
      "Brooklyn town": "G-BRO-T";
      "Brooklyn village": "G-BRO-VG";
      "Brodhead city": "G-BROD-C";
      "Browntown village": "G-MRO-SD", // Don't use G-BROW-V per SCLS PSTAT spreadsheet
      "Clarno town": "G-MRO-SD", // Don't use G-CLA-T per SCLS PSTAT spreadsheet
      "Monroe city": "G-MRO-SD", // Don't use G-MONR-C per SCLS PSTAT spreadsheet
      "Cadiz town": "G-CAD-T";
      "Decatur town": "G-DEC-T";
      "Exeter town": "G-EXE-T";
      "Jefferson town": "G-JEF-T";
      "Jordan town": "G-JOR-T";
      "Monroe town": "G-MONR-T";
      "Monticello village": "G-MONT-V";
      "Mount Pleasant town": "G-MP-T";
      "New Glarus town": "G-NG-T";
      "New Glarus village": "G-NG-V";
      "Spring Grove town": "G-SGO-T";
      "Sylvester town": "G-SYL-T";
      "Washington town": "G-WAS-TG";
      "York town": "G-YOR-TG";
    },
    "Portage": {
      "Alban town": "P-ALB-T";
      "Almond town": "P-ALM-T";
      "Almond village": "P-ALM-V";
      "Amherst town": "P-AMH-T";
      "Amherst village": "P-AMH-V";
      "Amherst Junction village": "P-AMJ-V";
      "Belmont town": "P-BEL-T";
      "Buena Vista town": "P-BUV-T";
      "Carson town": "P-CAR-T";
      "Dewey town": "P-DEW-T";
      "Eau Pleine town": "P-EPL-T";
      "Grant town": "P-GRT-T";
      "Hull town": "P-HUL-T";
      "Junction City village": "P-JNC-V";
      "Lanark town": "P-LAN-T";
      "Linwood town": "P-LIN-T";
      "Nelsonville village": "P-NEL-V";
      "New Hope town": "P-NHP-T";
      "Pine Grove town": "P-PIN-T";
      "Park Ridge village": "P-PKR-V";
      "Plover town": "P-PLO-T";
      "Plover village": "P-PLO-V";
      "Rosholt village": "P-ROS-V";
      "Sharon town": "P-SHA-T";
      "Stockton town": "P-STO-T";
      "Stevens Point city": "P-STP-C";
      "Whiting village": "P-WHI-V";
    },
    "Sauk": {
      "Baraboo city": "S-BAR-C1";
      "Baraboo town": "S-BAR-T";
      "Bear Creek town": "S-BC-T";
      "Cazenovia village": "S-CAZ-V";
      "Dellona town": "S-DELL-T";
      "Delton town": "S-DELT-T";
      "Excelsior town": "S-EXC-T";
      "Fairfield town": "S-FAI-T";
      "Franklin town": "S-FRA-T";
      "Freedom town": "S-FRE-T";
      "Greenfield town": "S-GRE-T";
      "Honey Creek town": "S-HC-T";
      "Hillpoint village": "S-HILL-V";
      "Ironton town": "S-IRO-T";
      "Ironton village": "S-IRO-V";
      "Lake Delton village": "S-LD-V";
      "Loganville village": "S-LOG-V";
      "Lime Ridge village": "S-LR-V";
      "La Valle town": "S-LV-T";
      "La Valle village": "S-LV-V";
      "Merrimac town": "S-MER-T";
      "Merrimac village": "S-MER-V";
      "North Freedom village": "S-NF-V";
      "Prairie du Sac town": "S-PDS-T";
      "Prairie du Sac village": "S-PDS-V";
      "Plain village": "S-PLA-V";
      "Reedsburg city": "S-REE-C";
      "Reedsburg town": "S-REE-T";
      "Rock Springs village": "S-RS-V";
      "Sauk City village": "S-SC-V";
      "Spring Green town": "S-SGE-T";
      "Spring Green village": "S-SGE-V";
      "Sumpter town": "S-SUM-T";
      "Troy town": "S-TRO-T";
      "Washington town": "S-WAS-TS";
      "West Baraboo village": "S-WB-V";
      "Wisconsin Dells city": "S-WD-CS";
      "Westfield town": "S-WESF-T";
      "Winfield town": "S-WIN-T2";
      "Woodland town": "S-WOO-T";
    },
    "Wood" {
      "Arpin town": "W-ARP-T";
      "Arpin village": "W-ARP-V";
      "Auburndale town": "W-AUB-T";
      "Auburndale village": "W-AUB-V";
      "Biron village": "W-BIR-V";
      "Cameron town": "W-CAM-T";
      "Cary town": "W-CAR-T";
      "Cranmoor town": "W-CRAN-T";
      "Dexter town": "W-DEX-T";
      "Grand Rapids town": "W-GRAP-T";
      "Hansen town": "W-HAN-T";
      "Hewitt village": "W-HEW-V";
      "Hiles town": "W-HIL-T";
      "Lincoln town": "W-LIN-T";
      "Marshfield city": "W-MAR-C";
      "Marshfield town": "W-MAR-T";
      "Milladore town": "W-MILL-T";
      "Milladore village": "W-MILL-V";
      "Nekoosa city": "W-NEK-C";
      "Port Edwards town": "W-PE-T";
      "Port Edwards village": "W-PE-V";
      "Pittsville city": "W-PIT-C";
      "Richfield town": "W-RCH-T";
      "Remington town": "W-REM-T";
      "Rock town": "W-ROC-T";
      "Rudolph town": "W-RUD-T";
      "Rudolph village": "W-RUD-V";
      "Saratoga town": "W-SARA-T";
      "Seneca town": "W-SENE-T";
      "Sherry town": "W-SHR-T";
      "Sigel town": "W-SIG-T";
      "Vesper village": "W-VESP-V";
      "Wisconsin Rapids city": "W-WSRP-C";
      "Wood town": "W-WOD-T";
    }
  };
  this.find = (county, countySub, censusTract) => {
    if (county === "Dane" && countySub === "Madison city") {
      return "D" + censusTract;
    } else if (county === "Dane" && countySub === "Middleton city") {
      console.log("Special lookup");
    } else if (county === "Dane" && countySub === "Sun Prairie city") {
      console.log("Special lookup");
    } else if (county === "Dane" && countySub === "Verona city") {
      console.log("Special lookup");
    } else {
      return this.data[county][countySub];
    }
  }
  
};