import React, { ChangeEvent, useState } from 'react';
import Link from 'next/link';
import { useMutation } from '@apollo/client';
import { GET_TODO_LISTS } from './queries';
import { UPDATE_TODO_LIST, DELETE_TODO_LIST } from './mutations';

function TodoList(props: any) {
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
      <h1 className="text-2xl">Todos Lists Page</h1>
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

export default TodoList;
