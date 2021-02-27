import theme, {ColorsType} from '@ngevent/styles/theme';
import {SCREEN_HEIGHT, SCREEN_WIDTH} from '@ngevent/utils/constants';
import * as React from 'react';
import {Platform, StatusBar, View} from 'react-native';

const X_WIDTH = 375;
const X_HEIGHT = 812;

const XSMAX_WIDTH = 414;
const XSMAX_HEIGHT = 896;

let isIphoneX = false;

if (Platform.OS === 'ios' && !Platform.isPad && !Platform.isTVOS) {
  isIphoneX =
    (SCREEN_WIDTH === X_WIDTH && SCREEN_HEIGHT === X_HEIGHT) ||
    (SCREEN_WIDTH === XSMAX_WIDTH && SCREEN_HEIGHT === XSMAX_HEIGHT);
}

export function getStatusBarHeight(skipAndroid: boolean = false) {
  if (Platform.OS === 'ios') {
    return isIphoneX ? 44 : 20;
  }

  if (skipAndroid) {
    return 0;
  }

  return StatusBar.currentHeight;
}

interface StatusbarProps {
  type?: 'primary' | 'secondary';
  backgroundColor?: ColorsType | 'transparent';
  barStyle?: 'dark-content' | 'light-content' | 'default';
  noStatusbar?: boolean;
}
const Statusbar: React.FC<StatusbarProps> = ({
  type = 'primary',
  backgroundColor,
  barStyle,
  noStatusbar = false,
}) => {
  let customBackgroundColor = 'transparent';

  let barStyleColor = barStyle;

  if (!backgroundColor) {
    if (type === 'primary') {
      customBackgroundColor = theme.colors.primary;
    } else {
      customBackgroundColor = '#fff';
    }
  } else {
    customBackgroundColor =
      backgroundColor === 'transparent'
        ? 'transparent'
        : theme.colors[backgroundColor];
  }

  if (!barStyle) {
    if (type === 'primary') {
      barStyleColor = 'dark-content';
    } else {
      barStyleColor = 'dark-content';
    }
  }

  return (
    <View
      style={{
        backgroundColor: customBackgroundColor,
        height: getStatusBarHeight(noStatusbar),
      }}>
      <StatusBar
        backgroundColor={customBackgroundColor}
        barStyle={barStyleColor}
        translucent
      />
    </View>
  );
};

export default Statusbar;
