import styled from 'styled-components/native';

import { Form } from '@unform/mobile';

import AtomButton, { ButtonProps } from '@atoms/Button';

export const UpdateForm = styled(Form)`
  background: ${({ theme }) => theme.colours.card};

  border-radius: 10px;
  padding: 24px;
`;

export const Title = styled.Text`
  font-size: 18px;
  font-family: ${({ theme }) => theme.fonts.bold};
  color: ${({ theme }) => theme.colours.active};

  margin-bottom: 16px;
`;

export const ButtonContainer = styled.View`
  margin-top: 24px;
  flex-direction: row;
`;

export const Button = styled(AtomButton)<ButtonProps>`
  flex: 1;
  height: 40px;

  margin-left: ${({ text }) => (text === 'Cancel' ? 0 : 24)}px;
  background: ${({ theme, text }) =>
    text === 'Cancel' ? theme.colours.withoutFocus : theme.colours.active};
`;
