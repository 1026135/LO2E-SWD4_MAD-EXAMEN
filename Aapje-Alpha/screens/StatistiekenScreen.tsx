import React, { useEffect, useState } from 'react';
import { View, Text, Button, FlatList, ActivityIndicator, TouchableOpacity } from 'react-native';
import { statistiekenStyles } from '../styles/stylesLight';

type LogEntry = {
    id: number;
    user: string;
    command: number;
    timestamp: string;
};

export default function StatistiekenScreen() {
    const [stats, setStats] = useState<Record<string, number>>({});
    const [loading, setLoading] = useState(false);

    const fetchStats = async () => {
        setLoading(true);
        try {
            const response = await fetch('https://to.internus.info/api/monkeyalpha/statistics');
            const data: LogEntry[] = await response.json();

            const counts: Record<string, number> = {};
            data.forEach((entry) => {
                counts[entry.command] = (counts[entry.command] || 0) + 1;
            });
            setStats(counts);
        } catch (error) {
            console.error('❌ Fout bij ophalen statistieken:', error);
        }
        setLoading(false);
    };

    useEffect(() => {
        fetchStats();
    }, []);

    return (
        <View style={statistiekenStyles.container}>
            <Text style={statistiekenStyles.title}>Statistieken</Text>
            <Button title="Ververs statistieken" onPress={fetchStats} />

            {loading ? (
                <ActivityIndicator style={{ marginTop: 20 }} />
            ) : Object.keys(stats).length === 0 ? (
                <Text style={{ marginTop: 20 }}>Geen statistieken beschikbaar.</Text>
            ) : (
                <FlatList
                    style={{ marginTop: 20 }}
                    data={Object.entries(stats)}
                    keyExtractor={([command]) => command}
                    renderItem={({ item: [command, count] }) => (
                        <TouchableOpacity style={statistiekenStyles.statRow}>
                            <Text>Commando {command}: <Text style={statistiekenStyles.statCount}>{count}</Text></Text>
                        </TouchableOpacity>
                    )}
                />
            )}
        </View>
    );
}
