import { useEffect, useState } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { API } from "../utils/api";
import toast from "react-hot-toast";
import type { DayData } from "../types/types";


const DayAnalytics = () => {
  const [data, setData] = useState<DayData[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDayAnalytics = async () => {
      try {
        setLoading(true);
        const res = await API.get("/image/all?page=1&limit=1000", {
          withCredentials: true,
        });

        const images = res.data.images || [];

        // Group images by date
        const groupedByDate: Record<string, number> = {};
        images.forEach((img: { createdAt: string }) => {
          const date = new Date(img.createdAt).toLocaleDateString();
          groupedByDate[date] = (groupedByDate[date] || 0) + 1;
        });

        // Convert to array and sort by date
        const chartData = Object.entries(groupedByDate)
          .map(([date, count]) => ({
            date,
            count,
          }))
          .sort(
            (a, b) =>
              new Date(a.date).getTime() - new Date(b.date).getTime()
          );

        setData(chartData);
      } catch (error: unknown) {
        toast.error("Failed to load day analytics");
        console.error(error)
      } finally {
        setLoading(false);
      }
    };

    fetchDayAnalytics();
  }, []);

  if (loading) {
    return (
      <div className="bg-white p-6 rounded-xl shadow mt-6">
        <h2 className="text-lg font-semibold mb-4">Daily Analytics</h2>
        <div className="h-80 bg-gray-200 animate-pulse rounded" />
      </div>
    );
  }

  return (
    <div className="bg-white p-6 rounded-xl shadow mt-6">
      <h2 className="text-lg font-semibold mb-4">Daily Analytics</h2>

      {data.length === 0 ? (
        <p className="text-gray-500 text-center py-8">
          No data available yet
        </p>
      ) : (
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={data}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="date" angle={-45} textAnchor="end" height={80} />
            <YAxis />
            <Tooltip />
            <Legend />
            <Line
              type="monotone"
              dataKey="count"
              stroke="#3b82f6"
              strokeWidth={2}
              dot={{ fill: "#3b82f6" }}
              name="Images Uploaded"
            />
          </LineChart>
        </ResponsiveContainer>
      )}
    </div>
  );
};

export default DayAnalytics;
