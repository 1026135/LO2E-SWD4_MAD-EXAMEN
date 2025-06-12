// App.tsx
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createDrawerNavigator, DrawerContentScrollView, DrawerItem } from '@react-navigation/drawer';

import LoginScreen from './screens/LoginScreen';
import DashboardScreen from './screens/DashboardScreen';
import LogsScreen from './screens/LogScreen';
import SettingsScreen from './screens/SettingsScreen';
import StatsScreen from './screens/StatsScreen';

const Stack = createNativeStackNavigator();
const Drawer = createDrawerNavigator();

// Custom drawer with Logout
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
        onPress={() => {
          props.navigation.replace('Login'); // go back to login
        }}
      />
    </DrawerContentScrollView>
  );
}

// Drawer navigator shown *after login*
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

// Root app navigation
export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="Dashboard" component={DashboardDrawer} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
