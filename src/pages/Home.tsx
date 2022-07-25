import React, { useState } from 'react';
import { Alert, StyleSheet, View } from 'react-native';

import { Header } from '../components/Header';
import { Task, TasksList } from '../components/TasksList';
import { TodoInput } from '../components/TodoInput';

export function Home() {
  const [tasks, setTasks] = useState<Task[]>([]);

  function handleAddTask(newTaskTitle: string) {
    if (taskExists(newTaskTitle)) {
      return Alert.alert('Task já cadastrada', 'Você não pode cadastrar uma task com o mesmo nome');
    }

    const task: Task = {
      id: new Date().getTime(),
      title: newTaskTitle,
      done: false,
    }

    setTasks(oldState => [...oldState, task]);
  }

  function handleEditTask(id: number, taskNewTitle: string) {
    const tasksUpdated = tasks.map(task => ({ ...task }));
    const taskIndex = tasks.findIndex(task => task.id === id);

    if (taskIndex !== -1) {
      tasksUpdated[taskIndex].title = taskNewTitle;

      setTasks(tasksUpdated);
    }
  }

  function taskExists(newTaskTitle: string) {
    return tasks.find(task => task.title === newTaskTitle);
  }

  function handleToggleTaskDone(id: number) {
    const tasksUpdated = tasks.map(task => ({ ...task }));
    const taskIndex = tasks.findIndex(task => task.id === id);

    if (taskIndex !== -1) {
      tasksUpdated[taskIndex].done = !tasksUpdated[taskIndex].done;

      setTasks(tasksUpdated);
    }

  }

  function handleRemoveTask(id: number) {
    Alert.alert(
      'Remover item',
      'Tem certeza que você deseja remover esse item?',
      [
        {
          text: 'Não',
          onPress: () => {}
        },
        {
          text: 'Sim',
          onPress: () => removeTask(id)
        }
      ]
    )
    
  }

  function removeTask(id: number) {
    setTasks(oldState => oldState.filter(
      task => task.id !== id
    ));
  }

  return (
    <View style={styles.container}>
      <Header tasksCounter={tasks.length} />

      <TodoInput addTask={handleAddTask} />

      <TasksList
        tasks={tasks}
        toggleTaskDone={handleToggleTaskDone}
        removeTask={handleRemoveTask}
        editTask={handleEditTask}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#EBEBEB'
  }
})