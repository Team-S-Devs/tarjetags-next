import React, { useEffect, useState } from "react";
import { Box, Button, Modal, Typography } from "@mui/material";
import DropdownField from "../form/fields/DropdownField";
import { MobileDatePicker } from "@mui/x-date-pickers/MobileDatePicker";
import dayjs from "dayjs";
import { Timestamp, doc, updateDoc } from "firebase/firestore";
import { db } from "../../utils/firebase-config";
import { LICENSE_TYPES, licenseLimits } from "../../utils/constants";
import { useRouter } from "next/router";

const UserRow = ({
  userId = "",
  name = "",
  email = "",
  phone = 0,
  registerDate = {},
  limitDate = {},
  discountCode = "",
  licenseType = LICENSE_TYPES.FREE,
  city = "",
  company = "",
  companySector = "",
}) => {
  const [open, setOpen] = useState(false);
  const [licenseValue, setLicenseType] = useState(licenseType);
  const [isLicenseChange, setLicenceChange] = useState(false);
  const [editUser, setEditUser] = useState(false);
  const [selectedDate, setSelectedDate] = useState(dayjs("31/04/2024"));
  const [saveLoader, setSaveLoader] = useState(false);
  const licenseOptions = [
    LICENSE_TYPES.FREE,
    LICENSE_TYPES.STANDARD,
    LICENSE_TYPES.PREMIUM,
    LICENSE_TYPES.BRONZE,
    LICENSE_TYPES.SILVER,
    LICENSE_TYPES.GOLD,
  ];

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const router = useRouter();

  const setLicenseTypeBool = (data) => {
    setLicenseType(data);
    setLicenceChange(true);
  };

  const handleDateChange = (newDate) => {
    setSelectedDate(newDate);
  };

  const getModifiedDate = (date) => {
    if (date) {
      const fireBaseTime = new Date(
        date.seconds * 1000 + date.nanoseconds / 1000000
      );
      const formattedDate = dayjs(fireBaseTime).format("DD-MM-YYYY");
      return formattedDate;
    }
    return "";
  };

  const getGeneralDateFromat = (date) => {
    if (date) {
      const fireBaseTime = new Date(
        date.seconds * 1000 + date.nanoseconds / 1000000
      );
      setSelectedDate(dayjs(fireBaseTime));
    }
  };

  const handleEditOption = () => {
    setEditUser(!editUser);
    setLicenceChange(false);
    setLicenseType(licenseType);
  };

  const styleModal = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    bgcolor: "background.paper",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    border: "none",
    width: "90%",
    maxWidth: 500,
    boxShadow: 24,
    borderRadius: "15px",
    p: 4,
  };

  useEffect(() => {
    getGeneralDateFromat(limitDate);
  }, []);

  const updateLimitDate = (monthsToAdd) => {
    if (isLicenseChange) {
      const currentDate = dayjs();
      const newDate = currentDate.add(monthsToAdd, "month");
      setSelectedDate(newDate);
      return newDate;
    } else {
      return selectedDate;
    }
  };

  const saveChangesToFirestore = () => {
    setSaveLoader(true);
    const userRef = doc(db, "users", userId);

    const finalDate = updateLimitDate(licenseLimits[licenseValue].limitValue);

    const timestamp = finalDate.toDate();
    const timestampObject = Timestamp.fromDate(timestamp);

    const newData = {
      limitDate: timestampObject,
      licenseType: licenseValue,
    };

    updateDoc(userRef, newData)
      .then(() => {
        setSaveLoader(false);
        setEditUser(false);
        setLicenceChange(false);
      })
      .catch((error) => {
        alert("Error guardando los nuevos datos. Inténtalo de nuevo");
      });
  };

  return (
    <>
      <tr>
        <td onClick={handleOpen} scope="row">
          {name}
        </td>
        <td onClick={handleOpen}>{email}</td>
        <td onClick={handleOpen}>{getModifiedDate(registerDate)}</td>
        <td>
          {editUser ? (
            <MobileDatePicker
              inputFormat={{ day: "DD", month: "MM", year: "YYYY" }}
              value={selectedDate}
              onChange={handleDateChange}
              mask={"__/__/____"}
            />
          ) : (
            selectedDate.format("DD/MM/YYYY")
          )}
        </td>
        <td>
          {editUser ? (
            <DropdownField
              options={licenseOptions}
              value={licenseValue}
              focused={false}
              setValue={setLicenseTypeBool}
            />
          ) : (
            licenseValue
          )}
        </td>
        <td onClick={handleOpen}>{discountCode}</td>
        <td>
          <div className="optionsAdmin">
            <div onClick={editUser ? saveChangesToFirestore : handleEditOption}>
              {editUser ? "Guardar" : "Editar"}
              {saveLoader && (
                <span
                  className="spinner-border spinner-border-sm"
                  role="status"
                  aria-hidden="true"
                ></span>
              )}
            </div>
            {editUser && <div onClick={handleEditOption}>x</div>}
          </div>
        </td>
      </tr>
      <Modal
        readOnly
        disableAutoFocus
        open={open}
        onClose={handleClose}
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
        sx={{
          borderRadius: "25px",
          border: "none",
          display: "flex",
          justifyContent: "center",
          alignContent: "center",
        }}
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
            Información Personal
          </Typography>
          <div className="personal-info-style table-responsive">
            <table className="table table-active">
              <tbody>
                <tr>
                  <td>Nombre:</td>
                  <td>{name}</td>
                </tr>
                <tr>
                  <td>Email:</td>
                  <td>{email}</td>
                </tr>
                <tr>
                  <td>Teléfono:</td>
                  <td>{phone}</td>
                </tr>
                <tr>
                  <td>Ciudad:</td>
                  <td>{city}</td>
                </tr>
                <tr>
                  <td>Rubro:</td>
                  <td>{companySector}</td>
                </tr>
                <tr>
                  <td>Compañia:</td>
                  <td>{company}</td>
                </tr>
                <tr>
                  <td>Pagos:</td>
                  <td>
                    <button
                      className="history-pay-button"
                      onClick={() => router.push(`/payments/${userId}`)}
                    >
                      ver pagos
                    </button>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </Box>
      </Modal>
    </>
  );
};

export default UserRow;
