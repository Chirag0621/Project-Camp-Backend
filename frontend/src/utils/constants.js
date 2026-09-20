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
    color: 'bg-amber-500/10 text-amber-400 border-amber-500/20',
    dotColor: 'bg-amber-400',
    headerColor: 'border-t-amber-500',
  },
  [TaskStatusEnum.IN_PROGRESS]: {
    label: 'In Progress',
    color: 'bg-sky-500/10 text-sky-400 border-sky-500/20',
    dotColor: 'bg-sky-400',
    headerColor: 'border-t-sky-500',
  },
  [TaskStatusEnum.DONE]: {
    label: 'Done',
    color: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20',
    dotColor: 'bg-emerald-400',
    headerColor: 'border-t-emerald-500',
  },
};

export const ROLE_CONFIG = {
  [UserRolesEnum.ADMIN]: {
    label: 'Admin',
    badge: 'bg-rose-500/15 text-rose-300 border-rose-500/30',
  },
  [UserRolesEnum.PROJECT_ADMIN]: {
    label: 'Project Admin',
    badge: 'bg-indigo-500/15 text-indigo-300 border-indigo-500/30',
  },
  [UserRolesEnum.MEMBER]: {
    label: 'Member',
    badge: 'bg-slate-500/15 text-slate-300 border-slate-500/30',
  },
};
