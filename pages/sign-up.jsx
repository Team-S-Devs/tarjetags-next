import React, { useEffect, useState } from "react";
import BoldTitleWithBackButton from "../src/components/texts/BoldTitleWithBackButton";
import GreySubtitleWithLink from "../src/components/texts/GreySubtitleWithLink";
import FieldText from "../src/components/form/fields/FieldText";
import PasswordField from "../src/components/form/fields/PasswordField";
import {
  LiaLaptopCodeSolid,
  LiaChalkboardTeacherSolid,
  LiaMoneyBillWaveSolid,
  LiaLeafSolid,
  LiaBroadcastTowerSolid,
  LiaHospitalSolid,
  LiaUmbrellaBeachSolid,
  LiaPlusSolid,
} from "react-icons/lia";
import { LuUtensilsCrossed } from "react-icons/lu";
import { AiOutlineShoppingCart } from "react-icons/ai";
import { BsPalette, BsBriefcase } from "react-icons/bs";
import { HiOutlineBuildingOffice } from "react-icons/hi2";
import DropdownIconField from "../src/components/form/fields/DropdownIconField";
import DropdownField from "../src/components/form/fields/DropdownField";
import BigPrimaryButton from "../src/components/buttons/BigPrimaryButton";
import useWindowSize from "../src/hooks/useWindowsSize";
import SignUpSVG from "../src/components/svg/SignUpSVG";
import "../src/assets/styles/sign-up.css";
import { signUpWithEmailAndPassword } from "../src/utils/sign-up-methods";
import { Container, Typography } from "@mui/material";
import Form from "../src/components/form/Form";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../src/utils/firebase-config";
import { Timestamp } from "firebase/firestore";
import { LICENSE_TYPES, SITE_NAME } from "../src/utils/constants";
import { useRouter } from "next/router";
import Head from "next/head";

/**
 * SignUp component provides a user registration form with optional company details.
 *
 * @component
 * @returns {JSX.Element} - Rendered SignUp component.
 */
