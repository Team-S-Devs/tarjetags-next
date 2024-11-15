import React, { useEffect, useState } from "react";
import FieldText from "../src/components/form/fields/FieldText";
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
import { IoInformationCircleOutline } from "react-icons/io5";
import { LuUtensilsCrossed } from "react-icons/lu";
import { AiOutlineShoppingCart } from "react-icons/ai";
import { BsPalette, BsBriefcase } from "react-icons/bs";
import { HiOutlineBuildingOffice } from "react-icons/hi2";
import DropdownIconField from "../src/components/form/fields/DropdownIconField";
import DropdownField from "../src/components/form/fields/DropdownField";
import useWindowSize from "../src/hooks/useWindowsSize";
import "../src/assets/styles/sign-up.css";
import { Box, Button, Modal, Typography } from "@mui/material";
import Form from "../src/components/form/Form";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { doc, onSnapshot, updateDoc } from "firebase/firestore";
import BoldTitle from "../src/components/texts/BoldTitle";
import SmallPrimaryButton from "../src/components/buttons/SmallPrimaryButton";
import Header from "../src/sections/Header";
import "../src/assets/styles/login.css";
import LogModal from "../src/components/profile/LogModal";
import { PHONE_NUMBER, SITE_NAME } from "../src/utils/constants";
import { FiTool } from "react-icons/fi";
import { useRouter } from "next/router";
import Splash from ".";
import { auth, db } from "../src/utils/firebase-config";
import Link from "next/link";
import Head from "next/head";

