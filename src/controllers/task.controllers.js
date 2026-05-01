import { User } from '../models/user.models.js';
import { Project } from '../models/project.models.js';
import { Task } from '../models/task.model.js';
import { Subtask } from '../models/subtask.model.js';
import { ApiResponse } from '../utils/api-response.js';
import { ApiError } from '../utils/api-error.js';
import { asyncHandler } from '../utils/async-handler.js';
import mongoose, { mongo } from 'mongoose';
import { AvailableUserRole, UserRolesEnum } from '../utils/constants.js';

const createTask = asyncHandler(async(req, res) => {
  const {title, description, assignedTo, status} = req.body
  const {projectId} = req.params;
  const project  = await Project.findById(projectId)
  if(!project){
    throw new ApiError(404, "Project not found")
  }
  const files = req.files || []

  const attachements = files.map((file) => {
    return {
      url: `{process.env.SERVER_URL}/images/${file.originalname}`,
      mimetype: file.mimetype,
      size: file.size
    }
  })

  const task = await Task.create({
    title,
    description,
    project: new mongoose.Types.ObjectId(projectId),
    assignedTo: assignedTo ? new mongoose.Types.ObjectId(assignedTo) : undefined,
    status,
    assignedBy: new mongoose.Types.ObjectId(req.user._id),
    attachements
  })
  return res
    .status(201)
    .json(new ApiResponse(201, task, "Task created successfully"))
});

const getTaskById = asyncHandler(async(req, res) => {

})
const getTasks = asyncHandler(async(req, res) => {
  const {projectId} = req.params;
  const project  = await Project.findById(projectId)
  if(!project){
    throw new ApiError(404, "Project not found")
  }
  const tasks = await task.find({
    project: new mongoose.Types.ObjectId(projectId)
  }).populate("assignedTo", "avatar username fullName")

  return res
    .status(201)
    .json(new ApiResponse(201, task, "Task fetched successfully"))
})
const updateTask = asyncHandler(async(req, res) => {

})
const deleteTask = asyncHandler(async(req, res) => {
  //chai
})
const createSubTasks = asyncHandler(async(req, res) => {
  //chai
})
const updateSubTask = asyncHandler(async(req, res) => {
  //chai
})
const deleteSubTask = asyncHandler(async(req, res) => {
  //chai
})

export {
  createSubTasks,
  createTask,
  deleteTasks,
  deleteSubTask,
  getTaskById,
  getTasks,
  updateSubTask,
  updateTask
}