import React from 'react';
import { gql, useMutation } from '@apollo/client';
import { useRouter } from 'next/router';

const GET_TODOS = gql`
  query GetTodos($todoListId: String!) {
    todos(todoListId: $todoListId) {
      id
      name
      completed
    }
  }
`;

const DELETE_TASK = gql`
  mutation DeleteTodo($id: String!) {
    deleteTodo(id: $id) {
      id
    }
  }
`;

function TodoItem(props: any) {
  const { todo } = props;
  const todoId = todo.id;
  const router = useRouter();

  const [deleteTodo] = useMutation(DELETE_TASK, {
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
  });

  function handleDelete(id: string) {
    deleteTodo({
      variables: {
        id,
      },
    });
  }

  return (
    <div key={todo.id} className="my-2">
      <span>{todo.name}</span>
      <div>Completed: {`${todo.completed}`}</div>
      <button onClick={() => handleDelete(todo.id)}>Delete</button>
    </div>
  );
}

export default TodoItem;
