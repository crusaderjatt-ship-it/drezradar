import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Radar } from "lucide-react";

const Header = () => {
  return (
    <header className="sticky top-0 z-40 w-full border-b bg-background/80 backdrop-blur-sm">
      <div className="container flex h-16 items-center justify-between">
        <Link to="/" className="flex items-center space-x-2">
          <Radar className="h-6 w-6 text-drez-charcoal" />
          <span className="font-bold text-lg text-drez-charcoal">DrezRadar</span>
        </Link>
        <nav className="flex items-center space-x-4">
          <Button variant="ghost" asChild>
            <Link to="/">Home</Link>
          </Button>
          <Button variant="ghost" asChild>
            <Link to="/profile">Profile</Link>
          </Button>
          <Button variant="ghost" asChild>
            <Link to="/admin">Admin</Link>
          </Button>
        </nav>
      </div>
    </header>
  );
};

export default Header;