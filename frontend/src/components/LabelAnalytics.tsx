import { CardSkeleton } from "./SkeletonLoader";
import type { LabelAnalyticsProps } from "../types/types";



const LabelAnalytics = ({ labelData, loading }: LabelAnalyticsProps) => {
  if (loading) {
    return <CardSkeleton />;
  }

  const maxCount = Math.max(...labelData.map((d) => d.count || 0), 1);

  return (
    <div className="bg-white p-6 rounded-xl shadow mt-6">
      <h2 className="text-lg font-semibold mb-4">Label Analytics</h2>

      {labelData.length === 0 ? (
        <p className="text-gray-500 text-center py-8">No data available</p>
      ) : (
        <div className="space-y-3">
          {labelData.map((item) => (
            <div key={item._id}>
              <div className="flex justify-between text-sm mb-1">
                <span className="font-medium">{item._id}</span>
                <span className="text-gray-600">{item.count}</span>
              </div>

              {/* Bar chart */}
              <div className="w-full bg-gray-200 h-2 rounded overflow-hidden">
                <div
                  className="bg-blue-500 h-2 rounded transition-all duration-300"
                  style={{
                    width: `${(item.count / maxCount) * 100}%`,
                  }}
                />
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default LabelAnalytics;