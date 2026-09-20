import { User } from '../models/user.models.js';
import { Project } from '../models/project.models.js';
import { Task } from '../models/task.model.js';
import { Subtask } from '../models/subtask.model.js';
import { ApiResponse } from '../utils/api-response.js';
import { ApiError } from '../utils/api-error.js';
import { asyncHandler } from '../utils/async-handler.js';
import mongoose from 'mongoose';
import { AvailableUserRole, AvailableTaskStatus, TaskStatusEnum, UserRolesEnum } from '../utils/constants.js';

const createTask = asyncHandler(async (req, res) => {
  const { title, description, assignedTo, status } = req.body;
  const { projectId } = req.params;

  const project = await Project.findById(projectId);
  if (!project) {
    throw new ApiError(404, 'Project not found');
  }

  const files = req.files || [];
  const attachments = files.map((file) => ({
    url: `${process.env.SERVER_URL || ''}/images/${file.filename}`,
    mimeType: file.mimetype,
    size: file.size,
  }));

  const task = await Task.create({
    title,
    description,
    project: new mongoose.Types.ObjectId(projectId),
    assignedTo: assignedTo ? new mongoose.Types.ObjectId(assignedTo) : undefined,
    status: status || TaskStatusEnum.TODO,
    assignedBy: new mongoose.Types.ObjectId(req.user._id),
    attachments,
  });

  return res.status(201).json(new ApiResponse(201, task, 'Task created successfully'));
});

const getTasks = asyncHandler(async (req, res) => {
  const { projectId } = req.params;

  const project = await Project.findById(projectId);
  if (!project) {
    throw new ApiError(404, 'Project not found');
  }

  const tasks = await Task.find({
    project: new mongoose.Types.ObjectId(projectId),
  })
    .populate('assignedTo', 'avatar username fullName')
    .populate('assignedBy', 'avatar username fullName')
    .sort({ createdAt: -1 });

  return res.status(200).json(new ApiResponse(200, tasks, 'Tasks fetched successfully'));
});

const getTaskById = asyncHandler(async (req, res) => {
  const { projectId, taskId } = req.params;

  const task = await Task.findOne({
    _id: new mongoose.Types.ObjectId(taskId),
    project: new mongoose.Types.ObjectId(projectId),
  })
    .populate('assignedTo', 'avatar username fullName')
    .populate('assignedBy', 'avatar username fullName');

  if (!task) {
    throw new ApiError(404, 'Task not found');
  }

  const subtasks = await Subtask.find({
    task: new mongoose.Types.ObjectId(taskId),
  })
    .populate('createdBy createBy', 'avatar username fullName')
    .sort({ createdAt: 1 });

  const taskData = {
    ...task.toObject(),
    subtasks,
  };

  return res.status(200).json(new ApiResponse(200, taskData, 'Task fetched successfully'));
});

const updateTask = asyncHandler(async (req, res) => {
  const { projectId, taskId } = req.params;
  const { title, description, assignedTo, status } = req.body;

  const task = await Task.findOne({
    _id: new mongoose.Types.ObjectId(taskId),
    project: new mongoose.Types.ObjectId(projectId),
  });

  if (!task) {
    throw new ApiError(404, 'Task not found');
  }

  if (title !== undefined) task.title = title;
  if (description !== undefined) task.description = description;
  if (status !== undefined) task.status = status;
  if (assignedTo !== undefined) {
    task.assignedTo = assignedTo ? new mongoose.Types.ObjectId(assignedTo) : null;
  }

  const files = req.files || [];
  if (files.length > 0) {
    const newAttachments = files.map((file) => ({
      url: `${process.env.SERVER_URL || ''}/images/${file.filename}`,
      mimeType: file.mimetype,
      size: file.size,
    }));
    task.attachments.push(...newAttachments);
  }

  await task.save();

  const updatedTask = await Task.findById(task._id)
    .populate('assignedTo', 'avatar username fullName')
    .populate('assignedBy', 'avatar username fullName');

  return res.status(200).json(new ApiResponse(200, updatedTask, 'Task updated successfully'));
});

const deleteTask = asyncHandler(async (req, res) => {
  const { projectId, taskId } = req.params;

  const task = await Task.findOne({
    _id: new mongoose.Types.ObjectId(taskId),
    project: new mongoose.Types.ObjectId(projectId),
  });

  if (!task) {
    throw new ApiError(404, 'Task not found');
  }

  await Subtask.deleteMany({ task: new mongoose.Types.ObjectId(taskId) });
  await Task.findByIdAndDelete(taskId);

  return res.status(200).json(new ApiResponse(200, {}, 'Task and associated subtasks deleted successfully'));
});

const createSubTasks = asyncHandler(async (req, res) => {
  const { projectId, taskId } = req.params;
  const { title } = req.body;

  const task = await Task.findOne({
    _id: new mongoose.Types.ObjectId(taskId),
    project: new mongoose.Types.ObjectId(projectId),
  });

  if (!task) {
    throw new ApiError(404, 'Task not found');
  }

  const subtask = await Subtask.create({
    title,
    task: new mongoose.Types.ObjectId(taskId),
    createdBy: new mongoose.Types.ObjectId(req.user._id),
    createBy: new mongoose.Types.ObjectId(req.user._id),
    isCompleted: false,
  });

  return res.status(201).json(new ApiResponse(201, subtask, 'Subtask created successfully'));
});

const updateSubTask = asyncHandler(async (req, res) => {
  const { projectId, subTaskId } = req.params;
  const { title, isCompleted } = req.body;

  const subtask = await Subtask.findById(subTaskId);
  if (!subtask) {
    throw new ApiError(404, 'Subtask not found');
  }

  const task = await Task.findOne({
    _id: subtask.task,
    project: new mongoose.Types.ObjectId(projectId),
  });

  if (!task) {
    throw new ApiError(404, 'Subtask does not belong to this project');
  }

  // Role check: Members can only update isCompleted status
  if (req.user.role === UserRolesEnum.MEMBER) {
    if (title !== undefined && title !== subtask.title) {
      throw new ApiError(403, 'Members are only allowed to update subtask completion status');
    }
  } else {
    if (title !== undefined) {
      subtask.title = title;
    }
  }

  if (isCompleted !== undefined) {
    subtask.isCompleted = Boolean(isCompleted);
  }

  await subtask.save();

  return res.status(200).json(new ApiResponse(200, subtask, 'Subtask updated successfully'));
});

const deleteSubTask = asyncHandler(async (req, res) => {
  const { projectId, subTaskId } = req.params;

  const subtask = await Subtask.findById(subTaskId);
  if (!subtask) {
    throw new ApiError(404, 'Subtask not found');
  }

  const task = await Task.findOne({
    _id: subtask.task,
    project: new mongoose.Types.ObjectId(projectId),
  });

  if (!task) {
    throw new ApiError(404, 'Subtask does not belong to this project');
  }

  await Subtask.findByIdAndDelete(subTaskId);

  return res.status(200).json(new ApiResponse(200, {}, 'Subtask deleted successfully'));
});

export {
  createSubTasks,
  createSubTasks as createSubTask,
  createTask,
  deleteTask as deleteTasks,
  deleteTask,
  deleteSubTask,
  getTaskById,
  getTasks,
  updateSubTask,
  updateTask,
};