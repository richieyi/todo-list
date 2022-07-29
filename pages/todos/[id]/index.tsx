import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { gql, useQuery, useMutation } from '@apollo/client';
import TaskItem from '../../../components/TaskItem';

interface Task {
  id: string;
  name: string;
  status: boolean;
  todoListId: string;
}

const GET_TASKS = gql`
  query GetTasks($todoListId: String!) {
    tasks(todoListId: $todoListId) {
      id
      name
      status
    }
  }
`;

const CREATE_TASK = gql`
  mutation CreateTask($name: String!, $todoListId: String!) {
    createTask(name: $name, todoListId: $todoListId) {
      id
      name
      status
    }
  }
`;

function TasksPage() {
  const [name, setName] = useState<string>('');
  const router = useRouter();
  const { data, loading, error } = useQuery(GET_TASKS, {
    variables: {
      todoListId: router.query.id,
    },
    skip: !router.isReady,
  });
  const [createTask] = useMutation(CREATE_TASK, {
    // refetchQueries: [
    //   {
    //     query: GET_TASKS,
    //     variables: {
    //       todoListId: router.query.id,
    //     },
    //   },
    // ],
    // Running into an issue with this cache update
    // Works when creating a new todo list but not here
    update(cache, { data: { createTask } }) {
      cache.modify({
        fields: {
          tasks(existingTasks = []) {
            const newTodoRef = cache.writeFragment({
              data: createTask,
              fragment: gql`
                fragment NewTodo on Todo {
                  id
                  name
                  status
                }
              `,
            });
            return [...existingTasks, newTodoRef];
          },
        },
      });
    },
    //   const { tasks }: any = cache.readQuery({
    //     query: GET_TASKS,
    //     variables: {
    //       todoListId: router.query.id,
    //     },
    //   });

    //   cache.writeQuery({
    //     query: GET_TASKS,
    //     data: {
    //       tasks: [...tasks, createTask],
    //     },
    //   });
    // },
  });

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Oh no... {error.message}</p>;

  function handleSubmit(e: any) {
    e.preventDefault();

    createTask({
      variables: {
        name,
        todoListId: router.query.id,
      },
    });
  }

  function renderTasks() {
    return data?.tasks.map((task: Task) => (
      <TaskItem key={task.id} task={task} />
    ));
  }

  return (
    <div>
      <Link href="/todos">Back to todos</Link>
      <h1>Tasks page</h1>
      <div>
        <span>New Task</span>
        <form onSubmit={handleSubmit}>
          <input
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <button type="submit">Submit</button>
        </form>
      </div>
      <div>{renderTasks()}</div>
    </div>
  );
}

export default TasksPage;
