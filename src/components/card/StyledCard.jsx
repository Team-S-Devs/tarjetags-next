import React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';

const StyledCard = ({ children, style }) => {
  return (
    <Card>
        <CardContent style={style}>
            {children}
        </CardContent>
    </Card>
  );
};

export default StyledCard;
