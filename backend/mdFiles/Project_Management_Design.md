# Project Camp Backend — Design Document

**Version:** 1.0.0  
**Product Type:** RESTful Backend API for Project Management  
**Base API Path:** `/api/v1`

---

## 1. Design Overview

Project Camp is a secure, role-based project management backend that allows users to:

- Create and manage projects.
- Add team members to projects.
- Assign project-level roles.
- Create, assign, update, and track tasks.
- Organize tasks using subtasks.
- Add project notes.
- Upload multiple files to tasks.
- Authenticate users using JWT access and refresh tokens.
- Verify email addresses.
- Reset forgotten passwords.
- Enforce permissions through role-based middleware.
- Monitor API health.

The backend follows a modular REST API architecture using controllers, services, models, middleware, routes, and utilities.

---

# 2. Design Goals

The system should be designed around the following goals:

1. **Security** — Authentication, authorization, validation, secure password handling, and protected file uploads.
2. **Modularity** — Each domain should be independently organized.
3. **Scalability** — The structure should allow new modules and features to be added without major refactoring.
4. **Maintainability** — Business logic should not be tightly coupled to route definitions.
5. **Clear Authorization** — Permissions should be explicit for Admin, Project Admin, and Member.
6. **Consistent API Responses** — All endpoints should follow a predictable response structure.
7. **Reliable Error Handling** — Errors should be centralized and easy to debug.
8. **Clean Data Relationships** — Users, projects, members, tasks, subtasks, notes, and attachments should have clear relationships.

---

# 3. High-Level Architecture

```text
                    ┌─────────────────────┐
                    │      Client         │
                    │ React / Web App     │
                    └──────────┬──────────┘
                               │
                               │ HTTP / HTTPS
                               ▼
                    ┌─────────────────────┐
                    │     Express App     │
                    │       Server        │
                    └──────────┬──────────┘
                               │
             ┌─────────────────┼─────────────────┐
             │                 │                 │
             ▼                 ▼                 ▼
      ┌────────────┐    ┌────────────┐    ┌────────────┐
      │ Middleware │    │   Routes   │    │   Config   │
      └─────┬──────┘    └─────┬──────┘    └────────────┘
            │                  │
            │                  ▼
            │           ┌──────────────┐
            │           │ Controllers  │
            │           └──────┬───────┘
            │                  │
            │                  ▼
            │           ┌──────────────┐
            │           │   Services   │
            │           └──────┬───────┘
            │                  │
            │                  ▼
            │           ┌──────────────┐
            │           │   Models     │
            │           └──────┬───────┘
            │                  │
            ▼                  ▼
      ┌────────────┐     ┌──────────────┐
      │  Security  │     │   MongoDB    │
      │ Validation │     │   Database   │
      └────────────┘     └──────────────┘

                    ┌──────────────────┐
                    │ Email Service    │
                    │ Verification /   │
                    │ Password Reset   │
                    └──────────────────┘

                    ┌──────────────────┐
                    │ File Storage     │
                    │ public/images    │
                    └──────────────────┘
```

---

# 4. Recommended Technology Stack

| Layer | Technology |
|---|---|
| Runtime | Node.js |
| Framework | Express.js |
| Language | JavaScript / ESM |
| Database | MongoDB |
| ODM | Mongoose |
| Authentication | JWT |
| Password Hashing | bcrypt |
| Token Security | Node.js `crypto` |
| File Upload | Multer |
| Validation | Request validation middleware |
| Email | SMTP-compatible email service |
| API Testing | Postman |
| Database Hosting | MongoDB Atlas |
| Deployment | Render / Railway / VPS |
| Client | React |

---

# 5. Project Folder Structure

```text
project-camp-backend/
│
├── public/
│   └── images/
│
├── src/
│   │
│   ├── controllers/
│   │   ├── auth.controller.js
│   │   ├── project.controller.js
│   │   ├── task.controller.js
│   │   ├── subtask.controller.js
│   │   ├── note.controller.js
│   │   └── healthcheck.controller.js
│   │
│   ├── models/
│   │   ├── user.model.js
│   │   ├── project.model.js
│   │   ├── task.model.js
│   │   ├── subtask.model.js
│   │   └── note.model.js
│   │
│   ├── routes/
│   │   ├── auth.routes.js
│   │   ├── project.routes.js
│   │   ├── task.routes.js
│   │   ├── note.routes.js
│   │   └── healthcheck.routes.js
│   │
│   ├── middlewares/
│   │   ├── auth.middleware.js
│   │   ├── role.middleware.js
│   │   ├── project.middleware.js
│   │   ├── validation.middleware.js
│   │   ├── multer.middleware.js
│   │   └── error.middleware.js
│   │
│   ├── services/
│   │   ├── auth.service.js
│   │   ├── email.service.js
│   │   ├── project.service.js
│   │   ├── task.service.js
│   │   ├── note.service.js
│   │   └── file.service.js
│   │
│   ├── validators/
│   │   ├── auth.validator.js
│   │   ├── project.validator.js
│   │   ├── task.validator.js
│   │   └── note.validator.js
│   │
│   ├── utils/
│   │   ├── api-error.js
│   │   ├── api-response.js
│   │   ├── async-handler.js
│   │   ├── token.js
│   │   └── constants.js
│   │
│   ├── db/
│   │   └── database.js
│   │
│   ├── app.js
│   └── index.js
│
├── .env
├── .env.example
├── .gitignore
├── package.json
└── README.md
```

---

# 6. Request Lifecycle

Every protected API request should follow this flow:

```text
Client
  │
  ▼
Express Router
  │
  ▼
Authentication Middleware
  │
  ├── Invalid token ──► 401 Unauthorized
  │
  ▼
Project/Role Authorization
  │
  ├── Insufficient permission ──► 403 Forbidden
  │
  ▼
Request Validation
  │
  ├── Invalid data ──► 400 Bad Request
  │
  ▼
Controller
  │
  ▼
Service Layer
  │
  ▼
Mongoose Model
  │
  ▼
MongoDB
  │
  ▼
Service
  │
  ▼
Controller
  │
  ▼
Standard API Response
```

---

# 7. Authentication Design

## 7.1 Authentication Strategy

Project Camp uses:

- Short-lived JWT access token.
- Long-lived refresh token.
- Hashed passwords.
- Email verification token.
- Password reset token.

Recommended token flow:

