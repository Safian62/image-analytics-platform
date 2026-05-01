// src/pages/Dashboard.tsx

import { useEffect, useState } from "react";
import { API } from "../utils/api";
import { logout } from "../utils/auth";
import UploadImage from "../components/UploadImage";
import ImageGrid from "../components/ImageGrid";
import LabelAnalytics from "../components/LabelAnalytics";
import DateFilter from "../components/DateFilter";
import DayAnalytics from "../components/DayAnalytics";
import { CardSkeleton } from "../components/SkeletonLoader";
import toast from "react-hot-toast";
import withProtectedRoute from "../components/ProtectedRoute";
import type { Image } from "../types/types";



const Dashboard = withProtectedRoute(() => {
  const [total, setTotal] = useState(0);
  const [images, setImages] = useState<Image[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchTotal = async () => {
    try {
      setLoading(true);
      const res = await API.get("/image/total", { withCredentials: true });
      setTotal(res.data.totalImages);
    } catch (err: unknown) {
      toast.error("Failed to load total images");
      console.error(err)
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTotal();
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-gray-800">Dashboard</h1>
        <button
          onClick={logout}
          className="bg-red-500 text-white px-6 py-2 rounded-lg hover:bg-red-600 transition font-semibold"
        >
          Logout
        </button>
      </div>

      {/* Stats */}
      {loading ? (
        <CardSkeleton />
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-white p-6 rounded-xl shadow hover:shadow-lg transition">
            <h2 className="text-gray-600 text-sm font-semibold">
              Total Images
            </h2>
            <p className="text-4xl font-bold text-blue-600">{total}</p>
          </div>
        </div>
      )}

      {/* Components */}
      <UploadImage />
      <DayAnalytics />
      <LabelAnalytics />
      <DateFilter setImages={setImages} />
      <ImageGrid images={images} setImages={setImages} />
    </div>
  );
});

export default Dashboard;
