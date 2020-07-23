import styled from 'styled-components/native';

export const Container = styled.View`
  flex: 1;
`;

export const ScrollView = styled.ScrollView.attrs({
  showsVerticalScrollIndicator: false,
  contentContainerStyle: {
    paddingBottom: 24,
  },
})`
  flex: 1;
`;
