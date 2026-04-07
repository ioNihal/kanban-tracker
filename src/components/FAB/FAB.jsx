import React from 'react';
import { Plus } from 'lucide-react';
import styles from './FAB.module.css';

export function FAB({ onClick }) {
  return (
    <button className={styles.fab} onClick={onClick} aria-label="Add new task">
      <Plus size={24} />
    </button>
  );
}
