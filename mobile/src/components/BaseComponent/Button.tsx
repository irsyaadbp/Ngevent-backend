import {ColorsType, globalStyles} from '@ngevent/styles/theme';
import * as React from 'react';
import {Animated, StyleProp, ViewStyle} from 'react-native';
import {Button as ButtonPaper, useTheme} from 'react-native-paper';

interface IButtonProps {
  mode?: 'text' | 'outlined' | 'contained' | undefined;
  onPress?: (() => void) | undefined;
  labelColor?: ColorsType | undefined;
  shadow?: boolean;
  style?: Animated.WithAnimatedValue<StyleProp<ViewStyle>> | undefined;
  background?: ColorsType | undefined;
}
const Button: React.FC<IButtonProps> = ({
  mode = 'contained',
  labelColor = '',
  shadow = true,
  style,
  onPress,
  children,
  background,
}) => {
  const {colors} = useTheme();

  const styleShadow = React.useMemo(() => {
    if (mode !== 'text' && shadow) {
      return globalStyles.shadow;
    }
    return {};
  }, [mode, shadow]);

  const colorLabel = React.useMemo(() => {
    if (!labelColor && mode === 'text') {
      return colors.primary;
    } else if (labelColor) {
      return colors[labelColor];
    }
    return colors.background;
  }, [labelColor, mode, colors]);

  const backgroundColor = React.useMemo(() => {
    if (mode === 'text' && !background) {
      return colorLabel;
    } else if (background) {
      return colors[background];
    }
    return colors.primary;
  }, [background, colorLabel, colors, mode]);

  return (
    <ButtonPaper
      mode={mode}
      onPress={onPress}
      uppercase={false}
      labelStyle={{color: colorLabel}}
      color={backgroundColor}
      style={[styleShadow, style]}>
      {children}
    </ButtonPaper>
  );
};

export default Button;
