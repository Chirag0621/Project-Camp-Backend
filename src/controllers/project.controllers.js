import { User } from '../models/user.models.js';
import { Project } from '../models/project.models.js';
import { ProjectMember } from '../models/projectmember.models.js';

import { ApiResponse } from '../utils/api-response.js';
import { ApiError } from '../utils/api-error.js';
import { asyncHandler } from '../utils/async-handler.js';

const getProject = asyncHandler(async (req, res) => {
  //test
})

const createProject = asyncHandler(async (req, res) => {
  //test
})

const updateProject = asyncHandler(async (req, res) => {
  //test
})

const deleteProject = asyncHandler(async (req, res) => {
  //test
})

const addMemberToProject = asyncHandler(async (req, res) => {
  //test
})

const getProjectMember = asyncHandler(async (req, res) => {
  //test
})

const getMemberRole = asyncHandler(async (req, res) => {
  //test
})

const deleteMember = asyncHandler(async (req, res) => {
  //test
})

export {
  getProject,
  createProject,
  updateProject,
  deleteProject,
  addMemberToProject,
  getProjectMember,
  getMemberRole,
  deleteMember
}