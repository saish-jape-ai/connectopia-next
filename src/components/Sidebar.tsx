import { Users, Calendar, Bookmark, Settings } from "lucide-react";

const Sidebar = () => {
  const menuItems = [
    { icon: Users, label: "Friends", count: 342 },
    { icon: Calendar, label: "Events", count: 3 },
    { icon: Bookmark, label: "Saved", count: 12 },
    { icon: Settings, label: "Settings" },
  ];

  return (
    <div className="bg-card rounded-xl p-6 shadow-sm border border-border sticky top-20">
      <div className="flex items-center gap-3 mb-6">
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

      <nav className="space-y-2">
        {menuItems.map((item) => (
          <button
            key={item.label}
            className="w-full flex items-center justify-between p-3 rounded-lg hover:bg-muted transition-colors text-left"
          >
            <div className="flex items-center gap-3">
              <item.icon className="w-5 h-5 text-primary" />
              <span className="font-medium">{item.label}</span>
            </div>
            {item.count && (
              <span className="text-sm text-muted-foreground">{item.count}</span>
            )}
          </button>
        ))}
      </nav>
    </div>
  );
};

export default Sidebar;
