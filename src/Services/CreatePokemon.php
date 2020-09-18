<?php

namespace App\Services;

use App\Entity\Pokemon;
use App\Services\Type;
use App\Services\ID;
use PokePHP\PokeApi;

class CreatePokemon
{
    public function __construct(){

    } 

    public function create($p){
        if(is_Object($p)){
        //Stworzenie obiektu pokemona
        $pokemon = new Pokemon();

        //ustawienie id, nazwy i obrazku
        $pokemon->setId($p->id);
        $pokemon->setName($p->name);

        if($p->sprites->other->dream_world->front_default){
            $pokemon->setSprite($p->sprites->other->dream_world->front_default);
        } else {
            $pokemon->setSprite($p->sprites->front_default);
        }
        

        //ustawienia typów
        $types = $p->types;
        $type1 = new Type();
        $type1 = $type1->getType($types[0]->type->name); 
       
        $pokemon->setType1($type1);

        if(count($types)>1){
            $type2 = new Type();
            $type2 = $type2->getType($types[1]->type->name); 
        
            $pokemon->setType2($type2);
        }

        //ustawienia abiliies
        $abilities = $p->abilities;
        foreach($abilities as $ability){
            $a = $ability->ability;
            $id = new ID();
            $id = $id->getNumber($a->url);
            $slot = $ability->slot;

            if($slot == 1){
                $pokemon->setAbility1($id);
            }else if($slot == 2){
                $pokemon->setAbility2($id);
            } else if($slot == 3){
                $pokemon->setAbility3($id);
            }
        }
        
        //ustawienia statystyk 
        $stats = $p->stats;

        foreach($stats as $stat){
            $s = $stat->stat;
            $name = $s->name;
            $base = $stat->base_stat;

            if($name == 'hp'){
                $pokemon->setHp($base);
            } else if($name == 'attack'){
                $pokemon->setAttack($base);
            } else if($name == 'defense'){
                $pokemon->setDefense($base);
            } else if($name == 'special-attack'){
                $pokemon->setSpecialAttack($base);
            } else if($name == 'special-defense'){
                $pokemon->setSpecialDefense($base);
            } else if($name == 'speed'){
                $pokemon->setSpeed($base);
            }
        }

        return $pokemon;
        }
    } 
}