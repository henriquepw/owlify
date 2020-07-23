export const light = {
  fonts: {
    regular: 'Lato-Regular',
    bold: 'Lato-Bold',
  },
  colours: {
    active: '#6BA7AF',
    activeLight: '#A2CEDE',
    background: '#F3F3F3',
    withoutFocus: '#878787',
    attention: '#B24444',
    card: '#FBFBFB',
  },
};

export type FontsTheme = typeof light.fonts;
export type ColoursTheme = typeof light.colours;
