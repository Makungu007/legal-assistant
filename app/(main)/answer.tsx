import { useEffect, useState } from 'react';
import { router, useLocalSearchParams } from 'expo-router';
import { StyleSheet, TouchableOpacity, ScrollView, Share, View, Text } from 'react-native';
import { IconSymbol } from '@/components/ui/icon-symbol';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function AnswerScreen() {
  const { question } = useLocalSearchParams();
  const [answer, setAnswer] = useState('');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate getting an answer from a legal database/AI
    const simulateAnswer = () => {
      setTimeout(() => {
        setAnswer(generateSampleAnswer(question as string));
        setIsLoading(false);
      }, 2000);
    };

    simulateAnswer();
  }, [question]);

  const handleShareAnswer = async () => {
    try {
      await Share.share({
        message: `Question: ${question}\n\nAnswer: ${answer}`,
        title: 'Legal Guidance'
      });
    } catch (error) {
      console.log('Error sharing:', error);
    }
  };

  const handleAskAnother = () => {
    router.back();
  };

  const handleFindMore = () => {
    router.push('/(main)/legal-info' as any);
  };

  if (isLoading) {
    return (
      <SafeAreaView style={styles.container} edges={['top']}>
        <View style={styles.loadingContainer}>
          <Text style={styles.loadingTitle}>
            Analyzing Your Question...
          </Text>
          <Text style={styles.loadingSubtitle}>
            Please wait while I gather relevant legal information
          </Text>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <ScrollView style={styles.content}>
        <View style={styles.questionSection}>
          <Text style={styles.questionLabel}>Your Question:</Text>
          <View style={styles.questionBox}>
            <Text style={styles.questionText}>{question}</Text>
          </View>
        </View>

        <View style={styles.answerSection}>
          <Text style={styles.answerLabel}>Legal Guidance:</Text>
          <View style={styles.answerBox}>
            <Text style={styles.answerText}>{answer}</Text>
          </View>
        </View>

        <View style={styles.disclaimerSection}>
          <View style={styles.disclaimerBox}>
            <IconSymbol name="exclamationmark.triangle" size={20} color="#FF6B6B" />
            <Text style={styles.disclaimerText}>
              This information is for educational purposes only and does not constitute legal advice. 
              Please consult with a qualified attorney for specific legal matters.
            </Text>
          </View>
        </View>
      </ScrollView>

      <View style={styles.actionButtons}>
        <TouchableOpacity style={styles.actionButton} onPress={handleShareAnswer}>
          <IconSymbol name="square.and.arrow.up" size={20} color="#007AFF" />
          <Text style={styles.actionButtonText}>Share</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.actionButton} onPress={handleFindMore}>
          <IconSymbol name="book" size={20} color="#007AFF" />
          <Text style={styles.actionButtonText}>More Info</Text>
        </TouchableOpacity>

        <TouchableOpacity 
          style={[styles.actionButton, styles.primaryAction]} 
          onPress={handleAskAnother}
        >
          <IconSymbol name="plus" size={20} color="white" />
          <Text style={[styles.actionButtonText, styles.primaryActionText]}>
            Ask Another
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

function generateSampleAnswer(question: string): string {
  // This would typically come from a legal database or AI service
  return `Based on your question, here are some key points to consider:

1. **Understanding Your Rights**: Every situation has specific legal protections and rights that may apply to your circumstances.

2. **Documentation**: It's important to gather and maintain relevant documents related to your situation.

3. **Legal Procedures**: There are established legal procedures that typically need to be followed for most legal matters.

4. **Professional Consultation**: For your specific situation, consulting with a qualified attorney who specializes in this area of law would provide you with personalized guidance.

5. **Time Limitations**: Many legal matters have specific time limits (statutes of limitations) that must be observed.

**Next Steps**: Consider scheduling a consultation with a legal professional who can review the specific details of your situation and provide tailored advice based on current laws in your jurisdiction.

Remember, legal matters can be complex and the best course of action often depends on the specific details of your situation.`;
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    flex: 1,
    paddingHorizontal: 24,
    paddingTop: 20,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 40,
  },
  loadingTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 16,
  },
  loadingSubtitle: {
    fontSize: 16,
    opacity: 0.7,
    textAlign: 'center',
  },
  questionSection: {
    marginBottom: 24,
  },
  questionLabel: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 12,
    color: '#666',
  },
  questionBox: {
    backgroundColor: '#F0F8FF',
    padding: 16,
    borderRadius: 12,
    borderLeftWidth: 4,
    borderLeftColor: '#007AFF',
  },
  questionText: {
    fontSize: 16,
    lineHeight: 24,
  },
  answerSection: {
    marginBottom: 24,
  },
  answerLabel: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 12,
    color: '#666',
  },
  answerBox: {
    backgroundColor: '#F9F9F9',
    padding: 20,
    borderRadius: 12,
  },
  answerText: {
    fontSize: 16,
    lineHeight: 26,
  },
  disclaimerSection: {
    marginBottom: 100,
  },
  disclaimerBox: {
    backgroundColor: '#FFF5F5',
    padding: 16,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#FFE0E0',
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 12,
  },
  disclaimerText: {
    fontSize: 14,
    lineHeight: 20,
    opacity: 0.8,
    flex: 1,
  },
  actionButtons: {
    flexDirection: 'row',
    paddingHorizontal: 24,
    paddingVertical: 20,
    gap: 12,
  },
  actionButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    borderWidth: 1,
    borderColor: '#007AFF',
    borderRadius: 12,
    gap: 6,
  },
  primaryAction: {
    backgroundColor: '#007AFF',
  },
  actionButtonText: {
    color: '#007AFF',
    fontSize: 14,
    fontWeight: '500',
  },
  primaryActionText: {
    color: 'white',
  },
});
