import { colors, radius } from '@/constants/style'
import type { Todo } from '@/types/todo'
import Ionicons from '@expo/vector-icons/Ionicons'
import AsyncStorage from '@react-native-async-storage/async-storage'
import React, { useState } from 'react'
import {
  Keyboard,
  KeyboardAvoidingView,
  StyleSheet,
  TextInput,
  TouchableOpacity,
} from 'react-native'

const AddTodo = ({
  todos,
  setTodos,
}: {
  todos: Todo[]
  setTodos: (todos: Todo[]) => void
}) => {
  const [title, setTitle] = useState('')
  const handleAddTodo = async (title: string) => {
    if (title.trim() === '') return
    const updatedTodos = [
      { id: Date.now(), title, completed: false },
      ...todos,
    ]
    setTodos(updatedTodos)
    await AsyncStorage.setItem('todos', JSON.stringify(updatedTodos))
    setTitle('')
    Keyboard.dismiss()
  }
  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior="padding"
      keyboardVerticalOffset={10}
    >
      <TextInput
        placeholder="Add Todo"
        style={styles.input}
        value={title}
        onChangeText={setTitle}
      />
      <TouchableOpacity
        style={styles.addButton}
        onPress={() => handleAddTodo(title)}
      >
        <Ionicons name="add" size={24} color="white" />
      </TouchableOpacity>
    </KeyboardAvoidingView>
  )
}

export default AddTodo

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: 10,
  },
  input: {
    flex: 1,
    fontSize: 16,
    height: 50,
    paddingHorizontal: 20,
    borderRadius: radius.md,
    backgroundColor: colors.surfacePrimary,
  },
  addButton: {
    backgroundColor: colors.accentPrimary,
    padding: 10,
    height: 50,
    aspectRatio: 1,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: radius.md,
  },
})
