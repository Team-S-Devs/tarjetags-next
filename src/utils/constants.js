export const GREY_RECTANGLE =
  "https://i.ibb.co/Np6gfbd/light-grey-background-institute-of-innovation-technology-and-light-grey-background-png-4095-1982.png";
// export const MAIN_COLOR = "#561AD9";
export const TRANSPARENT_SQUARE = "/src/assets/images/blanckImg.png"
export const MAIN_COLOR = "#662483";

export const URL_NAME = "tarjetag.com/"
export const FULL_URL_NAME = `https://${URL_NAME}`
export const SITE_NAME = "Tarjetag"
export const PHONE_NUMBER = "63073135"

export const LICENSE_TYPES = {
  FREE: "Gratis",
  STANDARD: "Estándar",
  PREMIUM: "Premium",
  GOLD: "Oro",
  SILVER: "Plata",
  BRONZE: "Bronce",
};

export const licenseLimits = {
  [LICENSE_TYPES.FREE]: {
    limitValue: 3,
    maxProducts: 5,
    limitImagesPerProduct: 1,
    admin: false,
    excludedButtons: ["WhatsApp", "Google Maps"],
    productsDivision: false
  },
  [LICENSE_TYPES.STANDARD]: {
    limitValue: 12,
    maxProducts: 30,
    limitImagesPerProduct: 5,
    admin: false,
    excludedButtons: [],
    productsDivision: false
  },
  [LICENSE_TYPES.PREMIUM]: {
    limitValue: 12,
    maxProducts: 100,
    limitImagesPerProduct: 5,
    admin: true,
    excludedButtons: [],
    productsDivision: true
  },
  [LICENSE_TYPES.GOLD]: {
    limitValue: 12,
    maxProducts: 100,
    limitImagesPerProduct: 5,
    admin: true,
    excludedButtons: [],
    productsDivision: true
  },
  [LICENSE_TYPES.SILVER]: {
    limitValue: 12,
    maxProducts: 100,
    limitImagesPerProduct: 5,
    admin: true,
    excludedButtons: [],
    productsDivision: true
  },
  [LICENSE_TYPES.BRONZE]: {
    limitValue: 12,
    maxProducts: 100,
    limitImagesPerProduct: 5,
    admin: true,
    excludedButtons: [],
    productsDivision: true
  },
}