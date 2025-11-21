import { useState } from "react";
import toast from "react-hot-toast";
import { useAuthContext } from "../context/AuthContext";

const useLogout = () => {
  const [loading, setLoading] = useState(false);
  const { setAuthUser } = useAuthContext();

  const logout = async () => {
    setLoading(true);

    try {
      const res = await fetch("/api/auth/logout", {
        method: "POST",
        credentials: "include",
      });

      const data = await res.json();
      // console.log("logout data", data);

      if (!res.ok || data.error) {
        toast.error(data.message || "Logout failed");
        return;
      }

      localStorage.removeItem("omni-user");
      setAuthUser(null);

      toast.success(data.message || "Logged out successfully!");
    } catch (err) {
      toast.error("Network error");
    } finally {
      setLoading(false);
    }
  };

  return { loading, logout };
};

export default useLogout;
