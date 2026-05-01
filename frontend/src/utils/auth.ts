import { API } from "../utils/api";
import toast from "react-hot-toast";

export const logout = async () => {
  try {
    await API.post("/user/logout", {}, { withCredentials: true });
    toast.success("Logged out successfully");
    window.location.href = "/login";
  } catch (error: unknown) {
    toast.error("Logout failed");
    console.error(error)
  }
};
