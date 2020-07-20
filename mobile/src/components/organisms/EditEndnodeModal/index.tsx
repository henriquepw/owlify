import React from 'react';
import Modal from 'react-native-modal';

import api from '@services/api';
import { trigger } from 'swr';
import * as Yup from 'yup';

import { useForm } from '@hooks';

import { Endnode } from '@utils/interfaces';

import * as S from './styles';

interface EditEndnodeModalProps {
  isVisible: boolean;
  endnode: Endnode;
  onCancel: () => void;
}

interface FormData {
  name: string;
  room: string;
}

const validationSchema = {
  name: Yup.string().required('Name is required'),
  room: Yup.string().required('Room is required'),
};

const EditEndnodeModal: React.FC<EditEndnodeModalProps> = ({
  isVisible,
  endnode,
  onCancel,
}) => {
  const { formRef, validateForm, submitForm } = useForm(validationSchema);

  async function handleSubmit({ name, room }: FormData): Promise<void> {
    const isValid = validateForm({ name, room });
    if (!isValid) return;

    try {
      if (endnode.name !== name || endnode.room !== room) {
        // TODO: mutate the endnode.

        await api.put(`/endnodes/${endnode.id}`, { name, room });

        trigger('/endnodes');
      }
    } catch (error) {
      console.error(error);
    }

    onCancel();
  }

  return (
    <Modal isVisible={isVisible} coverScreen={false}>
      <S.UpdateForm ref={formRef} onSubmit={handleSubmit} initialData={endnode}>
        <S.Title>Update end-node</S.Title>

        <S.Input
          name="name"
          icon="user"
          placeholder="Name"
          returnKeyType="send"
          onSubmitEditing={submitForm}
        />

        <S.Input
          name="room"
          icon="map-pin"
          placeholder="Room"
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

export default EditEndnodeModal;
