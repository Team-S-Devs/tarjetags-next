import React, { useEffect, useState } from "react";
import BoldTitleWithBackButton from "../src/components/texts/BoldTitleWithBackButton";
import GreySubtitle from "../src/components/texts/GreySubtitle";
import FieldText from "../src/components/form/fields/FieldText";
import BigPrimaryButton from "../src/components/buttons/BigPrimaryButton";
import { onAuthStateChanged, sendPasswordResetEmail } from "firebase/auth";
import { auth } from "../src/utils/firebase-config";
import useWindowSize from "../src/hooks/useWindowsSize";
import Header from "../src/sections/Header";
import { SITE_NAME } from "../src/utils/constants";
import { useRouter } from "next/router";
import Splash from ".";
import Head from "next/head";

const RestorePassword = () => {
  const [user, setUser] = useState(null);
  const [loadingGetting, setLoadingGetting] = useState(false);
  const router = useRouter();

  useEffect(() => {
    setLoadingGetting(true);
    onAuthStateChanged(auth, (fireBaseUser) => {
      if (fireBaseUser) {
        setUser(fireBaseUser);
        setLoadingGetting(false);
      } else {
        router.push("/login");
        setUser(null);
      }
    });

    const unsubscribe = onAuthStateChanged(auth, (fireBaseUser) => {
      if (fireBaseUser) {
        setUser(fireBaseUser);
      } else {
        router.push("/login");
        setUser(null);
      }
    });

    return () => unsubscribe();
  }, []);

  const [emailValue, setEmailValue] = useState("");
  const [emailError, setEmailError] = useState(false);
  const [isEmailSent, setEmailSent] = useState(false);
  const [emailErrorMessage, setEmailErrorMessage] = useState(
    "Introduce un correo electrónico válido"
  );

  const validateEmail = () => {
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    setEmailError(!emailPattern.test(emailValue.trim()));
    return emailPattern.test(emailValue.trim());
  };

  const [restoreLoader, setRestoreLoader] = useState(false);

  const sendEmailRequest = async (e) => {
    e.preventDefault;

    setRestoreLoader(true);

    validateEmail();
    if (!validateEmail()) {
      setRestoreLoader(false);
      return;
    }

    try {
      await sendPasswordResetEmail(auth, emailValue);
      setEmailSent(true);
    } catch (error) {
      alert("No se pudo enviar el email, intenta de nuevo")
    }

    setRestoreLoader(false);
  };

  const { width } = useWindowSize();

  if (loadingGetting) {
    return <Splash loggedNavigateTo="/restorePassword" />;
  }

  return (
    <div className="profile-background container">
      <Head>
        <title>{`Recuperar contraseña - ${SITE_NAME}`}</title>
        <meta
          name="description"
          content="Crea tarjetas de presentación irresistibles que te abran puertas y
            te conecten con oportunidades ilimitadas."
        />
      </Head>
      {user && <Header />}
      <div className="prof-2-cont">
        <BoldTitleWithBackButton
          variant={width < 400 ? "h6" : "h3"}
          style={{ marginTop: "1rem" }}
        >
          Restablecer contraseña
        </BoldTitleWithBackButton>
        <br />
        <div className="container">
          <GreySubtitle
            variant={width < 400 ? "h7" : "h6"}
            textAlign={"center"}
            paddingHorizontal={width < 400 ? 0 : 40}
          >
            Introduce el email con el que te registraste y se te enviará un
            enlace a tu correo electrónico para cambiar tu contraseña, entra al
            link para restablecer la contraseña y vuelve a iniciar sesión
          </GreySubtitle>
        </div>

        <div className="mt-4 mb-3">
          <FieldText
            label="Correo electrónico"
            value={emailValue}
            setValue={setEmailValue}
            variant="outlined"
            placeholder="Ej: nombre@ejemplo.com"
            fullWidth={false}
            required
            error={emailError}
            setError={setEmailError}
            errorMessage={emailErrorMessage}
            validateMethod={validateEmail}
            styleField={{ maxWidth: "100vw" }}
          />
        </div>
        {isEmailSent && (
          <div style={{ fontWeight: "550" }}>
            Verifique su Correo electrónico
          </div>
        )}
        <div className="mt-4">
          <BigPrimaryButton
            type="button"
            onClick={sendEmailRequest}
            loading={restoreLoader}
            children={"Mandar Correo"}
            style={{ maxWidth: "100vw" }}
          />
        </div>
      </div>
    </div>
  );
};

export default RestorePassword;
