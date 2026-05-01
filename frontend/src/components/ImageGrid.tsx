import { useEffect, useState, useRef } from "react";
import { ImageGridSkeleton } from "./SkeletonLoader";
import type { Image } from "../types/types";

const ImageGrid = ({
  images,
  loading,
  page,
  totalPages,
  hasNextPage,
  hasPrevPage,
  onPageChange,
}: {
  images: Image[];
  loading: boolean;
  page: number;
  totalPages: number;
  hasNextPage: boolean;
  hasPrevPage: boolean;
  onPageChange: (pageNum: number) => void;
}) => {
  const [lazyLoading, setLazyLoading] = useState<Set<string>>(new Set());
  const observerRef = useRef<IntersectionObserver | null>(null);

  useEffect(() => {
    observerRef.current = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const img = entry.target as HTMLImageElement;
          if (img.dataset.src) {
            img.src = img.dataset.src;
            img.removeAttribute("data-src");
            setLazyLoading((prev) => {
              const newSet = new Set(prev);
              newSet.delete(img.id);
              return newSet;
            });
            observerRef.current?.unobserve(img);
          }
        }
      });
    });

    return () => observerRef.current?.disconnect();
  }, []);

  return (
    <div className="bg-white p-6 rounded-xl shadow mt-6">
      <h2 className="text-lg font-semibold mb-4">Your Images</h2>

      {loading ? (
        <ImageGridSkeleton />
      ) : images.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-gray-500 text-lg">No images uploaded yet</p>
        </div>
      ) : (
        <>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {images.map((img, idx) => (
              <div
                key={img._id}
                className="border rounded-lg overflow-hidden hover:shadow-lg transition-shadow"
              >
                <div className="relative w-full h-40 bg-gray-100">
                  <img
                    id={`img-${idx}`}
                    ref={(el) => {
                      if (el && observerRef.current) {
                        observerRef.current.observe(el);
                      }
                    }}
                    data-src={img.url}
                    alt={img.label}
                    className="w-full h-40 object-cover"
                  />
                  {lazyLoading.has(`img-${idx}`) && (
                    <div className="absolute inset-0 bg-gray-200 animate-pulse" />
                  )}
                </div>
                <div className="p-2 text-sm">
                  <p className="font-semibold truncate">{img.label}</p>
                  <p className="text-gray-500 text-xs">
                    {new Date(img.createdAt).toLocaleDateString()}
                  </p>
                </div>
              </div>
            ))}
          </div>

          <div className="flex justify-between items-center mt-6">
            <button
              onClick={() => onPageChange(page - 1)}
              disabled={!hasPrevPage || loading}
              className="px-4 py-2 cursor-pointer bg-blue-500 text-white rounded disabled:opacity-50 disabled:cursor-not-allowed hover:bg-blue-600"
            >
              Prev
            </button>

            <p className="text-sm font-medium">
              Page {page} of {totalPages}
            </p>

            <button
              onClick={() => onPageChange(page + 1)}
              disabled={!hasNextPage || loading}
              className="px-4 cursor-pointer py-2 bg-blue-500 text-white rounded disabled:opacity-50 disabled:cursor-not-allowed hover:bg-blue-600"
            >
              Next
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default ImageGrid;
