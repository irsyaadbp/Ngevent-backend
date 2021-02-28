import theme, {globalStyles} from '@ngevent/styles/theme';
import {SCREEN_WIDTH} from '@ngevent/utils/constants';
import * as React from 'react';
import {StyleSheet, TouchableOpacity, View} from 'react-native';
import FastImage from 'react-native-fast-image';
import {AdditionalParallaxProps} from 'react-native-snap-carousel';
import LinearGradient from 'react-native-linear-gradient';
import {Badge, useTheme} from 'react-native-paper';

import {Text} from 'react-native-paper';
import {BadgePrice} from '@ngevent/components/BaseComponent';
import {EventData} from '@ngevent/api/event';
import {formatDate} from '@ngevent/utils/common';

export type CarouselData = EventData;
interface SliderItemProps {
  data: CarouselData;
  parallax?: boolean;
  onPress?: () => void;
  parallaxProps?: AdditionalParallaxProps;
}
const SliderItem: React.FC<SliderItemProps> = ({data, onPress}) => {
  const {colors} = useTheme();
  return (
    <TouchableOpacity
      activeOpacity={1}
      style={styles.slideInnerContainer}
      onPress={onPress}>
      <FastImage source={{uri: data.poster}} style={styles.image} />
      <LinearGradient
        colors={['black', 'rgba(79, 79, 79, 0.2)']}
        start={{x: 0, y: 1}}
        end={{x: 0, y: 0}}
        style={styles.containerContent}>
        <BadgePrice price={data.ticket_price} style={styles.badgePrice} />
        <View style={styles.description}>
          <Badge visible style={globalStyles.badge} size={28}>
            {data.category.category_name}
          </Badge>
          <Text
            style={[globalStyles.titleSmall, {color: colors.background}]}
            numberOfLines={1}>
            {data.event_name}
          </Text>
          <Text style={styles.subtitle} numberOfLines={1}>
            {data.location}, {formatDate(data.event_date)}
          </Text>
        </View>
      </LinearGradient>
    </TouchableOpacity>
  );
};

function wp(percentage: number) {
  const value = (percentage * SCREEN_WIDTH) / 100;
  return Math.round(value);
}

export const slideHeight = 350;
const slideWidth = wp(85);
const itemHorizontalMargin = wp(2);

export const sliderWidth = SCREEN_WIDTH;
export const itemWidth = slideWidth + itemHorizontalMargin * 2;
const entryBorderRadius = 16;

const styles = StyleSheet.create({
  slideInnerContainer: {
    width: itemWidth,
    height: slideHeight,
    paddingHorizontal: itemHorizontalMargin,
    paddingBottom: 18,
    justifyContent: 'center',
    borderRadius: 16,
    position: 'relative',
  },
  shadow: {
    position: 'absolute',
    top: 0,
  },
  image: {
    ...StyleSheet.absoluteFillObject,
    resizeMode: 'cover',
    borderRadius: entryBorderRadius,
  },
  containerContent: {
    ...StyleSheet.absoluteFillObject,
    borderRadius: entryBorderRadius,
  },
  badgePrice: {position: 'absolute', top: 16, left: 16},

  description: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    padding: 16,
  },
  subtitle: {color: theme.colors.background, marginBottom: 8, marginTop: 4},
});

export default SliderItem;
