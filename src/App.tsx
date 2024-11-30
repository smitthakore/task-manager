import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { Layout } from './components/Layout';
import { Dashboard } from './pages/Dashboard';
import { Tasks } from './pages/Tasks';
import { Login } from './pages/Login';
import { TaskProvider } from './context/TaskContext';
import { AuthProvider, useAuth } from './context/AuthContext';

function PrivateRoute({ children }: { children: React.ReactNode }) {
  const { isAuthenticated } = useAuth();
  return isAuthenticated ? children : <Navigate to="/login" />;
}

function App() {
  return (
    <AuthProvider>
      <TaskProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route
              path="/"
              element={
                <PrivateRoute>
                  <Layout>
                    <Dashboard />
                  </Layout>
                </PrivateRoute>
              }
            />
            <Route
              path="/tasks"
              element={
                <PrivateRoute>
                  <Layout>
                    <Tasks />
                  </Layout>
                </PrivateRoute>
              }
            />
          </Routes>
        </BrowserRouter>
      </TaskProvider>
    </AuthProvider>
  );
}

export default App;