import { Button, CircularProgress } from '@mui/material'
import React from 'react'

const BigPrimaryButton = ({ variant = "contained", children, display = 'initial',onClick, type = "submit", loading = false, fullWidth, style={} }) => (
    <Button 
        style={{ fontSize: 22, display:display, ...style }} 
        onClick={onClick} 
        type={type} 
        disabled={loading} 
        fullWidth={fullWidth}
        variant={variant}>
            {children} {loading && <CircularProgress style={{ marginLeft: 18 }} size={20} />}
    </Button>
)

export default BigPrimaryButton;