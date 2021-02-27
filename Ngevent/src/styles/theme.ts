import {
  Fonts,
  Theme as PaperTheme,
} from 'react-native-paper/lib/typescript/types';
import {configureFonts, DefaultTheme} from 'react-native-paper';
import {StyleSheet} from 'react-native';

export type CustomColors = {
  secondary: string;
  danger: string;
  warning: string;
  secondaryLight: string;
  primaryLight: string;
  accentLight: string;
  dangerLight: string;
  warningLight: string;
  gray: string;
};

export type ColorsType =
  | 'background'
  | 'primary'
  | 'accent'
  | 'danger'
  | 'warning'
  | 'primaryLight'
  | 'accentLight'
  | 'dangerLight'
  | 'warningLight';

type PaperColors = PaperTheme['colors'];
export type Colors = PaperColors & CustomColors;

export interface Theme extends PaperTheme {
  colors: Colors;
}

const PoppinsFont: Fonts = {
  regular: {
    fontFamily: 'Poppins-Regular',
    fontWeight: 'normal',
  },
  medium: {
    fontFamily: 'Poppins-Medium',
    fontWeight: 'normal',
  },
  light: {
    fontFamily: 'Poppins-Light',
    fontWeight: 'normal',
  },
  thin: {
    fontFamily: 'Poppins-Thin',
    fontWeight: 'normal',
  },
};

const theme: Theme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    background: '#FCFCFC',
    primary: 'rgba(37, 212, 235, 1)',
    accent: 'rgba(255, 66, 123, 1)',
    secondary: 'rgba(88, 160, 255, 1)',
    secondaryLight: 'rgba(88, 160, 255, 0.3)',
    danger: 'rgba(230, 57, 71, 1)',
    warning: 'rgba(236, 217, 49, 1)',
    primaryLight: 'rgba(37, 212, 235, 0.3)',
    accentLight: 'rgba(255, 66, 123, 0.3)',
    dangerLight: 'rgba(230, 57, 71, 0.3)',
    warningLight: 'rgba(236, 217, 49, 0.3)',
    gray: 'rgba(79, 79, 79, 1)',
  },
  fonts: configureFonts({
    ios: PoppinsFont,
    android: PoppinsFont,
  }),
};

export const globalStyles = StyleSheet.create({
  shadow: {
    shadowColor: '#9c9c9c',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 4.65,
    elevation: 8,
  },
});

export default theme;
