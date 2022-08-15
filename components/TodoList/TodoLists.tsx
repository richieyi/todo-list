import React from 'react';
import { useQuery } from '@apollo/client';
import TodoList from '../../components/TodoList';
import NewTodoListForm from './NewTodoListForm';
import { GET_TODO_LISTS } from './queries';

export interface TodoListItem {
  id: string;
  name: string;
}

function TodoLists() {
  const { data, loading, error } = useQuery(GET_TODO_LISTS);
  console.log(data);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Oh no... {error.message}</p>;

  function renderTodoLists() {
    return data?.todoLists.map((todoListItem: TodoListItem) => (
      <TodoList key={todoListItem.id} todoListItem={todoListItem} />
    ));
  }

  return (
    <div className="border rounded drop-shadow-lg p-4 my-4">
      <h1 className="text-2xl mb-8">My Todo Lists</h1>
      <NewTodoListForm />
      <div>{renderTodoLists()}</div>
    </div>
  );
}

export default TodoLists;
