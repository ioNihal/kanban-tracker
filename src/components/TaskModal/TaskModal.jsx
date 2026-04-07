import React, { useState, useEffect } from 'react';
import { X, Trash2 } from 'lucide-react';
import { useKanban } from '../../context/KanbanContext';
import styles from './TaskModal.module.css';
import clsx from 'clsx';

export function TaskModal({ task, onClose }) {
  const { data, addTask, updateTask, deleteTask } = useKanban();
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [status, setStatus] = useState('TODO');

  const isEditing = !!task;

  useEffect(() => {
    if (isEditing) {
      setTitle(task.title || '');
      setDescription(task.description || '');
      setStatus(task.status || 'TODO');
    } else {
      setTitle('');
      setDescription('');
      setStatus('TODO');
    }
  }, [task, isEditing]);

  const handleSave = () => {
    if (!title.trim()) return;

    if (isEditing) {
      updateTask(task.id, { title, description, status });
    } else {
      addTask({ title, description, status });
    }
    onClose();
  };

  const handleDelete = () => {
    if (isEditing) {
      if (window.confirm("Are you sure you want to delete this task?")) {
        deleteTask(task.id);
        onClose();
      }
    }
  };

  return (
    <div className={styles.overlay} onClick={onClose}>
      <div className={styles.modal} onClick={e => e.stopPropagation()}>
        <div className={styles.header}>
          <h2 className={styles.heading}>{isEditing ? 'Edit Task' : 'New Task'}</h2>
          <button className={styles.closeBtn} onClick={onClose}>
            <X size={20} />
          </button>
        </div>
        
        <div className={styles.body}>
          <div className={styles.formGroup}>
            <label className={styles.label}>Title</label>
            <input 
              type="text" 
              className={styles.input} 
              value={title} 
              onChange={e => setTitle(e.target.value)}
              placeholder="What needs to be done?"
              autoFocus
            />
          </div>

          <div className={styles.formGroup}>
            <label className={styles.label}>Description</label>
            <textarea 
              className={clsx(styles.input, styles.textarea)} 
              value={description} 
              onChange={e => setDescription(e.target.value)}
              placeholder="Add additional details..."
            />
          </div>

          <div className={styles.formGroup}>
            <label className={styles.label}>Status</label>
            <select 
              className={styles.input} 
              value={status} 
              onChange={e => setStatus(e.target.value)}
            >
              {data.columns.map(col => (
                <option key={col.id} value={col.id}>{col.title}</option>
              ))}
            </select>
          </div>
        </div>

        <div className={styles.footer}>
          {isEditing && (
            <button className={clsx(styles.btn, styles.btnDanger)} onClick={handleDelete}>
              <Trash2 size={16} /> Delete
            </button>
          )}
          <div className={styles.footerRight}>
            <button className={clsx(styles.btn, styles.btnGhost)} onClick={onClose}>Cancel</button>
            <button className={clsx(styles.btn, styles.btnPrimary)} onClick={handleSave}>
              Save
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
