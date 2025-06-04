import { Stack } from 'expo-router';
import { View } from 'react-native';
import { Link } from 'expo-router';
import { Button } from 'react-native';

export default function QuizMenuScreen() {
  return (
    <View style={{ flex: 1, padding: 16, gap: 12 }}>
      <Stack.Screen options={{ title: 'Quiz' }} />
      <Link href="/vocab/quiz/meaning" asChild>
        <Button title="Word -> Meaning" />
      </Link>
      <Link href="/vocab/quiz/word" asChild>
        <Button title="Meaning -> Word" />
      </Link>
      <Link href="/vocab/quiz/scramble" asChild>
        <Button title="Unscramble" />
      </Link>
    </View>
  );
}
