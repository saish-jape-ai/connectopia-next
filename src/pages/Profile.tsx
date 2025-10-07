import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "@/components/Navbar";
import { Button } from "@/components/ui/button";
import PostCard from "@/components/PostCard";
import { MapPin, Calendar, Users } from "lucide-react";

const Profile = () => {
  const navigate = useNavigate();
  const [isFollowing, setIsFollowing] = useState(false);

  const userPosts = [
    {
      id: 1,
      author: "You",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=You",
      content: "Just joined SocialHub! Excited to connect with everyone here! 🎉",
      timestamp: "3 days ago",
      likes: 15,
      comments: 3,
    },
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
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
                  <Button 
                    variant={isFollowing ? "outline" : "default"}
                    onClick={() => setIsFollowing(!isFollowing)}
                  >
                    {isFollowing ? "Following" : "Follow"}
                  </Button>
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
  );
};

export default Profile;
