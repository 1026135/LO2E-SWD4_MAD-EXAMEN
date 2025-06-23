import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Modal,
  Pressable,
} from 'react-native';

interface HeaderProps {
  title: string;
}

const Header: React.FC<HeaderProps> = ({ title }) => {
  const [menuVisible, setMenuVisible] = useState(false);

  const toggleMenu = () => setMenuVisible(!menuVisible);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{title}</Text>

      <TouchableOpacity onPress={toggleMenu} style={styles.hamburger}>
        <View style={styles.bar} />
        <View style={styles.bar} />
        <View style={styles.bar} />
      </TouchableOpacity>

      <Modal
        transparent
        visible={menuVisible}
        animationType="fade"
        onRequestClose={() => setMenuVisible(false)}
      >
        <Pressable style={styles.modalOverlay} onPress={() => setMenuVisible(false)}>
          <View style={styles.menu}>
            {['Dashboard', 'Actielogboek', 'Statistieken', 'Instellingen', 'Start', 'Login'].map((screen, i) => (
              <TouchableOpacity key={i} style={styles.menuItem}>
                <Text>{screen}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </Pressable>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: 60,
    paddingHorizontal: 16,
    backgroundColor: '#f5f5f5',
    borderBottomColor: '#ccc',
    borderBottomWidth: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  title: {
    fontSize: 18,
    fontWeight: '600',
  },
  hamburger: {
    padding: 6,
    justifyContent: 'center',
    alignItems: 'center',
  },
  bar: {
    width: 24,
    height: 3,
    backgroundColor: '#333',
    marginVertical: 2,
  },
  modalOverlay: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'flex-end',
    backgroundColor: 'rgba(0,0,0,0.2)',
  },
  menu: {
    backgroundColor: '#fff',
    borderRadius: 6,
    marginTop: 60,
    marginRight: 10,
    padding: 10,
    elevation: 4,
    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowOffset: { width: 0, height: 2 },
  },
  menuItem: {
    paddingVertical: 8,
    paddingHorizontal: 12,
  },
});

export default Header;
