import { gql } from '@apollo/client';

export const CREATE_TODO = gql`
  mutation CreateTodo($name: String!, $todoListId: String!) {
    createTodo(name: $name, todoListId: $todoListId) {
      id
      name
      completed
    }
  }
`;

export const UPDATE_TODO = gql`
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

export const DELETE_TODO = gql`
  mutation DeleteTodo($id: String!) {
    deleteTodo(id: $id) {
      id
    }
  }
`;