```text
Login
  │
  ▼
Validate email/password
  │
  ▼
Generate access token
  │
  ▼
Generate refresh token
  │
  ▼
Store refresh-token information
  │
  ▼
Return authentication response
```

## 7.2 Access Token

The access token should contain only the information required for authorization.

Example payload:

```json
{
  "sub": "userId",
  "role": "member",
  "iat": 1234567890,
  "exp": 1234569999
}
```

The access token should have a relatively short expiration time.

## 7.3 Refresh Token

Refresh tokens are used to obtain new access tokens without forcing the user to log in again.

Recommended design:

```text
Access Token
Short lifetime
        │
        ▼
Expires
        │
        ▼
Client sends Refresh Token
        │
        ▼
Validate Refresh Token
        │
        ▼
Issue New Access Token
```

Refresh-token secrets or token hashes should not be stored in plain text where avoidable.

---

# 8. User Registration Flow

```text
POST /api/v1/auth/register
            │
            ▼
Validate request
            │
            ▼
Check existing email
            │
            ▼
Hash password
            │
            ▼
Create user
            │
            ▼
Generate email verification token
            │
            ▼
Send verification email
            │
            ▼
Return success response
```

New users should initially have:

```text
isEmailVerified = false
```

Users should not receive full application access until email verification requirements are satisfied.

---

# 9. Email Verification Design

```text
User clicks verification link
             │
             ▼
GET /auth/verify-email/:verificationToken
             │
             ▼
Validate token
             │
             ▼
Check expiration
             │
             ▼
Mark user as verified
             │
             ▼
Invalidate verification token
             │
             ▼
Return success
```

Verification tokens should be generated using a cryptographically secure random generator.

---

# 10. Password Reset Design

```text
Forgot Password
      │
      ▼
Enter Email
      │
      ▼
Generate secure reset token
      │
      ▼
Store hashed token + expiry
      │
      ▼
Send reset email
      │
      ▼
User opens reset link
      │
      ▼
Validate token
      │
      ▼
Hash new password
      │
      ▼
Update password
      │
      ▼
Invalidate reset token
```

The API should avoid revealing whether an email address exists during password-reset requests.

---

# 11. Role-Based Authorization

Project Camp has three roles:

```text
ADMIN
  │
  ├── Full system access
  │
  └── Project-level control

PROJECT_ADMIN
  │
  └── Administrative control inside assigned projects

MEMBER
  │
  └── Basic project access
```

## 11.1 Global Admin

The Admin can:

- Create projects.
- Update projects.
- Delete projects.
- Manage project members.
- Change member roles.
- Create/update/delete tasks.
- Create/delete subtasks.
- Create/update/delete notes.
- View project data.

## 11.2 Project Admin

The Project Admin can:

- View assigned projects.
- View project members.
- Create tasks.
- Update tasks.
- Delete tasks.
- Create subtasks.
- Update subtasks.
- Delete subtasks.
- View and update subtask completion.
- View project notes.

Project Admin cannot:

- Delete projects.
- Change project membership.
- Change member roles.
- Create/update/delete project notes.

## 11.3 Member

Members can:

- View accessible projects.
- View tasks.
- View task details.
- Update subtask completion status.
- View project notes.

Members cannot:

- Create tasks.
- Delete tasks.
- Create/delete subtasks.
- Manage members.
- Manage projects.
- Manage notes.

---

# 12. Permission Architecture

Authorization should happen at two levels:

## Level 1 — Authentication

```text
Is the user logged in?
       │
       ├── No → 401
       │
       └── Yes
```

## Level 2 — Authorization

```text
Does the user have permission?
       │
       ├── No → 403
       │
       └── Yes → Continue
```

For project resources, the system should additionally verify that the authenticated user belongs to the requested project.

---

# 13. Project Design

## 13.1 Project Lifecycle

```text
Create Project
      │
      ▼
Add Members
      │
      ▼
Assign Roles
      │
      ▼
Create Tasks
      │
      ▼
Manage Tasks/Subtasks
      │
      ▼
Add Notes
      │
      ▼
Update Project
      │
      ▼
Delete Project
```

## 13.2 Project Data Model

Suggested structure:

```text
Project
├── _id
├── name
├── description
├── owner
├── members[]
│   ├── user
│   └── role
├── createdAt
└── updatedAt
```

A project member entry should reference a User rather than duplicating user information.

---

# 14. Project Membership Design

Recommended membership structure:

```text
Project
  │
  ├── User A → project_admin
  ├── User B → member
  └── User C → member
```

When adding a member:

```text
POST /projects/:projectId/members
             │
             ▼
Authenticate
             │
             ▼
Verify Admin permission
             │
             ▼
Find user by email
             │
             ▼
Check duplicate membership
             │
             ▼
Add user to project
             │
             ▼
Return updated membership
```

---

# 15. Task Design

## 15.1 Task Data Model

Suggested structure:

```text
Task
├── _id
├── project
├── title
├── description
├── assignee
├── status
├── attachments[]
│   ├── url
│   ├── mimeType
│   └── size
├── createdBy
├── createdAt
└── updatedAt
```

## 15.2 Task Status

```text
TODO
IN_PROGRESS
DONE
```

Status transitions:

```text
TODO
 │
 └──► IN_PROGRESS
          │
          └──► DONE
```

The API should validate that submitted status values belong to the supported status set.

---

# 16. Task Assignment

Only valid project members should be assignable to project tasks.

```text
Create/Update Task
       │
       ▼
Validate assignee
       │
       ▼
Is user a project member?
       │
   ┌───┴───┐
   │       │
  No      Yes
   │       │
  400      ▼
       Assign Task
```

This prevents tasks from being assigned to unrelated users.

---

# 17. Subtask Design

Subtasks belong to a specific task.

```text
Project
   │
   └── Task
        │
        ├── Subtask 1
        ├── Subtask 2
        └── Subtask 3
```

Suggested data model:

```text
Subtask
├── _id
├── task
├── project
├── title
├── description
├── isCompleted
├── createdBy
├── createdAt
└── updatedAt
```

## 17.1 Subtask Permissions

| Action | Admin | Project Admin | Member |
|---|---:|---:|---:|
| Create | ✓ | ✓ | ✗ |
| Update details | ✓ | ✓ | ✗ |
| Mark complete | ✓ | ✓ | ✓ |
| Delete | ✓ | ✓ | ✗ |

Members should be restricted to completion-status updates rather than arbitrary subtask modification.

---

# 18. Notes Design

Notes are project-level resources.

