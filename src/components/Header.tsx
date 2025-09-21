import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Home, Settings, User, Sparkles } from 'lucide-react';

const Header = () => {
  return (
    <header className="bg-pastel-purple text-charcoal p-4 shadow-md">
      <div className="container mx-auto flex justify-between items-center">
        <Link to="/" className="text-2xl font-bold text-charcoal">
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
      </div>
    </header>
  );
};

export default Header;