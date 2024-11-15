import { Button, CircularProgress } from '@mui/material';
import React from 'react';
import useWindowSize from '../../hooks/useWindowsSize';

const FullSmallPrimaryButton = ({ children, onClick, type = "submit", variant = "contained", loading = false, disabled }) => {
    const { width, height } = useWindowSize();

    return (
        <Button
          sx={{ width: '100%' }} // Añade este estilo para ocupar el ancho completo
          style={{ fontSize: width > 360 ? 16 : 12 }}
          onClick={onClick}
          type={type}
          variant={variant}
          disabled={loading || disabled}
        >
          {children} {loading && <CircularProgress style={{ marginLeft: 18 }} size={20} />}
        </Button>
    )
};

export default FullSmallPrimaryButton;
