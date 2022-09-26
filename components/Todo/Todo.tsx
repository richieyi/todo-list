import React, { ChangeEvent, useState } from 'react';
import { useMutation } from '@apollo/client';
import { toast } from 'react-toastify';
import { UPDATE_TODO, DELETE_TODO } from './mutations';
import Input from '../Input';
import Button from '../Button';
import { Todo } from './Todos';

interface TodoProps {
  todo: Todo;
}

const deleteNotify = () =>
  toast.success('Todo deleted!', {
    autoClose: 3000,
    hideProgressBar: true,
  });

const updateNotify = () =>
  toast.success('Todo updated!', {
    autoClose: 3000,
    hideProgressBar: true,
  });

function Todo(props: TodoProps) {
  const { todo } = props;
  const [checked, setChecked] = useState<boolean>(todo.completed);
  const [name, setName] = useState<string>(todo.name);

  const [updateTodo] = useMutation(UPDATE_TODO);

  const [deleteTodo, { loading: deleteLoading }] = useMutation(
    DELETE_TODO,
    {
      update(cache, { data: { deleteTodo } }) {
        cache.modify({
          fields: {
            todos(existingTodos, { readField }) {
              return existingTodos.filter(
                (todo: any) => deleteTodo.id !== readField('id', todo)
              );
            },
          },
        });

        deleteNotify();
      },
    }
  );

  function handleUpdate() {
    updateTodo({
      variables: {
        id: todo.id,
        name,
        completed: !checked,
      },
    });

    updateNotify();
  }

  function handleSubmit(e: ChangeEvent<HTMLFormElement>) {
    e.preventDefault();
    handleUpdate();
  }

  function handleDelete(id: string) {
    deleteTodo({
      variables: {
        id,
      },
    });
  }

  function handleCheckbox() {
    setChecked(!checked);
    handleUpdate();
  }

  return (
    <div key={todo.id} className="my-4">
      <form onSubmit={handleSubmit} className="flex gap-2">
        <input
          name="completed"
          type="checkbox"
          checked={checked}
          onChange={handleCheckbox}
          className="text-sm font-medium text-gray-900 dark:text-gray-300"
          disabled={deleteLoading}
        />
        <Input
          type="text"
          name="name"
          value={name}
          onChange={(e: ChangeEvent<HTMLInputElement>) =>
            setName(e.target.value)
          }
          disabled={deleteLoading}
        />
        <Button
          type="button"
          onClick={() => handleDelete(todo.id)}
          disabled={deleteLoading}
          text="Delete"
          color="red"
        />
      </form>
    </div>
  );
}

export default Todo;
