import React from 'react';
import { useRouter } from 'next/router';
import { gql, useQuery } from '@apollo/client';
import Todo from './index';
import NewTodoForm from './NewTodoForm';

interface Todo {
  id: string;
  name: string;
  completed: boolean;
  todoListId: string;
}

const GET_TODOS = gql`
  query GetTodos($todoListId: String!) {
    todos(todoListId: $todoListId) {
      id
      name
      completed
    }
  }
`;

function Todos() {
  const router = useRouter();
  const { data, loading, error } = useQuery(GET_TODOS, {
    variables: {
      todoListId: router.query.id,
    },
    skip: !router.isReady,
  });

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Oh no... {error.message}</p>;

  function renderTodos() {
    return data?.todos.map((todo: Todo) => (
      <Todo key={todo.id} todo={todo} />
    ));
  }

  return (
    <>
      <NewTodoForm />
      <div>{renderTodos()}</div>
    </>
  );
}

export default Todos;
