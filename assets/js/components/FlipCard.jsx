import React, {Component} from 'react';

class FlipCard extends Component {
    render(){
        return  (  
            <div className={"flip-card " + this.props.class}>
                <div className={"flip-card-inner "}>
                    <div className="flip-card-front">
                        {this.props.front}
                    </div>
                    <div className="flip-card-back">
                        {this.props.back}
                    </div>
                </div>
            </div>
        )
    }
};

export default FlipCard;