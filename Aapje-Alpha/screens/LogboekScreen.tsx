import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, Button, ActivityIndicator, StyleSheet } from 'react-native';

export default function LogboekScreen() {
    const [logs, setLogs] = useState<any[]>([]);
    const [loading, setLoading] = useState(false);

    const fetchLogs = async () => {
        setLoading(true);
        try {
            const response = await fetch('https://to.internus.info/api/monkeyalpha/statistics');
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
        <View style={styles.container}>
            <Text style={styles.title}>Logboek</Text>
            <Button title="Ververs logboek" onPress={fetchLogs} />
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
                        <View style={styles.logItem}>
                            <Text style={styles.row}>
                                👤 <Text style={styles.bold}>{item.user}</Text>
                            </Text>
                            <Text style={styles.row}>
                                🔘 Commando: <Text style={styles.command}>{item.command}</Text>
                            </Text>
                            <Text style={styles.timestamp}>
                                🕒 {new Date(item.timestamp).toLocaleString()}
                            </Text>
                        </View>
                    )}
                />
            )}
        </View>
    );
}

const styles = StyleSheet.create({
    container:  { flex: 1, padding: 20 },
    title:      { fontSize: 22, fontWeight: 'bold', marginBottom: 10 },
    logItem:    { paddingVertical: 12, borderBottomWidth: 1, borderBottomColor: '#ddd' },
    row:        { fontSize: 15, marginBottom: 2 },
    bold:       { fontWeight: 'bold' },
    command:    { fontWeight: 'bold', fontSize: 16 },
    timestamp:  { fontSize: 12, color: '#666', marginTop: 4 },
});
