import {CarouselHome, Upcoming} from '@ngevent/components/Home';
import theme, {globalStyles} from '@ngevent/styles/theme';
import * as React from 'react';
import {ScrollView, View} from 'react-native';
import {Text} from 'react-native-paper';

const Home: React.FC = () => {
  return (
    <ScrollView contentContainerStyle={globalStyles.scrollWhite}>
      <Text style={globalStyles.titlePageLarge}>Home</Text>
      <CarouselHome />
      <Upcoming />
    </ScrollView>
  );
};

export default Home;
