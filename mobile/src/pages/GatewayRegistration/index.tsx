import React, { useCallback } from 'react';
import { Alert } from 'react-native';

import { useNavigation } from '@react-navigation/native';
import api from '@services/api';
import { mutate } from 'swr';
import * as Yup from 'yup';

import Button from '@atoms/Button';
import Icon from '@atoms/Icon';

import { useForm, useDevices } from '@hooks';

import backgroundImg from '@assets/default/gateway-registration-background.png';

import * as S from './styles';

interface FormData {
  location: string;
}
const schema = {
  location: Yup.string().required('Location is required'),
};

const GatewayRegistration: React.FC = () => {
  const navigation = useNavigation();

  const { formRef, validateForm } = useForm(schema);
  const { gateways } = useDevices();

  const handleSubmit = useCallback(
    async (data: FormData) => {
      const isValid = await validateForm(data);
      if (!isValid) return;

      try {
        const response = await api.post('/gateways', data);

        mutate('/gateways', [...gateways, response.data]);

        Alert.alert('Success!', 'You successfully registered a gateway :D', [
          {
            text: 'Ok',
            onPress: () => navigation.navigate('Home', { screen: 'Dashboard' }),
          },
        ]);
      } catch (error) {
        Alert.alert('Something went wrong :(!', 'Try again later');
      }
    },
    [navigation, validateForm, gateways],
  );

  function submitForm(): void {
    formRef.current?.submitForm();
  }

  return (
    <S.Container>
      <S.Background>
        <S.BackgroundImage source={backgroundImg} />
      </S.Background>

      <S.ScrollContainer>
        <Icon name="gateway" background={false} size={100} />
        <S.Title>Gateway</S.Title>

        <S.RegistrationForm ref={formRef} onSubmit={handleSubmit}>
          <S.Input
            name="location"
            icon="map-pin"
            placeholder="Location"
            returnKeyType="send"
            onSubmitEditing={submitForm}
          />

          <Button text="Register" onPress={submitForm} />
        </S.RegistrationForm>
      </S.ScrollContainer>
    </S.Container>
  );
};

export default GatewayRegistration;
