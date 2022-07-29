import React, { ChangeEvent, useState } from 'react';
import { gql, useMutation } from '@apollo/client';
// import { useRouter } from 'next/router';

// const GET_TODOS = gql`
//   query GetTodos($todoListId: String!) {
//     todos(todoListId: $todoListId) {
//       id
//       name
//       completed
//     }
//   }
// `;

const UPDATE_TODO = gql`
  mutation UpdateTodo(
    $id: String!
    $name: String!
    $completed: Boolean!
  ) {
    updateTodo(id: $id, name: $name, completed: $completed) {
      id
      name
      completed
    }
  }
`;

const DELETE_TODO = gql`
  mutation DeleteTodo($id: String!) {
    deleteTodo(id: $id) {
      id
    }
  }
`;

function TodoItem(props: any) {
  const { todo } = props;
  // const todoId = todo.id;
  // const router = useRouter();
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
        // const { todos }: any = cache.readQuery({
        //   query: GET_TODOS,
        //   variables: {
        //     todoListId: router.query.id,
        //   },
        // });

        // const newTodos = todos.filter(
        //   (todo) => todo.id !== deleteTodo.id
        // );
        // cache.writeQuery({
        //   query: GET_TODOS,
        //   data: {
        //     todos: newTodos,
        //   },
        // });
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
    <div key={todo.id} className="my-2">
      <form onSubmit={handleSubmit}>
        <label htmlFor="name">Todo name:</label>
        <input
          name="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
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
  );
}

export default TodoItem;
