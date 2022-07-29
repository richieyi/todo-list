import React from 'react';
import Link from 'next/link';
import { useQuery, gql } from '@apollo/client';

const GET_TODO_LISTS = gql`
  query {
    todoLists {
      id
      name
      tasks {
        id
        name
        status
        todoListId
      }
    }
  }
`;

function TodosPage() {
  const { data, loading, error } = useQuery(GET_TODO_LISTS);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Oh no... {error.message}</p>;

  console.log(data);

  function renderTodos() {
    return data?.todoLists.map((todoList: any) => (
      <div key={todoList.id}>
        <Link
          href={{
            pathname: '/todos/[id]',
            query: { id: todoList.id },
          }}
        >
          {todoList.name}
        </Link>
      </div>
    ));
  }

  return (
    <div className="text-3xl">
      <h1>Todos Page</h1>
      <div>{renderTodos()}</div>
    </div>
  );
}

export default TodosPage;
