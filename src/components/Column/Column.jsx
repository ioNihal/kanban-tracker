import React from 'react';
import { TaskCard } from '../TaskCard/TaskCard';
import styles from './Column.module.css';

export function Column({ column, tasks, onTaskClick }) {
  return (
    <section className={styles.column}>
      <div className={styles.header}>
        <h2 className={styles.title}>{column.title}</h2>
        <span className={styles.count}>{tasks.length}</span>
      </div>
      <div className={styles.taskList}>
        {tasks.map(task => (
          <TaskCard 
            key={task.id} 
            task={task} 
            onClick={onTaskClick} 
          />
        ))}
      </div>
    </section>
  );
}
