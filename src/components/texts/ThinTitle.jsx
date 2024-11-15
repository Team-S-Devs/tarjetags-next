import React from 'react'
import { Typography } from '@mui/material';

const ThinTitle = ({ children, color="#000", variant="h4", component="h1", textAlign="left", style }) => {
  return (
    <Typography style={{ lineHeight: '1.4', textAlign, ...style}} variant={variant} component={component} color={color}>
      {children}
    </Typography>
  )
}

export default ThinTitle