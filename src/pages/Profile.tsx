import { useNavigate } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Sidebar from "@/components/Sidebar";
import { Button } from "@/components/ui/button";
import PostCard from "@/components/PostCard";

const Profile = () => {
  const navigate = useNavigate();

  const userPosts = [
    {
      id: 1,
      author: "John Doe",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=You",
      content: "Just joined SocialHub! Excited to connect with everyone here! 🎉",
      timestamp: "3 days ago",
      likes: 15,
      comments: 3,
      image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&q=80",
    },
    {
      id: 2,
      author: "John Doe",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=You",
      content: "Beautiful sunset today! Nature never fails to amaze me 🌅",
      timestamp: "1 week ago",
      likes: 42,
      comments: 8,
      image: "https://images.unsplash.com/photo-1511593358241-7eea1f3c84e5?w=800&q=80",
    },
    {
      id: 3,
      author: "John Doe",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=You",
      content: "Working on some exciting new projects! Can't wait to share more soon 💻",
      timestamp: "2 weeks ago",
      likes: 28,
      comments: 5,
      image: "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=800&q=80",
    },
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <div className="flex">
        <Sidebar />
        
        <div className="flex-1 lg:ml-64">
          <div className="container mx-auto px-4 py-6 max-w-4xl">
        {/* Profile Header */}
        <div className="bg-card rounded-xl shadow-sm border border-border overflow-hidden mb-6">
          {/* Profile Info */}
          <div className="p-6">
            <div className="flex flex-col md:flex-row gap-6 items-start md:items-center">
              <img
                src="https://api.dicebear.com/7.x/avataaars/svg?seed=You"
                alt="Profile"
                className="avatar-lg"
              />
              
              <div className="flex-1">
                <h1 className="text-3xl font-bold mb-2">John Doe</h1>
                <p className="text-muted-foreground mb-4">
                  Living life one day at a time. Coffee enthusiast ☕ | Tech lover 💻 | Travel addict ✈️
                </p>
                
                <div className="flex flex-wrap gap-4 text-sm mb-4">
                  <div className="flex items-center gap-2">
                    <span className="font-semibold">1,234</span>
                    <span className="text-muted-foreground">Followers</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="font-semibold">342</span>
                    <span className="text-muted-foreground">Friends</span>
                  </div>
                </div>
                
                <div className="flex gap-2">
                  <Button onClick={() => navigate('/edit-profile')}>Edit Profile</Button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Profile Posts */}
        <div className="space-y-4">
          {userPosts.map((post) => (
            <PostCard key={post.id} post={post} />
          ))}
        </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
