import { useState } from "react";
import Navbar from "@/components/Navbar";
import Sidebar from "@/components/Sidebar";
import PostCard from "@/components/PostCard";
import CreatePostModal from "@/components/CreatePostModal";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";

interface Post {
  id: number;
  author: string;
  avatar: string;
  content: string;
  timestamp: string;
  likes: number;
  comments: number;
}

const Home = () => {
  const [isCreatePostOpen, setIsCreatePostOpen] = useState(false);
  const [posts, setPosts] = useState<Post[]>([
    {
      id: 1,
      author: "Sarah Johnson",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Sarah",
      content: "Just finished an amazing hike in the mountains! The view was absolutely breathtaking. Can't wait to go back next weekend! 🏔️",
      timestamp: "2 hours ago",
      likes: 24,
      comments: 5,
    },
    {
      id: 2,
      author: "Mike Chen",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Mike",
      content: "Celebrating my team's success on our latest project! Hard work really does pay off. Grateful for this amazing group of people. 🎉",
      timestamp: "5 hours ago",
      likes: 42,
      comments: 8,
    },
    {
      id: 3,
      author: "Emily Rodriguez",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Emily",
      content: "Coffee and coding - the perfect combination for a productive morning! What's your go-to productivity booster? ☕💻",
      timestamp: "1 day ago",
      likes: 18,
      comments: 12,
    },
  ]);

  const handleCreatePost = (content: string) => {
    const newPost: Post = {
      id: posts.length + 1,
      author: "You",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=You",
      content,
      timestamp: "Just now",
      likes: 0,
      comments: 0,
    };
    setPosts([newPost, ...posts]);
    setIsCreatePostOpen(false);
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <div className="container mx-auto px-4 py-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Left Sidebar */}
          <div className="hidden lg:block lg:col-span-3">
            <Sidebar />
          </div>

          {/* Main Feed */}
          <div className="lg:col-span-9 space-y-4 max-w-2xl mx-auto">
            {posts.map((post) => (
              <PostCard key={post.id} post={post} />
            ))}
          </div>
        </div>
      </div>

      {/* Floating Create Post Button */}
      <Button
        onClick={() => setIsCreatePostOpen(true)}
        className="fixed bottom-6 right-6 h-14 w-14 rounded-full shadow-lg hover:shadow-xl transition-all"
        size="icon"
      >
        <Plus className="h-6 w-6" />
      </Button>

      <CreatePostModal
        isOpen={isCreatePostOpen}
        onClose={() => setIsCreatePostOpen(false)}
        onPost={handleCreatePost}
      />
    </div>
  );
};

export default Home;
