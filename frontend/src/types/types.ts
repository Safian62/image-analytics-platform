export interface Image {
    _id: string;
    url: string;
    label: string;
    createdAt: string;
}

export interface AuthState {
    loading: boolean;
    isAuth: boolean;
}

export interface LabelData {
    _id: string;
    count: number;
}

export interface DayData {
  date: string;
  count: number;
}

export interface DayAnalyticsProps {
  dayData: DayData[];
  loading: boolean;
}

export interface LabelAnalyticsProps {
  labelData: LabelData[];
  loading: boolean;
}

export interface UploadImageProps {
  onUploadSuccess?: () => void;
}