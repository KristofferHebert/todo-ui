import Link from 'next/link';
export default function Todo({
  title,
  id,
  color,
  completed,
  handleCompleted,
  handleDelete,
}) {
  return (
    <div className="flex items-center justify-between bg-zinc-800 p-4 rounded-lg border border-zinc-700 mb-4">
      <div className="flex items-center gap-3">
        <input
          type="checkbox"
          className="w-5 h-5 rounded-full border-2 border-zinc-700 checked:bg-purple-500"
          defaultChecked={completed}
          onClick={handleCompleted}
        />
        <Link 
          href={`/edit/${id}`}
          className="group flex items-center gap-2"
        >
          <span className={completed ? 'text-zinc-500 line-through' : 'text-white'}>
            {title}
          </span>
          <span className="text-zinc-600 opacity-0 group-hover:opacity-100 transition-opacity">
            ✏️
          </span>
        </Link>
      </div>
      <button
        className="text-zinc-600 hover:text-zinc-400"
        onClick={handleDelete}
      >
        <span className="text-xl">🗑</span>
      </button>
    </div>
  );
}
