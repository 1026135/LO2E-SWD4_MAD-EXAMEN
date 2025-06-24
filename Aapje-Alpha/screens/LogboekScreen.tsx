// screens/LogboekScreen.tsx
import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, Button, ActivityIndicator, StyleSheet, RefreshControl } from 'react-native';

export default function LogboekScreen() {
    const [logs, setLogs] = useState<any[]>([]);
    const [loading, setLoading] = useState(false);
    const [refreshing, setRefreshing] = useState(false);

    const fetchLogs = async () => {
        setLoading(true);
        try {
            const response = await fetch('https://to.internus.info/api/monkeyalpha/statistics');
            const data = await response.json();
            // Assuming data is an array of logs or contains logs
            setLogs(data.logs || data); // Adjust this based on your API response shape
        } catch (error) {
            console.error('Fout bij ophalen logs:', error);
        }
        setLoading(false);
    };

    useEffect(() => {
        fetchLogs();
    }, []);

    const onRefresh = async () => {
        setRefreshing(true);
        await fetchLogs();
        setRefreshing(false);
    };

    if (loading) {
        return (
            <View style={styles.center}>
                <ActivityIndicator size="large" />
            </View>
        );
    }

    if (logs.length === 0) {
        return (
            <View style={styles.center}>
                <Text>Geen logs beschikbaar</Text>
                <Button title="Ververs" onPress={fetchLogs} />
            </View>
        );
    }

    return (
        <FlatList
            data={logs}
            keyExtractor={(item, index) => index.toString()}
            refreshControl={
                <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
            }
            renderItem={({ item }) => (
                <View style={styles.logItem}>
                    <Text><Text style={styles.bold}>{item.user || item.username || 'Onbekend'}</Text> stuurde commando: <Text style={styles.mono}>{item.command || item.data || ''}</Text></Text>
                    {item.timestamp && <Text style={styles.timestamp}>{new Date(item.timestamp).toLocaleString()}</Text>}
                </View>
            )}
        />
    );
}

const styles = StyleSheet.create({
    center: { flex: 1, justifyContent: 'center', alignItems: 'center' },
    logItem: {
        padding: 12,
        borderBottomColor: '#ccc',
        borderBottomWidth: 1,
    },
    bold: {
        fontWeight: 'bold',
    },
    mono: {
        fontFamily: Platform.OS === 'ios' ? 'Courier' : 'monospace',
    },
    timestamp: {
        fontSize: 12,
        color: '#666',
    },
});
