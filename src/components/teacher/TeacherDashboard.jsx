import { useState } from "react";
import { useAssignments } from "../../context/AssignmentContext";
import AssignmentForm from "./AssignmentForm";
import AssignmentList from "./AssignmentList";
import SubmissionsViewer from "./SubmissionsViewer";

const TeacherDashboard = () => {
  const { assignments, submissions, createAssignment, updateAssignment } =
    useAssignments();
  const [showForm, setShowForm] = useState(false);
  const [editingAssignment, setEditingAssignment] = useState(null);
  const [viewingSubmissions, setViewingSubmissions] = useState(null);
  const [statusFilter, setStatusFilter] = useState("all");

  // Calculate statistics
  const totalAssignments = assignments.length;
  const totalSubmissions = submissions.length;
  const pendingReviews = submissions.filter((s) => !s.isReviewed).length;
  const draftCount = assignments.filter((a) => a.status === "draft").length;
  const publishedCount = assignments.filter(
    (a) => a.status === "published"
  ).length;
  const completedCount = assignments.filter(
    (a) => a.status === "completed"
  ).length;

  const handleCreateAssignment = (formData) => {
    createAssignment(formData);
    setShowForm(false);
  };

  const handleEditAssignment = (formData) => {
    updateAssignment(editingAssignment.id, formData);
    setEditingAssignment(null);
  };

  const handleEditClick = (assignment) => {
    setEditingAssignment(assignment);
  };

  const handleViewSubmissions = (assignment) => {
    setViewingSubmissions(assignment);
  };

  // Filter assignments based on selected status
  const filteredAssignments =
    statusFilter === "all"
      ? assignments
      : assignments.filter((a) => a.status === statusFilter);

  return (
    <div>
      {/* Header Section */}
      <div className="bg-white rounded-lg shadow p-6 mb-6">
        <div className="flex justify-between items-center">
          <div>
            <h2 className="text-3xl font-bold text-gray-800 mb-2">
              Teacher Dashboard
            </h2>
            <p className="text-gray-600">
              Manage assignments and review student submissions
            </p>
          </div>
          <button
            onClick={() => setShowForm(true)}
            className="bg-indigo-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-indigo-700 transition shadow-lg flex items-center gap-2">
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 4v16m8-8H4"
              />
            </svg>
            Create Assignment
          </button>
        </div>
      </div>

      {/* Statistics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <div className="bg-gradient-to-br from-indigo-500 to-indigo-600 text-white rounded-lg shadow-lg p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-indigo-100 text-sm font-medium">
                Total Assignments
              </p>
              <p className="text-4xl font-bold mt-2">{totalAssignments}</p>
            </div>
            <svg
              className="w-12 h-12 text-indigo-200"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
              />
            </svg>
          </div>
        </div>

        <div className="bg-gradient-to-br from-green-500 to-green-600 text-white rounded-lg shadow-lg p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-green-100 text-sm font-medium">
                Total Submissions
              </p>
              <p className="text-4xl font-bold mt-2">{totalSubmissions}</p>
            </div>
            <svg
              className="w-12 h-12 text-green-200"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
          </div>
        </div>

        <div className="bg-gradient-to-br from-yellow-500 to-yellow-600 text-white rounded-lg shadow-lg p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-yellow-100 text-sm font-medium">
                Pending Reviews
              </p>
              <p className="text-4xl font-bold mt-2">{pendingReviews}</p>
            </div>
            <svg
              className="w-12 h-12 text-yellow-200"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
          </div>
        </div>

        <div className="bg-gradient-to-br from-purple-500 to-purple-600 text-white rounded-lg shadow-lg p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-purple-100 text-sm font-medium">By Status</p>
              <div className="mt-2 space-y-1 text-sm">
                <p>Draft: {draftCount}</p>
                <p>Published: {publishedCount}</p>
                <p>Completed: {completedCount}</p>
              </div>
            </div>
            <svg
              className="w-12 h-12 text-purple-200"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
              />
            </svg>
          </div>
        </div>
      </div>

      {/* Assignment Lifecycle Info */}
      <div className="bg-blue-50 border-l-4 border-blue-500 p-4 mb-6 rounded-lg">
        <h3 className="font-bold text-blue-900 mb-2">Assignment Lifecycle:</h3>
        <div className="flex items-center gap-2 text-sm text-blue-800">
          <span className="px-3 py-1 bg-gray-200 rounded font-semibold">
            DRAFT
          </span>
          <span>→</span>
          <span className="px-3 py-1 bg-green-200 rounded font-semibold">
            PUBLISHED
          </span>
          <span>→</span>
          <span className="px-3 py-1 bg-blue-200 rounded font-semibold">
            COMPLETED
          </span>
        </div>
        <p className="text-xs text-blue-700 mt-2">
          • Draft: Editable & Deletable • Published: Visible to students (cannot
          delete) • Completed: Locked, no further changes
        </p>
      </div>

      {/* Assignments List */}
      <div className="bg-white rounded-lg shadow p-6">
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-xl font-bold text-gray-800">
            All Assignments
            {statusFilter !== "all" && (
              <span className="text-sm font-normal text-gray-600 ml-2">
                ({filteredAssignments.length} filtered)
              </span>
            )}
          </h3>

          {/* Filter Buttons */}
          <div className="flex gap-2">
            <button
              onClick={() => setStatusFilter("all")}
              className={`px-4 py-2 rounded-lg font-semibold text-sm transition ${
                statusFilter === "all"
                  ? "bg-indigo-600 text-white"
                  : "bg-gray-200 text-gray-700 hover:bg-gray-300"
              }`}>
              All ({assignments.length})
            </button>
            <button
              onClick={() => setStatusFilter("draft")}
              className={`px-4 py-2 rounded-lg font-semibold text-sm transition ${
                statusFilter === "draft"
                  ? "bg-gray-600 text-white"
                  : "bg-gray-200 text-gray-700 hover:bg-gray-300"
              }`}>
              Draft ({draftCount})
            </button>
            <button
              onClick={() => setStatusFilter("published")}
              className={`px-4 py-2 rounded-lg font-semibold text-sm transition ${
                statusFilter === "published"
                  ? "bg-green-600 text-white"
                  : "bg-gray-200 text-gray-700 hover:bg-gray-300"
              }`}>
              Published ({publishedCount})
            </button>
            <button
              onClick={() => setStatusFilter("completed")}
              className={`px-4 py-2 rounded-lg font-semibold text-sm transition ${
                statusFilter === "completed"
                  ? "bg-blue-600 text-white"
                  : "bg-gray-200 text-gray-700 hover:bg-gray-300"
              }`}>
              Completed ({completedCount})
            </button>
          </div>
        </div>

        <AssignmentList
          assignments={filteredAssignments}
          onEdit={handleEditClick}
          onViewSubmissions={handleViewSubmissions}
        />
      </div>

      {/* Modals */}
      {showForm && (
        <AssignmentForm
          onSubmit={handleCreateAssignment}
          onCancel={() => setShowForm(false)}
        />
      )}

      {editingAssignment && (
        <AssignmentForm
          editingAssignment={editingAssignment}
          onSubmit={handleEditAssignment}
          onCancel={() => setEditingAssignment(null)}
        />
      )}

      {viewingSubmissions && (
        <SubmissionsViewer
          assignment={viewingSubmissions}
          onClose={() => setViewingSubmissions(null)}
        />
      )}
    </div>
  );
};

export default TeacherDashboard;