const Profile = () => {
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

  const [userData, setUserData] = useState(null);

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

  const [jobValue, setJobValue] = useState("");

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

  const [filteredCompany, setFilteredCompany] = useState([]);

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

  const [edit, setEdit] = useState(false);
  const [discountCodeValue, setDiscountCodeValue] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  const [logOutLoader, setlogOutLoader] = useState(false);
  const [saveLoader, setSaveLoader] = useState(false);

  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);

  const [infoOpen, setInfoOpen] = useState(false);
  const handleInfoClose = () => setInfoOpen(false);
  const handleInfoOpen = () => setInfoOpen(true);

  const handleClose = () => {
    cancelEdit();
    setSaveLoader(false);
    setEdit(false);
    setOpen(false);
  };

  const updateFields = () => {
    if (userData) {
      setUserData(userData);
      setFullname(userData.fullname);
      setEmailValue(userData?.email);
      setPhoneValue(userData.phone);
      setJobValue(userData.job);
      setCompanyValue(userData.company);
      setDepartmentValue(userData.department);
      setDiscountCodeValue(userData.discountCode);
      if (userData.companySector !== "") {
        let filtered = companiesSector.filter(
          (sector) => sector.title === userData.companySector
        );

        if (filtered.length < 1) {
          setCustomOption(userData.companySector);
          setCompanySectorValue(companiesSector.length - 1);
        } else {
          setFilteredCompany(filtered[0]);
          setCompanySectorValue(filtered[0].id);
        }
      }
    }
  };

  useEffect(() => {
    if (!user) {
      router.push("/login");
    }

    const unsubscribe = onSnapshot(
      doc(db, "users", user.uid),
      (snapshot) => {
        const userInfo = snapshot.data();
        setUserData(userInfo);
        setEmailValue(userInfo?.email);
        setFullname(userInfo.fullname);
        setPhoneValue(userInfo.phone);
        setJobValue(userInfo.job);
        setCompanyValue(userInfo.company);
        setDepartmentValue(userInfo.department);
        setDiscountCodeValue(userInfo.discountCode);

        if (userInfo.companySector !== "") {
          let filtered = companiesSector.filter(
            (sector) => sector.title === userInfo.companySector
          );

          if (filtered.length < 1) {
            setCustomOption(userInfo.companySector);
            setCompanySectorValue(companiesSector.length - 1);
          } else {
            setFilteredCompany(filtered[0]);
            setCompanySectorValue(filtered[0].id);
          }
        }
      },
      (error) => {
        setError(true);
      }
    );

    return () => unsubscribe();
  }, [user]);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((authUser) => {
      setUserData(authUser);
    });

    return () => unsubscribe();
  }, []);

  const updateUserData = async () => {
    try {
      const data = {
        fullname: fullname,
        job: jobValue,
        phone: phoneValue,
        company: companyValue,
        companySector: companiesSector.filter(
          (c) => c.id === companySectorValue
        )[0]?.title
          ? companiesSector.filter((c) => c.id === companySectorValue)[0].title
          : "",
        department: departmentValue,
        discountCode: discountCodeValue,
      };

      await updateDoc(doc(db, "users", user.uid), data);

      setSaveLoader(false);
      setEdit(false);
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

  // Handle sign-up button click
  const handleEditProfile = async (e) => {
    setSaveLoader(true);
    e.preventDefault();

    // Validate form fields
    setFullnameError(fullname.trim().length < 4);
    validateEmail();
    validatePhone();

    // If any error, return
    if (!validateEmail() || !validatePhone() || fullname.trim().length < 4) {
      return;
    }

    if (user?.email != emailValue) {
      handleOpen();
    }
    updateUserData();
  };

  const logOut = async () => {
    setlogOutLoader(true);
    await signOut(auth);
    setlogOutLoader(false);
  };

  const editProfile = () => {
    setEdit(true);
  };

  const cancelEdit = () => {
    setEdit(false);
    updateFields();
  };

  const styleModal = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    bgcolor: "background.paper",
    border: "none",
    width: "90%",
    maxWidth: 400,
    boxShadow: 24,
    borderRadius: "15px",
    p: 4,
  };

  const { width, height } = useWindowSize();

  const getEmailInfoModal = (
    <Modal
      readOnly
      open={infoOpen}
      onClose={handleInfoClose}
      sx={{ borderRadius: "25px", border: "none" }}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={styleModal}>
        <Typography
          id="modal-modal-title"
          color="primary"
          variant="h5"
          sx={{ fontWeight: "900", textAlign: "center" }}
          component="h2"
        >
          Información importante
        </Typography>
        <Typography
          id="modal-modal-description"
          sx={{ mt: 2, mb: 1, textAlign: "center" }}
        >
          Verifique su último correo electrónico para actualizarlo porfavor.
          (Haga click en el link del mensaje enviado a su correo electronico
          para verificarlo)
        </Typography>
      </Box>
    </Modal>
  );
  const isPartner = () => {
    if (userData != null) {
      switch (userData.licenseType) {
        case "Bronce":
          return true;
        case "Plata":
          return true;
        case "Oro":
          return true;
        default:
          return false;
      }
    } else {
      return false;
    }
  };

  if (loadingGetting) {
    return <Splash loggedNavigateTo="/profile" />;
  }

  return (
    <div className="profile-container">
      <Head>
        <title>{`Perfil - ${SITE_NAME}`}</title>
        <meta
          name="description"
          content="Crea tarjetas de presentación irresistibles que te abran puertas y
                        te conecten con oportunidades ilimitadas."
        />
      </Head>
      <Header />

      <div
        className="my-5 my-md-0 d-flex flex-column justify-content-center container cont-profile1"
        style={{ minHeight: "90vh" }}
      >
        <BoldTitle variant={width < 470 ? "h4" : "h3"} textAlign="center">
          Perfil De Usuario
        </BoldTitle>

        <div className="profile-cont-2">
          <Form onFocus={() => setError(false)} submit={handleEditProfile}>
            <div className="row">
              <div className="row col-lg-12 col-md-12 fixed-container-sign-up">
                <div className="col-md-6 col-lg-6 col-sm-12 fixed-container-sign-up">
                  <div className="mt-3"></div>
                  <FieldText
                    label="Nombre completo"
                    value={fullname}
                    setValue={setFullname}
                    readOnly={edit ? false : true}
                    focused={edit ? false : true}
                    placeholder="Ej: Andŕes Pérez Ríos"
                    fullWidth
                    required
                    validateMethod={() =>
                      setFullnameError(fullname.trim().length < 4)
                    }
                    error={fullnameError}
                    setError={setFullnameError}
                    errorMessage="Introduce un nombre de al menos 4 letras."
                    style={{
                      color: "inherit", // This keeps the text color the same
                      opacity: 1, // This keeps the text fully visible
                      cursor: "text", // This keeps the cursor style as text
                    }}
                  />

                  <div className="mt-md-3 mt-sm-0"></div>
                  <Box sx={{ display: "flex" }}>
                    <FieldText
                      label="Correo electrónico"
                      value={emailValue}
                      setValue={setEmailValue}
                      readOnly={edit ? false : true}
                      focused={edit ? false : true}
                      placeholder="Ej: nombre@ejemplo.com"
                      fullWidth
                      required
                      error={emailError}
                      setError={setEmailError}
                      errorMessage={emailErrorMessage}
                      validateMethod={validateEmail}
                    />
                    <IoInformationCircleOutline onClick={handleInfoOpen} />
                  </Box>
                  {getEmailInfoModal}
                  <LogModal
                    handleClose={handleClose}
                    open={open}
                    user={user}
                    newEmail={emailValue}
                    setEmailValue={setEmailValue}
                  />

                  <div className="mt-md-3 mt-sm-0"></div>
                  <FieldText
                    label="Teléfono celular"
                    value={phoneValue}
                    setValue={setPhoneValue}
                    readOnly={edit ? false : true}
                    focused={edit ? false : true}
                    placeholder="Ej: 76543218"
                    fullWidth
                    required
                    error={phoneError}
                    setError={setPhoneError}
                    errorMessage="Introduce un número de celular válido"
                    validateMethod={validatePhone}
                  />

                  {isPartner() && (
                    <>
                      <div className="mt-md-3 mt-sm-0"></div>
                      <FieldText
                        label="Código de descuento"
                        value={discountCodeValue}
                        setValue={setDiscountCodeValue}
                        focused={true}
                        readOnly={true}
                        placeholder="Ej: swd789"
                        fullWidth
                      />
                    </>
                  )}
                </div>

                {/* <!-- Segunda Columna --> */}
                <div
                  className="col-md-6 col-lg-6 fixed-container-sign-up"
                  style={{ paddingRight: 0 }}
                >
                  <div className="mt-md-3 mt-sm-0"></div>
                  <FieldText
                    label="Cargo (Opcional)"
                    value={jobValue}
                    setValue={setJobValue}
                    focused={edit ? false : true}
                    readOnly={edit ? false : true}
                    placeholder="Ej: Gerente General"
                    fullWidth
                  />

                  <div className="mt-md-3 mt-sm-0"></div>

                  <FieldText
                    label="Empresa (Opcional)"
                    value={companyValue}
                    setValue={setCompanyValue}
                    focused={edit ? false : true}
                    readOnly={edit ? false : true}
                    placeholder="Ej: Epic Games"
                    fullWidth
                  />

                  <div className="mt-md-3 mt-sm-0"></div>
                  <DropdownIconField
                    options={companiesSector}
                    setOptions={setCompaniesSectors}
                    label="Rubro de empresa (Opcional)"
                    readOnly={edit ? false : true}
                    focused={edit ? false : true}
                    select={edit}
                    placeholder="Ej: Alimentación y Bebidas"
                    forNew
                    customOption={customOption}
                    setCustomOption={setCustomOption}
                    defaultValue={
                      edit
                        ? undefined
                        : filteredCompany == []
                        ? customOption
                        : filteredCompany.title
                    }
                    value={edit ? companySectorValue : undefined}
                    setValue={setCompanySectorValue}
                  />

                  <div className="mt-md-3 mt-sm-0"></div>
                  <DropdownField
                    readOnly={edit ? false : true}
                    options={departmentsOptions}
                    select={edit}
                    defaultValue={edit ? undefined : departmentValue}
                    value={edit ? departmentValue : undefined}
                    focused={edit ? false : true}
                    setValue={setDepartmentValue}
                    label="Departamento (Opcional)"
                  />
                </div>
              </div>
            </div>
          </Form>

          <div className="mt-4"></div>
          <div
            className="d-flex flex-column align-items-center justify-content-center fixed-container-sign-up w100 buttons-container"
            style={{ width: "100%" }}
          >
            {error && (
              <Typography marginBottom={2} color="error">
                Hubo un problema, por favor inténtelo de nuevo.
              </Typography>
            )}
            <div
              className="main-buttons-container d-flex align-items-start justify-content-center w100"
              style={{ width: "100%" }}
            >
              <div className="d-flex">
                <SmallPrimaryButton
                  loading={saveLoader}
                  type="button"
                  onClick={edit ? handleEditProfile : editProfile}
                  fullWidth={useWindowSize().width < 769}
                >
                  {edit ? "Guardar" : "Editar"}
                </SmallPrimaryButton>
                <div style={{ width: 12 }}></div>
                <SmallPrimaryButton
                  variant="outlined"
                  disabled={loading}
                  display={edit ? "initial" : "none"}
                  type="button"
                  onClick={cancelEdit}
                  fullWidth={useWindowSize().width < 769}
                >
                  Cancelar
                </SmallPrimaryButton>
              </div>
              <div className="sign-out-button" style={{ flex: 10 }}></div>
              <div className="mr-3">
                <Link href="/restorePassword" style={{ textDecoration: "none" }}>
                  <SmallPrimaryButton variant="outlined" loading={logOutLoader}>
                    Cambiar Contraseña
                  </SmallPrimaryButton>
                </Link>
              </div>
              <SmallPrimaryButton
                color="error"
                variant="outlined"
                loading={logOutLoader}
                onClick={logOut}
              >
                Cerrar Sesión
              </SmallPrimaryButton>
            </div>
          </div>
        </div>

        <br />
        <br />
        <br />
        <div style={{ paddingLeft: 20 }}>
          <Button
            href={`https://wa.me/591${PHONE_NUMBER}`}
            variant="outlined"
            startIcon={<FiTool />}
            target="_blank"
          >
            Soporte de usuario
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Profile;
