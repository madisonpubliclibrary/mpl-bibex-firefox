// SCLS location and collection data last updated 11/16/2023

const locationCodes = {
  "1F": "1st Floor",
  "2F": "2nd Floor",
  "ABC": "Rotating Collection",
  "AD": "Adult",
  "AD1F": "Adult, 1st Floor",
  "AD2F": "Adult, 2nd Floor",
  "ADDISLL": "Adult Display, Lower Level",
  "ADDISML": "Adult Display, Main Level",
  "ADLL": "Adult, Lower Level",
  "ADML": "Adult, Main Level",
  "ADOV": "Adult, Oversize",
  "ADPA": "Adult, Paperbacks",
  "ADRF": "Adult Reference",
  "ADRF2F": "Adult Reference, 2nd Floor",
  "APB": "Art of Picture Book",
  "ARC": "Archives",
  "ASK": "Ask Staff For Help",
  "AUT": "Auto Manuals",
  "AV": "Audiovisual",
  "AV2F": "Audiovisual, 2nd Floor",
  "BB": "Busy Bags",
  "BC2F": "Bookclub, 2nd Floor",
  "BKMB": "Bookmobile",
  "BSR": "Bestsellers",
  "BUBGF": "Bubbler, Ground Floor",
  "CH": "Children's",
  "CH1F": "Children's, 1st Floor",
  "CH2F": "Children's, 2nd Floor",
  "CHCH": "Children's Chapter",
  "CHCR": "Children's Crates",
  "CHDIS": "Children's Display",
  "CHDISML": "Children's Display, Main Level",
  "CHLL": "Children's, Lower Level",
  "CHML": "Children's, Main Level",
  "CHOV": "Children's, Oversize",
  "CHRF": "Children's Reference",
  "CHRFLL": "Children's Reference, Lower Level",
  "CHRFML": "Children's Reference, Main Level",
  "CHSE": "Children's Series",
  "CHUL": "Children's, Upper Level",
  "CON": "Consumer Collection",
  "CR": "Children's Resource Collection",
  "CUL": "Culture",
  "DC": "Day Care Collection",
  "DE": "Desk",
  "DIS": "On Display",
  "GE": "Genealogy Room",
  "GE2F": "Genealogy Room, 2nd Floor",
  "GEN": "General Collection",
  "INT": "Intermediate",
  "KV": "Kvamme Library",
  "LD": "Lucky Day Collection",
  "LHR": "Local History Room",
  "LHR2F": "Local History Room, 2nd Floor",
  "LL": "Lower Level",
  "LOC": "Local Collection",
  "LT": "Literacy",
  "LT2F": "Literacy, 2nd Floor",
  "MEM": "Memorial Room",
  "MIM": "Made in Monroe",
  "MKSP": "Makerspace",
  "ML": "Main Level",
  "MRS": "Mobile Reading Service",
  "MZ": "Mezzanine",
  "NA": "New Adult",
  "NA1F": "New Adult, 1st Floor",
  "NA2F": "New Adult, 2nd Floor",
  "NAML": "New Adult, Main Level",
  "NAMZ": "New Adult, Mezzanine",
  "NAV": "New Audiovisual",
  "NC": "New Children's",
  "NC1F": "New Children's, 1st Floor",
  "NCLL": "New Children's, Lower Level",
  "NCML": "New Children's, Main Level",
  "NR": "New Readers",
  "NR1F": "New Readers, 1st Floor",
  "NT": "New Teen",
  "NT1F": "New Teen, 1st Floor",
  "NT2F": "New Teen, 2nd Floor",
  "NTML": "New Teen, Main Level",
  "NW": "Norwegian Collection",
  "NY": "New Young Adult",
  "NY2F": "New Young Adult, 2nd Floor",
  "OC": "Outreach Collection",
  "OF": "Office",
  "OFLOW": "Overflow",
  "OV": "Oversize",
  "OV2F": "Oversize, 2nd Floor",
  "PC": "Parenting Collection",
  "PC1F": "Parenting Collection, 1st Floor",
  "PCLL": "Parenting Collection, Lower Level",
  "PCML": "Parenting Collection, Main Level",
  "PCPLRC": "Portage County PL STP Rotating Collection",
  "PCPLRCPLO": "Portage County PL PLO Rotating Collection",
  "POP": "Pop Culture Collection",
  "PR": "Professional Collection-Staff Only",
  "PS": "Preschool",
  "PT": "Preteen",
  "RD": "Reading Room",
  "RD2F": "Reading Room, 2nd Floor",
  "RF": "Reference",
  "RF2F": "Reference, 2nd Floor",
  "RFLL": "Reference, Lower Level",
  "RFST": "Reference Storage, Ask Staff For Help",
  "RK": "Renk Room",
  "SAND": "Sanderson Room",
  "SDY": "Serendipity",
  "SP": "Staff Picks",
  "SPA": "Spanish Language Collection",
  "ST": "Storage, Ask Staff For Help",
  "STU": "Studio",
  "STY": "Storytime Room",
  "TE": "Teen",
  "TE1F": "Teen, 1st Floor",
  "TE2F": "Teen, 2nd Floor",
  "TECH": "Teen's Choice Display",
  "TEDISML": "Teen Display, Main Level",
  "TEIS": "Teen Islands",
  "TEML": "Teen, Main Level",
  "TESE": "Teen Series",
  "TEST": "Test Guides",
  "TGTM": "Too Good To Miss",
  "TR": "Teacher Resources Collection",
  "UNILL": "University on the Go, Lower Level",
  "WEB": "See Online Resources",
  "WIS": "Wisconsin Collection",
  "YA": "Young Adult",
  "YA2F": "Young Adult, 2nd Floor",
  "YADIS": "Young Adult Display"
};

