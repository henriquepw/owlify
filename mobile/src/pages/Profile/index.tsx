import React, { useRef, useState, useEffect } from 'react';
import { ScrollView, Alert } from 'react-native';

import { FormHandles } from '@unform/core';
import { Form } from '@unform/mobile';

import Buttom from '@atoms/Button';
import Input from '@atoms/Input';

import Header from '@organisms/Header';

import api from '../../services/api';

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

  async function handleSubmitUpdate(data: FormData) {
    /* await api.get('users/profile').then((res) => console.log(res.data)); */
    api.interceptors.request.use(
      (CONFIG) => {
        CONFIG.headers.authorization = `Bearer ${token}`;
        return CONFIG;
      },
      (error) => {
        return Promise.reject(error);
      },
    );
    await api
      .put('users', data)
      .then(() => Alert.alert('Updated Successfully!'))
      .catch(() => Alert.alert('Failed To Update.'));
  }

  async function handleSubmitDelete() {
    /* await api.get('users/profile').then((res) => console.log(res.data)); */
    api.interceptors.request.use(
      (CONFIG) => {
        CONFIG.headers.authorization = `Bearer ${token}`;
        return CONFIG;
      },
      (error) => {
        return Promise.reject(error);
      },
    );
    await api.delete('users').then(() => Alert.alert('Deleted Account!'));
  }

  useEffect(() => {
    api
      .post('sessions', {
        email: 'glegogle84@gmail.com',
        password: '1',
      })
      .then((res) => setToken(res.data.token));
  }, []);

  return (
    <>
      <ScrollView>
        <Header />

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
                handleSubmitDelete();
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
