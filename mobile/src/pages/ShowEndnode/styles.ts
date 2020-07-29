import { LineChart, YAxis } from 'react-native-svg-charts';
import styled from 'styled-components/native';

import MoleculeCard from '@molecules/Card';

export const ChartContainer = styled.View`
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

export const ChartYAxis = styled(YAxis).attrs(({ theme }) => ({
  contentInset: { top: 10, bottom: 10 },
  svg: { fontSize: 12, fill: theme.colours.active },
}))``;

export const Chart = styled(LineChart).attrs(({ theme }) => ({
  svg: { stroke: theme.colours.active },
  contentInset: { top: 10, bottom: 10 },
}))`
  flex: 1;

  margin-left: 8px;
`;

export const SessionTitle = styled.Text`
  margin: 32px auto 16px 24px;
  letter-spacing: 1.8px;

  font-size: 18px;
  font-family: ${({ theme }) => theme.fonts.bold};
  color: ${({ theme }) => theme.colours.active};
`;

export const Card = styled(MoleculeCard)`
  width: auto;
  margin: 0 24px;

  elevation: 1;
  shadow-color: #000;
  shadow-opacity: 0.1;
  shadow-offset: 2px 2px;
`;
