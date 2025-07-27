import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { COLORS } from '../constants/colors';
import { useUserStore } from '../store/user';

export default function OnboardingScreen({ navigation }) {
  const user = useUserStore((state) => state.user);

  return (
    <View style={styles.container}>
      <View style={styles.card}>
        <Text style={styles.title}>Welcome to RailOps!</Text>
        <Text style={styles.subtitle}>Hello, {user?.name || 'User'}!</Text>
        <Text style={styles.info}>Role: <Text style={styles.role}>{user?.role}</Text></Text>
        <Text style={styles.info}>
          {user?.approved
            ? 'Your account is approved. You can now access all features.'
            : 'Your account is pending approval. You will be notified once approved.'}
        </Text>
        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate(user?.approved ? 'dashboard' : 'login')}
        >
          <Text style={styles.buttonText}>{user?.approved ? 'Go to Dashboard' : 'Back to Login'}</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f6f8fa',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
  },
  card: {
    width: '100%',
    maxWidth: 400,
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 32,
    shadowColor: COLORS.navy,
    shadowOpacity: 0.12,
    shadowRadius: 16,
    shadowOffset: { width: 0, height: 8 },
    elevation: 8,
    alignItems: 'center',
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: COLORS.navy,
    marginBottom: 16,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 22,
    color: COLORS.dark,
    marginBottom: 8,
    textAlign: 'center',
  },
  info: {
    fontSize: 16,
    color: COLORS.navy,
    marginBottom: 8,
    textAlign: 'center',
  },
  role: {
    fontWeight: 'bold',
    color: COLORS.blue,
  },
  button: {
    marginTop: 24,
    backgroundColor: COLORS.yellow,
    borderRadius: 8,
    paddingVertical: 14,
    paddingHorizontal: 40,
    alignItems: 'center',
  },
  buttonText: {
    color: COLORS.dark,
    fontWeight: 'bold',
    fontSize: 16,
  },
}); 