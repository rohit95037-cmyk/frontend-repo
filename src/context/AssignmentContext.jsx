import { createContext, useContext, useState } from "react";

const AssignmentContext = createContext();

// Mock data for initial assignments and submissions
const initialAssignments = [
  {
    id: 1,
    title: "React Fundamentals",
    description: "Complete the React basics tutorial and submit your project",
    dueDate: "2025-11-01",
    status: "published",
    createdAt: "2025-10-15",
  },
  {
    id: 2,
    title: "JavaScript ES6 Features",
    description: "Write examples demonstrating ES6 features",
    dueDate: "2025-11-05",
    status: "draft",
    createdAt: "2025-10-20",
  },
];

const initialSubmissions = [
  {
    id: 1,
    assignmentId: 1,
    studentName: "John Doe",
    studentEmail: "john@test.com",
    submittedAnswer:
      "I have completed the React fundamentals tutorial and built a simple todo application.",
    submittedFile: "react-project.zip",
    submittedAt: "2025-10-25 14:30",
    isReviewed: false,
  },
  {
    id: 2,
    assignmentId: 1,
    studentName: "Jane Smith",
    studentEmail: "jane@test.com",
    submittedAnswer:
      "My React project demonstrates component creation, state management, and props usage.",
    submittedFile: "jane-react-app.zip",
    submittedAt: "2025-10-26 09:15",
    isReviewed: true,
  },
];

export const AssignmentProvider = ({ children }) => {
  const [assignments, setAssignments] = useState(initialAssignments);
  const [submissions, setSubmissions] = useState(initialSubmissions);

  // Create new assignment
  const createAssignment = (assignmentData) => {
    const newAssignment = {
      id: assignments.length + 1,
      ...assignmentData,
      status: "draft",
      createdAt: new Date().toISOString().split("T")[0],
    };
    setAssignments([...assignments, newAssignment]);
    return newAssignment;
  };

  // Update assignment
  const updateAssignment = (id, updatedData) => {
    setAssignments(
      assignments.map((assignment) =>
        assignment.id === id ? { ...assignment, ...updatedData } : assignment
      )
    );
  };

  // Delete assignment (only if status is draft)
  const deleteAssignment = (id) => {
    const assignment = assignments.find((a) => a.id === id);
    if (assignment && assignment.status === "draft") {
      setAssignments(assignments.filter((a) => a.id !== id));
      return true;
    }
    return false;
  };

  // Change assignment status (Draft → Published → Completed)
  const changeAssignmentStatus = (id, newStatus) => {
    const assignment = assignments.find((a) => a.id === id);
    if (!assignment) return false;

    // Validate state transitions
    const validTransitions = {
      draft: ["published"],
      published: ["completed"],
      completed: [],
    };

    if (validTransitions[assignment.status].includes(newStatus)) {
      updateAssignment(id, { status: newStatus });
      return true;
    }
    return false;
  };

  // Get submissions for a specific assignment
  const getSubmissionsForAssignment = (assignmentId) => {
    return submissions.filter((sub) => sub.assignmentId === assignmentId);
  };

  // Mark submission as reviewed
  const markAsReviewed = (submissionId) => {
    setSubmissions(
      submissions.map((sub) =>
        sub.id === submissionId ? { ...sub, isReviewed: true } : sub
      )
    );
  };

  // Get published assignments (for students)
  const getPublishedAssignments = () => {
    return assignments.filter((a) => a.status === "published");
  };

  // Submit assignment (for students)
  const submitAssignment = (
    assignmentId,
    studentEmail,
    studentName,
    answer,
    file = null
  ) => {
    const newSubmission = {
      id: submissions.length + 1,
      assignmentId,
      studentName,
      studentEmail,
      submittedAnswer: answer,
      submittedFile: file,
      submittedAt: new Date().toLocaleString(),
      isReviewed: false,
    };
    setSubmissions([...submissions, newSubmission]);
    return newSubmission;
  };

  // Check if student has already submitted
  const hasStudentSubmitted = (assignmentId, studentEmail) => {
    return submissions.some(
      (sub) =>
        sub.assignmentId === assignmentId && sub.studentEmail === studentEmail
    );
  };

  // Get student's submission for an assignment
  const getStudentSubmission = (assignmentId, studentEmail) => {
    return submissions.find(
      (sub) =>
        sub.assignmentId === assignmentId && sub.studentEmail === studentEmail
    );
  };

  return (
    <AssignmentContext.Provider
      value={{
        assignments,
        submissions,
        createAssignment,
        updateAssignment,
        deleteAssignment,
        changeAssignmentStatus,
        getSubmissionsForAssignment,
        markAsReviewed,
        getPublishedAssignments,
        submitAssignment,
        hasStudentSubmitted,
        getStudentSubmission,
      }}>
      {children}
    </AssignmentContext.Provider>
  );
};

export const useAssignments = () => {
  const context = useContext(AssignmentContext);
  if (!context) {
    throw new Error("useAssignments must be used within an AssignmentProvider");
  }
  return context;
};
