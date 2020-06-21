import React from 'react';
/* import { Text } from 'react-native'; */

import * as st from './style';

interface Props {
  text: string;
}

export const WithIcon: React.FC<Props> = ({ text }) => {
  return (
    <st.container>
      <st.icon>Icone aqui</st.icon>
      <st.content>{text}</st.content>
    </st.container>
  );
};
