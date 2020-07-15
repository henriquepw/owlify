import React, { useCallback, useRef } from 'react';
import { Alert, TextInput } from 'react-native';

import { useNavigation, useRoute } from '@react-navigation/native';
import api from '@services/api';
import { trigger, mutate } from 'swr';
import * as Yup from 'yup';

import Icon from '@atoms/Icon';

import { useForm, useDevices } from '@hooks';

import backgroundImg from '@assets/default/endnode-registration-background.png';

import * as S from './styles';

interface FormData {
  name: string;
  room: string;
}

const schema = {
  name: Yup.string().required('Name is required'),
  room: Yup.string().required('Room is required'),
};

const EndnodeRegistration: React.FC = () => {
  const navigation = useNavigation();
  const route = useRoute();

  const { formRef, validateForm } = useForm(schema);
  const { endnodes } = useDevices();

  const roomInputRef = useRef<TextInput>(null);

  const handleSubmit = useCallback(
    async (data: FormData) => {
      const isValid = await validateForm(data);
      if (!isValid) return;

      try {
        const { gatewayId } = route.params as { gatewayId: string };

        const response = await api.post('/endnodes', {
          gatewayId,
          ...data,
        });

        mutate('/endnodes', [...endnodes, response.data]);
        trigger('/endnodes');

        Alert.alert('Success!', 'You successfully registered a end-node :D', [
          {
            text: 'Ok',
            onPress: () => navigation.navigate('Home', { screen: 'Dashboard' }),
          },
        ]);
      } catch (error) {
        Alert.alert('Something went wrong :(!', 'Try again later');
      }
    },
    [navigation, validateForm, route.params, endnodes],
  );

  function submitForm(): void {
    formRef.current?.submitForm();
  }

  function setRoomInputFocus(): void {
    roomInputRef.current?.focus();
  }

  return (
    <S.Container>
      <S.Background>
        <S.BackgroundImage source={backgroundImg} />
      </S.Background>

      <S.ScrollContainer>
        <Icon name="endnode" background={false} size={100} />
        <S.Title>End-node</S.Title>

        <S.RegistrationForm ref={formRef} onSubmit={handleSubmit}>
          <S.Input
            name="name"
            icon="tag"
            placeholder="Name"
            returnKeyType="next"
            onSubmitEditing={setRoomInputFocus}
          />

          <S.Input
            ref={roomInputRef}
            name="room"
            icon="map-pin"
            placeholder="Room"
            returnKeyType="send"
            onSubmitEditing={submitForm}
          />

          <S.SubmitButton text="Register" onPress={submitForm} />
        </S.RegistrationForm>
      </S.ScrollContainer>
    </S.Container>
  );
};

export default EndnodeRegistration;
