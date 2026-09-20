import { Router } from 'express';
import {
  getNotes,
  createNote,
  getNoteById,
  updateNote,
  deleteNote,
} from '../controllers/note.controllers.js';
import { verifyJWT, validateProjectPermission } from '../middlewares/auth.middlewares.js';
import { validate } from '../middlewares/validator.middlewares.js';
import { createNoteValidator, updateNoteValidator } from '../validators/index.js';
import { UserRolesEnum } from '../utils/constants.js';

const router = Router();

router.use(verifyJWT);

// Project note collection routes
router
  .route('/:projectId')
  .get(
    validateProjectPermission([
      UserRolesEnum.ADMIN,
      UserRolesEnum.PROJECT_ADMIN,
      UserRolesEnum.MEMBER,
    ]),
    getNotes
  )
  .post(
    validateProjectPermission([UserRolesEnum.ADMIN]),
    createNoteValidator(),
    validate,
    createNote
  );

// Individual note routes
router
  .route('/:projectId/n/:noteId')
  .get(
    validateProjectPermission([
      UserRolesEnum.ADMIN,
      UserRolesEnum.PROJECT_ADMIN,
      UserRolesEnum.MEMBER,
    ]),
    getNoteById
  )
  .put(
    validateProjectPermission([UserRolesEnum.ADMIN]),
    updateNoteValidator(),
    validate,
    updateNote
  )
  .delete(validateProjectPermission([UserRolesEnum.ADMIN]), deleteNote);

export default router;
