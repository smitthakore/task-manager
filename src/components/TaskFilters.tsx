import { Filter, SortAsc } from 'lucide-react';
import { TaskStatus, TaskPriority } from '../types/task';

interface TaskFiltersProps {
  statusFilter: TaskStatus | 'all';
  priorityFilter: TaskPriority | 'all';
  sortBy: 'startTime' | 'endTime';
  onStatusFilterChange: (status: TaskStatus | 'all') => void;
  onPriorityFilterChange: (priority: TaskPriority | 'all') => void;
  onSortChange: (sort: 'startTime' | 'endTime') => void;
}

export function TaskFilters({
  statusFilter,
  priorityFilter,
  sortBy,
  onStatusFilterChange,
  onPriorityFilterChange,
  onSortChange,
}: TaskFiltersProps) {
  return (
    <div className="bg-white p-4 rounded-lg shadow-md space-y-4">
      <div className="flex items-center space-x-2">
        <Filter className="w-5 h-5 text-gray-500" />
        <span className="font-medium">Filters</span>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">Status</label>
          <select
            value={statusFilter}
            onChange={(e) => onStatusFilterChange(e.target.value as TaskStatus | 'all')}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
          >
            <option value="all">All</option>
            <option value="pending">Pending</option>
            <option value="finished">Finished</option>
          </select>
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700">Priority</label>
          <select
            value={priorityFilter}
            onChange={(e) => onPriorityFilterChange(e.target.value === 'all' ? 'all' : Number(e.target.value) as TaskPriority)}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
          >
            <option value="all">All</option>
            {[1, 2, 3, 4, 5].map(priority => (
              <option key={priority} value={priority}>
                Priority {priority}
              </option>
            ))}
          </select>
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700">
            <span className="flex items-center">
              <SortAsc className="w-4 h-4 mr-1" />
              Sort by
            </span>
          </label>
          <select
            value={sortBy}
            onChange={(e) => onSortChange(e.target.value as 'startTime' | 'endTime')}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
          >
            <option value="startTime">Start Time</option>
            <option value="endTime">End Time</option>
          </select>
        </div>
      </div>
    </div>
  );
}

export default TaskFilters;