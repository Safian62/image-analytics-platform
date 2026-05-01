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
import type { DayAnalyticsProps } from "../types/types";
import { ChartSkeleton } from "./SkeletonLoader";



const DayAnalytics = ({ dayData, loading }: DayAnalyticsProps) => {
  if (loading) {
    return <ChartSkeleton />;
  }

  return (
    <div className="bg-white p-6 rounded-xl shadow mt-6">
      <h2 className="text-lg font-semibold mb-4">Daily Analytics</h2>

      {dayData.length === 0 ? (
        <p className="text-gray-500 text-center py-8">
          No data available yet
        </p>
      ) : (
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={dayData}>
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
