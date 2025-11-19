import { Upload, FileText } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { toast } from "sonner";

interface FileUploadZoneProps {
  accept?: string;
  maxSize?: string;
  supportedFormats?: string;
}

export const FileUploadZone = ({ 
  accept = ".pdf,.jpg,.png,.ppt,.doc,.txt",
  maxSize = "30MB",
  supportedFormats = "PDF, Image, PPT, Word, TXT"
}: FileUploadZoneProps) => {
  const [isDragging, setIsDragging] = useState(false);

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    const files = Array.from(e.dataTransfer.files);
    handleFiles(files);
  };

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const files = Array.from(e.target.files);
      handleFiles(files);
    }
  };

  const handleFiles = (files: File[]) => {
    console.log("Files uploaded:", files);
    toast.success(`${files.length} file(s) ready for processing`);
  };

  return (
    <div
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
      className={`border-2 border-dashed rounded-lg p-12 text-center transition-colors ${
        isDragging ? "border-primary bg-primary/5" : "border-border"
      }`}
    >
      <div className="flex flex-col items-center gap-4">
        <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center">
          <FileText className="w-8 h-8 text-primary" />
        </div>
        <div>
          <p className="text-lg font-medium text-foreground mb-2">
            Upload or drag a file here
          </p>
          <p className="text-sm text-muted-foreground">
            {supportedFormats}: max {maxSize}
          </p>
          <button className="text-xs text-primary hover:underline mt-1">
            Supported file formats
          </button>
        </div>
        <label htmlFor="file-upload">
          <Button asChild className="cursor-pointer">
            <span>
              <Upload className="w-4 h-4 mr-2" />
              Upload to Summarize
            </span>
          </Button>
        </label>
        <input
          id="file-upload"
          type="file"
          accept={accept}
          multiple
          onChange={handleFileInput}
          className="hidden"
        />
      </div>
    </div>
  );
};
