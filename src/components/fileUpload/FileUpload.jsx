import React from "react";
import { Document, Page } from "react-pdf";
import { FiUploadCloud } from "react-icons/fi";

const FileUpload = ({
  file,
  numPages,
  handleFileChange,
  onDocumentLoadSuccess,
  triggerFileInput,
  fileInputRef,
  onDeselectFile, 
}) => {
  return (
    <div className="max-w-2xl mx-auto mt-12 p-6 bg-white rounded-lg border-2 border-dashed border-gray-300 shadow-md text-center">
      {!file ? (
        <>
          <FiUploadCloud className="w-16 h-16 text-blue-600 mx-auto mb-4" />
          <h2 className="text-2xl font-semibold text-gray-800 mb-2">Upload Your Invoice</h2>
          <p className="text-gray-600 mb-6">To auto-populate fields and save time</p>

          <label
            onClick={triggerFileInput}
            className="inline-block px-6 py-2 bg-blue-600 text-white font-medium rounded-md cursor-pointer hover:bg-blue-700 transition"
          >
            Upload File
          </label>

          <input
            type="file"
            accept="application/pdf"
            ref={fileInputRef}
            onChange={handleFileChange}
            className="hidden"
          />
        </>
      ) : (
        <>
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-medium text-gray-800">Uploaded PDF Preview</h3>
            <div className="flex gap-2">
              <button
                onClick={triggerFileInput}
                className="px-4 py-1.5 text-sm bg-blue-600 text-white rounded-md hover:bg-blue-700 transition"
              >
                Replace File
              </button>
              <button
                onClick={onDeselectFile}
                className="px-4 py-1.5 text-sm bg-red-500 text-white rounded-md hover:bg-red-600 transition"
              >
                Deselect File
              </button>
            </div>
          </div>

          <input
            type="file"
            accept="application/pdf"
            ref={fileInputRef}
            onChange={handleFileChange}
            className="hidden"
          />

          <div className="overflow-auto border border-gray-300 rounded-md p-4 bg-gray-100">
            <Document
              file={file}
              onLoadSuccess={onDocumentLoadSuccess}
              onLoadError={(err) => console.error("PDF load error:", err)}
            >
              {Array.from(new Array(numPages), (_, index) => (
                <Page
                  key={`page_${index + 1}`}
                  pageNumber={index + 1}
                  renderTextLayer={false}
                  renderAnnotationLayer={false}
                />
              ))}
            </Document>
          </div>
        </>
      )}
    </div>
  );
};

export default FileUpload;
