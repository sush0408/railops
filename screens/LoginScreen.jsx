import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { COLORS } from '../constants/colors';
import { useUserStore } from '../store/user';
import { useRouter } from 'expo-router';

export default function LoginScreen() {
  const [mobile, setMobile] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const setUser = useUserStore((state) => state.setUser);
  const router = useRouter();

  const handleLogin = async () => {
    setLoading(true);
    try {
      // Simulate login success
      setTimeout(() => {
        setUser({ firstName: 'Demo', approved: true });
        router.push('/dashboard');
        setLoading(false);
      }, 1000);
    } catch (err) {
      Alert.alert('Error', err.message);
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.card}>
        <Text style={styles.title}>Welcome to RailOps</Text>
        <TextInput
          style={styles.input}
          placeholder="Mobile Number"
          value={mobile}
          onChangeText={setMobile}
          keyboardType="phone-pad"
          placeholderTextColor={COLORS.navy}
        />
        <TextInput
          style={styles.input}
          placeholder="Password"
          value={password}
          onChangeText={setPassword}
          secureTextEntry
          placeholderTextColor={COLORS.navy}
        />
        <TouchableOpacity style={styles.forgotPassword}>
          <Text style={styles.forgotText}>Forgot Password?</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.loginButton} onPress={handleLogin} disabled={loading}>
          <Text style={styles.loginButtonText}>{loading ? 'Logging in...' : 'Log in'}</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.altButton}>
          <Text style={styles.altButtonText}>Log in with Mobile Number</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.googleButton}>
          <Text style={styles.googleButtonText}>Sign in with Google</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.signupButton} onPress={() => router.push('/register')}>
          <Text style={styles.signupButtonText}>New User? Sign Up Here</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.linksContainer}>
        <TouchableOpacity><Text style={styles.link}>Privacy Policy</Text></TouchableOpacity>
        <TouchableOpacity><Text style={styles.link}>Term & Condition</Text></TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f6f8fa', // subtle off-white
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
    alignItems: 'stretch',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: COLORS.navy,
    marginBottom: 24,
    textAlign: 'center',
  },
  input: {
    backgroundColor: '#f6f8fa',
    borderRadius: 8,
    padding: 14,
    marginBottom: 14,
    fontSize: 16,
    borderWidth: 1,
    borderColor: COLORS.blue,
    color: COLORS.navy,
  },
  forgotPassword: {
    alignSelf: 'flex-end',
    marginBottom: 18,
  },
  forgotText: {
    color: COLORS.blue,
    fontSize: 14,
  },
  loginButton: {
    backgroundColor: COLORS.yellow,
    borderRadius: 8,
    paddingVertical: 14,
    marginBottom: 12,
    alignItems: 'center',
  },
  loginButtonText: {
    color: COLORS.dark,
    fontWeight: 'bold',
    fontSize: 16,
  },
  altButton: {
    borderColor: COLORS.navy,
    borderWidth: 1,
    borderRadius: 8,
    paddingVertical: 12,
    marginBottom: 10,
    alignItems: 'center',
  },
  altButtonText: {
    color: COLORS.navy,
    fontSize: 16,
  },
  googleButton: {
    borderColor: COLORS.blue,
    borderWidth: 1,
    borderRadius: 8,
    paddingVertical: 12,
    marginBottom: 10,
    alignItems: 'center',
  },
  googleButtonText: {
    color: COLORS.blue,
    fontSize: 16,
  },
  signupButton: {
    marginTop: 8,
    marginBottom: 8,
    alignItems: 'center',
  },
  signupButtonText: {
    color: COLORS.blue,
    fontSize: 16,
    textDecorationLine: 'underline',
  },
  linksContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    maxWidth: 400,
    marginTop: 24,
    paddingHorizontal: 8,
  },
  link: {
    color: COLORS.navy,
    fontSize: 14,
    marginHorizontal: 8,
  },
}); 