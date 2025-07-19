import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../components/ui/card";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Textarea } from "../components/ui/textarea";
import { Separator } from "../components/ui/separator";
import { PenToolIcon, ArrowLeftIcon } from "lucide-react";

function CreatePosts() {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const createPost = async () => {
    if (!title.trim() || !content.trim()) {
      alert("Please fill in both title and content");
      return;
    }

    setLoading(true);
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        alert("Please login to create a post");
        navigate("/login");
        return;
      }

      await axios.post(
        "http://localhost:5000/api/posts/",
        { title, content },
        {
          headers: {
            Authorization: token,
          },
        }
      );
      
      // Reset form
      setTitle("");
      setContent("");
      
      // Navigate back to posts
      navigate("/");
    } catch (error) {
      console.error("Error creating post:", error);
      alert("Failed to create post. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-3xl mx-auto space-y-8 animate-fade-in">
      {/* Header */}
      <div className="text-center space-y-4">
        <div className="flex items-center justify-center space-x-4 mb-4">
          <Button variant="ghost" size="sm" onClick={() => navigate("/")} className="p-3 rounded-full hover:bg-muted">
            <ArrowLeftIcon className="h-5 w-5" />
          </Button>
          <div className="text-center flex-1">
            <h1 className="text-3xl sm:text-4xl font-bold tracking-tight mb-2">
              <span className="gradient-text">Create</span> Something Amazing
            </h1>
            <p className="text-muted-foreground text-lg">
              Share your thoughts, ideas, or experiences with our community
            </p>
          </div>
        </div>
      </div>

      {/* Create Post Form */}
      <Card className="shadow-xl glass-effect animate-scale-in">
        <CardHeader className="text-center space-y-4">
          <div className="w-16 h-16 mx-auto bg-gradient-to-br from-primary/20 to-primary/10 rounded-full flex items-center justify-center">
            <PenToolIcon className="h-8 w-8 text-primary" />
          </div>
          <CardTitle className="text-2xl">
            Write your post
          </CardTitle>
          <CardDescription className="text-base">
            Make sure your post follows community guidelines and is respectful to others.
            Be creative and authentic!
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-8">
          <div className="space-y-3">
            <label htmlFor="title" className="text-base font-semibold flex items-center space-x-2">
              <span>Title</span>
              <span className="text-destructive">*</span>
            </label>
            <Input
              id="title"
              placeholder="Enter an engaging title that captures attention..."
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="text-lg h-12 focus:border-primary/50 transition-colors"
            />
            {title.length > 0 && (
              <div className="text-sm text-muted-foreground">
                {title.length}/100 characters
              </div>
            )}
          </div>

          <div className="space-y-3">
            <label htmlFor="content" className="text-base font-semibold flex items-center space-x-2">
              <span>Content</span>
              <span className="text-destructive">*</span>
            </label>
            <Textarea
              id="content"
              placeholder="Write your post content here... Share your thoughts, experiences, ask questions, or start a discussion! Be detailed and engaging."
              value={content}
              onChange={(e) => setContent(e.target.value)}
              className="min-h-[250px] text-base resize-none focus:border-primary/50 transition-colors leading-relaxed"
            />
            {content.length > 0 && (
              <div className="flex justify-between text-sm text-muted-foreground">
                <span>{content.length} characters</span>
                <span>~{Math.ceil(content.length / 200)} min read</span>
              </div>
            )}
          </div>

          <div className="flex items-center justify-between pt-6">
            <div className="text-sm text-muted-foreground">
              <span className="font-medium">Pro tip:</span> Use descriptive titles and detailed content for better engagement
            </div>
            <div className="flex space-x-3">
              <Button variant="outline" onClick={() => navigate("/")} size="lg">
                Cancel
              </Button>
              <Button 
                onClick={createPost} 
                disabled={loading || !title.trim() || !content.trim()}
                size="lg"
                className="shadow-lg hover:shadow-xl transition-all duration-200 disabled:opacity-50"
              >
                {loading ? (
                  <>
                    <div className="w-4 h-4 rounded-full animate-spin mr-2"></div>
                    Creating...
                  </>
                ) : (
                  <>
                    <PenToolIcon className="h-4 w-4 mr-2" />
                    Create Post
                  </>
                )}
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

export default CreatePosts;
