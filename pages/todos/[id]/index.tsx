import Link from 'next/link';
import Todos from '../../../components/Todo/Todos';

function TodosPage() {
  return (
    <div>
      <Link href="/todos">Back to todos</Link>
      <h1 className="text-2xl">Todos page</h1>
      <Todos />
    </div>
  );
}

export default TodosPage;
