import React, { useState } from 'react';

const Type = ({type}) => {
    return(
        <div className={"icon m-2 " + type }>
            <img src={"../build/icons/"+ type +".svg"}/>
        </div>
    )
}

export default Type;