import styled from 'styled-components/native';

interface BackgroundProps {
  color: 'light' | 'default';
}

export const Container = styled.View`
  margin: 0 5px 8px 0;
`;

export const Icon = styled.Image`
  width: 64px;
  height: 64px;
`;

export const Background = styled.View<BackgroundProps>`
  position: absolute;

  width: 64px;
  height: 64px;

  right: -5px;
  bottom: -8px;

  opacity: 0.3;
  border-radius: 72px;
  background: ${({ theme, color }) =>
    color === 'light' ? theme.colors.background : theme.colors.activeLight};
`;
