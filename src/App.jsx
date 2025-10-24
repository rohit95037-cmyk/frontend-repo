import { AuthProvider, useAuth } from "./context/AuthContext";
import { AssignmentProvider } from "./context/AssignmentContext";
import Login from "./components/Login";
import Dashboard from "./components/Dashboard";
import "./App.css";

function AppContent() {
  const { user } = useAuth();

  return <>{user ? <Dashboard /> : <Login />}</>;
}

function App() {
  return (
    <AuthProvider>
      <AssignmentProvider>
        <AppContent />
      </AssignmentProvider>
    </AuthProvider>
  );
}

export default App;
