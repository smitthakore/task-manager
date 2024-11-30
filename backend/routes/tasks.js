import express from 'express';
import { authenticateToken } from '../middleware/auth.js';
import { Task } from '../models/Task.js';

const router = express.Router();

// GET route to fetch tasks for the authenticated user
router.get('/', authenticateToken, async (req, res) => {
  try {
    // Log the userId to ensure it is correctly passed from the token
    console.log('User ID from token:', req.user.userId);

    const tasks = await Task.find({ user: req.user.userId })
      .sort({ createdAt: -1 }); // Sort tasks by creation date (most recent first)
    
    console.log('Fetched tasks:', tasks);  // Log the fetched tasks
    res.json(tasks);
  } catch (error) {
    console.error('Error fetching tasks:', error);  // Log any errors
    res.status(500).json({ error: 'Error fetching tasks' });
  }
});

// POST route to create a new task
router.post('/', authenticateToken, async (req, res) => {
  try {
    const { title, startTime, endTime, priority, status } = req.body;

    // Log the received task data for debugging
    console.log('Received task data:', req.body);

    // Validate input data
    if (!title || !startTime || !endTime || !priority || !status) {
      return res.status(400).json({ error: 'All fields are required' });
    }

    // Create new task object
    const task = new Task({
      user: req.user.userId, // Attach the user ID from the decoded JWT
      title,
      startTime: new Date(startTime), // Ensure the date is in valid format
      endTime: new Date(endTime),
      priority,
      status,
    });

    // Save task to the database
    await task.save();

    // Log the saved task for debugging
    console.log('Task saved:', task);
    res.status(201).json(task);  // Respond with the created task
  } catch (error) {
    console.error('Error saving task:', error);  // Log any errors during task creation
    res.status(500).json({ error: 'Error creating task' });
  }
});

// PATCH route to update the status of a task
router.patch('/:id/status', authenticateToken, async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    // Log the task ID and status for debugging
    console.log('Updating task ID:', id, 'New status:', status);

    const task = await Task.findOne({ _id: id, user: req.user.userId });
    if (!task) {
      return res.status(404).json({ error: 'Task not found' });
    }

    // Update the status and possibly set the end time if the task is finished
    task.status = status;
    if (status === 'finished') {
      task.endTime = new Date();  // Set the end time when the task is marked finished
    }

    // Save the updated task
    await task.save();

    // Log the updated task for debugging
    console.log('Task updated:', task);
    res.json(task);  // Respond with the updated task
  } catch (error) {
    console.error('Error updating task:', error);  // Log any errors during task update
    res.status(500).json({ error: 'Error updating task' });
  }
});

export default router;
