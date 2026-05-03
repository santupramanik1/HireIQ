import axios from "axios";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";

interface CreateJobModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
}

export default function CreateJobModal({
  isOpen,
  onClose,
  onSuccess
}: CreateJobModalProps) {
  const [isGenerating, setIsGenerating] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [formData, setFormData] = useState({
    title: "",
    department: "",
    type: "full-time",
    location: "",
    status: "draft",
    minSalary: "",
    maxSalary: "",
    currency: "USD",
    description: "",
    skills: "",
    requirements: "",
    responsibilities: ""
  });

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }

    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  if (!isOpen) return null;

  const handleAutoFill = (e: React.MouseEvent) => {
    e.preventDefault();
    setIsGenerating(true);
    // Simulate API call
    setTimeout(() => setIsGenerating(false), 1500);
  };

  // Trigger on Input change
  const handleInputChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // Trigger on form submit
  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const { minSalary, maxSalary, currency, ...restData } = formData;

      const payload = {
        ...restData,
        salary: {
          min: minSalary ? Number(minSalary) : 0,
          max: maxSalary ? Number(maxSalary) : 0,
          currency: currency
        }
      };
      const { data } = await axios.post(
        `${import.meta.env.VITE_API_BASE_URL}/jobs`,
        payload,
        { withCredentials: true }
      );

      toast.success(data.message);

      // On success, tell the dashboard to fetch the new list and close the modal
      onSuccess();
      onClose();
    } catch (error: any) {
      const errorMessage =
        error.response?.data?.message ||
        error.message ||
        "Failed to create job";
      toast.error(errorMessage);
    } finally {
      // Always turn off the loading spinner, whether it succeeded or failed
      setIsSubmitting(false);
    }
    // Reset form
    setFormData({
      title: "",
      department: "",
      type: "full-time",
      location: "",
      status: "draft",
      minSalary: "",
      maxSalary: "",
      currency: "USD",
      description: "",
      skills: "",
      requirements: "",
      responsibilities: ""
    });
  };

  return (
    <div className="fixed inset-0 z-100 flex items-center justify-center p-4 sm:p-6">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-slate-900/40 backdrop-blur-sm transition-opacity"
        onClick={onClose}
      />

      {/* Modal Container */}
      <div className="relative bg-white rounded-2xl shadow-xl w-full max-w-xl flex flex-col max-h-[90vh] overflow-hidden animate-in fade-in zoom-in-95 duration-200">
        {/* SCROLLABLE BODY WITH HIDDEN SCROLLBAR */}
        <div className="px-6 py-8 overflow-y-auto [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
          {/* Header */}
          <div className="flex justify-between items-start mb-6">
            <div>
              <h2 className="text-2xl font-bold text-slate-900 tracking-tight">
                Add New Job
              </h2>
              <p className="text-slate-500 text-sm mt-1">
                Use AI to auto-fill details or enter them manually.
              </p>
            </div>
            <button
              onClick={onClose}
              className="text-slate-400 hover:text-slate-700 hover:bg-slate-100 p-2 rounded-full transition-colors"
            >
              <span className="material-symbols-outlined text-[24px]">
                close
              </span>
            </button>
          </div>

          {/* AI Auto-fill Section */}
          <div className="border border-dashed border-blue-200 bg-blue-50/50 rounded-2xl p-5 mb-8">
            <div className="flex items-center gap-2 mb-3">
              <div className="w-8 h-8 rounded-lg bg-blue-100 text-blue-600 flex items-center justify-center">
                <span className="material-symbols-outlined text-[18px]">
                  auto_awesome
                </span>
              </div>
              <div>
                <h3 className="text-sm font-bold text-slate-900">
                  AI Auto-fill
                </h3>
                <p className="text-xs text-slate-500">
                  Enter a job title and let AI generate the details
                </p>
              </div>
            </div>
            <div className="flex flex-col sm:flex-row gap-3">
              <input
                type="text"
                placeholder="e.g. Senior React Engineer, Product Manager"
                className="flex-1 bg-white border border-slate-200 text-slate-900 text-sm rounded-xl focus:ring-2 focus:ring-blue-100 focus:border-blue-500 p-3 transition-all outline-none placeholder:text-slate-400 shadow-sm"
              />
              <button
                onClick={handleAutoFill}
                disabled={isGenerating}
                className="button-bg-color cursor-pointer text-white px-6 py-3 rounded-xl font-bold text-sm hover:bg-blue-700 transition-colors flex items-center justify-center gap-2 shadow-sm disabled:opacity-70"
              >
                <span
                  className={`material-symbols-outlined text-[18px] ${
                    isGenerating ? "animate-spin" : ""
                  }`}
                >
                  {isGenerating ? "progress_activity" : "auto_awesome"}
                </span>
                {isGenerating ? "Generating..." : "Generate"}
              </button>
            </div>
          </div>

          {/* Divider */}
          <div className="flex items-center gap-4 mb-8">
            <hr className="flex-1 border-slate-200" />
            <span className="text-xs font-bold tracking-wider text-slate-400 uppercase">
              Job Details
            </span>
            <hr className="flex-1 border-slate-200" />
          </div>

          {/* Form Grid */}
          <form
            onSubmit={handleFormSubmit}
            id="create-job-form"
            className="grid grid-cols-6 gap-x-5 gap-y-6"
          >
            {/* Row 1: Halves */}
            <div className="col-span-6 sm:col-span-3">
              <label className="block text-sm font-semibold text-slate-700 mb-1.5">
                Job Title
              </label>
              <input
                type="text"
                name="title"
                value={formData.title}
                onChange={handleInputChange}
                placeholder="e.g. Senior React Developer"
                className="w-full bg-white border border-slate-200 text-slate-900 text-sm rounded-xl focus:ring-2 focus:ring-blue-100 focus:border-blue-500 block p-3 outline-none transition-all shadow-sm"
              />
            </div>
            <div className="col-span-6 sm:col-span-3">
              <label className="block text-sm font-semibold text-slate-700 mb-1.5">
                Department
              </label>
              <input
                type="text"
                name="department"
                value={formData.department}
                onChange={handleInputChange}
                placeholder="e.g. Engineering"
                className="w-full bg-white border border-slate-200 text-slate-900 text-sm rounded-xl focus:ring-2 focus:ring-blue-100 focus:border-blue-500 block p-3 outline-none transition-all shadow-sm"
              />
            </div>

            {/* Row 2: Thirds (Updated to include Status) */}
            <div className="col-span-6 sm:col-span-2">
              <label className="block text-sm font-semibold text-slate-700 mb-1.5">
                Type
              </label>
              <select
                name="type"
                value={formData.type}
                onChange={handleInputChange}
                className="w-full bg-white border border-slate-200 text-slate-900 text-sm rounded-xl focus:ring-2 focus:ring-blue-100 focus:border-blue-500 block p-3 outline-none transition-all shadow-sm appearance-none"
              >
                <option value="full-time">Full-time</option>
                <option value="part-time">Part-time</option>
                <option value="internship">Internship</option>
              </select>
            </div>

            <div className="col-span-6 sm:col-span-2">
              <label className="block text-sm font-semibold text-slate-700 mb-1.5">
                Location
              </label>
              <input
                type="text"
                name="location"
                value={formData.location}
                onChange={handleInputChange}
                placeholder="e.g. Remote"
                className="w-full bg-white border border-slate-200 text-slate-900 text-sm rounded-xl focus:ring-2 focus:ring-blue-100 focus:border-blue-500 block p-3 outline-none transition-all shadow-sm"
              />
            </div>

            <div className="col-span-6 sm:col-span-2">
              <label className="block text-sm font-semibold text-slate-700 mb-1.5">
                Status
              </label>
              <select
                name="status"
                value={formData.status}
                onChange={handleInputChange}
                className="w-full bg-white border border-slate-200 text-slate-900 text-sm rounded-xl focus:ring-2 focus:ring-blue-100 focus:border-blue-500 block p-3 outline-none transition-all shadow-sm appearance-none"
              >
                <option value="draft">Draft</option>
                <option value="active">Active</option>
                <option value="expired">Expired</option>
              </select>
            </div>

            {/* Row 3: Thirds */}
            <div className="col-span-6 sm:col-span-2">
              <label className="block text-sm font-semibold text-slate-700 mb-1.5">
                Min Salary
              </label>
              <input
                type="number"
                name="minSalary"
                value={formData.minSalary}
                onChange={handleInputChange}
                placeholder="80000"
                className="w-full bg-white border border-slate-200 text-slate-900 text-sm rounded-xl focus:ring-2 focus:ring-blue-100 focus:border-blue-500 block p-3 outline-none transition-all shadow-sm"
              />
            </div>
            <div className="col-span-6 sm:col-span-2">
              <label className="block text-sm font-semibold text-slate-700 mb-1.5">
                Max Salary
              </label>
              <input
                type="number"
                name="maxSalary"
                value={formData.maxSalary}
                onChange={handleInputChange}
                placeholder="120000"
                className="w-full bg-white border border-slate-200 text-slate-900 text-sm rounded-xl focus:ring-2 focus:ring-blue-100 focus:border-blue-500 block p-3 outline-none transition-all shadow-sm"
              />
            </div>
            <div className="col-span-6 sm:col-span-2">
              <label className="block text-sm font-semibold text-slate-700 mb-1.5">
                Currency
              </label>
              <select
                name="currency"
                value={formData.currency}
                onChange={handleInputChange}
                className="w-full bg-white border border-slate-200 text-slate-900 text-sm rounded-xl focus:ring-2 focus:ring-blue-100 focus:border-blue-500 block p-3 outline-none transition-all shadow-sm appearance-none"
              >
                <option value="USD">USD</option>
                <option value="EUR">EUR</option>
                <option value="GBP">GBP</option>
                <option value="INR">INR</option>
              </select>
            </div>

            {/* Row 4: Full Width */}
            <div className="col-span-6">
              <label className="block text-sm font-semibold text-slate-700 mb-1.5">
                Description
              </label>
              <textarea
                rows={4}
                name="description"
                value={formData.description}
                onChange={handleInputChange}
                placeholder="Job overview..."
                className="w-full bg-white border border-slate-200 text-slate-900 text-sm rounded-xl focus:ring-2 focus:ring-blue-100 focus:border-blue-500 block p-3 outline-none transition-all shadow-sm resize-none"
              ></textarea>
            </div>

            {/* Row 5: Halves */}
            <div className="col-span-6 sm:col-span-3">
              <label className="block text-sm font-semibold text-slate-700 mb-1.5">
                Skills
              </label>
              <textarea
                rows={3}
                name="skills"
                value={formData.skills}
                onChange={handleInputChange}
                placeholder="Key skills..."
                className="w-full bg-white border border-slate-200 text-slate-900 text-sm rounded-xl focus:ring-2 focus:ring-blue-100 focus:border-blue-500 block p-3 outline-none transition-all shadow-sm resize-none"
              ></textarea>
            </div>
            <div className="col-span-6 sm:col-span-3">
              <label className="block text-sm font-semibold text-slate-700 mb-1.5">
                Requirements
              </label>
              <textarea
                rows={3}
                name="requirements"
                value={formData.requirements}
                onChange={handleInputChange}
                placeholder="Required skills..."
                className="w-full bg-white border border-slate-200 text-slate-900 text-sm rounded-xl focus:ring-2 focus:ring-blue-100 focus:border-blue-500 block p-3 outline-none transition-all shadow-sm resize-none"
              ></textarea>
            </div>

            {/* Row 6: Full Width */}
            <div className="col-span-6 sm:col-span-6">
              <label className="block text-sm font-semibold text-slate-700 mb-1.5">
                Responsibilities
              </label>
              <textarea
                rows={3}
                name="responsibilities"
                value={formData.responsibilities}
                onChange={handleInputChange}
                placeholder="Required Responsibilities..."
                className="w-full bg-white border border-slate-200 text-slate-900 text-sm rounded-xl focus:ring-2 focus:ring-blue-100 focus:border-blue-500 block p-3 outline-none transition-all shadow-sm resize-none"
              ></textarea>
            </div>
          </form>
        </div>

        {/* Sticky Footer Actions */}
        <div className="px-6 py-4 border-t border-slate-200 bg-slate-50 flex justify-end gap-3 rounded-b-2xl shrink-0">
          <button
            onClick={onClose}
            disabled={isSubmitting}
            className="px-6 py-2.5 text-sm font-bold cursor-pointer text-slate-600 bg-white border border-slate-300 rounded-xl hover:bg-slate-50 hover:text-slate-900 transition-colors shadow-sm"
          >
            Cancel
          </button>
          <button
            type="submit"
            form="create-job-form"
            disabled={isSubmitting}
            className="px-6 py-2.5 text-sm font-bold text-white button-bg-color cursor-pointer rounded-xl hover:bg-blue-700 shadow-sm transition-colors flex items-center justify-center gap-2"
          >
            {isSubmitting ? (
              <>
                <span className="material-symbols-outlined text-base animate-spin">
                  progress_activity
                </span>
                Creating...
              </>
            ) : (
              "Create Job"
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
