import { router } from 'expo-router';
import { StyleSheet, TouchableOpacity, View, Text } from 'react-native';
import { IconSymbol } from '@/components/ui/icon-symbol';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function WelcomeScreen() {
  const handleGetStarted = () => {
    router.push('/(auth)/login' as any);
  };

  const handleSkipToApp = () => {
    router.push('/(main)/home' as any);
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Hero Section */}
      <View style={styles.heroSection}>
        <View style={styles.iconContainer}>
          <IconSymbol name="scale.3d" size={80} color="#007AFF" />
        </View>
        
        <Text style={styles.title}>
          Legal Assistant
        </Text>
        
        <Text style={styles.subtitle}>
          Get instant legal guidance and expert advice whenever you need it
        </Text>
      </View>

      {/* Features Section */}
      <View style={styles.featuresSection}>
        <View style={styles.feature}>
          <IconSymbol name="questionmark.bubble" size={24} color="#4CAF50" />
          <Text style={styles.featureText}>Ask legal questions</Text>
        </View>
        
        <View style={styles.feature}>
          <IconSymbol name="book.closed" size={24} color="#FF9500" />
          <Text style={styles.featureText}>Browse legal categories</Text>
        </View>
        
        <View style={styles.feature}>
          <IconSymbol name="lightbulb" size={24} color="#007AFF" />
          <Text style={styles.featureText}>Get expert guidance</Text>
        </View>
      </View>

      {/* Action Buttons */}
      <View style={styles.actionSection}>
        <TouchableOpacity 
          style={styles.primaryButton}
          onPress={handleGetStarted}
        >
          <Text style={styles.primaryButtonText}>Get Started</Text>
        </TouchableOpacity>

        <TouchableOpacity 
          style={styles.secondaryButton}
          onPress={handleSkipToApp}
        >
          <Text style={styles.secondaryButtonText}>Continue as Guest</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  heroSection: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 32,
    paddingTop: 40,
  },
  iconContainer: {
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: '#F0F8FF',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 32,
  },
  title: {
    fontSize: 32,
    fontWeight: '700',
    textAlign: 'center',
    marginBottom: 16,
    color: '#1A1A1A',
  },
  subtitle: {
    fontSize: 18,
    textAlign: 'center',
    color: '#666666',
    lineHeight: 26,
    paddingHorizontal: 16,
    paddingBottom: 20,
  },
  featuresSection: {
    paddingHorizontal: 32,
    paddingVertical: 32,
    gap: 20,
  },
  feature: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F9F9F9',
    padding: 16,
    borderRadius: 12,
    gap: 16,
  },
  featureText: {
    fontSize: 16,
    color: '#333333',
    fontWeight: '500',
  },
  actionSection: {
    paddingHorizontal: 32,
    paddingBottom: 50,
    gap: 16,
  },
  primaryButton: {
    backgroundColor: '#007AFF',
    paddingVertical: 18,
    borderRadius: 16,
    alignItems: 'center',
    shadowColor: '#007AFF',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 4,
  },
  primaryButtonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: '600',
  },
  secondaryButton: {
    backgroundColor: 'transparent',
    paddingVertical: 18,
    borderRadius: 16,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#E0E0E0',
  },
  secondaryButtonText: {
    color: '#666666',
    fontSize: 16,
    fontWeight: '500',
  },
});
