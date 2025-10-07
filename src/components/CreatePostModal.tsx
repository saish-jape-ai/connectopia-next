import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";

interface CreatePostModalProps {
  isOpen: boolean;
  onClose: () => void;
  onPost: (content: string) => void;
}

const CreatePostModal = ({ isOpen, onClose, onPost }: CreatePostModalProps) => {
  const [content, setContent] = useState("");

  const handlePost = () => {
    if (content.trim()) {
      onPost(content);
      setContent("");
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle>Create Post</DialogTitle>
        </DialogHeader>
        
        <div className="space-y-4">
          <div className="flex items-center gap-3">
            <img
              src="https://api.dicebear.com/7.x/avataaars/svg?seed=You"
              alt="You"
              className="avatar-md"
            />
            <div>
              <p className="font-semibold">John Doe</p>
              <p className="text-sm text-muted-foreground">Public</p>
            </div>
          </div>

          <Textarea
            placeholder="What's on your mind?"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            className="min-h-[150px] resize-none text-lg"
            autoFocus
          />

          <div className="flex justify-end gap-2">
            <Button variant="outline" onClick={onClose}>
              Cancel
            </Button>
            <Button
              onClick={handlePost}
              disabled={!content.trim()}
              className="btn-hero"
            >
              Post
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default CreatePostModal;
