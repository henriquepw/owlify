import styled from 'styled-components/native';

import AtomButton from '@atoms/Button';

export const Container = styled.View`
  align-self: stretch;

  padding: 24px;
  margin: 0 24px;
  border-radius: 10px;

  background: ${({ theme }) => theme.colours.card};

  elevation: 2;
  shadow-color: #000;
  shadow-opacity: 0.1;
  shadow-offset: 2px 2px;
`;

export const Description = styled.Text`
  font-size: 16px;
  font-family: ${({ theme }) => theme.fonts.regular};
  color: ${({ theme }) => theme.colours.withoutFocus};

  text-align: center;

  margin-bottom: 16px;
`;

export const Strong = styled.Text`
  color: ${({ theme }) => theme.colours.active};
  font-family: ${({ theme }) => theme.fonts.bold};
`;

export const Button = styled(AtomButton)`
  height: 40px;
`;
