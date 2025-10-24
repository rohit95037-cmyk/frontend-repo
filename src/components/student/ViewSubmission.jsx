const ViewSubmission = ({ assignment, submission, onClose }) => {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 overflow-y-auto p-4">
      <div className="bg-white rounded-lg shadow-2xl w-full max-w-3xl my-8">
        <div className="bg-indigo-600 text-white px-6 py-4 rounded-t-lg">
          <h2 className="text-2xl font-bold">Your Submission</h2>
          <p className="text-indigo-100 text-sm mt-1">{assignment.title}</p>
        </div>

        <div className="p-6 space-y-6 max-h-[calc(100vh-8rem)] overflow-y-auto">
          {/* Assignment Details */}
          <div className="bg-gray-50 rounded-lg p-4">
            <h3 className="font-semibold text-gray-800 mb-2">
              Assignment Description:
            </h3>
            <p className="text-gray-700 text-sm">{assignment.description}</p>
            <div className="flex gap-4 mt-3 text-sm">
              <p className="text-gray-600">
                <span className="font-semibold">Due Date:</span>{" "}
                {new Date(assignment.dueDate).toLocaleDateString()}
              </p>
              <p className="text-gray-600">
                <span className="font-semibold">Submitted:</span>{" "}
                {submission.submittedAt}
              </p>
            </div>
          </div>

          {/* Submission Status */}
          <div
            className={`border-l-4 p-4 rounded ${
              submission.isReviewed
                ? "bg-green-50 border-green-500"
                : "bg-yellow-50 border-yellow-500"
            }`}>
            <div className="flex items-center gap-2">
              <span
                className={`px-3 py-1 rounded-full text-xs font-bold ${
                  submission.isReviewed
                    ? "bg-green-600 text-white"
                    : "bg-yellow-500 text-white"
                }`}>
                {submission.isReviewed ? "REVIEWED" : "PENDING REVIEW"}
              </span>
              <p className="text-sm text-gray-600">
                {submission.isReviewed
                  ? "Your submission has been reviewed by the teacher."
                  : "Your submission is waiting for teacher review."}
              </p>
            </div>
          </div>

          {/* Submitted Answer */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Your Submitted Answer:
            </label>
            <div className="bg-gray-50 border border-gray-300 rounded-lg p-4">
              <p className="text-gray-800 whitespace-pre-wrap">
                {submission.submittedAnswer}
              </p>
            </div>
          </div>

          {/* Submitted File */}
          {submission.submittedFile && (
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Submitted File Reference:
              </label>
              <div className="bg-gray-50 border border-gray-300 rounded-lg p-3 flex items-center gap-2">
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
            </div>
          )}

          {/* Info Note */}
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
            <p className="text-sm text-blue-800">
              <span className="font-semibold">Note:</span> You cannot edit your
              submission once it has been sent. If you need to make changes,
              please contact your teacher.
            </p>
          </div>
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

export default ViewSubmission;
