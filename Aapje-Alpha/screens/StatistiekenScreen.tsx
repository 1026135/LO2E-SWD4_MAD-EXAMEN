import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  Button,
  FlatList,
  ActivityIndicator,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import { statistiekenStyles } from '../styles/stylesLight';

type DailyStats = {
  date: string;
  commands: Record<string, number>;
  cities: Record<string, string[]>;
};

export default function StatistiekenScreen() {
  const [stats, setStats] = useState<DailyStats[]>([]);
  const [loading, setLoading] = useState(false);

  const fetchStats = async () => {
    setLoading(true);
    try {
      const response = await fetch('https://to.internus.info/api/monkeyalpha/statistics');
      const data: DailyStats[] = await response.json();
      setStats(data);
    } catch (error) {
      console.error('❌ Fout bij ophalen statistieken:', error);
      setStats([]);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchStats();
  }, []);

  const renderCommand = (command: string, count: number, cities: string[]) => (
    <TouchableOpacity key={command} style={statistiekenStyles.statRow}>
      <Text>
        Commando {command}:{' '}
        <Text style={statistiekenStyles.statCount}>{count}</Text>
      </Text>
      {cities.length > 0 && (
        <Text style={styles.citiesText}>Steden: {cities.join(', ')}</Text>
      )}
    </TouchableOpacity>
  );

  const renderDay = ({ item }: { item: DailyStats }) => (
    <View style={styles.dayContainer}>
      <Text style={statistiekenStyles.title}>Datum: {item.date}</Text>
      {Object.entries(item.commands).map(([command, count]) =>
        renderCommand(command, count, item.cities[command] || [])
      )}
    </View>
  );

  return (
    <View style={statistiekenStyles.container}>
      <Text style={statistiekenStyles.title}>Statistieken</Text>
      <Button title="Ververs statistieken" onPress={fetchStats} />
      {loading ? (
        <ActivityIndicator style={{ marginTop: 20 }} />
      ) : stats.length === 0 ? (
        <Text style={{ marginTop: 20 }}>Geen statistieken beschikbaar.</Text>
      ) : (
        <FlatList
          data={stats}
          keyExtractor={(item) => item.date}
          renderItem={renderDay}
          style={{ marginTop: 20 }}
          contentContainerStyle={{ paddingBottom: 20 }}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  dayContainer: {
    marginBottom: 30,
  },
  citiesText: {
    fontSize: 12,
    color: '#666',
    marginTop: 2,
    marginLeft: 10,
  },
});
