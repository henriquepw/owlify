import React from 'react';
/* import { Text } from 'react-native'; */

import * as st from './style';

interface Props {
  text: string;
}

export const Attention: React.FC<Props> = ({ text }) => {
  return (
    <st.container>
      <st.content>{text}</st.content>
    </st.container>
  );
};
