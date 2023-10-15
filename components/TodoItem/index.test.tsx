import 'react-native';
import React from 'react';
import TodoItem from '.';
import {it, jest, expect} from '@jest/globals';
import renderer from 'react-test-renderer';

it('matches previous snapshot', () => {
  const onRemove = jest.fn();
  const onPress = jest.fn();
  const tree = renderer
    .create(<TodoItem onRemove={onRemove} onPress={onPress} title="title" />)
    .toJSON();
  expect(tree).toMatchSnapshot();
});

it('calls onPress when title is clicked', () => {
  const onRemove = jest.fn();
  const onPress = jest.fn();
  const instance = renderer.create(
    <TodoItem onRemove={onRemove} onPress={onPress} title="title" />,
  );
  instance.root.findByProps({testID: 'title'}).props.onPress();
  expect(onPress).toBeCalledTimes(1);
});

it('calls onRemove when remove button is clicked', () => {
  const onRemove = jest.fn();
  const onPress = jest.fn();
  const instance = renderer.create(
    <TodoItem onRemove={onRemove} onPress={onPress} title="title" />,
  );
  instance.root.findByProps({testID: 'remove button'}).props.onPress();
  expect(onRemove).toBeCalledTimes(1);
});
