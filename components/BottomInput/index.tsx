import React, {RefObject} from 'react';
import {
  Button,
  View,
  StyleSheet,
  TextInput,
  TextInputProps,
} from 'react-native';

interface BottomInputProps extends TextInputProps {
  onEnter: () => void;
  buttonTitle: string;
  inputRef?: RefObject<TextInput>;
}

function BottomInput({
  onEnter,
  buttonTitle,
  inputRef,
  ...props
}: BottomInputProps): JSX.Element {
  return (
    <View style={styles.container}>
      <TextInput ref={inputRef} style={styles.input} {...props} />
      <Button testID="enter button" title={buttonTitle} onPress={onEnter} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 12,
    borderTopWidth: 1,
    borderTopColor: '#ddd',
  },
  input: {
    flex: 1,
    backgroundColor: '#fff',
    borderRadius: 12,
    paddingHorizontal: 12,
    marginRight: 8,
  },
});

export default BottomInput;
