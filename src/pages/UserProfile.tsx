import { useParams, useNavigate } from "react-router-dom";
import Navbar from "@/components/Navbar";
import { Button } from "@/components/ui/button";
import { Grid3x3, Bookmark, UserSquare2 } from "lucide-react";
import { useState } from "react";

const UserProfile = () => {
  const { username } = useParams();
  const navigate = useNavigate();
  const [isFollowing, setIsFollowing] = useState(false);
  const [activeTab, setActiveTab] = useState("posts");

  // Sample user data based on username
  const userData = {
    name: username || "User",
    avatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=${username}`,
    bio: "Living life one day at a time ✨ | Photography enthusiast 📸 | Travel lover 🌍",
    posts: 156,
    followers: 1234,
    following: 432,
  };

  // Sample posts (Instagram-style grid)
  const userPosts = [
    { id: 1, image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&q=80", likes: 234 },
    { id: 2, image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&q=80", likes: 187 },
    { id: 3, image: "https://images.unsplash.com/photo-1511593358241-7eea1f3c84e5?w=400&q=80", likes: 342 },
    { id: 4, image: "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=400&q=80", likes: 456 },
    { id: 5, image: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=400&q=80", likes: 289 },
    { id: 6, image: "https://images.unsplash.com/photo-1516483638261-f4dbaf036963?w=400&q=80", likes: 512 },
    { id: 7, image: "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?w=400&q=80", likes: 378 },
    { id: 8, image: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=400&q=80", likes: 423 },
    { id: 9, image: "https://images.unsplash.com/photo-1487058792275-0ad4aaf24ca7?w=400&q=80", likes: 156 },
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
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

        {/* Tabs */}
        <div className="border-t border-border">
          <div className="flex justify-center gap-12">
            <button
              onClick={() => setActiveTab("posts")}
              className={`flex items-center gap-2 py-4 border-t-2 transition-colors ${
                activeTab === "posts"
                  ? "border-foreground text-foreground"
                  : "border-transparent text-muted-foreground"
              }`}
            >
              <Grid3x3 className="w-5 h-5" />
              <span className="text-sm font-semibold uppercase hidden sm:inline">Posts</span>
            </button>
            <button
              onClick={() => setActiveTab("saved")}
              className={`flex items-center gap-2 py-4 border-t-2 transition-colors ${
                activeTab === "saved"
                  ? "border-foreground text-foreground"
                  : "border-transparent text-muted-foreground"
              }`}
            >
              <Bookmark className="w-5 h-5" />
              <span className="text-sm font-semibold uppercase hidden sm:inline">Saved</span>
            </button>
            <button
              onClick={() => setActiveTab("tagged")}
              className={`flex items-center gap-2 py-4 border-t-2 transition-colors ${
                activeTab === "tagged"
                  ? "border-foreground text-foreground"
                  : "border-transparent text-muted-foreground"
              }`}
            >
              <UserSquare2 className="w-5 h-5" />
              <span className="text-sm font-semibold uppercase hidden sm:inline">Tagged</span>
            </button>
          </div>
        </div>

        {/* Posts Grid */}
        <div className="grid grid-cols-3 gap-1 mt-4">
          {userPosts.map((post) => (
            <div key={post.id} className="aspect-square relative group cursor-pointer overflow-hidden">
              <img
                src={post.image}
                alt={`Post ${post.id}`}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                <span className="text-white font-semibold">❤️ {post.likes}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
