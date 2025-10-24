import { useState } from "react";

const SubmissionForm = ({ assignment, onSubmit, onCancel }) => {
  const [answer, setAnswer] = useState("");
  const [fileName, setFileName] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(answer, fileName || null);
    setAnswer("");
    setFileName("");
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 overflow-y-auto p-4">
      <div className="bg-white rounded-lg shadow-2xl w-full max-w-3xl my-8">
        <div className="bg-green-600 text-white px-6 py-4 rounded-t-lg">
          <h2 className="text-2xl font-bold">Submit Assignment</h2>
          <p className="text-green-100 text-sm mt-1">{assignment.title}</p>
        </div>

        <form
          onSubmit={handleSubmit}
          className="p-6 space-y-6 max-h-[calc(100vh-8rem)] overflow-y-auto">
          {/* Assignment Details */}
          <div className="bg-blue-50 border-l-4 border-blue-500 p-4 rounded">
            <h3 className="font-semibold text-blue-900 mb-2">
              Assignment Description:
            </h3>
            <p className="text-blue-800 text-sm">{assignment.description}</p>
            <p className="text-blue-600 text-xs mt-2">
              <span className="font-semibold">Due Date:</span>{" "}
              {new Date(assignment.dueDate).toLocaleDateString()}
            </p>
          </div>

          {/* Answer Field */}
          <div>
            <label
              htmlFor="answer"
              className="block text-sm font-semibold text-gray-700 mb-2">
              Your Answer <span className="text-red-500">*</span>
            </label>
            <textarea
              id="answer"
              value={answer}
              onChange={(e) => setAnswer(e.target.value)}
              rows="10"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent outline-none resize-none"
              placeholder="Type your answer here..."
              required
            />
            <p className="text-xs text-gray-500 mt-1">
              Character count: {answer.length}
            </p>
          </div>

          {/* Optional File Name */}
          <div>
            <label
              htmlFor="fileName"
              className="block text-sm font-semibold text-gray-700 mb-2">
              File Name (Optional)
            </label>
            <input
              type="text"
              id="fileName"
              value={fileName}
              onChange={(e) => setFileName(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent outline-none"
              placeholder="e.g., assignment1.pdf (for reference only)"
            />
            <p className="text-xs text-gray-500 mt-1">
              Note: This is just a text reference. Actual file upload not
              implemented in this demo.
            </p>
          </div>

          {/* Warning */}
          <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
            <div className="flex items-start gap-2">
              <svg
                className="w-5 h-5 text-yellow-600 mt-0.5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                />
              </svg>
              <div>
                <p className="text-sm font-semibold text-yellow-800">
                  Important:
                </p>
                <p className="text-sm text-yellow-700">
                  You can only submit once. Make sure to review your answer
                  before submitting. You cannot edit your submission after it's
                  sent.
                </p>
              </div>
            </div>
          </div>

          {/* Buttons */}
          <div className="flex gap-3 pt-4">
            <button
              type="submit"
              className="flex-1 bg-green-600 text-white py-3 rounded-lg font-semibold hover:bg-green-700 transition shadow-lg">
              Submit Assignment
            </button>
            <button
              type="button"
              onClick={onCancel}
              className="flex-1 bg-gray-300 text-gray-700 py-3 rounded-lg font-semibold hover:bg-gray-400 transition">
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SubmissionForm;
