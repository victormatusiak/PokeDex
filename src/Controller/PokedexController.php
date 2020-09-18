<?php

namespace App\Controller;

use App\Entity\Pokemon;
use App\Repository\PokemonRepository;
use App\Services\CreatePokemon;
use App\Services\Type;
use App\Services\ID;
use PokePHP\PokeApi;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\Routing\Annotation\Route;

use Pagerfanta\Adapter\ArrayAdapter;
use Pagerfanta\Pagerfanta;

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

        // $adapter = new ArrayAdapter($pokemons);
        // $pagerfanta = new Pagerfanta($adapter);
        // $pagerfanta->setMaxPerPage(20);

        // if ($pagerfanta->hasPreviousPage()) {
        //     $pagerfanta->getPreviousPage(); // Will not be executed
        // }
        
        // if ($pagerfanta->hasNextPage()) {
        //     $pagerfanta->getNextPage(); // Will return 2
        // }
        
        // $pagerfanta->setCurrentPage($page);
        // $pagerfanta->nextPage =  $pagerfanta->getNextPage();

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
}
