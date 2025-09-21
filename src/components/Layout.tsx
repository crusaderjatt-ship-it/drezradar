import React from 'react';
import { Link } from 'react-router-dom';
import { Home, Settings, User, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { MadeWithDyad } from '@/components/made-with-dyad';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div className="min-h-screen flex flex-col bg-drez-pastel-pink text-drez-charcoal">
      <header className="bg-drez-pastel-purple p-4 shadow-md flex items-center justify-between">
        <Link to="/" className="text-2xl font-bold text-drez-charcoal">
          DrezRadar
        </Link>
        <nav className="flex space-x-4">
          <Button variant="ghost" size="icon" asChild>
            <Link to="/">
              <Home className="h-5 w-5" />
              <span className="sr-only">Home</span>
            </Link>
          </Button>
          <Button variant="ghost" size="icon" asChild>
            <Link to="/profile">
              <User className="h-5 w-5" />
              <span className="sr-only">Profile</span>
            </Link>
          </Button>
          <Button variant="ghost" size="icon" asChild>
            <Link to="/admin">
              <Settings className="h-5 w-5" />
              <span className="sr-only">Admin</span>
            </Link>
          </Button>
        </nav>
      </header>
      <main className="flex-grow container mx-auto p-4 max-w-screen-lg">
        {children}
      </main>
      <footer className="p-4 text-center text-sm text-drez-charcoal/70">
        <MadeWithDyad />
      </footer>
    </div>
  );
};

export default Layout;