import React, { ChangeEvent, useState } from 'react';
import { useQuery, useMutation, gql } from '@apollo/client';
import TodoListItem from '../../components/TodoListItem';

const GET_TODO_LISTS = gql`
  query GetTodoLists {
    todoLists {
      id
      name
    }
  }
`;

const CREATE_TODO_LIST = gql`
  mutation CreateTodoList($name: String!) {
    createTodoList(name: $name) {
      id
      name
    }
  }
`;

function TodosListsPage() {
  const [name, setName] = useState<string>('');
  const { data, loading, error } = useQuery(GET_TODO_LISTS);
  const [createTodoList, { loading: createLoading }] = useMutation(
    CREATE_TODO_LIST,
    {
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
    }
  );

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Oh no... {error.message}</p>;

  function handleSubmit(e: ChangeEvent<HTMLFormElement>) {
    e.preventDefault();

    createTodoList({
      variables: {
        name,
      },
    });
    setName('');
  }

  function renderTodos() {
    return data?.todoLists.map((todoListItem: any) => (
      <TodoListItem
        key={todoListItem.id}
        todoListItem={todoListItem}
      />
    ));
  }

  return (
    <div className="text-3xl">
      <h1>Todos Page</h1>
      <span>NEW TODO LIST</span>
      <form onSubmit={handleSubmit}>
        <label htmlFor="todoListName">New Todo List</label>
        <input
          name="todoListName"
          value={name}
          onChange={(e: ChangeEvent<HTMLInputElement>) =>
            setName(e.target.value)
          }
        />
        <button type="submit" disabled={createLoading}>
          Submit
        </button>
      </form>
      <div>{renderTodos()}</div>
    </div>
  );
}

export default TodosListsPage;
