if (window.location.toString().includes("/cgi-bin/koha/circ/circulation.pl") &&
    !document.getElementById('bibexNotes')) {
  var bn = document.getElementById('borrower_notes'),
    bnMsg = document.getElementById('borrower_note'),
    bibNotes = document.getElementById('type'),
    wrapper = document.createElement('p'),
    msgLabel = document.createElement('label'),
    msgSelect = document.createElement('select'),
    defaultOpt  = document.createElement('option'),
    cardAtNxtCko = document.createElement('option'),
    laptopAgreement = document.createElement('option'),
    rtdMailGroup = document.createElement('optgroup'),
    poRtd = document.createElement('option'),
    cardRtd = document.createElement('option'),
    badEmailGroup = document.createElement('optgroup'),
    badEmail = document.createElement('option'),
    fullEmail = document.createElement('option');

  msgSelect.id = "bibexNotes";
  msgLabel.setAttribute('for', 'bibexNotes');
  msgLabel.style.display = "inline-block";
  msgLabel.textContent = "MPL BibEx Notes: ";

  msgSelect.addEventListener('change', function() {
    bibNotes.value = "";
    bnMsg.value = this.options[this.selectedIndex].value;
    if (this.selectedOptions[0].value.includes("Patron has signed Laptop/iPad")) {
      var staffInit = prompt("Enter your initials and library location (e.g. LS/MAD)");
      bnMsg.value += "(" + staffInit + ")";
    }
  });

  bibNotes.addEventListener('change', function() {
    msgSelect.value = "";
  });

  defaultOpt.value = "";
  defaultOpt.textContent = "Select BibEx Note";
  cardAtNxtCko.value = "Patron must have library card at next checkout. ";
  cardAtNxtCko.textContent = "Have card at next CKO";
  laptopAgreement.value = "Patron has signed Laptop/iPad Loan Agreement form. Form on file. ";
  laptopAgreement.textContent = "Patron signed laptop agreement";
  rtdMailGroup.label = "Returned Mail";
  poRtd.value = "Mail returned by PO. Holds, if any, are suspended and notices are deactivated. ";
  poRtd.textContent = "Mail returned by post office";
  cardRtd.value = "Card was mailed to patron to establish proof of address, but was ret'd by PO. Card is now at MAD. When patron provides new address, please contact MAD-CIRC so card can be mailed again. ";
  cardRtd.textContent = "Library card returned by post office";
  badEmailGroup.label = "Bad Email Address";
  badEmail.value = "Email address not recognized, unable to send notices. Verify that mailing address and phone are correct. Enter new email address. Holds, if any, are suspended. Previous email was: ";
  badEmail.textContent = "Email address not recognized";
  fullEmail.value = "Email box is full; unable to send notices by email. Holds, if any, are suspended. Email was: ";
  fullEmail.textContent = "Email box is full";

  bn.insertBefore(wrapper, bn.children[3]);
  wrapper.appendChild(msgLabel);
  wrapper.appendChild(msgSelect);
  msgSelect.appendChild(defaultOpt);
  msgSelect.appendChild(cardAtNxtCko);
  msgSelect.appendChild(laptopAgreement);
  msgSelect.appendChild(rtdMailGroup);
  rtdMailGroup.appendChild(poRtd);
  rtdMailGroup.appendChild(cardRtd);
  msgSelect.appendChild(badEmailGroup);
  badEmailGroup.appendChild(badEmail);
  badEmailGroup.appendChild(fullEmail);

}
