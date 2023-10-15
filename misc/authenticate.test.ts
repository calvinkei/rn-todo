import authenticate from './authenticate';
import {it, jest, expect, afterEach} from '@jest/globals';
import {Alert, Platform} from 'react-native';
import * as LocalAuthentication from 'expo-local-authentication';

afterEach(() => {
  jest.clearAllMocks();
});

it('calls onSuccess when authenticateAsync is successful', async () => {
  const onSuccess = jest.fn();
  jest
    .spyOn(LocalAuthentication, 'authenticateAsync')
    .mockResolvedValue({success: true});
  await authenticate(onSuccess);
  expect(onSuccess).toBeCalledTimes(1);
});

it('calls Alert.alert when authenticateAsync failed with error not_enrolled and device is Android', async () => {
  const onSuccess = jest.fn();
  Platform.OS = 'android';
  jest
    .spyOn(LocalAuthentication, 'authenticateAsync')
    .mockResolvedValue({success: false, error: 'not_enrolled'});
  const alert = jest.spyOn(Alert, 'alert');
  await authenticate(onSuccess);
  expect(onSuccess).toBeCalledTimes(0);
  expect(alert).toBeCalledTimes(1);
});

it('does not call Alert.alert when authenticateAsync failed with error not_enrolled and device is iOS', async () => {
  const onSuccess = jest.fn();
  Platform.OS = 'ios';
  jest
    .spyOn(LocalAuthentication, 'authenticateAsync')
    .mockResolvedValue({success: false, error: 'not_enrolled'});
  const alert = jest.spyOn(Alert, 'alert');
  await authenticate(onSuccess);
  expect(onSuccess).toBeCalledTimes(0);
  expect(alert).toBeCalledTimes(0);
});
