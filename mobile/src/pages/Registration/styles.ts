import styled from 'styled-components/native';

export const Container = styled.View`
  flex: 1;
  align-items: center;

  padding: 64px;
`;

export const DividerContainer = styled.View`
  flex-direction: row;
  align-items: center;

  margin: 32px 0;
`;

export const Divider = styled.View`
  width: 80px;
  height: 1px;
  background: ${({ theme }) => theme.colours.withoutFocus};
  opacity: 0.6;
`;

export const DividerText = styled.Text`
  font-size: 18px;
  font-family: ${({ theme }) => theme.fonts.regular};
  color: ${({ theme }) => theme.colours.withoutFocus};

  margin: 0 24px;
`;
