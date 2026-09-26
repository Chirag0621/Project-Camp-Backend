import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '../common/Button.jsx';
import { Plus, Minus, ArrowRight, LayoutDashboard, HelpCircle } from 'lucide-react';

export const FAQSection = ({ isAuthenticated }) => {
  const [openIndex, setOpenIndex] = useState(0);
  const navigate = useNavigate();

  const faqs = [
    {
      q: 'What is ProjectCamp and who is it built for?',
      a: 'ProjectCamp is a modern, light, and focused project management web application built for teams, developers, and project managers. It provides unified workspaces with Kanban sprint boards, granular subtasks, role-based collaboration, and dedicated project documentation.',
    },
    {
      q: 'Can I create multiple projects and organize them by ownership?',
      a: 'Yes. You can create as many projects as your workflow requires. The dashboard automatically categorizes them between projects you own as an Administrator and projects you collaborate on as a Team Member.',
    },
    {
      q: 'How does the Kanban board work?',
      a: 'Each project workspace has a live Kanban board with standard agile columns: Todo, In Progress, In Review, and Done. You can assign priorities (Urgent, High, Medium, Low), set due dates, and update task statuses in real time.',
    },
    {
      q: 'Can I add subtasks and checklists to tasks?',
      a: 'Absolutely. Every task supports nested subtask checklists. As subtasks are completed, progress indicators update automatically on the task card and project summary.',
    },
    {
      q: 'How do team member invites and roles work?',
      a: 'Project Admins can invite team members directly by username or email. Team members can be assigned Admin control or Member status. All sensitive actions, like project deletion or role updates, are restricted to authorized Admins.',
    },
    {
      q: 'What happens when I log in or log out?',
      a: 'When you log in, you will be directed to this Landing Page, where you can conveniently review platform updates or jump directly into your active projects via the "My Dashboard" button. When you log out, your session is securely terminated.',
    },
  ];

  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? -1 : index);
  };

  return (
    <section id="faq" className="py-20 md:py-28 scroll-mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">
          {/* Left Column: Heading & Call to Action */}
          <div className="lg:col-span-5 flex flex-col justify-between">
            <div>
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white border border-[#e5e8ec] shadow-2xs mb-4">
                <HelpCircle className="w-3.5 h-3.5 text-[#0d0f14]" />
                <span className="text-xs font-bold uppercase tracking-wider text-[#0e1116]">
                  Frequently Asked Questions
                </span>
              </div>

              <h2 className="text-3xl sm:text-4xl font-extrabold text-[#0e1116] tracking-tight leading-tight">
                Everything You Need to Know About ProjectCamp
              </h2>
              <p className="text-xs sm:text-sm text-[#64748b] mt-4 leading-relaxed">
                Have questions about getting started, managing team permissions, or organizing sprint tasks? Here are answers to common questions.
              </p>
            </div>

            <div className="mt-8 p-6 rounded-3xl bg-white border border-[#e5e8ec] shadow-xs">
              <h4 className="text-sm font-bold text-[#0e1116]">
                Ready to organize your workflow?
              </h4>
              <p className="text-xs text-[#64748b] mt-1 mb-4">
                Set up your workspace and start managing projects today.
              </p>

              {isAuthenticated ? (
                <Button
                  variant="primary"
                  size="md"
                  onClick={() => navigate('/dashboard')}
                  icon={LayoutDashboard}
                  className="w-full"
                >
                  My Dashboard
                </Button>
              ) : (
                <Button
                  variant="primary"
                  size="md"
                  onClick={() => navigate('/register')}
                  icon={ArrowRight}
                  className="w-full"
                >
                  Get Started Free
                </Button>
              )}
            </div>
          </div>

          {/* Right Column: Accordion Items */}
          <div className="lg:col-span-7 flex flex-col gap-3.5">
            {faqs.map((faq, i) => {
              const isOpen = openIndex === i;
              const formattedNumber = String(i + 1).padStart(2, '0');

              return (
                <div
                  key={i}
                  className={`bento-card rounded-2xl border transition-all duration-200 overflow-hidden ${
                    isOpen
                      ? 'border-[#0d0f14] bg-white shadow-md'
                      : 'border-[#e5e8ec] bg-white hover:border-[#cbd5e1]'
                  }`}
                >
                  <button
                    type="button"
                    onClick={() => toggleFAQ(i)}
                    className="w-full p-5 sm:p-6 text-left flex items-center justify-between gap-4 select-none"
                    aria-expanded={isOpen}
                  >
                    <div className="flex items-center gap-3.5 sm:gap-4">
                      <span className="text-xs font-black text-[#0d0f14]/40">
                        {formattedNumber}
                      </span>
                      <span className="text-xs sm:text-sm font-bold text-[#0e1116] leading-snug">
                        {faq.q}
                      </span>
                    </div>

                    <div
                      className={`w-7 h-7 rounded-full flex items-center justify-center flex-shrink-0 transition-colors ${
                        isOpen
                          ? 'bg-[#0d0f14] text-white'
                          : 'bg-[#f0f2f5] text-[#0e1116]'
                      }`}
                    >
                      {isOpen ? <Minus className="w-3.5 h-3.5" /> : <Plus className="w-3.5 h-3.5" />}
                    </div>
                  </button>

                  {isOpen && (
                    <div className="px-5 pb-5 sm:px-6 sm:pb-6 pt-0 text-xs sm:text-sm text-[#64748b] leading-relaxed border-t border-[#f0f2f5] animate-in fade-in duration-200">
                      <p className="pt-3">{faq.a}</p>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};
