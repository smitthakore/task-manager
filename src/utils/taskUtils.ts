import { differenceInHours } from 'date-fns';
import { Task, TaskStats, TaskPriority } from '../types/task';

export const calculateTaskStats = (tasks: Task[]): TaskStats => {
  const totalTasks = tasks.length;
  const completedTasks = tasks.filter(task => task.status === 'finished');
  const pendingTasks = tasks.filter(task => task.status === 'pending');
  
  const completedPercentage = (completedTasks.length / totalTasks) * 100;
  const pendingPercentage = (pendingTasks.length / totalTasks) * 100;
  
  const now = new Date();
  
  const timeStats = [1, 2, 3, 4, 5].map((priority) => {
    const priorityTasks = pendingTasks.filter(task => task.priority === priority);
    const timeLapsed = priorityTasks.reduce((acc, task) => {
      return acc + Math.max(0, differenceInHours(now, new Date(task.startTime)));
    }, 0);
    
    const estimatedTimeLeft = priorityTasks.reduce((acc, task) => {
      const timeLeft = differenceInHours(new Date(task.endTime), now);
      return acc + Math.max(0, timeLeft);
    }, 0);
    
    return {
      priority: priority as TaskPriority,
      timeLapsed,
      estimatedTimeLeft,
    };
  });
  
  const averageCompletionTime = completedTasks.length > 0
    ? completedTasks.reduce((acc, task) => {
        return acc + differenceInHours(new Date(task.endTime), new Date(task.startTime));
      }, 0) / completedTasks.length
    : 0;
  
  return {
    totalTasks,
    completedPercentage,
    pendingPercentage,
    timeStats,
    averageCompletionTime,
  };
};

export const validateTask = (task: Partial<Task>): string[] => {
  const errors: string[] = [];
  
  if (!task.title?.trim()) {
    errors.push('Title is required');
  }
  
  if (!task.startTime) {
    errors.push('Start time is required');
  }
  
  if (!task.endTime) {
    errors.push('End time is required');
  }
  
  if (task.startTime && task.endTime && new Date(task.startTime) >= new Date(task.endTime)) {
    errors.push('End time must be after start time');
  }
  
  if (!task.priority || ![1, 2, 3, 4, 5].includes(task.priority)) {
    errors.push('Priority must be between 1 and 5');
  }
  
  if (task.status && !['pending', 'finished'].includes(task.status)) {
    errors.push('Status must be either pending or finished');
  }
  
  return errors;
};