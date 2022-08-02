import React from 'react';
import { useQuery } from '@apollo/client';
import TodoList from '../../components/TodoList';
import NewTodoListForm from './NewTodoListForm';
import { GET_TODO_LISTS } from './queries';

function TodoLists() {
  const { data, loading, error } = useQuery(GET_TODO_LISTS);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Oh no... {error.message}</p>;

  function renderTodoLists() {
    return data?.todoLists.map((todoListItem: any) => (
      <TodoList key={todoListItem.id} todoListItem={todoListItem} />
    ));
  }

  return (
    <>
      <h1 className="text-2xl">Todos Lists Page</h1>
      <NewTodoListForm />
      <div>{renderTodoLists()}</div>
    </>
  );
}

export default TodoLists;
