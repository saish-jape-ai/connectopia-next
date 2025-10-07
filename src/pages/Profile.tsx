import { useState } from "react";
import Navbar from "@/components/Navbar";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import PostCard from "@/components/PostCard";
import { MapPin, Calendar, Users } from "lucide-react";

const Profile = () => {
  const [activeTab, setActiveTab] = useState("posts");

  const userPosts = [
    {
      id: 1,
      author: "You",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=You",
      content: "Just joined SocialHub! Excited to connect with everyone here! 🎉",
      timestamp: "3 days ago",
      likes: 15,
      comments: 3,
    },
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <div className="container mx-auto px-4 py-6 max-w-4xl">
        {/* Profile Header */}
        <div className="bg-card rounded-xl shadow-sm border border-border overflow-hidden mb-6">
          {/* Cover Photo */}
          <div className="h-48 bg-gradient-to-r from-primary/20 to-accent/20" />
          
          {/* Profile Info */}
          <div className="p-6">
            <div className="flex flex-col md:flex-row gap-6 items-start md:items-center -mt-20 md:-mt-16">
              <img
                src="https://api.dicebear.com/7.x/avataaars/svg?seed=You"
                alt="Profile"
                className="avatar-lg ring-4 ring-card"
              />
              
              <div className="flex-1">
                <h1 className="text-3xl font-bold mb-2">John Doe</h1>
                <p className="text-muted-foreground mb-4">
                  Living life one day at a time. Coffee enthusiast ☕ | Tech lover 💻 | Travel addict ✈️
                </p>
                
                <div className="flex flex-wrap gap-4 text-sm text-muted-foreground mb-4">
                  <div className="flex items-center gap-2">
                    <MapPin className="w-4 h-4" />
                    <span>San Francisco, CA</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Calendar className="w-4 h-4" />
                    <span>Joined March 2024</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Users className="w-4 h-4" />
                    <span>342 Friends</span>
                  </div>
                </div>
                
                <Button>Edit Profile</Button>
              </div>
            </div>
          </div>
        </div>

        {/* Profile Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="w-full bg-card border border-border rounded-lg p-1">
            <TabsTrigger value="posts" className="flex-1">Posts</TabsTrigger>
            <TabsTrigger value="about" className="flex-1">About</TabsTrigger>
            <TabsTrigger value="friends" className="flex-1">Friends</TabsTrigger>
          </TabsList>

          <div className="mt-6">
            <TabsContent value="posts" className="space-y-4">
              {userPosts.map((post) => (
                <PostCard key={post.id} post={post} />
              ))}
            </TabsContent>

            <TabsContent value="about">
              <div className="bg-card rounded-xl p-6 shadow-sm border border-border">
                <h3 className="text-xl font-semibold mb-4">About</h3>
                <div className="space-y-4 text-muted-foreground">
                  <p>Welcome to my profile! I'm passionate about technology, travel, and connecting with people.</p>
                  <div>
                    <h4 className="font-semibold text-foreground mb-2">Work</h4>
                    <p>Software Engineer at Tech Company</p>
                  </div>
                  <div>
                    <h4 className="font-semibold text-foreground mb-2">Education</h4>
                    <p>Bachelor's in Computer Science</p>
                  </div>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="friends">
              <div className="bg-card rounded-xl p-6 shadow-sm border border-border">
                <h3 className="text-xl font-semibold mb-4">Friends (342)</h3>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                  {[1, 2, 3, 4, 5, 6].map((i) => (
                    <div key={i} className="text-center">
                      <img
                        src={`https://api.dicebear.com/7.x/avataaars/svg?seed=Friend${i}`}
                        alt="Friend"
                        className="avatar-md mx-auto mb-2"
                      />
                      <p className="font-medium text-sm">Friend {i}</p>
                    </div>
                  ))}
                </div>
              </div>
            </TabsContent>
          </div>
        </Tabs>
      </div>
    </div>
  );
};

export default Profile;