const collectionCodes = {
  "AR": "Art",
  "BAEA": "Audio-Enabled Books, Adult",
  "BAEJ": "Audio-Enabled Books, Juvenile",
  "BAEJFI": "Audio-Enabled Books, Juvenile Fiction",
  "BAEJNF": "Audio-Enabled Books, Juvenile Non-Fiction",
  "BAEJWL": "World Languages Audio-Enabled Books",
  "BCDJ": "Book/CD Sets",
  "BCJ": "Book/Cassette Sets",
  "BDAPJ": "Book/Digital Audio Player Sets",
  "BKAFI": "Fiction",
  "BKAFICL": "Classics",
  "BKAFICN": "Christian Fiction",
  "BKAFIFA": "Fantasy Fiction",
  "BKAFIGN": "Graphic Novels",
  "BKAFIHI": "Historical Fiction",
  "BKAFIHL": "Holiday Fiction",
  "BKAFIHO": "Horror Fiction",
  "BKAFIID": "Fiction",
  "BKAFIIN": "Inspirational Fiction",
  "BKAFIMY": "Mysteries",
  "BKAFIRO": "Romances",
  "BKAFISF": "Science Fiction",
  "BKAFISP": "Espanol/Spanish Fiction",
  "BKAFISU": "Suspense Fiction",
  "BKAFITH": "Thrillers",
  "BKAFIUR": "Urban Fiction",
  "BKAFIWE": "Westerns",
  "BKAFIWL": "World Languages, Fiction",
  "BKAGE": "Genealogy",
  "BKANF": "Non-Fiction",
  "BKANFAR": "Art",
  "BKANFAU": "Autobiographies",
  "BKANFBU": "Business and Economics",
  "BKANFBY": "Biographies",
  "BKANFCK": "Cooking",
  "BKANFCR": "Crafts and Hobbies",
  "BKANFED": "Education",
  "BKANFGN": "Graphic Novels, Non-Fiction",
  "BKANFHE": "Health and Fitness",
  "BKANFHL": "Holiday Non-Fiction",
  "BKANFHM": "House and Home",
  "BKANFHS": "History",
  "BKANFHT": "Hot Topics",
  "BKANFID": "Non-Fiction",
  "BKANFJO": "Jobs and Careers",
  "BKANFLM": "Local Materials, Non-Fiction",
  "BKANFPC": "Popular Culture",
  "BKANFRE": "Religion",
  "BKANFSC": "Science",
  "BKANFSH": "Self-Help",
  "BKANFSP": "Espanol/Spanish Non-Fiction",
  "BKANFSR": "Sports and Recreation",
  "BKANFTL": "Travel",
  "BKANFWL": "World Languages, Non-Fiction",
  "BKARN": "Rental Books",
  "BKJBG": "Big Books",
  "BKJFI": "Fiction",
  "BKJFI14": "Young Fiction",
  "BKJFIAW": "Award Winning Books",
  "BKJFIBE": "Beginner Readers",
  "BKJFIBI": "Bilingual Fiction",
  "BKJFICH": "Chapter Books",
  "BKJFICO": "Comics",
  "BKJFIFA": "Fantasy Fiction",
  "BKJFIGN": "Graphic Novels",
  "BKJFIMY": "Mysteries",
  "BKJFISF": "Science Fiction",
  "BKJFISP": "Espanol/Spanish Fiction",
  "BKJFIWL": "World Languages Fiction",
  "BKJHL": "Holiday",
  "BKJNF": "Non-Fiction",
  "BKJNF14": "Easy Non-Fiction",
  "BKJNFBI": "Bilingual Non-Fiction",
  "BKJNFBY": "Biographies",
  "BKJNFGN": "Graphic Novels, Non-Fiction",
  "BKJNFGNSP": "Español/Spanish Graphic Novels, Non-Fiction",
  "BKJNFSP": "Espanol/Spanish Non-Fiction",
  "BKJNFWL": "World Languages Non-Fiction",
  "BKYFI": "Fiction",
  "BKYFICL": "Classics",
  "BKYFICO": "Comics",
  "BKYFIFA": "Fantasy Fiction",
  "BKYFIGN": "Graphic Novels",
  "BKYFIGNMG": "Graphic Novels, Manga",
  "BKYFIMY": "Mysteries",
  "BKYFISF": "Science Fiction",
  "BKYFIWL": "World Languages Fiction",
  "BKYNF": "Non-Fiction",
  "BKYNFGN": "Graphic Novels, Non-Fiction",
  "BKYNFWL": "World Languages Non-Fiction",
  "CAA": "Books on Cassette",
  "CAJ": "Books on Cassette",
  "CDAFI": "Books on CD, Fiction",
  "CDAID": "Books on CD, Fiction",
  "CDAMS": "Music CDs",
  "CDAMSID": "Music CDs",
  "CDANF": "Books on CD, Non-Fiction",
  "CDASP": "Espanol/Spanish CDs",
  "CDAWL": "World Languages CDs",
  "CDJFI": "Books on CD, Fiction",
  "CDJMS": "Music CDs",
  "CDJNF": "Books on CD, Non-Fiction",
  "CDJWL": "World Languages CDs",
  "CDY": "Books on CD",
  "DAPAFI": "Digital Audio Players, Fiction",
  "DAPANF": "Digital Audio Players, Non-Fiction",
  "DAPAWL": "World Languages Digital Audio Players",
  "DAPJ": "Digital Audio Players",
  "DAPJWL": "World Languages Digital Audio Players",
  "DAPY": "Digital Audio Players",
  "DBRAAN": "Blu-ray DVDs, Anime",
  "DBRAFE": "Blu-ray DVDs, Feature",
  "DBRAFF": "Blu-ray DVDs, Foreign Feature",
  "DBRAID": "Blu-ray DVDs",
  "DBRANF": "Blu-ray DVDs, Non-Feature",
  "DBRATV": "Blu-ray DVDs, TV Shows",
  "DBRJ": "Blu-ray DVDs",
  "DVDAAN": "DVDs, Anime",
  "DVDAFE": "DVDs, Feature",
  "DVDAFF": "DVDs, Foreign Feature",
  "DVDAHL": "DVDs, Holiday",
  "DVDAID": "DVDs",
  "DVDANF": "DVDs, Non-Feature",
  "DVDARN": "Rental DVDs",
  "DVDATV": "DVDs, TV Shows",
  "DVDAWL": "World Languages DVDs",
  "DVDJFE": "DVDs, Feature",
  "DVDJHL": "DVDs, Holiday",
  "DVDJNF": "DVDs, Non-Feature",
  "DVDJWL": "World Languages DVDs",
  "DVDYFE": "DVDs, Feature",
  "ELR": "Electronic Resource",
  "ELRA": "Electronic Resource",
  "EQ": "Equipment",
  "ERJFI": "Early Readers",
  "ERJNF": "Early Readers, Non-Fiction",
  "IL": "Inter-Library Loan",
  "KTA": "Kits",
  "KTJ": "Kits",
  "LPFI": "Large Print, Fiction",
  "LPFIFA": "Large Print, Fantasy Fiction",
  "LPFIHI": "Large Print, Historical Fiction",
  "LPFIMY": "Large Print, Mysteries",
  "LPFIRO": "Large Print, Romance Fiction",
  "LPFIWE": "Large Print, Westerns",
  "LPJ": "Large Print",
  "LPNF": "Large Print, Non-Fiction",
  "LPPB": "Large Print, Picture Books",
  "MAA": "Magazines",
  "MAAWL": "World Languages Magazines",
  "MAJ": "Magazines",
  "MAY": "Magazines",
  "MF": "Microform",
  "MPA": "Maps",
  "PAAFI": "Paperback Fiction",
  "PAAFICL": "Classics Paperbacks",
  "PAAFIFA": "Fantasy Fiction Paperbacks",
  "PAAFIMY": "Mystery Paperbacks",
  "PAAFIRO": "Romance Paperbacks",
  "PAAFISF": "Science Fiction Paperbacks",
  "PAAFIWE": "Western Paperbacks",
  "PAANF": "Paperback Non-Fiction",
  "PAJFI": "Paperback Fiction",
  "PAJNF": "Paperback Non-Fiction",
  "PAYFI": "Paperback Fiction",
  "PBJBBBI": "Bilingual Board Books",
  "PBJCN": "Picture Books, Concepts",
  "PBJFI": "Picture Books",
  "PBJFIBB": "Board Books",
  "PBJFIBBSP": "Español/Spanish Board Books",
  "PBJFIBI": "Bilingual Picture Books, Fiction",
  "PBJFISP": "Español/Spanish Picture Books",
  "PBJFIWL": "World Languages Picture Books",
  "PBJHL": "Picture Books, Holiday",
  "PBJNF": "Picture Books, Non-Fiction",
  "PH": "Phonorecords",
  "SC": "Scores",
  "SEEDS": "Seeds",
  "SOA": "Computer Software",
  "SOAWL": "World Languages Computer Software",
  "SOJ": "Computer Software",
  "TY": "Toys",
  "VF": "Vertical File",
  "VGA": "Video Games",
  "VGJ": "Video Games",
  "VGY": "Video Games",
  "VRA": "Videocassettes",
  "VRJ": "Videocassettes"
};

const pbjfi = {
  "ADV": "Advanced",
  "ANI": "Animals",
  "CEL": "Celebration",
  "CHA": "Characters",
  "CON": "Concepts",
  "FAV": "Favorites",
  "FOL": "Folk",
  "GRO": "Growing",
  "NAT": "Nature",
  "RHY": "Rhymes",
  "STO": "Stories",
  "GO": "Things that Go"
};
