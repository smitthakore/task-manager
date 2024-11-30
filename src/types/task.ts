export type TaskStatus = 'pending' | 'finished';
export type TaskPriority = 1 | 2 | 3 | 4 | 5;

export interface Task {
  id: string;
  title: string;
  startTime: string;
  endTime: string;
  priority: TaskPriority;
  status: TaskStatus;
}

export interface TaskStats {
  totalTasks: number;
  completedPercentage: number;
  pendingPercentage: number;
  timeStats: {
    priority: TaskPriority;
    timeLapsed: number;
    estimatedTimeLeft: number;
  }[];
  averageCompletionTime: number;
}

export default TaskStats;