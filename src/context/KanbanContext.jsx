import React, { createContext, useContext } from 'react';
import { useLocalStorage } from '../hooks/useLocalStorage';
import { v4 as uuidv4 } from 'uuid';

const KanbanContext = createContext();

const initialData = {
  tasks: [
    { id: '1', title: 'Welcome to Kanban', description: 'This is a sample task.', status: 'TODO' },
    { id: '2', title: 'Edit a task', description: 'Tap this task to edit its contents.', status: 'IN_PROGRESS' },
  ],
  columns: [
    { id: 'TODO', title: 'To Do' },
    { id: 'IN_PROGRESS', title: 'In Progress' },
    { id: 'DONE', title: 'Done' }
  ]
};

export function KanbanProvider({ children }) {
  const [data, setData] = useLocalStorage('kanban_data', initialData);

  const addTask = (taskProps) => {
    const newTask = {
      id: uuidv4(),
      ...taskProps,
    };
    setData((prev) => ({
      ...prev,
      tasks: [...prev.tasks, newTask]
    }));
  };

  const updateTask = (id, updatedProps) => {
    setData((prev) => ({
      ...prev,
      tasks: prev.tasks.map(t => t.id === id ? { ...t, ...updatedProps } : t)
    }));
  };

  const moveTask = (id, newStatus) => {
    updateTask(id, { status: newStatus });
  };

  const deleteTask = (id) => {
    setData((prev) => ({
      ...prev,
      tasks: prev.tasks.filter(t => t.id !== id)
    }));
  };

  const clearData = () => {
    if (window.confirm("Are you sure you want to delete all data? This cannot be undone.")) {
      setData(initialData);
    }
  };

  const replaceData = (newData) => {
    if (newData && newData.columns && newData.tasks) {
      setData(newData);
    }
  };

  return (
    <KanbanContext.Provider value={{
      data,
      addTask,
      updateTask,
      moveTask,
      deleteTask,
      clearData,
      replaceData
    }}>
      {children}
    </KanbanContext.Provider>
  );
}

export function useKanban() {
  return useContext(KanbanContext);
}
