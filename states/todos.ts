import {useCallback, useState} from 'react';
import {Todo} from '../types';

const useTodos = () => {
  const [todos, setTodos] = useState<Todo[]>([]);

  const createTodo = useCallback(
    (title: string) => {
      setTodos(data => [...data, {title, createdAt: Date.now()}]);
    },
    [setTodos],
  );

  const updateTodo = useCallback(
    (index: number, title: string) => {
      setTodos(data => [
        ...data.slice(0, index),
        {
          title,
          createdAt: data[index].createdAt,
        },
        ...data.slice(index + 1),
      ]);
    },
    [setTodos],
  );

  const deleteTodo = useCallback(
    (index: number) => {
      setTodos(data => [...data.slice(0, index), ...data.slice(index + 1)]);
    },
    [setTodos],
  );

  return {todos, createTodo, updateTodo, deleteTodo};
};

export default useTodos;
