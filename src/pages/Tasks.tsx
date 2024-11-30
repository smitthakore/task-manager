import { useState } from 'react';
import { TaskForm } from '../components/TaskForm';
import { TaskList } from '../components/TaskList';
import { TaskFilters } from '../components/TaskFilters';
import { TaskStatus, TaskPriority } from '../types/task';
import { useTaskContext } from '../context/TaskContext';

export function Tasks() {
  const { tasks, addTask, updateTaskStatus } = useTaskContext();
  const [statusFilter, setStatusFilter] = useState<TaskStatus | 'all'>('all');
  const [priorityFilter, setPriorityFilter] = useState<TaskPriority | 'all'>('all');
  const [sortBy, setSortBy] = useState<'startTime' | 'endTime'>('startTime');

  return (
    <div>
      <h1 className="text-3xl font-bold text-gray-900 mb-8">Tasks</h1>
      <div className="space-y-6">
        <TaskForm onSubmit={addTask} />
        <TaskFilters
          statusFilter={statusFilter}
          priorityFilter={priorityFilter}
          sortBy={sortBy}
          onStatusFilterChange={setStatusFilter}
          onPriorityFilterChange={setPriorityFilter}
          onSortChange={setSortBy}
        />
        <TaskList
          tasks={tasks}
          onStatusChange={updateTaskStatus}
          statusFilter={statusFilter}
          priorityFilter={priorityFilter}
          sortBy={sortBy}
        />
      </div>
    </div>
  );
}