import AddTodo from '@/components/add-todo'
import Navbar from '@/components/header'
import SearchBar from '@/components/search-bar'
import TodoList from '@/components/todo-list'
import type { Todo } from '@/types/todo'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { useEffect, useState } from 'react'
import {
  StyleSheet
} from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
export default function Index() {
  const [todos, setTodos] = useState<Todo[]>([])
  const [search, setSearch] = useState('')
  const fetchTodos = async () => {
    const todos = await AsyncStorage.getItem('todos')
    if (todos) {
      const sortedTodos = JSON.parse(todos).sort((a: Todo, b: Todo) => a.id - b.id)
      setTodos(sortedTodos)
    }
  }

  useEffect(() => {
    fetchTodos()
  }, [])

  useEffect(() => {
    if (search.trim() === '') {
      fetchTodos()
    }
  }, [search])

  return (
    <SafeAreaView style={styles.container}>
      {/* Navbar */}
      <Navbar />

      {/* Search bar */}
      <SearchBar search={search} setSearch={setSearch} todos={todos} setTodos={setTodos} />

      {/* TODO List */}
      <TodoList todos={todos} setTodos={setTodos} />

      {/* Add Todo */}
      <AddTodo todos={todos} setTodos={setTodos} />
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  heading: {
    fontSize: 30,
    fontWeight: 'semibold',
  },

})
