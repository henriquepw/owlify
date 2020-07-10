import { RefObject, useRef, useCallback } from 'react';

import { FormHandles } from '@unform/core';
import * as Yup from 'yup';

import getValidationErrors from '@utils/getValidationErrors';

type ValidateFunction = <FormData, Shape extends Record<string, unknown>>(
  data: FormData,
  validateShape?: Yup.ObjectSchemaDefinition<Shape>,
) => Promise<boolean>;

interface FormValidationData {
  formRef: RefObject<FormHandles>;
  validateForm: ValidateFunction;
}

function useForm<InitialShape extends Record<string, unknown>>(
  initialShape?: Yup.ObjectSchemaDefinition<InitialShape>,
): FormValidationData {
  const formRef = useRef<FormHandles>(null);

  const validateForm = useCallback(
    async (data, validateShape) => {
      try {
        const currentShape = validateShape || initialShape;

        if (currentShape) {
          const schema = Yup.object().shape(currentShape);

          await schema.validate(data, {
            abortEarly: false,
          });
        }

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
    [initialShape],
  );

  return { formRef, validateForm };
}

export { useForm };
