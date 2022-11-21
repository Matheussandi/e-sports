import React, { useState } from 'react';
import { TextInput, TextInputProps, View } from 'react-native';
import { styles } from './styles';

export type InputProps = TextInputProps & {
  value?: string;
}

export function Input({ value, ...rest }: InputProps) {
  return (
    <View style={styles.container}>
      <TextInput
        style={styles.inputText}
        value={value}
        placeholderTextColor="#7A7A80"
        {...rest}
      />
    </View>
  );
}