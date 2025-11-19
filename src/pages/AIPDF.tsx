import { AppLayout } from "@/components/layout/AppLayout";
import { FileUploadZone } from "@/components/upload/FileUploadZone";
import { Button } from "@/components/ui/button";
import { FileText, Trash2 } from "lucide-react";

const AIPDF = () => {
  const recentFiles = [
    { name: "Document1.pdf", size: "2.4 MB", date: "2025-11-18" },
    { name: "Research.pdf", size: "5.1 MB", date: "2025-11-17" },
    { name: "Report.pdf", size: "1.8 MB", date: "2025-11-16" },
  ];

  return (
    <AppLayout>
      <div className="p-8 max-w-6xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-4">AI PDF</h1>
          <p className="text-muted-foreground">
            Upload and analyze PDF documents with AI
          </p>
        </div>

        <div className="bg-card border border-border rounded-lg p-6 mb-8">
          <FileUploadZone
            accept=".pdf"
            maxSize="30MB"
            supportedFormats="PDF"
          />
        </div>

        <div className="mt-8">
          <h2 className="text-xl font-semibold mb-4">Recent Files</h2>
          <div className="space-y-3">
            {recentFiles.map((file, i) => (
              <div
                key={i}
                className="bg-card border border-border rounded-lg p-4 flex items-center justify-between hover:border-primary transition-colors"
              >
                <div className="flex items-center gap-3">
                  <FileText className="w-8 h-8 text-primary" />
                  <div>
                    <p className="font-medium">{file.name}</p>
                    <p className="text-sm text-muted-foreground">
                      {file.size} • {file.date}
                    </p>
                  </div>
                </div>
                <div className="flex gap-2">
                  <Button size="sm" variant="outline">
                    Open
                  </Button>
                  <Button size="sm" variant="ghost">
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </AppLayout>
  );
};

export default AIPDF;
