import Icon from 'react-native-vector-icons/Feather';
import styled from 'styled-components/native';

export const Container = styled.View`
  width: 100%;
`;

export const Content = styled.View`
  flex-direction: row;
  align-items: center;

  width: 100%;
  height: 56px;
  padding: 0 16px;

  border-width: 2px;
  border-radius: 10px;
  border-color: ${({ theme }) => theme.colors.active};
  background: ${({ theme }) => theme.colors.background};
`;

export const InputIcon = styled(Icon)`
  color: ${({ theme }) => theme.colors.active};
`;

export const TextInput = styled.TextInput.attrs(({ theme }) => ({
  placeholderTextColor: theme.colors.secondaryText,
}))`
  flex: 1;

  margin-left: 16px;
  font-size: 16px;
  font-family: ${({ theme }) => theme.fonts.regular};
  color: ${({ theme }) => theme.colors.active};
`;

export const TextError = styled.Text`
  color: ${({ theme }) => theme.colors.attention};
  font-family: ${({ theme }) => theme.fonts.regular};
  margin-top: 8px;
`;
