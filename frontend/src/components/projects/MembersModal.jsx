import React, { useState, useEffect } from 'react';
import { Modal } from '../common/Modal.jsx';
import { Input } from '../common/Input.jsx';
import { Button } from '../common/Button.jsx';
import { Badge } from '../common/Badge.jsx';
import { Spinner } from '../common/Spinner.jsx';
import { projectService } from '../../services/project.service.js';
import { useToast } from '../../hooks/useToast.js';
import { UserRolesEnum, ROLE_CONFIG } from '../../utils/constants.js';
import { getInitials } from '../../utils/formatters.js';
import { UserPlus, Trash2, Shield, User } from 'lucide-react';

export const MembersModal = ({ isOpen, onClose, projectId, currentUserRole }) => {
  const [members, setMembers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [email, setEmail] = useState('');
  const [role, setRole] = useState(UserRolesEnum.MEMBER);
  const [submitting, setSubmitting] = useState(false);
  const { success, error } = useToast();

  const isAdmin = currentUserRole === UserRolesEnum.ADMIN;

  const fetchMembers = async () => {
    try {
      setLoading(true);
      const res = await projectService.getProjectMembers(projectId);
      setMembers(res.data || []);
    } catch (err) {
      error(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (isOpen && projectId) {
      fetchMembers();
    }
  }, [isOpen, projectId]);

  const handleAddMember = async (e) => {
    e.preventDefault();
    if (!email.trim()) return;

    setSubmitting(true);
    try {
      await projectService.addMemberToProject(projectId, {
        email: email.trim(),
        role,
      });
      success('Member added successfully!');
      setEmail('');
      setRole(UserRolesEnum.MEMBER);
      fetchMembers();
    } catch (err) {
      error(err.message);
    } finally {
      setSubmitting(false);
    }
  };

  const handleRoleChange = async (userId, newRole) => {
    try {
      await projectService.updateMemberRole(projectId, userId, newRole);
      success('Member role updated!');
      fetchMembers();
    } catch (err) {
      error(err.message);
    }
  };

  const handleRemoveMember = async (userId) => {
    try {
      await projectService.deleteMember(projectId, userId);
      success('Member removed from project!');
      fetchMembers();
    } catch (err) {
      error(err.message);
    }
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Project Team Members"
      description="Manage contributors, assignments, and permissions for this project."
      maxWidth="max-w-xl"
    >
      {isAdmin && (
        <form
          onSubmit={handleAddMember}
          className="mb-6 p-4 rounded-xl bg-slate-900/60 border border-slate-800 flex flex-col sm:flex-row gap-3 items-end"
        >
          <div className="flex-1 w-full">
            <Input
              label="Invite User by Email"
              type="email"
              placeholder="teammate@company.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              disabled={submitting}
              icon={User}
            />
          </div>

          <div className="w-full sm:w-36 flex flex-col gap-1.5">
            <label className="text-xs font-semibold text-slate-300 uppercase tracking-wider">
              Role
            </label>
            <select
              value={role}
              onChange={(e) => setRole(e.target.value)}
              disabled={submitting}
              className="w-full rounded-xl bg-slate-900/90 border border-slate-800 text-slate-100 text-sm py-2.5 px-3 focus:outline-none focus:ring-2 focus:border-indigo-500 focus:ring-indigo-500/20"
            >
              <option value={UserRolesEnum.MEMBER}>Member</option>
              <option value={UserRolesEnum.PROJECT_ADMIN}>Project Admin</option>
              <option value={UserRolesEnum.ADMIN}>Admin</option>
            </select>
          </div>

          <Button
            type="submit"
            variant="primary"
            icon={UserPlus}
            loading={submitting}
            className="w-full sm:w-auto"
          >
            Add
          </Button>
        </form>
      )}

      {loading ? (
        <div className="py-8">
          <Spinner text="Loading project members..." />
        </div>
      ) : members.length === 0 ? (
        <p className="text-center text-sm text-slate-500 py-6">
          No members found in this project.
        </p>
      ) : (
        <div className="flex flex-col divide-y divide-slate-800/80 max-h-72 overflow-y-auto">
          {members.map((m) => {
            const memberUser = m.user || {};
            const roleMeta = ROLE_CONFIG[m.role] || {
              label: m.role,
              badge: 'bg-slate-500/15 text-slate-300 border-slate-500/30',
            };

            return (
              <div
                key={memberUser._id || Math.random()}
                className="py-3 flex items-center justify-between gap-3"
              >
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-xl bg-indigo-600/20 border border-indigo-500/30 flex items-center justify-center font-bold text-xs text-indigo-300">
                    {getInitials(memberUser.fullName || memberUser._username || 'U')}
                  </div>
                  <div>
                    <div className="text-sm font-semibold text-slate-200">
                      {memberUser.fullName || memberUser._username || 'Unnamed'}
                    </div>
                    <div className="text-xs text-slate-400">
                      @{memberUser._username || 'user'}
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  {isAdmin ? (
                    <select
                      value={m.role}
                      onChange={(e) => handleRoleChange(memberUser._id, e.target.value)}
                      className="rounded-lg bg-slate-900 border border-slate-800 text-xs text-slate-300 px-2 py-1.5 focus:outline-none focus:ring-1 focus:border-indigo-500"
                    >
                      <option value={UserRolesEnum.MEMBER}>Member</option>
                      <option value={UserRolesEnum.PROJECT_ADMIN}>Project Admin</option>
                      <option value={UserRolesEnum.ADMIN}>Admin</option>
                    </select>
                  ) : (
                    <Badge className={roleMeta.badge}>{roleMeta.label}</Badge>
                  )}

                  {isAdmin && (
                    <button
                      onClick={() => handleRemoveMember(memberUser._id)}
                      className="p-1.5 text-slate-500 hover:text-rose-400 hover:bg-rose-500/10 rounded-lg transition-colors"
                      title="Remove member"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      )}
    </Modal>
  );
};
