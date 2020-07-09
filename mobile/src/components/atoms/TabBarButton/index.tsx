import React from 'react';

import {
  BottomTabBarProps,
  BottomTabNavigationOptions,
} from '@react-navigation/bottom-tabs';

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
  navigation,
  iconName,
  routeKey,
  routeName,
  routeIndex,
}) => {
  const label = options.tabBarLabel || options.title || routeName;
  const isFocused = state.index === routeIndex;
  const isRegistrationPage = iconName === 'plus';

  function onPress(): void {
    const event = navigation.emit({
      type: 'tabPress',
      target: routeKey,
      canPreventDefault: true,
    });

    if (!isFocused && !event.defaultPrevented) {
      navigation.navigate(routeName);
    }
  }

  // function onLongPress(): void {
  //   navigation.emit({
  //     type: 'tabLongPress',
  //     target: routeKey,
  //   });
  // }

  return (
    <S.Container
      accessibilityLabel={options.tabBarAccessibilityLabel}
      testID={options.tabBarTestID}
      onPress={onPress}
      // onLongPress={onLongPress}
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
