import React from 'react';
import {Button, StyleSheet, Text, View} from 'react-native';

interface TodoItemProps {
  title: string;
  onRemove: () => void;
  onPress: () => void;
}

function TodoItem({title, onRemove, onPress}: TodoItemProps): JSX.Element {
  return (
    <View style={styles.container}>
      <Text testID="title" onPress={onPress} style={styles.input}>
        {title}
      </Text>
      <Button testID="remove button" title="Remove" onPress={onRemove} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    paddingHorizontal: 12,
    paddingVertical: 8,
    margin: 12,
    borderRadius: 12,
  },
  input: {
    flex: 1,
    backgroundColor: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
});

export default TodoItem;
