import React, { useContext, useState } from "react";
import NavigationBar from "../Components/NavigationBar";
import axios from "axios";
import { AppContext } from "../Context/appContext";
import { toast } from "react-toastify";

const ConvertPage = () => {
  const [selectedFile, setSelectedFile] = useState(null);

  const { backendUrl } = useContext(AppContext); 
  const handleFileChange = (e) => {
    const file = e.target.files[0]; 
    setSelectedFile(file); 
  }
  const handleSubmit = async (e) => {
    e.preventDefault(); 

    if (!selectedFile) return alert('plz select a file'); 

    const formData = new FormData();
    formData.append("file", selectedFile); 

    try {
      const { data } = await axios.post(
        backendUrl + "/api/files/upload",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      ); 

      if (data.success) {
        toast.success(data.message)
      } else {
        toast.error(data.message);
        
      }
    } catch (error) {
      toast.error(error.message);
    }
  }
  return (
    <div className="flex flex-col items-center justify-start">
      <NavigationBar />

      <main className="flex-grow flex items-center justify-center px-4 py-12">
        <div className="bg-white shadow-xl rounded-2xl p-8 w-full max-w-md">
          <h2 className="text-2xl font-semibold text-center mb-6">
            Upload File for Conversion
          </h2>

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label
                htmlFor="fileUpload"
                className="block text-sm font-medium mb-2"
              >
                Choose a file
              </label>
              <input
                id="fileUpload"
                type="file"
                onChange={handleFileChange}
                className="block w-full text-sm text-gray-700 file:mr-4 file:py-2 file:px-4
                  file:rounded-md file:border-0
                  file:text-sm file:font-semibold
                  file:bg-blue-50 file:text-blue-700
                  hover:file:bg-blue-100 transition duration-150 ease-in-out"
              />
            </div>

            {selectedFile && (
              <p className="text-sm text-green-700">
                Selected: {selectedFile.name}
              </p>
            )}

            <button
              type="submit"
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-md transition duration-150 ease-in-out"
            >
              Upload & Convert
            </button>
          </form>
        </div>
      </main>
    </div>
  );
};

export default ConvertPage;
