import React from 'react';
import { gql, useMutation } from '@apollo/client';
import { useRouter } from 'next/router';

const GET_TASKS = gql`
  query GetTasks($todoListId: String!) {
    tasks(todoListId: $todoListId) {
      id
      name
      status
    }
  }
`;

const DELETE_TASK = gql`
  mutation DeleteTask($id: String!) {
    deleteTask(id: $id) {
      id
    }
  }
`;

function TaskItem(props: any) {
  const { task } = props;
  const taskId = task.id;
  const router = useRouter();

  const [deleteTask] = useMutation(DELETE_TASK, {
    update(cache, { data: { deleteTask } }) {
      const { tasks }: any = cache.readQuery({
        query: GET_TASKS,
        variables: {
          todoListId: router.query.id,
        },
      });

      const newTasks = tasks.filter(
        (task) => task.id !== deleteTask.id
      );
      cache.writeQuery({
        query: GET_TASKS,
        data: {
          tasks: newTasks,
        },
      });
    },
  });

  function handleDelete(id: string) {
    deleteTask({
      variables: {
        id,
      },
    });
  }

  return (
    <div key={task.id} className="my-2">
      <span>{task.name}</span>
      <div>Complete: {`${task.status}`}</div>
      <button onClick={() => handleDelete(task.id)}>Delete</button>
    </div>
  );
}

export default TaskItem;
