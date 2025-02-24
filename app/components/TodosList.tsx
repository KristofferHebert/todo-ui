'use client';
import Todo from './Todo';
import { Todo as TodoType } from '@/types/todo';
import { useTodos } from '@/hooks/useTodos';

export function EmptyTodos() {
  return (
    <div className="flex flex-col items-center justify-center text-center p-8">
      <div className="text-zinc-600 text-6xl mb-4">📋</div>
      <h2 className="text-zinc-400 text-xl mb-2">
        You don't have any tasks registered yet.
      </h2>
      <p className="text-zinc-600">
        Create tasks and organize your to-do items.
      </p>
    </div>
  );
}

export default function TodoList({ todos }: { todos: TodoType[] }) {
  const { todos: myTodos, remove, update, completed, total, error } = useTodos(todos);

  const handleDelete = async (id: string) => {
    if (confirm('Are you sure you want to delete this task?')) {
      await remove(id);
    }
  };
  const handleComplete = async (id: string, completed: boolean) => {
    await update(id, { completed: !completed });
  };

  if (total === 0) {
    return <EmptyTodos />;
  }
  if (error) {
    return <div className="text-red-500 mb-4 border border-red-500 rounded-lg p-4">{error}</div>;
  }
  return (
    <>
      <div className="flex justify-between items-center mb-6">
        <div className="flex items-center gap-2">
          <span className="text-blue-400">Tasks</span>
          <span className="bg-zinc-800 px-2 py-1 rounded-full text-sm">
            {total}
          </span>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-purple-400">Completed: </span>
          <span className="text-zinc-400 px-2 py-1 rounded-full text-sm">
            {completed} of {total}
          </span>
        </div>
      </div>
      <hr className="border-zinc-800 mb-6 mt-6" />

      <div className="space-y-2">
        {myTodos.map((todo) => (
          <Todo
            key={todo.id}
            id={todo.id}
            title={todo.title}
            color={todo.color}
            completed={todo.completed}
            handleCompleted={() => handleComplete(todo.id, todo.completed)}
            handleDelete={() => handleDelete(todo.id)}
          />
        ))}
      </div>
    </>
  );
}
