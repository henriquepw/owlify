import React from 'react';

import TabFragment from '@templates/TabFragment';

import NothingHere from '@assets/Icons/NothingHere.png';

import * as S from './styles';

const Notifications: React.FC = () => {
  return (
    <TabFragment title="Notifications">
      <S.Container isEmpty>
        <S.WarningIcon source={NothingHere} />
      </S.Container>
    </TabFragment>
  );
};

export default Notifications;
