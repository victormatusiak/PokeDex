<?php

namespace App\Controller;

use App\Repository\PokemonRepository;
use App\Repository\MoveRepository;
use App\Services\CreatePokemon;
use App\Services\CreateMove;
use PokePHP\PokeApi;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\Routing\Annotation\Route;

class PokedexController extends AbstractController
{
    /**
     * @Route("/pokedex", name="pokedex")
     */
    public function index(PokemonRepository $pokemonRepository)
    {   
        $pokemons = $pokemonRepository->findAll(); 
        
        return $this->render('pokedex/index.html.twig', [
            'pokemons' => $pokemons,
        ]);
    }

    /**
     * @Route("/api/pokemons", name="pokemons")
     * @return \Symfony\Component\HttpFoundation\JsonResponse
     */
    public function getPokemons( PokemonRepository $pokemonRepository)
    {   
        $pokemons = $pokemonRepository->findAll(); 

        $response = new Response();

        $response->headers->set('Content-Type', 'application/json');
        $response->headers->set('Access-Control-Allow-Origin', '*');

        $response->setContent(json_encode($pokemons));
        
        return $response;
    }

    /**
     * @Route("/api/moves", name="moves")
     * @return \Symfony\Component\HttpFoundation\JsonResponse
     */
    public function getMoves(MoveRepository $MoveRepository)
    {   
        $pokemons = $MoveRepository->findAll(); 

        $response = new Response();

        $response->headers->set('Content-Type', 'application/json');
        $response->headers->set('Access-Control-Allow-Origin', '*');

        $response->setContent(json_encode($pokemons));
        
        return $response;
    }

    /**
     * @Route("/sync", name="sync")
     *
     */
    public function synchronize(PokemonRepository $pokemonRepository){    
        $Names  = [];
        $IDs = [];
        $pokemons = $pokemonRepository->findAll(); 
        $api = new PokeApi;

        foreach($pokemons as $pokemon){
            array_push($IDs, $pokemon->id);
            array_push($Names, $pokemon->name);
        }
        
        $pokemonsJSON = json_decode($api->resourceList('pokemon',100,800));
        $pokemonsResults = $pokemonsJSON ->results;
        $pokemonsNext = $pokemonsJSON->next;

        foreach($pokemonsResults as $pokemon){

            //entity manager
            $em = $this->getDoctrine()->getManager();
            $exist = false;

            $api = new PokeApi;

            //Sprawdzanie czy istnieje
            if(!in_array($pokemon->name, $Names)){  
                //Pobieranie pokemona 
                $p = json_decode($api->pokemon($pokemon->name));

                if(is_Object($p)){
                    $exist = true;
                }else{
                    $name = explode("-", $pokemon->name);
                    $p = json_decode($api->pokemon($name[0]));
                    
                    if(is_Object($p)){
                        $exist = true;
                    }
                }
            }

            if($exist == true  && !in_array($p->id , $IDs)){
                // Tworzenie pokemona
                $pokemon = new CreatePokemon();
                $pokemon = $pokemon->create($p);
    
                $em->persist($pokemon);
                $em->flush();
            }
        } 

        while($pokemonsNext){
            $api = new PokeApi;
            $pokemonsJSON = json_decode($api->sendRequest($pokemonsNext));
            $pokemonsResults = $pokemonsJSON ->results;
            $pokemonsNext = $pokemonsJSON->next;

            foreach($pokemonsResults as $pokemon){
               //entity manager
                $em = $this->getDoctrine()->getManager();
                $exist = false;

                $api = new PokeApi;

                //Sprawdzanie czy istnieje
                if(!in_array($pokemon->name, $Names)){  
                    //Pobieranie pokemona 
                    $p = json_decode($api->pokemon($pokemon->name));

                    if(is_Object($p)){
                        $exist = true;
                    }else{
                        $name = explode("-", $pokemon->name);
                        $p = json_decode($api->pokemon($name[0]));
                        
                        if(is_Object($p)){
                            $exist = true;
                        }
                    }
                }

                if($exist == true  && !in_array($p->id , $IDs)){
                    // Tworzenie pokemona
                    $pokemon = new CreatePokemon();
                    $pokemon = $pokemon->create($p);
        
                    $em->persist($pokemon);
                    $em->flush();
                }
            }
        }  
        
        return $this->redirect($this->generateUrl('pokedex'));
    }

    /**
     * @Route("/sync/moves", name="syncMoves")
     *
     */
    public function synchronizeMoves(MoveRepository $MoveRepository){    
        $Names  = [];
        $IDs = [];
        $moves = $MoveRepository->findAll(); 
        $api = new PokeApi;

        foreach($moves as $move){
            array_push($IDs, $move->id);
            array_push($Names, $move->name);
        }
        
        $movesJSON = json_decode($api->resourceList('move',20,500));
        $movesResults = $movesJSON ->results;
        $movesNext = $movesJSON->next;

        foreach($movesResults as $move){

            //entity manager
            $em = $this->getDoctrine()->getManager();
            $exist = false;

            $api = new PokeApi;

            //Sprawdzanie czy istnieje
            if(!in_array($move->name, $Names)){  
                //Pobieranie ruchu 
                $p = json_decode($api->move($move->name));

                if(is_Object($p)){
                    $exist = true;
                }else{
                    $name = explode("-", $move->name);
                    $p = json_decode($api->move($name[0]));
                    
                    if(is_Object($p)){
                        $exist = true;
                    }
                }
            }

            if($exist == true  && !in_array($p->id , $IDs)){
                // Tworzenie pokemona
                $move = new createMove();
                $move = $move->create($p);
    
                $em->persist($move);
                $em->flush();
            }
        }

        while($movesNext){
            $movesJSON = json_decode($api->sendRequest($movesNext));
            $movesResults = $movesJSON ->results;
            $movesNext = $movesJSON->next;

            foreach($movesResults as $move){

                //entity manager
                $em = $this->getDoctrine()->getManager();
                $exist = false;

                $api = new PokeApi;

                //Sprawdzanie czy istnieje
                if(!in_array($move->name, $Names)){  
                    //Pobieranie ruchu 
                    $p = json_decode($api->move($move->name));

                    if(is_Object($p)){
                        $exist = true;
                    }else{
                        $name = explode("-", $move->name);
                        $p = json_decode($api->move($name[0]));
                        
                        if(is_Object($p)){
                            $exist = true;
                        }
                    }
                }

                if($exist == true  && !in_array($p->id , $IDs)){
                    // Tworzenie pokemona
                    $move = new createMove();
                    $move = $move->create($p);
        
                    $em->persist($move);
                    $em->flush();
                }
            }
        }  

        return $this->redirect($this->generateUrl('pokedex'));
    }
}