Suggested model:

```text
Note
├── _id
├── project
├── title
├── content
├── createdBy
├── createdAt
└── updatedAt
```

Permissions:

```text
Admin
  ├── Create
  ├── Read
  ├── Update
  └── Delete

Project Admin
  └── Read

Member
  └── Read
```

---

# 19. File Attachment Design

Tasks can contain multiple attachments.

## 19.1 Upload Flow

```text
Client
  │
  ▼
multipart/form-data
  │
  ▼
Multer Middleware
  │
  ├── Validate file type
  ├── Validate file size
  └── Validate number of files
  │
  ▼
Store File
  │
  ▼
Create Attachment Metadata
  │
  ▼
Attach Metadata to Task
  │
  ▼
Return Task
```

## 19.2 Attachment Metadata

Each attachment should contain:

```json
{
  "url": "/images/example.pdf",
  "mimeType": "application/pdf",
  "size": 102400
}
```

## 19.3 File Security

The upload layer should:

- Restrict allowed MIME types.
- Limit file size.
- Limit number of files.
- Generate safe filenames.
- Prevent path traversal.
- Avoid trusting the original filename.
- Reject malformed uploads.
- Keep upload logic separate from business logic.

---

# 20. API Design

All endpoints should use:

```text
/api/v1
```

Example:

```text
/api/v1/auth/login
/api/v1/projects
/api/v1/tasks/:projectId
/api/v1/notes/:projectId
```

---

# 21. Authentication API Design

## Register

```http
POST /api/v1/auth/register
```

Request:

```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "StrongPassword123"
}
```

## Login

```http
POST /api/v1/auth/login
```

## Logout

```http
POST /api/v1/auth/logout
Authorization: Bearer <access-token>
```

## Current User

```http
GET /api/v1/auth/current-user
Authorization: Bearer <access-token>
```

## Change Password

```http
POST /api/v1/auth/change-password
Authorization: Bearer <access-token>
```

## Refresh Token

```http
POST /api/v1/auth/refresh-token
```

## Verify Email

```http
GET /api/v1/auth/verify-email/:verificationToken
```

## Forgot Password

```http
POST /api/v1/auth/forgot-password
```

## Reset Password

```http
POST /api/v1/auth/reset-password/:resetToken
```

## Resend Verification

```http
POST /api/v1/auth/resend-email-verification
Authorization: Bearer <access-token>
```

---

# 22. Project API Design

## List Projects

```http
GET /api/v1/projects
Authorization: Bearer <access-token>
```

Returns projects accessible to the authenticated user.

## Create Project

```http
POST /api/v1/projects
Authorization: Bearer <access-token>
```

## Get Project

```http
GET /api/v1/projects/:projectId
Authorization: Bearer <access-token>
```

## Update Project

```http
PUT /api/v1/projects/:projectId
Authorization: Bearer <access-token>
```

Admin only.

## Delete Project

```http
DELETE /api/v1/projects/:projectId
Authorization: Bearer <access-token>
```

Admin only.

---

# 23. Project Member API Design

## List Members

```http
GET /api/v1/projects/:projectId/members
```

## Add Member

```http
POST /api/v1/projects/:projectId/members
```

Admin only.

## Update Member Role

```http
PUT /api/v1/projects/:projectId/members/:userId
```

Admin only.

## Remove Member

```http
DELETE /api/v1/projects/:projectId/members/:userId
```

Admin only.

---

# 24. Task API Design

## List Tasks

```http
GET /api/v1/tasks/:projectId
```

## Create Task

```http
POST /api/v1/tasks/:projectId
```

Admin / Project Admin.

## Get Task

```http
GET /api/v1/tasks/:projectId/t/:taskId
```

## Update Task

```http
PUT /api/v1/tasks/:projectId/t/:taskId
```

Admin / Project Admin.

## Delete Task

```http
DELETE /api/v1/tasks/:projectId/t/:taskId
```

Admin / Project Admin.

---

# 25. Subtask API Design

## Create Subtask

```http
POST /api/v1/tasks/:projectId/t/:taskId/subtasks
```

Admin / Project Admin.

## Update Subtask

```http
PUT /api/v1/tasks/:projectId/st/:subTaskId
```

Authorization depends on the requested operation.

## Delete Subtask

```http
DELETE /api/v1/tasks/:projectId/st/:subTaskId
```

Admin / Project Admin.

---

# 26. Notes API Design

## List Notes

```http
GET /api/v1/notes/:projectId
```

## Create Note

```http
POST /api/v1/notes/:projectId
```

Admin only.

## Get Note

```http
GET /api/v1/notes/:projectId/n/:noteId
```

## Update Note

```http
PUT /api/v1/notes/:projectId/n/:noteId
```

Admin only.

## Delete Note

```http
DELETE /api/v1/notes/:projectId/n/:noteId
```

Admin only.

---

# 27. Health Check

```http
GET /api/v1/healthcheck
```

Example response:

```json
{
  "success": true,
  "message": "API is healthy",
  "data": {
    "status": "up"
  }
}
```

The health endpoint should be lightweight and should not require authentication.

---

# 28. Standard API Response Design

A consistent response structure should be used.

## Success

```json
{
  "success": true,
  "message": "Project fetched successfully",
  "data": {}
}
```

## Error

```json
{
  "success": false,
  "message": "You do not have permission to perform this action",
  "errors": []
}
```

Suggested status codes:

| Status | Meaning |
|---|---|
| 200 | Successful request |
| 201 | Resource created |
| 204 | Successful request with no response body |
| 400 | Invalid request |
| 401 | Authentication required/invalid |
| 403 | Permission denied |
| 404 | Resource not found |
| 409 | Conflict |
| 422 | Validation error |
| 500 | Internal server error |

---

# 29. Error Handling Architecture

All asynchronous controllers should pass errors to a centralized error handler.

```text
Controller
    │
    ├── Success ──► API Response
    │
    └── Error
          │
          ▼
   Error Middleware
          │
          ├── Validation Error
          ├── Authentication Error
          ├── Authorization Error
          ├── MongoDB Error
          └── Unknown Error
          │
          ▼
   Standard Error Response
```

Do not expose:

- Passwords.
- JWT secrets.
- Database credentials.
- Internal stack traces in production.
- Sensitive token values.

---

# 30. Database Relationship Design

```text
User
 │
 ├──────────────┐
 │              │
 ▼              ▼
Project      Project Membership
 │
 ├───────────────┐
 │               │
 ▼               ▼
Task            Note
 │
 ▼
Subtask
```

