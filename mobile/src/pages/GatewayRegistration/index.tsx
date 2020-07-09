import React, { useRef, useCallback } from 'react';
import { Alert } from 'react-native';

import { useNavigation } from '@react-navigation/native';
import api from '@services/api';
import { FormHandles } from '@unform/core';
import * as Yup from 'yup';

import Button from '@atoms/Button';
import Icon from '@atoms/Icon';

import getValidationErrors from '@utils/getValidationErrors';

import * as S from './styles';

interface FormData {
  location: string;
}

const GatewayRegistration: React.FC = () => {
  const navigation = useNavigation();

  const formRef = useRef<FormHandles>(null);

  const handleSubmit = useCallback(
    async (data: FormData) => {
      try {
        const schema = Yup.object().shape({
          location: Yup.string().required('Location is required'),
        });

        await schema.validate(data, {
          abortEarly: false,
        });

        formRef.current?.setErrors({});

        await api.post('/gateways', data);

        Alert.alert('Success!', 'You successfully registered a gateway :D', [
          {
            text: 'Ok',
            onPress: () =>
              navigation.navigate('Home', {
                screen: 'Dashboard',
              }),
          },
        ]);
      } catch (error) {
        if (error instanceof Yup.ValidationError) {
          const errors = getValidationErrors(error);
          formRef.current?.setErrors(errors);

          return;
        }

        // If not a Validation error, probaly is a request error
        // display a alery with the error
        Alert.alert('Something went wrong :(!', 'Try again later');
      }
    },
    [navigation],
  );

  function submitForm(): void {
    formRef.current?.submitForm();
  }

  return (
    <S.Container>
      <S.ScrollContainer>
        <Icon name="gateway" background={false} size={100} />
        <S.Title>Gateway</S.Title>

        <S.RegistrationForm ref={formRef} onSubmit={handleSubmit}>
          <S.Input name="location" icon="map-pin" placeholder="Location" />

          <Button text="Register" onPress={submitForm} />
        </S.RegistrationForm>
      </S.ScrollContainer>
    </S.Container>
  );
};

export default GatewayRegistration;
