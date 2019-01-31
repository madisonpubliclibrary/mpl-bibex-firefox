// If this is the patron edit frame
if (/cgi-bin\/koha\/members\/memberentry\.pl/.test(window.location)) {
  var inputs = document.querySelectorAll('input[type=text]'),
    unusedFields = [
      'address2',
      'select_city',
      'country',
      'mobile',
      'fax',
      'B_address2',
      'B_country',
      'altcontactaddress2',
      'altcontactcountry',
      'sort2',
      'patron_attr_1',
      'patron_attr_2',
      'patron_attr_3',
      'patron_attr_4',
      'patron_attr_5',
      'patron_attr_6',
      'patron_attr_7',
      'patron_attr_8',
      'patron_attr_9',
      'patron_attr_10',
      'patron_attr_11'
    ],
    unusedForWebUse = [
      'phone',
      'phonepro',
      'email',
      'emailpro',
      'B_address',
      'B_city',
      'B_zipcode',
      'B_phone',
      'B_email',
      'altcontactsurname',
      'altcontactfirstname',
      'altcontactaddress1',
      'altcontactaddress3',
      'altcontactzipcode',
      'altcontactphone'
    ];
}
