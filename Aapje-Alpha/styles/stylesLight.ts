// stylesLight.ts
import { StyleSheet } from 'react-native';

/* ----------------------- App.tsx Styles ----------------------- */
export const appStyles = StyleSheet.create({
  topBar: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#eee',
    paddingHorizontal: 10,
    paddingVertical: 10,
    elevation: 2,
  },
  titleContainer: { flex: 1, alignItems: 'flex-start' },
  screenTitle: { fontSize: 22, fontWeight: 'bold' },
  username: { fontSize: 14, color: '#555' },
  menuButton: { padding: 10 },
  menuText: { fontSize: 24 },
  sideMenu: { backgroundColor: '#fff', padding: 10, elevation: 4, zIndex: 1 },
});

/* ----------------------- LoginScreen Styles ----------------------- */
export const loginStyles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 50,
    paddingHorizontal: 20,
    alignItems: 'center',
  },
  title: { fontSize: 20, marginBottom: 20 },
  input: {
    borderWidth: 1,
    borderColor: '#aaa',
    borderRadius: 6,
    padding: 10,
    width: '100%',
    marginBottom: 10,
  },
});

/* ----------------------- BluetoothControlScreen Styles ----------------------- */
export const bluetoothStyles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 50,
    paddingHorizontal: 20,
    alignItems: 'center',
  },
  device: { padding: 6, fontSize: 16 },
  commandBox: { marginTop: 30, width: '100%' },
  keypadLabel: {
    marginBottom: 10,
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  row: { flexDirection: 'row', justifyContent: 'space-between', marginVertical: 5 },
  buttonWrapper: { flex: 1, marginHorizontal: 5 },
});

/* ----------------------- StatistiekenScreen Styles ----------------------- */
export const statistiekenStyles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  dayContainer: {
    marginBottom: 30,
  },
  statRow: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  statCount: {
    fontWeight: 'bold',
    color: '#333',
  },
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
  countText: {
    fontSize: 12,
    color: '#666',
    marginTop: 4,
  },
});

/* ----------------------- LogboekScreen Styles ----------------------- */
export const logboekStyles = StyleSheet.create({
  container: { flex: 1, padding: 20 },
  title: { fontSize: 22, fontWeight: 'bold', marginBottom: 10 },
  logItem: { paddingVertical: 12, borderBottomWidth: 1, borderBottomColor: '#ddd' },
  row: { fontSize: 15, marginBottom: 2 },
  bold: { fontWeight: 'bold' },
  command: { fontWeight: 'bold', fontSize: 16 },
  timestamp: { fontSize: 12, color: '#666', marginTop: 4 },
});

/* ----------------------- InstellingenScreen Styles ----------------------- */
export const instellingenStyles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 50,
    paddingHorizontal: 20,
    alignItems: 'center',
  },
  title: {
    fontSize: 18,
    marginBottom: 20,
  },
  toggleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '60%',
    marginBottom: 20,
  },
  label: {
    fontSize: 18,
  },
  statusText: {
    fontSize: 18,
    marginTop: 10,
  },
});
