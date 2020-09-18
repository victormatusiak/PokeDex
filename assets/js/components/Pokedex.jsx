// ./assets/js/components/Pokedex.js
    
import React, {Component} from 'react';
import '../util.js'

import Pokemon from './Pokemon';
import PokemonList from './PokemonList';
import axios from 'axios';
import InfiniteScroll from 'react-infinite-scroll-component';

class Pokedex extends Component {
    constructor() {
        super();
        this.state = { 
            pokemons: [],
            searchedPokemons: [], 
            loading: true,
            search: '',
            totalItems: 0,
            next: '',
            last: '',
            url: 'http://localhost:8000',
        };

        this.getMorePokemons = this.getMorePokemons.bind(this);
        this.searchPokemons = this.searchPokemons.bind(this);
    }

    componentDidMount() {
        this.getPokemons();
    }
    
    getPokemons() {
        axios.get(`http://localhost:8000/api/pokemon?page=1`).then(pokemons => {
           
            this.setState({ 
                pokemons: pokemons.data['hydra:member'], 
                next: pokemons.data['hydra:view']['hydra:next'], 
                last: pokemons.data['hydra:view']['hydra:last'], 
                totalItems: pokemons.data['hydra:totalItems'],
                loading: false
            });
        });
        
        axios.get(`http://localhost:8000/api/pokemons`).then(pokemons => {
           
            this.setState({ 
                allPokemons: pokemons.data
            });
       });
    }

    getMorePokemons(){
        axios.get(this.state.url + this.state.next).then(pokemons => {
            this.setState({ 
                pokemons: this.state.pokemons.concat(pokemons.data['hydra:member']), 
                next: pokemons.data['hydra:view']['hydra:next'], 
            });
       });
    }

    searchPokemons(){
        axios.get(this.state.url + `/api/pokemon?name=` + this.state.search).then(pokemons => {
            this.setState({ 
                searchedPokemons: pokemons.data['hydra:member'],
                next: pokemons.data['hydra:view']['hydra:next'],  
            })
        })
    }
    
    updateSearch(event){
        this.setState({
            search: event.target.value
        })
    }
    
    render() {
        const loading = this.state.loading;

        let filteredPokemons = this.state.pokemons.filter(
            (pokemon) => {
                return pokemon.name.indexOf(this.state.search) !== -1;
            }
        );
        
        // .concat(
        //     this.state.allPokemons.filter(
        //         (pokemon) => {
        //             return pokemon.name.indexOf(this.state.search) !== -1;
        //         }
        //     )
        // );

        return(
            <div >
                <section className="row-section" id="pokedex">
                    <div className="container ">
                        <div className="row">
                            <h2 className="text-center"><span>Pokedex</span></h2>
                        </div>
                        <div className=" my-2 my-lg-0  d-flex justify-content-center "> 
                            <form className="input-group form-inline w-50">
                                <input 
                                    className="form-control w-50" 
                                    type="search" 
                                    placeholder="Search pokemon" aria-label="Search pokemon" 
                                    value={this.state.search}
                                    onChange={this.updateSearch.bind(this)}
                                />
                                <div className="input-group-append">
                                    <button 
                                        className="btn btn-outline-success" 
                                        type="button" 
                                        onClick={this.searchPokemons}
                                    >
                                        Search
                                    </button>
                                </div>
                            </form>
                        </div>
                        <br/>
                        

                        {loading ? (
                                <div className={'row text-center'}>
                                    <span className="fa fa-spin fa-spinner fa-4x"></span>
                                </div>
                            ) : (
                                <InfiniteScroll
                                    dataLength={this.state.pokemons.length}
                                    next={this.getMorePokemons}
                                    hasMore={this.state.pokemons.length < this.state.totalItems}
                                    loader={<div className={'row text-center'}><span className="fa fa-spin fa-spinner fa-4x"></span></div>}
                                >
                                    <PokemonList 
                                        pokemons = {filteredPokemons}
                                    />
                                 </InfiniteScroll>
                            )}
                    </div>
                </section>
            </div>
        )
    }
}
export default Pokedex;