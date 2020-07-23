import styled from 'styled-components/native';

export const Container = styled.View`
  width: 100%;
`;

export const Content = styled.View`
  display: flex;
  justify-content: flex-start;
`;

export const HeaderTitle = styled.Text`
  font-family: ${({ theme }) => theme.fonts.regular};
  color: ${({ theme }) => theme.colours.active};
  font-size: 24px;
  font-weight: bold;
  margin: 24px;
`;
