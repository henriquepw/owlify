import React from 'react';
import Modal from 'react-native-modal';

import api from '@services/api';
import { trigger } from 'swr';
import * as Yup from 'yup';

import Input from '@atoms/Input';

import { useForm } from '@hooks';

import { Gateway } from '@utils/interfaces';

import * as S from './styles';

interface EditGatewayModalProps {
  isVisible: boolean;
  gateway: Gateway;
  onCancel: () => void;
}

interface FormData {
  location: string;
}

const validationSchema = {
  location: Yup.string().required('Location is required'),
};

const EditGatewayModal: React.FC<EditGatewayModalProps> = ({
  isVisible,
  gateway,
  onCancel,
}) => {
  const { formRef, validateForm, submitForm } = useForm(validationSchema);

  async function handleSubmit({ location }: FormData): Promise<void> {
    const isValid = validateForm({ location });
    if (!isValid) return;

    try {
      if (gateway.location !== location) {
        // TODO: mutate the gateway.
        // const updatedAt = new Date().toISOString();
        // const updatedGateway = { ...gateway, updatedAt, location };

        // mutate(`/gateways/${gateway.id}`, updatedGateway, false);

        await api.put(`/gateways/${gateway.id}`, { location });

        // trigger(`/gateways/${gateway.id}`);
        trigger('/gateways');
      }
    } catch (error) {
      console.error(error);
    }

    onCancel();
  }

  return (
    <Modal isVisible={isVisible} coverScreen={false}>
      <S.UpdateForm ref={formRef} onSubmit={handleSubmit} initialData={gateway}>
        <S.Title>New location</S.Title>

        <Input
          name="location"
          icon="map-pin"
          placeholder="Location"
          returnKeyType="send"
          onSubmitEditing={submitForm}
        />

        <S.ButtonContainer>
          <S.Button text="Cancel" onPress={onCancel} />
          <S.Button text="Update" onPress={submitForm} />
        </S.ButtonContainer>
      </S.UpdateForm>
    </Modal>
  );
};

export default EditGatewayModal;
