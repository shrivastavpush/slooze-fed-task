import { useEffect } from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import Index from "@/pages/Index";
import NotFound from "@/pages/NotFound";
import { AuthProvider, useAuth } from "./hooks/useAuth";
import { useTheme } from "./hooks/useTheme";
import Layout from "@/components/Layout";
import Login from "@/pages/Login";
import Dashboard from "@/pages/Dashboard";
import Products from "@/pages/Products";

const queryClient = new QueryClient();

// Component to handle theme initialization
function ThemeInitializer() {
  const [theme] = useTheme();

  useEffect(() => {
    const root = window.document.documentElement;
    root.classList.remove("light", "dark");
    root.classList.add(theme);
    root.style.colorScheme = theme;
  }, [theme]);

  return null;
}

function ProtectedRoute({ children, role, isPublic = false }) {
  const { user } = useAuth();
  
  // If it's a public route, just render the children
  if (isPublic) return <>{children}</>;
  
  // For protected routes, check authentication
  if (!user) return <Navigate to="/login" replace state={{ from: window.location.pathname }} />;
  
  // Check role if specified
  if (role && user.role !== role) return <Navigate to="/products" replace />;
  
  return <>{children}</>;
}

function AppRoutes() {
  return (
    <Routes>
      <Route 
        path="/login" 
        element={
          <ProtectedRoute isPublic>
            <Login />
          </ProtectedRoute>
        } 
      />
      <Route
        path="/dashboard"
        element={
          <ProtectedRoute role="manager">
            <Layout>
              <Dashboard />
            </Layout>
          </ProtectedRoute>
        }
      />
      <Route
        path="/products"
        element={
          <ProtectedRoute>
            <Layout>
              <Products />
            </Layout>
          </ProtectedRoute>
        }
      />
      <Route 
        path="/" 
        element={
          <ProtectedRoute isPublic>
            <Index />
          </ProtectedRoute>
        } 
      />
      <Route 
        path="*" 
        element={
          <ProtectedRoute>
            <Layout>
              <NotFound />
            </Layout>
          </ProtectedRoute>
        } 
      />
    </Routes>
  );
}

const App = () => (
  <QueryClientProvider client={queryClient}>
    <ThemeInitializer />
    <Toaster />
    <Sonner />
    <AuthProvider>
      <BrowserRouter>
        <AppRoutes />
      </BrowserRouter>
    </AuthProvider>
  </QueryClientProvider>
);

export default App;
