'use client';
import { createContext, useContext, useState, useCallback, ReactNode } from 'react';
import { useRouter } from 'next/navigation';

interface LoadingContextType {
  isLoading: boolean;
  setIsLoading: (loading: boolean) => void;
  withLoading: (action: () => Promise<void>) => Promise<void>;
  navigateWithLoading: (path: string) => Promise<void>;
}

const LoadingContext = createContext<LoadingContextType | undefined>(undefined);

export function LoadingProvider({ children }: { children: ReactNode }) {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const withLoading = useCallback(async (action: () => Promise<void>) => {
    setIsLoading(true);
    try {
      await action();
    } finally {
      setIsLoading(false);
    }
  }, []);

  const navigateWithLoading = useCallback(async (path: string) => {
    await withLoading(async () => {
      await router.refresh();
      router.push(path);
    });
  }, [router, withLoading]);

  return (
    <LoadingContext.Provider value={{ isLoading, setIsLoading, withLoading, navigateWithLoading }}>
      {children}
    </LoadingContext.Provider>
  );
}

export function useLoading() {
  const context = useContext(LoadingContext);
  if (context === undefined) {
    throw new Error('useLoading must be used within a LoadingProvider');
  }
  return context;
}