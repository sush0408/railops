import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert, Switch, ScrollView, KeyboardAvoidingView, Platform } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { COLORS } from '../constants/colors';
import { useRouter } from 'expo-router';

const roles = [
  { label: 'Staff', value: 'staff' },
  { label: 'Contractor Supervisor', value: 'contractor-supervisor' },
  { label: 'Railway Supervisor', value: 'railway-supervisor' },
  { label: 'Officer', value: 'officer' },
  { label: 'Admin', value: 'admin' },
];

export default function RegisterScreen() {
  const [firstName, setFirstName] = useState('');
  const [middleName, setMiddleName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [emailOtp, setEmailOtp] = useState('');
  const [mobile, setMobile] = useState('');
  const [mobileOtp, setMobileOtp] = useState('');
  const [whatsappNumber, setWhatsappNumber] = useState('');
  const [useSameWhatsapp, setUseSameWhatsapp] = useState(true);
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [role, setRole] = useState(roles[0].value);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleSendOtp = (type) => {
    Alert.alert('OTP Sent', 'Dummy OTP: 123456');
    if (type === 'email') setEmailOtp('123456');
    if (type === 'mobile') setMobileOtp('123456');
  };

  const handleRegister = async () => {
    setLoading(true);
    try {
      // Simulate registration success
      setTimeout(() => {
        router.push('/dashboard');
        setLoading(false);
      }, 1000);
    } catch (err) {
      Alert.alert('Error', err.message);
      setLoading(false);
    }
  };

  return (
    <KeyboardAvoidingView style={{ flex: 1 }} behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
      <ScrollView contentContainerStyle={styles.scrollContainer} keyboardShouldPersistTaps="handled">
        <View style={styles.container}>
          <View style={styles.card}>
            <Text style={styles.title}>Sign Up to RailOps</Text>
            <TextInput
              style={styles.input}
              placeholder="First Name *"
              value={firstName}
              onChangeText={setFirstName}
              placeholderTextColor={COLORS.navy}
            />
            <TextInput
              style={styles.input}
              placeholder="Middle Name (Optional)"
              value={middleName}
              onChangeText={setMiddleName}
              placeholderTextColor={COLORS.navy}
            />
            <TextInput
              style={styles.input}
              placeholder="Last Name *"
              value={lastName}
              onChangeText={setLastName}
              placeholderTextColor={COLORS.navy}
            />
            <View style={styles.otpRow}>
              <TextInput
                style={[styles.input, { flex: 1 }]}
                placeholder="Email"
                value={email}
                onChangeText={setEmail}
                placeholderTextColor={COLORS.navy}
                autoCapitalize="none"
                keyboardType="email-address"
              />
              <TouchableOpacity style={styles.otpButton} onPress={() => handleSendOtp('email')}>
                <Text style={styles.otpButtonText}>Send OTP</Text>
              </TouchableOpacity>
            </View>
            <TextInput
              style={styles.input}
              placeholder="Enter Email OTP"
              value={emailOtp}
              onChangeText={setEmailOtp}
              placeholderTextColor={COLORS.navy}
            />
            <View style={styles.otpRow}>
              <TextInput
                style={[styles.input, { flex: 1 }]}
                placeholder="Mobile Number *"
                value={mobile}
                onChangeText={setMobile}
                keyboardType="phone-pad"
                placeholderTextColor={COLORS.navy}
              />
              <TouchableOpacity style={styles.otpButton} onPress={() => handleSendOtp('mobile')}>
                <Text style={styles.otpButtonText}>Send OTP</Text>
              </TouchableOpacity>
            </View>
            <TextInput
              style={styles.input}
              placeholder="Enter Mobile OTP"
              value={mobileOtp}
              onChangeText={setMobileOtp}
              placeholderTextColor={COLORS.navy}
            />
            <View style={styles.whatsappRow}>
              <Text style={styles.whatsappLabel}>Use same number for WhatsApp?</Text>
              <Switch
                value={useSameWhatsapp}
                onValueChange={setUseSameWhatsapp}
                thumbColor={useSameWhatsapp ? COLORS.blue : COLORS.navy}
                trackColor={{ false: COLORS.light, true: COLORS.yellow }}
              />
            </View>
            {!useSameWhatsapp && (
              <TextInput
                style={styles.input}
                placeholder="WhatsApp Number"
                value={whatsappNumber}
                onChangeText={setWhatsappNumber}
                keyboardType="phone-pad"
                placeholderTextColor={COLORS.navy}
              />
            )}
            <TextInput
              style={styles.input}
              placeholder="Password *"
              value={password}
              onChangeText={setPassword}
              secureTextEntry
              placeholderTextColor={COLORS.navy}
            />
            <TextInput
              style={styles.input}
              placeholder="Re-enter Password *"
              value={confirmPassword}
              onChangeText={setConfirmPassword}
              secureTextEntry
              placeholderTextColor={COLORS.navy}
            />
            <Text style={styles.roleLabel}>Select Role</Text>
            <Picker
              selectedValue={role}
              style={styles.picker}
              onValueChange={setRole}>
              {roles.map(r => <Picker.Item key={r.value} label={r.label} value={r.value} />)}
            </Picker>
            <TouchableOpacity style={styles.registerButton} onPress={handleRegister} disabled={loading}>
              <Text style={styles.registerButtonText}>{loading ? 'Registering...' : 'Register'}</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => router.push('/login')} style={styles.loginLink}>
              <Text style={[styles.loginLinkText, {textDecorationLine: 'underline', color: COLORS.blue}]}>Already have an account? Log in</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  scrollContainer: {
    flexGrow: 1,
    justifyContent: 'center',
    paddingVertical: 32,
  },
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
    alignItems: 'stretch',
    marginTop: 20,
    marginBottom: 20,
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
  otpRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 14,
  },
  otpButton: {
    marginLeft: 8,
    backgroundColor: COLORS.light,
    borderRadius: 8,
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderWidth: 1,
    borderColor: COLORS.blue,
  },
  otpButtonText: {
    color: COLORS.blue,
    fontWeight: 'bold',
  },
  whatsappRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 14,
  },
  whatsappLabel: {
    flex: 1,
    color: COLORS.navy,
    fontSize: 16,
  },
  roleLabel: {
    color: COLORS.navy,
    fontSize: 16,
    marginBottom: 4,
    marginTop: 8,
  },
  picker: {
    backgroundColor: '#f6f8fa',
    borderRadius: 8,
    marginBottom: 16,
    color: COLORS.navy,
  },
  registerButton: {
    backgroundColor: COLORS.yellow,
    borderRadius: 8,
    paddingVertical: 14,
    marginBottom: 12,
    alignItems: 'center',
  },
  registerButtonText: {
    color: COLORS.dark,
    fontWeight: 'bold',
    fontSize: 16,
  },
  loginLink: {
    marginTop: 8,
    alignItems: 'center',
  },
  loginLinkText: {
    color: COLORS.blue,
    fontSize: 16,
    textDecorationLine: 'underline',
  },
}); 