import React, { ChangeEvent, useState } from 'react';
import Link from 'next/link';
import { useMutation } from '@apollo/client';
import { GET_TODO_LISTS } from './queries';
import { UPDATE_TODO_LIST, DELETE_TODO_LIST } from './mutations';
import Input from '../Input';
import Button from '../Button';

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
    <div className="my-4">
      <form onSubmit={handleSubmit}>
        <Input
          labelName="Todo List Name"
          type="text"
          name="todoListName"
          value={name}
          onChange={(e: ChangeEvent<HTMLInputElement>) =>
            setName(e.target.value)
          }
        />
        <div className="flex justify-between gap-2">
          <Link
            href={{
              pathname: '/todos/[id]',
              query: { id: todoListItem.id },
            }}
          >
            <button className="hover:cursor-pointer bg-blue-500 hover:bg-blue-700 disabled:bg-gray-200 text-white font-bold px-4 py-2 rounded">
              Go
            </button>
          </Link>
          <Button
            text="Delete"
            type="button"
            onClick={handleDelete}
            disabled={deleteLoading}
          />
        </div>
      </form>
    </div>
  );
}

export default TodoList;
