import React, { useRef } from 'react';
import { X, Download, Upload, Trash2, Info } from 'lucide-react';
import { useKanban } from '../../context/KanbanContext';
import { exportData, importData } from '../../utils/syncUtils';
import styles from './Sidebar.module.css';
import clsx from 'clsx';

export function Sidebar({ isOpen, onClose }) {
  const { data, replaceData, clearData } = useKanban();
  const fileInputRef = useRef(null);

  if (!isOpen) return null;

  const handleExport = () => {
    exportData(data);
    onClose();
  };

  const handleImportClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    try {
      const parsedData = await importData(file);
      replaceData(parsedData);
      alert('Data imported successfully!');
      onClose();
    } catch (err) {
      alert('Failed to import data: ' + err.message);
    }
    e.target.value = '';
  };

  const handleClear = () => {
    clearData();
    onClose();
  };

  return (
    <div className={styles.overlay} onClick={onClose}>
      <div className={styles.sidebar} onClick={e => e.stopPropagation()}>
        <div className={styles.header}>
          <h2 className={styles.title}>Menu</h2>
          <button className={styles.closeBtn} onClick={onClose}>
            <X size={20} />
          </button>
        </div>

        <div className={styles.body}>
          <div className={styles.section}>
            <h3 className={styles.sectionTitle}>Settings</h3>

            <button className={styles.menuItem} onClick={handleImportClick}>
              <Upload size={18} />
              <span>Import Data</span>
            </button>
            <input
              type="file"
              accept=".json"
              ref={fileInputRef}
              style={{ display: 'none' }}
              onChange={handleFileChange}
            />

            <button className={styles.menuItem} onClick={handleExport}>
              <Upload size={18} />
              <span>Export Data</span>
            </button>

            <button className={clsx(styles.menuItem, styles.danger)} onClick={handleClear}>
              <Trash2 size={18} />
              <span>Clear All Data</span>
            </button>
          </div>

          <div className={styles.section}>
            <h3 className={styles.sectionTitle}>About</h3>
            <div className={styles.aboutCard}>
              <div className={styles.aboutHeader}>
                <Info size={16} />
                <strong>Kanban Tracker PWA</strong>
              </div>
              <p className={styles.aboutText}>
                A local-first, privacy-focused task runner.
                Your data never leaves your device unless you explicitly export it.
              </p>
              <p className={styles.aboutVersion}>Version 1.0.0</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
