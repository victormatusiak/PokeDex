import React, { useState } from 'react';
import Row from './elements/Row'

const Typing = ({name, relations}) => {
    const [filter, setFilter] = useState(relations);

    let multipliers = Object.keys(filter).map(name => {
        if(relations[name].length > 0){
            return name;
        }
    });   

    const filteredMultipliers = multipliers.filter(function (el) {
        return el != null;
    });

    return (
        <div className="col-6 p-4 float-left">
            <h3>{name}</h3>
            <table className="table-stats table h-100 m-auto">
                <thead>
                    <th>
                        Damage
                    </th>
                    <th>
                        Type
                    </th>
                </thead>
                <tbody>
                    {
                        filteredMultipliers.map(name =>
                            <Row 
                                name = {name}
                                types = {relations[name]}
                            />
                        )
                    }   
                </tbody>
            </table>
        </div>
        
    )
}

export default Typing;