import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav className="sticky top-0 z-50 bg-card border-b border-border shadow-sm">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-center h-16">
          <Link to="/home" className="text-2xl font-bold text-primary">
            SocialHub
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
