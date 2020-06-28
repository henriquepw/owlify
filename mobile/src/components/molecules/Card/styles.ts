import VectorIcon from 'react-native-vector-icons/Feather';
import styled, { css } from 'styled-components/native';

interface ContainerProps {
  isVertical?: boolean;
}

interface ContentProps {
  isVertical?: boolean;
  isSelected?: boolean;
}

interface TextWrapperProps {
  isCentered?: boolean;
}

export const Container = styled.TouchableOpacity<ContainerProps>`
  ${({ isVertical }) =>
    !isVertical &&
    css`
      width: 100%;
    `}

  background: ${({ theme }) => theme.colors.card};

  border-radius: 10px;

  elevation: 3;
  shadow-color: #000;
  shadow-opacity: 0.1;
  shadow-offset: 2px 2px;
`;

export const Content = styled.View<ContentProps>`
  ${({ isVertical }) =>
    !isVertical &&
    css`
      flex-direction: row;
    `}

  align-items: center;
  padding: 18px;

  border-width: 2px;
  border-radius: 10px;
  border-color: ${({ theme, isSelected }) =>
    isSelected ? theme.colors.active : 'transparent'};
`;

export const TextWrapper = styled.View<TextWrapperProps>`
  align-items: ${(props) => (props.isCentered ? 'center' : 'flex-start')};

  margin: ${(props) => (props.isCentered ? '16px 0 0' : '0 0 0 16px')};
`;

export const Title = styled.Text`
  font-family: ${({ theme }) => theme.fonts.bold};
  font-size: 18px;

  color: ${({ theme }) => theme.colors.active};
`;

export const SubTitle = styled.Text`
  margin-top: 8px;

  font-family: ${({ theme }) => theme.fonts.regular};
  font-size: 14px;

  color: ${({ theme }) => theme.colors.active};
  opacity: 0.7;
`;

export const CheckIcon = styled(VectorIcon).attrs({
  name: 'check-circle',
})`
  margin-left: auto;

  color: ${({ theme }) => theme.colors.active};
`;
