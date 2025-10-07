import { Link, useLocation } from "react-router-dom";
import { Home, MessageCircle, User, LogOut } from "lucide-react";

const Sidebar = () => {
  const location = useLocation();

  const isActive = (path: string) => location.pathname === path;

  const menuItems = [
    { icon: Home, label: "Home", path: "/home" },
    { icon: MessageCircle, label: "Messages", path: "/chat" },
    { icon: User, label: "Profile", path: "/profile" },
  ];

  return (
    <div className="bg-card rounded-xl p-4 shadow-sm border border-border sticky top-20 h-[calc(100vh-6rem)] flex flex-col">
      <div className="flex items-center gap-3 mb-6 p-2">
        <img
          src="https://api.dicebear.com/7.x/avataaars/svg?seed=You"
          alt="Profile"
          className="avatar-md"
        />
        <div>
          <p className="font-semibold">John Doe</p>
          <p className="text-sm text-muted-foreground">View profile</p>
        </div>
      </div>

      <nav className="space-y-1 flex-1">
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

      <Link
        to="/"
        className="flex items-center gap-3 p-3 rounded-lg hover:bg-destructive/10 text-destructive transition-colors mt-auto"
      >
        <LogOut className="w-5 h-5" />
        <span className="font-medium">Logout</span>
      </Link>
    </div>
  );
};

export default Sidebar;
