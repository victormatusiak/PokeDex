<?php

namespace App\Services;

use App\Entity\Move;
use PokePHP\PokeApi;

class CreateMove
{
    public function __construct(){

    } 

    public function create($p){
        if(is_Object($p)){
            //Stworzenie obiektu ruchu
            $move = new Move();

            //ustawienie id, nazwy i obrazku
            $move->setId($p->id);
            $move->setName($p->name);
            $move->setType($p->type->name);
            $move->setCategory($p->damage_class->name);
            $move->setPower($p->power);
            $move->setAccuracy($p->accuracy);
            $move->setPp($p->pp);

            return $move;
        }
    } 
}