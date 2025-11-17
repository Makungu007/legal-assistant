import { useState } from 'react';
import { StyleSheet, TouchableOpacity, ScrollView, Alert, TextInput, View, Text } from 'react-native';
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
      <View style={styles.header}>
        <Text style={styles.title}>
          Manage Categories
        </Text>

        <TouchableOpacity
          style={styles.addButton}
          onPress={() => setIsAddingCategory(true)}
        >
          <IconSymbol name="plus" size={16} color="white" />
          <Text style={styles.addButtonText}>Add Category</Text>
        </TouchableOpacity>
      </View>

      <ScrollView style={styles.content}>
        <View style={styles.stats}>
          <View style={styles.statCard}>
            <Text style={styles.statNumber}>{categories.length}</Text>
            <Text style={styles.statLabel}>Total Categories</Text>
          </View>

          <View style={styles.statCard}>
            <Text style={styles.statNumber}>
              {categories.reduce((total, cat) => total + cat.documentCount, 0)}
            </Text>
            <Text style={styles.statLabel}>Total Documents</Text>
          </View>
        </View>

        {isAddingCategory && (
          <View style={styles.addCategoryForm}>
            <Text style={styles.formTitle}>Add New Category</Text>

            <View style={styles.inputGroup}>
              <Text style={styles.inputLabel}>Category Name</Text>
              <TextInput
                style={styles.textInput}
                placeholder="Enter category name"
                value={newCategoryName}
                onChangeText={setNewCategoryName}
              />
            </View>

            <View style={styles.inputGroup}>
              <Text style={styles.inputLabel}>Description</Text>
              <TextInput
                style={[styles.textInput, styles.textArea]}
                placeholder="Enter category description"
                value={newCategoryDescription}
                onChangeText={setNewCategoryDescription}
                multiline
                numberOfLines={3}
              />
            </View>

            <View style={styles.formButtons}>
              <TouchableOpacity style={styles.cancelButton} onPress={handleCancelAdd}>
                <Text style={styles.cancelButtonText}>Cancel</Text>
              </TouchableOpacity>
              
              <TouchableOpacity style={styles.saveButton} onPress={handleAddCategory}>
                <Text style={styles.saveButtonText}>Save Category</Text>
              </TouchableOpacity>
            </View>
          </View>
        )}

        <View style={styles.categoriesSection}>
          <Text style={styles.sectionTitle}>Categories</Text>

          {categories.map((category) => (
            <View key={category.id} style={styles.categoryCard}>
              <View style={styles.categoryHeader}>
                <View style={styles.categoryInfo}>
                  <View style={styles.categoryTitleRow}>
                    <View
                      style={[styles.categoryColorIndicator, { backgroundColor: category.color }]}
                    />
                    <Text style={styles.categoryName}>{category.name}</Text>
                    <View style={styles.documentBadge}>
                      <Text style={styles.documentCount}>{category.documentCount}</Text>
                    </View>
                  </View>
                  <Text style={styles.categoryDescription}>{category.description}</Text>
                </View>
              </View>

              <View style={styles.categoryActions}>
                <TouchableOpacity
                  style={styles.actionButton}
                  onPress={() => handleEditCategory(category.id)}
                >
                  <IconSymbol name="pencil" size={16} color="#007AFF" />
                  <Text style={styles.actionButtonText}>Edit</Text>
                </TouchableOpacity>
                
                <TouchableOpacity
                  style={[styles.actionButton, styles.dangerButton]}
                  onPress={() => handleDeleteCategory(category.id)}
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
