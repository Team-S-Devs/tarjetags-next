import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { storage } from "./firebase-config";
import { LICENSE_TYPES } from "./constants";
import { Timestamp } from "firebase/firestore";

/**
 * Truncates a string if its length is greater than 30 characters.
 * Replaces characters from the 30th character until three characters before a dot with '...'.
 *
 * @param {string} inputString - The input string to be truncated.
 * @returns {string} - The truncated string.
 */
export const truncateString = (inputString) => {
  const maxLength = 30;

  if (inputString.length > maxLength) {
    const indexOfDot = inputString.lastIndexOf(".");

    if (indexOfDot !== -1 && indexOfDot > maxLength + 3) {
      const truncatedString =
        inputString.substring(0, maxLength) +
        "..." +
        inputString.substring(indexOfDot - 3);
      return truncatedString;
    }
  }

  return inputString;
};

export const removeBlobPrefix = (url) => {
  if (url.startsWith("blob:")) {
    return url.slice(5);
  }
  return url;
};

export const getStringDateFromTimestamp = (timestamp) => {
  const date = new Date(timestamp.seconds * 1000 + timestamp.nanoseconds / 1e6);
  const options = { year: "numeric", month: "long", day: "numeric" };
  const formattedDate = date.toLocaleDateString("es-ES", options);
  return formattedDate;
};

export const getDateFromTimestamp = (timestamp) => {
  const date = new Date(timestamp.seconds * 1000 + timestamp.nanoseconds / 1e6);
  return date;
};

const allowedFormats = [
  "image/bmp",
  "image/tiff",
  "image/jpeg",
  "image/gif",
  "image/png",
  "image/svg",
  "image/webp",
];
const maxSize = 5 * 1024 * 1024;

/**
 * Validates the selected image file based on allowed formats and maximum size.
 * @param {File} file - The selected image file.
 * @returns {boolean} - True if the file is valid, false otherwise.
 */
export const validateImage = (file) => {
  if (!file) return true;
  if (!allowedFormats.includes(file.type)) {
    alert(
      "Formato inválido de imagen, los formatos válidos son: BMP, TIFF, JPEG, GIF, PNG, SVG y WEBP."
    );
    return false;
  } else if (file.size > maxSize) {
    alert("La imagen no puede exceder de los 5MB.");
    return false;
  }
  return true;
};

export const handleUploadImage = async (
  file,
  elementsInfo,
  cardId,
  index,
  folder
) => {
  try {
    const storageRef = ref(
      storage,
      `${elementsInfo.userId}/${cardId}/${folder}/${index}`
    );
    // Upload the file to Firebase Cloud Storage
    await uploadBytes(storageRef, file);

    // Get the URL of the uploaded image
    const url = await getDownloadURL(storageRef);

    return {
      success: true,
      url,
    };
  } catch (error) {
    return {
      success: false,
      url: "",
    };
  }
};

export const handleUploadStoreImage = async (
  file,
  index,
  folder
) => {
  try {
    const storageRef = ref(
      storage,
      `admins/${folder}/${index}`
    );
    // Upload the file to Firebase Cloud Storage
    await uploadBytes(storageRef, file);

    // Get the URL of the uploaded image
    const url = await getDownloadURL(storageRef);

    return {
      success: true,
      url,
    };
  } catch (error) {
    return {
      success: false,
      url: "",
    };
  }
};

// Function to check if a date is less than 3 months in the future
export function isLessThanThreeMonthsInFuture(date) {
  // Get today's date
  const today = new Date();

  // Calculate the date 3 months from today
  const threeMonthsFromNow = new Date(
    today.getFullYear(),
    today.getMonth() + 3,
    today.getDate()
  );

  // Compare the given date with the date 3 months from now
  return date < threeMonthsFromNow;
}

// Function to check if a date is less than 1 month in the future
export function isLessThanOneMonthInFuture(date) {
  // Get today's date
  const today = new Date();

  // Calculate the date 3 months from today
  const threeMonthsFromNow = new Date(
    today.getFullYear(),
    today.getMonth() + 1,
    today.getDate()
  );

  // Compare the given date with the date 3 months from now
  return date < threeMonthsFromNow;
}

// Function to get the remaining date as a string
export function getRemainingTimeAsString(date) {
  // Get today's date
  const today = new Date();

  // Calculate the difference in milliseconds
  const difference = date - today;

  // Calculate the difference in days and months
  const daysDifference = Math.ceil(difference / (1000 * 3600 * 24));
  const monthsDifference = Math.floor(daysDifference / 30);

  // If less than a month, return the difference in days
  if (monthsDifference < 1) {
    return `Quedan ${daysDifference} día${
      daysDifference !== 1 ? "s" : ""
    } restantes de validez de su licencia`;
  }

  // Otherwise, return the difference in months
  return `Quedan ${monthsDifference} mes${
    monthsDifference !== 1 ? "es" : ""
  } restantes de validez de su licencia`;
}

export const verificarLicencia = (licenseType, limitDate) => {
  const timestampActual = Timestamp.now();

  const fechaLimite = limitDate.toDate();

  // Caso 1: Si el tipo de licencia es "Gratis" y la fecha límite es menor que la fecha actual
  if (licenseType === LICENSE_TYPES.FREE && limitDate < timestampActual) {
      return false;
  } else if (licenseType === LICENSE_TYPES.FREE && limitDate >= timestampActual) {
    return true;
}
  
  // Caso 2: Si el tipo de licencia no es "Gratis" y la fecha actual es menor que la fecha límite + 3 meses
  if (licenseType !== LICENSE_TYPES.FREE) {
      // Añadir 3 meses a la fecha límite
      fechaLimite.setMonth(fechaLimite.getMonth() + 3);
      const tresMesesDespues = Timestamp.fromDate(fechaLimite);
      
      // Comprobar si la fecha actual es menor que tresMesesDespues
      if (timestampActual < tresMesesDespues) {
          return true;
      } else {
          return false;
      }
  }

  // Otros casos: Si no cumple ninguno de los criterios anteriores, devolver false
  return false;
}
