import CORS_WHITELIST from "./constants/frontend";

export const corsOption = {
  origin: (origin, callback) => {
    const originIsValid = CORS_WHITELIST.indexOf(origin) !== -1;

    console.log(
      `CORS from origin ${origin} is ${originIsValid ? "valid" : "invalid"}`
    );

    return originIsValid
      ? callback(null, true)
      : callback(new Error("Not allowed by CORS"));
  },
};
