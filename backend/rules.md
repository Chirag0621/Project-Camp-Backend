# Project Camp — Project Rules & Coding Conventions (`rules.md`)

**Version:** 1.0.0  
**Project:** Project Camp (Full-Stack Collaborative Project Management Web Application)  
**Applicability:** Developers, Code Reviewers, and AI Coding Assistants  

---

## Table of Contents
1. [Project Overview](#1-project-overview)
2. [Tech Stack Rules](#2-tech-stack-rules)
3. [Architecture Rules](#3-architecture-rules)
4. [Folder Structure Rules](#4-folder-structure-rules)
5. [Coding Standards](#5-coding-standards)
6. [React Rules (Frontend)](#6-react-rules-frontend)
7. [Backend Rules (Node.js & Express)](#7-backend-rules-nodejs--express)
8. [MongoDB & Database Rules](#8-mongodb--database-rules)
9. [API Design Rules](#9-api-design-rules)
10. [UI/UX Rules](#10-uiux-rules)
11. [Authentication & Security Rules](#11-authentication--security-rules)
12. [Error Handling Rules](#12-error-handling-rules)
13. [Performance Rules](#13-performance-rules)
14. [Testing Rules](#14-testing-rules)
15. [Git & Version Control Rules](#15-git--version-control-rules)
16. [AI Coding Agent Invariants](#16-ai-coding-agent-invariants)

---

## 1. Project Overview

### 1.1 Purpose
Project Camp is a full-stack collaborative project management system designed to help teams organize projects, track tasks with hierarchical subtasks, share project notes, attach task assets, and collaborate with role-based access control (RBAC).

### 1.2 Target Users & Roles
- **Project Administrator (`admin`)**: Project creator or owner. Manages project settings, invites members, assigns/updates roles, creates notes, and has full task/subtask permissions.
- **Project Admin (`project_admin`)**: Operational team manager. Creates, assigns, updates, and deletes tasks and subtasks. Has read-only access to project notes. Cannot modify project metadata or alter member roles.
- **Team Member (`member`)**: Collaborator. Views projects, tasks, subtasks, and notes. Can update task progress and mark subtasks as complete/incomplete.

### 1.3 Core Constraints
- **Multi-Tenant Scoped Roles**: Roles are evaluated *per project* via membership (`ProjectMember`), never globally.
- **No Unsanitized Operations**: Every user input must pass declarative schema validation.
- **Backward Compatibility**: Pre-existing working code, interfaces, routes, and model signatures must remain unbroken.

---

## 2. Tech Stack Rules

All code contributed to this repository must adhere strictly to the following technology choices:

| Layer | Approved Technology | Prohibited / Discouraged Alternatives |
|---|---|---|
| **Frontend Framework** | React 18+ (Functional Components with JSX) | Class components, Angular, Vue |
| **Frontend Language** | JavaScript (`.jsx`, `.js`) | TypeScript (unless explicitly migrated by user) |
| **Styling** | Tailwind CSS | CSS Modules, styled-components, inline style spam |
| **Client Routing** | React Router DOM | Next.js app router (unless specified) |
| **Backend Runtime** | Node.js (ES Modules `import`/`export`) | CommonJS `require()` |
| **Backend Framework** | Express.js 5.x | Fastify, NestJS, Koa |
| **Database** | MongoDB | PostgreSQL, MySQL, SQLite |
| **ODM / Modeling** | Mongoose 8.x | Prisma, TypeORM, raw MongoDB drivers |
| **Authentication** | JWT (JSON Web Tokens: Access + Refresh) | Session-based auth, Passport.js sessions |
| **File Handling** | Multer (disk storage in `./public/images`) | Direct cloud uploads without server validation |
| **Email Service** | Mailgen + Nodemailer (SMTP) | Untemplated raw text emails |

---

## 3. Architecture Rules

The system follows a decoupled client-server architecture with clear domain isolation:

```
[ Frontend Client (React) ] ──(HTTP/REST JSON)──> [ Backend API (Express) ] ──> [ MongoDB Database ]
```

### 3.1 Separation of Concerns
1. **Frontend**: Responsible purely for presentation, client-side routing, user interaction state, form collection, and visual feedback.
2. **Backend**: Responsible for authentication, request validation, business rules, authorization, file storage, email dispatch, and database persistence.
3. **Database**: Responsible for data persistence, indexing, unique constraints, and schema enforcement.

### 3.2 Backend Layering Rules
- **Routes Layer (`routes/`)**: Declares endpoints, attaches authentication, authorization middlewares, and validators. **No database queries in routes.**
- **Middleware Layer (`middlewares/`)**: Intercepts requests for authentication, permission verification, validation results, and file upload handling.
- **Controller Layer (`controllers/`)**: Extracts request parameters, orchestrates domain logic, calls models, and sends standardized `ApiResponse` objects.
- **Model Layer (`models/`)**: Defines Mongoose schemas, indexes, hooks, and instance methods.

---

## 4. Folder Structure Rules

The project structure must remain clean and organized. Files must be placed only in their designated directories:

```text
Project_Management_Web_App/
│
├── frontend/                     # React Frontend Application
│   ├── public/                   # Static public assets (favicons, manifest)
│   ├── src/
│   │   ├── assets/               # Local images, icons, logos
│   │   ├── components/           # Reusable UI components (Buttons, Modals, Inputs)
│   │   ├── context/              # React Context providers (AuthContext, ProjectContext)
│   │   ├── hooks/                # Custom React hooks (useAuth, useFetch)
│   │   ├── pages/                # Page-level route views (Dashboard, Login, ProjectDetail)
│   │   ├── services/             # API client functions (axios/fetch wrappers)
│   │   ├── utils/                # Helper utilities, formatters, constants
│   │   ├── App.jsx               # Root application router setup
│   │   ├── main.jsx              # React DOM mounting entry point
│   │   └── index.css             # Tailwind base styles and directives
│   └── package.json
│
└── Backend/                      # Express Backend Application
    ├── public/
    │   └── images/               # Uploaded task attachments
    ├── mdFiles/                  # Project specifications (PRD, Design, Architecture, Rules)
    ├── src/
    │   ├── controllers/          # Business logic handlers
    │   │   ├── auth.controllers.js
    │   │   ├── project.controllers.js
    │   │   ├── task.controllers.js
    │   │   ├── note.controllers.js
    │   │   └── healthcheck.controller.js
    │   ├── db/                   # MongoDB connection logic
    │   │   └── index.js
    │   ├── middlewares/          # Express middlewares
    │   │   ├── auth.middlewares.js
    │   │   ├── multer.middlewares.js
    │   │   └── validator.middlewares.js
    │   ├── models/               # Mongoose schema models
    │   │   ├── user.models.js
    │   │   ├── project.models.js
    │   │   ├── projectmember.models.js
    │   │   ├── task.model.js
    │   │   ├── subtask.model.js
    │   │   └── note.models.js
    │   ├── routes/               # Express route definitions
    │   │   ├── auth.routes.js
    │   │   ├── project.routes.js
    │   │   ├── task.routes.js
    │   │   ├── note.routes.js
    │   │   └── healthcheckup.routes.js
    │   ├── utils/                # Standardized utilities (ApiError, ApiResponse, Mail)
    │   │   ├── api-error.js
    │   │   ├── api-response.js
    │   │   ├── async-handler.js
    │   │   ├── constants.js
    │   │   └── mail.js
    │   ├── validators/           # express-validator schema rules
    │   │   └── index.js
    │   ├── app.js                # Express app setup and middleware configuration
    │   └── index.js              # Server entry point & DB bootstrap
    ├── .env                      # Environment variables (NEVER COMMIT)
    ├── package.json
    └── README.md
```

---

## 5. Coding Standards

### 5.1 Naming Conventions
- **Files & Directories**:
  - React Components: `PascalCase.jsx` (e.g., `TaskCard.jsx`, `ProjectModal.jsx`).
  - Backend Controllers / Routes / Models: `camelCase.domain.js` (e.g., `task.controllers.js`, `task.routes.js`, `task.model.js`).
  - Directories: `lowercase` or `kebab-case` (e.g., `components`, `middlewares`, `mdFiles`).
- **Variables & Functions**: `camelCase` (e.g., `getUserProjects`, `isTaskCompleted`, `projectId`).
- **React Components**: `PascalCase` (e.g., `ProjectHeader`, `SidebarNavigation`).
- **Constants & Enums**: `UPPER_SNAKE_CASE` (e.g., `UserRolesEnum.ADMIN`, `TaskStatusEnum.TODO`).
- **Database Collections**: `lowercase` plural (e.g., `users`, `projects`, `projectmembers`, `tasks`).

### 5.2 General Code Quality
- **Asynchronous Code**: Always prefer `async`/`await` over raw `.then()/.catch()` promise chains.
- **Early Returns**: Check prerequisites and return early (guard clauses) to avoid deep nesting.
- **No Magic Strings**: Use centralized constants from `constants.js` for roles, statuses, and events.
- **DRY (Don't Repeat Yourself)**: Extract common logic into helper utilities or custom hooks.
- **Maintain JSDoc**: Document complex controller flows and utility parameters where not immediately obvious.

---

## 6. React Rules (Frontend)

1. **Functional Components Only**: Class components are strictly prohibited.
2. **JSX, Not TypeScript**: Use plain `.jsx` files. Do not use `.tsx` or TypeScript syntax unless the repository is migrated by user request.
3. **Strict Hook Usage**:
   - Only call hooks at the top level of components.
   - Always declare full dependency arrays in `useEffect`, `useMemo`, and `useCallback`.
   - Never write infinite loops inside `useEffect`.
4. **No Direct DOM Manipulation**:
   - Never use `document.getElementById` or `document.querySelector`.
   - Use React `ref` (`useRef`) when imperative DOM access (e.g. focusing an input) is required.
5. **Component Granularity**:
   - Keep page-level components in `src/pages/` focused on orchestration, data fetching, and state passing.
   - Keep presentational components in `src/components/` modular, pure, and reusable.
6. **State Management**:
   - Local state: `useState` for component-local concerns.
   - Global state: React Context (`useContext`) for authenticated user state, active project state, and global alerts.
   - Avoid prop drilling deeper than 2-3 levels.

---

## 7. Backend Rules (Node.js & Express)

1. **Async Controller Wrapping**:
   - Every async controller MUST be wrapped in `asyncHandler` to ensure uncaught exceptions are safely forwarded to the Express error pipeline.
2. **Standardized Response Envelope**:
   - Never use `res.send("raw string")` or `res.json({ someRandomKey: ... })`.
   - Always return `ApiResponse`:
     ```javascript
     return res.status(200).json(new ApiResponse(200, data, "Action completed successfully"));
     ```
3. **Structured Errors**:
   - Never throw raw strings or generic `new Error()`.
   - Always throw `ApiError`:
     ```javascript
     throw new ApiError(404, "Project not found");
     ```
4. **No Direct Secret Exposure**:
   - Always strip password hashes, refresh tokens, and email verification tokens before returning user objects:
     ```javascript
     .select("-password -refreshToken -emailVerificationToken -emailVerificationExpiry")
     ```
5. **No Route-Level Logic**:
   - Routes files should strictly define path matching, attach middlewares (`verifyJWT`, `validateProjectPermission`), attach validation (`createTaskValidator`, `validate`), and point to controller functions.

---

## 8. MongoDB & Database Rules

1. **Explicit Schema Definitions**: Every document model must have a strictly typed Mongoose Schema with `timestamps: true`.
2. **Validation at Model Layer**:
   - Use `required: [true, "Field name is required"]`.
   - Use `trim: true` on strings and `lowercase: true` on usernames and emails.
   - Use `enum` validation tied to `constants.js` (e.g. `AvailableUserRole`, `AvailableTaskStatus`).
3. **Indexing Strategy**:
   - Add `unique: true` and `index: true` for unique identifiers (`username`, `email`, `project.name`).
   - Use compound indexes for relational lookups (e.g., `{ project: 1, user: 1 }` on `ProjectMember`).
4. **Cascading Operations**:
   - Deleting a `Project` must clean up its associated `ProjectMember`, `Task`, `Subtask`, and `ProjectNote` documents.
   - Deleting a `Task` must clean up its associated `Subtask` documents.
5. **Data Population & Projections**:
   - Never populate unbounded arrays.
   - Always specify projections to limit fetched fields (e.g., `.populate("assignedTo", "avatar username fullName")`).

---

## 9. API Design Rules

### 9.1 Resource Naming & URI Conventions
- All endpoints must be versioned under `/api/v1/`.
- Use plural nouns for resources (e.g., `/projects`, `/tasks`, `/notes`).
- Use nested hierarchical identifiers for sub-resources:
  - `/api/v1/tasks/:projectId` (Project's task collection)
  - `/api/v1/tasks/:projectId/t/:taskId` (Specific task)
  - `/api/v1/tasks/:projectId/t/:taskId/subtasks` (Subtasks on task)
  - `/api/v1/tasks/:projectId/st/:subTaskId` (Specific subtask)
  - `/api/v1/notes/:projectId/n/:noteId` (Specific note)

### 9.2 Standard HTTP Methods & Status Codes
| Verb | Usage | Success Status | Client Error Status |
|---|---|:---:|:---:|
| `GET` | Retrieve resource(s) | `200 OK` | `400`, `401`, `403`, `404` |
| `POST` | Create a new resource / Action | `201 Created` / `200 OK` | `400`, `409 Conflict`, `422 Unprocessable` |
| `PUT` | Full/Partial update of a resource | `200 OK` | `400`, `403`, `404`, `422` |
| `DELETE` | Remove a resource | `200 OK` | `400`, `403`, `404` |

### 9.3 Standard Response Contract
```json
{
  "statusCode": 200,
  "data": { ... },
  "message": "Resource fetched successfully",
  "success": true
}
```

### 9.4 Standard Error Contract
```json
{
  "statusCode": 422,
  "data": null,
  "message": "Received data is not valid",
  "success": false,
  "errors": [
    { "title": "Title is required" }
  ]
}
```

---

## 10. UI/UX Rules

1. **Consistent Visual Rhythm**: Use Tailwind standard spacing units (`p-4`, `p-6`, `gap-4`, `gap-6`).
2. **Responsive First**: Design layouts to adapt gracefully from mobile screens (`<640px`) through desktop monitors (`>=1024px`).
3. **Mandatory UI States**:
   - **Loading State**: Show skeleton loaders or spinner states during network requests. Never leave UI unresponsive.
   - **Empty State**: Show descriptive icons and action buttons when lists (projects, tasks, notes) contain no records.
   - **Error State**: Display inline validation alerts or toast notifications explaining the exact error and recovery action.
4. **Destructive Actions**: Always display a confirmation modal or confirmation dialog before deleting projects, tasks, notes, or removing members.
5. **Accessibility (a11y)**:
   - Provide `aria-label` or accessible names for icon-only buttons.
   - Ensure color contrast ratios meet WCAG AA standards.
   - Ensure all interactive elements are focusable via keyboard tab navigation.

---

## 11. Authentication & Security Rules

1. **Secret Protection**:
   - NEVER commit `.env` files or hardcode API keys, JWT secrets, or database URLs.
   - Ensure `.env` is listed in `.gitignore`.
2. **Password Security**:
   - Passwords must be hashed using `bcrypt` with salt rounds >= 10.
   - Never store plain text passwords.
   - Hash passwords inside Mongoose pre-save middleware only when the password field is modified.
3. **Cookie Security**:
   - JWT tokens stored in cookies must set:
     - `httpOnly: true` (prevents JavaScript access & XSS token theft).
     - `secure: process.env.NODE_ENV === "production"` (HTTPS only in production).
4. **Temporary Token Hashing**:
   - Verification and password reset tokens sent via email must be stored in the database ONLY as SHA-256 hashes, with strict expiration timestamps (max 20 minutes).
5. **File Upload Hardening**:
   - Enforce file size limits (max 1 MB per attachment).
   - Sanitize original file names to prevent directory traversal attacks.
   - Restrict uploads to authorized project members.

---

## 12. Error Handling Rules

1. **No Silent Failures**: Never write empty `catch (e) {}` blocks. Always log or propagate exceptions.
2. **Centralized Error Middleware**: Express errors must funnel into the global error handler in `app.js`.
3. **User-Friendly Error Messages**:
   - Frontend must never show raw JSON error dumps, stack traces, or "TypeError: undefined".
   - Display clear, helpful messages (e.g., "The email you entered is already in use").
4. **Validation Error Extraction**:
   - `express-validator` errors must be formatted into an array of `{ [field]: message }` objects with status code `422`.

---

## 13. Performance Rules

1. **Database Query Efficiency**:
   - Avoid N+1 query problems. Use `populate()` or MongoDB `$lookup` aggregations.
   - Use `.lean()` or specific field projections when only read-only data is needed.
2. **Frontend Render Optimization**:
   - Use unique, stable keys for mapped lists (e.g. `task._id`, never array index).
   - Avoid creating new object/array literals inside JSX props where avoidable.
3. **Static Media Caching**:
   - Ensure images in `public/images/` are served with caching headers.
4. **Pagination**:
   - Large collections (tasks, activities) should implement pagination (`limit` and `page` query params).

---

## 14. Testing Rules

1. **Coverage Requirements**:
   - All critical authentication flows (register, login, token refresh, password reset).
   - Project RBAC boundaries (verifying that non-admins cannot mutate project settings or notes).
   - Task & subtask status lifecycle.
2. **Smoke Testing**:
   - Run integration checks against `/api/v1/healthcheck` to ensure server readiness.
   - Verify unauthenticated requests to protected endpoints return `401 Unauthorized`.
3. **No Test Pollution**: Test scripts in `scratch/` must clean up created database records or use mock environments.

---

## 15. Git & Version Control Rules

1. **Branching Strategy**:
   - Never commit experimental or unfinished features directly to `main`.
   - Use descriptive feature branches: `feature/task-attachments`, `fix/login-cookie-expiry`.
2. **Commit Message Format**:
   Follow the Conventional Commits specification:
   - `feat: <description>` — A new feature
   - `fix: <description>` — A bug fix
   - `docs: <description>` — Documentation only changes
   - `refactor: <description>` — Code changes that neither fix a bug nor add a feature
   - `test: <description>` — Adding or correcting tests
   - `chore: <description>` — Maintenance tasks, dependency updates
3. **Strict Ignore Rules**:
   Ensure `.gitignore` always includes:
   ```text
   node_modules/
   .env
   .env.local
   public/images/*
   !public/images/.gitkeep
   dist/
   build/
   *.log
   ```

---

## 16. AI Coding Agent Invariants

When an AI coding assistant (like Antigravity / Claude / Copilot) is working on this repository, it MUST adhere to these non-negotiable rules:

1. **Read Before Writing**: Inspect existing models, routes, and controllers before creating or modifying code.
2. **Preserve Existing Working Code**: Never delete, rewrite, or alter working functionality unless explicitly requested by the user.
3. **No Unsolicited Libraries**: Do NOT introduce new npm dependencies (e.g., Redux, Prisma, Axios, Tailwind plugins) without explicit user authorization.
4. **Follow Architecture Patterns**:
   - All new routes go into `src/routes/`.
   - All business logic goes into `src/controllers/`.
   - All schemas go into `src/models/`.
   - All request rules go into `src/validators/`.
5. **No Broken Syntax or Missing Exports**: Always verify ES Module export/import syntax (`export { foo as bar }`, not object literal colon syntax).
6. **Protect Credentials**: Never output or commit `.env` credentials, API tokens, or secrets.
7. **Verification Is Mandatory**: After modifying code, run syntax checks or endpoint tests to prove correctness.
