import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, ActivityIndicator } from 'react-native';
import { logboekStyles } from '../styles/stylesLight';
import GlassButton from '../components/GlassButton';

export default function LogboekScreen() {
  const [logs, setLogs] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);

  const fetchLogs = async () => {
    setLoading(true);
    try {
      const response = await fetch('https://to.internus.info/api/monkeyalpha');
      const data = await response.json();
      const logArray = Array.isArray(data) ? data : [data];
      setLogs(
        logArray.sort(
          (a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime()
        )
      );
    } catch (error) {
      console.error('❌ Fout bij ophalen logs:', error);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchLogs();
  }, []);

  return (
    <View style={logboekStyles.container}>
      <Text style={logboekStyles.title}>Logboek</Text>

      {/* Replace default Button with GlassButton */}
      <GlassButton onPress={fetchLogs} title="Ververs logboek" />

      {loading ? (
        <ActivityIndicator style={{ marginTop: 20 }} />
      ) : logs.length === 0 ? (
        <Text style={{ marginTop: 20 }}>Geen logboekgegevens beschikbaar.</Text>
      ) : (
        <FlatList
          data={logs}
          keyExtractor={(item) => item.id?.toString()}
          contentContainerStyle={{ paddingTop: 20 }}
          renderItem={({ item }) => (
            <View style={logboekStyles.logItem}>
              <Text style={logboekStyles.row}>
                Gebruiker: <Text style={logboekStyles.bold}>{item.user}</Text>
              </Text>
              <Text style={logboekStyles.row}>
                Commando: <Text style={logboekStyles.command}>{item.command}</Text>
              </Text>
              <Text style={logboekStyles.timestamp}>
                Datum {new Date(item.timestamp).toLocaleString()}
              </Text>
            </View>
          )}
        />
      )}
    </View>
  );
}
