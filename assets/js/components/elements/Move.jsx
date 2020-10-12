import React, {Component} from 'react';
import {capitalize, restring} from '../../util.js';

import Type from './Type'

const Move = ({number, move}) => (
        <tr>
           <td>
               {number}
           </td>
           <td>
               {capitalize(restring(move.name))}
           </td>
           <td>
                <Type 
                    type={move.type}
                />
           </td>
           <td>
               {capitalize(move.category)}
           </td>
           <td>
               {move.power}
           </td>
           <td>
               {move.accuracy}
           </td>
           <td>
               {move.pp}
           </td>
       </tr>
)

export default Move;