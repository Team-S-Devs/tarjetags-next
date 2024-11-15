import * as React from 'react';
import Checkbox from '@mui/material/Checkbox';

const labelConfig = { inputProps: { 'aria-label': 'Checkbox demo' } };

const CheckBox = ({ name, label, size ,defaultChecked = false, action = e => {}, data = {} }) => {
  return (
    <div style={{marginBottom: '10px', display: 'flex', alignItems: 'center', flexDirection: 'row'}}>
        <Checkbox {...labelConfig} name={name} id={name} size={size} checked={defaultChecked} onChange={() => action(data)}  />
        <label htmlFor={name}>{label}</label>
    </div>
  );
}

export default CheckBox