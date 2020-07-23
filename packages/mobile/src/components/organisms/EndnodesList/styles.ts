import { FlatList } from 'react-native-gesture-handler';
import styled from 'styled-components';

import MoleculeCard from '@molecules/Card';

import { Endnode } from '@utils/interfaces';

const VerticalListOptions = {
  horizontal: true,
  showsHorizontalScrollIndicator: false,
  contentContainerStyle: {
    paddingLeft: 24,
    paddingBottom: 8,
  },
};

export const VerticalCard = styled(MoleculeCard).attrs({
  isVertical: true,
})`
  height: 176px;
  width: 152px;

  margin-right: 24px;

  elevation: 2;
  shadow-color: #000;
  shadow-opacity: 0.1;
  shadow-offset: 2px 2px;
`;

export const Container = styled(FlatList as new () => FlatList<Endnode>).attrs(
  VerticalListOptions,
)``;