More explicitly:

```text
User
 │
 ├── creates ───────► Project
 │
 ├── belongs to ────► Project
 │
 ├── creates ───────► Task
 │
 ├── assigned to ───► Task
 │
 └── creates ───────► Note

Project
 │
 ├── has many Users
 ├── has many Tasks
 └── has many Notes

Task
 │
 ├── belongs to Project
 ├── has one Assignee
 ├── has many Subtasks
 └── has many Attachments
```

---

# 31. Suggested MongoDB Indexes

Indexes should be added to fields frequently used for lookup.

Potential indexes:

```text
User
- email: unique

Project
- members.user
- owner

Task
- project
- assignee
- status

Subtask
- task
- project

Note
- project
```

The exact indexes should be confirmed using actual query patterns and database performance measurements.

---

# 32. Security Architecture

## Authentication

- Hash passwords using bcrypt.
- Use strong JWT secrets.
- Keep access-token lifetime limited.
- Rotate refresh tokens when appropriate.
- Never log tokens or passwords.

## Authorization

Every protected resource should verify:

```text
Authenticated User
       ↓
Project Membership
       ↓
Project Role
       ↓
Requested Action
```

## Validation

Validate:

- Email.
- Password.
- IDs.
- Project names.
- Task status.
- Member roles.
- File metadata.
- Required fields.
- String lengths.

## CORS

Configure CORS using an allowlist of trusted frontend origins rather than allowing arbitrary origins in production.

---

# 33. Middleware Architecture

Recommended middleware responsibilities:

### `auth.middleware.js`

Responsibilities:

- Read access token.
- Verify JWT.
- Find authenticated user.
- Attach user to request.

Example:

```text
req.user = authenticatedUser
```

### `role.middleware.js`

Responsibilities:

- Check allowed roles.
- Reject unauthorized roles.

### `project.middleware.js`

Responsibilities:

- Verify project exists.
- Verify user belongs to project.
- Determine project-level role.

### `validation.middleware.js`

Responsibilities:

- Validate request body.
- Validate parameters.
- Validate query parameters.

### `multer.middleware.js`

Responsibilities:

- Handle multipart uploads.
- Validate file constraints.

### `error.middleware.js`

Responsibilities:

- Centralize errors.
- Convert internal errors to API responses.
- Hide sensitive production information.

---

# 34. Controller vs Service Responsibilities

Controllers should remain thin.

## Controller

Responsible for:

```text
Request
  ↓
Read input
  ↓
Call service
  ↓
Send response
```

## Service

Responsible for:

```text
Business logic
  ↓
Database operations
  ↓
Permission-sensitive rules
  ↓
External services
```

Example:

```text
project.controller.js
        │
        ▼
project.service.js
        │
        ├── Check project
        ├── Validate member
        ├── Update database
        └── Return result
```

This separation makes the application easier to test and maintain.

---

# 35. Project Creation Flow

```text
POST /projects
       │
       ▼
Authenticate user
       │
       ▼
Validate project data
       │
       ▼
Create Project
       │
       ▼
Set creator as owner/admin
       │
       ▼
Save Project
       │
       ▼
Return Project
```

The project creator should automatically receive the appropriate project-management authority according to the application's role design.

---

# 36. Task Creation Flow

```text
POST /tasks/:projectId
       │
       ▼
Authenticate
       │
       ▼
Verify project
       │
       ▼
Verify Admin/Project Admin
       │
       ▼
Validate task
       │
       ▼
Validate assignee
       │
       ▼
Upload attachments if present
       │
       ▼
Create task
       │
       ▼
Return task
```

---

# 37. Task Completion Flow

```text
Task
 │
 ├── TODO
 │
 ▼
IN_PROGRESS
 │
 ▼
DONE
```

The backend should enforce valid status values rather than trusting the client.

---

# 38. Member Management Flow

```text
Admin
 │
 ▼
Add Member
 │
 ▼
Find User
 │
 ▼
Check Existing Membership
 │
 ▼
Assign Role
 │
 ▼
Save Membership
```

Role update:

```text
Admin
 │
 ▼
Select Member
 │
 ▼
Validate New Role
 │
 ▼
Update Membership
 │
 ▼
Return Updated Member
```

---

# 39. Data Ownership and Access Rules

Every project-scoped resource should be checked against its parent project.

For example:

```text
GET /projects/P1/tasks/T1
```

The backend should verify:

```text
1. P1 exists
2. T1 exists
3. T1 belongs to P1
4. Current user belongs to P1
5. Current user's role allows the operation
```

This prevents insecure direct object references where a user attempts to access another project's resources by changing an ID.

---

# 40. API Security Checklist

Before deployment:

- [ ] Passwords are hashed.
- [ ] JWT secrets are stored in environment variables.
- [ ] Refresh tokens are protected.
- [ ] Email tokens expire.
- [ ] Password reset tokens expire.
- [ ] Authentication is required for protected routes.
- [ ] Project membership is verified.
- [ ] Project roles are verified.
- [ ] Input validation exists.
- [ ] File uploads are restricted.
- [ ] CORS is configured.
- [ ] Sensitive information is not logged.
- [ ] Production errors do not expose stack traces.
- [ ] Environment files are excluded from Git.

---

# 41. Environment Configuration

Example `.env`:

```env
PORT=8000

MONGODB_URI=

ACCESS_TOKEN_SECRET=
ACCESS_TOKEN_EXPIRY=

REFRESH_TOKEN_SECRET=
REFRESH_TOKEN_EXPIRY=

EMAIL_HOST=
EMAIL_PORT=
EMAIL_USER=
EMAIL_PASSWORD=
EMAIL_FROM=

CORS_ORIGIN=
```

Secrets must never be committed to source control.

---

# 42. Testing Strategy

Testing should be divided into:

## Unit Testing

Test individual services/utilities:

- Token generation.
- Password hashing.
- Validation.
- Permission functions.
- Status validation.

## Integration Testing

Test:

- Authentication flow.
- Project creation.
- Member management.
- Task management.
- Subtasks.
- Notes.
- File uploads.

## Authorization Testing

For every protected endpoint test:

```text
Unauthenticated
Admin
Project Admin
Member
Non-member
```

Example:

```text
DELETE /projects/:projectId

Admin        → 200/204
ProjectAdmin → 403
Member       → 403
Non-member   → 403/404
Unauthenticated → 401
```

