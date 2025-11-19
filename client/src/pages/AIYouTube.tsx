import { AppLayout } from "@/components/layout/AppLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";

const AIYouTube = () => {
  return (
    <AppLayout>
      <div className="p-8 max-w-6xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-4">AI YouTube</h1>
          <p className="text-muted-foreground">
            Analyze and summarize YouTube videos with AI
          </p>
        </div>

        <div className="bg-card border border-border rounded-lg p-6 mb-8">
          <div className="flex gap-2">
            <Input
              placeholder="Search YouTube videos or paste a URL..."
              className="flex-1"
            />
            <Button>
              <Search className="w-4 h-4 mr-2" />
              Search
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-4">
          {[1, 2, 3].map((i) => (
            <div
              key={i}
              className="bg-card border border-border rounded-lg p-6 hover:border-primary transition-colors"
            >
              <div className="flex gap-4">
                <div className="w-40 h-24 bg-muted rounded flex items-center justify-center">
                  <span className="text-muted-foreground">Thumbnail</span>
                </div>
                <div className="flex-1">
                  <h3 className="font-semibold mb-2">Video Title {i}</h3>
                  <p className="text-sm text-muted-foreground mb-2">
                    Video description and details go here...
                  </p>
                  <Button size="sm" variant="outline">
                    Summarize
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </AppLayout>
  );
};

export default AIYouTube;
