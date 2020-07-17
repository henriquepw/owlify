import styled from 'styled-components/native';

export const Graphic = styled.View`
  width: 363px;
  height: 240px;
  border-radius: 10px;

  margin: 0 24px;

  background: ${({ theme }) => theme.colours.activeLight};
`;

export const SessionTitle = styled.Text`
  margin: 32px auto 16px 24px;
  letter-spacing: 1.8px;

  font-size: 18px;
  font-family: ${({ theme }) => theme.fonts.bold};
  color: ${({ theme }) => theme.colours.active};
`;
