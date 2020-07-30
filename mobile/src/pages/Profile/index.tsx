import React from 'react';
import { Alert } from 'react-native';

import api from '@services/api';
import { Form } from '@unform/mobile';
import * as Yup from 'yup';

import Input from '@atoms/Input';

import TabFragment from '@templates/TabFragment';

import { useAuth, useForm } from '@hooks';

import * as S from './styles';

interface FormData {
  name: string;
  email: string;
  password: string;
  oldPassword: string;
  confirmPassword: string;
}

const validationSchema = {
  name: Yup.string().required('The name is required'),
  email: Yup.string()
    .required('The email is required')
    .email('Enter a valid email address'),
  password: Yup.string().when('oldPassword', {
    is: (val) => !!val.lenght,
    then: Yup.string().required('The password is required.'),
    outherwise: Yup.string(),
  }),
  confirmPassword: Yup.string()
    .when('oldPassword', {
      is: (val) => !!val.lenght,
      then: Yup.string().required('The password is required.'),
      outherwise: Yup.string(),
    })
    .oneOf([Yup.ref('password'), undefined], 'Passwords not match.'),
};

const Profile: React.FC = () => {
  const { signOut, user, updateUser } = useAuth();
  const { formRef, submitForm, validateForm } = useForm(validationSchema);

  async function handleSubmitUpdate(data: FormData): Promise<void> {
    const isValid = await validateForm(data);
    if (!isValid) return;

    try {
      const { name, email, oldPassword, password } = data;

      const formData = {
        name,
        email,
        ...(oldPassword ? { oldPassword, password } : {}),
      };

      const response = await api.put('users', formData);

      updateUser(response.data);

      Alert.alert('Profile Successfully updated!');
    } catch (error) {
      console.log(error);
    }
  }

  function handleDelete(): void {
    async function deleteAccount(): Promise<void> {
      try {
        await api.delete('users');

        signOut();
      } catch (error) {
        console.log(error);
      }
    }

    Alert.alert('Attention!', 'You are sure you want to delete your account?', [
      { text: 'Delete', onPress: deleteAccount },
      { text: 'Cancel' },
    ]);
  }

  return (
    <TabFragment
      title="Notifications"
      scrollViewStyle={{
        paddingTop: 16,
        marginHorizontal: 32,
      }}
    >
      <Form ref={formRef} initialData={user} onSubmit={handleSubmitUpdate}>
        <Input icon="user" placeholder="Name" name="name" />
        <S.SecondaryInput icon="mail" placeholder="E-mail" name="email" />

        <S.Divider marginVertical={20} />

        <Input icon="lock" placeholder="Password" name="oldPassword" />
        <S.SecondaryInput
          icon="lock"
          placeholder="New password"
          name="password"
        />
        <S.SecondaryInput
          icon="lock"
          placeholder="Confirm new password"
          name="confirmPassword"
        />

        <S.UpdatedButton text="update" onPress={submitForm} />
      </Form>

      <S.Divider />

      <S.AttentionButton text="delete account" onPress={handleDelete} />
      <S.AttentionButton text="sign out" onPress={signOut} />
    </TabFragment>
  );
};

export default Profile;
