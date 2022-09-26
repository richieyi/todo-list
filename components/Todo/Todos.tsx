import React, { useState } from 'react';
import { useRouter } from 'next/router';
import { useQuery } from '@apollo/client';
import Link from 'next/link';
import Todo from './Todo';
import NewTodoForm from './NewTodoForm';
import { GET_TODOS } from './queries';

export interface Todo {
  id: string;
  name: string;
  completed: boolean;
  todoListId: string;
}

const todoFilters: TodoFilterType[] = [
  'All',
  'Completed',
  'Incomplete',
];
type TodoFilterType = 'All' | 'Completed' | 'Incomplete';

function Todos() {
  const [todoFilter, setTodoFilter] = useState<TodoFilterType>(
    todoFilters[0]
  );

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

  function renderFilters() {
    return todoFilters.map((filter, idx) => (
      <button key={idx} className="hover:text-blue-700">
        {filter}
      </button>
    ));
  }

  return (
    <div className="border rounded drop-shadow-lg p-4 my-4">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-2xl">My Todos</h1>
        <Link href="/todos">
          <span className="hover:cursor-pointer bg-blue-500 hover:bg-blue-700 disabled:bg-gray-200 text-white font-bold py-2 px-4 rounded">
            Back
          </span>
        </Link>
      </div>
      <NewTodoForm />
      <div className="flex justify-between m-4">
        {renderFilters()}
      </div>
      <div>{renderTodos()}</div>
    </div>
  );
}

export default Todos;
