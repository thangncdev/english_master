import { Link } from 'expo-router';
import { View, FlatList, Button } from 'react-native';
import { ThemedText } from '@/components/ThemedText';
import { useVocabulary } from '@/contexts/VocabularyContext';

export default function VocabularyScreen() {
  const { words } = useVocabulary();

  return (
    <View style={{ flex: 1, padding: 16 }}>
      <View style={{ flexDirection: 'row', gap: 12, marginBottom: 12 }}>
        <Link href="/vocab/add" asChild>
          <Button title="Add Word" />
        </Link>
        <Link href="/vocab/quiz" asChild>
          <Button title="Quiz" />
        </Link>
      </View>
      <FlatList
        data={words}
        keyExtractor={(_, idx) => String(idx)}
        renderItem={({ item }) => (
          <ThemedText>
            {item.word} - {item.meaning}
          </ThemedText>
        )}
        ListEmptyComponent={<ThemedText>No words yet.</ThemedText>}
      />
    </View>
  );
}
