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
      <Button variant="ghost" asChild className="hover:bg-gray-100 dark:hover:bg-gray-700 hover:text-primary dark:hover:text-white">
        <Link to="/" className="text-charcoal-light dark:text-gray-300">Home</Link>
      </Button>
      {session ? (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="relative h-8 w-8 rounded-full bg-transparent hover:bg-gray-100 dark:hover:bg-gray-700 hover:text-primary dark:hover:text-white">
              <UserCircle2 className="h-6 w-6 text-charcoal-light dark:text-gray-300" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-56" align="end">
            <DropdownMenuItem className="hover:bg-gray-100 dark:hover:bg-gray-700 hover:text-primary dark:hover:text-white focus:bg-gray-100 dark:focus:bg-gray-700">
              <Link to="/profile" className="w-full text-charcoal-light dark:text-gray-300">Profile</Link>
            </DropdownMenuItem>
            {session.user?.email === 'randhawa.m@gmail.com' && (
              <DropdownMenuItem className="hover:bg-gray-100 dark:hover:bg-gray-700 hover:text-primary dark:hover:text-white focus:bg-gray-100 dark:focus:bg-gray-700">
                <Link to="/admin" className="w-full text-charcoal-light dark:text-gray-300">Admin Dashboard</Link>
              </DropdownMenuItem>
            )}
            <DropdownMenuItem onClick={handleLogout} className="text-destructive dark:text-red-400 hover:bg-gray-100 dark:hover:bg-gray-700 focus:bg-gray-100 dark:focus:bg-gray-700">
              Log out
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      ) : (
        <Button
          variant="ghost"
          onClick={handleSignUpClick}
          className="text-charcoal-light hover:text-primary dark:text-gray-300 dark:hover:text-primary
                     hover:bg-gray-100 dark:hover:bg-gray-700 dark:hover:text-white"
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
              <Button variant="ghost" size="icon" className="bg-transparent hover:bg-gray-100 dark:hover:bg-gray-700 hover:text-primary dark:hover:text-white">
                <span>
                  <MenuIcon className="h-6 w-6 text-charcoal-light dark:text-gray-300" />
                  <span className="sr-only">Toggle navigation menu</span>
                </span>
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-[250px] sm:w-[300px] bg-background p-6 flex flex-col space-y-4">
              <div className="flex flex-col space-y-4">
                <Button variant="ghost" asChild className="justify-start px-4 py-2 rounded-md hover:bg-gray-100 dark:hover:bg-gray-700 hover:text-primary dark:hover:text-white">
                  <Link to="/" className="w-full text-charcoal-light dark:text-gray-300">Home</Link>
                </Button>
                {session ? (
                  <>
                    <Button variant="ghost" asChild className="justify-start px-4 py-2 rounded-md hover:bg-gray-100 dark:hover:bg-gray-700 hover:text-primary dark:hover:text-white">
                      <Link to="/profile" className="w-full text-charcoal-light dark:text-gray-300">Profile</Link>
                    </Button>
                    {session.user?.email === 'randhawa.m@gmail.com' && (
                      <Button variant="ghost" asChild className="justify-start px-4 py-2 rounded-md hover:bg-gray-100 dark:hover:bg-gray-700 hover:text-primary dark:hover:text-white">
                        <Link to="/admin" className="w-full text-charcoal-light dark:text-gray-300">Admin Dashboard</Link>
                      </Button>
                    )}
                    <Button
                      variant="ghost"
                      onClick={handleLogout}
                      className="justify-start px-4 py-2 rounded-md text-destructive dark:text-red-400 hover:bg-gray-100 dark:hover:bg-gray-700"
                    >
                      Log out
                    </Button>
                  </>
                ) : (
                  <Button
                    variant="ghost"
                    onClick={handleSignUpClick}
                    className="justify-start px-4 py-2 rounded-md text-charcoal-light dark:text-gray-300
                               hover:bg-gray-100 dark:hover:bg-gray-700 hover:text-primary dark:hover:text-white"
                  >
                    Sign Up
                  </Button>
                )}
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