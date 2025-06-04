import { Stack, router } from 'expo-router';
import { useState } from 'react';
import { View, TextInput, Button } from 'react-native';

import { useVocabulary } from '@/contexts/VocabularyContext';
import { ThemedText } from '@/components/ThemedText';

export default function AddWordScreen() {
  const { addWord } = useVocabulary();
  const [word, setWord] = useState('');
  const [meaning, setMeaning] = useState('');

  const handleAdd = () => {
    if (!word || !meaning) return;
    addWord(word.trim(), meaning.trim());
    router.back();
  };

  return (
    <View style={{ flex: 1, padding: 16, gap: 12 }}>
      <Stack.Screen options={{ title: 'Add Word' }} />
      <ThemedText>Word</ThemedText>
      <TextInput
        value={word}
        onChangeText={setWord}
        style={{ borderWidth: 1, padding: 8, borderRadius: 4 }}
      />
      <ThemedText>Meaning</ThemedText>
      <TextInput
        value={meaning}
        onChangeText={setMeaning}
        style={{ borderWidth: 1, padding: 8, borderRadius: 4 }}
      />
      <Button title="Save" onPress={handleAdd} />
    </View>
  );
}
