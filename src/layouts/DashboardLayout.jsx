import React, { useRef, useState, useEffect } from "react";
import Header from "../components/header/Header";
import FileUpload from "../components/fileUpload/FileUpload";
import { pdfjs } from "react-pdf";
import InvoiceForm from "../components/invoiceForm/InvoiceForm";

pdfjs.GlobalWorkerOptions.workerSrc = `https://cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.min.mjs`;

const DashboardLayout = () => {
  const [file, setFile] = useState(null);
  const [numPages, setNumPages] = useState(null);
  const fileInputRef = useRef();

  const [formData, setFormData] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleFormSubmit = (values) => {
    setIsSubmitting(true);
    setTimeout(() => {
      console.log("Submitted Data:", values);
      localStorage.setItem("invoiceFormData", JSON.stringify(values));
      setFormData(values);
      setIsSubmitting(false);
    }, 1000);
  };

  useEffect(() => {
    const savedFormData = localStorage.getItem("invoiceFormData");
    if (savedFormData) {
      setFormData(JSON.parse(savedFormData));
    }

    const savedPdfBase64 = localStorage.getItem("uploadedPdfBase64");
    if (savedPdfBase64) {
      const byteCharacters = atob(savedPdfBase64);
      const byteArrays = [];

      for (let offset = 0; offset < byteCharacters.length; offset += 512) {
        const slice = byteCharacters.slice(offset, offset + 512);
        const byteNumbers = new Array(slice.length);
        for (let i = 0; i < slice.length; i++) {
          byteNumbers[i] = slice.charCodeAt(i);
        }
        byteArrays.push(new Uint8Array(byteNumbers));
      }

      const blob = new Blob(byteArrays, { type: "application/pdf" });
      const file = new File([blob], "restored-file.pdf", {
        type: "application/pdf",
      });
      setFile(file);
    }
  }, []);

  const convertToBase64 = (file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => {
        const base64String = reader.result.split(",")[1]; // Remove the prefix
        resolve(base64String);
      };
      reader.onerror = reject;
      reader.readAsDataURL(file);
    });
  };

  const handleFileChange = async (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile && selectedFile.type === "application/pdf") {
      const base64 = await convertToBase64(selectedFile);
      localStorage.setItem("uploadedPdfBase64", base64);
      setFile(selectedFile);
    } else {
      alert("Please select a valid PDF file.");
      setFile(null);
    }
  };

  const onDocumentLoadSuccess = ({ numPages }) => {
    setNumPages(numPages);
  };

  const triggerFileInput = () => {
    fileInputRef.current?.click();
  };

  const handleDeselectFile = () => {
    setFile(null);
    setNumPages(null);
    localStorage.removeItem("uploadedPdfBase64");
  };

  return (
    <section className="bg-[#dcd6cc] min-h-screen">
      <Header />
      <div className="flex flex-row justify-center items-start gap-4 px-4 py-6">
        <div className="w-1/2">
          <FileUpload
            file={file}
            numPages={numPages}
            handleFileChange={handleFileChange}
            onDocumentLoadSuccess={onDocumentLoadSuccess}
            triggerFileInput={triggerFileInput}
            fileInputRef={fileInputRef}
            onDeselectFile={handleDeselectFile}
          />
        </div>

        <div className="w-1/2">
          <InvoiceForm
            onSubmit={handleFormSubmit}
            isSubmitting={isSubmitting}
            formData={formData}
          />
        </div>
      </div>
    </section>
  );
};

export default DashboardLayout;
