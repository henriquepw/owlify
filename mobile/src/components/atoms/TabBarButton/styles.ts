// import { RectButton } from 'react-native-gesture-handler';
import FeatherIcon from 'react-native-vector-icons/Feather';
import styled, { css } from 'styled-components/native';

interface ContentProps {
  isRegistrationPage: boolean;
}

interface IconProps {
  isFocused: boolean;
  isRegistrationPage: boolean;
}

export const Container = styled.TouchableOpacity`
  flex: 1;
  align-items: center;
  justify-content: center;

  height: 56px;
`;

export const Content = styled.View<ContentProps>`
  align-items: center;
  justify-content: center;

  ${({ isRegistrationPage, theme }) =>
    isRegistrationPage &&
    css`
      margin: auto;
      background: ${theme.colours.active};

      width: 48px;
      height: 48px;

      border-radius: 24px;
    `}
`;

export const Icon = styled(FeatherIcon)<IconProps>`
  color: ${({ theme, isRegistrationPage, isFocused }) => {
    if (isRegistrationPage) return theme.colours.background;

    return isFocused ? theme.colours.active : theme.colours.withoutFocus;
  }};
`;

export const Label = styled.Text`
  margin-top: 2px;

  /* font-size: 14px; */
  text-transform: capitalize;
  font-family: ${({ theme }) => theme.fonts.regular};
  color: ${({ theme }) => theme.colours.active};
`;
