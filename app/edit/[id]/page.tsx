import { getTodo } from '@/actions/todos';
import { notFound } from 'next/navigation';
import EditTodo from '@/components/EditTodo';

export default async function EditTodoPage({ params }) {
  const { id } = await params;
  const todo = await getTodo(id);
  if (!todo) {
    notFound();
  }
  return (
    <main>
      <EditTodo todo={todo} />
    </main>
  );
}
