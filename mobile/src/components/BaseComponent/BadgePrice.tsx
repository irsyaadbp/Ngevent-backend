import theme from '@ngevent/styles/theme';
import * as React from 'react';
import {StyleProp, StyleSheet, View, ViewStyle} from 'react-native';
import {Text} from 'react-native-paper';

interface BadgePriceProps {
  price: number;
  style?: StyleProp<ViewStyle>;
}
const BadgePrice: React.FC<BadgePriceProps> = ({price, style}) => {
  return (
    <View style={[styles.badge, style]}>
      <Text style={styles.price}>${price}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  badge: {
    backgroundColor: theme.colors.warning,
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 16,
    alignSelf: 'baseline',
  },
  price: {
    fontWeight: 'bold',
    fontSize: 16,
  },
});

export default BadgePrice;
