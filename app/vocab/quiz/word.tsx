import { Stack } from 'expo-router';
import { useState } from 'react';
import { Button } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ThemedText } from '@/components/ThemedText';
import { useVocabulary } from '@/contexts/VocabularyContext';

export default function QuizWordScreen() {
  const { words } = useVocabulary();
  const [current, setCurrent] = useState(0);
  const [show, setShow] = useState(false);

  if (words.length === 0) {
    return (
      <SafeAreaView style={{ flex: 1, padding: 16 }}>
        <Stack.Screen options={{ title: 'Meaning -> Word' }} />
        <ThemedText>No words to practice.</ThemedText>
      </SafeAreaView>
    );
  }

  const word = words[current];
  const options = shuffle([word.word, ...randomWords(words, word.word)]);

  const handleAnswer = (answer: string) => {
    setShow(answer === word.word);
  };

  const next = () => {
    setShow(false);
    setCurrent((c) => (c + 1) % words.length);
  };

  return (
    <SafeAreaView style={{ flex: 1, padding: 16, gap: 12 }}>
      <Stack.Screen options={{ title: 'Meaning -> Word' }} />
      <ThemedText type="title">{word.meaning}</ThemedText>
      {options.map((m) => (
        <Button key={m} title={m} onPress={() => handleAnswer(m)} />
      ))}
      {show && <Button title="Next" onPress={next} />}
    </SafeAreaView>
  );
}

function randomWords(words: { word: string }[], exclude: string) {
  const arr = words.map((w) => w.word).filter((m) => m !== exclude);
  return shuffle(arr).slice(0, 3);
}

function shuffle<T>(array: T[]): T[] {
  return array
    .map((value) => ({ value, sort: Math.random() }))
    .sort((a, b) => a.sort - b.sort)
    .map(({ value }) => value);
}
