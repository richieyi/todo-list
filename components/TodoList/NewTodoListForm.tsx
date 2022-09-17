import React, { ChangeEvent, useState } from 'react';
import { useMutation } from '@apollo/client';
import { toast } from 'react-toastify';
import { GET_TODO_LISTS } from './queries';
import { CREATE_TODO_LIST } from './mutations';
import Input from '../Input';

const createNotify = () =>
  toast.success('New todo list created!', {
    autoClose: 3000,
    hideProgressBar: true,
  });

function NewTodoListForm() {
  const [name, setName] = useState<string>('');

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
        createNotify();
      },
    }
  );

  function handleSubmit(e: ChangeEvent<HTMLFormElement>) {
    e.preventDefault();

    createTodoList({
      variables: {
        name,
      },
    });
    setName('');
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col">
      <Input
        // labelName="Add New Todo List"
        type="text"
        name="todoListName"
        value={name}
        onChange={(e: ChangeEvent<HTMLInputElement>) =>
          setName(e.target.value)
        }
        disabled={createLoading}
        placeholder="Add new todo list..."
      />
    </form>
  );
}

export default NewTodoListForm;
