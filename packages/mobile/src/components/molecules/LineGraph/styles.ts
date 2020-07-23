import { LineChart, YAxis } from 'react-native-svg-charts';
import styled from 'styled-components/native';

const contentInset = { top: 10, bottom: 10 };

export const Container = styled.View`
  flex-direction: row;

  height: 240px;

  padding: 16px;
  margin: 0 24px;
  border-radius: 10px;

  background: ${({ theme }) => theme.colours.card};

  elevation: 2;
  shadow-color: #000;
  shadow-opacity: 0.1;
  shadow-offset: 2px 2px;
`;

export const Y = styled(YAxis).attrs(({ theme }) => ({
  svg: { fontSize: 12, fill: theme.colours.active },
  contentInset,
}))``;

export const Plot = styled(LineChart).attrs(({ theme }) => ({
  svg: { stroke: theme.colours.active, strokeWidth: 1 },
  contentInset,
}))`
  flex: 1;

  margin-left: 8px;
`;
