// ./assets/js/components/Pokemon.js
    
import React from 'react';

const Pokemon = props => {
    return  (  
        <div className="pokemon-card card m-3 shadow border-light">
            <div className="card-body">
                <h5 className="card-title float-left">{ props.name }</h5>
                <small className="card-title mb-2 text-muted float-right">#{ props.id }</small>
                <img className="pokemon-img w-100 pl-3 pr-3" src={ props.img }/>
            </div>
        </div>
    )
};



export default Pokemon;