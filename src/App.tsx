
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import ProtectedRoute from "./components/auth/ProtectedRoute";
import MainLayout from "./components/layout/MainLayout";
import Index from "./pages/Index";
import Article from "./pages/Article";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import ArticleEditor from "./pages/ArticleEditor";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <AuthProvider>
          <Routes>
            <Route path="/" element={<MainLayout><Index /></MainLayout>} />
            <Route path="/article/:slug" element={<MainLayout><Article /></MainLayout>} />
            <Route path="/login" element={<MainLayout><Login /></MainLayout>} />
            <Route 
              path="/dashboard" 
              element={
                <ProtectedRoute>
                  <MainLayout>
                    <Dashboard />
                  </MainLayout>
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/editor/:id" 
              element={
                <ProtectedRoute>
                  <MainLayout>
                    <ArticleEditor />
                  </MainLayout>
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/editor/new" 
              element={
                <ProtectedRoute>
                  <MainLayout>
                    <ArticleEditor />
                  </MainLayout>
                </ProtectedRoute>
              } 
            />
            <Route path="/section/:category" element={<MainLayout><Index /></MainLayout>} />
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<MainLayout><NotFound /></MainLayout>} />
          </Routes>
        </AuthProvider>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
