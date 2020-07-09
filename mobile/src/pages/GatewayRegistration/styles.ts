import { Dimensions, StatusBar } from 'react-native';
import styled from 'styled-components/native';

import { Form } from '@unform/mobile';

import AtomInput from '@atoms/Input';

export const Container = styled.View`
  flex: 1;
  /* padding: 32px; */
`;

export const Background = styled.View`
  position: absolute;

  height: ${Dimensions.get('window').height -
  (StatusBar.currentHeight ?? 0) -
  56 /* Header height */}px;
`;

export const BackgroundImage = styled.Image`
  position: absolute;

  left: 0;
  bottom: 0;
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
