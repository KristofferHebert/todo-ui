'use client';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { editTodo } from '@/actions/todos';
import ColorSelector from './ColorSelector';
import { ColorKey } from '@/constants/colors';
import { Todo, defaultTodo } from '@/types/todo';
import { useLoading } from '@/hooks/useLoading';

export default function EditTodo({ todo }: { todo: Todo }) {
  const [currentTodo, editCurrentTodo] = useState<Todo>(todo);
  const { setIsLoading, isLoading, navigateWithLoading } = useLoading();
  const [error, setError] = useState<string | null>(null);

  const setTodoValue = (key: string, value: string | boolean) => {
    const updatedNewTodo = { ...currentTodo };
    updatedNewTodo[key] = value;
    editCurrentTodo(updatedNewTodo);
  };

  const handleColorSelect = (color: ColorKey) => {
    setTodoValue('color', color);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      setIsLoading(true);
      await editTodo(currentTodo.id, currentTodo);
      editCurrentTodo(defaultTodo);
      setIsLoading(false);
      navigateWithLoading('/');
    } catch (error) {
        setError('Failed to edit todo, please try again later');
        console.error('Failed to edit todo:', error);
      } finally {
        setIsLoading(false);
      }
  };

  const handleBackClick = async () => {
    navigateWithLoading('/');
    editCurrentTodo(defaultTodo);
  };

  return (
    <div className="max-w-2xl mx-auto">
      <Link
        href="/"
        onClick={handleBackClick}
        className="inline-flex items-center text-zinc-400 hover:text-white mb-8"
      >
        <span className="text-2xl">←</span>
      </Link>
      <form onSubmit={handleSubmit}>
        <div className="space-y-2 mb-4">
          <label className="text-blue-400 block text-sm">Title</label>
          <input
            className="w-full bg-zinc-900 border border-zinc-800 rounded-lg p-3 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            type="text"
            value={currentTodo.title}
            onChange={(e) => setTodoValue('title', e.target.value)}
            placeholder="Enter todo title"
            max={25}
            required
          />
        </div>
        <div className="space-y-2 mb-4">
          <label className="text-blue-400 block text-sm">Color</label>
          <ColorSelector
            currentColor={currentTodo.color as ColorKey}
            onColorSelect={handleColorSelect}
          />
        </div>
        {error && <div className="text-red-500 mb-4 border border-red-500 rounded-lg p-4">{error}</div>}
        <button
            type="submit"
            disabled={isLoading}
            className="w-full bg-blue-600 text-white py-4 rounded-lg hover:bg-blue-700 transition-colors flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isLoading ? (
              <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
            ) : (
              <>
                Add Task
                <span className="text-xl">⊕</span>
              </>
            )}
          </button>
      </form>
    </div>
  );
}
