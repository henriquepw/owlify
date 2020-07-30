import styled from 'styled-components/native';

import AtomButton from '@atoms/Button';

export const Container = styled.View`
  flex: 1;
  align-items: center;

  padding: 40px;
  margin: auto 0;
`;

export const Title = styled.Text`
  font-size: 28px;
  font-family: ${({ theme }) => theme.fonts.bold};
  color: ${({ theme }) => theme.colours.active};

  letter-spacing: 1.4px;
  text-align: center;

  margin-top: 48px;
`;

export const Description = styled.Text`
  font-size: 16px;
  font-family: ${({ theme }) => theme.fonts.regular};
  color: ${({ theme }) => theme.colours.withoutFocus};
  line-height: 20.8px;

  text-align: center;

  margin: 24px 0 16px;
`;

export const Strong = styled.Text`
  color: ${({ theme }) => theme.colours.active};
  font-family: ${({ theme }) => theme.fonts.bold};
`;

export const Button = styled(AtomButton)`
  height: 40px;
`;
