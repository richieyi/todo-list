import React, { ChangeEvent, useState } from 'react';
import { useRouter } from 'next/router';
import { gql, useMutation } from '@apollo/client';
import { CREATE_TODO } from './mutations';
import Input from '../Input';

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
    <form onSubmit={handleSubmit} className="flex flex-col">
      <Input
        // labelName="Add New Todo"
        type="text"
        name="todoName"
        value={name}
        onChange={(e) => setName(e.target.value)}
        disabled={createLoading}
        placeholder="Add new todo..."
      />
    </form>
  );
}

export default NewTodoForm;
