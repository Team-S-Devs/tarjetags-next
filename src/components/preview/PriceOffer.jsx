import { Typography } from '@mui/material';
import React from 'react';

const PriceOffer = ({
    color,
    products = [],
    activeIndex = 0
}) => {
  const originalPriceStyle = {
    textDecoration: 'line-through',
    color: 'red',
  };

  const price = products[activeIndex].price
  const offer = products[activeIndex].offerPrice

  return (
    <>
    {(price.show && offer.show) ? 
     <>
        <Typography color={color} style={{paddingTop: '1rem'}} className='price-carousel'>
        <span style={originalPriceStyle}>
          {price.number + " " + price.currency}
        </span>
      </Typography>
      <div className='price-product' style={{color:color}}>
            {offer.number + " " + offer.currency}
      </div>
    </>
      : (price.show) ?
      <div className='price-alone' style={{color:color}}>
        {price.number + " " + price.currency}
    </div> :
    (offer.show) ?
    <div className='price-alone' style={{color:color}}>
          {offer.number + " " + offer.currency}
      </div> :
      <></> 
    }
    </>
  );
}

export default PriceOffer;
