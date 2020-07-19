import styled from 'styled-components/native';

interface ContainerProps {
  isEmpty: boolean;
}

export const Container = styled.View<ContainerProps>`
  flex: 1;
  ${({ isEmpty }) =>
    isEmpty ? 'align-items: center; justify-content: center;' : null}
`;

export const WarningIcon = styled.Image`
  width: 172px;
  height: 141px;
`;

export const scrollViewStyle = styled.ScrollView``;
