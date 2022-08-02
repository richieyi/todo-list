import React, { ChangeEvent, useState } from 'react';
import Link from 'next/link';
import { useMutation } from '@apollo/client';
import { GET_TODO_LISTS } from './queries';
import { UPDATE_TODO_LIST, DELETE_TODO_LIST } from './mutations';
import Input from '../Input';
import Button from '../Button';

function TodoList(props: any) {
  const { todoListItem } = props;
  const [updateTodoList, { loading: updateLoading }] =
    useMutation(UPDATE_TODO_LIST);
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
        <Input
          labelName="Todo List Name"
          type="text"
          name="todoListName"
          value={name}
          onChange={(e: ChangeEvent<HTMLInputElement>) =>
            setName(e.target.value)
          }
        />
        <Button
          text="Update"
          type="submit"
          disabled={updateLoading}
        />
        <Button
          text="Delete"
          type="button"
          onClick={handleDelete}
          disabled={deleteLoading}
        />
        <Link
          href={{
            pathname: '/todos/[id]',
            query: { id: todoListItem.id },
          }}
        >
          Go
        </Link>
      </form>
    </div>
  );
}

export default TodoList;
