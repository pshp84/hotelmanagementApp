import { createRouter, createWebHistory } from "vue-router";
import HomeView from "../views/HomeView.vue";
import { useAuthStore } from "../stores/auth";

const routes = [
  { path: "/", name: "Home", component: HomeView },
  {
    path: "/select-room",
    name: "SelectRoom",
    component: () => import("../views/SelectRoomView.vue"),
  },
  {
    path: "/contact",
    name: "Contact",
    component: () => import("../views/ContactView.vue"),
    meta: { requiresAuth: true },
  },
  {
    path: "/confirmation",
    name: "Confirmation",
    component: () => import("../views/ConfirmationView.vue"),
    meta: { requiresAuth: true },
  },
  {
    path: "/login",
    name: "LoginRegister",
    component: () => import("../views/LoginRegisterView.vue"),
    meta: { hideHeader: true },
  },
  {
    path: "/dashboard",
    name: "Dashboard",
    component: () => import("../views/DashboardView.vue"),
    meta: { requiresAuth: true },
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
  scrollBehavior(to, from, savedPosition) {
    return { top: 0 };
  },
});

router.beforeEach((to, from, next) => {
  const authStore = useAuthStore();
  if (to.meta.requiresAuth && !authStore.isAuthenticated) {
    next({ name: "LoginRegister" });
  } else {
    next();
  }
});

export default router;
