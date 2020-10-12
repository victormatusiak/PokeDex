import React, {Component} from 'react';
import {capitalize, restring} from '../util.js';

const Move = ({number, move}) => (
        <tr>
           <td>
               {number}
           </td>
           <td>
               {capitalize(restring(move.name))}
           </td>
           <td>
                <div className={"icon " + move.type}>
                    <img src={"../build/icons/"+ move.type +".svg"}/>
                </div>
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