import React from 'react';
import { useQuery, gql } from '@apollo/client';
import TodoList from '../../components/TodoList';
import NewTodoListForm from './NewTodoListForm';

const GET_TODO_LISTS = gql`
  query GetTodoLists {
    todoLists {
      id
      name
    }
  }
`;

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
    <div className="text-3xl">
      <h1>Todos Lists Page</h1>
      <div>
        <span>NEW TODO LIST</span>
        <NewTodoListForm />
      </div>
      <div>{renderTodoLists()}</div>
    </div>
  );
}

export default TodoLists;