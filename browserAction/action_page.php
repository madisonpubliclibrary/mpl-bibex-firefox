<?php
  // The global $_POST variable allows you to access the data sent with the POST method by name
  // To access the data sent with the GET method, you can use $_GET
  
  $barcode = htmlspecialchars($_GET['barcode']);
  $laptopId = htmlspecialchars($_GET['laptopId']);
  
  echo $barcode, ' ', $laptopId;
 ?>