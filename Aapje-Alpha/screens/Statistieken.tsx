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
import {
  View,
  Text,
  StyleSheet,
  ActivityIndicator,
  ScrollView,
  RefreshControl,
} from 'react-native';

export default function Statistieken() {
  const [stats, setStats] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  const fetchStatistics = async () => {
    try {
      const response = await fetch('https://to.internus.info/api/monkeyalpha/statistics');
      const data = await response.json();
      setStats(data);
    } catch (err) {
      console.error('❌ Fout bij ophalen statistieken:', err);
      setStats(null);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  useEffect(() => {
    fetchStatistics();
  }, []);

  const onRefresh = () => {
    setRefreshing(true);
    fetchStatistics();
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Statistieken Overzicht</Text>
      {loading ? (
        <ActivityIndicator size="large" color="#007AFF" />
      ) : stats ? (
        <ScrollView
          style={styles.scroll}
          refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
        >
          {Object.entries(stats).map(([key, value]) => (
            <View key={key} style={styles.item}>
              <Text style={styles.label}>{key}</Text>
              <Text style={styles.value}>{String(value)}</Text>
            </View>
          ))}
        </ScrollView>
      ) : (
        <Text style={styles.error}>Geen statistieken beschikbaar.</Text>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: '#fff' },
  title: { fontSize: 22, fontWeight: 'bold', marginBottom: 10 },
  scroll: { marginTop: 10 },
  item: { marginBottom: 14, paddingBottom: 6, borderBottomWidth: 1, borderColor: '#ddd' },
  label: { fontSize: 16, fontWeight: '600', color: '#333' },
  value: { fontSize: 16, color: '#555' },
  error: { color: 'red', marginTop: 20 },
});
