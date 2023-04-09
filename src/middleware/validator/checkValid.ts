import { ValidationError } from "fastest-validator";
import { CheckValid } from "./validator.dto/checkValid.dto";

export const checkValid = (check: ValidationError[]): CheckValid => {
  if (!check.length) {
    return {
      isValid: true,
    };
  }

  const checkMessage = check.map((c) => c.message).join(` \n`);

  return {
    isValid: false,
    message: checkMessage,
  };
};
