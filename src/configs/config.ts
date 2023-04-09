import config from "./config.json";

export const getConfig = () => {
  if (process.env.JWT_PASS) {
    config.auth.jwt_password = process.env.JWT_PASS;
  }

  if (process.env.JWT_EXP) {
    config.auth.jwt_exp = process.env.JWT_EXP;
  }

  if (process.env.COOKIE_NAME) {
    config.auth.cookie_name = process.env.COOKIE_NAME;
  }
  if (process.env.PORT) {
    config.auth.port = process.env.PORT;
  }

  return config;
};
