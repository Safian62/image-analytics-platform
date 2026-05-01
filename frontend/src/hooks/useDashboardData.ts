import { useState, useCallback } from "react";
import { API } from "../utils/api";
import toast from "react-hot-toast";
import type { DayData, Image, LabelData } from "../types/types";

export const useDashboardData = () => {
  const [total, setTotal] = useState(0);
  const [images, setImages] = useState<Image[]>([]);
  const [labelData, setLabelData] = useState<LabelData[]>([]);
  const [dayData, setDayData] = useState<DayData[]>([]);
  const [loading, setLoading] = useState(true);

  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [hasNextPage, setHasNextPage] = useState(false);
  const [hasPrevPage, setHasPrevPage] = useState(false);
  const limit = 4;

  const fetchTotal = useCallback(async () => {
    try {
      const res = await API.get("/image/total", { withCredentials: true });
      setTotal(res.data.totalImages);
    } catch (err) {
      toast.error("Failed to load total images");
      console.error(err)
    }
  }, []);

  const fetchImages = useCallback(async (pageNum = 1) => {
    try {
      const res = await API.get(
        `/image/all?page=${pageNum}&limit=${limit}`,
        { withCredentials: true }
      );

      setImages(res.data.images || []);
      setPage(pageNum);
      
      const pagination = res.data.pagination || {};
      const totalImages = pagination.total ?? 0;
      const calculatedTotalPages = Math.max(1, Math.ceil(totalImages / limit));
      
      setTotalPages(calculatedTotalPages);
      setHasNextPage(Boolean(pagination.hasNextPage ?? pageNum < calculatedTotalPages));
      setHasPrevPage(Boolean(pagination.hasPrevPage ?? pageNum > 1));
    } catch (err) {
      toast.error("Failed to load images");
      console.error(err)
    }
  }, [limit]);

  const fetchLabelAnalytics = useCallback(async () => {
    try {
      const res = await API.get("/image/group-by-label", {
        withCredentials: true,
      });
      setLabelData(res.data.data || []);
    } catch {
      toast.error("Failed to load label analytics");
    }
  }, []);

  const fetchDayAnalytics = useCallback(async () => {
    try {
      const res = await API.get("/image/all?page=1&limit=1000", {
        withCredentials: true,
      });

      const images = res.data.images || [];

      const grouped: Record<string, number> = {};

      images.forEach((img: { createdAt: string }) => {
        const date = new Date(img.createdAt).toLocaleDateString();
        grouped[date] = (grouped[date] || 0) + 1;
      });

      const chartData = Object.entries(grouped)
        .map(([date, count]) => ({ date, count }))
        .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());

      setDayData(chartData);
    } catch {
      toast.error("Failed to load day analytics");
    }
  }, []);

  const refreshAllData = useCallback(async () => {
    setLoading(true);
    try {
      await Promise.all([
        fetchTotal(),
        fetchImages(page),
        fetchLabelAnalytics(),
        fetchDayAnalytics(),
      ]);
    } finally {
      setLoading(false);
    }
  }, [fetchTotal, fetchImages, fetchLabelAnalytics, fetchDayAnalytics, page]);

  const initializeData = useCallback(async () => {
    await refreshAllData();
  }, [refreshAllData]);

  return {
    total,
    images,
    setImages,
    labelData,
    dayData,
    loading,
    page,
    setPage,
    totalPages,
    hasNextPage,
    hasPrevPage,
    fetchImages,
    refreshAllData,
    initializeData,
  };
};