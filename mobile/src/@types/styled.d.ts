import 'styled-components';

declare module 'styled-components' {
  export interface DefaultTheme {
    fonts: {
      regular: string;
      bold: string;
    };
    colors: {
      active: string;
      activeLight: string;
      background: string;
      secondaryText: string;
      attention: string;
      card: string;
    };
  }
}
