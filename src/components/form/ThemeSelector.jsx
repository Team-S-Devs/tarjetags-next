import React, { useState } from 'react';
import { FormControl, FormLabel, RadioGroup, Radio, FormControlLabel } from '@mui/material';

const ThemeSelector = ({ elementsInfo = {theme: ''}, setElementsInfo }) => {

  const handleChange = (event) => {
    setElementsInfo({...elementsInfo, theme: event.target.value})
    // You can perform actions based on the selected theme here
  };

  return (
    <FormControl component="fieldset">
      <FormLabel component="legend">Selecciona el tema:</FormLabel>
      <RadioGroup
        row
        aria-label="theme"
        name="theme"
        value={elementsInfo.theme}
        onChange={handleChange}
      >
        <FormControlLabel value="light" control={<Radio />} label="Claro" />
        <FormControlLabel value="dark" control={<Radio />} label="Oscuro" />
      </RadioGroup>
    </FormControl>
  );
};

export default ThemeSelector;
