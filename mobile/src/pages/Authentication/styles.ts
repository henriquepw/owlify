import { Dimensions, StatusBar } from 'react-native';
import styled from 'styled-components/native';

import { Form } from '@unform/mobile';

import Button from '@atoms/Button';
import AtomInput from '@atoms/Input';

export const Container = styled.View`
  flex: 1;
  align-items: center;

  background: ${({ theme }) => theme.colors.background};
`;

export const ScrollForm = styled.ScrollView.attrs({
  showsVerticalScrollIndicator: false,
  contentContainerStyle: {
    alignItems: 'center',
    padding: 32,
  },
})`
  width: 100%;
`;

export const Background = styled.View`
  position: absolute;
  flex: 1;

  width: ${Dimensions.get('window').width}px;
  height: ${Dimensions.get('window').height - (StatusBar.currentHeight ?? 0)}px;
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
  margin-top: 16px;
`;

export const Title = styled.Text`
  font-size: 24px;
  letter-spacing: 2.4px;
  font-family: ${({ theme }) => theme.fonts.bold};
  color: ${({ theme }) => theme.colors.active};

  margin: 8px 0 16px;
`;

export const SubmitButton = styled(Button)`
  margin-top: 24px;

  width: 100%;
`;

export const ToggleSignView = styled.View`
  flex: 1;
  align-items: center;

  margin-bottom: 32px;
`;

export const ToggleSignText = styled.Text`
  font-size: 16px;
  font-family: ${({ theme }) => theme.fonts.regular};
  color: ${({ theme }) => theme.colors.withoutFocus};

  margin: auto 0 8px;
`;

export const ToggleSignButton = styled.TouchableOpacity`
  align-items: center;
  position: relative;
`;

export const ToggleSignButtonText = styled.Text`
  font-size: 16px;
  font-family: ${({ theme }) => theme.fonts.bold};
  color: ${({ theme }) => theme.colors.active};

  text-transform: uppercase;
`;

export const ToggleSignButtonBorder = styled.View`
  background: ${({ theme }) => theme.colors.activeLight};

  width: 72px;
  height: 8px;

  margin-top: -8px;
  opacity: 0.5;
  z-index: -1;
`;
