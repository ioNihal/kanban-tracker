import React, { useRef } from 'react';
import { Menu, Download, Upload } from 'lucide-react';
import styles from './AppBar.module.css';
import { useKanban } from '../../context/KanbanContext';
import { exportData, importData } from '../../utils/syncUtils';

export function AppBar({ onMenuClick }) {
  return (
    <header className={styles.appBar}>
      <div className={styles.left}>
        <div className={styles.iconButton} onClick={onMenuClick}>
          <Menu className={styles.icon} />
        </div>
        <h1 className={styles.title}>Kanban</h1>
      </div>
    </header>
  );
}
