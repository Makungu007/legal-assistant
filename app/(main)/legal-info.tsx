import { StyleSheet, TouchableOpacity, ScrollView, Linking } from 'react-native';
import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { IconSymbol } from '@/components/ui/icon-symbol';
import { SafeAreaView } from 'react-native-safe-area-context';

const LEGAL_INFO_SECTIONS = [
  {
    id: 'rights',
    title: 'Know Your Rights',
    icon: 'shield',
    items: [
      'Constitutional Rights',
      'Consumer Rights',
      'Worker Rights',
      'Tenant Rights',
      'Patient Rights',
    ]
  },
  {
    id: 'procedures',
    title: 'Legal Procedures',
    icon: 'doc.text',
    items: [
      'Court Procedures',
      'Filing Legal Documents',
      'Legal Representation',
      'Appeals Process',
      'Mediation and Arbitration',
    ]
  },
  {
    id: 'resources',
    title: 'Legal Resources',
    icon: 'book',
    items: [
      'Legal Aid Services',
      'Court Self-Help Centers',
      'Online Legal Resources',
      'Law Libraries',
      'Pro Bono Services',
    ]
  },
  {
    id: 'documents',
    title: 'Important Documents',
    icon: 'folder',
    items: [
      'Wills and Estate Planning',
      'Power of Attorney',
      'Employment Contracts',
      'Lease Agreements',
      'Business Formation Documents',
    ]
  }
];

const EMERGENCY_CONTACTS = [
  { name: 'Emergency Legal Aid', phone: '1-800-LEGAL-AID', available: '24/7' },
  { name: 'Domestic Violence Hotline', phone: '1-800-799-7233', available: '24/7' },
  { name: 'Child Abuse Hotline', phone: '1-800-4-A-CHILD', available: '24/7' },
];

