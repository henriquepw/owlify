import { RefObject, useRef, useCallback } from 'react';

import { FormHandles } from '@unform/core';
import * as Yup from 'yup';

import getValidationErrors from '@utils/getValidationErrors';

type ValidateFunction = <FormData>(data: FormData) => Promise<boolean>;

interface FormValidationData {
  formRef: RefObject<FormHandles>;
  validate: ValidateFunction;
}

function useForm<Schema extends Record<string, unknown>>(
  shape: Yup.ObjectSchemaDefinition<Schema>,
): FormValidationData {
  const formRef = useRef<FormHandles>(null);

  const validate: ValidateFunction = useCallback(
    async (data) => {
      try {
        const schema = Yup.object().shape(shape);

        await schema.validate(data, {
          abortEarly: false,
        });

        formRef.current?.setErrors({});

        return true;
      } catch (error) {
        if (error instanceof Yup.ValidationError) {
          const errors = getValidationErrors(error);
          formRef.current?.setErrors(errors);
        }

        return false;
      }
    },
    [shape],
  );

  return { formRef, validate };
}

export { useForm };
