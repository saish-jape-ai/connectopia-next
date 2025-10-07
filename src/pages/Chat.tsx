import { useState } from "react";
import Navbar from "@/components/Navbar";
import Sidebar from "@/components/Sidebar";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Send, Search } from "lucide-react";

interface Message {
  id: number;
  text: string;
  sender: "me" | "other";
  timestamp: string;
}

const Chat = () => {
  const [selectedChat, setSelectedChat] = useState(1);
  const [messageText, setMessageText] = useState("");
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 1,
      text: "Hey! How are you doing?",
      sender: "other",
      timestamp: "10:30 AM",
    },
    {
      id: 2,
      text: "I'm doing great! Just working on some projects. How about you?",
      sender: "me",
      timestamp: "10:32 AM",
    },
    {
      id: 3,
      text: "Same here! Want to grab coffee later?",
      sender: "other",
      timestamp: "10:35 AM",
    },
  ]);

  const friends = [
    { id: 1, name: "Sarah Johnson", avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Sarah", online: true },
    { id: 2, name: "Mike Chen", avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Mike", online: false },
    { id: 3, name: "Emily Rodriguez", avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Emily", online: true },
    { id: 4, name: "Alex Thompson", avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Alex", online: false },
  ];

  const handleSendMessage = () => {
    if (messageText.trim()) {
      const newMessage: Message = {
        id: messages.length + 1,
        text: messageText,
        sender: "me",
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      };
      setMessages([...messages, newMessage]);
      setMessageText("");
    }
  };

  const selectedFriend = friends.find(f => f.id === selectedChat);

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <Sidebar />
      
      <div className="lg:ml-64 pt-20 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="bg-card rounded-xl shadow-sm border border-border overflow-hidden" style={{ height: 'calc(100vh - 140px)' }}>
          <div className="grid grid-cols-1 md:grid-cols-12 h-full">
            {/* Friends List Sidebar */}
            <div className="md:col-span-4 border-r border-border flex flex-col">
              <div className="p-4 border-b border-border">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
                  <Input
                    placeholder="Search messages..."
                    className="pl-10"
                  />
                </div>
              </div>
              
              <div className="flex-1 overflow-y-auto">
                {friends.map((friend) => (
                  <button
                    key={friend.id}
                    onClick={() => setSelectedChat(friend.id)}
                    className={`w-full p-4 flex items-center gap-3 hover:bg-muted/50 transition-colors border-b border-border ${
                      selectedChat === friend.id ? 'bg-muted' : ''
                    }`}
                  >
                    <div className="relative">
                      <img src={friend.avatar} alt={friend.name} className="avatar-md" />
                      {friend.online && (
                        <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-card" />
                      )}
                    </div>
                    <div className="flex-1 text-left">
                      <p className="font-medium">{friend.name}</p>
                      <p className="text-sm text-muted-foreground">
                        {friend.online ? 'Active now' : 'Offline'}
                      </p>
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* Chat Window */}
            <div className="md:col-span-8 flex flex-col">
              {/* Chat Header */}
              <div className="p-4 border-b border-border flex items-center gap-3">
                <img src={selectedFriend?.avatar} alt={selectedFriend?.name} className="avatar-sm" />
                <div>
                  <p className="font-semibold">{selectedFriend?.name}</p>
                  <p className="text-sm text-muted-foreground">
                    {selectedFriend?.online ? 'Active now' : 'Offline'}
                  </p>
                </div>
              </div>

              {/* Messages */}
              <div className="flex-1 overflow-y-auto p-4 space-y-4">
                {messages.map((message) => (
                  <div
                    key={message.id}
                    className={`flex ${message.sender === 'me' ? 'justify-end' : 'justify-start'}`}
                  >
                    <div
                      className={`max-w-xs lg:max-w-md px-4 py-2 rounded-2xl ${
                        message.sender === 'me'
                          ? 'bg-primary text-primary-foreground'
                          : 'bg-muted'
                      }`}
                    >
                      <p>{message.text}</p>
                      <p className={`text-xs mt-1 ${
                        message.sender === 'me' ? 'text-primary-foreground/70' : 'text-muted-foreground'
                      }`}>
                        {message.timestamp}
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Message Input */}
              <div className="p-4 border-t border-border">
                <div className="flex gap-2">
                  <Input
                    placeholder="Type a message..."
                    value={messageText}
                    onChange={(e) => setMessageText(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                    className="flex-1"
                  />
                  <Button onClick={handleSendMessage} size="icon">
                    <Send className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Chat;
