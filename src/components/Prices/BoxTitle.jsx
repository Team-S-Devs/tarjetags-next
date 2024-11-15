import React from "react";

const BoxTitle = (props) => {
    return (
        <div className='box-content-top'>
            <h5>{props.title}</h5>
            <div className='text-container-price' style={{ marginTop: -6 }}>
                <h4 className='text-price-table'
                ><span className="currency-text">{props.currency}</span> {props.amount}</h4>
            </div>
         </div>
    );
    };

export default BoxTitle;