---

# 43. API Documentation

The API should eventually be documented using OpenAPI/Swagger.

Documentation should include:

- Endpoint.
- HTTP method.
- Authentication requirement.
- Request parameters.
- Request body.
- Response body.
- Error responses.
- Required role.
- Example request.
- Example response.

Example:

```text
POST /api/v1/projects

Authentication: Required
Role: Admin

Body:
{
  "name": "Project Camp",
  "description": "Project management platform"
}
```

---

# 44. Deployment Architecture

```text
                   Internet
                      │
                      ▼
              ┌───────────────┐
              │ React Client  │
              └───────┬───────┘
                      │ HTTPS
                      ▼
              ┌───────────────┐
              │ Express API   │
              │ Node.js       │
              └───────┬───────┘
                      │
          ┌───────────┴───────────┐
          │                       │
          ▼                       ▼
   ┌──────────────┐       ┌──────────────┐
   │ MongoDB Atlas│       │ Email Service│
   └──────────────┘       └──────────────┘
```

For production, uploaded files should preferably move to dedicated object storage rather than relying on local application storage, because local filesystem storage may not be persistent across many hosting environments.

---

# 45. Scalability Considerations

The initial version can use a single Express server.

Future scaling can include:

```text
Load Balancer
      │
 ┌────┼────┐
 ▼    ▼    ▼
API  API   API
 │    │     │
 └────┼─────┘
      ▼
 MongoDB
```

Potential future additions:

- Redis caching.
- Background job queue.
- Dedicated object storage.
- Centralized logging.
- Rate limiting.
- Search.
- Real-time notifications using WebSockets.
- Activity/audit logs.
- Pagination and filtering.
- Email notification queues.

These are not required for Version 1.0.0 unless added to the PRD.

---

# 46. Important Design Decisions

## Decision 1 — Keep Controllers Thin

Business logic should stay in services.

## Decision 2 — Centralize Authorization

Permission checks should be reusable middleware/service functions rather than duplicated in every controller.

## Decision 3 — Validate Project Ownership

Every project-scoped resource must be checked against its project.

## Decision 4 — Validate Task Assignment

Only project members can be assigned project tasks.

## Decision 5 — Separate File Handling

Multer handles upload parsing, while the service layer handles attachment metadata and task association.

## Decision 6 — Standardize Responses

All API endpoints should use a common response/error structure.

---

# 47. Version 1.0.0 Scope

### Included

- [x] User registration.
- [x] Email verification.
- [x] Login.
- [x] Logout.
- [x] JWT authentication.
- [x] Refresh tokens.
- [x] Password change.
- [x] Forgot password.
- [x] Reset password.
- [x] Project creation.
- [x] Project listing.
- [x] Project details.
- [x] Project update.
- [x] Project deletion.
- [x] Project members.
- [x] Project roles.
- [x] Tasks.
- [x] Task assignment.
- [x] Task status.
- [x] Subtasks.
- [x] Project notes.
- [x] File attachments.
- [x] Role-based access control.
- [x] Health check.
- [x] Input validation.
- [x] CORS.
- [x] Centralized error handling.

### Future Scope

- [ ] Real-time notifications.
- [ ] Activity logs.
- [ ] Advanced search.
- [ ] Task comments.
- [ ] Task priority.
- [ ] Due dates and reminders.
- [ ] Calendar integration.
- [ ] Redis caching.
- [ ] Background jobs.
- [ ] Cloud object storage.
- [ ] Analytics dashboard.

---

# 48. Final Architecture Summary

The Project Camp backend should follow this architecture:

```text
Client
  │
  ▼
Routes
  │
  ▼
Middleware
  │
  ├── Authentication
  ├── Authorization
  ├── Validation
  └── File Upload
  │
  ▼
Controllers
  │
  ▼
Services
  │
  ├── Auth Service
  ├── Project Service
  ├── Task Service
  ├── Note Service
  ├── File Service
  └── Email Service
  │
  ▼
Models
  │
  ▼
MongoDB
```

The key security rule for all project resources is:

```text
Authentication
      ↓
Project Membership
      ↓
Project Role
      ↓
Resource Ownership/Relationship
      ↓
Requested Action
```

This design keeps Project Camp modular, secure, and easy to extend while covering the functionality defined in the Product Requirements Document.

---

# 49. Frontend Product Design System

This section defines the visual language for the Project Camp frontend based on the supplied reference screenshot: a minimal, premium SaaS dashboard with soft off-white surfaces, near-black typography, a high-contrast lime accent, large rounded cards, generous spacing, and subtle borders/shadows.

## 49.1 Visual Direction

The interface should feel:

- Modern
- Minimal
- Premium
- Clean
- Spacious
- Professional
- Slightly futuristic
- Productivity-focused

Avoid heavy gradients, excessive shadows, too many colors, cramped cards, thick borders, and overly colorful dashboard components.

The visual system uses **off-white + white + near-black** as the base and **lime** as the main accent.

---

# 50. Color System

Use CSS variables so the complete application theme can be controlled centrally.

```css
:root {
  --color-bg: #F3F5F2;
  --color-surface: #FFFFFF;
  --color-surface-soft: #E8EDE8;

  --color-sidebar: #17191A;
  --color-text: #17191A;
  --color-text-secondary: #646B66;
  --color-text-muted: #8B928D;

  --color-border: #DDE2DD;
  --color-border-dark: #2B2E2D;

  --color-accent: #E8FF3F;
  --color-accent-soft: #F0FF8A;
  --color-accent-dark: #C9DD22;

  --color-success: #B8E86A;
  --color-warning: #FFE56B;
  --color-danger: #FF7A73;
  --color-info: #AFC7FF;

  --color-white: #FFFFFF;
  --color-black: #111313;
}
```

| Color | Purpose |
|---|---|
| `#F3F5F2` | Main application background |
| `#FFFFFF` | Cards, modals, panels |
| `#17191A` | Sidebar, primary buttons, strong text |
| `#E8FF3F` | Primary accent, active states, progress |
| `#E8EDE8` | Secondary surfaces |
| `#DDE2DD` | Borders/dividers |
| `#646B66` | Secondary text |
| `#8B928D` | Muted text |
| `#FF7A73` | Errors/high priority |
| `#FFE56B` | Medium priority/warnings |
| `#B8E86A` | Success/completed state |

Use lime selectively for primary CTA emphasis, active navigation, progress, important statistics, selected tabs, and important badges.

