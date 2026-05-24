import { create } from "zustand";
import { persist } from "zustand/middleware";

export interface HistoryEntry {
  id: string;
  tool: string;
  category: string;
  input: string;
  output: string;
  timestamp: number;
}

interface HistoryState {
  entries: HistoryEntry[];
  add: (entry: Omit<HistoryEntry, "id" | "timestamp">) => void;
  clear: () => void;
}

const MAX_ENTRIES = 10;

export const useHistoryStore = create<HistoryState>()(
  persist(
    (set) => ({
      entries: [],
      add: (entry) =>
        set((state) => {
          const next: HistoryEntry = {
            ...entry,
            id: `${Date.now()}-${Math.random().toString(36).slice(2, 9)}`,
            timestamp: Date.now(),
          };
          const filtered = [next, ...state.entries].slice(0, MAX_ENTRIES);
          return { entries: filtered };
        }),
      clear: () => set({ entries: [] }),
    }),
    { name: "textkit-history" },
  ),
);
