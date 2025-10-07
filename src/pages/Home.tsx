import { useState } from "react";
import Navbar from "@/components/Navbar";
import Sidebar from "@/components/Sidebar";
import PostCard from "@/components/PostCard";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Image, Video, Smile } from "lucide-react";

interface Post {
  id: number;
  author: string;
  avatar: string;
  content: string;
  timestamp: string;
  likes: number;
  comments: number;
  image?: string;
}

const Home = () => {
  const [newPostContent, setNewPostContent] = useState("");
  const [posts, setPosts] = useState<Post[]>([
    {
      id: 1,
      author: "Sarah Johnson",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Sarah",
      content: "Just finished an amazing hike in the mountains! The view was absolutely breathtaking. Can't wait to go back next weekend! 🏔️",
      timestamp: "2 hours ago",
      likes: 24,
      comments: 5,
      image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&q=80",
    },
    {
      id: 2,
      author: "Mike Chen",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Mike",
      content: "Celebrating my team's success on our latest project! Hard work really does pay off. Grateful for this amazing group of people. 🎉",
      timestamp: "5 hours ago",
      likes: 42,
      comments: 8,
      image: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=800&q=80",
    },
    {
      id: 3,
      author: "Emily Rodriguez",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Emily",
      content: "Coffee and coding - the perfect combination for a productive morning! What's your go-to productivity booster? ☕💻",
      timestamp: "1 day ago",
      likes: 18,
      comments: 12,
      image: "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=800&q=80",
    },
  ]);

  const handleCreatePost = () => {
    if (newPostContent.trim()) {
      const newPost: Post = {
        id: posts.length + 1,
        author: "You",
        avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=You",
        content: newPostContent,
        timestamp: "Just now",
        likes: 0,
        comments: 0,
      };
      setPosts([newPost, ...posts]);
      setNewPostContent("");
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <div className="flex">
        {/* Fixed Sidebar */}
        <div className="hidden lg:block lg:w-64 fixed left-0 top-16 h-[calc(100vh-4rem)]">
          <Sidebar />
        </div>

        {/* Main Content - with left margin to account for fixed sidebar */}
        <div className="flex-1 lg:ml-64">
          <div className="container mx-auto px-4 py-6 max-w-2xl">
            {/* Create Post Section */}
            <div className="post-card p-4 mb-4">
              <div className="flex gap-3">
                <img
                  src="https://api.dicebear.com/7.x/avataaars/svg?seed=You"
                  alt="Your profile"
                  className="avatar-md"
                />
                <Textarea
                  placeholder="What's on your mind?"
                  value={newPostContent}
                  onChange={(e) => setNewPostContent(e.target.value)}
                  className="flex-1 min-h-[60px] resize-none"
                />
              </div>
              <div className="flex items-center justify-between mt-3 pt-3 border-t border-border">
                <div className="flex gap-2">
                  <Button variant="ghost" size="sm" className="gap-2">
                    <Image className="w-5 h-5" />
                    Photo
                  </Button>
                  <Button variant="ghost" size="sm" className="gap-2">
                    <Video className="w-5 h-5" />
                    Video
                  </Button>
                  <Button variant="ghost" size="sm" className="gap-2">
                    <Smile className="w-5 h-5" />
                    Feeling
                  </Button>
                </div>
                <Button onClick={handleCreatePost} disabled={!newPostContent.trim()}>
                  Post
                </Button>
              </div>
            </div>

            {/* Posts Feed */}
            <div className="space-y-4">
              {posts.map((post) => (
                <PostCard key={post.id} post={post} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
