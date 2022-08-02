import React, { ChangeEvent, useState } from 'react';
import { useMutation } from '@apollo/client';
import { UPDATE_TODO, DELETE_TODO } from './mutations';

function Todo(props: any) {
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
    <div>
      <div key={todo.id} className="my-2">
        <form onSubmit={handleSubmit}>
          <label htmlFor="name">Todo name:</label>
          <input
            name="name"
            value={name}
            onChange={(e: ChangeEvent<HTMLInputElement>) =>
              setName(e.target.value)
            }
          />
        </form>
        <form>
          <label htmlFor="completed">Completed:</label>
          <input
            name="completed"
            type="checkbox"
            checked={checked}
            onChange={handleCheckbox}
          />
        </form>
        <button
          onClick={() => handleDelete(todo.id)}
          disabled={deleteLoading}
        >
          Delete
        </button>
      </div>
    </div>
  );
}

export default Todo;
