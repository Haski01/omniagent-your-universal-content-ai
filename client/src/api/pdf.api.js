import api from "./axios";

/*
This function ONLY uploads PDF
*/
export const uploadPdf = (formData) => {
  return api.post("/pdf/upload", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
};
