import {
  Fonts,
  Theme as PaperTheme,
} from 'react-native-paper/lib/typescript/types';
import {configureFonts, DefaultTheme} from 'react-native-paper';
import {StyleSheet} from 'react-native';
import {SCREEN_HEIGHT} from '@ngevent/utils/constants';
import {Colors} from 'react-native/Libraries/NewAppScreen';

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
  grayLight: string;
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
  | 'warningLight'
  | 'grayLight';

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
    primaryLight: '#ACE0E7',
    accentLight: 'rgba(255, 66, 123, 0.3)',
    dangerLight: 'rgba(230, 57, 71, 0.3)',
    warningLight: 'rgba(236, 217, 49, 0.3)',
    gray: 'rgba(79, 79, 79, 1)',
    grayLight: '#E5E5E5',
  },
  fonts: configureFonts({
    ios: PoppinsFont,
    android: PoppinsFont,
  }),
};

export const globalStyles = StyleSheet.create({
  shadow: {
    shadowColor: theme.colors.grayLight,
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.2,
    shadowRadius: 6,
    elevation: 6,
  },
  screensWhite: {
    flex: 1,
    paddingTop: 16,
    paddingBottom: 60,
    backgroundColor: theme.colors.background,
  },
  scrollWhite: {
    paddingTop: 16,
    paddingBottom: 100,
    backgroundColor: theme.colors.background,
  },
  titlePageLarge: {
    fontSize: 36,
    fontWeight: 'bold',
    marginHorizontal: 16,
    marginBottom: 32,
    marginTop: 16,
  },
  titleLarge: {
    fontSize: 36,
    fontWeight: 'bold',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  titleSection: {
    marginHorizontal: 16,
    marginBottom: 16,
    fontSize: 24,
    fontWeight: 'bold',
  },
  titleSmall: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  badge: {
    paddingHorizontal: 16,
    backgroundColor: theme.colors.secondary,
    color: theme.colors.background,
    alignSelf: 'flex-start',
    marginBottom: 8,
  },
  card: {
    // shadowColor: theme.colors.grayLight,
    // shadowOffset: {
    //   width: 0,
    //   height: 4,
    // },
    // shadowOpacity: 0.2,
    // shadowRadius: 6,
    // elevation: 6,
    borderWidth: 1,
    borderColor: theme.colors.gray,
    flexDirection: 'row',
    padding: 12,
    backgroundColor: '#fff',
    marginHorizontal: 16,
    borderRadius: 16,
  },
});

export default theme;
