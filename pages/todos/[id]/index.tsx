import React, { ChangeEvent, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { gql, useQuery, useMutation } from '@apollo/client';
import TodoItem from '../../../components/TodoItem';

interface Todo {
  id: string;
  name: string;
  completed: boolean;
  todoListId: string;
}

const GET_TODOS = gql`
  query GetTodos($todoListId: String!) {
    todos(todoListId: $todoListId) {
      id
      name
      completed
    }
  }
`;

const CREATE_TODO = gql`
  mutation CreateTodo($name: String!, $todoListId: String!) {
    createTodo(name: $name, todoListId: $todoListId) {
      id
      name
      completed
    }
  }
`;

function TodosPage() {
  const [name, setName] = useState<string>('');
  const router = useRouter();
  const { data, loading, error } = useQuery(GET_TODOS, {
    variables: {
      todoListId: router.query.id,
    },
    skip: !router.isReady,
  });
  const [createTodo, { loading: createLoading }] = useMutation(
    CREATE_TODO,
    {
      // refetchQueries: [
      //   {
      //     query: GET_TASKS,
      //     variables: {
      //       todoListId: router.query.id,
      //     },
      //   },
      // ],
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
      // update(cache, { data: { createTodo } }) {
      //   const { todos }: any = cache.readQuery({
      //     query: GET_TASKS,
      //     variables: {
      //       todoListId: router.query.id,
      //     },
      //   });

      //   cache.writeQuery({
      //     query: GET_TASKS,
      //     data: {
      //       todos: [...todos, createTodo],
      //     },
      //   });
      // },
    }
  );

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Oh no... {error.message}</p>;

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

  function renderTodos() {
    return data?.todos.map((todo: Todo) => (
      <TodoItem key={todo.id} todo={todo} />
    ));
  }

  return (
    <div>
      <Link href="/todos">Back to todos</Link>
      <h1>Todos page</h1>
      <div>
        <span>New Todo</span>
        <form onSubmit={handleSubmit}>
          <input
            value={name}
            onChange={(e: ChangeEvent<HTMLInputElement>) =>
              setName(e.target.value)
            }
          />
          <button type="submit" disabled={createLoading}>
            Submit
          </button>
        </form>
      </div>
      <div>{renderTodos()}</div>
    </div>
  );
}

export default TodosPage;
