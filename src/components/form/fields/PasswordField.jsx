import React, { useState } from "react";
import { TextField, IconButton, InputAdornment } from "@mui/material";
import { AiOutlineEyeInvisible, AiOutlineEye } from "react-icons/ai"

const PasswordField = ({
  variant = "standard",
  value,
  name,
  label,
  setValue = () => {},
  placeholder = "",
  helperText = " ",
  required = false,
  disabled = false,
  fullWidth = true,
  onFocus = () => {},
  onBlur = () => {},
  error = false,
  errorMessage = "",
  setError = () => {},
  validateMethod = () => {},
}) => {
  const [showPassword, setShowPassword] = useState(false);

  const handleTogglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleFocus = () => {
    onFocus();
    setError(false);
  };

  const handleBlur = () => {
    onBlur();
    validateMethod();
  };

  return (
    <TextField
      style={{ marginTop: 12 }}
      id={name}
      variant={variant}
      value={value}
      name={name}
      type={showPassword ? "text" : "password"}
      label={label}
      required={required}
      helperText={error ? errorMessage : helperText}
      placeholder={placeholder}
      fullWidth={fullWidth}
      disabled={disabled}
      onFocus={handleFocus}
      onBlur={handleBlur}
      onChange={(event) => setValue(event.target.value)}
      error={error}
      InputProps={{
        endAdornment: (
          <InputAdornment position="end">
            <IconButton
              aria-label="toggle password visibility"
              onClick={handleTogglePasswordVisibility}
            >
              {showPassword ? <AiOutlineEye size={28} /> : <AiOutlineEyeInvisible size={28} />}
            </IconButton>
          </InputAdornment>
        ),
      }}
    />
  );
};

export default PasswordField;
