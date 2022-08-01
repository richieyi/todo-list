import type { NextPage } from 'next';
import TodoLists from '../../components/TodoList/TodoLists';

const TodoListsPage: NextPage = () => {
  return (
    <div>
      <h1 className="text-2xl">Todos Lists Page</h1>
      <TodoLists />
    </div>
  );
};

export default TodoListsPage;
