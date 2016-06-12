<?php

 /*
   * Collect all Details from Angular HTTP Request.
   */
    $postdata = file_get_contents("php://input");
    $request = json_decode($postdata);
    $usr = $request->email;
    $pass = $request->pass;

    echo "<h1> Username is : " . $usr . "<br /> and password is : ". $pass."</h1>"; //this will go back under "data" of angular call.
    /*
     * You can use $email and $pass for further work. Such as Database calls.
    */    

?>