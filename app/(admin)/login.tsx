import { useState } from 'react';
import { router } from 'expo-router';
import { StyleSheet, TouchableOpacity, Alert } from 'react-native';
import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { IconSymbol } from '@/components/ui/icon-symbol';
import { SafeAreaView } from 'react-native-safe-area-context';

const ADMIN_PIN = '1234'; // In production, this should be securely stored

export default function AdminLoginScreen() {
  const [pin, setPin] = useState('');

  const handleLogin = () => {
    if (pin === ADMIN_PIN) {
      router.replace('/(admin)/documents' as any);
    } else {
      Alert.alert('Error', 'Invalid PIN');
      setPin('');
    }
  };

  const handlePinInput = (digit: string) => {
    if (pin.length < 4) {
      setPin(pin + digit);
    }
  };

  const handleClear = () => {
    setPin('');
  };

  const handleBackspace = () => {
    setPin(pin.slice(0, -1));
  };

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <ThemedView style={styles.header}>
        <IconSymbol name="lock.shield" size={60} color="#FF6B6B" />
        <ThemedText type="title" style={styles.title}>
          Admin Access
        </ThemedText>
        <ThemedText style={styles.subtitle}>
          Enter PIN to access admin features
        </ThemedText>
      </ThemedView>

      <ThemedView style={styles.pinSection}>
        <ThemedView style={styles.pinDisplay}>
          {[0, 1, 2, 3].map((index) => (
            <ThemedView
              key={index}
              style={[
                styles.pinDot,
                pin.length > index && styles.pinDotFilled
              ]}
            />
          ))}
        </ThemedView>

        <ThemedView style={styles.keypad}>
          <ThemedView style={styles.keypadRow}>
            {['1', '2', '3'].map((digit) => (
              <TouchableOpacity
                key={digit}
                style={styles.keypadButton}
                onPress={() => handlePinInput(digit)}
              >
                <ThemedText style={styles.keypadButtonText}>{digit}</ThemedText>
              </TouchableOpacity>
            ))}
          </ThemedView>

          <ThemedView style={styles.keypadRow}>
            {['4', '5', '6'].map((digit) => (
              <TouchableOpacity
                key={digit}
                style={styles.keypadButton}
                onPress={() => handlePinInput(digit)}
              >
                <ThemedText style={styles.keypadButtonText}>{digit}</ThemedText>
              </TouchableOpacity>
            ))}
          </ThemedView>

          <ThemedView style={styles.keypadRow}>
            {['7', '8', '9'].map((digit) => (
              <TouchableOpacity
                key={digit}
                style={styles.keypadButton}
                onPress={() => handlePinInput(digit)}
              >
                <ThemedText style={styles.keypadButtonText}>{digit}</ThemedText>
              </TouchableOpacity>
            ))}
          </ThemedView>

          <ThemedView style={styles.keypadRow}>
            <TouchableOpacity
              style={styles.keypadButton}
              onPress={handleClear}
            >
              <ThemedText style={styles.keypadButtonText}>Clear</ThemedText>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.keypadButton}
              onPress={() => handlePinInput('0')}
            >
              <ThemedText style={styles.keypadButtonText}>0</ThemedText>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.keypadButton}
              onPress={handleBackspace}
            >
              <IconSymbol name="delete.left" size={20} color="#007AFF" />
            </TouchableOpacity>
          </ThemedView>
        </ThemedView>

        <TouchableOpacity
          style={[styles.loginButton, pin.length === 4 && styles.loginButtonActive]}
          onPress={handleLogin}
          disabled={pin.length !== 4}
        >
          <ThemedText style={[
            styles.loginButtonText,
            pin.length === 4 && styles.loginButtonTextActive
          ]}>
            Access Admin Panel
          </ThemedText>
        </TouchableOpacity>
      </ThemedView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 24,
    paddingTop: 60,
  },
  header: {
    alignItems: 'center',
    marginBottom: 60,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    marginTop: 20,
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    opacity: 0.7,
    textAlign: 'center',
  },
  pinSection: {
    flex: 1,
    alignItems: 'center',
  },
  pinDisplay: {
    flexDirection: 'row',
    gap: 20,
    marginBottom: 60,
  },
  pinDot: {
    width: 16,
    height: 16,
    borderRadius: 8,
    borderWidth: 2,
    borderColor: '#007AFF',
  },
  pinDotFilled: {
    backgroundColor: '#007AFF',
  },
  keypad: {
    gap: 20,
    marginBottom: 40,
  },
  keypadRow: {
    flexDirection: 'row',
    gap: 20,
  },
  keypadButton: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: '#F0F0F0',
    alignItems: 'center',
    justifyContent: 'center',
  },
  keypadButtonText: {
    fontSize: 24,
    fontWeight: '600',
  },
  loginButton: {
    backgroundColor: '#CCCCCC',
    paddingVertical: 16,
    paddingHorizontal: 32,
    borderRadius: 12,
    alignItems: 'center',
  },
  loginButtonActive: {
    backgroundColor: '#007AFF',
  },
  loginButtonText: {
    color: '#999999',
    fontSize: 16,
    fontWeight: '600',
  },
  loginButtonTextActive: {
    color: 'white',
  },
});
