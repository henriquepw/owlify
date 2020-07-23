import 'styled-components';

import { FontsTheme, ColoursTheme } from '@styles/themes';

declare module 'styled-components' {
  export interface DefaultTheme {
    fonts: FontsTheme;
    colours: ColoursTheme;
  }
}
