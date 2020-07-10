import Icon from 'react-native-vector-icons/Feather';
import styled from 'styled-components/native';

interface IconProps {
  icon: SVGElement;
}

interface ContentProps {
  hasIcon: boolean;
}

export const Container = styled.View`
  display: flex;
  width: 100%;
  height: 77px;
  flex-direction: row;
`;

export const Content = styled.View<ContentProps>`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-end;
  width: 50%;
`;

export const ChooseIcon = styled(Icon)`
  color: ${({ theme }) => theme.colors.active};
  margin: 24px;
`;

export const HeaderTitle = styled.Text`
  font-family: ${({ theme }) => theme.fonts.regular};
  color: ${({ theme }) => theme.colors.active};
  font-size: 24px;
  font-weight: bold;
  margin: 24px;
`;
