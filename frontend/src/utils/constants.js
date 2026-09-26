export const UserRolesEnum = {
  ADMIN: 'admin',
  PROJECT_ADMIN: 'project_admin',
  MEMBER: 'member',
};

export const TaskStatusEnum = {
  TODO: 'todo',
  IN_PROGRESS: 'in_progress',
  DONE: 'done',
};

export const TASK_STATUS_CONFIG = {
  [TaskStatusEnum.TODO]: {
    label: 'To Do',
    color: 'bg-[#f1f3f6] text-[#4b5563] border-[#e2e6eb]',
    dotColor: 'bg-[#9ca3af]',
    headerColor: 'border-t-[#9ca3af]',
  },
  [TaskStatusEnum.IN_PROGRESS]: {
    label: 'In Progress',
    color: 'bg-[#e6fd53]/40 text-[#0d0f14] border-[#d4ed34]',
    dotColor: 'bg-[#0d0f14]',
    headerColor: 'border-t-[#e6fd53]',
  },
  [TaskStatusEnum.DONE]: {
    label: 'Done',
    color: 'bg-[#0d0f14] text-[#e6fd53] border-[#1c202a]',
    dotColor: 'bg-[#e6fd53]',
    headerColor: 'border-t-[#0d0f14]',
  },
};

export const ROLE_CONFIG = {
  [UserRolesEnum.ADMIN]: {
    label: 'Admin',
    badge: 'bg-[#0d0f14] text-white border-transparent',
  },
  [UserRolesEnum.PROJECT_ADMIN]: {
    label: 'Project Admin',
    badge: 'bg-[#e6fd53] text-[#0d0f14] border-[#d4ed34]',
  },
  [UserRolesEnum.MEMBER]: {
    label: 'Member',
    badge: 'bg-[#f1f3f6] text-[#4b5563] border-[#e2e6eb]',
  },
};

