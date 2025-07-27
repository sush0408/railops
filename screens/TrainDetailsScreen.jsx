import React from 'react';
import { Text, StyleSheet } from 'react-native';
import { COLORS } from '../constants/colors';
import { Layout } from './DashboardScreen';

export default function TrainDetailsScreen() {
  return (
    <Layout>
      <Text style={styles.title}>Train Details</Text>
      <Text style={styles.subtitle}>This is the Train Details screen.</Text>
    </Layout>
  );
}

const styles = StyleSheet.create({
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
}); 