import React, { useEffect, useState } from 'react';
import {
    View,
    Text,
    FlatList,
    Button,
    ActivityIndicator,
    StyleSheet,
} from 'react-native';

export default function LogboekScreen() {
    const [logs, setLogs] = useState<any[]>([]);
    const [loading, setLoading] = useState(false);

    const fetchLogs = async () => {
        setLoading(true);
        try {
            const response = await fetch('https://to.internus.info/api/monkeyalpha/statistics');
            const data = await response.json();
            setLogs(data.logs || data); // Adjust if needed
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
            ) : (
                <FlatList
                    data={logs}
                    keyExtractor={(item, index) => index.toString()}
                    contentContainerStyle={{ paddingTop: 20 }}
                    renderItem={({ item }) => (
                        <View style={styles.logItem}>
                            <Text>
                                <Text style={styles.bold}>{item.user || 'Onbekend'}</Text> stuurde: <Text style={styles.code}>{item.command}</Text>
                            </Text>
                            {item.timestamp && (
                                <Text style={styles.timestamp}>{new Date(item.timestamp).toLocaleString()}</Text>
                            )}
                        </View>
                    )}
                />
            )}
        </View>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, padding: 20 },
    title: { fontSize: 22, fontWeight: 'bold', marginBottom: 10 },
    logItem: { paddingVertical: 10, borderBottomWidth: 1, borderBottomColor: '#ddd' },
    bold: { fontWeight: 'bold' },
    code: { fontFamily: Platform.OS === 'ios' ? 'Courier' : 'monospace' },
    timestamp: { fontSize: 12, color: '#666' },
});
