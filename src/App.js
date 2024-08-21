import Navbar from './components/Navbar';
import Jobs from './components/Jobs'
import AddJob from './components/AddJob'
import ApplyJobs from './components/ApplyJobs';
import { AuthContext } from "./context/AuthContext";
import { useContext } from 'react';
import Register from './components/Register';
import { Navigate, BrowserRouter, Routes, Route } from 'react-router-dom';

function App() {
  const { currentUser } = useContext(AuthContext);
  const ProtectedRoute = ({ children }) => {
    if (!currentUser) {
      return <Navigate to="/register" />;
    }

    return children
  };
  return (
    <div className="App">
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<Register />} />
        <Route path="/register" element={<Register />} />
        <Route
          path="/apply-jobs"
          element={
            <ProtectedRoute>
              <ApplyJobs />
            </ProtectedRoute>
          }
        />
        <Route
          path="/add-jobs"
          element={
            <ProtectedRoute>
              <AddJob />
            </ProtectedRoute>
          }
        />
        <Route
          path="/all-jobs"
          element={
            <ProtectedRoute>
              <Jobs />
            </ProtectedRoute>
          }
        />
      </Routes>
    </BrowserRouter>
    </div>
  );
}

export default App;