export default function LegalInfoScreen() {
  const handleCallEmergency = (phone: string) => {
    Linking.openURL(`tel:${phone}`);
  };

  const handleOpenWebResource = (url: string) => {
    Linking.openURL(url);
  };

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <ScrollView style={styles.content}>
        <ThemedView style={styles.header}>
          <ThemedText type="title" style={styles.title}>
            Legal Information
          </ThemedText>
          <ThemedText style={styles.subtitle}>
            Essential legal resources and information
          </ThemedText>
        </ThemedView>

        <ThemedView style={styles.sectionsContainer}>
          {LEGAL_INFO_SECTIONS.map((section) => (
            <ThemedView key={section.id} style={styles.section}>
              <ThemedView style={styles.sectionHeader}>
                <IconSymbol name={section.icon as any} size={24} color="#007AFF" />
                <ThemedText style={styles.sectionTitle}>{section.title}</ThemedText>
              </ThemedView>
              
              <ThemedView style={styles.sectionContent}>
                {section.items.map((item, index) => (
                  <TouchableOpacity key={index} style={styles.infoItem}>
                    <ThemedText style={styles.infoItemText}>{item}</ThemedText>
                    <IconSymbol name="chevron.right" size={16} color="#999" />
                  </TouchableOpacity>
                ))}
              </ThemedView>
            </ThemedView>
          ))}
        </ThemedView>

        <ThemedView style={styles.emergencySection}>
          <ThemedText style={styles.emergencyTitle}>Emergency Legal Contacts</ThemedText>
          <ThemedText style={styles.emergencySubtitle}>
            If you need immediate legal assistance
          </ThemedText>
          
          {EMERGENCY_CONTACTS.map((contact, index) => (
            <TouchableOpacity
              key={index}
              style={styles.emergencyContact}
              onPress={() => handleCallEmergency(contact.phone)}
            >
              <ThemedView style={styles.emergencyContactInfo}>
                <ThemedText style={styles.emergencyContactName}>{contact.name}</ThemedText>
                <ThemedText style={styles.emergencyContactPhone}>{contact.phone}</ThemedText>
                <ThemedText style={styles.emergencyContactAvailable}>{contact.available}</ThemedText>
              </ThemedView>
              <IconSymbol name="phone" size={20} color="#FF6B6B" />
            </TouchableOpacity>
          ))}
        </ThemedView>

        <ThemedView style={styles.onlineResourcesSection}>
          <ThemedText style={styles.sectionTitle}>Online Legal Resources</ThemedText>
          
          <TouchableOpacity 
            style={styles.resourceButton}
            onPress={() => handleOpenWebResource('https://www.legal-aid.org')}
          >
            <IconSymbol name="globe" size={20} color="#007AFF" />
            <ThemedText style={styles.resourceButtonText}>Legal Aid Directory</ThemedText>
          </TouchableOpacity>
          
          <TouchableOpacity 
            style={styles.resourceButton}
            onPress={() => handleOpenWebResource('https://www.courts.gov')}
          >
            <IconSymbol name="building.columns" size={20} color="#007AFF" />
            <ThemedText style={styles.resourceButtonText}>Court Information</ThemedText>
          </TouchableOpacity>
          
          <TouchableOpacity 
            style={styles.resourceButton}
            onPress={() => handleOpenWebResource('https://www.lawhelp.org')}
          >
            <IconSymbol name="questionmark.circle" size={20} color="#007AFF" />
            <ThemedText style={styles.resourceButtonText}>Self-Help Legal Resources</ThemedText>
          </TouchableOpacity>
        </ThemedView>

        <ThemedView style={styles.disclaimerSection}>
          <IconSymbol name="exclamationmark.triangle" size={20} color="#FF6B6B" />
          <ThemedText style={styles.disclaimerText}>
            The information provided is for educational purposes only and should not be considered as legal advice. 
            Always consult with a qualified attorney for legal matters specific to your situation.
          </ThemedText>
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
    paddingHorizontal: 24,
  },
  header: {
    paddingTop: 20,
    paddingBottom: 32,
    alignItems: 'center',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 16,
    opacity: 0.7,
    textAlign: 'center',
    marginTop: 8,
  },
  sectionsContainer: {
    marginBottom: 32,
  },
  section: {
    marginBottom: 24,
  },
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
  },
  sectionContent: {
    gap: 8,
  },
  infoItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 12,
    paddingHorizontal: 16,
    backgroundColor: '#F9F9F9',
    borderRadius: 8,
  },
  infoItemText: {
    fontSize: 16,
  },
  emergencySection: {
    backgroundColor: '#FFF5F5',
    padding: 20,
    borderRadius: 12,
    marginBottom: 32,
    borderWidth: 1,
    borderColor: '#FFE0E0',
  },
  emergencyTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#FF6B6B',
    marginBottom: 8,
  },
  emergencySubtitle: {
    fontSize: 14,
    opacity: 0.8,
    marginBottom: 16,
  },
  emergencyContact: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 12,
    paddingHorizontal: 12,
    backgroundColor: 'white',
    borderRadius: 8,
    marginBottom: 8,
  },
  emergencyContactInfo: {
    flex: 1,
  },
  emergencyContactName: {
    fontSize: 16,
    fontWeight: '500',
  },
  emergencyContactPhone: {
    fontSize: 14,
    color: '#007AFF',
    marginTop: 2,
  },
  emergencyContactAvailable: {
    fontSize: 12,
    opacity: 0.6,
    marginTop: 2,
  },
  onlineResourcesSection: {
    marginBottom: 32,
  },
  resourceButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    paddingVertical: 16,
    paddingHorizontal: 16,
    backgroundColor: '#F0F8FF',
    borderRadius: 12,
    marginBottom: 12,
  },
  resourceButtonText: {
    fontSize: 16,
    color: '#007AFF',
    fontWeight: '500',
  },
  disclaimerSection: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 12,
    backgroundColor: '#FFF5F5',
    padding: 16,
    borderRadius: 12,
    marginBottom: 40,
    borderWidth: 1,
    borderColor: '#FFE0E0',
  },
  disclaimerText: {
    fontSize: 14,
    lineHeight: 20,
    opacity: 0.8,
    flex: 1,
  },
});
