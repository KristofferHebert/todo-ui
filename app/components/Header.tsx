import React from 'react';
import Link from 'next/link';

export default function Header() {
  return (
    <header className="flex items-center justify-center bg-zinc-950 pt-12 pb-12">
      <div className="flex gap-2">
        <Link href="/" className="text-4xl font-bold flex items-center">
          <span className="text-4xl mr-2">🚀</span>
          <span className="text-blue-400">Todo</span>
          <span className="text-purple-400">App</span>
        </Link>
      </div>
    </header>
  );
}
