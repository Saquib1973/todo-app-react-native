import { colors, radius } from '@/constants/style'
import type { Todo } from '@/types/todo'
import Ionicons from '@expo/vector-icons/Ionicons'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { Checkbox } from 'expo-checkbox'
import React from 'react'
import { Alert, FlatList, Text, TouchableOpacity, View } from 'react-native'

const TodoList = ({
  todos,
  setTodos,
}: {
  todos: Todo[]
  setTodos: (todos: Todo[]) => void
}) => {
  const deleteTodo = async (id: number) => {
    const updatedTodos = todos.filter((todo) => todo.id !== id)
    await AsyncStorage.setItem('todos', JSON.stringify(updatedTodos))
    setTodos(updatedTodos)
  }

  const handleIsCompleted = async (id: number) => {
    try {
      const updatedTodos = todos.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
      await AsyncStorage.setItem('todos', JSON.stringify(updatedTodos))
      setTodos(updatedTodos)
    } catch (error) {
      console.error('Error updating todo:', error)
    }
  }

  if (todos.length === 0) {
    return (
      <View style={styles.errorContainer}>
        <Text style={styles.errorText}>No todos found</Text>
      </View>
    )
  }

  return (
    <View style={styles.container}>
      <FlatList
        data={todos}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View style={styles.todoItem}>
            <TouchableOpacity
              style={styles.todoItemContent}
              onPress={() => handleIsCompleted(item.id)}
              activeOpacity={0.7}
            >
              <Checkbox
                value={item.completed}
                style={styles.checkbox}
                color={colors.accentPrimary}
                onValueChange={() => handleIsCompleted(item.id)}
              />
              <Text
                style={[
                  styles.todoTitle,
                  item.completed && {
                    textDecorationLine: 'line-through',
                    opacity: 0.6,
                  },
                ]}
              >
                {item.title}
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() =>
                Alert.alert(
                  'Delete Todo',
                  'Are you sure you want to delete this todo?',
                  [
                    {
                      text: 'Cancel',
                      style: 'cancel',
                    },
                    {
                      text: 'Delete',
                      style: 'destructive',
                      onPress: () => deleteTodo(item.id),
                    },
                  ]
                )
              }
            >
              <Ionicons name="trash" size={24} color="black" />
            </TouchableOpacity>
          </View>
        )}
      />
    </View>
  )
}

export default TodoList

const styles = {
  errorContainer: {
    flex: 1,
    alignItems: 'center' as const,
    padding: 20,
    paddingTop: 100,
  },
  errorText: {
    fontSize: 16,
    color: colors.textSecondary,
  },
  container: {
    flex: 1,
    paddingVertical: 20,
  },
  todoItem: {
    marginBottom: 10,
    flexDirection: 'row' as const,
    alignItems: 'center' as const,
    justifyContent: 'space-between' as const,
    padding: 15,
    borderRadius: radius.sm,
    backgroundColor: colors.surfacePrimary,
  },
  todoTitle: {
    fontSize: 16,
  },
  todoItemContent: {
    flexDirection: 'row' as const,
    alignItems: 'center' as const,
    gap: 10,
    flex: 1,
  },
  checkbox: {
    borderWidth: 2,
    borderRadius: radius.sm,
  },
}
