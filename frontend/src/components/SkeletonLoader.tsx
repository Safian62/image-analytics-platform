export const CardSkeleton = () => (
  <div className="bg-white p-6 rounded-xl shadow animate-pulse">
    <div className="h-4 bg-gray-200 rounded w-1/3 mb-4" />
    <div className="h-8 bg-gray-200 rounded w-1/2" />
  </div>
);

export const ImageGridSkeleton = () => (
  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
    {[1, 2, 3, 4, 5, 6].map((i) => (
      <div key={i} className="bg-gray-200 h-64 rounded-lg animate-pulse" />
    ))}
  </div>
);

export const ChartSkeleton = () => (
  <div className="bg-white p-6 rounded-xl shadow mt-6 animate-pulse">
    <div className="h-4 bg-gray-200 rounded w-1/3 mb-4" />
    <div className="h-80 bg-gray-200 rounded" />
  </div>
);
