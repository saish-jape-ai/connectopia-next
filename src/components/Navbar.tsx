import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Home, MessageCircle, User, LogOut } from "lucide-react";

const Navbar = () => {
  const location = useLocation();

  const isActive = (path: string) => location.pathname === path;

  return (
    <nav className="sticky top-0 z-50 bg-card border-b border-border shadow-sm">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <Link to="/home" className="text-2xl font-bold text-primary">
            SocialHub
          </Link>

          <div className="flex items-center gap-2">
            <Link to="/home">
              <Button
                variant={isActive("/home") ? "default" : "ghost"}
                size="icon"
                className="relative"
              >
                <Home className="h-5 w-5" />
              </Button>
            </Link>

            <Link to="/chat">
              <Button
                variant={isActive("/chat") ? "default" : "ghost"}
                size="icon"
              >
                <MessageCircle className="h-5 w-5" />
              </Button>
            </Link>

            <Link to="/profile">
              <Button
                variant={isActive("/profile") ? "default" : "ghost"}
                size="icon"
              >
                <User className="h-5 w-5" />
              </Button>
            </Link>

            <Link to="/">
              <Button variant="ghost" size="icon">
                <LogOut className="h-5 w-5" />
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
