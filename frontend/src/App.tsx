import React, { Suspense } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import { ProtectedRoute } from './components/ProtectedRoute';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import CaseQueue from './pages/CaseQueue';

const LoadingScreen = () => (
  <div className="min-h-screen bg-navy flex items-center justify-center">
    <div className="animate-pulse flex flex-col items-center">
      <h1 className="font-serif text-3xl text-white font-bold tracking-wide mb-2">RakshaAI</h1>
      <div className="h-1 w-24 bg-accent rounded-full animate-bounce mt-4"></div>
    </div>
  </div>
);

const NotFound = () => (
  <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center">
    <h1 className="text-4xl font-bold text-navy mb-4">404</h1>
    <p className="text-gray-600 mb-8">Page not found</p>
    <a href="/" className="px-4 py-2 bg-navy text-white rounded-md hover:bg-navy-light transition-colors">
      Go Home
    </a>
  </div>
);

// Error Boundary for React
class ErrorBoundary extends React.Component<{children: React.ReactNode}, {hasError: boolean}> {
  constructor(props: {children: React.ReactNode}) {
    super(props);
    this.state = { hasError: false };
  }
  static getDerivedStateFromError() {
    return { hasError: true };
  }
  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50 text-center p-4">
          <div>
            <h2 className="text-xl font-bold text-red-600 mb-2">Something went wrong.</h2>
            <p className="text-gray-500 mb-4">Please refresh the page and try again.</p>
            <button onClick={() => window.location.reload()} className="bg-navy text-white px-4 py-2 rounded">
              Reload Page
            </button>
          </div>
        </div>
      );
    }
    return this.props.children;
  }
}

function App() {
  return (
    <ErrorBoundary>
      <AuthProvider>
        <BrowserRouter>
          <Suspense fallback={<LoadingScreen />}>
            <Routes>
              <Route path="/" element={<Login />} />
              <Route 
                path="/dashboard" 
                element={
                  <ProtectedRoute>
                    <Dashboard />
                  </ProtectedRoute>
                } 
              />
              <Route 
                path="/dashboard/cases" 
                element={
                  <ProtectedRoute>
                    <CaseQueue />
                  </ProtectedRoute>
                } 
              />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </Suspense>
        </BrowserRouter>
      </AuthProvider>
    </ErrorBoundary>
  );
}

export default App;
