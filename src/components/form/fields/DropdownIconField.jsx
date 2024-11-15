import { Button, Dialog, DialogContent, DialogTitle, MenuItem, TextField } from "@mui/material";
import React, { useEffect, useState } from "react";
import { FaICursor } from "react-icons/fa";
import FieldText from "./FieldText";
import SmallPrimaryButton from "../../buttons/SmallPrimaryButton";

/**
 * @description A customizable text field component using Material-UI TextField.
 *
 * @param {Object} props - The properties to customize the DropdownIconField component.
 * @param {string} props.variant - The variant of the TextField component (e.g., "standard", "outlined", "filled").
 * @param {string} props.type - The type of the input element (e.g., "text", "password").
 * @param {string} props.value - The value of the input field.
 * @param {string} props.name - The name attribute of the input field.
 * @param {string} props.label - The label displayed above the input field.
 * @param {Function} props.setValue - A function to update the value of the input field.
 * @param {string} props.placeholder - The placeholder text inside the input field.
 * @param {string} props.helperText - The helper text displayed below the input field.
 * @param {boolean} props.required - Specifies if the input field is required.
 * @param {boolean} props.disabled - Specifies if the input field is disabled.
 * @param {boolean} props.fullWidth - Specifies if the input field should take full width.
 * @param {Function} props.onFocus - A function to be executed when the input field gains focus.
 * @param {Function} props.onBlur - A function to be executed when the input field loses focus.
 * @param {boolean} props.multiline - Specifies if the input field is multiline.
 * @param {string} props.autoComplete - Specifies autocomplete behavior for the input field.
 * @param {boolean} props.error - A boolean containing error state.
 * @param {string} props.errorMessage - A string containing error message.
 * @param {Function} props.setError - A function to update the error state.
 * @param {Function} props.validateMethod - A function to validate the input field's value.
 * @param {*} props.defaultValue - The default value for the dropdown
 * @param {Array} props.options - An array containing the options for the dropdown
 * @returns {JSX.Element} Returns a JSX element representing the DropdownIconField component.
 */
const DropdownIconField = ({ 
  variant = "standard", 
  type = "text", 
  value, 
  name, 
  label, 
  setValue = () => {},
  placeholder = "", 
  helperText = " ", 
  required = false,
  select=true,
  focused=false,
  disabled = false, 
  fullWidth = true,
  onFocus = () => {},
  onBlur = () => {}, 
  multiline = true, 
  autoComplete="off", 
  error = false,
  errorMessage = "",
  setError = () => {},
  validateMethod = () => {},
  defaultValue = "",
  options = [{ id: 0, icon: <FaICursor/>, title: "" }],
  setOptions = () => {},
  readOnly = false,
  forNew = false,
  customOption,
  setCustomOption
}) => {
  /**
   * Sets the focus on the input field.
   */
  const handleFocus = () => {
    onFocus();
    setError(false);
  };

  /**
   * Validates the input field's value and updates the error state if necessary.
   */
  const handleBlur = () => {
    onBlur();
    validateMethod();
  };

  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleOptionChange = (event) => {
    const val = event.target.value;
    setValue(val);

    if (val === options[options.length - 1].id) {
      setIsModalOpen(true);
    }
  };

  useEffect(() => {
    let opts = [...options];
    opts[opts.length - 1].title = customOption
    setOptions(opts)
  }, [customOption, setCustomOption])

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  return (
    <>
    <TextField 
      style={{ marginTop: 12 }}
      id={name}
      select={select}
      defaultValue={defaultValue}
      variant={variant} 
      value={value} 
      name={name} 
      type={type}  
      label={label} 
      focused={focused}
      required={required} 
      helperText={error ? errorMessage : helperText}
      placeholder={placeholder} 
      fullWidth={fullWidth}
      disabled={disabled}
      autoComplete={autoComplete}
      multiline={multiline}
      InputProps={{
        readOnly: readOnly,
      }}
      onFocus={handleFocus}
      onBlur={handleBlur}
      onChange={handleOptionChange}
      error={error}
    > { select ? 
      options.map((option, index) => (
        <MenuItem key={option.id} value={option.id} onClick={() => {
            if (option.id === options[options.length - 1].id) {
                setIsModalOpen(true);
              }
        }}>
          <div className="d-flex">
            {React.cloneElement(option.icon, { size: 20, style: { marginRight: 10 }, color: (index == options.length - 1 && forNew) ? '#561AD9' : "black" })}
            {option.title}
          </div>
        </MenuItem>
      ))
      : "" }
    </TextField>
    <Dialog open={isModalOpen} onClose={handleCloseModal}>
        <DialogTitle>Ingrese el rubro de empresa: </DialogTitle>
        <DialogContent>
          <FieldText
            label="Rubro de empresa"
            variant="outlined"
            fullWidth
            value={customOption}
            setValue={setCustomOption}
          />
          <div className="mt-2"></div>
          <div className="d-flex">
            <SmallPrimaryButton onClick={() => {
                setIsModalOpen(false);
                let opts = [...options];
                opts[opts.length - 1].title = customOption
                setOptions(opts)
            }}>Guardar</SmallPrimaryButton>
            <div className="ml-2">
                <SmallPrimaryButton variant="outlined" onClick={handleCloseModal}>Cancelar</SmallPrimaryButton>
            </div>
          </div>
        </DialogContent>
      </Dialog>
      </>
  );
};

export default DropdownIconField;
