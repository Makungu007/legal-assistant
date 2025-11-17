import { useState } from 'react';
import { router } from 'expo-router';
import { StyleSheet, TouchableOpacity, ScrollView, Alert, View, Text } from 'react-native';
import { IconSymbol } from '@/components/ui/icon-symbol';
import { SafeAreaView } from 'react-native-safe-area-context';

const SAMPLE_DOCUMENTS = [
  {
    id: '1',
    title: 'Family Law Guidelines',
    category: 'family',
    lastUpdated: '2024-01-15',
    status: 'Published',
  },
  {
    id: '2',
    title: 'Business Formation Requirements',
    category: 'business',
    lastUpdated: '2024-01-10',
    status: 'Draft',
  },
  {
    id: '3',
    title: 'Criminal Defense Rights',
    category: 'criminal',
    lastUpdated: '2024-01-12',
    status: 'Published',
  },
  {
    id: '4',
    title: 'Property Law Updates',
    category: 'property',
    lastUpdated: '2024-01-08',
    status: 'Review',
  },
];

export default function ManageDocumentsScreen() {
  const [documents, setDocuments] = useState(SAMPLE_DOCUMENTS);

  const handleAddDocument = () => {
    Alert.alert('Add Document', 'Document creation feature coming soon!');
  };

  const handleEditDocument = (docId: string) => {
    Alert.alert('Edit Document', `Editing document ${docId}`);
  };

  const handleDeleteDocument = (docId: string) => {
    Alert.alert(
      'Delete Document',
      'Are you sure you want to delete this document?',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Delete',
          style: 'destructive',
          onPress: () => {
            setDocuments(documents.filter(doc => doc.id !== docId));
          }
        }
      ]
    );
  };

  const handleNavigateToCategories = () => {
    router.push('/(admin)/categories' as any);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Published': return '#4CAF50';
      case 'Draft': return '#FF9800';
      case 'Review': return '#2196F3';
      default: return '#666';
    }
  };

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <View style={styles.header}>
        <Text style={styles.title}>
          Manage Documents
        </Text>

        <View style={styles.headerButtons}>
          <TouchableOpacity
            style={styles.headerButton}
            onPress={handleNavigateToCategories}
          >
            <IconSymbol name="folder" size={16} color="#007AFF" />
            <Text style={styles.headerButtonText}>Categories</Text>
          </TouchableOpacity>
          
          <TouchableOpacity
            style={[styles.headerButton, styles.primaryButton]}
            onPress={handleAddDocument}
          >
            <IconSymbol name="plus" size={16} color="white" />
            <Text style={[styles.headerButtonText, styles.primaryButtonText]}>
              Add Document
            </Text>
          </TouchableOpacity>
        </View>
      </View>

      <ScrollView style={styles.content}>
        <View style={styles.stats}>
          <View style={styles.statCard}>
            <Text style={styles.statNumber}>{documents.length}</Text>
            <Text style={styles.statLabel}>Total Documents</Text>
          </View>

          <View style={styles.statCard}>
            <Text style={styles.statNumber}>
              {documents.filter(d => d.status === 'Published').length}
            </Text>
            <Text style={styles.statLabel}>Published</Text>
          </View>

          <View style={styles.statCard}>
            <Text style={styles.statNumber}>
              {documents.filter(d => d.status === 'Draft').length}
            </Text>
            <Text style={styles.statLabel}>Drafts</Text>
          </View>
        </View>

        <View style={styles.documentsSection}>
          <Text style={styles.sectionTitle}>Documents</Text>

          {documents.map((document) => (
            <View key={document.id} style={styles.documentCard}>
              <View style={styles.documentHeader}>
                <View style={styles.documentInfo}>
                  <Text style={styles.documentTitle}>{document.title}</Text>
                  <Text style={styles.documentMeta}>
                    Category: {document.category} • Updated: {document.lastUpdated}
                  </Text>
                </View>

                <View style={[
                  styles.statusBadge,
                  { backgroundColor: getStatusColor(document.status) }
                ]}>
                  <Text style={styles.statusText}>{document.status}</Text>
                </View>
              </View>

              <View style={styles.documentActions}>
                <TouchableOpacity
                  style={styles.actionButton}
                  onPress={() => handleEditDocument(document.id)}
                >
                  <IconSymbol name="pencil" size={16} color="#007AFF" />
                  <Text style={styles.actionButtonText}>Edit</Text>
                </TouchableOpacity>
                
                <TouchableOpacity
                  style={[styles.actionButton, styles.dangerButton]}
                  onPress={() => handleDeleteDocument(document.id)}
                >
                  <IconSymbol name="trash" size={16} color="#FF3B30" />
                  <Text style={[styles.actionButtonText, styles.dangerText]}>
                    Delete
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    paddingHorizontal: 24,
    paddingTop: 20,
    paddingBottom: 24,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  headerButtons: {
    flexDirection: 'row',
    gap: 12,
  },
  headerButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderWidth: 1,
    borderColor: '#007AFF',
    borderRadius: 8,
  },
  primaryButton: {
    backgroundColor: '#007AFF',
  },
  headerButtonText: {
    color: '#007AFF',
    fontSize: 14,
    fontWeight: '500',
  },
  primaryButtonText: {
    color: 'white',
  },
  content: {
    flex: 1,
    paddingHorizontal: 24,
  },
  stats: {
    flexDirection: 'row',
    gap: 12,
    marginBottom: 32,
  },
  statCard: {
    flex: 1,
    backgroundColor: '#F9F9F9',
    padding: 20,
    borderRadius: 12,
    alignItems: 'center',
  },
  statNumber: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#007AFF',
  },
  statLabel: {
    fontSize: 12,
    opacity: 0.7,
    marginTop: 4,
  },
  documentsSection: {
    marginBottom: 40,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '600',
    marginBottom: 16,
  },
  documentCard: {
    backgroundColor: '#F9F9F9',
    padding: 16,
    borderRadius: 12,
    marginBottom: 12,
  },
  documentHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 12,
  },
  documentInfo: {
    flex: 1,
    marginRight: 12,
  },
  documentTitle: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 4,
  },
  documentMeta: {
    fontSize: 12,
    opacity: 0.7,
  },
  statusBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 6,
  },
  statusText: {
    fontSize: 12,
    color: 'white',
    fontWeight: '500',
  },
  documentActions: {
    flexDirection: 'row',
    gap: 12,
  },
  actionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 6,
    backgroundColor: '#F0F0F0',
  },
  dangerButton: {
    backgroundColor: '#FFEBEA',
  },
  actionButtonText: {
    fontSize: 12,
    color: '#007AFF',
    fontWeight: '500',
  },
  dangerText: {
    color: '#FF3B30',
  },
});
