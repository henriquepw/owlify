import styled from 'styled-components/native';

import Buttom from '@atoms/Button';
import AtomInput from '@atoms/Input';

interface DividerProps {
  marginVertical?: number;
}

export const Divider = styled.View<DividerProps>`
  width: 95%;
  height: 1px;

  background: ${({ theme }) => theme.colours.withoutFocus};
  opacity: 0.6;

  margin: ${({ marginVertical }) => marginVertical ?? 24}px auto;
`;

export const SecondaryInput = styled(AtomInput)`
  margin-top: 16px;
`;

export const UpdatedButton = styled(Buttom)`
  margin-top: 24px;
`;

export const AttentionButton = styled(Buttom).attrs({
  type: 'attention',
})`
  margin-bottom: 16px;

  height: 40px;
`;
