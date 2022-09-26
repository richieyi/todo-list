import React, { ChangeEvent, useState } from 'react';
import { useMutation } from '@apollo/client';
import { toast } from 'react-toastify';
import { useRouter } from 'next/router';
import { GET_TODO_LISTS } from './queries';
import { UPDATE_TODO_LIST, DELETE_TODO_LIST } from './mutations';
import Input from '../Input';
import Button from '../Button';
import { TodoListItem } from './TodoLists';

interface TodoListProps {
  todoListItem: TodoListItem;
}

const deleteNotify = () =>
  toast.success('Todo list deleted!', {
    autoClose: 3000,
    hideProgressBar: true,
  });

const updateNotify = () =>
  toast.success('Todo list updated!', {
    autoClose: 3000,
    hideProgressBar: true,
  });

function TodoList(props: TodoListProps) {
  const { todoListItem } = props;
  const [name, setName] = useState<string>(todoListItem.name);
  const [updateTodoList] = useMutation(UPDATE_TODO_LIST);
  const [deleteTodoList, { loading: deleteLoading }] = useMutation(
    DELETE_TODO_LIST,
    {
      update(cache, { data: { deleteTodoList } }) {
        const { todoLists }: any = cache.readQuery({
          query: GET_TODO_LISTS,
        });

        cache.writeQuery({
          query: GET_TODO_LISTS,
          data: {
            todoLists: todoLists.filter(
              (todoList: any) => todoList.id !== deleteTodoList.id
            ),
          },
        });
        deleteNotify();
      },
    }
  );
  const router = useRouter();

  function handleSubmit(e: ChangeEvent<HTMLFormElement>) {
    e.preventDefault();

    updateTodoList({
      variables: {
        id: todoListItem.id,
        name,
      },
    });

    updateNotify();
  }

  function handleDelete() {
    deleteTodoList({
      variables: {
        id: todoListItem.id,
      },
    });
  }

  return (
    <div className="my-4 flex gap-2">
      <form className="flex-1" onSubmit={handleSubmit}>
        <Input
          type="text"
          name="todoListName"
          value={name}
          onChange={(e: ChangeEvent<HTMLInputElement>) =>
            setName(e.target.value)
          }
          disabled={deleteLoading}
        />
      </form>
      <button
        className="hover:cursor-pointer bg-blue-500 hover:bg-blue-700 disabled:bg-gray-200 text-white font-bold px-4 py-2 rounded"
        disabled={deleteLoading}
        onClick={() => router.push(`/todos/${todoListItem.id}`)}
      >
        Go
      </button>
      <Button
        text="Delete"
        type="button"
        onClick={handleDelete}
        disabled={deleteLoading}
        color="red"
      />
    </div>
  );
}

export default TodoList;
