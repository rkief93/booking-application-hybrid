<?php
// Prevent caching.
//header('Cache-Control: no-cache, must-revalidate');

// The JSON standard MIME header.
//header('Content-type: application/json');          

$data = array(
    "username" => "one",
    "email" => "ifyoucanreadthis@yes.com",
    "age"  => 22
    );

// Send the data.
echo json_encode($data);
?>