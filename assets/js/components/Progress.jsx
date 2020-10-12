import React, {Component} from 'react';

class Progress extends Component {
    render(){
        return  (  
            <div className=".progress-bar" >
                <div className={"progress-done progress-" + this.props.color} style={{width: this.props.width}}>
                    {this.props.stat}
                </div>
            </div>
        )
    }
};

export default Progress;