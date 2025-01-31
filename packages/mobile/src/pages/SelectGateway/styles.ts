import { FlatList } from 'react-native';
import styled from 'styled-components/native';

import MoleculeCard from '@molecules/Card';

import { Gateway } from '@utils/interfaces';

export const Container = styled.View`
  flex: 1;
`;

export const BackgroundContainer = styled.View.attrs({
  pointerEvents: 'none',
})`
  position: absolute;

  left: 0;
  bottom: 0;

  z-index: 1;
`;

export const BackgroundImage = styled.Image.attrs({
  pointerEvents: 'none',
})`
  position: absolute;

  left: 0;
  bottom: 0;
`;

export const List = styled(FlatList as new () => FlatList<Gateway>).attrs({
  contentContainerStyle: {
    padding: 32,
  },
})`
  flex: 1;
`;

export const Card = styled(MoleculeCard)`
  margin-top: 16px;
`;

export const ButtonContainer = styled.View`
  padding: 32px;

  z-index: 2;
`;
