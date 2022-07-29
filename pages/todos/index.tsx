import React, { useState } from 'react';
import Link from 'next/link';
import { useQuery, useMutation, gql } from '@apollo/client';

const GET_TODO_LISTS = gql`
  query GetTodoLists {
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

const CREATE_TODO_LIST = gql`
  mutation CreateTodoList($name: String!) {
    createTodoList(name: $name) {
      id
      name
      tasks {
        id
      }
    }
  }
`;

function TodosPage() {
  const [name, setName] = useState<string>('');
  const { data, loading, error } = useQuery(GET_TODO_LISTS);
  const [createTodoList] = useMutation(CREATE_TODO_LIST, {
    update(cache, { data: { createTodoList } }) {
      const { todoLists }: any = cache.readQuery({
        query: GET_TODO_LISTS,
      });

      cache.writeQuery({
        query: GET_TODO_LISTS,
        data: {
          todoLists: [...todoLists, createTodoList],
        },
      });
    },
  });

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Oh no... {error.message}</p>;

  function handleSubmit(e: any) {
    e.preventDefault();

    createTodoList({
      variables: {
        name,
      },
    });
  }

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
      <span>NEW TODO LIST</span>
      <form onSubmit={handleSubmit}>
        <input
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <button type="submit" className="hidden" />
      </form>
      <div>{renderTodos()}</div>
    </div>
  );
}

export default TodosPage;
