import React from 'react';
import { Column } from '../Column/Column';
import { useKanban } from '../../context/KanbanContext';
import styles from './KanbanBoard.module.css';

export function KanbanBoard({ onTaskClick }) {
  const { data } = useKanban();

  return (
    <div className={styles.boardContainer}>
      <div className={styles.boardScrollArea}>
        {data.columns.map(column => (
          <Column 
            key={column.id} 
            column={column} 
            tasks={data.tasks.filter(t => t.status === column.id)}
            onTaskClick={onTaskClick}
          />
        ))}
        {/* Spacer for horizontal scroll on mobile */}
        <div className={styles.spacer} />
      </div>
    </div>
  );
}
