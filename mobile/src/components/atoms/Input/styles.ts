import Icon from 'react-native-vector-icons/Feather';
import styled from 'styled-components/native';

interface IconProps {
  isErrored: boolean;
  isFilled: boolean;
}

interface ContentProps {
  isErrored: boolean;
  isFocused: boolean;
  isFilled: boolean;
}

export const Container = styled.View`
  width: 100%;
  padding-top: 8px;
  padding-bottom: 8px;
`;

export const Content = styled.View<ContentProps>`
  flex-direction: row;
  align-items: center;

  width: 100%;
  height: 56px;
  padding: 0 16px;

  border-width: 2px;
  border-radius: 10px;
  background: ${({ theme }) => theme.colours.background};

  border-color: ${({ theme, isFilled, isFocused, isErrored }) => {
    if (isFocused) return theme.colours.active;
    if (isErrored) return theme.colours.attention;
    if (isFilled) return theme.colours.active;

    return theme.colours.withoutFocus;
  }};
`;

export const InputIcon = styled(Icon)<IconProps>`
  color: ${({ theme, isErrored, isFilled }) => {
    if (isErrored) return theme.colours.attention;
    if (isFilled) return theme.colours.active;

    return theme.colours.withoutFocus;
  }};
`;

export const TextInput = styled.TextInput.attrs(({ theme }) => ({
  placeholderTextColor: theme.colours.withoutFocus,
}))`
  flex: 1;

  margin-left: 14px;
  font-size: 16px;
  font-family: ${({ theme }) => theme.fonts.regular};
  color: ${({ theme }) => theme.colours.active};
`;

export const TextError = styled.Text`
  color: ${({ theme }) => theme.colours.attention};
  font-family: ${({ theme }) => theme.fonts.regular};
  margin: 8px 0 0 2px;
`;
