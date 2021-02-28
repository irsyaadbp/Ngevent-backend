import theme, {globalStyles} from '@ngevent/styles/theme';
import * as React from 'react';
import {Alert, StyleProp, StyleSheet, View, ViewStyle} from 'react-native';
import Carousel, {AdditionalParallaxProps} from 'react-native-snap-carousel';
import {useQuery} from 'react-query';
import SliderItem, {
  CarouselData,
  itemWidth,
  sliderWidth,
  slideHeight,
} from './SliderItem';
import {EventData, getAllEvents} from '@ngevent/api/event';
import {ActivityIndicator, Text, useTheme} from 'react-native-paper';

export const ENTRIES1 = [
  {
    id: 9,
    event_name: 'Konser UWU',
    poster:
      'http://res.cloudinary.com/qolbu/image/upload/v1614371544/27-02-2021_3706981709_ceb7ab.jpg',
    location: 'Singapore',
    description: 'adahksda',
    event_date: '2021-02-28T18:28:05.044Z',
    category_id: 1,
    ticket_price: 60.0,
    created_at: '2021-02-26T13:32:25.196Z',
    updated_at: '2021-02-26T13:32:25.196Z',
    category: {
      id: 1,
      category_name: 'Music',
      description: 'The good music',
      created_at: '2021-02-26T13:02:10.010Z',
      updated_at: '2021-02-26T13:02:10.010Z',
    },
  },
  {
    id: 1,
    event_name: 'Konser',
    poster:
      'http://res.cloudinary.com/qolbu/image/upload/v1614369737/27-02-2021_3706981709_z1aeot.jpg',
    location: 'Jakarta',
    description: 'UWUDASDAJSD',
    event_date: '2021-02-26T18:28:05.044Z',
    category_id: 1,
    ticket_price: 24.0,
    created_at: '2021-02-26T13:02:18.412Z',
    updated_at: '2021-02-26T13:02:18.412Z',
    category: {
      id: 1,
      category_name: 'Music',
      description: 'The good music',
      created_at: '2021-02-26T13:02:10.010Z',
      updated_at: '2021-02-26T13:02:10.010Z',
    },
  },
];

export interface CarouselHomeProps {
  style?: StyleProp<ViewStyle>;
}
const CarouselHome: React.FC<CarouselHomeProps> = ({style}) => {
  const {colors} = useTheme();
  const sliderRef = React.useRef<Carousel<CarouselData>>(null);
  // const [sliderActive, setSliderActive] = React.useState<number>(0);

  const {data, isLoading, refetch} = useQuery(
    ['events', {orderBy: 'asc', page: 1, sortBy: 'event_date'}],
    ({queryKey}) => getAllEvents(queryKey[1]),
  );

  const renderSliderItem = React.useCallback(
    (
      {item}: {item: CarouselData; index: number},
      parallaxProps?: AdditionalParallaxProps | undefined,
    ) => {
      return (
        <SliderItem
          data={item}
          parallaxProps={parallaxProps}
          onPress={() => Alert.alert('Pressed')}
        />
      );
    },
    [],
  );

  const renderCarousel = React.useCallback(() => {
    if (isLoading) {
      return (
        <View style={styles.loading}>
          <ActivityIndicator color={colors.background} />
        </View>
      );
    }

    return (
      <Carousel
        ref={sliderRef}
        data={data?.data || ([] as EventData[])}
        renderItem={renderSliderItem}
        sliderWidth={sliderWidth}
        itemWidth={itemWidth}
        firstItem={0}
        inactiveSlideScale={0.94}
        inactiveSlideOpacity={0.7}
        containerCustomStyle={styles.slider}
        autoplay={true}
        autoplayDelay={1500}
        autoplayInterval={3500}
        // onSnapToItem={(index) => setSliderActive(index)}
      />
    );
  }, [colors.background, data, isLoading, renderSliderItem]);

  return (
    <View style={style}>
      <Text style={[globalStyles.titleSection]}>For You</Text>
      {renderCarousel()}
    </View>
  );
};

const styles = StyleSheet.create({
  slider: {
    overflow: 'visible', // for custom animations
  },
  loading: {
    width: itemWidth,
    height: slideHeight,
    backgroundColor: theme.colors.grayLight,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 16,
    marginHorizontal: 16,
    marginTop: 16,
  },
});

export default CarouselHome;
