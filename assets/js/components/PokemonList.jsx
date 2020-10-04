import React, {Component} from 'react';

import Pokemon from './Pokemon';

const PokemonList = props => {

    return  (  
        <div className={'row  d-flex justify-content-around p-4'}>
        { props.pokemons.map(pokemon =>
            
            <Pokemon 
                id = {pokemon.id}
                name = {pokemon.name}
                img = {pokemon.sprite}
                type1 = {pokemon.type1}
                type2 = {pokemon.type2}
            />
        )}
    </div>
    )
};

export default PokemonList;