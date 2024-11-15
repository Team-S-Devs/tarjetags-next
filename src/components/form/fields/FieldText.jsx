import { TextField } from "@mui/material";

/**
 * @description A customizable text field component using Material-UI TextField.
 *
 * @param {Object} props - The properties to customize the FieldText component.
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
 * @param {Number} props.maxLength - The max length of the input
 * @returns {JSX.Element} Returns a JSX element representing the FieldText component.
 */
const FieldText = ({ 
  variant = "standard", 
  type = "text", 
  value, 
  name, 
  label, 
  setValue = () => {},
  placeholder = "", 
  helperText = " ", 
  required = false, 
  focused=false,
  disabled = false, 
  fullWidth = true,
  onFocus = () => {},
  onBlur = () => {}, 
  multiline = true,
  readOnly = false, 
  autoComplete="off", 
  error = false,
  errorMessage = "",
  setError = () => {},
  validateMethod = () => {},
  style={},
  color = "primary",
  maxLength = 50,
  marginTop = 12,
  minRows = 1,
  styleField = {}
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

  const handleChange = (event) => {
    setValue(event.target.value.toString().slice(0, maxLength))
  }

  return (
    <TextField 
      style={{ marginTop, ...styleField }}
      id={name}
      variant={variant} 
      focused={focused}
      color={color}
      value={value} 
      name={name} 
      type={type}  
      label={label} 
      disabled={disabled}
      inputProps={{ readOnly: readOnly, maxLength, style: {style}}}
      required={required} 
      helperText={error ? errorMessage : helperText}
      placeholder={placeholder} 
      fullWidth={fullWidth}
      autoComplete={autoComplete}
      multiline={multiline}
      onFocus={handleFocus}
      onBlur={handleBlur}
      onChange={handleChange}
      error={error}
      minRows={minRows}
    />
  );
};

export default FieldText;
