import { gql } from 'apollo-server-micro';

export const typeDefs = gql`
  type TodoList {
    id: String
    name: String
    tasks: [Task]
  }

  type Task {
    id: String
    status: Boolean
    name: String
  }

  type Query {
    todoLists: [TodoList]
  }
`;
