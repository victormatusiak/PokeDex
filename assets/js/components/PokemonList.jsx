import React, {Component} from 'react';

import Pokemon from './Pokemon';

const PokemonList = props => {

    return  (  
        <div className={'row  d-flex justify-content-center p-4'}>
        { props.pokemons.map(pokemon =>
            
            <Pokemon 
                id = {pokemon.id}
                name = {pokemon.name}
                img = {pokemon.sprite}
            />
        )}
    </div>
    )
};

export default PokemonList;