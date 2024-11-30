import { Clock, CheckCircle, XCircle } from 'lucide-react';
import { Task, TaskStatus, TaskPriority } from '../types/task';
import { format } from 'date-fns';

interface TaskListProps {
  tasks: Task[];
  onStatusChange: (taskId: string, status: TaskStatus) => void;
  statusFilter: TaskStatus | 'all';
  priorityFilter: TaskPriority | 'all';
  sortBy: 'startTime' | 'endTime';
}

export function TaskList({
  tasks,
  onStatusChange,
  statusFilter,
  priorityFilter,
  sortBy,
}: TaskListProps) {
  const filteredTasks = tasks
    .filter(task => statusFilter === 'all' || task.status === statusFilter)
    .filter(task => priorityFilter === 'all' || task.priority === priorityFilter)
    .sort((a, b) => {
      const dateA = new Date(sortBy === 'startTime' ? a.startTime : a.endTime);
      const dateB = new Date(sortBy === 'startTime' ? b.startTime : b.endTime);
      return dateA.getTime() - dateB.getTime();
    });

  return (
    <div className="space-y-4">
      {filteredTasks.map(task => (
        <div
          key={task.id}
          className="bg-white p-4 rounded-lg shadow-md hover:shadow-lg transition-shadow"
        >
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold">{task.title}</h3>
            <span className={`px-2 py-1 rounded-full text-sm ${
              task.priority <= 2 ? 'bg-red-100 text-red-800' :
              task.priority === 3 ? 'bg-yellow-100 text-yellow-800' :
              'bg-green-100 text-green-800'
            }`}>
              Priority {task.priority}
            </span>
          </div>
          
          <div className="mt-2 grid grid-cols-2 gap-4 text-sm text-gray-600">
            <div className="flex items-center">
              <Clock className="w-4 h-4 mr-1" />
              Start: {format(new Date(task.startTime), 'PPp')}
            </div>
            <div className="flex items-center">
              <Clock className="w-4 h-4 mr-1" />
              {task.status === 'finished' ? 'Completed' : 'Due'}: {format(new Date(task.endTime), 'PPp')}
            </div>
          </div>
          
          <div className="mt-4 flex justify-between items-center">
            <span className={`flex items-center ${
              task.status === 'finished' ? 'text-green-600' : 'text-yellow-600'
            }`}>
              {task.status === 'finished' ? (
                <CheckCircle className="w-4 h-4 mr-1" />
              ) : (
                <XCircle className="w-4 h-4 mr-1" />
              )}
              {task.status}
            </span>
            
            <button
              onClick={() => onStatusChange(task.id, task.status === 'finished' ? 'pending' : 'finished')}
              className={`px-3 py-1 rounded-md text-sm font-medium ${
                task.status === 'finished'
                  ? 'bg-yellow-100 text-yellow-700 hover:bg-yellow-200'
                  : 'bg-green-100 text-green-700 hover:bg-green-200'
              }`}
            >
              {task.status === 'finished' ? 'Mark as Pending' : 'Mark as Complete'}
            </button>
          </div>
        </div>
      ))}
      
      {filteredTasks.length === 0 && (
        <div className="text-center py-8 text-gray-500">
          No tasks found matching the current filters
        </div>
      )}
    </div>
  );
}

export default TaskList;
