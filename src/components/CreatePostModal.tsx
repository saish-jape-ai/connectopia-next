import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Image, Video, X } from "lucide-react";

interface CreatePostModalProps {
  isOpen: boolean;
  onClose: () => void;
  onPost: (content: string) => void;
}

const CreatePostModal = ({ isOpen, onClose, onPost }: CreatePostModalProps) => {
  const [content, setContent] = useState("");
  const [selectedMedia, setSelectedMedia] = useState<{ type: 'image' | 'video', url: string } | null>(null);

  const handleMediaSelect = (e: React.ChangeEvent<HTMLInputElement>, type: 'image' | 'video') => {
    const file = e.target.files?.[0];
    if (file) {
      const url = URL.createObjectURL(file);
      setSelectedMedia({ type, url });
    }
  };

  const handlePost = () => {
    if (content.trim() || selectedMedia) {
      onPost(content);
      setContent("");
      setSelectedMedia(null);
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

          {selectedMedia && (
            <div className="relative">
              {selectedMedia.type === 'image' ? (
                <img src={selectedMedia.url} alt="Selected" className="w-full rounded-lg max-h-[300px] object-cover" />
              ) : (
                <video src={selectedMedia.url} controls className="w-full rounded-lg max-h-[300px]" />
              )}
              <button
                onClick={() => setSelectedMedia(null)}
                className="absolute top-2 right-2 bg-card/80 hover:bg-card rounded-full p-2"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          )}

          <div className="flex items-center gap-2 border border-border rounded-lg p-3">
            <label className="flex items-center gap-2 cursor-pointer hover:bg-muted px-3 py-2 rounded-lg transition-colors flex-1">
              <Image className="w-5 h-5 text-green-600" />
              <span className="text-sm font-medium">Photo</span>
              <input
                type="file"
                accept="image/*"
                onChange={(e) => handleMediaSelect(e, 'image')}
                className="hidden"
              />
            </label>
            <label className="flex items-center gap-2 cursor-pointer hover:bg-muted px-3 py-2 rounded-lg transition-colors flex-1">
              <Video className="w-5 h-5 text-red-600" />
              <span className="text-sm font-medium">Video</span>
              <input
                type="file"
                accept="video/*"
                onChange={(e) => handleMediaSelect(e, 'video')}
                className="hidden"
              />
            </label>
          </div>

          <div className="flex justify-end gap-2">
            <Button variant="outline" onClick={onClose}>
              Cancel
            </Button>
            <Button
              onClick={handlePost}
              disabled={!content.trim() && !selectedMedia}
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
