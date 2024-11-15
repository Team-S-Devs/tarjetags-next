import React from "react";
import { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Box } from "@mui/system";
import FieldText from "../src/components/form/fields/FieldText";
import { auth } from "../src/utils/firebase-config";
import { signInWithEmailAndPassword, onAuthStateChanged } from "firebase/auth";
import image3 from "../src/assets/images/login.jpg";
import GreySubtitleWithLink from "../src/components/texts/GreySubtitleWithLink";
import BigPrimaryButton from "../src/components/buttons/BigPrimaryButton";
import { Typography } from "@mui/material";
import PasswordField from "../src/components/form/fields/PasswordField";
import "../src/assets/styles/login.css";
import { SITE_NAME } from "../src/utils/constants";
import BoldTitleWithoutButton from "../src/components/texts/BoldTitleWIthoutButton";
import { useRouter } from "next/router";
import Link from "next/link";
import Head from "next/head";
import Image from "next/image";

const LogIn = () => {
  const router = useRouter();

  useEffect(() => {
    const handleAuthStateChange = () => {
      onAuthStateChanged(auth, (user) => {
        if (user) {
          router.push("/");
        }
      });
    };

    handleAuthStateChange();
  }, []);

  /**
   * State to manage the email value in the sign up
   * @type {string}
   */
  const [emailValue, setEmailValue] = useState("");
  const [emailError, setEmailError] = useState(false);
  const [emailErrorMessage, setEmailErrorMessage] = useState(
    "Introduce un email valido porfavor"
  );
  const [disabledEmail, setDisabledEmail] = useState(false);

  const validateEmail = () => {
    // Regular expression pattern for validating email addresses
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    setEmailError(!emailPattern.test(emailValue));
  };

  /**
   * State to manage the password value in the log in
   * @type {string}
   */
  const [passwordValue, setPasswordValue] = useState("");
  const [passwordError, setPasswordError] = useState(false);
  const [passwordErrorMessage, setPasswordErrorMessage] = useState(
    "Contraseña invalida"
  );
  const [disabledPassword, setDisabledPassword] = useState(false);

  const validatePassword = () => {
    // Regular expression pattern for validating password addresses
  };

  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const change = (e) => {
    e.preventDefault();
    setErrorMessage("");
  };

  const submit = (e) => {
    setLoading(true);
    e.preventDefault();
    const email = e.target.email.value;
    const password = e.target.password.value;

    signInWithEmailAndPassword(auth, email, password)
      .then(async () => {
        router.push("/");
        setLoading(false);
      })

      .catch((error) => {
        const errorCode = error.code;
        switch (errorCode) {
          case "auth/invalid-email":
            setEmailErrorMessage("Introduce un email válido porfavor");
            setEmailError(true);
            break;
          case "auth/user-not-found":
            setEmailErrorMessage(
              "No existe un usuario con ese email. Por favor Regístrate"
            );
            setEmailError(true);
            break;
          case "auth/invalid-password":
            setPasswordErrorMessage("Tu contraseña es incorrecta");
            setPasswordError(true);
            break;
          case "auth/invalid-credential":
            setErrorMessage(
              "Credenciales inválidos, introduce un email y contraseña válidos"
            );
            break;

          default:
            setErrorMessage(error.message);
        }
        setLoading(false);
      });
  };

  return (
    <div className="general-background">
      <Head>
        <title>{`Inicia sesión - ${SITE_NAME}`}</title>
        <meta
          name="description"
          content="Crea tarjetas de presentación irresistibles que te abran puertas y
            te conecten con oportunidades ilimitadas."
        />
      </Head>
      <div className="d-flex justify-content-center flex-column login-container ">
        <BoldTitleWithoutButton children="Inicio de Sesión" />
        <GreySubtitleWithLink
          linkSize={20}
          subtitleText="¿Aún no tienes una cuenta?"
          linkText="Regístrate"
          to={"/sign-up"}
        />

        <div className="login-secondary-container">
          <form
            id="logForm"
            className="form-login"
            onSubmit={submit}
            onChange={change}
          >
            <Box className="field-container">
              <FieldText
                variant="outlined"
                value={emailValue}
                setValue={setEmailValue}
                name={"email"}
                label={"Email"}
                placeholder="nombre@ejemplo.com"
                error={emailError}
                setError={setEmailError}
                errorMessage={emailErrorMessage}
                disabled={disabledEmail}
                fullWidth={true}
                required={true}
                validateMethod={validateEmail}
              />
            </Box>

            <Box className="field-container">
              <PasswordField
                variant="outlined"
                value={passwordValue}
                name="password"
                setValue={setPasswordValue}
                label={"Contraseña"}
                placeholder=""
                error={passwordError}
                setError={setPasswordError}
                errorMessage={passwordErrorMessage}
                disabled={disabledPassword}
                fullWidth={false}
                required={true}
                validateMethod={validatePassword}
              />
            </Box>

            <div className="link-login">
              <Link
                style={{ textDecorationColor: "var(--prim-purple)" }}
                href="/restorePassword"
              >
                <Typography
                  className="general-link"
                  style={{ fontSize: 17 }}
                  color={"primary"}
                >
                  ¿Ha olvidado su contraseña?
                </Typography>
              </Link>
            </div>
            {errorMessage.length > 0 && (
              <div className="error">
                <p>{errorMessage}</p>
              </div>
            )}

            <div
              className="button-log-container"
              style={{ pointerEvents: emailError ? "none" : "" }}
            >
              <BigPrimaryButton loading={loading} children={"Iniciar Sesión"} />
            </div>
          </form>
        </div>
      </div>

      <div className="image-log-container">
        <Image src={image3} alt="" />
      </div>
    </div>
  );
};

export default LogIn;
