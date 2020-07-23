import { ValidationError } from 'yup';

export interface ValidateErrors {
  [key: string]: string;
}

function getValidationErrors(errors: ValidationError): ValidateErrors {
  const validationErrors: ValidateErrors = {};

  errors.inner.forEach((err) => {
    validationErrors[err.path] = err.message;
  });

  return validationErrors;
}

export default getValidationErrors;
