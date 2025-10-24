import { useState } from "react";
import { useAuth } from "../../context/AuthContext";
import { useAssignments } from "../../context/AssignmentContext";
import SubmissionForm from "./SubmissionForm";
import ViewSubmission from "./ViewSubmission";

const StudentDashboard = () => {
  const { user } = useAuth();
  const {
    getPublishedAssignments,
    submitAssignment,
    hasStudentSubmitted,
    getStudentSubmission,
  } = useAssignments();

  const [submittingAssignment, setSubmittingAssignment] = useState(null);
  const [viewingSubmission, setViewingSubmission] = useState(null);

  const publishedAssignments = getPublishedAssignments();

  // Calculate statistics
  const activeAssignments = publishedAssignments.filter(
    (a) => !hasStudentSubmitted(a.id, user.email)
  ).length;

  const completedAssignments = publishedAssignments.filter((a) =>
    hasStudentSubmitted(a.id, user.email)
  ).length;

  const overdueAssignments = publishedAssignments.filter((a) => {
    const dueDate = new Date(a.dueDate);
    const today = new Date();
    return dueDate < today && !hasStudentSubmitted(a.id, user.email);
  }).length;

  const handleSubmit = (assignmentId, answer, fileName) => {
    submitAssignment(
      assignmentId,
      user.email,
      user.email.split("@")[0],
      answer,
      fileName
    );
    setSubmittingAssignment(null);
  };

  const handleViewSubmission = (assignment) => {
    const submission = getStudentSubmission(assignment.id, user.email);
    setViewingSubmission({ assignment, submission });
  };

  const isOverdue = (dueDate) => {
    return new Date(dueDate) < new Date();
  };

  return (
    <div>
      {/* Header Section */}
      <div className="bg-white rounded-lg shadow p-6 mb-6">
        <h2 className="text-3xl font-bold text-gray-800 mb-2">
          Student Dashboard
        </h2>
        <p className="text-gray-600">View and submit your assignments</p>
      </div>

      {/* Statistics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <div className="bg-gradient-to-br from-blue-500 to-blue-600 text-white rounded-lg shadow-lg p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-blue-100 text-sm font-medium">
                Active Assignments
              </p>
              <p className="text-4xl font-bold mt-2">{activeAssignments}</p>
            </div>
            <svg
              className="w-12 h-12 text-blue-200"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
              />
            </svg>
          </div>
        </div>

        <div className="bg-gradient-to-br from-green-500 to-green-600 text-white rounded-lg shadow-lg p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-green-100 text-sm font-medium">Completed</p>
              <p className="text-4xl font-bold mt-2">{completedAssignments}</p>
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

        <div className="bg-gradient-to-br from-red-500 to-red-600 text-white rounded-lg shadow-lg p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-red-100 text-sm font-medium">Overdue</p>
              <p className="text-4xl font-bold mt-2">{overdueAssignments}</p>
            </div>
            <svg
              className="w-12 h-12 text-red-200"
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
      </div>

      {/* Info Note */}
      <div className="bg-blue-50 border-l-4 border-blue-500 p-4 mb-6 rounded-lg">
        <p className="text-sm text-blue-800">
          <span className="font-semibold">Note:</span> You can only view
          published assignments. You can submit only once per assignment and
          cannot edit after submission.
        </p>
      </div>

      {/* Assignments List */}
      <div className="bg-white rounded-lg shadow p-6">
        <h3 className="text-xl font-bold text-gray-800 mb-4">
          Available Assignments ({publishedAssignments.length})
        </h3>

        {publishedAssignments.length === 0 ? (
          <div className="text-center py-12 bg-gray-50 rounded-lg">
            <svg
              className="w-16 h-16 text-gray-400 mx-auto mb-4"
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
            <p className="text-gray-500 text-lg">
              No assignments available yet.
            </p>
            <p className="text-gray-400 text-sm mt-2">
              Check back later for new assignments.
            </p>
          </div>
        ) : (
          <div className="space-y-4">
            {publishedAssignments.map((assignment) => {
              const submitted = hasStudentSubmitted(assignment.id, user.email);
              const overdue = isOverdue(assignment.dueDate);

              return (
                <div
                  key={assignment.id}
                  className={`border rounded-lg p-5 ${
                    submitted
                      ? "bg-green-50 border-green-200"
                      : overdue
                      ? "bg-red-50 border-red-200"
                      : "bg-white border-gray-300"
                  }`}>
                  <div className="flex justify-between items-start">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <h4 className="text-lg font-bold text-gray-800">
                          {assignment.title}
                        </h4>
                        {submitted && (
                          <span className="px-3 py-1 bg-green-600 text-white text-xs font-bold rounded-full">
                            SUBMITTED
                          </span>
                        )}
                        {!submitted && overdue && (
                          <span className="px-3 py-1 bg-red-600 text-white text-xs font-bold rounded-full">
                            OVERDUE
                          </span>
                        )}
                      </div>
                      <p className="text-gray-600 text-sm mb-3">
                        {assignment.description}
                      </p>
                      <div className="flex items-center gap-4 text-sm">
                        <span className="text-gray-500">
                          <span className="font-semibold">Due:</span>{" "}
                          {new Date(assignment.dueDate).toLocaleDateString()}
                        </span>
                        <span className="text-gray-500">
                          <span className="font-semibold">Posted:</span>{" "}
                          {new Date(assignment.createdAt).toLocaleDateString()}
                        </span>
                      </div>
                    </div>
                    <div className="ml-4">
                      {submitted ? (
                        <button
                          onClick={() => handleViewSubmission(assignment)}
                          className="bg-indigo-600 text-white px-4 py-2 rounded-lg text-sm font-semibold hover:bg-indigo-700 transition">
                          View Submission
                        </button>
                      ) : (
                        <button
                          onClick={() => setSubmittingAssignment(assignment)}
                          className="bg-green-600 text-white px-4 py-2 rounded-lg text-sm font-semibold hover:bg-green-700 transition">
                          Submit Assignment
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* Modals */}
      {submittingAssignment && (
        <SubmissionForm
          assignment={submittingAssignment}
          onSubmit={(answer, fileName) =>
            handleSubmit(submittingAssignment.id, answer, fileName)
          }
          onCancel={() => setSubmittingAssignment(null)}
        />
      )}

      {viewingSubmission && (
        <ViewSubmission
          assignment={viewingSubmission.assignment}
          submission={viewingSubmission.submission}
          onClose={() => setViewingSubmission(null)}
        />
      )}
    </div>
  );
};

export default StudentDashboard;
