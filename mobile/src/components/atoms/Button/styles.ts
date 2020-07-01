import styled from 'styled-components/native';

interface propsStyledButton {
  optionsButtom: string;
  hasIcon?: boolean;
}

export const Container = styled.View<propsStyledButton>`
  background-color: ${({ theme, optionsButtom }) => {
    if (optionsButtom === 'Focused') return theme.colors.background;
    if (optionsButtom === 'Errored') return theme.colors.attention;
    if (optionsButtom === 'Filled') return theme.colors.active;

    return theme.colors.withoutFocus;
  }};
  display: flex;
  width: 80%;
  height: ${(props) => (props.hasIcon ? '30%' : '10%')};
  justify-content: center;
  align-items: center;
  border-radius: 10px;
`;

export const Content = styled.Text`
  color: ${({ theme }) => theme.colors.background};
  font-family: ${({ theme }) => theme.fonts.regular};
  font-size: 16px;
`;

export const IconContainer = styled.View`
  margin: 20px;
`;
