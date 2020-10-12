import React, { useState } from 'react';
import { helper } from '../util.js';
import Move from './Move';

const MoveList = ({moves}) => {
    const [filter, setFilter] = useState({sort: 'name', direction: 'asc'});

    const updateFilter = (sort) => {
        setFilter((oldState) => {
            if (oldState.sort === sort) {
                if (oldState.direction === 'asc') {
                    return {sort, direction: 'desc'}
                } else {
                    return {sort, direction: 'asc'}
                } 
            } else {
                return {sort, direction: 'asc'}
            }
        });
    }

    const {sort, direction} = filter;

    return (
        <table className="table table-hover">
            <thead >
                <tr className="table-head">
                        <th onClick={() => updateFilter('number')} >Number</th>
                        <th onClick={() => updateFilter('name')} >Name</th>
                        <th onClick={() => updateFilter('type')} >Type</th>
                        <th onClick={() => updateFilter('category')} >Category</th>
                        <th onClick={() => updateFilter('power')}>Power</th>
                        <th onClick={() => updateFilter('accuracy')} >Accuracy</th>
                        <th onClick={() => updateFilter('pp')} >PP</th>
                    </tr>
            </thead>
            <tbody>
                    { helper(moves, sort, direction).map(move =>
                        <Move
                            number={"-"}
                            move={move}
                        />
                    )}
            </tbody>
        </table>
    )
}

export default MoveList;