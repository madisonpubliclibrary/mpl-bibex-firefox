if (/cgi-bin\/koha\/members\/member\.pl/.test(window.location)) {
  var target = document.querySelector('#bookbag_form tr:nth-of-type(2) td:nth-of-type(3) a');

  if (target) target.click();
}
