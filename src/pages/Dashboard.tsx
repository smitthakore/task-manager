import { TaskStats } from '../components/TaskStats';
import { useTaskContext } from '../context/TaskContext';
import { calculateTaskStats } from '../utils/taskUtils';

export function Dashboard() {
  const { tasks } = useTaskContext();
  const stats = calculateTaskStats(tasks);

  return (
    <div>
      <h1 className="text-3xl font-bold text-gray-900 mb-8">Dashboard</h1>
      <TaskStats stats={stats} />
    </div>
  );
}