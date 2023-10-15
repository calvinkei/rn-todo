import {FlashList} from '@shopify/flash-list';
import React, {RefObject} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import Icons from '@expo/vector-icons/FontAwesome5';
import TodoItem from '../TodoItem';
import {Todo} from '../../types';

interface TodoListProps {
  onTodoPress: (item: Todo, index: number) => void;
  onRemoveTodo: (index: number) => void;
  todoListRef?: RefObject<FlashList<Todo>>;
  todos: Todo[];
}

function TodoList({
  onTodoPress,
  onRemoveTodo,
  todoListRef,
  todos,
}: TodoListProps): JSX.Element {
  return (
    <FlashList
      ref={todoListRef}
      estimatedItemSize={Math.max(todos.length, 100)}
      keyExtractor={item => String(item.createdAt)}
      renderItem={({item, index}) => (
        <TodoItem
          title={item.title}
          onPress={() => onTodoPress(item, index)}
          onRemove={() => onRemoveTodo(index)}
        />
      )}
      data={todos}
      ListHeaderComponent={<Text style={styles.header}>Todo List</Text>}
      ListEmptyComponent={
        <View style={styles.emptyStateContainer}>
          <Icons
            style={styles.emptyStateIcon}
            name="question"
            size={64}
            color="#ccc"
          />
          <Text style={styles.emptyStateText}>No Item</Text>
        </View>
      }
    />
  );
}

const styles = StyleSheet.create({
  header: {
    fontSize: 32,
    fontWeight: 'bold',
    margin: 16,
  },
  emptyStateContainer: {
    alignItems: 'center',
  },
  emptyStateIcon: {
    marginTop: 128,
    marginBottom: 32,
  },
  emptyStateText: {
    fontSize: 48,
    fontWeight: 'bold',
    color: '#ccc',
  },
});

export default TodoList;
