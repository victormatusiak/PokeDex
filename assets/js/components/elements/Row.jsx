import React, {Component} from 'react';
import Type from './Type'

const Row = ({name, types}) => (
    <tr>
        <th>
            {name}
        </th>
        <td>
            {types.map(type => 
                <Type 
                    type={type}
                />
            )}
        </td>
    </tr>
)

export default Row;