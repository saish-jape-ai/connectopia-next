import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Sidebar from "@/components/Sidebar";
import { Button } from "@/components/ui/button";
import PostCard from "@/components/PostCard";
import { userAPI } from "@/services/api";

const UserProfile = () => {
  const { username } = useParams<{ username: string }>();
  const [isFollowing, setIsFollowing] = useState(false);
  const [userData, setUserData] = useState<any>(null);
  const [userPosts, setUserPosts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadUserProfile();
  }, [username]);

  const loadUserProfile = async () => {
    if (!username) return;
    
    setLoading(true);
    try {
      const profile = await userAPI.getProfile(username);
      setUserData(profile);
      
      const posts = await userAPI.getUserPosts(username);
      const transformedPosts = posts.map((post: any) => ({
        id: post.id,
        author: username,
        avatar: profile.profile_picture || `https://api.dicebear.com/7.x/avataaars/svg?seed=${username}`,
        content: post.text,
        timestamp: new Date(post.created_at).toLocaleDateString(),
        likes: post.likes_count,
        comments: post.comments_count,
        image: post.media_data ? `data:${post.media_type};base64,${post.media_data}` : undefined,
      }));
      setUserPosts(transformedPosts);
    } catch (error) {
      // Use mock data on error
      setUserData({
        username: username,
        bio: "Tech enthusiast | Coffee lover ☕ | Always learning something new",
        followers_count: 523,
        following_count: 187,
      });
      setUserPosts([
        {
          id: 1,
          author: username,
          avatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=${username}`,
          content: "Excited to share my latest project with everyone!",
          timestamp: "2 days ago",
          likes: 45,
          comments: 12,
          image: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=800&q=80",
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
                    src={userData?.profile_picture || `https://api.dicebear.com/7.x/avataaars/svg?seed=${username}`}
                    alt={username}
                    className="avatar-lg"
                  />
                  
                  <div className="flex-1">
                    <h1 className="text-3xl font-bold mb-2">{userData?.username || username}</h1>
                    <p className="text-muted-foreground mb-4">
                      {userData?.bio || "No bio yet"}
                    </p>
                    
                    <div className="flex flex-wrap gap-4 text-sm mb-4">
                      <div className="flex items-center gap-2">
                        <span className="font-semibold">{userData?.followers_count || 0}</span>
                        <span className="text-muted-foreground">Followers</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="font-semibold">{userData?.following_count || 0}</span>
                        <span className="text-muted-foreground">Following</span>
                      </div>
                    </div>
                    
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

            {/* User Posts */}
            {loading ? (
              <div className="text-center py-8">
                <p className="text-muted-foreground">Loading posts...</p>
              </div>
            ) : (
              <div className="space-y-4">
                {userPosts.map((post) => (
                  <PostCard key={post.id} post={post} onUpdate={loadUserProfile} />
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
