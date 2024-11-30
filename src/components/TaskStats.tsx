import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { Clock, CheckCircle, AlertCircle } from 'lucide-react';
import { TaskStats as TaskStatsType } from '../types/task';

interface TaskStatsProps {
  stats: TaskStatsType;
}

export function TaskStats({ stats }: TaskStatsProps) {
  const timeStatsData = stats.timeStats.map(stat => ({
    priority: `Priority ${stat.priority}`,
    'Time Lapsed': stat.timeLapsed,
    'Estimated Time Left': stat.estimatedTimeLeft,
  }));

  return (
    <div className="bg-white p-6 rounded-lg shadow-md space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-blue-50 p-4 rounded-lg">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-medium text-blue-900">Total Tasks</h3>
            <AlertCircle className="w-5 h-5 text-blue-500" />
          </div>
          <p className="mt-2 text-3xl font-bold text-blue-700">{stats.totalTasks}</p>
        </div>
        
        <div className="bg-green-50 p-4 rounded-lg">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-medium text-green-900">Completed</h3>
            <CheckCircle className="w-5 h-5 text-green-500" />
          </div>
          <p className="mt-2 text-3xl font-bold text-green-700">
            {stats.completedPercentage.toFixed(1)}%
          </p>
        </div>
        
        <div className="bg-yellow-50 p-4 rounded-lg">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-medium text-yellow-900">Pending</h3>
            <Clock className="w-5 h-5 text-yellow-500" />
          </div>
          <p className="mt-2 text-3xl font-bold text-yellow-700">
            {stats.pendingPercentage.toFixed(1)}%
          </p>
        </div>
      </div>

      <div className="mt-8">
        <h3 className="text-lg font-medium text-gray-900 mb-4">Time Statistics by Priority</h3>
        <div className="h-64">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={timeStatsData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="priority" />
              <YAxis label={{ value: 'Hours', angle: -90, position: 'insideLeft' }} />
              <Tooltip />
              <Bar dataKey="Time Lapsed" fill="#60A5FA" />
              <Bar dataKey="Estimated Time Left" fill="#34D399" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="mt-6 p-4 bg-gray-50 rounded-lg">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-medium text-gray-900">Average Completion Time</h3>
          <span className="text-2xl font-bold text-gray-700">
            {stats.averageCompletionTime.toFixed(1)} hours
          </span>
        </div>
      </div>
    </div>
  );
}

export default TaskStats;