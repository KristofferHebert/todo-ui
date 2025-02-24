'use client';
import { useLoading } from '@/hooks/useLoading';

export function LoadingOverlay () {
    return (
      <div className="absolute inset-0 bg-zinc-950/50 backdrop-blur-sm flex items-center justify-center">
      <div className="w-8 h-8 border-4 border-blue-500 border-t-transparent rounded-full animate-spin" />
    </div>
    )
}

export default function LoadingScreen() {
  const { isLoading } = useLoading();
  
  if (!isLoading) return null;
  return <LoadingOverlay />;
} 