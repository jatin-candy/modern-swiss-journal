
import React, { ReactNode } from 'react';
import Navbar from './Navbar';
import Footer from './Footer';
import { useAuth } from "@/context/AuthContext";

interface MainLayoutProps {
  children: ReactNode;
}

const MainLayout: React.FC<MainLayoutProps> = ({ children }) => {
  const { isAuthenticated } = useAuth();

  return (
    <>
      <Navbar isAuthenticated={isAuthenticated} />
      <main className="min-h-screen pt-28 md:pt-36 bg-blog-background">
        {children}
      </main>
      <Footer />
    </>
  );
};

export default MainLayout;
