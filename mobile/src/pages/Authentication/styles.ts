import styled from 'styled-components/native';

import { Form } from '@unform/mobile';

import Button from '@atoms/Button';
import AtomInput from '@atoms/Input';

export const Container = styled.View`
  flex: 1;
  align-items: center;

  padding: 40px;
  background: ${({ theme }) => theme.colors.background};
`;

export const TopConner = styled.Image`
  position: absolute;
  transform: rotate(180deg);

  top: 0;
  left: 0;
`;

export const ButtonConner = styled.Image`
  position: absolute;

  bottom: 0;
  right: 0;
`;

export const AuthForm = styled(Form)`
  align-items: center;

  width: 100%;
`;

export const Input = styled(AtomInput)`
  margin-top: 24px;
`;

export const Title = styled.Text`
  font-size: 24px;
  letter-spacing: 2.4px;
  font-family: ${({ theme }) => theme.fonts.bold};
  color: ${({ theme }) => theme.colors.active};

  margin: 8px 0 24px;
`;

export const SubmitButton = styled(Button)`
  margin-top: 32px;

  width: 100%;
`;

export const NoAccountText = styled.Text`
  font-size: 16px;
  font-family: ${({ theme }) => theme.fonts.regular};
  color: ${({ theme }) => theme.colors.withoutFocus};

  margin: auto 0 8px;
`;

export const ToggleSign = styled.TouchableOpacity``;

export const ToggleSignText = styled.Text`
  font-size: 16px;
  font-family: ${({ theme }) => theme.fonts.regular};
  color: ${({ theme }) => theme.colors.active};

  text-transform: uppercase;
`;
