<?php

namespace App\Services;

class Type
{
    public function __construct(){
    }

    public function getType(string $type){
        $types = [
            'normal' => 1,
            'fighting' => 2,
            'flying' => 3,
            'poison' => 4,
            'ground' => 5,
            'rock' => 6,
            'bug' => 7,
            'ghost' => 8,
            'steel' => 9,
            'fire' => 10,
            'water' => 11,
            'grass' => 12,
            'electric' => 13,
            'psychic' => 14,
            'ice' => 15,
            'dragon' => 16,
            'dark' => 17,
            'fairy' => 18,
            'unknown' => 10001,
            'shadow' => 10002,
        ];

        return $types[$type];
    }

    public function getNumber(string $url){
        $segments = explode("/", $url);
        $count = count($segments);
        $number = $segments[$count-2]; 

        return $number;
    }    

}