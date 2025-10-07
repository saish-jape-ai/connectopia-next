import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { ThumbsUp, MessageCircle } from "lucide-react";

interface Post {
  id: number;
  author: string;
  avatar: string;
  content: string;
  timestamp: string;
  likes: number;
  comments: number;
}

interface PostCardProps {
  post: Post;
}

const PostCard = ({ post }: PostCardProps) => {
  const [liked, setLiked] = useState(false);
  const [showComments, setShowComments] = useState(false);
  const [commentText, setCommentText] = useState("");
  const [postComments, setPostComments] = useState<string[]>([]);

  const handleLike = () => {
    setLiked(!liked);
  };

  const handleComment = () => {
    if (commentText.trim()) {
      setPostComments([...postComments, commentText]);
      setCommentText("");
    }
  };

  return (
    <div className="post-card p-6">
      <div className="flex items-start gap-3 mb-4">
        <img src={post.avatar} alt={post.author} className="avatar-md" />
        <div className="flex-1">
          <h3 className="font-semibold">{post.author}</h3>
          <p className="text-sm text-muted-foreground">{post.timestamp}</p>
        </div>
      </div>

      <p className="mb-4 text-foreground">{post.content}</p>

      <div className="flex items-center gap-6 pb-4 border-b border-border">
        <button
          onClick={handleLike}
          className={`flex items-center gap-2 transition-colors ${
            liked ? 'text-primary' : 'text-muted-foreground hover:text-primary'
          }`}
        >
          <ThumbsUp className={`w-5 h-5 ${liked ? 'fill-current' : ''}`} />
          <span>{post.likes + (liked ? 1 : 0)}</span>
        </button>

        <button
          onClick={() => setShowComments(!showComments)}
          className="flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors"
        >
          <MessageCircle className="w-5 h-5" />
          <span>{post.comments + postComments.length}</span>
        </button>
      </div>

      {showComments && (
        <div className="mt-4 space-y-4">
          {postComments.map((comment, index) => (
            <div key={index} className="flex gap-3">
              <img
                src="https://api.dicebear.com/7.x/avataaars/svg?seed=You"
                alt="You"
                className="avatar-sm"
              />
              <div className="flex-1 bg-muted rounded-lg p-3">
                <p className="font-semibold text-sm">You</p>
                <p className="text-sm">{comment}</p>
              </div>
            </div>
          ))}

          <div className="flex gap-3">
            <img
              src="https://api.dicebear.com/7.x/avataaars/svg?seed=You"
              alt="You"
              className="avatar-sm"
            />
            <div className="flex-1">
              <Textarea
                placeholder="Write a comment..."
                value={commentText}
                onChange={(e) => setCommentText(e.target.value)}
                className="min-h-[80px] resize-none"
              />
              <Button
                onClick={handleComment}
                className="mt-2"
                size="sm"
              >
                Post Comment
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PostCard;
