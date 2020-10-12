import React, {Component} from 'react';
import {collapse} from '../util.js';


const Category = ({title, body}) => {

        return (
            <div className="row d-flex justify-content-around p-4">
                <div className="col-12 shadow border-light d-flex accordeon card"  >
                    <div className="accordeon-title" onClick={() => collapse(title)}>
                        {title}
                    </div>
                    <div id={title + "-body"} className={"accordeon-body"}>
                        {body}
                    </div>
                </div>         
            </div>
        )
    }


export default Category;