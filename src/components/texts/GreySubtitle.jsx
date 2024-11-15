import { Typography } from '@mui/material'
import React from 'react'

const GreySubtitle = (
    { variant = "h5", component="p", color = "grey", children, textAlign = "left", paddingHorizontal = 0 }
) => {
  return (
    <Typography 
        variant={variant} 
        component={component} 
        color={color}
        style={{ fontWeight: '200', textAlign, paddingLeft: paddingHorizontal, paddingRight: paddingHorizontal }}
    >
      {children}
    </Typography>
  )
}

export default GreySubtitle