import { useState } from 'react';
import { router } from 'expo-router';
import { StyleSheet, TouchableOpacity, TextInput, ScrollView, Alert, View, KeyboardAvoidingView, Platform, Text } from 'react-native';
import { IconSymbol } from '@/components/ui/icon-symbol';
import { SafeAreaView } from 'react-native-safe-area-context';

const EXAMPLE_QUESTIONS = [
  "What are my rights as a tenant?",
  "How do I file for divorce?",
  "What should I do if I'm injured at work?",
  "How can I start a small business legally?",
  "What are the steps to write a will?",
  "Can my landlord evict me without notice?",
];

export default function AskScreen() {
  const [question, setQuestion] = useState('');
  const [isRecording, setIsRecording] = useState(false);

  const handleSubmitQuestion = () => {
    if (!question.trim()) {
      Alert.alert('Missing Question', 'Please enter your legal question');
      return;
    }
    
    // Navigate to answer screen with the question
    router.push({
      pathname: '/(main)/answer' as any,
      params: { question: question.trim() }
    });
  };

  const handleVoiceInput = () => {
    setIsRecording(!isRecording);
    // TODO: Implement voice recording logic
    if (!isRecording) {
      Alert.alert('Voice Input', 'Voice recording feature coming soon!');
    }
  };

  const handleExampleQuestion = (exampleQuestion: string) => {
    setQuestion(exampleQuestion);
  };

  const handleClearInput = () => {
    setQuestion('');
  };

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <KeyboardAvoidingView 
        style={styles.keyboardView}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      >
      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        <View style={styles.header}>
          <View style={styles.iconContainer}>
            <IconSymbol name="questionmark.bubble.fill" size={48} color="#007AFF" />
          </View>
          <Text style={styles.title}>Ask Your Legal Question</Text>
          <Text style={styles.subtitle}>
            Get expert legal guidance on any topic
          </Text>
        </View>

        <View style={styles.inputSection}>
          <Text style={styles.inputLabel}>Your Question</Text>
          <View style={styles.inputContainer}>
            <TextInput
              style={styles.textInput}
              placeholder="Type your legal question here..."
              value={question}
              onChangeText={setQuestion}
              multiline
              numberOfLines={6}
              textAlignVertical="top"
              placeholderTextColor="#999"
            />
            
            <View style={styles.inputActions}>
              {question.length > 0 && (
                <TouchableOpacity style={styles.clearButton} onPress={handleClearInput}>
                  <IconSymbol name="xmark.circle.fill" size={20} color="#999" />
                </TouchableOpacity>
              )}
              
              <TouchableOpacity 
                style={[styles.voiceButton, isRecording && styles.voiceButtonActive]}
                onPress={handleVoiceInput}
              >
                <IconSymbol 
                  name={isRecording ? "stop.circle.fill" : "mic.fill"} 
                  size={24} 
                  color={isRecording ? "#FF3B30" : "#007AFF"} 
                />
              </TouchableOpacity>
            </View>
          </View>

          <Text style={styles.characterCount}>
            {question.length} characters
          </Text>
        </View>

        <View style={styles.examplesSection}>
          <Text style={styles.sectionTitle}>Common Questions</Text>
          <Text style={styles.sectionSubtitle}>
            Tap any example below to get started
          </Text>

          <View style={styles.examplesList}>
            {EXAMPLE_QUESTIONS.map((example, index) => (
              <TouchableOpacity
                key={index}
                style={styles.exampleCard}
                onPress={() => handleExampleQuestion(example)}
              >
                <IconSymbol name="quote.bubble" size={16} color="#007AFF" />
                <Text style={styles.exampleText}>{example}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>
      </ScrollView>

      <View style={styles.bottomSection}>
        <TouchableOpacity 
          style={[styles.submitButton, !question.trim() && styles.submitButtonDisabled]}
          onPress={handleSubmitQuestion}
          disabled={!question.trim()}
        >
          <IconSymbol name="arrow.right" size={20} color="white" />
          <Text style={styles.submitButtonText}>Get Answer</Text>
        </TouchableOpacity>
      </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  keyboardView: {
    flex: 1,
  },
  content: {
    flex: 1,
  },
  header: {
    paddingHorizontal: 32,
    paddingTop: 20,
    paddingBottom: 32,
    alignItems: 'center',
  },
  iconContainer: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: '#F0F8FF',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: '700',
    textAlign: 'center',
    color: '#1A1A1A',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: '#666666',
    textAlign: 'center',
    lineHeight: 22,
  },
  inputSection: {
    paddingHorizontal: 32,
    marginBottom: 32,
  },
  inputLabel: {
    fontSize: 18,
    fontWeight: '600',
    color: '#1A1A1A',
    marginBottom: 12,
  },
  inputContainer: {
    backgroundColor: '#F8F9FA',
    borderWidth: 1,
    borderColor: '#E9ECEF',
    borderRadius: 16,
    padding: 16,
    position: 'relative',
  },
  textInput: {
    fontSize: 16,
    color: '#1A1A1A',
    lineHeight: 24,
    minHeight: 120,
    paddingRight: 60,
  },
  inputActions: {
    position: 'absolute',
    right: 16,
    bottom: 16,
    flexDirection: 'row',
    gap: 8,
  },
  clearButton: {
    padding: 4,
  },
  voiceButton: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: '#F0F8FF',
    justifyContent: 'center',
    alignItems: 'center',
  },
  voiceButtonActive: {
    backgroundColor: '#FFE5E5',
  },
  characterCount: {
    fontSize: 12,
    color: '#999',
    textAlign: 'right',
    marginTop: 8,
  },
  examplesSection: {
    paddingHorizontal: 32,
    marginBottom: 32,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: '#1A1A1A',
    marginBottom: 8,
  },
  sectionSubtitle: {
    fontSize: 14,
    color: '#666666',
    marginBottom: 20,
  },
  examplesList: {
    gap: 12,
  },
  exampleCard: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    backgroundColor: '#F8F9FA',
    borderRadius: 12,
    padding: 16,
    borderWidth: 1,
    borderColor: '#E9ECEF',
    gap: 12,
  },
  exampleText: {
    flex: 1,
    fontSize: 14,
    color: '#333333',
    lineHeight: 20,
  },
  bottomSection: {
    paddingHorizontal: 32,
    paddingVertical: 24,
    backgroundColor: '#F8F9FA',
    borderTopWidth: 1,
    borderTopColor: '#E9ECEF',
  },
  submitButton: {
    backgroundColor: '#007AFF',
    borderRadius: 16,
    paddingVertical: 16,
    paddingHorizontal: 24,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    shadowColor: '#007AFF',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8,
  },
  submitButtonDisabled: {
    backgroundColor: '#CCCCCC',
    shadowOpacity: 0,
    elevation: 0,
  },
  submitButtonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: '600',
  },
});
