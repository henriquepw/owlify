import styled from 'styled-components/native';

export const Graphic = styled.View`
  flex: 1;

  width: 100%;
  height: 240px;
  border-radius: 10px;

  background: ${({ theme }) => theme.colours.activeLight};
`;

export const SessionTitle = styled.Text`
  margin: 32px auto 16px 0;
  letter-spacing: 1.8px;

  font-size: 18px;
  font-family: ${({ theme }) => theme.fonts.bold};
  color: ${({ theme }) => theme.colours.active};
`;