---

# 51. Typography

The reference uses a clean modern geometric sans-serif style.

Recommended:

```css
font-family:
  "Inter",
  "Manrope",
  ui-sans-serif,
  system-ui,
  -apple-system,
  BlinkMacSystemFont,
  "Segoe UI",
  sans-serif;
```

Use **Inter** as the default. Manrope can be used if a more geometric look is preferred.

## Typography Scale

```text
Display / Hero       48–64px   weight 500–600
Page Heading         32–40px   weight 500–600
Section Heading      22–28px   weight 600
Card Heading         16–20px   weight 600
Body                 14–16px   weight 400–500
Small / Metadata     12–13px   weight 400–500
Button               13–15px   weight 500–600
```

Major headings should use tight line-height and generous whitespace.

---

# 52. Spacing System

Use a 4px-based spacing scale:

```text
4px   xs
8px   sm
12px  md
16px  lg
20px  xl
24px  2xl
32px  3xl
40px  4xl
48px  5xl
64px  6xl
```

Recommended:

```text
Page padding:     28–40px
Card padding:     20–28px
Card gap:         16–24px
Section gap:      32–48px
Sidebar padding:  16–20px
Topbar height:    72–80px
```

---

# 53. Border Radius System

The reference design uses strong rounded geometry.

```css
:root {
  --radius-sm: 10px;
  --radius-md: 14px;
  --radius-lg: 18px;
  --radius-xl: 24px;
  --radius-2xl: 30px;
  --radius-pill: 999px;
}
```

| Element | Radius |
|---|---:|
| Small button | 10–12px |
| Input | 10–14px |
| Task card | 14–18px |
| Standard card | 20–24px |
| Dashboard panel | 24–30px |
| Large hero card | 28–32px |
| Status badge | Pill |
| Avatar | Circle |

---

# 54. Borders and Shadows

Use soft separation rather than heavy shadows.

```css
border: 1px solid var(--color-border);

box-shadow:
  0 8px 30px rgba(20, 25, 22, 0.05);
```

For floating elements:

```css
box-shadow:
  0 16px 40px rgba(20, 25, 22, 0.08);
```

Avoid thick dark borders and shadows on every component.

---

# 55. Overall Application Shell

```text
┌──────────────────────────────────────────────────────────────┐
│                       TOP NAVIGATION                         │
├───────────────┬──────────────────────────────────────────────┤
│               │                                              │
│    SIDEBAR    │              MAIN CONTENT                    │
│               │                                              │
│  Dashboard    │                                              │
│  My Tasks     │                                              │
│  Projects     │                                              │
│  Calendar     │                                              │
│  Team         │                                              │
│  Inbox        │                                              │
│               │                                              │
│  WORKSPACES   │                                              │
│  Website      │                                              │
│  Mobile App   │                                              │
│               │                                              │
│  Settings     │                                              │
└───────────────┴──────────────────────────────────────────────┘
```

---

# 56. Sidebar Design

The sidebar should be dark, compact, and visually distinct.

```text
┌───────────────────┐
│ ✦  Project Camp   │
│                   │
│ ◉  Dashboard      │
│ ✓  My Tasks       │
│ ▣  Projects       │
│ ◷  Calendar       │
│ ◎  Team           │
│ ◌  Inbox          │
│                   │
│ WORKSPACES        │
│                   │
│ ● Website         │
│ ● Mobile App      │
│ ● Marketing       │
│                   │
│ ───────────────── │
│                   │
│ ⚙ Settings        │
│                   │
│                 ○ │
└───────────────────┘
```

Rules:

- Background: near-black.
- Text: white/gray.
- Active item: slightly lighter dark surface.
- Active accent: lime.
- Icons: simple line icons.
- Desktop width: approximately 220–260px.
- Collapsible on smaller screens.
- Bottom area can contain the user avatar/profile.

---

# 57. Top Navigation Bar

```text
┌───────────────────────────────────────────────────────────────┐
│ Search anything...               + Create   ○   ?   ◉ User   │
└───────────────────────────────────────────────────────────────┘
```

Contains:

- Global search.
- Create button.
- Notifications.
- Help.
- User profile.
- Workspace switcher where required.

Primary create buttons should use a near-black background, white text, pill radius, and subtle hover movement.

---

# 58. Dashboard Design

The dashboard should follow the reference screenshot's asymmetric card-based composition.

```text
┌──────────────────────────────────────────────────────────────┐
│ Good morning, Chirag                                         │
│ Here's what's happening with your projects.                  │
│                                                              │
│ ┌────────────┐ ┌────────────┐ ┌────────────┐ ┌────────────┐ │
│ │ TASKS      │ │ PROGRESS   │ │ COMPLETED  │ │ OVERDUE    │ │
│ │ 128        │ │ 32         │ │ 84         │ │ 12         │ │
│ └────────────┘ └────────────┘ └────────────┘ └────────────┘ │
│                                                              │
│ ┌──────────────────────────────┐ ┌─────────────────────────┐ │
│ │ Productivity / Statistics   │ │ Quick Actions           │ │
│ │                             │ │                         │ │
│ │       ╭─╮                   │ │ + New Project            │ │
│ │   ╭─╮ │ │ ╭─╮               │ │ + New Task               │ │
│ │ ╭─╮│ │ │ │ │ │               │ │ Invite Member             │ │
│ │ ╰─╯╰─╯ ╰─╯ ╰─╯               │ │                         │ │
│ └──────────────────────────────┘ └─────────────────────────┘ │
│                                                              │
│ Recent Projects                                              │
└──────────────────────────────────────────────────────────────┘
```

Cards should have visual hierarchy instead of all being identical.

---

# 59. Dashboard Cards

Use three main card styles.

## Standard

```text
┌─────────────────────────┐
│ ○ Operations            │
│                         │
│ 780                     │
│ / 1,000                 │
│                         │
│ █ █ █ █ █ ░ ░           │
└─────────────────────────┘
```

## Accent

```text
┌─────────────────────────┐
│ ↔ Data Transfer         │
│                         │
│ 163                     │
│ / 512 MB                │
│                         │
│ █ █ █ █ ░ ░ ░           │
└─────────────────────────┘
```

Use the lime background only for selected/highlight cards.

## Informational

```text
┌─────────────────────────────┐
│ Project Camp                │
│                             │
│ Improve your workflow       │
│ with better organization.   │
│                             │
│        [ Learn More ]       │
└─────────────────────────────┘
```

