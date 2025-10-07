import { Link, useLocation, useNavigate } from "react-router-dom";
import { Home, MessageCircle, User, LogOut } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";

const Sidebar = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { logout } = useAuth();

  const isActive = (path: string) => location.pathname === path;

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  const menuItems = [
    { icon: Home, label: "Home", path: "/home" },
    { icon: MessageCircle, label: "Messages", path: "/chat" },
    { icon: User, label: "Profile", path: "/profile" },
  ];

  return (
    <div className="fixed left-0 top-16 h-[calc(100vh-4rem)] w-64 bg-card border-r border-border shadow-sm flex flex-col overflow-y-auto z-40">
      <nav className="space-y-1 flex-1 p-4">
        {menuItems.map((item) => (
          <Link
            key={item.label}
            to={item.path}
            className={`w-full flex items-center gap-3 p-3 rounded-lg transition-colors ${
              isActive(item.path)
                ? 'bg-primary/10 text-primary font-medium'
                : 'hover:bg-muted text-foreground'
            }`}
          >
            <item.icon className="w-5 h-5" />
            <span>{item.label}</span>
          </Link>
        ))}
      </nav>

      <div className="p-4 border-t border-border">
        <button
          onClick={handleLogout}
          className="w-full flex items-center gap-3 p-3 rounded-lg hover:bg-destructive/10 text-destructive transition-colors"
        >
          <LogOut className="w-5 h-5" />
          <span className="font-medium">Logout</span>
        </button>
      </div>
    </div>
  );
};

export default Sidebar;
