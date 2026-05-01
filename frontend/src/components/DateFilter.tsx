import { useState } from "react";
import { API } from "../utils/api";
import toast from "react-hot-toast";
import type { Image } from "../types/types";

const DateFilter = ({
  setImages,
}: {
  setImages: (images: Image[]) => void;
}) => {
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [loading, setLoading] = useState(false);

  const handleFilter = async () => {
    if (!startDate || !endDate) {
      toast.error("Please select both start and end dates");
      return;
    }

    if (new Date(startDate) > new Date(endDate)) {
      toast.error("Start date must be before end date");
      return;
    }

    try {
      setLoading(true);

      const res = await API.get(
        `/image/filter?startDate=${startDate}&endDate=${endDate}`,
        { withCredentials: true },
      );

      setImages(res.data.images || []);

      if ((res.data.images || []).length === 0) {
        toast.success("No images found in this date range");
      } else {
        toast.success(`Found ${res.data.images.length} images`);
      }
    } catch (error: unknown) {
      toast.error("Failed to filter images");
      console.error(error)
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white p-6 rounded-xl shadow mt-6">
      <h2 className="text-lg font-semibold mb-4">Filter by Date</h2>

      <div className="flex flex-col md:flex-row gap-4">
        <input
          type="date"
          className="border p-2 rounded w-full md:w-auto"
          value={startDate}
          onChange={(e) => setStartDate(e.target.value)}
        />

        <input
          type="date"
          className="border p-2 rounded w-full md:w-auto"
          value={endDate}
          onChange={(e) => setEndDate(e.target.value)}
        />

        <button
          onClick={handleFilter}
          disabled={loading}
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 disabled:opacity-50 disabled:cursor-not-allowed transition whitespace-nowrap cursor-pointer"
        >
          {loading ? "Filtering..." : "Apply"}
        </button>
      </div>
    </div>
  );
};

export default DateFilter;
