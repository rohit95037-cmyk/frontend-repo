import { useAssignments } from "../../context/AssignmentContext";

const AssignmentList = ({ assignments, onEdit, onViewSubmissions }) => {
  const {
    deleteAssignment,
    changeAssignmentStatus,
    getSubmissionsForAssignment,
  } = useAssignments();

  const getStatusColor = (status) => {
    switch (status) {
      case "draft":
        return "bg-gray-100 text-gray-800 border-gray-300";
      case "published":
        return "bg-green-100 text-green-800 border-green-300";
      case "completed":
        return "bg-blue-100 text-blue-800 border-blue-300";
      default:
        return "bg-gray-100 text-gray-800 border-gray-300";
    }
  };

  const handleDelete = (id) => {
    const success = deleteAssignment(id);
    if (!success) {
      alert("Only draft assignments can be deleted!");
    }
  };

  const handleStatusChange = (id, currentStatus) => {
    let newStatus;
    if (currentStatus === "draft") newStatus = "published";
    else if (currentStatus === "published") newStatus = "completed";

    const success = changeAssignmentStatus(id, newStatus);
    if (!success) {
      alert("Invalid status transition!");
    }
  };

  const canEdit = (status) => status === "draft";
  const canDelete = (status) => status === "draft";
  const canChangeStatus = (status) => status !== "completed";

  return (
    <div className="space-y-4">
      {assignments.length === 0 ? (
        <div className="text-center py-12 bg-gray-50 rounded-lg">
          <p className="text-gray-500 text-lg">No assignments created yet.</p>
          <p className="text-gray-400 text-sm mt-2">
            Click "Create Assignment" to get started.
          </p>
        </div>
      ) : (
        assignments.map((assignment) => {
          const submissions = getSubmissionsForAssignment(assignment.id);
          const reviewedCount = submissions.filter((s) => s.isReviewed).length;

          return (
            <div
              key={assignment.id}
              className="bg-white border border-gray-200 rounded-lg shadow-md hover:shadow-lg transition">
              <div className="p-6">
                <div className="flex justify-between items-start mb-4">
                  <div className="flex-1">
                    <h3 className="text-xl font-bold text-gray-800 mb-2">
                      {assignment.title}
                    </h3>
                    <p className="text-gray-600 text-sm mb-3">
                      {assignment.description}
                    </p>
                    <div className="flex items-center gap-4 text-sm">
                      <span className="text-gray-500">
                        <span className="font-semibold">Due:</span>{" "}
                        {new Date(assignment.dueDate).toLocaleDateString()}
                      </span>
                      <span className="text-gray-500">
                        <span className="font-semibold">Created:</span>{" "}
                        {new Date(assignment.createdAt).toLocaleDateString()}
                      </span>
                    </div>
                  </div>
                  <div>
                    <span
                      className={`px-4 py-2 rounded-full text-xs font-bold uppercase border-2 ${getStatusColor(
                        assignment.status
                      )}`}>
                      {assignment.status}
                    </span>
                  </div>
                </div>

                {/* Submission Stats */}
                {assignment.status !== "draft" && (
                  <div className="bg-gray-50 rounded-lg p-4 mb-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm font-semibold text-gray-700">
                          Submissions: {submissions.length}
                        </p>
                        <p className="text-xs text-gray-500">
                          Reviewed: {reviewedCount} / {submissions.length}
                        </p>
                      </div>
                      <button
                        onClick={() => onViewSubmissions(assignment)}
                        className="bg-indigo-600 text-white px-4 py-2 rounded-lg text-sm font-semibold hover:bg-indigo-700 transition">
                        View Submissions
                      </button>
                    </div>
                  </div>
                )}

                {/* State Transition Info */}
                <div className="bg-blue-50 border-l-4 border-blue-400 p-3 mb-4 text-xs">
                  {assignment.status === "draft" && (
                    <p className="text-blue-800">
                      <span className="font-semibold">Draft:</span> Editable and
                      deletable. Publish to make visible to students.
                    </p>
                  )}
                  {assignment.status === "published" && (
                    <p className="text-green-800">
                      <span className="font-semibold">Published:</span> Visible
                      to students for submission. Cannot be deleted.
                    </p>
                  )}
                  {assignment.status === "completed" && (
                    <p className="text-blue-800">
                      <span className="font-semibold">Completed:</span> Locked
                      after review. No further changes allowed.
                    </p>
                  )}
                </div>

                {/* Action Buttons */}
                <div className="flex gap-2">
                  {canEdit(assignment.status) && (
                    <button
                      onClick={() => onEdit(assignment)}
                      className="bg-yellow-500 text-white px-4 py-2 rounded-lg text-sm font-semibold hover:bg-yellow-600 transition">
                      Edit
                    </button>
                  )}

                  {canChangeStatus(assignment.status) && (
                    <button
                      onClick={() =>
                        handleStatusChange(assignment.id, assignment.status)
                      }
                      className="bg-green-600 text-white px-4 py-2 rounded-lg text-sm font-semibold hover:bg-green-700 transition">
                      {assignment.status === "draft" && "Publish"}
                      {assignment.status === "published" && "Mark as Completed"}
                    </button>
                  )}

                  {canDelete(assignment.status) && (
                    <button
                      onClick={() => {
                        if (
                          window.confirm(
                            "Are you sure you want to delete this assignment?"
                          )
                        ) {
                          handleDelete(assignment.id);
                        }
                      }}
                      className="bg-red-500 text-white px-4 py-2 rounded-lg text-sm font-semibold hover:bg-red-600 transition">
                      Delete
                    </button>
                  )}
                </div>
              </div>
            </div>
          );
        })
      )}
    </div>
  );
};

export default AssignmentList;
