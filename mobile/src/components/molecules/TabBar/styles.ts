import styled from 'styled-components/native';

export const Container = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: space-around;

  width: 100%;
  height: 64px;

  background: ${({ theme }) => theme.colours.card};
  border-color: ${({ theme }) => theme.colours.active};
  border-top-width: 2px;
`;
