import React from 'react';
import Header from './components/Header';
import '@/styles/globals.css';
import { LoadingProvider } from './hooks/useLoading';
import LoadingScreen from './components/LoadingScreen';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <LoadingProvider>
          <LoadingScreen />
          <Header />
          <main className="bg-zinc-900 p-4">
            <div className="min-h-screen max-w-2xl mx-auto" >   
              {children}
            </div>
          </main>
        </LoadingProvider>
      </body>
    </html>
  );
}
