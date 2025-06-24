import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, ActivityIndicator, TouchableOpacity } from 'react-native';
import { statistiekenStyles } from '../styles/stylesLight';
import GlassButton from '../components/GlassButton';

type DailyStats = {
  date: string; // Format: 'YYYY-MM-DD'
  commands: Record<string, number>;
};

type GroupedStats = {
  key: string; // Day / Month / Year
  stats: DailyStats[];
};

const commandLabels: Record<string, string> = {
  '0': 'Alles uitschakelen (rusttoestand)',
  '1': 'Oogjes laten knipperen (LED links/rechts)',
  '2': 'Knight Rider-effect mond aan',
  '3': 'Hoofdje laten draaien',
  '4': "Armpjes op- en neer bewegen (2 servo's)",
  '5': 'Vooruit rijden',
  '6': 'Achteruit rijden',
  '7': 'Naar links draaien',
  '8': 'Naar rechts draaien',
  '9': 'Geluid afspelen (bijv. Intergalactic)',
};

export default function StatistiekenScreen() {
  const [stats, setStats] = useState<DailyStats[]>([]);
  const [loading, setLoading] = useState(false);
  const [view, setView] = useState<'day' | 'month' | 'year'>('day');

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

  const getKey = (date: string): string => {
    if (view === 'day') return date;
    if (view === 'month') return date.slice(0, 7); // 'YYYY-MM'
    return date.slice(0, 4); // 'YYYY'
  };

  const groupStats = (): GroupedStats[] => {
    const grouped: Record<string, DailyStats[]> = {};
    stats.forEach((entry) => {
      const key = getKey(entry.date);
      if (!grouped[key]) grouped[key] = [];
      grouped[key].push(entry);
    });
    return Object.entries(grouped).map(([key, stats]) => ({ key, stats }));
  };

  const mergeStats = (entries: DailyStats[]): DailyStats => {
    const merged: DailyStats = {
      date: entries[0].date,
      commands: {},
    };

    entries.forEach(({ commands }) => {
      for (const [cmd, count] of Object.entries(commands)) {
        merged.commands[cmd] = (merged.commands[cmd] || 0) + count;
      }
    });

    return merged;
  };

  const renderCommand = (command: string, count: number) => (
    <TouchableOpacity key={command} style={statistiekenStyles.statRow}>
      <Text>
        {commandLabels[command] || `Commando ${command}`}:{' '}
      </Text>
      <Text style={statistiekenStyles.countText}>Aantal keren verzonden: {count}</Text>
    </TouchableOpacity>
  );

  const renderDay = ({ item }: { item: GroupedStats }) => {
    const merged = mergeStats(item.stats);
    return (
      <View style={statistiekenStyles.dayContainer}>
        <Text style={statistiekenStyles.title}>
          {view === 'day' ? `Datum` : view === 'month' ? `Maand` : `Jaar`}: {item.key}
        </Text>
        {Object.entries(merged.commands).map(([cmd, count]) =>
          renderCommand(cmd, count)
        )}
      </View>
    );
  };

  return (
    <View style={statistiekenStyles.container}>
      <Text style={statistiekenStyles.title}>Statistieken</Text>

      <View style={statistiekenStyles.periodSelector}>
        {(['day', 'month', 'year'] as const).map((period) => (
          <TouchableOpacity
            key={period}
            style={[
              statistiekenStyles.periodButton,
              view === period && statistiekenStyles.periodButtonActive,
            ]}
            onPress={() => setView(period)}
          >
            <Text
              style={[
                statistiekenStyles.periodButtonText,
                view === period && statistiekenStyles.periodButtonTextActive,
              ]}
            >
              {period === 'day' ? 'Dag' : period === 'month' ? 'Maand' : 'Jaar'}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      <GlassButton
        onPress={fetchStats}
        title="Ververs statistieken"
        style={{ marginTop: 12, alignSelf: 'center', width: '65%' }}
      />

      {loading ? (
        <ActivityIndicator style={{ marginTop: 20 }} />
      ) : stats.length === 0 ? (
        <Text style={{ marginTop: 20 }}>Geen statistieken beschikbaar.</Text>
      ) : (
        <FlatList
          data={groupStats()}
          keyExtractor={(item) => item.key}
          renderItem={renderDay}
          style={{ marginTop: 20 }}
          contentContainerStyle={{ paddingBottom: 20 }}
        />
      )}
    </View>
  );
}
