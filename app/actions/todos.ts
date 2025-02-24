'use server';
import { API_CONFIG } from '@/constants/config';
import { unstable_cache, revalidatePath } from 'next/cache'

const TODOS_API_ENDPOINT = API_CONFIG.api.todos;

export const getCachedTodos = unstable_cache(
  async () => {
    const res = await fetch(TODOS_API_ENDPOINT, {
      next: { revalidate: 10 },
    });
    const data = await res.json();
    return data.todos;
  },
  ['todos'],
  { revalidate: 10 }
);

export async function getTodos() {
  console.log(TODOS_API_ENDPOINT);
  const response = await fetch(TODOS_API_ENDPOINT, {
    cache: 'no-store',
    headers: {
      'Cache-Control': 'no-cache',
    },
  });
  const data = await response.json();
  return data.todos;
}

export async function getTodo(id: string) {
  const response = await fetch(`${TODOS_API_ENDPOINT  }/${id}`, {
    cache: 'no-store',
    headers: {
      'Cache-Control': 'no-cache',
    },
  });
  return response.json();
}

export async function postTodo(todo) {
  const response = await fetch(TODOS_API_ENDPOINT, {
    method: API_CONFIG.methods.POST,
    headers: API_CONFIG.headers,
    body: JSON.stringify(todo),
  });

  if (!response.ok) {
    throw new Error('Failed to create todo');
  }
  revalidatePath('/');

  return response.json();
}

export async function deleteTodo(id: string) {
  const response = await fetch(`${TODOS_API_ENDPOINT}/${id}`, {
    method: API_CONFIG.methods.DELETE,
    headers: API_CONFIG.headers,
  });

  if (!response.ok) {
    throw new Error('Failed to delete todo');
  }
  revalidatePath('/');
  return response.json();
}

export async function editTodo(id: string, todo) {
  const response = await fetch(`${TODOS_API_ENDPOINT}/${id}`, {
    method: API_CONFIG.methods.PUT,
    headers: API_CONFIG.headers,
    body: JSON.stringify(todo),
  });

  if (!response.ok) {
    throw new Error('Failed to put todo');
  }
  revalidatePath('/');

  return response.json();
}
