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
      withoutFocus: string;
      attention: string;
      card: string;
    };
  }
}
