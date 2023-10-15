/**
 * @jest-environment jsdom
 */

import {it, jest, expect, afterEach} from '@jest/globals';
import {act, renderHook, waitFor} from '@testing-library/react';
import useTodos from './todos';

Date.now = () => 1;

afterEach(() => {
  jest.clearAllMocks();
});

it('adds a todo item when createTodo is called', async () => {
  const {
    result: {
      current: {todos, createTodo},
    },
  } = renderHook(() => useTodos());

  act(() => {
    createTodo('title 1');
  });

  waitFor(() => expect(todos).toEqual([{title: 'title 1', createdAt: 1}]));
});

it('updates a todo item when updateTodo is called', async () => {
  const {
    result: {
      current: {todos, createTodo, updateTodo},
    },
  } = renderHook(() => useTodos());

  act(() => {
    createTodo('title 1');
    createTodo('title 2');
    createTodo('title 3');
    updateTodo(1, 'title 4');
  });

  waitFor(() =>
    expect(todos).toEqual([
      {title: 'title 1', createdAt: 1},
      {title: 'title 4', createdAt: 1},
      {title: 'title 3', createdAt: 1},
    ]),
  );
});

it('deletes a todo item when deleteTodo is called', async () => {
  const {
    result: {
      current: {todos, createTodo, deleteTodo},
    },
  } = renderHook(() => useTodos());

  act(() => {
    createTodo('title 1');
    createTodo('title 2');
    createTodo('title 3');
    deleteTodo(1);
  });

  waitFor(() =>
    expect(todos).toEqual([
      {title: 'title 1', createdAt: 1},
      {title: 'title 3', createdAt: 1},
    ]),
  );
});
