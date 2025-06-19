// navigation/DrawerNavigator.tsx
import React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import Dashboard from '../screens/Dashboard';
import Actielogboek from '../screens/Actielogboek';
import Statistieken from '../screens/Statistieken';
import Instellingen from '../screens/Instellingen';
import { View, Button } from 'react-native';

const Drawer = createDrawerNavigator();

export default function DrawerNavigator({ navigation }: any) {
  return (
    <Drawer.Navigator>
      <Drawer.Screen name="Home" component={Dashboard} />
      <Drawer.Screen name="Actielogboek" component={Actielogboek} />
      <Drawer.Screen name="Statistieken" component={Statistieken} />
      <Drawer.Screen name="Instellingen" component={Instellingen} />
      <Drawer.Screen
        name="Logout"
        component={() => (
          <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <Button title="Bevestig uitloggen" onPress={() => navigation.replace('Login')} />
          </View>
        )}
      />
    </Drawer.Navigator>
  );
}