---

# 60. Projects Page

```text
Projects                              + New Project

┌────────────────────────┐  ┌────────────────────────┐
│ Website Redesign       │  │ Mobile Application     │
│                        │  │                        │
│ ████████░░ 80%         │  │ ██████░░░░ 60%         │
│ 12 tasks remaining     │  │ 24 tasks remaining     │
│                        │  │                        │
│ ○ ○ ○ ○ ○              │  │ ○ ○ ○ ○ ○ ○            │
└────────────────────────┘  └────────────────────────┘
```

Each project card can contain:

- Name
- Description
- Progress
- Members
- Task count
- Status
- Deadline when supported
- Context menu

---

# 61. Project Details

```text
┌──────────────────────────────────────────────────────────────┐
│ Website Redesign                              + Add Task     │
│ Redesign the company's marketing website.                    │
│                                                              │
│ Overview │ Board │ List │ Calendar │ Timeline │ Files       │
├──────────────────────────────────────────────────────────────┤
│                                                              │
│                      PROJECT CONTENT                         │
│                                                              │
└──────────────────────────────────────────────────────────────┘
```

Use lime for the active tab, progress, selected filters, and important actions.

---

# 62. Kanban Board

```text
┌──────────────────┐ ┌──────────────────┐ ┌──────────────────┐
│ TO DO            │ │ IN PROGRESS      │ │ DONE             │
│ 8 tasks          │ │ 5 tasks          │ │ 12 tasks         │
│                  │ │                  │ │                  │
│ ┌──────────────┐ │ │ ┌──────────────┐ │ │ ┌──────────────┐ │
│ │ Design Login │ │ │ │ Build Navbar │ │ │ │ Setup DB     │ │
│ │              │ │ │ │              │ │ │ │              │ │
│ │ HIGH         │ │ │ │ MEDIUM       │ │ │ │ COMPLETE     │ │
│ │ ○ Rahul      │ │ │ │ ○ Amit       │ │ │ │ ○ Chirag     │ │
│ └──────────────┘ │ │ └──────────────┘ │ │ └──────────────┘ │
└──────────────────┘ └──────────────────┘ └──────────────────┘
```

Task cards should be white/soft surfaces with 14–18px radius, small metadata, clear titles, avatars, priority indicators, and due dates where supported.

---

# 63. Task Details Panel

Task details should open as a right-side panel or modal.

```text
┌──────────────────────────────────────────────┐
│ Design Login Page                       ×    │
├──────────────────────────────────────────────┤
│ Description                                  │
│ Create responsive login page using React.    │
│                                              │
│ Status       In Progress                     │
│ Priority     High                            │
│ Assignee     ○ Chirag                        │
│ Due Date     Sept 25                         │
│                                              │
│ ───────────────────────────────────────────  │
│ Subtasks                                     │
│ ☑ Create wireframe                           │
│ ☑ Setup React component                      │
│ ☐ Make responsive                             │
│ ☐ Add validation                              │
│                                              │
│ Attachments                                  │
│ 📄 requirements.pdf                          │
│                                              │
│ Activity                                     │
│ ○ Rahul moved task to In Progress            │
│                                              │
│ [ Add comment...                         ]   │
└──────────────────────────────────────────────┘
```

The panel should be white against the soft page background.

---

# 64. Calendar Design

```text
September 2026                       Month ▾

Mon       Tue       Wed       Thu       Fri       Sat       Sun
────────────────────────────────────────────────────────────────
21        22        23        24        25        26        27

          ● API                ● Login

                                      ● Testing
```

Advanced views can include day, week, month, deadlines, meetings, and milestones when those capabilities are added to the backend.

---

# 65. Team Page

```text
Team                                      + Invite Member

┌─────────────────────────────────────────────────────────────┐
│ ○  Chirag Bhadani                          Project Admin    │
│    12 tasks · 4 completed                                   │
├─────────────────────────────────────────────────────────────┤
│ ○  Rahul Sharma                            Member           │
│    15 tasks · 8 completed                                   │
├─────────────────────────────────────────────────────────────┤
│ ○  Amit Kumar                              Member           │
│    8 tasks · 6 completed                                    │
└─────────────────────────────────────────────────────────────┘
```

Use circular avatars, role badges, task statistics, and context menus for authorized administrators.

---

# 66. Activity and Notifications

```text
Recent Activity

● Rahul moved "API Integration" → Done
  10 minutes ago

● Amit commented on "Login Page"
  25 minutes ago

● You created "Dashboard UI"
  1 hour ago

● Rahul was assigned "Authentication"
  2 hours ago
```

Use a vertical timeline. Lime can identify selected or important activity.

---

# 67. Files and Documents

```text
Files                                      Upload Files

┌─────────────────────────────────────────────────────────────┐
│ 📄 Requirements.pdf                         2.4 MB          │
│ 📄 Project Specification.docx               1.1 MB          │
│ 🖼 Homepage-design.png                       820 KB          │
│ 📦 frontend.zip                             8.2 MB          │
│ 📊 Project-plan.xlsx                        430 KB          │
└─────────────────────────────────────────────────────────────┘
```

Support preview where possible, download, permission-based deletion, file type, size, uploader, and upload date.

---

# 68. Settings

```text
Settings

┌─────────────────┬───────────────────────────────────────────┐
│ Account         │ Profile                                   │
│ Workspace       │                                           │
│ Members         │ Name                                      │
│ Permissions     │ [ Chirag Bhadani                       ]  │
│ Notifications   │                                           │
│ Security        │ Email                                     │
│                 │ [ chirag@example.com                    ] │
│                 │                                           │
│                 │              [ Save Changes ]              │
└─────────────────┴───────────────────────────────────────────┘
```

Sections:

### Account

- Name
- Email
- Password
- Profile picture

### Workspace

- Workspace name
- Members
- Roles
- Permissions

### Notifications

- Email notifications
- Task assignments
- Mentions
- Deadline reminders

### Security

- Change password
- Active sessions
- Logout from all sessions where supported

---

# 69. Buttons

## Primary

```css
background: #17191A;
color: #FFFFFF;
border-radius: 999px;
```

## Accent

```css
background: #E8FF3F;
color: #17191A;
border-radius: 999px;
```

## Secondary

```css
background: #FFFFFF;
border: 1px solid #DDE2DD;
color: #17191A;
border-radius: 12px;
```

---

# 70. Inputs

