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
      <div className="flex justify-between items-center my-4">
        <h1 className="text-2xl">My Todos</h1>
        <Link href="/todos">
          <span className="hover:cursor-pointer bg-blue-500 hover:bg-blue-700 disabled:bg-gray-200 text-white font-bold py-2 px-4 rounded">
            Back
          </span>
        </Link>
      </div>
      <NewTodoForm />
      <div>{renderTodos()}</div>
    </>
  );
}

export default Todos;
