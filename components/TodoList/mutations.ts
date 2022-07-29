import { gql } from '@apollo/client';

export const CREATE_TODO_LIST = gql`
  mutation CreateTodoList($name: String!) {
    createTodoList(name: $name) {
      id
      name
    }
  }
`;

export const UPDATE_TODO_LIST = gql`
  mutation UpdateTodoList($id: String!, $name: String!) {
    updateTodoList(id: $id, name: $name) {
      id
      name
    }
  }
`;

export const DELETE_TODO_LIST = gql`
  mutation DeleteTodoList($id: String!) {
    deleteTodoList(id: $id) {
      id
    }
  }
`;
