import { useState } from "react";
import toast from "react-hot-toast";
import { useAuthContext } from "../context/AuthContext";

const useLogin = () => {
  const [loading, setLoading] = useState(false);
  const { setAuthUser } = useAuthContext();

  const login = async ({ email, password }) => {
    if (!email || !password) {
      toast.error("Email and password are required!");
      return;
    }

    setLoading(true);

    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();
      // console.log("Data after LOGIN: \n", data);

      // backend returns { error: true, message: "..." }
      if (!res.ok) {
        toast.error(data.message || "Login failed");
        return;
      }

      // Save user
      localStorage.setItem("omni-user", JSON.stringify(data.user));
      setAuthUser(data.user);

      toast.success(data.message || "Logged in successfully!");

    } catch (err) {
      toast.error("Network error. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return { loading, login };
};

export default useLogin;
