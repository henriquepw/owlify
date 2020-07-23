import VectorIcon from 'react-native-vector-icons/Feather';
import styled, { css } from 'styled-components/native';

interface VerticalProps {
  isVertical?: boolean;
}

interface ContentProps {
  isVertical?: boolean;
  isSelected?: boolean;
}

interface TextWrapperProps {
  isCentered?: boolean;
}

// TODO: Fix the elevation/shadow
export const Container = styled.TouchableOpacity<VerticalProps>`
  ${({ isVertical }) =>
    !isVertical &&
    css`
      width: 100%;
    `}

  background: ${({ theme }) => theme.colours.card};

  border-radius: 10px;

  /* elevation: 1;
  shadow-color: #000;
  shadow-opacity: 0.1;
  shadow-offset: 2px 2px; */
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
    isSelected ? theme.colours.active : 'transparent'};
`;

export const TextWrapper = styled.View<TextWrapperProps>`
  align-items: ${(props) => (props.isCentered ? 'center' : 'flex-start')};

  margin: ${(props) => (props.isCentered ? '16px 0 0' : '0 0 0 16px')};
`;

export const Title = styled.Text<VerticalProps>`
  font-family: ${({ theme }) => theme.fonts.bold};
  font-size: ${({ isVertical }) => (isVertical ? 16 : 18)}px;
  text-align: ${({ isVertical }) => (isVertical ? 'center' : 'left')};
  text-transform: capitalize;

  color: ${({ theme }) => theme.colours.active};
`;

export const SubTitle = styled.Text<VerticalProps>`
  margin-top: 8px;

  font-family: ${({ theme }) => theme.fonts.regular};
  font-size: ${({ isVertical }) => (isVertical ? 12 : 14)}px;
  text-align: ${({ isVertical }) => (isVertical ? 'center' : 'left')};

  color: ${({ theme }) => theme.colours.active};
  opacity: 0.7;
`;

export const CheckIcon = styled(VectorIcon).attrs({
  name: 'check-circle',
})`
  margin-left: auto;

  color: ${({ theme }) => theme.colours.active};
`;
