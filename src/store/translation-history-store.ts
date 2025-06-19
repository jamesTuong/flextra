import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";
import { immer } from "zustand/middleware/immer";

export interface TranslationHistoryItem {
  id: string;
  sourceText: string;
  translatedText: string;
  sourceLang: string;
  targetLang: string;
  timestamp: Date;
}

interface TranslationHistoryState {
  history: TranslationHistoryItem[];
  addToHistory: (
    sourceText: string,
    translatedText: string,
    sourceLang: string,
    targetLang: string,
  ) => void;
  removeFromHistory: (id: string) => void;
  clearHistory: () => void;
  searchHistory: (query: string) => TranslationHistoryItem[];
}

const MAX_HISTORY_ITEMS = 100;

export const useTranslationHistoryStore = create<TranslationHistoryState>()(
  persist(
    immer((set, get) => ({
      history: [],
      addToHistory: (sourceText, translatedText, sourceLang, targetLang) => {
        set((state) => {
          const newItem: TranslationHistoryItem = {
            id: Date.now().toString(),
            sourceText,
            translatedText,
            sourceLang,
            targetLang,
            timestamp: new Date(),
          };

          // Remove duplicates (same source text and language pair)
          const filtered = state.history.filter(
            (item) =>
              !(
                item.sourceText === sourceText &&
                item.sourceLang === sourceLang &&
                item.targetLang === targetLang
              ),
          );

          // Add new item at the beginning and limit to MAX_HISTORY_ITEMS
          state.history = [newItem, ...filtered].slice(0, MAX_HISTORY_ITEMS);
        });
      },

      removeFromHistory: (id) => {
        set((state) => {
          state.history = state.history.filter((item) => item.id !== id);
        });
      },

      clearHistory: () => {
        set((state) => {
          state.history = [];
        });
      },

      searchHistory: (query) => {
        const { history } = get();
        if (!query.trim()) return history;

        const lowercaseQuery = query.toLowerCase();
        return history.filter(
          (item) =>
            item.sourceText.toLowerCase().includes(lowercaseQuery) ||
            item.translatedText.toLowerCase().includes(lowercaseQuery),
        );
      },
    })),
    {
      name: "translation-history-storage",
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({ history: state.history }),
    },
  ),
);
