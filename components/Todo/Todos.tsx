import React from 'react';
import { useRouter } from 'next/router';
import { useQuery } from '@apollo/client';
import Link from 'next/link';
import Todo from './index';
import NewTodoForm from './NewTodoForm';
import { GET_TODOS } from './queries';

interface Todo {
  id: string;
  name: string;
  completed: boolean;
  todoListId: string;
}

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
      <Link href="/todos">Back to todos</Link>
      <h1 className="text-2xl">Todos page</h1>
      <NewTodoForm />
      <div>{renderTodos()}</div>
    </>
  );
}

export default Todos;
