import { useState } from "react";
import { AppLayout } from "@/components/layout/AppLayout";
import { TabsCustom } from "@/components/ui/tabs-custom";
import { FileUploadZone } from "@/components/upload/FileUploadZone";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import { Video, FileText, Link as LinkIcon, FileTextIcon } from "lucide-react";

const Home = () => {
  const [activeTab, setActiveTab] = useState("YouTube");
  const [youtubeUrl, setYoutubeUrl] = useState("");

  const handleSummarize = () => {
    if (!youtubeUrl.trim()) {
      toast.error("Please enter a YouTube URL");
      return;
    }
    console.log("Summarizing:", youtubeUrl);
    toast.success("Starting summarization...");
  };

  const handleBatchSummarize = () => {
    console.log("Batch summarize clicked");
    toast.info("Batch summarization feature");
  };

  const renderTabContent = () => {
    switch (activeTab) {
      case "YouTube":
        return (
          <div className="space-y-4">
            <Input
              placeholder="Enter the YouTube video link, for example: https://www.youtube.com/watch?v=jhEtBuuYNj4"
              value={youtubeUrl}
              onChange={(e) => setYoutubeUrl(e.target.value)}
              className="bg-card border-border"
            />
            <div className="flex gap-4">
              <Button onClick={handleSummarize} className="flex-1">
                Summarize Now
              </Button>
              <Button onClick={handleBatchSummarize} variant="outline" className="flex-1">
                Batch Summarize
              </Button>
            </div>
          </div>
        );
      
      case "PDF, Image & More Files":
        return <FileUploadZone />;
      
      case "Audio, Video":
        return (
          <FileUploadZone
            accept="audio/*,video/*"
            maxSize="40MB"
            supportedFormats="Audio, Video"
          />
        );
      
      default:
        return null;
    }
  };

  const quickActions = [
    { icon: Video, title: "YouTube", color: "text-red-500" },
    { icon: FileText, title: "AI Chat", color: "text-blue-500" },
    { icon: FileTextIcon, title: "Presentation", color: "text-purple-500" },
    { icon: FileText, title: "AI PDF", color: "text-green-500" },
  ];

  return (
    <AppLayout>
      <div className="p-8 max-w-6xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">
            👋 Hi~ Let me help you get started!
          </h1>
        </div>

        <div className="grid grid-cols-4 gap-4 mb-8">
          {quickActions.map((action) => (
            <div
              key={action.title}
              className="bg-card border border-border rounded-lg p-6 hover:border-primary transition-colors cursor-pointer"
            >
              <action.icon className={`w-8 h-8 mb-3 ${action.color}`} />
              <p className="text-sm font-medium">{action.title}</p>
            </div>
          ))}
        </div>

        <div className="bg-card border border-border rounded-lg p-6">
          <TabsCustom
            tabs={["YouTube", "PDF, Image & More Files", "Audio, Video", "Link", "Long Text"]}
            activeTab={activeTab}
            onTabChange={setActiveTab}
          />
          <div className="mt-6">
            {renderTabContent()}
          </div>
        </div>

        <div className="mt-12">
          <h2 className="text-xl font-semibold mb-4 text-primary">Continue Exploring</h2>
          <div className="grid grid-cols-3 gap-4">
            <div className="bg-card border border-border rounded-lg p-6 hover:border-primary transition-colors cursor-pointer">
              <p className="font-medium">Webpage Example</p>
              <p className="text-sm text-muted-foreground mt-2">NoteGPT Official Website</p>
            </div>
            <div className="bg-card border border-border rounded-lg p-6 hover:border-primary transition-colors cursor-pointer">
              <p className="font-medium">PDF Example</p>
              <p className="text-sm text-muted-foreground mt-2">DeepPDF - A Deep Learning</p>
            </div>
            <div className="bg-card border border-border rounded-lg p-6 hover:border-primary transition-colors cursor-pointer">
              <p className="font-medium">Audio Example</p>
              <p className="text-sm text-muted-foreground mt-2">Practical Tips and Case Studies</p>
            </div>
          </div>
        </div>
      </div>
    </AppLayout>
  );
};

export default Home;
