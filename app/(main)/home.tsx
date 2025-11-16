import { router } from 'expo-router';
import { StyleSheet, TouchableOpacity, ScrollView, View } from 'react-native';
import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { IconSymbol } from '@/components/ui/icon-symbol';
import { SafeAreaView } from 'react-native-safe-area-context';

const LEGAL_CATEGORIES = [
  { id: 'family', title: 'Family Law', icon: 'house.fill', color: '#FF6B6B' },
  { id: 'business', title: 'Business Law', icon: 'briefcase.fill', color: '#4ECDC4' },
  { id: 'criminal', title: 'Criminal Law', icon: 'shield.fill', color: '#45B7D1' },
  { id: 'property', title: 'Property Law', icon: 'building.2.fill', color: '#96CEB4' },
  { id: 'employment', title: 'Employment', icon: 'person.2.fill', color: '#FFEAA7' },
  { id: 'immigration', title: 'Immigration', icon: 'globe', color: '#DDA0DD' },
];

export default function HomeScreen() {
  const handleAskQuestion = () => {
    router.push('/(main)/ask' as any);
  };

  const handleCategoryPress = (categoryId: string) => {
    router.push({
      pathname: '/(main)/categories' as any,
      params: { categoryId }
    });
  };

  const navigateToAdmin = () => {
    router.push('/(admin)/login' as any);
  };

  const navigateToLegalInfo = () => {
    router.push('/(main)/legal-info' as any);
  };

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      {/* Header Section */}
      <ThemedView style={styles.header}>
        <View style={styles.headerTop}>
          <View style={styles.titleContainer}>
            <ThemedText style={styles.title}>Legal Assistant</ThemedText>
            <ThemedText style={styles.subtitle}>How can I help you today?</ThemedText>
          </View>
          <TouchableOpacity 
            style={styles.adminButton}
            onPress={navigateToAdmin}
          >
            <IconSymbol name="gearshape.fill" size={20} color="white" />
          </TouchableOpacity>
        </View>
      </ThemedView>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {/* Ask Question Section */}
        <ThemedView style={styles.askSection}>
          <TouchableOpacity style={styles.askButton} onPress={handleAskQuestion}>
            <View style={styles.askButtonIcon}>
              <IconSymbol name="questionmark.bubble.fill" size={28} color="white" />
            </View>
            <View style={styles.askButtonContent}>
              <ThemedText style={styles.askButtonTitle}>Ask a Legal Question</ThemedText>
              <ThemedText style={styles.askButtonSubtitle}>Get instant legal guidance</ThemedText>
            </View>
            <IconSymbol name="arrow.right" size={20} color="white" />
          </TouchableOpacity>
        </ThemedView>

        {/* Categories Section */}
        <ThemedView style={styles.categoriesSection}>
          <ThemedText style={styles.sectionTitle}>Browse Categories</ThemedText>
          <ThemedView style={styles.categoriesGrid}>
            {LEGAL_CATEGORIES.map((category) => (
              <TouchableOpacity
                key={category.id}
                style={[styles.categoryCard, { backgroundColor: category.color }]}
                onPress={() => handleCategoryPress(category.id)}
              >
                <IconSymbol name={category.icon as any} size={32} color="white" />
                <ThemedText style={styles.categoryTitle}>{category.title}</ThemedText>
              </TouchableOpacity>
            ))}
          </ThemedView>
        </ThemedView>

        {/* Quick Actions */}
        <ThemedView style={styles.quickActionsSection}>
          <ThemedText style={styles.sectionTitle}>Quick Resources</ThemedText>
          <View style={styles.quickActions}>
            <TouchableOpacity
              style={styles.quickActionCard}
              onPress={navigateToLegalInfo}
            >
              <IconSymbol name="book.fill" size={24} color="#007AFF" />
              <ThemedText style={styles.quickActionTitle}>Legal Info</ThemedText>
              <ThemedText style={styles.quickActionSubtitle}>Resources & guides</ThemedText>
            </TouchableOpacity>
            
            <TouchableOpacity
              style={styles.quickActionCard}
              onPress={() => {/* Add emergency contacts feature */}}
            >
              <IconSymbol name="phone.fill" size={24} color="#FF3B30" />
              <ThemedText style={styles.quickActionTitle}>Emergency</ThemedText>
              <ThemedText style={styles.quickActionSubtitle}>Legal contacts</ThemedText>
            </TouchableOpacity>
          </View>
        </ThemedView>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  header: {
    paddingHorizontal: 24,
    paddingTop: 20,
    paddingBottom: 20,
    backgroundColor: '#F8F9FA',
  },
  headerTop: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  titleContainer: {
    flex: 1,
  },
  title: {
    fontSize: 28,
    fontWeight: '700',
    color: '#1A1A1A',
    marginBottom: 4,
  },
  subtitle: {
    fontSize: 16,
    color: '#666666',
  },
  adminButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#007AFF',
    justifyContent: 'center',
    alignItems: 'center',
  },
  content: {
    flex: 1,
    paddingHorizontal: 24,
  },
  askSection: {
    marginTop: 24,
    marginBottom: 32,
  },
  askButton: {
    backgroundColor: '#007AFF',
    borderRadius: 16,
    padding: 24,
    flexDirection: 'row',
    alignItems: 'center',
    shadowColor: '#007AFF',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8,
  },
  askButtonIcon: {
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  askButtonContent: {
    flex: 1,
  },
  askButtonTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: 'white',
    marginBottom: 4,
  },
  askButtonSubtitle: {
    fontSize: 14,
    color: 'rgba(255, 255, 255, 0.8)',
  },
  categoriesSection: {
    marginBottom: 32,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: '#1A1A1A',
    marginBottom: 16,
  },
  categoriesGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
    justifyContent: 'space-between',
  },
  categoryCard: {
    width: '48%',
    padding: 20,
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: 100,
    marginBottom: 12,
  },
  categoryTitle: {
    color: 'white',
    fontSize: 14,
    fontWeight: '600',
    textAlign: 'center',
    marginTop: 8,
  },
  quickActionsSection: {
    marginBottom: 40,
  },
  quickActions: {
    flexDirection: 'row',
    gap: 12,
  },
  quickActionCard: {
    flex: 1,
    backgroundColor: '#F8F9FA',
    borderRadius: 12,
    padding: 20,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#E9ECEF',
  },
  quickActionTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1A1A1A',
    marginTop: 8,
    marginBottom: 4,
  },
  quickActionSubtitle: {
    fontSize: 12,
    color: '#666666',
    textAlign: 'center',
  },
});
