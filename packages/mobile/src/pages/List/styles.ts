import { FlatList } from 'react-native';
import styled from 'styled-components/native';

import MoleculeCard from '@molecules/Card';

import { Gateway } from '@utils/interfaces';

const VerticalListOptions = {
  horizontal: true,
  showsHorizontalScrollIndicator: false,
  contentContainerStyle: {
    paddingLeft: 24,
    paddingBottom: 8,
  },
};

export const SessionTitle = styled.Text`
  font-size: 18px;
  font-family: ${({ theme }) => theme.fonts.bold};
  color: ${({ theme }) => theme.colours.active};

  margin: 32px 0 16px 24px;
`;

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

export const GatewayList = styled(
  FlatList as new () => FlatList<Gateway>,
).attrs(VerticalListOptions)``;
