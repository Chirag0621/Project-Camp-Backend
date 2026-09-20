# Project Memory

## Project
- **Project Name**: Project Camp (Project Camp Backend & Web App)
- **Project Purpose**: A secure, collaborative RESTful project management system designed for distributed teams to organize projects, manage tasks and hierarchical subtasks with role-based permissions, maintain project notes, handle multiple file attachments, and coordinate workflows.
- **Current Development Status**: Backend API v1.0.0 is fully implemented, verified (20/20 route integration tests passing), and documented. Frontend UI wiring and component integration are in active development.

---

## Tech Stack
- **Frontend**: React 18+ (JSX), React Router DOM, Context API
- **Styling**: Tailwind CSS
- **Backend Runtime**: Node.js (ES Modules syntax: `import`/`export`)
- **Backend Framework**: Express.js 5.x
- **Database**: MongoDB via Mongoose 8.x ODM
- **Authentication**: JWT (JSON Web Tokens: Access + Refresh tokens)
- **Password & Token Security**: bcrypt for password hashing, Node.js `crypto` for temporary SHA-256 tokens
- **File Management**: Multer (disk storage in `public/images/`)
- **Email Service**: Mailgen + Nodemailer (SMTP / Mailtrap)

---

## Important Decisions
- **Why MongoDB was chosen**: Provides dynamic schema flexibility for evolving task attachments, embedded metadata, fast reads on hierarchical subtask/note structures, and rich aggregation pipelines for project member counting and population.
- **Authentication approach**: Dual-token JWT architecture. Short-lived Access Tokens for stateless authorization headers/cookies, paired with long-lived Refresh Tokens stored securely in `HttpOnly`, `SameSite` cookies. Email verification and password resets utilize temporary unhashed tokens sent via email and verified against database-stored SHA-256 hashes with strict 20-minute expiration.
- **State management approach**: Lightweight React Context API for global session and active project state, combined with localized component state (`useState`) to avoid unnecessary third-party state managers like Redux.
- **API structure**: RESTful endpoints organized under `/api/v1/` by domain (`/auth`, `/projects`, `/tasks`, `/notes`, `/healthcheck`). Enforces standard response envelopes (`ApiResponse`) and structured error envelopes (`ApiError`).
- **Important architectural decisions**:
  - **Scoped Multi-Tenant RBAC**: Permissions are evaluated per-project through the `ProjectMember` junction collection (`Admin`, `Project Admin`, `Member`), avoiding global permission coupling.
  - **Cascading Integrity**: Task deletion triggers automatic cascading purge of all child subtasks (`Subtask.deleteMany({ task: taskId })`).
  - **Backward Compatibility Guarantee**: Strict policy to never break pre-existing code, preserved alias exports (`createSubTask` / `createSubTasks`, `deleteTask` / `deleteTasks`, `upload` / `uplaod`).

---

## Current Features
- **Authentication & Authorization**:
  - Registration with cryptographic email verification.
  - Login with JWT access and refresh token issuance.
  - Current user inspection (`GET` and `POST` at `/api/v1/auth/current-user`).
  - Password change, forgot password, and token-based password reset.
  - Token refresh and secure cookie clearing on logout.
- **Project Management & Dashboard**:
  - Project creation with automatic `Admin` role assignment to creator.
  - Project listing with real-time member count aggregations.
  - Project details, updates, and deletion (Admin only).
- **Team Member Management**:
  - Add members by email with specified role.
  - List all project members with profile details.
  - Update member roles (Admin only).
  - Remove members from projects (Admin only).
- **Task Management**:
  - Create tasks with title, description, assignee, status, and creator.
  - Multi-file attachment uploads with metadata tracking (`url`, `mimeType`, `size`).
  - List project tasks populated with user profiles.
  - Task detail retrieval including child subtasks.
  - Update task details, status (`todo`, `in_progress`, `done`), and assignees.
  - Delete tasks with automatic subtask cleanup.
