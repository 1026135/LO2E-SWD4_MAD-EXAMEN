// stylesJungle.ts
import { StyleSheet } from 'react-native';

const colors = {
  background: '#1B3A2D',    // Dark jungle green
  backgroundLight: '#2E5E3F',
  primary: '#4C8C2B',       // Leafy green
  secondary: '#7E5835',     // Brown wood
  accent: '#D8B94F',        // Warm yellow/gold
  textLight: '#F0E6A2',     // Pale yellow for text
  textDark: '#2A2A2A',
  border: '#4C8C2B',
  shadow: 'rgba(0,0,0,0.25)',
};

/* ----------------------- App.tsx Styles ----------------------- */
export const appStyles = StyleSheet.create({
  topBar: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.backgroundLight,
    paddingHorizontal: 12,
    paddingVertical: 14,
    elevation: 6,
    shadowColor: colors.shadow,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 3,
  },
  titleContainer: { flex: 1, alignItems: 'flex-start' },
  screenTitle: {
    fontSize: 24,
    fontWeight: '700',
    color: colors.accent,
    letterSpacing: 1,
  },
  username: {
    fontSize: 14,
    color: colors.textLight,
    marginTop: 2,
  },
  menuButton: { padding: 10 },
  menuText: {
    fontSize: 28,
    color: colors.accent,
    fontWeight: '700',
  },
  sideMenu: {
    backgroundColor: colors.backgroundLight,
    padding: 15,
    elevation: 8,
    zIndex: 10,
    borderRadius: 10,
    shadowColor: colors.shadow,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.35,
    shadowRadius: 5,
  },
});

/* ----------------------- LoginScreen Styles ----------------------- */
export const loginStyles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 60,
    paddingHorizontal: 24,
    alignItems: 'center',
    backgroundColor: colors.background,
  },
  title: {
    fontSize: 26,
    marginBottom: 28,
    fontWeight: '700',
    color: colors.accent,
  },
  input: {
    borderWidth: 2,
    borderColor: colors.primary,
    borderRadius: 8,
    paddingVertical: 14,
    paddingHorizontal: 16,
    width: '100%',
    marginBottom: 16,
    fontSize: 18,
    color: colors.textLight,
    backgroundColor: colors.backgroundLight,
  },
});

/* ----------------------- BluetoothControlScreen Styles ----------------------- */
export const bluetoothStyles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 50,
    paddingHorizontal: 24,
    alignItems: 'center',
    backgroundColor: colors.background,
  },
  device: {
    padding: 8,
    fontSize: 18,
    color: colors.textLight,
    borderBottomColor: colors.primary,
    borderBottomWidth: 0.8,
    width: '100%',
  },
  commandBox: {
    marginTop: 30,
    width: '100%',
    backgroundColor: colors.secondary,
    borderRadius: 12,
    padding: 16,
    shadowColor: colors.shadow,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.4,
    shadowRadius: 6,
  },
  keypadLabel: {
    marginBottom: 12,
    fontSize: 18,
    fontWeight: '700',
    textAlign: 'center',
    color: colors.accent,
    letterSpacing: 1,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 6,
  },
  buttonWrapper: {
    flex: 1,
    marginHorizontal: 6,
  },
  buttonText: {
    color: colors.textLight,
    fontWeight: '700',
    fontSize: 18,
    textAlign: 'center',
  },
});

/* ----------------------- StatistiekenScreen Styles ----------------------- */
export const statistiekenStyles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    backgroundColor: colors.background,
  },
  title: {
    fontSize: 26,
    fontWeight: '700',
    marginBottom: 16,
    color: colors.accent,
  },
  dayContainer: {
    marginBottom: 36,
  },
  statRow: {
    padding: 14,
    borderBottomWidth: 1,
    borderBottomColor: colors.primary,
  },
  statCount: {
    fontWeight: '700',
    color: colors.textLight,
    fontSize: 18,
  },
  periodSelector: {
    flexDirection: 'row',
    marginBottom: 20,
  },
  periodButton: {
    flex: 1,
    paddingVertical: 12,
    marginHorizontal: 6,
    borderRadius: 10,
    backgroundColor: colors.backgroundLight,
    alignItems: 'center',
  },
  periodButtonActive: {
    backgroundColor: colors.accent,
  },
  periodButtonText: {
    color: colors.textLight,
    fontWeight: '700',
  },
  periodButtonTextActive: {
    color: colors.background,
  },
  countText: {
    fontSize: 14,
    color: colors.primary,
    marginTop: 6,
  },
});

/* ----------------------- LogboekScreen Styles ----------------------- */
export const logboekStyles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    backgroundColor: colors.background,
  },
  title: {
    fontSize: 26,
    fontWeight: '700',
    marginBottom: 16,
    color: colors.accent,
  },
  logItem: {
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: colors.primary,
  },
  row: {
    fontSize: 17,
    marginBottom: 6,
    color: colors.textLight,
  },
  bold: {
    fontWeight: '700',
    color: colors.accent,
  },
  command: {
    fontWeight: '700',
    fontSize: 18,
    color: colors.accent,
  },
  timestamp: {
    fontSize: 13,
    color: colors.primary,
    marginTop: 6,
  },
});

/* ----------------------- InstellingenScreen Styles ----------------------- */
export const instellingenStyles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 50,
    paddingHorizontal: 24,
    alignItems: 'center',
    backgroundColor: colors.background,
  },
  title: {
    fontSize: 20,
    marginBottom: 24,
    color: colors.accent,
    fontWeight: '700',
  },
  toggleGroup: {
  alignItems: 'center',
  marginBottom: 24,
},
  label: {
    fontSize: 20,
    color: colors.textLight,
    marginBottom: 24,
  },
  statusText: {
    fontSize: 20,
    marginTop: 16,
    color: colors.accent,
    fontWeight: '700',
  },
});


/* ----------------------- button Styles ----------------------- */
//export const glassButtonStyles = StyleSheet.create({
//  button: {
//    backgroundColor: 'rgba(255, 255, 255, 0.15)', // translucent white
//    borderRadius: 16,
//    borderWidth: 1,
//    borderColor: 'rgba(255, 255, 255, 0.3)',
//    paddingVertical: 14,
//    paddingHorizontal: 24,
//    alignItems: 'center',
//    justifyContent: 'center',
//    shadowColor: '#00000040',
//    shadowOffset: { width: 0, height: 4 },
//    shadowOpacity: 0.2,
//    shadowRadius: 8,
//    marginVertical: 10,
//  },
//  buttonText: {
//    color: '#F0E6A2',
//    fontSize: 18,
//    fontWeight: '700',
//    letterSpacing: 1,
//  },
//});

/* ----------------------- glassButtonStyles (green glass) ----------------------- */
export const glassButtonStyles = StyleSheet.create({
  button: {
    backgroundColor: 'rgba(76, 140, 43, 0.25)',  // semi-transparent leafy green (#4C8C2B)
    borderRadius: 16,
    borderWidth: 1,
    borderColor: 'rgba(76, 140, 43, 0.7)',      // stronger green border
    paddingVertical: 14,
    paddingHorizontal: 24,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: 'rgba(76, 140, 43, 0.5)',      // green shadow
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.4,
    shadowRadius: 8,
    marginVertical: 10,
  },
  buttonText: {
    color: '#F0E6A2',
    fontSize: 18,
    fontWeight: '700',
    letterSpacing: 1,
    textAlign:'center',
  },
});

