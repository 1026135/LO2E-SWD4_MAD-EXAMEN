import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createDrawerNavigator, DrawerContentScrollView, DrawerItem } from '@react-navigation/drawer';

import LoginScreen from './screens/LoginScreen';
import DashboardScreen from './screens/DashboardScreen';
import LogsScreen from './screens/LogsScreen';
import SettingsScreen from './screens/SettingsScreen';
import StatsScreen from './screens/StatsScreen';

const Stack = createNativeStackNavigator();
const Drawer = createDrawerNavigator();

function CustomDrawerContent(props) {
  return (
    <DrawerContentScrollView {...props}>
      {props.state.routeNames.map((name, index) =>
        name !== 'Logout' ? (
          <DrawerItem
            key={index}
            label={name}
            onPress={() => props.navigation.navigate(name)}
          />
        ) : null
      )}
      <DrawerItem
        label="Logout"
        onPress={() => {
          props.navigation.closeDrawer();
          props.navigation.replace('Login');
        }}
      />
    </DrawerContentScrollView>
  );
}

function DashboardDrawer() {
  return (
    <Drawer.Navigator drawerContent={props => <CustomDrawerContent {...props} />}>
      <Drawer.Screen name="Dashboard" component={DashboardScreen} />
      <Drawer.Screen name="Logs" component={LogsScreen} />
      <Drawer.Screen name="Settings" component={SettingsScreen} />
      <Drawer.Screen name="Stats" component={StatsScreen} />
    </Drawer.Navigator>
  );
}

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login" screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="Dashboard" component={DashboardDrawer} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

