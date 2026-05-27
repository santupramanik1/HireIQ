// src/components/job/SendInviteModal.tsx
import { useState } from 'react';

export interface SendInviteModalProps {
  onBack: () => void;
  onClose: () => void;
  selectedCount: number;
  jobTitle: string;
  onSend: (interviewType: string) => void;
}

export default function SendInviteModal({
  onBack,
  onClose,
  selectedCount,
  jobTitle,
  onSend,
}: SendInviteModalProps) {
  const [interviewType, setInterviewType] = useState('Technical Interview');

  return (
    <div className="bg-white rounded-2xl shadow-xl w-full max-w-125 flex flex-col overflow-hidden animate-in zoom-in-95 duration-200">
      <div className="flex items-center justify-between px-6 pt-6 pb-4">
        <div className="flex items-center gap-3">
          <button
            onClick={onBack}
            className="p-1 rounded-full text-slate-400 hover:bg-slate-100 transition-colors cursor-pointer"
            title="Back to matches"
          >
            <span className="material-symbols-outlined">arrow_back</span>
          </button>
          <div>
            <h2 className="text-[1.25rem] font-bold text-slate-900 leading-tight">
              Send Interview Invites
            </h2>
            <p className="text-sm text-slate-500 font-medium mt-0.5">
              Sending to{' '}
              <span className="font-bold text-slate-700">
                {selectedCount} candidates
              </span>
            </p>
          </div>
        </div>
        <button
          onClick={onClose}
          className="p-1 rounded-full text-slate-400 hover:bg-slate-100 transition-colors cursor-pointer"
        >
          <span className="material-symbols-outlined text-[20px]">close</span>
        </button>
      </div>

      <div className="px-6 py-2 flex flex-col gap-6">
        <div className="bg-violet-50 border border-violet-100 rounded-xl p-4 flex items-start gap-4">
          <div className="bg-violet-100 p-2 rounded-lg text-violet-600 flex items-center justify-center">
            <span className="material-symbols-outlined">group</span>
          </div>
          <div>
            <h4 className="font-bold text-slate-900 text-[15px]">
              {selectedCount} candidates selected
            </h4>
            <p className="text-sm text-slate-500 mt-0.5">
              Each will receive a unique AI interview link via email
            </p>
          </div>
        </div>

        <div className="flex flex-col gap-2">
          <label className="text-sm font-bold text-slate-700">
            Interview Type
          </label>
          <div className="relative">
            <select
              value={interviewType}
              onChange={(e) => setInterviewType(e.target.value)}
              className="w-full appearance-none bg-white border border-slate-300 text-slate-700 text-sm rounded-lg focus:ring-2 focus:ring-violet-500 focus:border-violet-500 block px-4 py-2.5 outline-none font-medium cursor-pointer"
            >
              <option value="Technical Interview">Technical Interview</option>
              <option value="HR Screening">HR Screening</option>
            </select>
            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-3 text-slate-500">
              <span className="material-symbols-outlined">expand_more</span>
            </div>
          </div>
        </div>

        <div className="border border-slate-200 rounded-xl p-4 bg-slate-50/50">
          <div className="flex items-center gap-2 mb-2 text-violet-600 font-bold text-xs tracking-wider uppercase">
            <span className="material-symbols-outlined text-[16px]">
              auto_awesome
            </span>
            Email Preview
          </div>
          <p className="text-sm text-slate-500 leading-relaxed italic">
            "[Candidate Name], we'd like to invite you to a{' '}
            <span className="font-bold text-slate-700 not-italic">
              {interviewType}
            </span>{' '}
            for the{' '}
            <span className="font-bold text-slate-700 not-italic">
              [{jobTitle}]
            </span>{' '}
            position..."
          </p>
        </div>
      </div>

      <div className="border-t border-slate-200 px-6 py-4 mt-2 flex justify-between items-center bg-gray-50/50">
        <button
          onClick={onClose}
          className="text-sm font-bold text-slate-600 hover:text-slate-900 transition-colors px-2 cursor-pointer"
        >
          Cancel
        </button>
        <button
          onClick={() => {
            onSend(interviewType);
            onClose();
          }}
          className="bg-linear-to-r from-violet-600 to-blue-600 hover:opacity-90 text-white px-5 py-2.5 rounded-lg font-bold text-sm flex items-center gap-2 transition-all shadow-sm active:scale-95 cursor-pointer"
        >
          <span className="material-symbols-outlined text-[18px]">mail</span>
          Send Invites
        </button>
      </div>
    </div>
  );
}