- **Subtask Management**:
  - Create subtasks linked to parent tasks.
  - Role-based subtask updates (Members can toggle `isCompleted`; Admins/Project Admins can update title and completion).
  - Delete subtasks (Admin & Project Admin).
- **Project Notes**:
  - Create, update, and delete rich notes (Admin only).
  - View all notes within a project (Admin, Project Admin, Member).
- **System Health Monitoring**:
  - Uptime monitoring probe at `/api/v1/healthcheck`.

---

## Completed Work
- ✅ User authentication endpoints implemented and verified (`register`, `login`, `logout`, `current-user`, `refresh-token`, `verify-email`, `change-password`, `forgot-password`, `reset-password`).
- ✅ Project CRUD and membership management endpoints implemented and verified.
- ✅ Task and subtask controllers, routes, and validation layer created and mounted.
- ✅ Project note controllers, routes, and validation layer created and mounted.
- ✅ File attachment directory created (`public/images/`) and Multer middleware configured.
- ✅ Centralized Express error-handling middleware registered in `app.js`.
- ✅ Healthcheck controller bug fix (`req.status` -> `res.status`).
- ✅ 20/20 automated endpoint tests successfully executed and passing.
- ✅ Documentation suite created (`PRD.md`, `design.md`, `architecture.md`, `rules.md`).

---

## Current Work
- 🔄 Frontend UI assembly and connecting React components to `/api/v1/` endpoints.
- 🔄 Implementing task assignment dropdowns with live project member fetching.
- 🔄 Building project creation modal and task creation form with file upload support.

---

## Known Issues
- **Issue 1 (Email Service in Local Dev)**: Email verification and password reset flows require active SMTP credentials in `.env` (configured for Mailtrap sandbox); missing or invalid credentials will cause email dispatch errors.
- **Issue 2 (Local Attachment Storage)**: Task attachments are saved to local filesystem (`public/images/`). Scaled multi-container production environments will require cloud storage (e.g. S3 / Cloudinary) or persistent volume mounts.

---

## Important Constraints
- **Use JSX, not TypeScript**: Keep all frontend files as pure React `.jsx`.
- **Follow Existing Folder Structure**: Maintain the modular separation in `src/` (`controllers/`, `routes/`, `models/`, `middlewares/`, `validators/`, `utils/`, `db/`).
- **Do Not Introduce Unnecessary Dependencies**: Keep the project dependencies lean. Do not introduce heavy state libraries (Redux) or ORMs without explicit user request.
- **Preserve Pre-existing Code**: Never delete or rewrite working code unless explicitly requested by the user.

---

## Important Conventions
- **Naming Conventions**:
  - Backend files: `camelCase.type.js` (e.g., `task.controllers.js`, `task.model.js`).
  - React components: `PascalCase.jsx` (e.g., `TaskCard.jsx`, `ProjectHeader.jsx`).
  - Variables & functions: `camelCase` (e.g., `createTask`, `projectId`).
  - Constants & Enums: `UPPER_SNAKE_CASE` (e.g., `UserRolesEnum.ADMIN`, `TaskStatusEnum.TODO`).
- **API Response Format**:
  - Success: `{ statusCode: 200, data: { ... }, message: "...", success: true }`.
  - Error: `{ statusCode: 400, data: null, message: "...", success: false, errors: [...] }`.
- **Component Patterns**:
  - Presentational UI components in `src/components/`.
  - Page-level route views in `src/pages/`.
  - Custom data fetching hooks in `src/hooks/`.
  - API call abstractions in `src/services/`.

---

## Future Plans
- **Real-Time Notifications**: Live updates for task status changes and comments using Socket.io.
- **Cloud File Storage**: Direct or pre-signed uploads to AWS S3 or Cloudinary.
- **Analytics & Reporting**: Project burn-down charts, task completion metrics, and team velocity dashboards.
- **Audit Logging**: Historical activity timeline tracking project events (task edits, member joins, note creations).
