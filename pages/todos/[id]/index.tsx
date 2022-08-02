import type { NextPage } from 'next';
import Todos from '../../../components/Todo/Todos';

const TodosPage: NextPage = () => {
  return <Todos />;
};

export async function getStaticProps() {
  return {
    props: {
      protected: true,
    },
  };
}

export default TodosPage;
