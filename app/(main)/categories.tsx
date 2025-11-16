import { useLocalSearchParams } from 'expo-router';
import { StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { IconSymbol } from '@/components/ui/icon-symbol';
import { SafeAreaView } from 'react-native-safe-area-context';

const LEGAL_CATEGORIES_DATA = {
  family: {
    title: 'Family Law',
    icon: 'house.fill',
    color: '#FF6B6B',
    description: 'Legal matters relating to family relationships',
    topics: [
      'Divorce and Separation',
      'Child Custody',
      'Adoption',
      'Domestic Violence',
      'Marriage and Civil Unions',
      'Child Support',
      'Prenuptial Agreements',
    ]
  },
  business: {
    title: 'Business Law',
    icon: 'briefcase.fill',
    color: '#4ECDC4',
    description: 'Legal aspects of business operations',
    topics: [
      'Business Formation',
      'Contracts and Agreements',
      'Employment Law',
      'Intellectual Property',
      'Corporate Governance',
      'Tax Law',
      'Business Disputes',
    ]
  },
  criminal: {
    title: 'Criminal Law',
    icon: 'shield.fill',
    color: '#45B7D1',
    description: 'Criminal offenses and legal procedures',
    topics: [
      'Criminal Charges',
      'Court Procedures',
      'Sentencing and Penalties',
      'Appeals Process',
      'Rights of the Accused',
      'Bail and Bond',
      'Expungement',
    ]
  },
  property: {
    title: 'Property Law',
    icon: 'house.fill',
    color: '#96CEB4',
    description: 'Real estate and property rights',
    topics: [
      'Buying and Selling Property',
      'Landlord-Tenant Rights',
      'Property Disputes',
      'Zoning Laws',
      'Property Taxes',
      'Easements and Boundaries',
      'Foreclosure',
    ]
  },
  employment: {
    title: 'Employment Law',
    icon: 'person.fill',
    color: '#FFEAA7',
    description: 'Workplace rights and employment issues',
    topics: [
      'Workplace Discrimination',
      'Wrongful Termination',
      'Workplace Safety',
      'Wage and Hour Laws',
      'Employee Benefits',
      'Workers\' Compensation',
      'Employment Contracts',
    ]
  },
  immigration: {
    title: 'Immigration',
    icon: 'globe',
    color: '#DDA0DD',
    description: 'Immigration and citizenship matters',
    topics: [
      'Visa Applications',
      'Green Card Process',
      'Citizenship Requirements',
      'Deportation Defense',
      'Family Immigration',
      'Work Visas',
      'Asylum and Refugee Status',
    ]
  }
};

export default function CategoriesScreen() {
  const { categoryId } = useLocalSearchParams();
  const category = LEGAL_CATEGORIES_DATA[categoryId as keyof typeof LEGAL_CATEGORIES_DATA];

  if (!category) {
    return (
      <SafeAreaView style={styles.container} edges={['top']}>
        <ThemedView style={{ flex: 1, justifyContent: 'center', alignItems: 'center', padding: 20 }}>
          <ThemedText type="title">Category not found</ThemedText>
        </ThemedView>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <ScrollView style={styles.content}>
        <ThemedView style={[styles.header, { backgroundColor: category.color }]}>
          <IconSymbol name={category.icon as any} size={48} color="white" />
          <ThemedText style={styles.headerTitle}>{category.title}</ThemedText>
          <ThemedText style={styles.headerDescription}>{category.description}</ThemedText>
        </ThemedView>

        <ThemedView style={styles.topicsSection}>
          <ThemedText style={styles.sectionTitle}>Common Topics</ThemedText>
          
          {category.topics.map((topic, index) => (
            <TouchableOpacity key={index} style={styles.topicItem}>
              <ThemedView style={styles.topicContent}>
                <IconSymbol name="chevron.right" size={16} color="#007AFF" />
                <ThemedText style={styles.topicText}>{topic}</ThemedText>
              </ThemedView>
            </TouchableOpacity>
          ))}
        </ThemedView>

        <ThemedView style={styles.helpSection}>
          <ThemedText style={styles.helpTitle}>Need Specific Help?</ThemedText>
          <ThemedText style={styles.helpText}>
            Our legal assistant can help answer specific questions about {category.title.toLowerCase()}. 
            Ask detailed questions to get personalized guidance.
          </ThemedText>
          
          <TouchableOpacity style={styles.askQuestionButton}>
            <ThemedText style={styles.askQuestionButtonText}>
              Ask a Question About {category.title}
            </ThemedText>
          </TouchableOpacity>
        </ThemedView>

        <ThemedView style={styles.resourcesSection}>
          <ThemedText style={styles.sectionTitle}>Quick Resources</ThemedText>
          
          <ThemedView style={styles.resourceGrid}>
            <TouchableOpacity style={styles.resourceCard}>
              <IconSymbol name="doc.text" size={24} color="#007AFF" />
              <ThemedText style={styles.resourceTitle}>Legal Forms</ThemedText>
            </TouchableOpacity>
            
            <TouchableOpacity style={styles.resourceCard}>
              <IconSymbol name="phone" size={24} color="#007AFF" />
              <ThemedText style={styles.resourceTitle}>Find Lawyers</ThemedText>
            </TouchableOpacity>
            
            <TouchableOpacity style={styles.resourceCard}>
              <IconSymbol name="book" size={24} color="#007AFF" />
              <ThemedText style={styles.resourceTitle}>Legal Guide</ThemedText>
            </TouchableOpacity>
            
            <TouchableOpacity style={styles.resourceCard}>
              <IconSymbol name="questionmark.circle" size={24} color="#007AFF" />
              <ThemedText style={styles.resourceTitle}>FAQ</ThemedText>
            </TouchableOpacity>
          </ThemedView>
        </ThemedView>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    flex: 1,
  },
  header: {
    padding: 32,
    alignItems: 'center',
    marginBottom: 24,
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    color: 'white',
    marginTop: 16,
    textAlign: 'center',
  },
  headerDescription: {
    fontSize: 16,
    color: 'white',
    opacity: 0.9,
    marginTop: 8,
    textAlign: 'center',
  },
  topicsSection: {
    paddingHorizontal: 24,
    marginBottom: 32,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '600',
    marginBottom: 16,
  },
  topicItem: {
    marginBottom: 2,
  },
  topicContent: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 16,
    paddingHorizontal: 16,
    backgroundColor: '#F9F9F9',
    borderRadius: 12,
    gap: 12,
    marginBottom: 8,
  },
  topicText: {
    fontSize: 16,
    flex: 1,
  },
  helpSection: {
    paddingHorizontal: 24,
    marginBottom: 32,
  },
  helpTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 12,
  },
  helpText: {
    fontSize: 16,
    lineHeight: 24,
    opacity: 0.8,
    marginBottom: 20,
  },
  askQuestionButton: {
    backgroundColor: '#007AFF',
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: 'center',
  },
  askQuestionButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
  },
  resourcesSection: {
    paddingHorizontal: 24,
    marginBottom: 40,
  },
  resourceGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    gap: 12,
  },
  resourceCard: {
    width: '47%',
    backgroundColor: '#F9F9F9',
    padding: 20,
    borderRadius: 12,
    alignItems: 'center',
    gap: 8,
  },
  resourceTitle: {
    fontSize: 14,
    fontWeight: '500',
    textAlign: 'center',
  },
});
