import React, {Component} from 'react';

const Progress = ({color, width, stat}) =>  {
    return  (  
        <div className=".progress-bar" >
            <div className={"progress-done progress-" + color} style={{width: width}}>
                {stat}
                </div>
        </div>
    )
};

export default Progress;