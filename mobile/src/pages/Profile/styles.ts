import styled from 'styled-components/native';

export const Container = styled.View`
  width: 100%;
`;

export const LoginSection = styled.View`
  border-bottom-width: 1px;
  border-bottom-color: ${({ theme }) => theme.colors.withoutFocus};
  margin-left: 40px;
  margin-right: 40px;
  margin-top: 40px;
  padding-bottom: 8px;
`;

export const PasswordSection = styled.View`
  margin-left: 40px;
  margin-right: 40px;
  margin-top: 24px;
  padding-bottom: 24px;
  border-bottom-width: 1px;
  border-bottom-color: ${({ theme }) => theme.colors.withoutFocus};
`;

export const DeleteSection = styled.View`
  margin-left: 40px;
  margin-right: 40px;
  margin-top: 24px;
  padding-bottom: 24px;
`;
