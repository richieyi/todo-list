import React from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { gql, useQuery } from '@apollo/client';

const GET_TASKS = gql`
  query GetTasks($todoListId: String!) {
    tasks(todoListId: $todoListId) {
      id
      name
      status
    }
  }
`;

function TasksPage() {
  const router = useRouter();
  const { id: todoListId } = router.query;
  const { data, loading, error } = useQuery(GET_TASKS, {
    variables: {
      todoListId,
    },
  });

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Oh no... {error.message}</p>;

  console.log(data);
  function renderTasks() {
    return data?.tasks.map((task: any) => (
      <div key={task.id}>{task.name}</div>
    ));
  }

  return (
    <div>
      <Link href="/todos">Back to todos</Link>
      <h1>Tasks page</h1>
      <div>{renderTasks()}</div>
    </div>
  );
}

export default TasksPage;
