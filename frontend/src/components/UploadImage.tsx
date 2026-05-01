import { useState } from "react";
import { API } from "../utils/api";
import toast from "react-hot-toast";
import type { UploadImageProps } from "../types/types";



const UploadImage = ({ onUploadSuccess }: UploadImageProps) => {
  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [label, setLabel] = useState("");
  const [loading, setLoading] = useState(false);

  const handleRemoveImage = () => {
    setFile(null);
    setPreview(null);
  };

  const handleUpload = async () => {
    if (!file) {
      toast.error("Please select a file");
      return;
    }

    if (!label.trim()) {
      toast.error("Please enter a label");
      return;
    }

    const formData = new FormData();
    formData.append("image", file);
    formData.append("label", label);

    try {
      setLoading(true);

      await API.post("/image/upload", formData, {
        withCredentials: true,
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      toast.success("Image uploaded successfully");

      setFile(null);
      setPreview(null);
      setLabel("");

      // Refresh all dashboard data
      if (onUploadSuccess) {
        onUploadSuccess();
      }
    } catch (err: unknown) {
      toast.error("Failed to upload image");
      console.error(err)
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white p-6 rounded-xl shadow mb-6">
      <h2 className="text-lg font-semibold mb-4">Upload Image</h2>

      <label
        htmlFor="file"
        className="cursor-pointer w-14 h-14 flex items-center justify-center bg-gray-200 rounded-lg hover:bg-gray-300 transition relative overflow-hidden"
      >
        {preview ? (
          <>
            <img
              src={preview}
              alt="preview"
              className="w-full h-full object-cover"
            />

            {/* remove button */}
            <button
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                handleRemoveImage();
              }}
              className="absolute cursor-pointer top-0 right-0 bg-black text-white text-xs w-5 h-5 rounded-full flex items-center justify-center"
            >
              ×
            </button>
          </>
        ) : (
          // camera icon
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="w-6 h-6 text-gray-700"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V7a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z"
            />
            <circle cx="12" cy="13" r="4" />
          </svg>
        )}
      </label>

      {/* File Input */}
      <input
        id="file"
        type="file"
        hidden
        onChange={(e) => {
          const selectedFile = e.target.files?.[0] || null;
          setFile(selectedFile);

          if (selectedFile) {
            setPreview(URL.createObjectURL(selectedFile));
          }
        }}
      />

      {/* Label */}
      <input
        type="text"
        placeholder="Enter label (e.g. cat, car)"
        value={label}
        onChange={(e) => setLabel(e.target.value)}
        className="w-full p-2 border rounded-lg mb-3 mt-4"
      />

      {/* Upload Button */}
      <button
        onClick={handleUpload}
        disabled={loading}
        className="bg-blue-500 cursor-pointer text-white px-4 py-2 rounded-lg hover:bg-blue-600 disabled:opacity-50 disabled:cursor-not-allowed transition"
      >
        {loading ? "Uploading..." : "Upload"}
      </button>
    </div>
  );
};

export default UploadImage;