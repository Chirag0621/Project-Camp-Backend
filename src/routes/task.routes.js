import { Router } from 'express';
import {
  createTask,
  getTasks,
  getTaskById,
  updateTask,
  deleteTask,
  createSubTasks,
  updateSubTask,
  deleteSubTask,
} from '../controllers/task.controllers.js';
import { verifyJWT, validateProjectPermission } from '../middlewares/auth.middlewares.js';
import { upload } from '../middlewares/multer.middlewares.js';
import { validate } from '../middlewares/validator.middlewares.js';
import {
  createTaskValidator,
  updateTaskValidator,
  createSubTaskValidator,
  updateSubTaskValidator,
} from '../validators/index.js';
import { UserRolesEnum } from '../utils/constants.js';

const router = Router();

// All task routes require authentication
router.use(verifyJWT);

// Task collection routes
router
  .route('/:projectId')
  .get(
    validateProjectPermission([
      UserRolesEnum.ADMIN,
      UserRolesEnum.PROJECT_ADMIN,
      UserRolesEnum.MEMBER,
    ]),
    getTasks
  )
  .post(
    validateProjectPermission([UserRolesEnum.ADMIN, UserRolesEnum.PROJECT_ADMIN]),
    upload.array('attachments'),
    createTaskValidator(),
    validate,
    createTask
  );

// Individual task routes
router
  .route('/:projectId/t/:taskId')
  .get(
    validateProjectPermission([
      UserRolesEnum.ADMIN,
      UserRolesEnum.PROJECT_ADMIN,
      UserRolesEnum.MEMBER,
    ]),
    getTaskById
  )
  .put(
    validateProjectPermission([UserRolesEnum.ADMIN, UserRolesEnum.PROJECT_ADMIN]),
    upload.array('attachments'),
    updateTaskValidator(),
    validate,
    updateTask
  )
  .delete(
    validateProjectPermission([UserRolesEnum.ADMIN, UserRolesEnum.PROJECT_ADMIN]),
    deleteTask
  );

// Subtask creation on task
router
  .route('/:projectId/t/:taskId/subtasks')
  .post(
    validateProjectPermission([UserRolesEnum.ADMIN, UserRolesEnum.PROJECT_ADMIN]),
    createSubTaskValidator(),
    validate,
    createSubTasks
  );

// Individual subtask routes
router
  .route('/:projectId/st/:subTaskId')
  .put(
    validateProjectPermission([
      UserRolesEnum.ADMIN,
      UserRolesEnum.PROJECT_ADMIN,
      UserRolesEnum.MEMBER,
    ]),
    updateSubTaskValidator(),
    validate,
    updateSubTask
  )
  .delete(
    validateProjectPermission([UserRolesEnum.ADMIN, UserRolesEnum.PROJECT_ADMIN]),
    deleteSubTask
  );

export default router;
