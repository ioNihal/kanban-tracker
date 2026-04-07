import React, { useState } from 'react';
import { AppBar } from './components/AppBar/AppBar';
import { KanbanBoard } from './components/KanbanBoard/KanbanBoard';
import { TaskModal } from './components/TaskModal/TaskModal';
import { FAB } from './components/FAB/FAB';
import { Sidebar } from './components/Sidebar/Sidebar';
import styles from './App.module.css';

function AppContent() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [editingTask, setEditingTask] = useState(null);

  const handleOpenNewTask = () => {
    setEditingTask(null);
    setIsModalOpen(true);
  };

  const handleOpenEditTask = (task) => {
    setEditingTask(task);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setEditingTask(null);
  };

  return (
    <div className={styles.appContainer}>
      <AppBar onMenuClick={() => setIsSidebarOpen(true)} />
      <main className={styles.mainContent}>
        <KanbanBoard onTaskClick={handleOpenEditTask} />
      </main>
      
      <FAB onClick={handleOpenNewTask} />

      {isModalOpen && (
        <TaskModal 
          task={editingTask} 
          onClose={handleCloseModal} 
        />
      )}

      <Sidebar 
        isOpen={isSidebarOpen} 
        onClose={() => setIsSidebarOpen(false)} 
      />
    </div>
  );
}

export default AppContent;
