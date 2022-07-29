import React, { ChangeEvent, useState } from 'react';
import Link from 'next/link';
import { gql, useMutation } from '@apollo/client';

const UPDATE_TODO_LIST = gql`
  mutation UpdateTodoList($id: String!, $name: String!) {
    updateTodoList(id: $id, name: $name) {
      id
      name
    }
  }
`;

const DELETE_TODO_LIST = gql`
  mutation DeleteTodoList($id: String!) {
    deleteTodoList(id: $id) {
      id
    }
  }
`;

const GET_TODO_LISTS = gql`
  query GetTodoLists {
    todoLists {
      id
      name
    }
  }
`;

function TodoListItem(props: any) {
  const { todoListItem } = props;
  const [updateTodoList] = useMutation(UPDATE_TODO_LIST);
  const [deleteTodoList, { loading: deleteLoading }] = useMutation(
    DELETE_TODO_LIST,
    {
      update(cache, { data: { deleteTodoList } }) {
        const { todoLists }: any = cache.readQuery({
          query: GET_TODO_LISTS,
        });

        cache.writeQuery({
          query: GET_TODO_LISTS,
          data: {
            todoLists: todoLists.filter(
              (todoList: any) => todoList.id !== deleteTodoList.id
            ),
          },
        });
      },
    }
  );

  const [name, setName] = useState<string>(todoListItem.name);

  function handleSubmit(e: ChangeEvent<HTMLFormElement>) {
    e.preventDefault();

    updateTodoList({
      variables: {
        id: todoListItem.id,
        name,
      },
    });
  }

  function handleDelete() {
    deleteTodoList({
      variables: {
        id: todoListItem.id,
      },
    });
  }

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <label htmlFor="todoListName">Todo List Name</label>
        <input
          name="todoListName"
          value={name}
          onChange={(e: ChangeEvent<HTMLInputElement>) =>
            setName(e.target.value)
          }
        />
        <button type="submit">Submit</button>
      </form>
      <button onClick={handleDelete} disabled={deleteLoading}>
        Delete
      </button>
      <Link
        href={{
          pathname: '/todos/[id]',
          query: { id: todoListItem.id },
        }}
      >
        Go
      </Link>
    </div>
  );
}

export default TodoListItem;
