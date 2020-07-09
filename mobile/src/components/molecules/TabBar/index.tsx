import React from 'react';

import { BottomTabBarProps } from '@react-navigation/bottom-tabs';

import TabBarButton from '@atoms/TabBarButton';

import { Container } from './styles';

interface TabBarProps extends BottomTabBarProps {
  iconNames: string[];
}

const TabBar: React.FC<TabBarProps> = ({
  state,
  descriptors,
  iconNames,
  navigation,
}) => {
  const focusedOptions = descriptors[state.routes[state.index].key].options;

  if (!focusedOptions) return null;

  return (
    <Container>
      {state.routes.map((route, index) => (
        <TabBarButton
          key={route.key}
          state={state}
          navigation={navigation}
          options={descriptors[route.key].options}
          iconName={iconNames[index]}
          routeIndex={index}
          routeKey={route.key}
          routeName={route.name}
        />
      ))}
    </Container>
  );
};

export default TabBar;
