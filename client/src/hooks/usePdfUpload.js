import { useState } from "react";
import { toast } from "sonner";
import { uploadPdf } from "../api/pdf.api";

/*
This hook controls:
- loading
- calling backend
- success / error
*/
const usePdfUpload = () => {
  const [loading, setLoading] = useState(false);

  /*
  Called when user selects or drops files
  */
  const uploadFiles = async (files) => {
    if (!files.length) return;

    const formData = new FormData();

    // Backend expects "file"
    formData.append("file", files[0]);

    try {
      setLoading(true);
      await uploadPdf(formData);
      toast.success("PDF uploaded and processed successfully");
    } catch (error) {
      console.error(error);
      toast.error("Failed to upload PDF");
    } finally {
      setLoading(false);
    }
  };

  return { uploadFiles, loading };
};

export default usePdfUpload;
