import { useAssignments } from "../../context/AssignmentContext";

const SubmissionsViewer = ({ assignment, onClose }) => {
  const { getSubmissionsForAssignment, markAsReviewed } = useAssignments();
  const submissions = getSubmissionsForAssignment(assignment.id);

  const handleMarkReviewed = (submissionId) => {
    markAsReviewed(submissionId);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg shadow-2xl w-full max-w-5xl max-h-[90vh] overflow-hidden flex flex-col">
        {/* Header */}
        <div className="bg-indigo-600 text-white px-6 py-4">
          <h2 className="text-2xl font-bold">
            {assignment.title} - Submissions
          </h2>
          <p className="text-indigo-100 text-sm mt-1">
            Total Submissions: {submissions.length}
          </p>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-6">
          {submissions.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-gray-500 text-lg">No submissions yet.</p>
              <p className="text-gray-400 text-sm mt-2">
                Students haven't submitted any work for this assignment.
              </p>
            </div>
          ) : (
            <div className="space-y-4">
              {submissions.map((submission) => (
                <div
                  key={submission.id}
                  className={`border rounded-lg p-5 ${
                    submission.isReviewed
                      ? "bg-green-50 border-green-200"
                      : "bg-white border-gray-300"
                  }`}>
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <h3 className="text-lg font-bold text-gray-800">
                        {submission.studentName}
                      </h3>
                      <p className="text-sm text-gray-500">
                        {submission.studentEmail}
                      </p>
                    </div>
                    <div className="text-right">
                      <span
                        className={`px-3 py-1 rounded-full text-xs font-bold ${
                          submission.isReviewed
                            ? "bg-green-600 text-white"
                            : "bg-yellow-500 text-white"
                        }`}>
                        {submission.isReviewed ? "REVIEWED" : "PENDING"}
                      </span>
                      <p className="text-xs text-gray-500 mt-1">
                        Submitted: {submission.submittedAt}
                      </p>
                    </div>
                  </div>

                  {/* Submitted Answer */}
                  <div className="mb-4">
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Submitted Answer:
                    </label>
                    <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
                      <p className="text-gray-800 text-sm whitespace-pre-wrap">
                        {submission.submittedAnswer}
                      </p>
                    </div>
                  </div>

                  {/* Submitted File */}
                  {submission.submittedFile && (
                    <div className="mb-4">
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        Submitted File:
                      </label>
                      <div className="bg-gray-50 border border-gray-200 rounded-lg p-3 flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <svg
                            className="w-5 h-5 text-indigo-600"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24">
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z"
                            />
                          </svg>
                          <span className="text-sm text-gray-700 font-medium">
                            {submission.submittedFile}
                          </span>
                        </div>
                        <button className="text-indigo-600 text-sm font-semibold hover:text-indigo-800">
                          Download
                        </button>
                      </div>
                    </div>
                  )}

                  {/* Mark as Reviewed Button */}
                  {!submission.isReviewed && (
                    <button
                      onClick={() => handleMarkReviewed(submission.id)}
                      className="w-full bg-green-600 text-white py-2 rounded-lg font-semibold hover:bg-green-700 transition">
                      Mark as Reviewed
                    </button>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="border-t border-gray-200 px-6 py-4 bg-gray-50">
          <button
            onClick={onClose}
            className="w-full bg-gray-600 text-white py-3 rounded-lg font-semibold hover:bg-gray-700 transition">
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default SubmissionsViewer;
