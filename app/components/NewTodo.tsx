'use client';
import Link from 'next/link';
import { useState } from 'react';
import { postTodo } from '@/actions/todos';
import ColorSelector from './ColorSelector';
import { ColorKey } from '@/constants/colors';
import { Todo, defaultTodo } from '@/types/todo';
import { useLoading } from '@/hooks/useLoading';
export default function NewTodo() {
  const [newTodo, setNewTodo] = useState<Todo>(defaultTodo);
  const [error, setError] = useState<string | null>(null);

  const { navigateWithLoading, isLoading, setIsLoading  } = useLoading();

  const setNewTodoValue = (key: string, value: string | boolean) => {
    const updatedNewTodo = { ...newTodo };
    updatedNewTodo[key] = value;
    setNewTodo(updatedNewTodo);
  };

  const handleColorSelect = (color: ColorKey) => {
    setNewTodoValue('color', color);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      setIsLoading(true);
      await postTodo(newTodo);
      setNewTodo(defaultTodo);
      setIsLoading(false);
      navigateWithLoading('/');
    } catch (error) {
      setError('Failed to create todo, please try again later');
      console.error('Failed to create todo:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleBackClick = async () => {
    navigateWithLoading('/');
    setNewTodo(defaultTodo);
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
              value={newTodo.title}
              onChange={(e) => setNewTodoValue('title', e.target.value)}
              placeholder="Enter todo title"
              max={25}
              required
            />
          </div>
          <div className="space-y-2 mb-4">
            <label className="text-blue-400 block text-sm">Color</label>
            <ColorSelector
              currentColor={newTodo.color as ColorKey}
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
