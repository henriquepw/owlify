import styled from 'styled-components/native';

interface BackgroundProps {
  color: 'light' | 'default';
}

export const Container = styled.View`
  margin: 2px 6px;
`;

export const Icon = styled.Image`
  width: 64px;
  height: 64px;
`;

export const Background = styled.View<BackgroundProps>`
  position: absolute;

  width: 74px;
  height: 74px;
  transform: scaleY(0.556) rotate(-17deg);

  left: -5px;
  bottom: -8px;

  opacity: 0.3;
  border-radius: 72px;
  background: ${({ theme, color }) =>
    color === 'light' ? theme.colors.background : theme.colors.activeLight};
`;
