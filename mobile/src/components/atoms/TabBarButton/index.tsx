import React from 'react';

import {
  BottomTabBarProps,
  BottomTabNavigationOptions,
} from '@react-navigation/bottom-tabs';
import { useNavigation } from '@react-navigation/native';

import * as S from './styles';

interface TabBarButtonProps extends Omit<BottomTabBarProps, 'descriptors'> {
  iconName: string;
  routeKey: string;
  routeName: string;
  routeIndex: number;
  options: BottomTabNavigationOptions;
}

const TabBarButton: React.FC<TabBarButtonProps> = ({
  state,
  options,
  navigation: tabBarNavigation,
  iconName,
  routeKey,
  routeName,
  routeIndex,
}) => {
  const rootNavigation = useNavigation();

  const label = options.tabBarLabel || options.title || routeName;
  const isFocused = state.index === routeIndex;
  const isRegistrationPage = iconName === 'plus';

  function onPress(): void {
    const event = tabBarNavigation.emit({
      type: 'tabPress',
      target: routeKey,
      canPreventDefault: true,
    });

    if (isRegistrationPage) {
      rootNavigation.navigate('Registration');
      return;
    }

    if (!isFocused && !event.defaultPrevented) {
      tabBarNavigation.navigate(routeName);
    }
  }

  return (
    <S.Container
      accessibilityLabel={options.tabBarAccessibilityLabel}
      testID={options.tabBarTestID}
      onPress={onPress}
      style={{ flex: 1 }}
    >
      <S.Content isRegistrationPage={isRegistrationPage}>
        <S.Icon
          name={iconName}
          size={24}
          isFocused={isFocused}
          isRegistrationPage={isRegistrationPage}
        />

        {!isRegistrationPage && isFocused && <S.Label>{label}</S.Label>}
      </S.Content>
    </S.Container>
  );
};

export default TabBarButton;
