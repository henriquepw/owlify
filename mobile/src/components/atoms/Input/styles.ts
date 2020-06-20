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
`;

export const Content = styled.View<ContentProps>`
  flex-direction: row;
  align-items: center;

  width: 100%;
  height: 56px;
  padding: 0 16px;

  border-width: 2px;
  border-radius: 10px;
  background: ${({ theme }) => theme.colors.background};

  border-color: ${({ theme, isFilled, isFocused, isErrored }) => {
    if (isFocused) return theme.colors.active;
    if (isErrored) return theme.colors.attention;
    if (isFilled) return theme.colors.active;

    return theme.colors.withoutFocus;
  }};
`;

export const InputIcon = styled(Icon)<IconProps>`
  color: ${({ theme, isErrored, isFilled }) => {
    if (isErrored) return theme.colors.attention;
    if (isFilled) return theme.colors.active;

    return theme.colors.withoutFocus;
  }};
`;

export const TextInput = styled.TextInput.attrs(({ theme }) => ({
  placeholderTextColor: theme.colors.withoutFocus,
}))`
  flex: 1;

  margin-left: 14px;
  font-size: 16px;
  font-family: ${({ theme }) => theme.fonts.regular};
  color: ${({ theme }) => theme.colors.active};
`;

export const TextError = styled.Text`
  color: ${({ theme }) => theme.colors.attention};
  font-family: ${({ theme }) => theme.fonts.regular};
  margin: 8px 0 0 2px;
`;
