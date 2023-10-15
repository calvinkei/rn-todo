import 'react-native';
import React from 'react';
import TodoList from '.';
import {it, jest, expect} from '@jest/globals';
import renderer from 'react-test-renderer';

const mockTodos = [
  {
    title: 'title',
    createdAt: 123,
  },
];

it('matches previous snapshot', () => {
  const onTodoPress = jest.fn();
  const onRemoveTodo = jest.fn();
  const tree = renderer
    .create(
      <TodoList
        onTodoPress={onTodoPress}
        onRemoveTodo={onRemoveTodo}
        todos={mockTodos}
      />,
    )
    .toJSON();
  expect(tree).toMatchSnapshot();
});
