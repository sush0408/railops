import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Modal } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { COLORS } from '../constants/colors';
import { useUserStore } from '../store/user';
import { useRouter } from 'expo-router';
import { MaterialCommunityIcons, MaterialIcons, FontAwesome5 } from '@expo/vector-icons';

const menuItems = [
  { label: 'Train Details', icon: <MaterialCommunityIcons name="train" size={22} color={COLORS.navy} />, route: '/train-details' },
  { label: 'Map Screen', icon: <MaterialIcons name="map" size={22} color={COLORS.navy} />, route: '/map' },
  { label: 'Assign EHK&CA', icon: <FontAwesome5 name="user-check" size={20} color={COLORS.navy} />, route: '/assign-ehkca' },
  { label: 'Upload data', icon: <MaterialIcons name="cloud-upload" size={22} color={COLORS.navy} />, route: '/upload' },
  { label: 'Requested Users', icon: <MaterialIcons name="person-add" size={22} color={COLORS.navy} />, route: '/requested-users' },
];

export function Layout({ children }) {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const user = useUserStore((state) => state.user);
  const router = useRouter();

  const handleMenu = (route) => {
    setDrawerOpen(false);
    if (route) router.push(route);
  };

  const handleLogout = () => {
    setDrawerOpen(false);
    useUserStore.getState().logout();
    router.push('/login');
  };

  return (
    <SafeAreaView style={styles.safeArea} edges={["top", "bottom"]}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => setDrawerOpen(true)} style={styles.hamburger}>
          <MaterialIcons name="menu" size={32} color={COLORS.navy} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>RailOps</Text>
      </View>
      <View style={styles.layoutContent}>{children}</View>
      <Modal visible={drawerOpen} animationType="slide" transparent>
        <View style={styles.drawerContainer}>
          <View style={styles.drawerLeft}>
            <Text style={styles.menuTitle}>Menu</Text>
            {menuItems.map((item) => (
              <TouchableOpacity key={item.label} style={styles.menuItem} onPress={() => handleMenu(item.route)}>
                {item.icon}
                <Text style={styles.menuLabel}>{item.label}</Text>
              </TouchableOpacity>
            ))}
            <TouchableOpacity style={styles.menuItem} onPress={handleLogout}>
              <MaterialIcons name="logout" size={22} color={COLORS.navy} />
              <Text style={[styles.menuLabel, { color: COLORS.navy }]}>Logout</Text>
            </TouchableOpacity>
          </View>
          <TouchableOpacity style={styles.drawerOverlay} onPress={() => setDrawerOpen(false)} />
        </View>
      </Modal>
    </SafeAreaView>
  );
}

export default function DashboardScreen() {
  const user = useUserStore((state) => state.user);
  return (
    <Layout>
      <Text style={styles.title}>Welcome, {user?.firstName || 'User'}!</Text>
      <Text style={styles.subtitle}>Role-based dashboard coming soon...</Text>
    </Layout>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#f6f8fa',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    backgroundColor: COLORS.blue,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
    elevation: 4,
  },
  hamburger: {
    marginRight: 16,
  },
  headerTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#fff',
  },
  layoutContent: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 24,
    marginBottom: 24,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: COLORS.navy,
    marginBottom: 16,
  },
  subtitle: {
    fontSize: 18,
    color: COLORS.blue,
  },
  drawerContainer: {
    flex: 1,
    flexDirection: 'row',
    width: '100%',
    height: '100%',
  },
  drawerLeft: {
    width: 270,
    height: '100%',
    backgroundColor: '#fff',
    borderTopRightRadius: 24,
    borderBottomRightRadius: 24,
    paddingTop: 48,
    paddingHorizontal: 20,
    elevation: 8,
    shadowColor: COLORS.navy,
    shadowOpacity: 0.12,
    shadowRadius: 16,
    shadowOffset: { width: 0, height: 8 },
    zIndex: 2,
  },
  drawerOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.2)',
    zIndex: 1,
  },
  menuTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: COLORS.blue,
    marginBottom: 24,
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 14,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  menuLabel: {
    fontSize: 16,
    color: COLORS.navy,
    marginLeft: 16,
  },
}); 