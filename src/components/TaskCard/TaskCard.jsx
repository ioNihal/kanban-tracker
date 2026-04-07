import React from 'react';
import clsx from 'clsx';
import { AlignLeft } from 'lucide-react';
import styles from './TaskCard.module.css';

export function TaskCard({ task, onClick }) {
  return (
    <div
      className={styles.card}
      onClick={() => onClick(task)}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          onClick(task);
        }
      }}
    >
      <div className={styles.header}>
        <h3 className={styles.title}>{task.title}</h3>
      </div>
      {task.description && (
        <div className={styles.hasDescription}>
          <AlignLeft size={14} className={styles.descIcon} />
        </div>
      )}
    </div>
  );
}
