import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { ThumbsUp, MessageCircle } from "lucide-react";
import { postAPI } from "@/services/api";
import { useToast } from "@/hooks/use-toast";

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

interface Comment {
  comment_id: number;
  text: string;
  created_at: string;
  creator: {
    username: string;
    profile_picture?: string;
  };
}

interface PostCardProps {
  post: Post;
  onUpdate?: () => void;
}

const PostCard = ({ post, onUpdate }: PostCardProps) => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [liked, setLiked] = useState(false);
  const [likesCount, setLikesCount] = useState(post.likes);
  const [showComments, setShowComments] = useState(false);
  const [commentText, setCommentText] = useState("");
  const [postComments, setPostComments] = useState<Comment[]>([]);
  const [commentsCount, setCommentsCount] = useState(post.comments);

  const loadComments = async () => {
    try {
      const data = await postAPI.getComments(post.id);
      setPostComments(data.comments);
      setCommentsCount(data.comments.length);
    } catch (error) {
      console.error("Failed to load comments");
    }
  };

  useEffect(() => {
    if (showComments) {
      loadComments();
    }
  }, [showComments]);

  const handleLike = async () => {
    try {
      const response = await postAPI.like(post.id);
      setLiked(!liked);
      setLikesCount(response.likes_count);
    } catch (error) {
      toast({
        title: "Failed to like post",
        description: "Please try again",
        variant: "destructive",
      });
    }
  };

  const handleComment = async () => {
    if (commentText.trim()) {
      try {
        await postAPI.addComment(post.id, commentText);
        setCommentText("");
        await loadComments();
        toast({
          title: "Comment added!",
        });
      } catch (error) {
        toast({
          title: "Failed to add comment",
          description: "Please try again",
          variant: "destructive",
        });
      }
    }
  };

  const handleUserClick = () => {
    navigate(`/user/${encodeURIComponent(post.author)}`);
  };

  const toggleComments = () => {
    setShowComments(!showComments);
  };

  return (
    <div className="post-card p-6">
      <div className="flex items-start gap-3 mb-4">
        <img 
          src={post.avatar} 
          alt={post.author} 
          className="avatar-md cursor-pointer hover:opacity-80 transition-opacity" 
          onClick={handleUserClick}
        />
        <div className="flex-1">
          <h3 
            className="font-semibold cursor-pointer hover:text-primary transition-colors"
            onClick={handleUserClick}
          >
            {post.author}
          </h3>
          <p className="text-sm text-muted-foreground">{post.timestamp}</p>
        </div>
      </div>

      <p className="mb-4 text-foreground">{post.content}</p>

      {post.image && (
        <img 
          src={post.image} 
          alt="Post content" 
          className="w-full rounded-lg mb-4 object-cover max-h-[500px]"
        />
      )}

      <div className="flex items-center gap-6 pb-4 border-b border-border">
        <button
          onClick={handleLike}
          className={`flex items-center gap-2 transition-colors ${
            liked ? 'text-primary' : 'text-muted-foreground hover:text-primary'
          }`}
        >
          <ThumbsUp className={`w-5 h-5 ${liked ? 'fill-current' : ''}`} />
          <span>{likesCount}</span>
        </button>

        <button
          onClick={toggleComments}
          className="flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors"
        >
          <MessageCircle className="w-5 h-5" />
          <span>{commentsCount}</span>
        </button>
      </div>

      {showComments && (
        <div className="mt-4 space-y-4">
          {postComments.map((comment) => (
            <div key={comment.comment_id} className="flex gap-3">
              <img
                src={comment.creator.profile_picture || `https://api.dicebear.com/7.x/avataaars/svg?seed=${comment.creator.username}`}
                alt={comment.creator.username}
                className="avatar-sm"
              />
              <div className="flex-1 bg-muted rounded-lg p-3">
                <p className="font-semibold text-sm">{comment.creator.username}</p>
                <p className="text-sm">{comment.text}</p>
                <p className="text-xs text-muted-foreground mt-1">
                  {new Date(comment.created_at).toLocaleDateString()}
                </p>
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
