// src/pages/Dashboard.tsx

import { useEffect } from "react";
import { logout } from "../utils/auth";
import UploadImage from "../components/UploadImage";
import ImageGrid from "../components/ImageGrid";
import LabelAnalytics from "../components/LabelAnalytics";
import DateFilter from "../components/DateFilter";
import DayAnalytics from "../components/DayAnalytics";
import { CardSkeleton } from "../components/SkeletonLoader";
import withProtectedRoute from "../components/ProtectedRoute";
import { useDashboardData } from "../hooks/useDashboardData";

const Dashboard = withProtectedRoute(() => {
  const {
    total,
    images,
    setImages,
    labelData,
    dayData,
    loading,
    page,
    totalPages,
    hasNextPage,
    hasPrevPage,
    refreshAllData,
    initializeData,
    fetchImages,
  } = useDashboardData();

  useEffect(() => {
    initializeData();
  }, [initializeData]);

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-gray-800">Dashboard</h1>
        <button
          onClick={logout}
          className="bg-red-500 cursor-pointer text-white px-6 py-2 rounded-lg hover:bg-red-600 transition font-semibold"
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
      <UploadImage onUploadSuccess={refreshAllData} />
      <DayAnalytics dayData={dayData} loading={loading} />
      <LabelAnalytics labelData={labelData} loading={loading} />
      <DateFilter setImages={(images) => setImages(images)} />
      <ImageGrid 
        images={images} 
        loading={loading}
        page={page}
        totalPages={totalPages}
        hasNextPage={hasNextPage}
        hasPrevPage={hasPrevPage}
        onPageChange={fetchImages}
      />
    </div>
  );
});

export default Dashboard;
