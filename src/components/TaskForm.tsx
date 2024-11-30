import React, { useState } from 'react';
import { PlusCircle } from 'lucide-react';
import { Task, TaskPriority } from '../types/task';
import { validateTask } from '../utils/taskUtils';
import axios from 'axios'; 

interface TaskFormProps {
  onSubmit: (task: Omit<Task, 'id'>) => void;
}

export function TaskForm({ onSubmit }: TaskFormProps) {
  const [errors, setErrors] = useState<string[]>([]);
  const [formData, setFormData] = useState({
    title: '',
    startTime: '',
    endTime: '',
    priority: '3' as unknown as TaskPriority,
    status: 'pending' as const,
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const validationErrors = validateTask(formData);

    if (validationErrors.length > 0) {
      setErrors(validationErrors);
      return;
    }

    try {
      // Make API call to save the task in the database
      const response = await axios.post('https://task-manager-smitthakore.vercel.app/api/tasks', formData, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`, // Assuming token is saved in localStorage
        },
      });

      console.log('Task created successfully:', response.data); // Log the created task
      onSubmit(response.data); // Pass the created task back to the parent
      setFormData({
        title: '',
        startTime: '',
        endTime: '',
        priority: 3 as TaskPriority,
        status: 'pending',
      });
      setErrors([]);
    } catch (error) {
      console.error('Error creating task:', error); // Log the error if task creation fails
      setErrors(['Failed to create task']);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 bg-white p-6 rounded-lg shadow-md">
      <div>
        <label className="block text-sm font-medium text-gray-700">Title</label>
        <input
          type="text"
          value={formData.title}
          onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
        />
      </div>
      
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">Start Time</label>
          <input
            type="datetime-local"
            value={formData.startTime}
            onChange={(e) => setFormData(prev => ({ ...prev, startTime: e.target.value }))}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
          />
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700">End Time</label>
          <input
            type="datetime-local"
            value={formData.endTime}
            onChange={(e) => setFormData(prev => ({ ...prev, endTime: e.target.value }))}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
          />
        </div>
      </div>
      
      <div>
        <label className="block text-sm font-medium text-gray-700">Priority</label>
        <select
          value={formData.priority}
          onChange={(e) => setFormData(prev => ({ ...prev, priority: Number(e.target.value) as TaskPriority }))}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
        >
          {[1, 2, 3, 4, 5].map(priority => (
            <option key={priority} value={priority}>
              {priority} - {priority === 1 ? 'Highest' : priority === 5 ? 'Lowest' : `Priority ${priority}`}
            </option>
          ))}
        </select>
      </div>

      {errors.length > 0 && (
        <div className="text-red-500 text-sm">
          {errors.map((error, index) => (
            <p key={index}>{error}</p>
          ))}
        </div>
      )}
      
      <button
        type="submit"
        className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
      >
        <PlusCircle className="w-4 h-4 mr-2" />
        Add Task
      </button>
    </form>
  );
}

export default TaskForm;
