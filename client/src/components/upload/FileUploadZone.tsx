import { Upload, FileText } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import usePdfUpload from "@/hooks/usePdfUpload";

export const FileUploadZone = ({
  accept = ".pdf",
  maxSize = "30MB",
  supportedFormats = "PDF",
}) => {
  const [isDragging, setIsDragging] = useState(false);
  const { uploadFiles, loading } = usePdfUpload();

  const handleDragOver = (e) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragging(false);

    const files = Array.from(e.dataTransfer.files);

    uploadFiles(files); // 🔥 send to backend
  };

  const handleFileInput = (e) => {
    if (e.target.files) {
      const files = Array.from(e.target.files);

      console.log('user uploade file: ', files);
      uploadFiles(files); // 🔥 send to backend
    }
  };

  return (
    <div
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
      className={`border-2 border-dashed rounded-lg p-12 text-center transition-colors ${isDragging ? "border-primary bg-primary/5" : "border-border"
        }`}
    >
      <div className="flex flex-col items-center gap-4">
        <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center">
          <FileText className="w-8 h-8 text-primary" />
        </div>

        <div>
          <p className="text-lg font-medium mb-2">
            Upload or drag a file here
          </p>
          <p className="text-sm text-muted-foreground">
            {supportedFormats} • max {maxSize}
          </p>
        </div>

        <label htmlFor="file-upload">
          <Button asChild disabled={loading}>
            <span>
              <Upload className="w-4 h-4 mr-2" />
              {loading ? "Uploading..." : "Upload to Summarize"}
            </span>
          </Button>
        </label>

        <input
          id="file-upload"
          type="file"
          accept={accept}
          onChange={handleFileInput}
          className="hidden"
        />
      </div>
    </div>
  );
};
