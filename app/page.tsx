import Link from 'next/link';
import TodosList from './components/TodosList';
import { getTodos } from './actions/todos';
import { Suspense } from 'react';
import LoadingScreen from './components/LoadingScreen';
import { Todo } from '@/types/todo';

export default async function Home() {
  const todos = await getTodos();

  return (
    <main>
      <Link
        href="/create"
        className="w-full bg-blue-600 text-white py-4 rounded-lg mb-8 flex items-center justify-center"
      >
        Create Task
        <span className="text-xl ml-1">⊕</span>
      </Link>
      <Suspense fallback={<LoadingScreen />}>
          <TodosList todos={todos as Todo[]} />
        </Suspense>
    </main>
  );
}
