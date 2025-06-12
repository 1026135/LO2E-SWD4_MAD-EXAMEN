// Navigation.tsx
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createDrawerNavigator, DrawerContentScrollView, DrawerItem } from '@react-navigation/drawer';

import LoginScreen      from './screens/LoginScreen';
import DashboardScreen  from './screens/DashboardScreen';
import LogsScreen       from './screens/LogScreen';
import SettingsScreen   from './screens/SettingsScreen';
import StatsScreen      from './screens/StatsScreen';

export type RootStackParamList = {
  Login: undefined;
  Dashboard: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();
const Drawer = createDrawerNavigator();

function CustomDrawerContent(props: any) {
  return (
    <DrawerContentScrollView {...props}>
      {props.state.routeNames.map((name: string, index: number) => (
        <DrawerItem
          key={index}
          label={name}
          onPress={() => props.navigation.navigate(name)}
        />
      ))}
      <DrawerItem
        label="Logout"
        onPress={() => props.navigation.replace('Login')}
      />
    </DrawerContentScrollView>
  );
}

function DashboardDrawer() {
  return (
    <Drawer.Navigator
      initialRouteName="Dashboard"
      drawerContent={(props) => <CustomDrawerContent {...props} />}
    >
      <Drawer.Screen name="Dashboard" component={DashboardScreen} />
      <Drawer.Screen name="Logs" component={LogsScreen} />
      <Drawer.Screen name="Settings" component={SettingsScreen} />
      <Drawer.Screen name="Stats" component={StatsScreen} />
    </Drawer.Navigator>
  );
}

export default function Navigation() {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="Dashboard" component={DashboardDrawer} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
