<?php

namespace App\Services;

class ID
{
    public function __construct(){

    } 

    public function getNumber($url){
        $segments = explode("/", $url);
        $count = count($segments);
        $number = $segments[$count-2]; 

        return $number;
    } 
}