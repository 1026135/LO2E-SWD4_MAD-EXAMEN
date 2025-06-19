/*
// screens/Statistieken.tsx
import React from 'react';
import { View, Text } from 'react-native';
export default function Statistieken() {
  return <View><Text>📈 Statistieken</Text></View>;
}
*/

// screens/Statistieken.tsx
import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ActivityIndicator, ScrollView } from 'react-native';

export default function StatisticsOverview() {
  const [stats, setStats] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('https://to.internus.info/api/monkeyalpha/statistics')
      .then((res) => res.json())
      .then((data) => {
        setStats(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error('Fout bij ophalen statistieken:', err);
        setLoading(false);
      });
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Statistieken</Text>
      {loading ? (
        <ActivityIndicator size="large" />
      ) : stats ? (
        <ScrollView style={styles.scroll}>
          {Object.entries(stats).map(([key, value]) => (
            <View key={key} style={styles.item}>
              <Text style={styles.label}>{key}</Text>
              <Text style={styles.value}>{String(value)}</Text>
            </View>
          ))}
        </ScrollView>
      ) : (
        <Text>Geen statistieken beschikbaar.</Text>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20 },
  title: { fontSize: 22, fontWeight: 'bold', marginBottom: 10 },
  scroll: { marginTop: 10 },
  item: { marginBottom: 10 },
  label: { fontSize: 16, fontWeight: '600' },
  value: { fontSize: 16, color: '#333' },
});
