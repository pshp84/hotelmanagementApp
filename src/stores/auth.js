import { defineStore } from "pinia";
import { ref, computed } from "vue";
import { useRouter } from "vue-router";
import { useBookingStore } from "./booking";

export const useAuthStore = defineStore("auth", () => {
  const user = ref(JSON.parse(localStorage.getItem("user")) || null);
  const isLoading = ref(false);
  const error = ref(null);
  const router = useRouter();

  const isAuthenticated = computed(() => !!user.value);

  const initializeAuth = () => {
    const storedUser = localStorage.getItem("user");
    const storedAccessToken = localStorage.getItem("accessToken");

    if (storedUser && storedAccessToken) {
      user.value = JSON.parse(storedUser);
    }
  };

  const login = async (credentials) => {
    isLoading.value = true;
    error.value = null;

    try {
      await new Promise((resolve) => setTimeout(resolve, 1000));

      const mockUser = {
        user_id: 1,
        full_name: "John Doe",
        email: credentials.email,
        created_at: new Date().toISOString(),
      };

      localStorage.setItem("accessToken", "mock-access-token");
      localStorage.setItem("refreshToken", "mock-refresh-token");
      localStorage.setItem("user", JSON.stringify(mockUser));

      user.value = mockUser;

      const bookingStore = useBookingStore();
      if (bookingStore.selectedRoom) {
        router.push("/contact");
      } else {
        router.push("/dashboard");
      }

      return { success: true };
    } catch (err) {
      error.value = "Login failed";
      throw err;
    } finally {
      isLoading.value = false;
    }
  };

  const register = async (userData) => {
    isLoading.value = true;
    error.value = null;

    try {
      await new Promise((resolve) => setTimeout(resolve, 1000));

      const mockUser = {
        user_id: Math.floor(Math.random() * 1000) + 2,
        full_name: userData.name,
        email: userData.email,
        created_at: new Date().toISOString(),
      };

      localStorage.setItem("accessToken", "mock-access-token");
      localStorage.setItem("refreshToken", "mock-refresh-token");
      localStorage.setItem("user", JSON.stringify(mockUser));

      user.value = mockUser;

      const bookingStore = useBookingStore();
      if (bookingStore.selectedRoom) {
        router.push("/contact");
      } else {
        router.push("/dashboard");
      }

      return { success: true };
    } catch (err) {
      error.value = "Registration failed";
      throw err;
    } finally {
      isLoading.value = false;
    }
  };

  const logout = async () => {
    isLoading.value = true;

    try {
      await new Promise((resolve) => setTimeout(resolve, 500));
    } catch (err) {
      console.error("Logout failed:", err);
    } finally {
      localStorage.removeItem("accessToken");
      localStorage.removeItem("refreshToken");
      localStorage.removeItem("user");
      user.value = null;
      isLoading.value = false;
      router.push("/login");
    }
  };

  const refreshToken = async () => {
    try {
      const refreshTokenValue = localStorage.getItem("refreshToken");
      if (!refreshTokenValue) {
        throw new Error("No refresh token available");
      }

      await new Promise((resolve) => setTimeout(resolve, 500));

      const accessToken = localStorage.getItem("accessToken");
      if (!accessToken) {
        throw new Error("No access token available");
      }

      return accessToken;
    } catch (err) {
      await logout();
      throw err;
    }
  };

  initializeAuth();

  return {
    user,
    isLoading,
    error,
    isAuthenticated,
    login,
    register,
    logout,
    refreshToken,
    initializeAuth,
  };
});
