import { FlatList } from 'react-native';
import styled from 'styled-components/native';

import MoleculeCard from '@molecules/Card';

import { Gateway, Endnode } from './index';

export const Container = styled.View`
  flex: 1;
`;

export const Content = styled.View`
  flex: 1;

  padding: 24px;
  padding-right: 0;
`;

export const Title = styled.Text`
  font-size: 18px;
  font-family: ${({ theme }) => theme.fonts.bold};
  color: ${({ theme }) => theme.colours.active};

  margin: 40px 0 16px;
`;

export const VerticalCard = styled(MoleculeCard).attrs({
  isVertical: true,
})`
  margin-right: 24px;

  width: 146px;
`;

export const GatewayList = styled(
  FlatList as new () => FlatList<Gateway>,
).attrs({
  horizontal: true,
  showsHorizontalScrollIndicator: false,
})``;

export const EndnodeList = styled(
  FlatList as new () => FlatList<Endnode>,
).attrs({
  horizontal: true,
  showsHorizontalScrollIndicator: false,
})``;
