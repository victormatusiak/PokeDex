import React, {Component} from 'react';
import axios from 'axios';
import {capitalize, baseName, allTypes} from '../util.js';
import Category from './Category';
import MoveList from './MoveListButBetter.jsx';
import FlipCard from './FlipCard.jsx';
import Stats from './Stats.jsx';
import Typing from './Typing.jsx';

class Pokemon extends Component {

    constructor() {
        super();
        this.state = { 
            loading: true,
            pokemon: {},
            moves:[],
            moveNames: [],
            relations: {
                'defense': {
                    'x4': [],
                    'x2': [],
                    'x1': allTypes,
                    'x1/2': [],
                    'x1/4': [],
                    'x0': [],
                },
                "attack": {
                    'x2': [],
                    'x1': allTypes,
                    'x1/2': [],
                },
            },
            url: 'http://'+ window.location.hostname +':8000',
        };

        this.getPokemon = this.getPokemon.bind(this);
        this.getMoves = this.getMoves.bind(this);
        this.getTypes = this.getTypes.bind(this);
    }

    componentDidMount(){
        this.getPokemon();
        this.getMoves();
    }

    getPokemon(){
        const name = baseName(window.location.href);
        const url = 'https://pokeapi.co/api/v2/pokemon/' + name;
        const moveNames = [];

        axios.get(url).then(pokemon => {
            this.setState({ 
                pokemon: pokemon.data,
                bgcolor: 'background-color-' + pokemon.data.types[0].type.name,
                loading: false
            });

            pokemon.data.moves.forEach(function(el){
                moveNames.push(el.move.name);
            })

            this.setState({ 
                moveNames: moveNames,
            });

            console.log(this.state.pokemon);
        }).then(() => {
            this.getTypes()
        });
    }

    getMoves(){
        axios.get(this.state.url + `/api/moves`).then(moves => {
            this.setState({ 
                moves: moves.data,
            });
        });
    }

    getTypes(){
        const types = this.state.pokemon.types;  
        const relations = {
            'defense': {
                'x4': [],
                'x2': [],
                'x1': allTypes,
                'x1/2': [],
                'x1/4': [],
                'x0': [],
            },
            "attack": {
                'x2': [],
                'x1': allTypes,
                'x1/2': [],
            }
            
        };

        types.map(type => {
            axios.get(type.type.url).then(({data}) => {
                const rel = data.damage_relations

                rel.double_damage_from.map(({name}) => {
                    if (relations.defense['x2'].includes(name)){
                        relations.defense['x2'] = relations.defense['x2'].filter(e => e !== name)
                        relations.defense['x4'].push(name)
                    } else if (relations.defense['x1/2'].includes(name)) {
                        relations.defense['x1/2'] = relations.defense['x1/2'].filter(e => e !== name)
                        relations.defense['x1'].push(name)
                    } else {
                        relations.defense['x1'] = relations.defense['x1'].filter(e => e !== name)
                        relations.defense['x2'].push(name)
                    }
                })

                rel.half_damage_from.map(({name}) => {
                    if (relations.defense['x1/2'].includes(name)){
                        relations.defense['x1/2'] = relations.defense['x1/2'].filter(e => e !== name)
                        relations.defense['x1/4'].push(name)
                    }  else if (relations.defense['x2'].includes(name)) {
                        relations.defense['x2'] = relations.defense['x2'].filter(e => e !== name)
                        relations.defense['x1'].push(name)
                    }  else {
                        relations.defense['x1'] = relations.defense['x1'].filter(e => e !== name)
                        relations.defense['x1/2'].push(name)
                    } 
                })

                if( types[0].type.name == type.type.name ) {
                    rel.double_damage_to.map(({name}) => {
                        if (relations.attack['x2'].includes(name)){
                            relations.attack['x2'] = relations.attack['x2'].filter(e => e !== name)
                        } else {
                            relations.attack['x1'] = relations.attack['x1'].filter(e => e !== name)
                            relations.attack['x2'].push(name)
                        }
                    })
    
                    rel.half_damage_to.map(({name}) => {
                        if (relations.attack['x1/2'].includes(name)){
                            relations.attack['x1/2'] = relations.attack['x1/2'].filter(e => e !== name)
                        } else {
                            relations.attack['x1'] = relations.attack['x1'].filter(e => e !== name)
                            relations.attack['x1/2'].push(name)
                        } 
                    })
                }  

            }).then(() => {
                this.setState({ 
                    relations: relations,
                });
            });
        })
    }

    render(){
        const {loading, pokemon, moves, moveNames, relations} = this.state;
        let filteredMoves = moves.filter( (move) =>  moveNames.includes(move.name));
        
        return ( 
            <div className="h-100">
                {loading ? (
                    <div className={'row text-center'}>
                        <span className="fa fa-spin fa-spinner fa-4x"></span>
                    </div>
                ) : (
                    <section className={'row text-center bg-light h-100'} id="pokemon">
                        <div className="container ">
                            <div className="row d-flex justify-content-around pl-4 pr-4 pt-4">
                                <div className={"col-12 shadow border-light d-flex pokemon-title "+ this.state.bgcolor} >
                                    <p className="mb-2 float-left">#{ pokemon.id }</p>   
                                    <p className="w-100 float-right">{capitalize(pokemon.name)}</p>                     
                                </div>
                            </div>
                            
                            <div className="row d-flex justify-content-between p-4">
                                <div className="shadow border-light d-flex stats stats-left">                    
                                </div>
                                    <FlipCard 
                                        class = {'shadow border-light d-flex stats stats-right p-3'}
                                        front = {<img className="mw-100 h-100" src={pokemon.sprites.other.dream_world.front_default}></img>}
                                        back = { 
                                            <Stats
                                                stats={pokemon.stats}
                                            /> 
                                        }
                                    />
                            </div>

                            <Category
                                title = "Typing"
                                body = {
                                    // <p></p>
                                    <div>
                                        <Typing
                                            name = "Defense"
                                            relations = {relations.defense}
                                        />
                                        <Typing 
                                            name = "Attack"
                                            relations = {relations.attack}
                                        />
                                    </div>
                                } 
                            />

                            <Category
                                title = "Encounters"
                                body = {
                                    <p></p>
                                } 
                            />

                            <Category
                                title = "Moves"
                                body = {
                                    <MoveList 
                                        moves= {filteredMoves}
                                    />
                                } 
                            />
                        </div>
                    </section>
                )}
                
            </div>
        ) 
    }
};

export default Pokemon;

