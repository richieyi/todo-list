import { gql } from '@apollo/client';

export const GET_TODOS = gql`
  query GetTodos($todoListId: String!) {
    todos(todoListId: $todoListId) {
      id
      name
      completed
    }
  }
`;
