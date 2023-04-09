import config from "./config.json";

export const getConfig = () => {
  if (process.env.JWT_PASS) {
    config.auth.jwt_password = process.env.JWT_PASS;
  }

  if (process.env.JWT_EXP) {
    config.auth.jwt_exp = process.env.JWT_EXP;
  }

  return config;
};
