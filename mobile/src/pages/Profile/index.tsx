import React from 'react';
import { ScrollView } from 'react-native';

import { Form } from '@unform/mobile';

import Buttom from '@atoms/Button';
import Input from '@atoms/Input';

import Header from '@organisms/Header';

import * as S from './styles';

const Profile: React.FC = () => {
  return (
    <>
      <ScrollView>
        <Header />
        <S.Container>
          <S.LoginSection>
            <Form onSubmit={() => ''}>
              <Input icon="user" name="withIcon" placeholder="Name" />
            </Form>
            <Form onSubmit={() => ''}>
              <Input icon="mail" name="withIcon" placeholder="E-mail" />
            </Form>
          </S.LoginSection>

          <S.PasswordSection>
            <Form onSubmit={() => ''}>
              <Input icon="lock" name="withIcon" placeholder="Password" />
            </Form>
            <Form onSubmit={() => ''}>
              <Input icon="lock" name="withIcon" placeholder="New password" />
            </Form>
            <Form onSubmit={() => ''}>
              <Input
                icon="lock"
                name="withIcon"
                placeholder="Confirm new password"
              />
            </Form>

            <Buttom text="UPDATE" />
          </S.PasswordSection>

          <S.DeleteSection>
            <Buttom type="attention" text="DELETE" />
          </S.DeleteSection>
        </S.Container>
      </ScrollView>
    </>
  );
};

export default Profile;
