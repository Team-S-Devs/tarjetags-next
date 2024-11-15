import { Button, CircularProgress } from '@mui/material'
import React from 'react'

const MediumSecondaryButton = ({ children, onClick, type = "submit", loading = false }) => (
    <Button style={{ fontSize: 16 }} onClick={onClick} type={type} variant="outlined" disabled={loading} >
        {children} {loading && <CircularProgress style={{ marginLeft: 18 }} size={20} />}
    </Button>
)

export default MediumSecondaryButton;