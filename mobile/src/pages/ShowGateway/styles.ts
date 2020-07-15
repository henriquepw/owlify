import FeatherIcon from 'react-native-vector-icons/Feather';
import styled from 'styled-components/native';

export const Container = styled.View`
  flex: 1;

  background: ${({ theme }) => theme.colours.attention};
`;

export const Header = styled.View`
  position: absolute;

  width: 100%;
  background: ${({ theme }) => theme.colours.active};

  padding: 24px;
`;

export const GoBackButton = styled(FeatherIcon)`
  color: ${({ theme }) => theme.colours.background};
`;

export const HeaderContent = styled.View`
  flex-direction: row;
  align-items: center;

  margin: 32px 16px 64px;
`;

export const HeaderTextContainer = styled.View`
  margin: 0 24px;
`;

export const HeaderTitle = styled.Text`
  color: ${({ theme }) => theme.colours.background};
  font-family: ${({ theme }) => theme.fonts.regular};
  font-size: 18px;

  margin-bottom: 8px;
`;

export const HeaderSubTitle = styled.Text`
  color: ${({ theme }) => theme.colours.background};
  font-family: ${({ theme }) => theme.fonts.regular};
  font-size: 14px;
  opacity: 0.8;
`;

export const ScrollView = styled.ScrollView.attrs(({ theme }) => ({
  showsVerticalScrollIndicator: false,
  contentContainerStyle: {
    alignItems: 'center',
    padding: 32,
    marginTop: 192,
    paddingBottom: 216,
    borderRadius: 48,
    backgroundColor: theme.colours.background,
  },
}))``;
