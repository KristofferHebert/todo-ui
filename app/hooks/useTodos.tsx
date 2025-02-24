
import useSWR, { mutate } from 'swr';
import { API_CONFIG } from '@/constants/config';

const TODOS_URL = API_CONFIG.api.todos;

const fetcher = async (url: string) => {
  const res = await fetch(url, {
    headers: {
      ...API_CONFIG.headers,
    },
  });
  if (!res.ok) throw new Error('Network response was not ok');
  const data = await res.json();
  return data.todos;
};

export function useTodos(todos) {
  const { data, error, mutate } = useSWR(TODOS_URL, fetcher, {
    fallbackData: todos,
    revalidateOnMount: true,
  });

  const create = async (newTodo) => {
    const optimisticData = [...data, newTodo];

    try {
      await mutate(
        async () => {
          const res = await fetch(TODOS_URL, {
            method: API_CONFIG.methods.POST,
            headers: API_CONFIG.headers,
            body: JSON.stringify(newTodo),
          });
          if (!res.ok) throw new Error('Failed to create todo');
          return optimisticData;
        },
        { optimisticData, revalidate: false }
      );
    } catch (error) {
      await mutate(data, { revalidate: false });
      throw error;
    }
  };

  const update = async (id: string, updates) => {
    const optimisticData = data?.map((todo) =>
      todo.id === id ? { ...todo, ...updates } : todo
    );

    try {
      await mutate(
        async () => {
          const res = await fetch(`${TODOS_URL}/${id}`, {
            method: API_CONFIG.methods.PUT,
            headers: API_CONFIG.headers,
            body: JSON.stringify(updates),
          });
          if (!res.ok) throw new Error('Failed to update todo');
          return optimisticData;
        },
        { optimisticData, revalidate: false }
      );
    } catch (error) {
      await mutate(data, { revalidate: false });
      throw error;
    }  
  };

  const remove = async (id: string) => {
    const optimisticData = data?.filter((todo) => todo.id !== id);

    try {
      await mutate(
        async () => {
          const res = await fetch(`${TODOS_URL}/${id}`, {
            method: API_CONFIG.methods.DELETE,
            headers: API_CONFIG.headers,
          });
          if (!res.ok) throw new Error('Failed to delete todo');
          return optimisticData;
        },
        { optimisticData, revalidate: false }
      );
    } catch (error) {
      await mutate(data, { revalidate: false });
      throw error;
    }
  };

  const total = data?.length ?? 0;
  const completed = data?.filter((todo) => todo.completed).length ?? 0;

  return {
    todos: data,
    error,
    completed,
    total,
    create,
    update,
    remove,
  };
}
