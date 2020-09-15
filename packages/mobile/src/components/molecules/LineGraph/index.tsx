import React from 'react';
import { Grid } from 'react-native-svg-charts';

import * as S from './styles';

interface LineGraphProps {
  data: number[];
  yAxis?: number[];
}

const LineGraph: React.FC<LineGraphProps> = ({ data, yAxis }) => {
  return (
    <S.Container>
      <S.Y
        data={yAxis || data.map(item => Math.floor(item))}
        formatLabel={value => (+value).toFixed(1)}
      />
      <S.Plot data={data}>
        <Grid />
      </S.Plot>
    </S.Container>
  );
};

export default LineGraph;
