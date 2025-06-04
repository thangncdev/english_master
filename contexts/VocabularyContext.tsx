import React, { createContext, useContext, useState } from 'react';

export type Word = {
  word: string;
  meaning: string;
};

interface VocabularyContextProps {
  words: Word[];
  addWord: (word: string, meaning: string) => void;
}

const VocabularyContext = createContext<VocabularyContextProps | undefined>(undefined);

export function VocabularyProvider({ children }: { children: React.ReactNode }) {
  const [words, setWords] = useState<Word[]>([]);

  const addWord = (word: string, meaning: string) => {
    setWords((prev) => [...prev, { word, meaning }]);
  };

  return (
    <VocabularyContext.Provider value={{ words, addWord }}>
      {children}
    </VocabularyContext.Provider>
  );
}

export function useVocabulary() {
  const context = useContext(VocabularyContext);
  if (!context) {
    throw new Error('useVocabulary must be used within a VocabularyProvider');
  }
  return context;
}
