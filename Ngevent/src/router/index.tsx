import * as React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {Dashboard, Login, Register, SplashScreen} from '@ngevent/screens';

const RouteStack = createStackNavigator();

const Router: React.FC = () => {
  return (
    <RouteStack.Navigator initialRouteName="Splash Screen" headerMode="none">
      <RouteStack.Screen name="Splash Screen" component={SplashScreen} />
      <RouteStack.Screen name="Login" component={Login} />
      <RouteStack.Screen name="Register" component={Register} />
      <RouteStack.Screen name="Dashboard" component={Dashboard} />
    </RouteStack.Navigator>
  );
};

export default Router;
