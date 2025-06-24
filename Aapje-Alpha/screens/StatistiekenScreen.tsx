import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  Button,
  FlatList,
  StyleSheet,
  ActivityIndicator,
  TouchableOpacity,
} from 'react-native';

type LogEntry = {
  id: number;
  user: string;
  command: number;
  timestamp: string;
};

type AggregatedData = {
  [user: string]: {
    [command: number]: number;
  };
};

export default function StatistiekenScreen() {
  const [logs, setLogs] = useState<LogEntry[]>([]);
  const [loading, setLoading] = useState(false);
  const [period, setPeriod] = useState<'day' | 'month' | 'year'>('day');

  const fetchLogs = async () => {
    setLoading(true);
    try {
      const response = await fetch('https://to.internus.info/api/monkeyalpha/statistics');
      const data = await response.json();
      const logArray = Array.isArray(data) ? data : [data];
      setLogs(logArray);
    } catch (error) {
      console.error('❌ Fout bij ophalen statistieken:', error);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchLogs();
  }, []);

  const filterLogsByPeriod = (logs: LogEntry[]) => {
    const now = new Date();
    return logs.filter((log) => {
      const date = new Date(log.timestamp);
      if (period === 'day') {
        return (
          date.getDate() === now.getDate() &&
          date.getMonth() === now.getMonth() &&
          date.getFullYear() === now.getFullYear()
        );
      }
      if (period === 'month') {
        return (
          date.getMonth() === now.getMonth() &&
          date.getFullYear() === now.getFullYear()
        );
      }
      if (period === 'year') {
        return date.getFullYear() === now.getFullYear();
      }
      return false;
    });
  };

  const aggregateData = (filteredLogs: LogEntry[]): AggregatedData => {
    const agg: AggregatedData = {};
    filteredLogs.forEach(({ user, command }) => {
      if (!agg[user]) agg[user] = {};
      agg[user][command] = (agg[user][command] || 0) + 1;
    });
    return agg;
  };

  const filteredLogs = filterLogsByPeriod(logs);
  const aggregated = aggregateData(filteredLogs);

  const allCommands = Array.from(
    new Set(logs.map((log) => log.command))
  ).sort((a, b) => a - b);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Statistieken</Text>

      <View style={styles.periodSelector}>
        {(['day', 'month', 'year'] as const).map((p) => (
          <TouchableOpacity
            key={p}
            onPress={() => setPeriod(p)}
            style={[
              styles.periodButton,
              period === p && styles.periodButtonActive,
            ]}
          >
            <Text
              style={[
                styles.periodButtonText,
                period === p && styles.periodButtonTextActive,
              ]}
            >
              {p === 'day' ? 'Dag' : p === 'month' ? 'Maand' : 'Jaar'}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      <Button title="Ververs statistieken" onPress={fetchLogs} />

      {loading ? (
        <ActivityIndicator style={{ marginTop: 20 }} />
      ) : filteredLogs.length === 0 ? (
        <Text style={{ marginTop: 20 }}>Geen data voor geselecteerde periode.</Text>
      ) : (
        <FlatList
          data={Object.entries(aggregated)}
          keyExtractor={([user]) => user}
          contentContainerStyle={{ paddingTop: 20 }}
          renderItem={({ item }) => {
            const [user, commands] = item;
            return (
              <View style={styles.userBlock}>
                <Text style={styles.userTitle}>👤 {user}</Text>
                <View style={styles.commandsRow}>
                  {allCommands.map((cmd) => (
                    <View key={cmd} style={styles.commandBox}>
                      <Text style={styles.commandNumber}>{cmd}</Text>
                      <Text style={styles.commandCount}>
                        {commands[cmd] || 0}
                      </Text>
                    </View>
                  ))}
                </View>
              </View>
            );
          }}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20 },
  title: { fontSize: 22, fontWeight: 'bold', marginBottom: 10 },
  periodSelector: {
    flexDirection: 'row',
    marginBottom: 15,
  },
  periodButton: {
    flex: 1,
    padding: 10,
    marginHorizontal: 5,
    borderRadius: 6,
    backgroundColor: '#ddd',
    alignItems: 'center',
  },
  periodButtonActive: {
    backgroundColor: '#4287f5',
  },
  periodButtonText: {
    color: '#333',
    fontWeight: 'bold',
  },
  periodButtonTextActive: {
    color: 'white',
  },
  userBlock: {
    marginBottom: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    paddingBottom: 10,
  },
  userTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 6,
  },
  commandsRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  commandBox: {
    width: 50,
    alignItems: 'center',
    marginRight: 10,
    marginBottom: 6,
  },
  commandNumber: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  commandCount: {
    fontSize: 14,
    color: '#555',
  },
});
