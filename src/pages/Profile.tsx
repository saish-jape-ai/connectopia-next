import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Sidebar from "@/components/Sidebar";
import { Button } from "@/components/ui/button";
import PostCard from "@/components/PostCard";
import { useAuth } from "@/contexts/AuthContext";
import { userAPI } from "@/services/api";

const Profile = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [userPosts, setUserPosts] = useState<any[]>([]);
  const [profileData, setProfileData] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadProfile();
  }, [user]);

  const loadProfile = async () => {
    if (!user?.username) return;
    
    setLoading(true);
    try {
      // Load user profile
      const profile = await userAPI.getProfile(user.username);
      setProfileData(profile);
      
      // Load user posts
      const posts = await userAPI.getUserPosts(user.username);
      const transformedPosts = posts.map((post: any) => ({
        id: post.id,
        author: user.username,
        avatar: profile.profile_picture || `https://api.dicebear.com/7.x/avataaars/svg?seed=${user.username}`,
        content: post.text,
        timestamp: new Date(post.created_at).toLocaleDateString(),
        likes: post.likes_count,
        comments: post.comments_count,
        image: post.media_data ? `data:${post.media_type};base64,${post.media_data}` : undefined,
      }));
      setUserPosts(transformedPosts);
    } catch (error) {
      // Use mock data on error
      setProfileData({
        username: user.username,
        bio: "Living life one day at a time. Coffee enthusiast ☕ | Tech lover 💻 | Travel addict ✈️",
        followers_count: 1234,
        following_count: 342,
      });
      setUserPosts([
        {
          id: 1,
          author: user.username,
          avatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=${user.username}`,
          content: "Just joined SocialHub! Excited to connect with everyone here! 🎉",
          timestamp: "3 days ago",
          likes: 15,
          comments: 3,
          image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&q=80",
        },
      ]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <div className="flex">
        <Sidebar />
        
        <div className="flex-1 lg:ml-64">
          <div className="container mx-auto px-4 py-6 max-w-4xl">
            {/* Profile Header */}
            <div className="bg-card rounded-xl shadow-sm border border-border overflow-hidden mb-6">
              <div className="p-6">
                <div className="flex flex-col md:flex-row gap-6 items-start md:items-center">
                  <img
                    src={profileData?.profile_picture || `https://api.dicebear.com/7.x/avataaars/svg?seed=${user?.username}`}
                    alt="Profile"
                    className="avatar-lg"
                  />
                  
                  <div className="flex-1">
                    <h1 className="text-3xl font-bold mb-2">{profileData?.username || user?.username}</h1>
                    <p className="text-muted-foreground mb-4">
                      {profileData?.bio || "No bio yet"}
                    </p>
                    
                    <div className="flex flex-wrap gap-4 text-sm mb-4">
                      <div className="flex items-center gap-2">
                        <span className="font-semibold">{profileData?.followers_count || 0}</span>
                        <span className="text-muted-foreground">Followers</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="font-semibold">{profileData?.following_count || 0}</span>
                        <span className="text-muted-foreground">Following</span>
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
            {loading ? (
              <div className="text-center py-8">
                <p className="text-muted-foreground">Loading posts...</p>
              </div>
            ) : (
              <div className="space-y-4">
                {userPosts.map((post) => (
                  <PostCard key={post.id} post={post} onUpdate={loadProfile} />
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
