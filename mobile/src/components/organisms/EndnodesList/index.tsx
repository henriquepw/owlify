import React from 'react';

import { Endnode } from '@utils/interfaces';

import * as S from './styles';

interface EndnodeList {
  data: Endnode[];
}

const EndnodesList: React.FC<EndnodeList> = ({ data }) => {
  return (
    <S.Container
      data={data}
      keyExtractor={(endnode) => endnode.id}
      renderItem={({ item }) => (
        <S.VerticalCard
          iconName="endnode"
          title={item.name}
          subTitle={item.room}
        />
      )}
    />
  );
};

export default EndnodesList;
