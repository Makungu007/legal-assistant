import { useState } from 'react';
import { StyleSheet, TouchableOpacity, ScrollView, Alert, TextInput } from 'react-native';
import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { IconSymbol } from '@/components/ui/icon-symbol';
import { SafeAreaView } from 'react-native-safe-area-context';

const INITIAL_CATEGORIES = [
  { id: '1', name: 'Family Law', description: 'Legal matters relating to family relationships', documentCount: 15, color: '#FF6B6B' },
  { id: '2', name: 'Business Law', description: 'Legal aspects of business operations', documentCount: 23, color: '#4ECDC4' },
  { id: '3', name: 'Criminal Law', description: 'Criminal offenses and legal procedures', documentCount: 18, color: '#45B7D1' },
  { id: '4', name: 'Property Law', description: 'Real estate and property rights', documentCount: 12, color: '#96CEB4' },
  { id: '5', name: 'Employment Law', description: 'Workplace rights and employment issues', documentCount: 20, color: '#FFEAA7' },
  { id: '6', name: 'Immigration', description: 'Immigration and citizenship matters', documentCount: 8, color: '#DDA0DD' },
];

export default function ManageCategoriesScreen() {
  const [categories, setCategories] = useState(INITIAL_CATEGORIES);
  const [isAddingCategory, setIsAddingCategory] = useState(false);
  const [newCategoryName, setNewCategoryName] = useState('');
  const [newCategoryDescription, setNewCategoryDescription] = useState('');

  const handleAddCategory = () => {
    if (!newCategoryName.trim()) {
      Alert.alert('Error', 'Please enter a category name');
      return;
    }

    const newCategory = {
      id: Date.now().toString(),
      name: newCategoryName.trim(),
      description: newCategoryDescription.trim() || 'No description provided',
      documentCount: 0,
      color: getRandomColor(),
    };

    setCategories([...categories, newCategory]);
    setNewCategoryName('');
    setNewCategoryDescription('');
    setIsAddingCategory(false);
  };

  const handleEditCategory = (categoryId: string) => {
    Alert.alert('Edit Category', `Editing category ${categoryId} - Feature coming soon!`);
  };

  const handleDeleteCategory = (categoryId: string) => {
    const category = categories.find(cat => cat.id === categoryId);
    
    Alert.alert(
      'Delete Category',
      `Are you sure you want to delete "${category?.name}"? This will also remove all associated documents.`,
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Delete',
          style: 'destructive',
          onPress: () => {
            setCategories(categories.filter(cat => cat.id !== categoryId));
          }
        }
      ]
    );
  };

  const handleCancelAdd = () => {
    setIsAddingCategory(false);
    setNewCategoryName('');
    setNewCategoryDescription('');
  };

  const getRandomColor = () => {
    const colors = ['#FF6B6B', '#4ECDC4', '#45B7D1', '#96CEB4', '#FFEAA7', '#DDA0DD', '#FF8A65', '#A1C4FD'];
    return colors[Math.floor(Math.random() * colors.length)];
  };

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <ThemedView style={styles.header}>
        <ThemedText type="title" style={styles.title}>
          Manage Categories
        </ThemedText>
        
        <TouchableOpacity
          style={styles.addButton}
          onPress={() => setIsAddingCategory(true)}
        >
          <IconSymbol name="plus" size={16} color="white" />
          <ThemedText style={styles.addButtonText}>Add Category</ThemedText>
        </TouchableOpacity>
      </ThemedView>

      <ScrollView style={styles.content}>
        <ThemedView style={styles.stats}>
          <ThemedView style={styles.statCard}>
            <ThemedText style={styles.statNumber}>{categories.length}</ThemedText>
            <ThemedText style={styles.statLabel}>Total Categories</ThemedText>
          </ThemedView>
          
          <ThemedView style={styles.statCard}>
            <ThemedText style={styles.statNumber}>
              {categories.reduce((total, cat) => total + cat.documentCount, 0)}
            </ThemedText>
            <ThemedText style={styles.statLabel}>Total Documents</ThemedText>
          </ThemedView>
        </ThemedView>

        {isAddingCategory && (
          <ThemedView style={styles.addCategoryForm}>
            <ThemedText style={styles.formTitle}>Add New Category</ThemedText>
            
            <ThemedView style={styles.inputGroup}>
              <ThemedText style={styles.inputLabel}>Category Name</ThemedText>
              <TextInput
                style={styles.textInput}
                placeholder="Enter category name"
                value={newCategoryName}
                onChangeText={setNewCategoryName}
              />
            </ThemedView>
            
            <ThemedView style={styles.inputGroup}>
              <ThemedText style={styles.inputLabel}>Description</ThemedText>
              <TextInput
                style={[styles.textInput, styles.textArea]}
                placeholder="Enter category description"
                value={newCategoryDescription}
                onChangeText={setNewCategoryDescription}
                multiline
                numberOfLines={3}
              />
            </ThemedView>
            
            <ThemedView style={styles.formButtons}>
              <TouchableOpacity style={styles.cancelButton} onPress={handleCancelAdd}>
                <ThemedText style={styles.cancelButtonText}>Cancel</ThemedText>
              </TouchableOpacity>
              
              <TouchableOpacity style={styles.saveButton} onPress={handleAddCategory}>
                <ThemedText style={styles.saveButtonText}>Save Category</ThemedText>
              </TouchableOpacity>
            </ThemedView>
          </ThemedView>
        )}

        <ThemedView style={styles.categoriesSection}>
          <ThemedText style={styles.sectionTitle}>Categories</ThemedText>
          
          {categories.map((category) => (
            <ThemedView key={category.id} style={styles.categoryCard}>
              <ThemedView style={styles.categoryHeader}>
                <ThemedView style={styles.categoryInfo}>
                  <ThemedView style={styles.categoryTitleRow}>
                    <ThemedView
                      style={[styles.categoryColorIndicator, { backgroundColor: category.color }]}
                    />
                    <ThemedText style={styles.categoryName}>{category.name}</ThemedText>
                    <ThemedView style={styles.documentBadge}>
                      <ThemedText style={styles.documentCount}>{category.documentCount}</ThemedText>
                    </ThemedView>
                  </ThemedView>
                  <ThemedText style={styles.categoryDescription}>{category.description}</ThemedText>
                </ThemedView>
              </ThemedView>
              
              <ThemedView style={styles.categoryActions}>
                <TouchableOpacity
                  style={styles.actionButton}
                  onPress={() => handleEditCategory(category.id)}
                >
                  <IconSymbol name="pencil" size={16} color="#007AFF" />
                  <ThemedText style={styles.actionButtonText}>Edit</ThemedText>
                </TouchableOpacity>
                
                <TouchableOpacity
                  style={[styles.actionButton, styles.dangerButton]}
                  onPress={() => handleDeleteCategory(category.id)}
                >
                  <IconSymbol name="trash" size={16} color="#FF3B30" />
                  <ThemedText style={[styles.actionButtonText, styles.dangerText]}>
                    Delete
                  </ThemedText>
                </TouchableOpacity>
              </ThemedView>
            </ThemedView>
          ))}
        </ThemedView>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 24,
    paddingTop: 20,
    paddingBottom: 24,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
  },
  addButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    backgroundColor: '#007AFF',
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 8,
  },
  addButtonText: {
    color: 'white',
    fontSize: 14,
    fontWeight: '500',
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
  addCategoryForm: {
    backgroundColor: '#F0F8FF',
    padding: 20,
    borderRadius: 12,
    marginBottom: 24,
  },
  formTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 16,
  },
  inputGroup: {
    marginBottom: 16,
  },
  inputLabel: {
    fontSize: 14,
    fontWeight: '500',
    marginBottom: 8,
  },
  textInput: {
    borderWidth: 1,
    borderColor: '#E0E0E0',
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 12,
    fontSize: 16,
    backgroundColor: 'white',
  },
  textArea: {
    height: 80,
    textAlignVertical: 'top',
  },
  formButtons: {
    flexDirection: 'row',
    gap: 12,
  },
  cancelButton: {
    flex: 1,
    paddingVertical: 12,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#999',
    borderRadius: 8,
  },
  cancelButtonText: {
    color: '#999',
    fontSize: 16,
    fontWeight: '500',
  },
  saveButton: {
    flex: 1,
    paddingVertical: 12,
    alignItems: 'center',
    backgroundColor: '#007AFF',
    borderRadius: 8,
  },
  saveButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '500',
  },
  categoriesSection: {
    marginBottom: 40,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '600',
    marginBottom: 16,
  },
  categoryCard: {
    backgroundColor: '#F9F9F9',
    padding: 16,
    borderRadius: 12,
    marginBottom: 12,
  },
  categoryHeader: {
    marginBottom: 12,
  },
  categoryInfo: {
    flex: 1,
  },
  categoryTitleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    marginBottom: 8,
  },
  categoryColorIndicator: {
    width: 16,
    height: 16,
    borderRadius: 8,
  },
  categoryName: {
    fontSize: 16,
    fontWeight: '600',
    flex: 1,
  },
  documentBadge: {
    backgroundColor: '#007AFF',
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 10,
  },
  documentCount: {
    color: 'white',
    fontSize: 12,
    fontWeight: '600',
  },
  categoryDescription: {
    fontSize: 14,
    opacity: 0.7,
    lineHeight: 20,
  },
  categoryActions: {
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
