import styled from 'styled-components/native';

import { Form } from '@unform/mobile';

import AtomInput from '@atoms/Input';

export const Container = styled.View`
  flex: 1;
  /* padding: 32px; */
`;

export const ScrollContainer = styled.ScrollView`
  padding: 32px;
`;

export const Title = styled.Text`
  font-size: 24px;
  letter-spacing: 2.4px;
  font-family: ${({ theme }) => theme.fonts.bold};
  color: ${({ theme }) => theme.colours.active};

  margin: 8px auto;
`;

export const RegistrationForm = styled(Form)`
  flex: 1;
  align-items: center;
`;

export const Input = styled(AtomInput)`
  margin: 56px 0 32px;
`;
