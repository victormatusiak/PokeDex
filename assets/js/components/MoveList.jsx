import React, {Component} from 'react';
import { compare } from '../util';
import Move from './elements/Move';

class MoveList extends Component {

    constructor() {
        super();
        this.state = { 
            moves: [],
            sort: 'name',
            url: 'http://'+ window.location.hostname +':8000',
        };
    }

    componentDidMount(){
        const moves = this.props.moves;

        this.setState({
            moves: moves.sort(compare)
        })
    }

    render(){
        console.log(this.props.moves);
        return  (  
            <table id="wrap" className="table table-hover">
                <thead >
                    <tr className="table-head">
                        <th >Number</th>
                        <th >Name</th>
                        <th>Type</th>
                        <th>Category</th>
                        <th>Power</th>
                        <th>Accuracy</th>
                        <th>PP</th>
                    </tr>
                </thead>
                <tbody>
                    { this.props.moves.map(move =>
                        <Move
                            number={"-"}
                            move={move}
                        />
                    )}
                </tbody>
            </table>
        )
    }
};

export default MoveList;