"use client";

import { createContext, useCallback, useContext, useState, type ReactNode } from "react";

type SectionNavContextValue = {
  index: number;
  count: number;
  goTo: (i: number) => void;
  goToId: (id: string) => void;
  next: () => void;
  prev: () => void;
};

const SectionNavContext = createContext<SectionNavContextValue | null>(null);

export function SectionNavProvider({ ids, children }: { ids: string[]; children: ReactNode }) {
  const [index, setIndex] = useState(0);
  const count = ids.length;

  const goTo = useCallback((i: number) => setIndex(Math.max(0, Math.min(count - 1, i))), [count]);
  const goToId = useCallback(
    (id: string) => {
      const i = ids.indexOf(id);
      if (i !== -1) setIndex(i);
    },
    [ids]
  );
  const next = useCallback(() => setIndex((i) => Math.min(count - 1, i + 1)), [count]);
  const prev = useCallback(() => setIndex((i) => Math.max(0, i - 1)), []);

  return (
    <SectionNavContext.Provider value={{ index, count, goTo, goToId, next, prev }}>
      {children}
    </SectionNavContext.Provider>
  );
}

export function useSectionNav() {
  const ctx = useContext(SectionNavContext);
  if (!ctx) throw new Error("useSectionNav must be used within SectionNavProvider");
  return ctx;
}
