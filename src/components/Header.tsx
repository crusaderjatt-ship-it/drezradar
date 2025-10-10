"use client";

import React from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { ThemeToggle } from '@/components/ThemeToggle';
import { Button } from '@/components/ui/button';
import { useSupabase } from '@/components/SessionContextProvider';
import { toast } from 'sonner';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { MenuIcon, UserCircle2 } from 'lucide-react';
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { useIsMobile } from '@/hooks/use-mobile';

const Header: React.FC = () => {
  const { session, supabase } = useSupabase();
  const navigate = useNavigate();
  const location = useLocation();
  const isMobile = useIsMobile();

  const handleLogout = async () => {
    const { error } = await supabase.auth.signOut();
    if (error) {
      console.error('Error logging out:', error.message);
      toast.error('Failed to log out.');
    } else {
      toast.success('Logged out successfully!');
      navigate('/login');
    }
  };

  const handleSignUpClick = () => {
    if (location.pathname === '/') {
      const element = document.getElementById('signup-call-to-action');
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    } else {
      navigate('/#signup-cta');
    }
  };

  const navLinks = (
    <>
      <Button variant="ghost" asChild> {/* Wrap Link in Button with ghost variant */}
        <Link to="/" className="text-charcoal-light hover:text-primary transition-colors dark:text-gray-300 dark:hover:text-primary">Home</Link>
      </Button>
      {session ? (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="relative h-8 w-8 rounded-full hover:bg-gray-800 dark:hover:bg-gray-700 hover:text-white">
              <UserCircle2 className="h-6 w-6 text-charcoal-light dark:text-gray-300" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-56" align="end"> {/* Removed forceMount */}
            <DropdownMenuItem className="hover:bg-gray-800 hover:text-white focus:bg-gray-800 focus:text-white">
              <Link to="/profile" className="w-full text-charcoal-light dark:text-gray-300 hover:text-white">Profile</Link>
            </DropdownMenuItem>
            {session.user?.email === 'randhawa.m@gmail.com' && (
              <DropdownMenuItem className="hover:bg-gray-800 hover:text-white focus:bg-gray-800 focus:text-white">
                <Link to="/admin" className="w-full text-charcoal-light dark:text-gray-300 hover:text-white">Admin Dashboard</Link>
              </DropdownMenuItem>
            )}
            <DropdownMenuItem onClick={handleLogout} className="text-destructive dark:text-red-400 hover:bg-gray-800 focus:bg-gray-800">
              Log out
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      ) : (
        <Button
          variant="ghost"
          onClick={handleSignUpClick}
          className="text-charcoal-light hover:text-primary dark:text-gray-300 dark:hover:text-primary
                     hover:bg-primary/10 dark:hover:bg-primary/20"
        >
          Sign Up
        </Button>
      )}
    </>
  );

  return (
    <header className="flex items-center justify-between px-4 md:px-8 pt-4 md:pt-8 bg-background border-b border-border sticky top-0 z-50">
      <div className="flex-grow flex flex-col items-center justify-center md:flex-row md:justify-start md:items-center">
        <Link to="/">
          <img src={`${import.meta.env.BASE_URL}DrezRadarLogoS.png`} alt="DrezRadar Logo" className="max-h-24 md:max-h-32 w-auto" />
        </Link>
      </div>

      <div className="flex items-center space-x-4">
        {isMobile ? (
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon">
                <MenuIcon className="h-6 w-6 text-charcoal-light dark:text-gray-300" />
                <span className="sr-only">Toggle navigation menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-[250px] sm:w-[300px] bg-background p-6 flex flex-col space-y-4">
              <div className="flex flex-col space-y-4">
                {navLinks}
              </div>
              <div className="mt-auto">
                <ThemeToggle />
              </div>
            </SheetContent>
          </Sheet>
        ) : (
          <nav className="flex items-center space-x-6">
            {navLinks}
            <ThemeToggle />
          </nav>
        )}
      </div>
    </header>
  );
};

export default Header;