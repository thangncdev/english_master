import { Stack } from 'expo-router';
import { useState, useEffect } from 'react';
import { View, Button } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ThemedText } from '@/components/ThemedText';
import { useVocabulary } from '@/contexts/VocabularyContext';

export default function QuizScrambleScreen() {
  const { words } = useVocabulary();
  const [current, setCurrent] = useState(0);
  const [letters, setLetters] = useState<string[]>([]);
  const [answer, setAnswer] = useState('');

  if (words.length === 0) {
    return (
      <SafeAreaView style={{ flex: 1, padding: 16 }}>
        <Stack.Screen options={{ title: 'Unscramble' }} />
        <ThemedText>No words to practice.</ThemedText>
      </SafeAreaView>
    );
  }

  const word = words[current];

  useEffect(() => {
    setLetters(shuffle(word.word.split('')));
    setAnswer('');
  }, [current]);

  const choose = (letter: string, idx: number) => {
    setLetters((l) => l.filter((_, i) => i !== idx));
    setAnswer((a) => a + letter);
  };

  const next = () => {
    setLetters([]);
    setAnswer('');
    setCurrent((c) => (c + 1) % words.length);
  };

  const solved = letters.length === 0 && answer.toLowerCase() === word.word.toLowerCase();

  return (
    <SafeAreaView style={{ flex: 1, padding: 16, gap: 12 }}>
      <Stack.Screen options={{ title: 'Unscramble' }} />
      <ThemedText>{word.meaning}</ThemedText>
      <ThemedText type="title">{answer}</ThemedText>
      <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: 8 }}>
        {letters.map((l, idx) => (
          <Button key={`${l}-${idx}`} title={l} onPress={() => choose(l, idx)} />
        ))}
      </View>
      {solved && <Button title="Next" onPress={next} />}
    </SafeAreaView>
  );
}

function shuffle<T>(array: T[]): T[] {
  return array
    .map((value) => ({ value, sort: Math.random() }))
    .sort((a, b) => a.sort - b.sort)
    .map(({ value }) => value);
}
