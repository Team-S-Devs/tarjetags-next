import { Box, Button, Grid, Modal, Typography } from '@mui/material';
import React, { useState } from 'react';
import FieldText from '../form/fields/FieldText';
import PasswordField from '../form/fields/PasswordField';
import { EmailAuthProvider, reauthenticateWithCredential, verifyBeforeUpdateEmail } from 'firebase/auth';
import { auth } from '../../utils/firebase-config';


/**
 * React component for editing the stock of a product using a modal.
 *
 * @component
 * @param {Object} props - The component props.
 * @param {boolean} props.open - Whether the modal is open.
 * @param {function} props.handleClose - Function to close the modal.
 * @param {Object} props.product - The product to edit.
 * @returns {JSX.Element} The JSX representation of the component.
 */
const LogModal = ({ open, handleClose, user={}, newEmail, setEmailValue}) => {
  const [loading, setLoading] = useState(false);

    const style = {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        bgcolor: 'background.paper',
        width: '90%', // Adjust the width based on your preference
        maxWidth: 400, 
        boxShadow: 24,
        borderRadius: '15px',
        p: 4,
      };

  const [errorMsg, setErrorMesage] = useState("");
  

  /**
   * Handles changes in form fields.
   *
   * @param {Object} e - The event object.
   */
  const handleChange = (e) => {
    const inputValue = e.target.value.toString().slice(0, 10)
    const regex = /^[0-9\b]+$/;

    if (inputValue === "") {
      setError(true)
      setErrorMesage('Invalid Data')
      setValue(inputValue)
    }

      else if (regex.test(inputValue) && !value.toString().includes('-')) {
        setError(false)
        setErrorMesage('');
        setValue(inputValue);
      } else {
        setError(true)
        setErrorMesage("Invalid Data")
      }
  };

  
  /**
 * Handles the form submission for updating the stock of the product.
 *
 * @async
 * @param {Event} e - The event object.
 * @returns {Promise<void>} A Promise that resolves when the submission process is complete.
 */
  const handleSumbit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const credential = EmailAuthProvider.credential(
      emailValue,
      passwordValue
  );


  const userAuth = auth.currentUser;

  reauthenticateWithCredential(userAuth, credential)
  .then(() => {
      verifyBeforeUpdateEmail(userAuth, newEmail).then(() => {
      setEmailValue(newEmail);
      setLoading(false);
      handleClose();
    })
  }).catch((error) => {
    const errorCode = error.code;
        switch (errorCode) {
            case 'auth/invalid-email':
            setEmailErrorMessage("Introduce un email válido porfavor");
            setEmailError(true)
            break;
            case 'auth/user-not-found':
            setEmailErrorMessage("No existe un usuario con ese email. Por favor Regístrate");
            setEmailError(true)
            break;
            case 'auth/invalid-password':
            setPasswordErrorMessage("Tu contraseña es incorrecta")
            setPasswordError(true)
            break;
            case 'auth/invalid-login-credentials':
                setErrorMesage("Credenciales inválidos, introduce los datos correctamente")
                break;
    
            default:
            setErrorMesage(error.message);
        }
        setLoading(false)
  })
}

  const [emailValue, setEmailValueModal] = useState(user?.email);
  const [emailError, setEmailError] = useState(false);
  const [emailErrorMessage, setEmailErrorMessage] = useState("Introduce un email valido porfavor");
  const [disabledEmail, setDisabledEmail] = useState(false)

  const validateEmail = () => {
    // Regular expression pattern for validating email addresses
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    setEmailError(!emailPattern.test(emailValue));
}

  const [passwordValue, setPasswordValue] = useState("");
  const [passwordError, setPasswordError] = useState(false);
  const [passwordErrorMessage, setPasswordErrorMessage] = useState("Contraseña invalida");
  const [disabledPassword, setDisabledPassword] = useState(false)

  const validatePassword = () => {
    setPasswordError(passwordValue.length < 6);
    return passwordValue.length >= 6;
  }


    return (
        <Modal
        open={open}
        onClose={handleClose}
        sx={{borderRadius:'25px'}}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" color='primary' variant="h5" sx={{fontWeight:'900', textAlign:'center'}} component="h2">
            Confirma que eres tu 
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2, mb:1, textAlign:'center' }}>
            Confirma tu contraseña para actualizar el nuevo correo electrónico 
          </Typography>
          <FieldText 
              variant='outlined'
              value={emailValue}
              setValue={setEmailValueModal}
              readOnly
              name={"email"}
              label={"Correo Electrónico"} 
              placeholder='nombre@ejemplo.com' 
              error={emailError}
              setError={setEmailError}
              errorMessage={emailErrorMessage}
              disabled={disabledEmail}
              fullWidth={true}
              required={true}
              validateMethod={validateEmail}
            />
             <PasswordField
              variant='outlined'
              value={passwordValue}
              name='password'
              setValue={setPasswordValue}
              label={"Contraseña"} 
              placeholder='' 
              error={passwordError}
              setError={setPasswordError}
              errorMessage={passwordErrorMessage}
              disabled={disabledPassword}
              fullWidth={false}
              required={true}
              validateMethod={validatePassword}
          /> 
          { errorMsg.length > 0 && (
              <div className='error'>
              <p>{errorMsg}</p>
              </div>
             )
          }
       <Grid 
              item 
              xs={12} md={12} 
              display={"flex"} alignItems={"center"} justifyContent={"center"} 
              marginTop={7}
            >
                <Button 
                  style={{ fontSize: 15, marginRight:14, paddingLeft: 20, paddingRight: 20 }} 
                  type="submit" 
                  variant="contained" 
                  color="primary" 
                  disabled={loading || passwordError}
                  onClick={handleSumbit}
                >
                    {loading ? "Saving..." : "Save"}
                </Button>

                { loading && <span className="small-loader"></span> }

                <Button 
                  style={{ fontSize: 15, paddingLeft: 20, paddingRight: 20 }} 
                  variant="outlined" 
                  color="primary" 
                  disabled={loading}
                  onClick={handleClose}
                >
                  Cancel
                </Button>
            </Grid>
        </Box>
     </Modal>
    );
};

export default LogModal;