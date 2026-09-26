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
          className="mb-6 p-4 rounded-2xl bg-[#f8f9fb] border border-[#e5e8ec] flex flex-col sm:flex-row gap-3 items-end"
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
            <label className="text-xs font-semibold text-[#0e1116] tracking-tight">
              Role
            </label>
            <select
              value={role}
              onChange={(e) => setRole(e.target.value)}
              disabled={submitting}
              className="w-full rounded-2xl bg-white border border-[#e5e8ec] text-[#0e1116] text-sm py-2.5 px-3.5 focus:outline-none focus:ring-2 focus:border-[#0d0f14] focus:ring-black/5"
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
        <p className="text-center text-sm text-[#9ca3af] py-6">
          No members found in this project.
        </p>
      ) : (
        <div className="flex flex-col divide-y divide-[#f0f2f5] max-h-72 overflow-y-auto">
          {members.map((m) => {
            const memberUser = m.user || {};
            const roleMeta = ROLE_CONFIG[m.role] || {
              label: m.role,
              badge: 'bg-[#f1f3f6] text-[#4b5563] border-[#e2e6eb]',
            };

            return (
              <div
                key={memberUser._id || Math.random()}
                className="py-3 flex items-center justify-between gap-3"
              >
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-full bg-[#0d0f14] text-[#e6fd53] border border-black/10 flex items-center justify-center font-bold text-xs shadow-xs">
                    {getInitials(memberUser.fullName || memberUser._username || 'U')}
                  </div>
                  <div>
                    <div className="text-sm font-bold text-[#0e1116]">
                      {memberUser.fullName || memberUser._username || 'Unnamed'}
                    </div>
                    <div className="text-xs text-[#64748b]">
                      @{memberUser._username || 'user'}
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  {isAdmin ? (
                    <select
                      value={m.role}
                      onChange={(e) => handleRoleChange(memberUser._id, e.target.value)}
                      className="rounded-xl bg-white border border-[#e5e8ec] text-xs font-medium text-[#0e1116] px-2.5 py-1.5 focus:outline-none focus:ring-2 focus:border-[#0d0f14]"
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
                      className="p-1.5 text-[#9ca3af] hover:text-rose-600 hover:bg-rose-50 rounded-xl transition-colors"
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
