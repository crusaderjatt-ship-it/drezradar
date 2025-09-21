import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Menu, Sparkles } from 'lucide-react';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { MadeWithDyad } from '@/components/made-with-dyad';

const Header = () => {
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-14 items-center justify-between">
        <div className="flex items-center">
          <Link to="/" className="mr-6 flex items-center space-x-2">
            <Sparkles className="h-6 w-6 text-charcoal" />
            <span className="font-bold text-charcoal text-lg">DrezRadar</span>
          </Link>
          <nav className="hidden md:flex items-center space-x-4 lg:space-x-6">
            <Link to="/" className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary">
              Home
            </Link>
            <Link to="/profile" className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary">
              Profile
            </Link>
            <Link to="/admin" className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary">
              Admin
            </Link>
          </nav>
        </div>
        <div className="flex items-center space-x-2">
          {/* Future: Auth buttons or user avatar */}
          <div className="md:hidden">
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon">
                  <Menu className="h-5 w-5" />
                  <span className="sr-only">Toggle Menu</span>
                </Button>
              </SheetTrigger>
              <SheetContent side="right">
                <nav className="flex flex-col space-y-4 pt-6">
                  <Link to="/" className="text-lg font-medium hover:text-primary" onClick={() => document.getElementById('sheet-close-button')?.click()}>
                    Home
                  </Link>
                  <Link to="/profile" className="text-lg font-medium hover:text-primary" onClick={() => document.getElementById('sheet-close-button')?.click()}>
                    Profile
                  </Link>
                  <Link to="/admin" className="text-lg font-medium hover:text-primary" onClick={() => document.getElementById('sheet-close-button')?.click()}>
                    Admin
                  </Link>
                </nav>
                <Button id="sheet-close-button" className="hidden"></Button> {/* Hidden button to programmatically close sheet */}
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;