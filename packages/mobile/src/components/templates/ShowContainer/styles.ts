import { Animated } from 'react-native';
import FeatherIcon from 'react-native-vector-icons/Feather';
import styled from 'styled-components/native';

export const Container = styled.View`
  flex: 1;

  background: ${({ theme }) => theme.colours.background};
`;

export const Header = styled(Animated.View)`
  position: absolute;

  width: 100%;
  background: ${({ theme }) => theme.colours.active};

  padding-top: 24px;

  z-index: 5;
`;

export const Icon = styled(FeatherIcon)`
  color: ${({ theme }) => theme.colours.background};
`;

export const HeaderContent = styled.View`
  flex-direction: row;
  align-items: center;

  margin: 32px 40px;
`;

export const HeaderTextContainer = styled.View`
  flex: 1;
  margin: 0 24px;
`;

export const HeaderTitle = styled.Text`
  color: ${({ theme }) => theme.colours.background};
  font-family: ${({ theme }) => theme.fonts.regular};
  font-size: 18px;

  margin-bottom: 8px;
`;

export const HeaderDescription = styled.Text`
  color: ${({ theme }) => theme.colours.background};
  font-family: ${({ theme }) => theme.fonts.regular};
  font-size: 14px;
  opacity: 0.8;
`;

export const HeaderFooter = styled.View`
  align-items: center;

  background: ${({ theme }) => theme.colours.background};

  height: 32px;
  border-top-left-radius: 32px;
  border-top-right-radius: 32px;
`;

export const HeaderPuller = styled.View`
  margin-top: 8px;
  opacity: 0.4;

  width: 64px;
  height: 4px;
  border-radius: 2px;
  background: ${({ theme }) => theme.colours.withoutFocus};
`;

export const ScrollView = styled(Animated.ScrollView).attrs(({ theme }) => ({
  showsVerticalScrollIndicator: false,
  contentContainerStyle: {
    paddingVertical: 32,
    marginTop: 192,
    paddingBottom: 216,
    backgroundColor: theme.colours.background,
  },
}))``;
