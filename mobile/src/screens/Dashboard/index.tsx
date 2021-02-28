import Statusbar from '@ngevent/components/BaseComponent/Statusbar';
import * as React from 'react';
import {useTheme} from 'react-native-paper';
import {
  AnimatedTabBarNavigator,
  DotSize,
  TabElementDisplayOptions,
} from 'react-native-animated-nav-tab-bar';
import Home from './Home';
import Icon from 'react-native-vector-icons/Feather';
import {globalStyles} from '@ngevent/styles/theme';
import Profile from './Profile';
import {Alert, BackHandler} from 'react-native';

const Tabs = AnimatedTabBarNavigator();

const Dashboard: React.FC = () => {
  const {colors} = useTheme();
  React.useEffect(() => {
    const backAction = () => {
      Alert.alert('Confirmation!', 'Are you sure to exit application?', [
        {
          text: 'No',
          onPress: () => null,
          style: 'cancel',
        },
        {text: 'Yes', onPress: () => BackHandler.exitApp()},
      ]);
      return true;
    };

    const backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      backAction,
    );

    return () => backHandler.remove();
  }, []);
  return (
    <>
      <Statusbar type="secondary" backgroundColor="background" />
      <Tabs.Navigator
        appearence={{
          shadow: false,
          floating: true,
          whenActiveShow: TabElementDisplayOptions.BOTH,
          dotSize: DotSize.SMALL,
          activeTabBackgrounds: colors.primaryLight,
        }}
        tabBarOptions={{
          activeTintColor: '#000',
          inactiveTintColor: '#9c9c9c',
        }}>
        <Tabs.Screen
          name="Home"
          component={Home}
          options={{
            tabBarIcon: ({focused, color}) => (
              <Icon name="home" size={24} color={color} />
            ),
          }}
        />
        <Tabs.Screen
          name="Search"
          component={Home}
          options={{
            tabBarIcon: ({focused, color}) => (
              <Icon name="search" size={24} color={color} />
            ),
          }}
        />
        <Tabs.Screen
          name="Booked"
          component={Home}
          options={{
            tabBarIcon: ({focused, color}) => (
              <Icon name="calendar" size={24} color={color} />
            ),
          }}
        />
        <Tabs.Screen
          name="Profile"
          component={Profile}
          options={{
            tabBarIcon: ({focused, color}) => (
              <Icon name="user" size={24} color={color} />
            ),
          }}
        />
      </Tabs.Navigator>
    </>
  );
};

export default Dashboard;
