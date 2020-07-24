import React, { useRef, useState, useEffect } from 'react';
import { ScrollView, Alert } from 'react-native';

import api from '@services/api';
import { FormHandles } from '@unform/core';
import { Form } from '@unform/mobile';

import Buttom from '@atoms/Button';
import Input from '@atoms/Input';

/* import Header from '@organisms/Header'; */
import Header from '@molecules/Header';

import * as S from './styles';

interface FormData {
  name: string;
  email: string;
  password: string;
  oldPassword: string;
}

const Profile: React.FC = () => {
  const formRef = useRef<FormHandles>(null);
  const [token, setToken] = useState<string>('');

  async function handleSubmitUpdate(data: FormData): Promise<void> {
    /* await api.get('users/profile').then((res) => console.log(res.data)); */
    api
      .post('sessions', {
        email: data.email,
        password: data.oldPassword,
      })
      .then((res) => setToken(res.data.token));
    api.defaults.headers.authorization = `Bearer ${token}`;

    await api
      .put('users', data)
      .then(() => Alert.alert('Updated Successfully!'))
      .catch(() => Alert.alert('Failed To Update.'));
  }

  async function handleSubmitDelete(data: FormData): Promise<void> {
    /* await api.get('users/profile').then((res) => console.log(res.data)); */
    api
      .post('sessions', {
        email: data.email,
        password: data.oldPassword,
      })
      .then((res) => setToken(res.data.token));
    api.defaults.headers.authorization = `Bearer ${token}`;
    await api.delete('users').then(() => Alert.alert('Deleted Account!'));
  }

  /* useEffect(() => {
    api
      .post('sessions', {
        email: 'glegogle84@gmail.com',
        password: '12',
      })
      .then((res) => setToken(res.data.token));
  }, []); */

  return (
    <>
      <ScrollView>
        <Header>Notifications</Header>

        <Form ref={formRef} onSubmit={() => ''}>
          <S.Container hasBorder>
            <Input icon="user" placeholder="Name" name="name" />
            <Input icon="mail" placeholder="E-mail" name="email" />
          </S.Container>

          <S.Container hasBorder={false}>
            <Input icon="lock" placeholder="Password" name="oldPassword" />
            <Input icon="lock" placeholder="New password" name="password" />
            <Input
              icon="lock"
              placeholder="Confirm new password"
              name="confirmPassword"
            />
            <S.ButtonContainer
              hasBorder
              onTouchStart={() => {
                handleSubmitUpdate(formRef.current?.getData());
                return formRef.current?.submitForm();
              }}
            >
              <Buttom text="UPDATE" />
            </S.ButtonContainer>

            <S.ButtonContainer
              hasBorder={false}
              onTouchStart={() => {
                handleSubmitDelete(formRef.current?.getData());
                return formRef.current?.submitForm();
              }}
            >
              <Buttom text="DELETE" type="attention" />
            </S.ButtonContainer>
          </S.Container>
        </Form>
      </ScrollView>
    </>
  );
};

export default Profile;
