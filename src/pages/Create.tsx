import { useState } from "react";
import { AppLayout } from "@/components/layout/AppLayout";
import { TabsCustom } from "@/components/ui/tabs-custom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";

const Create = () => {
  const [activeTab, setActiveTab] = useState("YouTube");
  const [youtubeUrl, setYoutubeUrl] = useState("");

  const handleSummarize = () => {
    if (!youtubeUrl.trim()) {
      toast.error("Please enter a YouTube URL");
      return;
    }
    console.log("Creating from:", youtubeUrl);
    toast.success("Starting creation process...");
  };

  const handleBatchSummarize = () => {
    console.log("Batch create clicked");
    toast.info("Batch creation feature");
  };

  const exploreOptions = [
    { title: "My YouTube Channels", icon: "🏠" },
    { title: "Search YouTube Videos", icon: "🔍" },
    { title: "AI Podcast Generator", icon: "🎙️" },
  ];

  return (
    <AppLayout>
      <div className="p-8 max-w-6xl mx-auto">
        <div className="bg-card border border-border rounded-lg p-6 mb-8">
          <TabsCustom
            tabs={["YouTube", "PDF, Image & More Files", "Audio, Video", "Link", "Long Text"]}
            activeTab={activeTab}
            onTabChange={setActiveTab}
          />
          <div className="mt-6">
            <div className="space-y-4">
              <Input
                placeholder="Enter the YouTube video link, for example: https://www.youtube.com/watch?v=jhEtBuuYNj4"
                value={youtubeUrl}
                onChange={(e) => setYoutubeUrl(e.target.value)}
                className="bg-background border-border"
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
          </div>
        </div>

        <div className="mt-12">
          <h2 className="text-xl font-semibold mb-4 text-primary">Continue Exploring</h2>
          <div className="grid grid-cols-3 gap-4">
            {exploreOptions.map((option) => (
              <div
                key={option.title}
                className="bg-card border border-border rounded-lg p-6 hover:border-primary transition-colors cursor-pointer"
              >
                <div className="text-3xl mb-3">{option.icon}</div>
                <p className="font-medium">{option.title}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </AppLayout>
  );
};

export default Create;
