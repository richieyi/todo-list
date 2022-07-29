import React, { ChangeEvent, useState } from 'react';
import { useRouter } from 'next/router';
import { gql, useMutation } from '@apollo/client';
import { CREATE_TODO } from './mutations';

function NewTodoForm() {
  const router = useRouter();
  const [name, setName] = useState<string>('');

  const [createTodo, { loading: createLoading }] = useMutation(
    CREATE_TODO,
    {
      update(cache, { data: { createTodo } }) {
        cache.modify({
          fields: {
            todos(existingTodos = []) {
              const newTodoRef = cache.writeFragment({
                data: createTodo,
                fragment: gql`
                  fragment NewTodo on Todo {
                    id
                    name
                    completed
                  }
                `,
              });
              return [...existingTodos, newTodoRef];
            },
          },
        });
      },
    }
  );

  function handleSubmit(e: ChangeEvent<HTMLFormElement>) {
    e.preventDefault();

    createTodo({
      variables: {
        name,
        todoListId: router.query.id,
      },
    });
    setName('');
  }

  return (
    <form onSubmit={handleSubmit}>
      <label htmlFor="todoName">New Todo</label>
      <input
        name="todoName"
        value={name}
        onChange={(e: ChangeEvent<HTMLInputElement>) =>
          setName(e.target.value)
        }
      />
      <button type="submit" disabled={createLoading}>
        Submit
      </button>
    </form>
  );
}

export default NewTodoForm;
