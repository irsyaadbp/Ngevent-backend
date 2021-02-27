import theme from '@ngevent/styles/theme';
import * as React from 'react';
import {View} from 'react-native';
import {Text} from 'react-native-paper';

const Home: React.FC = () => {
  return (
    <View
      style={{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: theme.colors.background,
      }}>
      <Text>Home</Text>
    </View>
  );
};

export default Home;
