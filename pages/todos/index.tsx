import type { NextPage } from 'next';
import TodoLists from '../../components/TodoList/TodoLists';

const TodoListsPage: NextPage = () => {
  return <TodoLists />;
};

export async function getStaticProps() {
  return {
    props: {
      protected: true,
    },
  };
}

export default TodoListsPage;
