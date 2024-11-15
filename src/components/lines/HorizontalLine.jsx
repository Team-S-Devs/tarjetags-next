import { Divider } from '@mui/material';
import React from 'react'

const HorizontalLine = () => {
    const dividerStyle = {
        backgroundColor: '#727070', // Set the background color to #727070
        height: '1px', // Set the height of the divider
        margin: '2px 0', // Set margin for spacing
    };

    return (
        <div style={{ padding: '12px' }}>
            <Divider style={dividerStyle} />
        </div>
    );
}

export default HorizontalLine