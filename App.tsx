import {FlashList} from '@shopify/flash-list';
import React, {useMemo, useRef, useState} from 'react';
import {
  Button,
  KeyboardAvoidingView,
  Platform,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import BottomInput from './components/BottomInput';
import TodoList from './components/TodoList';
import {Todo} from './types';
import authenticate from './misc/authenticate';
import useTodos from './states/todos';

function App(): JSX.Element {
  const todoListRef = useRef<FlashList<Todo>>(null);
  const bottomInputRef = useRef<TextInput>(null);
  const {todos, createTodo, updateTodo, deleteTodo} = useTodos();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [bottomInputValue, setBottomInputValue] = useState('');
  const [updatingIndex, setUpdatingIndex] = useState<number>();
  const isCreatingTodo = useMemo(
    () => updatingIndex === undefined,
    [updatingIndex],
  );

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior="padding"
      enabled={Platform.OS === 'ios'}>
      <SafeAreaView style={styles.container}>
        <StatusBar barStyle={'dark-content'} />
        {isAuthenticated ? (
          <>
            <TodoList
              todoListRef={todoListRef}
              todos={todos}
              onTodoPress={(item, index) => {
                // Start updating todo item
                setUpdatingIndex(index);
                setBottomInputValue(item.title);
                bottomInputRef.current?.focus();
              }}
              onRemoveTodo={deleteTodo}
            />
            <BottomInput
              inputRef={bottomInputRef}
              placeholder="Enter item"
              buttonTitle={isCreatingTodo ? 'Add' : 'Update'}
              onEnter={() => {
                if (isCreatingTodo) {
                  createTodo(bottomInputValue);
                  // Clear input value and scroll to bottom
                  setBottomInputValue('');
                  setTimeout(() => todoListRef.current?.scrollToEnd(), 100);
                } else {
                  updateTodo(updatingIndex!, bottomInputValue);
                  bottomInputRef.current?.blur();
                }
              }}
              value={bottomInputValue}
              onChangeText={newValue => setBottomInputValue(newValue)}
              onBlur={() => {
                // Reset to create todo state
                if (updatingIndex !== undefined) {
                  setUpdatingIndex(undefined);
                  setBottomInputValue('');
                }
              }}
            />
          </>
        ) : (
          <View style={styles.unlockButtonContainer}>
            <Text style={styles.title}>Todo App</Text>
            <Button
              title="Unlock App"
              onPress={() => authenticate(() => setIsAuthenticated(true))}
            />
          </View>
        )}
      </SafeAreaView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  unlockButtonContainer: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f4f5fa',
  },
  title: {
    fontSize: 48,
    fontWeight: 'bold',
    marginBottom: 128,
  },
  container: {
    flex: 1,
    backgroundColor: '#f4f5fa',
  },
});

export default App;
