// ./assets/js/components/Pokemon.js
    
import React from 'react';
import {Link} from 'react-router-dom';
import Types from './Types';

const capitalize = (s) => {
    if (typeof s !== 'string') return ''
    return s.charAt(0).toUpperCase() + s.slice(1)
}

const PokemonElement = props => {
    return  (  
        <div className="pokemon-card card m-3 shadow border-light d-flex">
            <Link to={"/pokemon/"+props.name}>
                <div className="card-body">
                    <h5 className="card-title float-left">{ capitalize(props.name) }</h5>
                    <small className="card-title mb-2 text-muted float-right">#{ props.id }</small>
                    <img className="pokemon-img w-100 pl-3 pr-3" src={ props.img }/>
                    <Types
                        type1 = {props.type1}
                        type2 = {props.type2}
                    />
                </div>
            </Link>
        </div>
    )
};



export default PokemonElement;