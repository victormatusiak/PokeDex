import React, {Component} from 'react';
import Progress from './elements/Progress';
import { barWidth } from '../util.js'

class Stats extends Component {
    constructor() {
        super();
        this.state = { 
            pokemonStats: {
                'attack': 0,
                'defense': 0,
                'hp': 0,
                'special-attack': 0,
                'special-defense': 0,
                'speed': 0,
            },
            highest: 0,
            stats: [],
        };

        this.getStats = this.getStats.bind(this);
    }

    componentDidMount(){
        this.getStats();
    }

    getStats(){
        let stats = {};
        let highest = 0;
        this.props.stats.map(stat => {
                stats[stat.stat.name] = stat.base_stat;

                if(stat.base_stat > highest){
                    highest = stat.base_stat;
                }
            }
        )

        this.setState({
            pokemonStats: stats,
            highest: highest
        })
    }

    render(){
        let stats = this.state.pokemonStats;
        let highest = this.state.highest;
        return  (  
            <table className="table-stats table h-100 m-auto">
                <tbody>
                    <tr>
                        <th>HP</th>
                        <td>
                            <Progress
                                stat = {stats.hp}
                                width = {barWidth(stats.hp, highest)}
                                color = 'red'
                            />
                        </td>
                    </tr>
                    <tr>
                        <th>Attack</th>
                        <td>
                            <Progress
                                stat = {stats.attack}
                                width = {barWidth(stats.attack, highest)}
                                color = 'orange'
                            />
                        </td>
                    </tr>
                    <tr>
                        <th>Defense</th>
                        <td>
                            <Progress
                                stat = {stats.defense}
                                width = {barWidth(stats.defense, highest)}
                                color = 'yellow'
                            />
                        </td>
                    </tr>
                    <tr>
                        <th>Sp.Attack</th>
                        <td>
                            <Progress
                                stat = {stats['special-attack']}
                                width = {barWidth(stats['special-attack'], highest)}
                                color = 'blue'
                            />
                        </td>
                    </tr>
                    <tr>
                        <th>Sp.Defense</th>
                        <td>
                            <Progress
                                stat = {stats['special-defense']}
                                width = {barWidth(stats['special-defense'], highest)}
                                color = 'green'
                            />
                        </td>
                    </tr>
                    <tr>
                        <th>Speed</th>
                        <td>
                            <Progress
                                stat = {stats.speed}
                                width = {barWidth(stats.speed, highest)}
                                color = 'pink'
                            />
                        </td>
                    </tr>
                </tbody>
            </table>
        )
    }
};

export default Stats;