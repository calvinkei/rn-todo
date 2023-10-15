import 'react-native';
import React from 'react';
import BottomInput from '.';
import {it, jest, expect} from '@jest/globals';
import renderer from 'react-test-renderer';

it('matches previous snapshot', () => {
  const onEnter = jest.fn();
  const tree = renderer
    .create(<BottomInput onEnter={onEnter} buttonTitle="title" />)
    .toJSON();
  expect(tree).toMatchSnapshot();
});

it('calls onEnter when enter button is clicked', () => {
  const onEnter = jest.fn();
  const instance = renderer.create(
    <BottomInput onEnter={onEnter} buttonTitle="title" />,
  );
  instance.root.findByProps({testID: 'enter button'}).props.onPress();
  expect(onEnter).toBeCalledTimes(1);
});
