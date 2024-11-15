import { Fab } from '@mui/material';
import React from 'react';
import '../../assets/styles/fab-container.css'
import { LuPlus } from 'react-icons/lu';

const CustomFabButton = ({ onClick }) => {
  return ( 
    <div className='fab-container' >
      <Fab onClick={onClick} size={"large"} color="primary" className='fab-container' aria-label="add">
        <LuPlus size={40} />
      </Fab>
    </div>
  );
};

export default CustomFabButton;
