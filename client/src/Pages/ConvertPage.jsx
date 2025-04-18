import React, { useContext, useState, useCallback } from "react";
import { useDropzone } from "react-dropzone";
import NavigationBar from "../Components/NavigationBar";
import axios from "axios";
import { AppContext } from "../Context/appContext";
import { toast } from "react-toastify";
import Footer from "../Components/Footer";

const ConvertPage = () => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [downloadPath, setDownloadPath] = useState("");

  const { backendUrl } = useContext(AppContext);

  const onDrop = useCallback((acceptedFiles) => {
    setSelectedFile(acceptedFiles[0]);
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!selectedFile) return toast.error("Please select a file");

    const formData = new FormData();
    formData.append("file", selectedFile);

    try {
      const { data } = await axios.post(
        `${backendUrl}/api/files/convert-to-pdf`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      if (data.success) {
        toast.success(data.message);
        setDownloadPath(data.downloadUrl);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  return (
    <div className="flex flex-col  min-h-screen">
      <NavigationBar />

      <main className="flex-grow flex flex-col items-center justify-start w-full px-4 py-12">
        <h1 className="text-5xl font-bold text-center mb-6 text-gray-800">
          File Converter
        </h1>
        <div className="bg-white shadow-md rounded-xl p-8 w-full max-w-4xl">
          <div className=" flex flex-col items-start">
            <h1 className="text-3xl font-medium text-center mb-2 text-gray-800">
              Convert your Files
            </h1>
            <p className="text-center text-gray-600 mb-4">
              Upload a file and select conversion options
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div
              {...getRootProps()}
              className="border-2 border-dashed border-gray-300 rounded-xl p-8 text-center cursor-pointer bg-gray-50 hover:bg-gray-100 transition"
            >
              <input {...getInputProps()} />
              <div className="flex flex-col items-center justify-center space-y-2">
                <svg
                  className="w-10 h-10 text-gray-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M7 16V4m0 0l-4 4m4-4l4 4M17 16v4m0 0l4-4m-4 4l-4-4"
                  />
                </svg>
                <p className="text-gray-700">
                  {isDragActive
                    ? "Drop the file here ..."
                    : "Drag & drop your file here"}
                </p>
                <p className="text-gray-500 text-sm">
                  or click to browse your device
                </p>
              </div>
            </div>

            {selectedFile && (
              <p className="text-sm font font-medium text-red-600 text-center ">
                <span className="border px-4 py-1 rounded-full bg-gray-100  ">
                  {" "}
                  Selected file: {selectedFile.name}
                </span>
              </p>
            )}

            <button
              type="submit"
              className={`w-full ${downloadPath && "hidden"}`}
            >
              <span className="bg-sky-500 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-md transition cursor-pointer">
                {" "}
                Upload & Convert{" "}
              </span>
            </button>

            {downloadPath && (
              <a
                href={downloadPath}
                target="_blank"
                rel="noopener noreferrer"
                download
              >
                <button
                  type="button"
                  className="w-full  "
                >
                  <span className="bg-emerald-500 hover:bg-emerald-600 text-white font-medium py-2 px-4 rounded-md transition cursor-pointer">
                    {" "}
                    Download Converted File{" "}
                  </span>
                </button>
              </a>
            )}
          </form>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default ConvertPage;
