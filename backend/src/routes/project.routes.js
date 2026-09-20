import { Router } from 'express';

import {
  getProjects,
  createProject,
  updateProject,
  deleteProject,
  addMemberToProject,
  getProjectMembers,
  getProjectById,
  updateMemberRole,
  deleteMember,
} from '../controllers/project.controllers.js';
import { validate } from '../middlewares/validator.middlewares.js';
import {
  userChangeCurrentPasswordValidator,
  userForgotPasswordValidator,
  userRegisterValidator,
  userResetForgotPasswordValidator,
} from '../validators/index.js';
import { userLoginValidator } from '../validators/index.js';
import { verifyJWT, validateProjectPermission } from '../middlewares/auth.middlewares.js';
import { createProjectValidator, addMembertoProjectValidator } from '../validators/index.js';
import { AvailableUserRole, UserRolesEnum } from '../utils/constants.js';

const router = Router();
router.use(verifyJWT); // verifying the user is logged in or not

router.route('/').get(getProjects).post(createProjectValidator(), validate, createProject);

router
  .route('/:projectId')
  .get(validateProjectPermission([UserRolesEnum.ADMIN]), getProjectById)
  .put(
    validateProjectPermission([UserRolesEnum.ADMIN]),
    createProjectValidator(),
    validate,
    updateProject,
  )
  .delete(validateProjectPermission([UserRolesEnum.ADMIN]), deleteProject);

router
  .route('/:projectId/members')
  .get(getProjectMembers)
  .post(
    validateProjectPermission([UserRolesEnum.ADMIN]),
    addMembertoProjectValidator(),
    validate,
    addMemberToProject
  );

router
  .route('/:projectId/members/:userId')
  .put(validateProjectPermission([UserRolesEnum.ADMIN]), updateMemberRole)
  .delete(validateProjectPermission([UserRolesEnum.ADMIN]), deleteMember);

export default router;
