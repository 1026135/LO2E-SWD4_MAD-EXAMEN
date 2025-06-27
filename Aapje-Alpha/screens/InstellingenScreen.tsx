import React, { useState } from 'react';
import { View, Text, Switch } from 'react-native';
import { instellingenStyles } from '../styles/stylesLight';

export default function InstellingenScreen() {
  const [isEnabled, setIsEnabled] = useState(false);

  const toggleSwitch = () => setIsEnabled((prev) => !prev);

  return (
    <View style={instellingenStyles.container}>
      <Text style={instellingenStyles.title}>Instellingen</Text>

      <View style={instellingenStyles.toggleGroup}>
        <Text style={instellingenStyles.label}>Toggle optie</Text>
        <Switch
          trackColor={{ false: '#767577', true: '#81b0ff' }}
          thumbColor={isEnabled ? '#f5dd4b' : '#f4f3f4'}
          onValueChange={toggleSwitch}
          value={isEnabled}
        />
      </View>

      <Text style={instellingenStyles.statusText}>
        {isEnabled ? 'Ingeschakeld' : 'Uitgeschakeld'}
      </Text>
    </View>
  );
}
