import { Typography } from '@mui/material';
import React from 'react';

const BoldTitle = (
  { textTransform = "uppercase", children, color="primary", variant='h4', component="h1", textAlign = "left", style }
) => {
  return (
    <Typography 
      color={color} variant={variant} component={component} style={{ fontWeight: 'bold', textAlign, textTransform, ...style }}
    >
      {children}
    </Typography>
  );
};

export default BoldTitle;
