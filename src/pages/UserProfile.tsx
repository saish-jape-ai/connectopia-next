import { useParams } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Sidebar from "@/components/Sidebar";
import { Button } from "@/components/ui/button";
import PostCard from "@/components/PostCard";
import { useState } from "react";

const UserProfile = () => {
  const { username } = useParams();
  const [isFollowing, setIsFollowing] = useState(false);

  // Sample user data based on username
  const userData = {
    name: username || "User",
    avatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=${username}`,
    bio: "Living life one day at a time ✨ | Photography enthusiast 📸 | Travel lover 🌍",
    posts: 156,
    followers: 1234,
    following: 432,
  };

  // Sample posts (LinkedIn-style)
  const userPosts = [
    {
      id: 1,
      author: username || "User",
      avatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=${username}`,
      content: "Excited to share my latest project! Working with amazing technologies 🚀",
      timestamp: "2 days ago",
      likes: 234,
      comments: 12,
      image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&q=80",
    },
    {
      id: 2,
      author: username || "User",
      avatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=${username}`,
      content: "Great discussion at today's tech meetup! Always learning something new 💡",
      timestamp: "5 days ago",
      likes: 187,
      comments: 8,
      image: "https://images.unsplash.com/photo-1511593358241-7eea1f3c84e5?w=800&q=80",
    },
    {
      id: 3,
      author: username || "User",
      avatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=${username}`,
      content: "Proud to announce our team's achievement! Hard work pays off ⭐",
      timestamp: "1 week ago",
      likes: 342,
      comments: 15,
      image: "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=800&q=80",
    },
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <div className="flex">
        <Sidebar />
        
        <div className="flex-1 lg:ml-64">
          <div className="container mx-auto px-4 py-8 max-w-4xl">
        {/* Profile Header */}
        <div className="flex flex-col md:flex-row gap-8 mb-8">
          {/* Profile Picture */}
          <div className="flex justify-center md:justify-start">
            <img
              src={userData.avatar}
              alt={userData.name}
              className="w-32 h-32 md:w-40 md:h-40 rounded-full border-4 border-border"
            />
          </div>

          {/* Profile Info */}
          <div className="flex-1">
            <div className="flex flex-col sm:flex-row items-center sm:items-start gap-4 mb-6">
              <h1 className="text-2xl font-semibold">{userData.name}</h1>
              <div className="flex gap-2">
                <Button
                  variant={isFollowing ? "outline" : "default"}
                  onClick={() => setIsFollowing(!isFollowing)}
                >
                  {isFollowing ? "Following" : "Follow"}
                </Button>
                <Button variant="outline">Message</Button>
              </div>
            </div>

            {/* Stats */}
            <div className="flex justify-center sm:justify-start gap-8 mb-6">
              <div className="text-center sm:text-left">
                <span className="font-semibold text-lg">{userData.posts}</span>
                <span className="text-muted-foreground ml-1">posts</span>
              </div>
              <div className="text-center sm:text-left">
                <span className="font-semibold text-lg">{userData.followers.toLocaleString()}</span>
                <span className="text-muted-foreground ml-1">followers</span>
              </div>
              <div className="text-center sm:text-left">
                <span className="font-semibold text-lg">{userData.following}</span>
                <span className="text-muted-foreground ml-1">following</span>
              </div>
            </div>

            {/* Bio */}
            <p className="text-sm text-center sm:text-left">{userData.bio}</p>
          </div>
        </div>

        {/* Posts Section */}
        <div className="mt-8 space-y-4">
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

export default UserProfile;
