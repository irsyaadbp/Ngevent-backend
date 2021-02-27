import {SCREEN_HEIGHT, SCREEN_WIDTH} from '@ngevent/utils/constants';
import * as React from 'react';
import {StyleSheet, View} from 'react-native';
import {ActivityIndicator, useTheme} from 'react-native-paper';

const LoadingBlock: React.FC = () => {
  const {colors} = useTheme();
  return (
    <View style={styles.loadingContainer}>
      <ActivityIndicator color={colors.background} size="large" />
    </View>
  );
};
const styles = StyleSheet.create({
  loadingContainer: {
    position: 'absolute',
    width: SCREEN_WIDTH,
    height: SCREEN_HEIGHT,
    backgroundColor: 'rgba(52, 52, 52, 0.4)',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    zIndex: 99999,
  },
});

export default LoadingBlock;
