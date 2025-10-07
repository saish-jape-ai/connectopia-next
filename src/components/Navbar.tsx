import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav className="sticky top-0 z-50 bg-card border-b border-border shadow-sm">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <Link to="/home" className="text-2xl font-bold text-primary">
            SocialHub
          </Link>
          
          <Link to="/profile" className="flex items-center gap-2 hover:opacity-80 transition-opacity">
            <img
              src="https://api.dicebear.com/7.x/avataaars/svg?seed=You"
              alt="Profile"
              className="avatar-sm"
            />
            <span className="font-semibold hidden sm:inline">John Doe</span>
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