```text
┌─────────────────────────────────────────┐
│ Search projects...                      │
└─────────────────────────────────────────┘
```

Recommended:

```css
background: #FFFFFF;
border: 1px solid #DDE2DD;
border-radius: 12px;
height: 44px–48px;
padding: 0 14px;
```

Focus:

```css
border-color: #17191A;
box-shadow: 0 0 0 3px rgba(232, 255, 63, 0.22);
```

---

# 71. Status and Priority

```text
● TODO
● IN PROGRESS
● DONE
```

Priority:

```text
HIGH      → soft red
MEDIUM    → soft yellow
LOW       → soft green
```

Do not rely on color alone to communicate state.

---

# 72. Avatars

```text
○
```

Multiple members:

```text
○ ○ ○ +4
```

Sizes:

```text
Small:    28px
Medium:   36px
Large:    48px
Profile:  64px+
```

---

# 73. Icons

Use one consistent icon library.

Recommended:

```text
Lucide React
```

Use simple line icons with a consistent stroke width. Icons should support labels rather than replace important text.

---

# 74. Motion and Interaction

Animations should be subtle.

```text
Duration: 150–250ms
Easing: ease-out
```

Use motion for sidebar expansion, modals, dropdowns, card hover, button hover, Kanban drag, tabs, and progress updates.

Cards can use approximately `translateY(-2px)` on hover.

---

# 75. Responsive Design

## Desktop

```text
Sidebar + Topbar + Main Content
```

## Tablet

```text
Collapsed Sidebar + Topbar + Main Content
```

## Mobile

```text
Topbar
   │
   ▼
Main Content
   │
   ▼
Bottom/Drawer Navigation
```

Kanban should become horizontally scrollable on mobile rather than compressing columns.

---

# 76. Accessibility

Requirements:

- Keyboard navigation.
- Visible focus states.
- Semantic HTML.
- Accessible labels.
- Sufficient text contrast.
- Screen-reader-friendly buttons.
- Do not rely only on color for task status.
- Drag-and-drop should have a keyboard-accessible alternative.

---

# 77. Frontend Component Architecture

```text
src/
│
├── components/
│   ├── ui/
│   │   ├── Button
│   │   ├── Input
│   │   ├── Modal
│   │   ├── Badge
│   │   ├── Avatar
│   │   ├── Dropdown
│   │   └── Progress
│   │
│   ├── layout/
│   │   ├── AppShell
│   │   ├── Sidebar
│   │   ├── Topbar
│   │   └── MobileNavigation
│   │
│   ├── dashboard/
│   │   ├── StatCard
│   │   ├── ProjectCard
│   │   ├── ActivityFeed
│   │   └── ProductivityChart
│   │
│   ├── projects/
│   │   ├── ProjectCard
│   │   ├── ProjectHeader
│   │   ├── ProjectTabs
│   │   └── ProjectMembers
│   │
│   ├── tasks/
│   │   ├── TaskCard
│   │   ├── TaskDetails
│   │   ├── TaskForm
│   │   ├── KanbanColumn
│   │   └── SubtaskList
│   │
│   ├── calendar/
│   ├── team/
│   ├── files/
│   ├── notifications/
│   └── settings/
│
├── pages/
│   ├── Login
│   ├── Register
│   ├── Dashboard
│   ├── Projects
│   ├── ProjectDetails
│   ├── MyTasks
│   ├── Calendar
│   ├── Team
│   ├── Notifications
│   └── Settings
│
├── hooks/
├── services/
├── store/
├── utils/
├── constants/
└── styles/
```

---

# 78. Frontend Route Structure

```text
/
├── /login
├── /register
├── /forgot-password
├── /reset-password/:token
│
└── /app
    ├── /dashboard
    ├── /tasks
    ├── /projects
    ├── /projects/:projectId
    ├── /projects/:projectId/board
    ├── /projects/:projectId/list
    ├── /projects/:projectId/calendar
    ├── /projects/:projectId/files
    ├── /calendar
    ├── /team
    ├── /notifications
    └── /settings
```

---

# 79. Frontend State Architecture

```text
Server State
    │
    └── API data
         ├── Projects
         ├── Tasks
         ├── Members
         ├── Notes
         └── Notifications

Client State
    │
    ├── Sidebar open/closed
    ├── Modal state
    ├── Filters
    ├── Selected project
    └── UI preferences

Authentication State
    │
    ├── Current user
    ├── Access token state
    └── Authentication status
```

---

# 80. Design-to-PRD Mapping

| Frontend Feature | Backend Support |
|---|---|
| Login | `/auth/login` |
| Register | `/auth/register` |
| Email verification | `/auth/verify-email` |
| Dashboard task statistics | Tasks API |
| Projects | Project API |
| Project members | Member API |
| Kanban | Task status API |
| Task details | Task API |
| Subtasks | Subtask API |
| Project notes | Notes API |
| Files | Task attachments |
| Team | Project members |
| Settings | Auth/account functionality |
| Notifications | Requires notification API if persistent |
| Calendar deadlines | Requires task due-date support |
| Comments | Requires comment API |
| Task priority | Requires priority field |
| Task deadlines | Requires due-date field |

**Important:** The original backend PRD does not define task priority, task due dates, comments, meetings, milestones, persistent notifications, or a calendar data model. Treat these as future extensions unless the PRD is updated.

---

# 81. Frontend Implementation Priority

```text
Phase 1
Authentication
    ↓
App Shell
    ↓
Sidebar + Topbar
    ↓
Dashboard
    ↓
Projects

Phase 2
Project Details
    ↓
Task List
    ↓
Kanban Board
    ↓
Task Details
    ↓
Subtasks

Phase 3
Team
    ↓
Notes
    ↓
Files
    ↓
Settings

Phase 4
Calendar
    ↓
Notifications
    ↓
Advanced dashboard analytics
    ↓
Polish + responsive design
```

---

# 82. Final Visual Rule

The core Project Camp visual formula is:

```text
                    MINIMAL
                       +
                  LARGE TYPE
                       +
               SOFT BACKGROUNDS
                       +
                BLACK CONTRAST
                       +
                LIME ACCENTS
                       +
              ROUNDED SURFACES
                       +
               GENEROUS SPACE
```

The reference screenshot should be treated as the visual direction rather than copied screen-for-screen. Project Camp should keep its own information architecture and backend capabilities while adopting the screenshot's typography, spacing, color balance, rounded geometry, dark navigation, asymmetric card composition, and restrained interaction style.