const SignUp = () => {
  // State for user registration form
  const [fullname, setFullname] = useState("");
  const [fullnameError, setFullnameError] = useState(false);

  const [emailValue, setEmailValue] = useState("");
  const [emailError, setEmailError] = useState(false);
  const [emailErrorMessage, setEmailErrorMessage] = useState(
    "Introduce un correo electrónico válido"
  );

  const [phoneValue, setPhoneValue] = useState("");
  const [phoneError, setPhoneError] = useState(false);

  const [passwordValue, setPasswordValue] = useState("");
  const [passwordError, setPasswordError] = useState(false);
  const [passwordErrorMessage, setPasswordErrorMessage] = useState(
    "Introduce una contraseña de al menos 6 caracteres"
  );

  const [confirmPasswordValue, setConfirmPasswordValue] = useState("");
  const [confirmPasswordError, setConfirmPasswordError] = useState(false);

  const validateEmail = () => {
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    setEmailError(!emailPattern.test(emailValue.trim()));
    return emailPattern.test(emailValue.trim());
  };

  const validatePhone = () => {
    const phonePattern =
      /^(?:\+\d{1,3})?\s?\(?(\d{1,})\)?[-.\s]?(\d{1,})[-.\s]?(\d{1,})$/;
    setPhoneError(!phonePattern.test(phoneValue.trim()));
    return phonePattern.test(phoneValue.trim());
  };

  const validatePassword = () => {
    setPasswordError(passwordValue.length < 6);
    return passwordValue.length >= 6;
  };

  const validateConfirmPassword = () => {
    setConfirmPasswordError(passwordValue !== confirmPasswordValue);
    return passwordValue === confirmPasswordValue;
  };

  // State for optional company details
  const [companyValue, setCompanyValue] = useState("");
  const [companySectorValue, setCompanySectorValue] = useState("");
  const [customOption, setCustomOption] = useState("Otro");

  const [companiesSector, setCompaniesSectors] = useState([
    { id: 0, icon: <LuUtensilsCrossed />, title: "Alimentación y Bebidas" },
    { id: 1, icon: <BsPalette />, title: "Arte y Entretenimiento" },
    { id: 2, icon: <AiOutlineShoppingCart />, title: "Comercio Electrónico" },
    {
      id: 3,
      icon: <HiOutlineBuildingOffice />,
      title: "Construcción y Arquitectura",
    },
    { id: 4, icon: <BsBriefcase />, title: "Consultoría Empresarial" },
    {
      id: 5,
      icon: <LiaChalkboardTeacherSolid />,
      title: "Educación y Enseñanza",
    },
    { id: 6, icon: <LiaMoneyBillWaveSolid />, title: "Finanzas y Banca" },
    {
      id: 7,
      icon: <LiaLeafSolid />,
      title: "Medio Ambiente y Energías Renovables",
    },
    {
      id: 8,
      icon: <LiaBroadcastTowerSolid />,
      title: "Medios y Comunicaciones",
    },
    { id: 9, icon: <LiaHospitalSolid />, title: "Salud y Cuidado Médico" },
    {
      id: 10,
      icon: <LiaLaptopCodeSolid />,
      title: "Tecnología de la Información (IT)",
    },
    {
      id: 11,
      icon: <LiaUmbrellaBeachSolid />,
      title: "Turismo y Hospitalidad",
    },
    { id: 12, icon: <LiaPlusSolid />, title: "Otro" },
  ]);

  const [departmentValue, setDepartmentValue] = useState("");
  const departmentsOptions = [
    "La Paz",
    "Cochabamba",
    "Santa Cruz",
    "Beni",
    "Chuquisaca",
    "Oruro",
    "Pando",
    "Potosí",
    "Tarija",
  ];

  const [discountCodeValue, setDiscountCodeValue] = useState("");
  const [jobValue, setJobValue] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  const router = useRouter();

  // Handle sign-up button click
  const handleSignUp = async (e) => {
    e.preventDefault();
    // Validate form fields
    setFullnameError(fullname.trim().length < 4);
    validateEmail();
    validatePhone();
    validatePassword();
    setPasswordError(passwordValue.length < 6);

    // If any error, return
    if (
      !validateEmail() ||
      !validatePhone() ||
      !validatePassword() ||
      !validateConfirmPassword() ||
      discountCodeValue == "" ||
      fullname.trim().length < 4
    ) {
      return;
    }

    try {
      const today = new Date();
      // Add 3 months to today's date
      const threeMonthsAhead = new Date(
        today.getFullYear(),
        today.getMonth() + 3,
        today.getDate()
      );

      // Create user data in Firestore
      const userData = {
        fullname,
        email: emailValue.toLocaleLowerCase(),
        phone: phoneValue,
        job: jobValue,
        company: companyValue,
        companySector: companiesSector.filter(
          (c) => c.id === companySectorValue
        )[0]?.title
          ? companiesSector.filter((c) => c.id === companySectorValue)[0].title
          : "",
        department: departmentValue,
        discountCode: discountCodeValue,
        createdAt: Timestamp.now(),
        licenseType: LICENSE_TYPES.FREE,
        limitDate: Timestamp.fromDate(threeMonthsAhead),
      };
      setLoading(true);

      // Perform Firebase sign-up
      const userCredential = await signUpWithEmailAndPassword(
        emailValue,
        passwordValue,
        userData
      );
      router.push("/dashboard");
      setLoading(false);
    } catch (error) {
      setLoading(false);
      if (error.code === "auth/email-already-in-use") {
        setEmailError(true);
        setEmailErrorMessage(
          "Ya existe una cuenta registrada con este email, por favor inicia sesión o introduce un email diferente"
        );
      } else setError(true);
    }
  };

  const generateDiscountCode = (num) => {
    const characters =
      "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    const charactersLength = characters.length;
    let result = "";
    while (result.length < num) {
      let ch = characters.charAt(Math.floor(Math.random() * charactersLength));
      result += ch;
    }
    setDiscountCodeValue(result);
  };

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) router.push("/dashboard");
      generateDiscountCode(10);
    });
  }, []);

  return (
    <Container>
      <Head>
        <title>{`Regístrate - ${SITE_NAME}`}</title>
        <meta
          name="description"
          content="Crea tarjetas de presentación irresistibles que te abran puertas y
            te conecten con oportunidades ilimitadas."
        />
      </Head>
      <div
        className="my-5 my-md-0 d-flex flex-column justify-content-center"
        style={{ minHeight: "100vh" }}
      >
        <BoldTitleWithBackButton>Registro</BoldTitleWithBackButton>
        <div className="mt-2"></div>
        <GreySubtitleWithLink
          subtitleText="&nbsp;¿Ya tienes una cuenta?"
          linkText="Inicia Sesión"
          to={"/login"}
        />
        <div className="mt-2"></div>
        <Form onFocus={() => setError(false)} submit={handleSignUp}>
          <div className="row">
            <div className="row col-lg-8 col-md-12 fixed-container-sign-up">
              <div className="col-md-6 col-lg-6 col-sm-12 fixed-container-sign-up">
                <div className="mt-3"></div>
                <FieldText
                  label="Nombre completo"
                  value={fullname}
                  setValue={setFullname}
                  variant="outlined"
                  placeholder="Ej: Andŕes Pérez Ríos"
                  fullWidth
                  required
                  validateMethod={() =>
                    setFullnameError(fullname.trim().length < 4)
                  }
                  error={fullnameError}
                  setError={setFullnameError}
                  errorMessage="Introduce un nombre de al menos 4 letras."
                />

                <div className="mt-md-3 mt-sm-0"></div>
                <FieldText
                  label="Correo electrónico"
                  value={emailValue}
                  setValue={setEmailValue}
                  variant="outlined"
                  placeholder="Ej: nombre@ejemplo.com"
                  fullWidth
                  required
                  error={emailError}
                  setError={setEmailError}
                  errorMessage={emailErrorMessage}
                  validateMethod={validateEmail}
                />

                <div className="mt-md-3 mt-sm-0"></div>
                <FieldText
                  label="Teléfono celular"
                  value={phoneValue}
                  setValue={setPhoneValue}
                  variant="outlined"
                  placeholder="Ej: 76543218"
                  fullWidth
                  required
                  error={phoneError}
                  setError={setPhoneError}
                  errorMessage="Introduce un número de celular válido"
                  validateMethod={validatePhone}
                  maxLength={16}
                />

                <div className="mt-md-3 mt-sm-0"></div>
                <PasswordField
                  label="Contraseña"
                  value={passwordValue}
                  setValue={setPasswordValue}
                  variant="outlined"
                  placeholder="Introduce una contraseña"
                  fullWidth
                  required
                  error={passwordError}
                  setError={setPasswordError}
                  errorMessage={passwordErrorMessage}
                  validateMethod={validatePassword}
                />

                <div className="mt-md-3 mt-sm-0"></div>
                <PasswordField
                  label="Confirmar contraseña:"
                  value={confirmPasswordValue}
                  setValue={setConfirmPasswordValue}
                  variant="outlined"
                  placeholder="Vuelve a introducir tu contraseña"
                  fullWidth
                  required
                  error={confirmPasswordError}
                  setError={setConfirmPasswordError}
                  errorMessage={"Las contraseñas no coinciden"}
                  validateMethod={validateConfirmPassword}
                />
              </div>

              {/* <!-- Segunda Columna --> */}
              <div className="col-md-6 col-lg-6 fixed-container-sign-up">
                <div className="mt-md-3 mt-sm-0"></div>
                <FieldText
                  label="Cargo (Opcional)"
                  value={jobValue}
                  setValue={setJobValue}
                  variant="outlined"
                  placeholder="Ej: Gerente General"
                  fullWidth
                />

                <div className="mt-md-3 mt-sm-0"></div>
                <FieldText
                  label="Empresa (Opcional)"
                  value={companyValue}
                  setValue={setCompanyValue}
                  variant="outlined"
                  placeholder="Ej: Epic Games"
                  fullWidth
                />

                <div className="mt-md-3 mt-sm-0"></div>
                <DropdownIconField
                  options={companiesSector}
                  setOptions={setCompaniesSectors}
                  variant="outlined"
                  label="Rubro de empresa (Opcional)"
                  placeholder="Ej: Alimentación y Bebidas"
                  forNew
                  customOption={customOption}
                  setCustomOption={setCustomOption}
                  value={companySectorValue}
                  setValue={setCompanySectorValue}
                />

                <div className="mt-md-3 mt-sm-0"></div>
                <DropdownField
                  variant="outlined"
                  options={departmentsOptions}
                  value={departmentValue}
                  setValue={setDepartmentValue}
                  label="Departamento (Opcional)"
                />

                {/* <div className="mt-md-3 mt-sm-0"></div>
                <FieldText
                  label="Código de descuento (Opcional)"
                  value={discountCodeValue}
                  setValue={setDiscountCodeValue}
                  variant="outlined"
                  placeholder="Ej: swd789"
                  fullWidth
                /> */}
              </div>

              <div className="mt-4"></div>
              <div className="d-flex flex-column align-items-center justify-content-center fixed-container-sign-up">
                {error && (
                  <Typography marginBottom={2} color="error">
                    Hubo un problema, por favor inténtelo de nuevo.
                  </Typography>
                )}
                <BigPrimaryButton
                  loading={loading}
                  onClick={handleSignUp}
                  fullWidth={useWindowSize().width < 769}
                >
                  Registrarse
                </BigPrimaryButton>
              </div>
            </div>

            {/* <!-- Tercera Columna (Solo en pantallas grandes) --> */}
            {useWindowSize().width > 1300 && (
              <div className="col-lg-4 d-none d-xl-block">
                <SignUpSVG />
              </div>
            )}
          </div>
        </Form>
      </div>
    </Container>
  );
};

export default SignUp;
