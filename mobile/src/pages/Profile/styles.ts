import styled from 'styled-components/native';

interface ContainerProps {
  hasBorder: boolean;
}

export const Container = styled.View<ContainerProps>`
  border-bottom-width: ${({ hasBorder }) => (hasBorder ? '1px' : '0px')};
  border-bottom-color: ${({ theme }) => theme.colors.withoutFocus};

  padding: 8px 0px;
  margin: 0px 40px;
`;

export const ButtonContainer = styled.View<ContainerProps>`
  border-bottom-width: ${({ hasBorder }) => (hasBorder ? '1px' : '0px')};
  border-bottom-color: ${({ theme }) => theme.colors.withoutFocus};
  padding-top: 16px;
  padding-bottom: 16px;
`;
