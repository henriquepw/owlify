import React, { useCallback, useState } from 'react';
import {
  ViewProps,
  ViewStyle,
  StyleProp,
  NativeSyntheticEvent,
  NativeScrollEvent,
} from 'react-native';

import Header from '@molecules/Header';

import * as S from './styles';

interface TabFragmentProps extends ViewProps {
  headerStyle?: StyleProp<ViewStyle>;
  scrollViewStyle?: StyleProp<ViewStyle>;
  title: string;
}

const TabFragment: React.FC<TabFragmentProps> = ({
  title,
  headerStyle,
  scrollViewStyle,
  children,
  ...rest
}) => {
  const [headerIsElevated, setHeaderIsElevated] = useState(false);

  const handleOnScroll = useCallback(
    ({ nativeEvent }: NativeSyntheticEvent<NativeScrollEvent>) => {
      if (nativeEvent.contentOffset.y === 0 && headerIsElevated) {
        setHeaderIsElevated(false);
        return;
      }

      if (!headerIsElevated) {
        setHeaderIsElevated(true);
      }
    },
    [headerIsElevated],
  );

  return (
    <S.Container {...rest}>
      <Header style={headerStyle} isElevated={headerIsElevated}>
        {title}
      </Header>

      <S.ScrollView style={scrollViewStyle} onScroll={handleOnScroll}>
        {children}
      </S.ScrollView>
    </S.Container>
  );
};

export default TabFragment;
