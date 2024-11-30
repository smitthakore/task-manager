import React, { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';
import { Task, TaskStatus } from '../types/task';

interface TaskContextType {
  tasks: Task[];
  addTask: (task: Omit<Task, 'id'>) => void;
  updateTaskStatus: (taskId: string, status: TaskStatus) => void;
  fetchTasks: () => void;
}

const TaskContext = createContext<TaskContextType | undefined>(undefined);

export function TaskProvider({ children }: { children: React.ReactNode }) {
  const [tasks, setTasks] = useState<Task[]>([]);

  // Fetch tasks from the backend
  const fetchTasks = async () => {
    try {
      const token = localStorage.getItem('token');
      if (!token) return;

      const response = await axios.get('https://task-manager-smitthakore.vercel.app/api/tasks', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setTasks(response.data); // Set tasks from the backend
    } catch (error) {
      console.error('Error fetching tasks:', error);
    }
  };

  // Add task to the backend and state
  const addTask = async (newTask: Omit<Task, 'id'>) => {
    try {
      const token = localStorage.getItem('token');
      if (!token) return;

      const response = await axios.post(
        'http://localhost:3000/api/tasks',
        newTask,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setTasks(prev => [...prev, response.data]); // Add task to local state
    } catch (error) {
      console.error('Error adding task:', error);
    }
  };

  // Update task status in backend and state
  const updateTaskStatus = async (taskId: string, newStatus: TaskStatus) => {
    try {
      const token = localStorage.getItem('token');
      if (!token) return;

      // Update status in backend
      const response = await axios.patch(
        `http://localhost:3000/api/tasks/${taskId}/status`,
        { status: newStatus },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      // Optimistically update local state
      setTasks(prev =>
        prev.map(task =>
          task.id === taskId
            ? {
                ...task,
                status: response.data.status, // Update status from response
                endTime: response.data.endTime, // Update endTime if available
              }
            : task
        )
      );
    } catch (error) {
      console.error('Error updating task status:', error);
    }
  };

  // Fetch tasks when component is mounted
  useEffect(() => {
    fetchTasks(); // Fetch tasks on mount
  }, []);

  return (
    <TaskContext.Provider value={{ tasks, addTask, updateTaskStatus, fetchTasks }}>
      {children}
    </TaskContext.Provider>
  );
}

export function useTaskContext() {
  const context = useContext(TaskContext);
  if (context === undefined) {
    throw new Error('useTaskContext must be used within a TaskProvider');
  }
  return context;
}
