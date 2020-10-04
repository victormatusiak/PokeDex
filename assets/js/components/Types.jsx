// ./assets/js/components/Type.js
    
import React from 'react';

const capitalize = (s) => {
    if (typeof s !== 'string') return ''
    return s.charAt(0).toUpperCase() + s.slice(1)
}

function type(type){
    let name = '';

    switch(type){
        case 1:
            name = "normal";
            break;
        case 2:
            name = "fighting";
            break;    
        case 3:
            name = "flying";
            break;    
        case 4:
            name = "poison";
            break;    
        case 5:
            name = "ground";
            break;    
        case 6:
            name = "rock";
            break;    
        case 7:
            name = "bug";
            break;    
        case 8:
            name = "ghost";
            break;    
        case 9:
            name = "steel";
            break;    
        case 10:
            name = "fire";
            break;    
        case 11:
            name = "water";
            break;    
        case 12:
            name = "grass";
            break;    
        case 13:
            name = "electric";
            break;    
        case 14:
            name = "psychic";
            break;    
        case 15:
            name = "ice";
            break; 
        case 16:
            name = "dragon";
            break;
        case 17:
            name = "dark";
            break;
        case 18:
            name = "fairy";
            break;   
        default:
            name = "unkown";
            break;
    }

    let background = "background-color-" + name;

    return {
        name: capitalize(name),
        background: background
    };
}



const Types = props => {
    let types;
    if(props.type2){
        let type1 = type(props.type1);
        let type2 = type(props.type2);
        types = <div className="row d-flex justify-content-center"><span  className={type1.background + " label"}>{type1.name}</span><span  className={type2.background + " label"}>{type2.name}</span></div>;
    }else {
        let type1 = type(props.type1);
        types = <div className="row d-flex justify-content-center"><span  className={type1.background + " label"}>{type1.name}</span></div>;
    }

    return  (  
        <div className="w-100 stick-bottom">
            {types}
        </div>
    )
};



export default Types;