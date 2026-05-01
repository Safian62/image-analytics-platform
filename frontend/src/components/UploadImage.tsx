import { useState } from "react";
import { API } from "../utils/api";
import toast from "react-hot-toast";

const UploadImage = () => {
  const [file, setFile] = useState<File | null>(null);
  const [label, setLabel] = useState("");
  const [loading, setLoading] = useState(false);

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
      setLabel("");
      window.location.reload();
    } catch (err: unknown) {
      toast.error("Failed to upload image");
      console.log(err)
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white p-6 rounded-xl shadow mb-6">
      <h2 className="text-lg font-semibold mb-4">Upload Image</h2>

      <input
        type="file"
        onChange={(e) => setFile(e.target.files?.[0] || null)}
        className="mb-3 block"
      />

      <input
        type="text"
        placeholder="Enter label (e.g. cat, car)"
        value={label}
        onChange={(e) => setLabel(e.target.value)}
        className="w-full p-2 border rounded-lg mb-3"
      />

      <button
        onClick={handleUpload}
        disabled={loading}
        className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 disabled:opacity-50 disabled:cursor-not-allowed transition"
      >
        {loading ? "Uploading..." : "Upload"}
      </button>
    </div>
  );
};

export default UploadImage;