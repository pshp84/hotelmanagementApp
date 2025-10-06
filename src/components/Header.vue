<template>
  <header class="header" :class="{ scrolled: isScrolled }">
    <nav class="nav container">
      <router-link to="/" class="nav__logo"> HotelHub </router-link>

      <!-- Mobile menu toggle -->
      <button
        class="nav__toggle"
        @click="toggleMobileMenu"
        :aria-expanded="isMobileMenuOpen"
        aria-label="Toggle navigation menu"
      >
        <span
          class="nav__toggle-line"
          :class="{ active: isMobileMenuOpen }"
        ></span>
        <span
          class="nav__toggle-line"
          :class="{ active: isMobileMenuOpen }"
        ></span>
        <span
          class="nav__toggle-line"
          :class="{ active: isMobileMenuOpen }"
        ></span>
      </button>

      <div class="nav__menu" :class="{ active: isMobileMenuOpen }">
        <ul class="nav__list">
          <li class="nav__item">
            <router-link to="/" class="nav__link">Home</router-link>
          </li>
          <li v-if="auth.isAuthenticated" class="nav__item">
            <router-link to="/dashboard" class="nav__link"
              >Dashboard</router-link
            >
          </li>
          <li v-if="auth.isAuthenticated" class="nav__item nav__user">
            <div class="nav__user-info">
              <div class="nav__user-avatar">
                {{ auth.user.full_name.charAt(0).toUpperCase() }}
              </div>
              <span class="nav__user-welcome"
                >Welcome, {{ auth.user.full_name }}</span
              >
            </div>
            <button @click="auth.logout" class="nav__logout-btn">
              <svg
                class="nav__logout-icon"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fill-rule="evenodd"
                  d="M3 3a1 1 0 00-1 1v12a1 1 0 102 0V4a1 1 0 00-1-1zm10.293 9.293a1 1 0 001.414 1.414l3-3a1 1 0 000-1.414l-3-3a1 1 0 10-1.414 1.414L14.586 9H7a1 1 0 100 2h7.586l-1.293 1.293z"
                  clip-rule="evenodd"
                />
              </svg>
              Logout
            </button>
          </li>
          <li v-else class="nav__item">
            <router-link to="/login" class="nav__link nav__link--button"
              >Login</router-link
            >
          </li>
        </ul>
      </div>
    </nav>
  </header>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from "vue";
import { useAuthStore } from "@/stores/auth";
import { useRoute } from "vue-router";

const auth = useAuthStore();
const route = useRoute();
const isScrolled = ref(false);
const isMobileMenuOpen = ref(false);

const handleScroll = () => {
  isScrolled.value = window.scrollY > 50;
};

const toggleMobileMenu = () => {
  isMobileMenuOpen.value = !isMobileMenuOpen.value;
};

const closeMobileMenu = () => {
  isMobileMenuOpen.value = false;
};

const handleClickOutside = (event) => {
  if (isMobileMenuOpen.value && !event.target.closest(".nav")) {
    isMobileMenuOpen.value = false;
  }
};

onMounted(() => {
  window.addEventListener("scroll", handleScroll);
  window.addEventListener("click", handleClickOutside);
  route.addEventListener?.("change", closeMobileMenu);
});

onUnmounted(() => {
  window.removeEventListener("scroll", handleScroll);
  window.removeEventListener("click", handleClickOutside);
  route.removeEventListener?.("change", closeMobileMenu);
});

import { watch } from "vue";
watch(route, closeMobileMenu);
</script>

<style scoped>
.header {
  width: 100%;
  position: fixed;
  top: 0;
  left: 0;
  z-index: var(--z-fixed);
  transition: all 0.4s ease;
  background-color: rgba(255, 255, 255, 0.95);
  backdrop-filter: blur(20px);
  -webkit-backdrop-filter: blur(20px);
  border-bottom: 1px solid rgba(0, 0, 0, 0.05);
}

.header.scrolled {
  background-color: rgba(255, 255, 255, 0.98);
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
  border-bottom-color: rgba(0, 0, 0, 0.1);
}

.nav {
  height: var(--header-height);
  display: flex;
  justify-content: space-between;
  align-items: center;
  position: relative;
}

.nav__logo {
  color: var(--accent-color);
  font-weight: 800;
  font-size: 1.5rem;
  text-decoration: none;
  letter-spacing: -0.02em;
}

.nav__logo.router-link-active,
.nav__logo.router-link-exact-active {
  color: var(--accent-color);
}

.nav__toggle {
  display: none;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 40px;
  height: 40px;
  background: none;
  border: none;
  cursor: pointer;
  padding: 0;
  z-index: 1001;
}

.nav__toggle-line {
  width: 24px;
  height: 2px;
  background-color: var(--text-color);
  transition: all 0.3s ease;
  margin: 2px 0;
  border-radius: 1px;
}

.nav__toggle-line.active:nth-child(1) {
  transform: rotate(45deg) translate(5px, 5px);
}

.nav__toggle-line.active:nth-child(2) {
  opacity: 0;
}

.nav__toggle-line.active:nth-child(3) {
  transform: rotate(-45deg) translate(7px, -6px);
}

.nav__menu {
  display: flex;
  align-items: center;
}

.nav__list {
  display: flex;
  align-items: center;
  gap: var(--space-lg);
  margin: 0;
  padding: 0;
  list-style: none;
}

.nav__item {
  position: relative;
}

.nav__link {
  color: var(--text-color);
  font-weight: var(--font-medium);
  font-size: 0.95rem;
  text-decoration: none;
  padding: 0.5rem 1rem;
  border-radius: var(--radius);
  transition: all 0.3s ease;
  position: relative;
  display: flex;
  align-items: center;
  gap: 0.25rem;
}

.nav__link::before {
  content: "";
  position: absolute;
  bottom: -2px;
  left: 50%;
  width: 0;
  height: 2px;
  background: linear-gradient(90deg, var(--primary-color), var(--accent-color));
  transition: all 0.3s ease;
  transform: translateX(-50%);
  border-radius: 1px;
}

.nav__link:hover,
.router-link-exact-active {
  color: var(--primary-color);
  background-color: rgba(13, 27, 42, 0.05);
}

.nav__link:hover::before,
.router-link-exact-active::before {
  width: 80%;
}

.nav__link--button {
  background: linear-gradient(135deg, var(--primary-color), var(--title-color));
  color: #fff;
  padding: 0.6rem 1.2rem;
  border-radius: var(--radius);
  font-weight: 600;
  box-shadow: 0 2px 10px rgba(13, 27, 42, 0.2);
  transition: all 0.3s ease;
}

.nav__link--button:hover {
  background: linear-gradient(135deg, var(--title-color), var(--primary-color));
  transform: translateY(-2px);
  box-shadow: 0 4px 20px rgba(13, 27, 42, 0.3);
  color: #fff;
}

.nav__link--button::before {
  display: none;
}

.nav__user {
  display: flex;
  align-items: center;
  gap: var(--space-sm);
  padding: 0.5rem;
  border-radius: var(--radius);
  transition: background-color 0.3s ease;
}

.nav__user:hover {
  background-color: rgba(13, 27, 42, 0.05);
}

.nav__user-info {
  display: flex;
  align-items: center;
  gap: var(--space-xs);
}

.nav__user-avatar {
  width: 32px;
  height: 32px;
  border-radius: 50%;
  background: linear-gradient(
    135deg,
    var(--primary-color),
    var(--accent-color)
  );
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 600;
  font-size: 0.875rem;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

.nav__user-welcome {
  font-size: 0.9rem;
  color: var(--text-color);
  font-weight: 500;
}

.nav__logout-btn {
  background: none;
  border: none;
  cursor: pointer;
  font-weight: var(--font-medium);
  color: var(--text-color);
  display: flex;
  align-items: center;
  gap: 0.25rem;
  padding: 0.5rem;
  border-radius: var(--radius);
  transition: all 0.3s ease;
  font-size: 0.9rem;
}

.nav__logout-btn:hover {
  color: var(--error-color);
  background-color: rgba(231, 111, 81, 0.1);
}

.nav__logout-icon {
  width: 16px;
  height: 16px;
}

@media (max-width: 768px) {
  .nav__toggle {
    display: flex;
  }

  .nav__menu {
    position: fixed;
    top: 0;
    right: -100%;
    width: 280px;
    height: 100vh;
    background-color: rgba(255, 255, 255, 0.98);
    backdrop-filter: blur(20px);
    -webkit-backdrop-filter: blur(20px);
    border-left: 1px solid rgba(0, 0, 0, 0.1);
    transition: right 0.3s ease;
    z-index: 1000;
    padding-top: var(--header-height);
    box-shadow: -4px 0 20px rgba(0, 0, 0, 0.1);
  }

  .nav__menu.active {
    right: 0;
  }

  .nav__list {
    flex-direction: column;
    gap: 0;
    padding: var(--space-lg);
    height: 100%;
    justify-content: flex-start;
  }

  .nav__item {
    width: 100%;
    margin-bottom: var(--space-xs);
  }

  .nav__link {
    padding: 0.75rem 1rem;
    width: 100%;
    justify-content: flex-start;
    border-radius: var(--radius);
    margin-bottom: 0.25rem;
  }

  .nav__user {
    flex-direction: column;
    align-items: flex-start;
    padding: 1rem;
    background-color: rgba(13, 27, 42, 0.05);
    border-radius: var(--radius);
    margin-top: var(--space-md);
  }

  .nav__user-info {
    width: 100%;
    margin-bottom: var(--space-sm);
  }

  .nav__user-welcome {
    font-size: 0.85rem;
  }

  .nav__logout-btn {
    width: 100%;
    justify-content: center;
    padding: 0.75rem;
    background-color: rgba(231, 111, 81, 0.1);
    color: var(--error-color);
  }

  .nav__logout-btn:hover {
    background-color: rgba(231, 111, 81, 0.2);
  }
}

@media (max-width: 480px) {
  .nav__logo {
    font-size: 1.25rem;
  }

  .nav__logo-icon {
    width: 24px;
    height: 24px;
  }

  .nav__menu {
    width: 100%;
    right: -100%;
  }

  .nav__menu.active {
    right: 0;
  }
}

@media (prefers-color-scheme: dark) {
  .header {
    background-color: rgba(13, 27, 42, 0.95);
    border-bottom-color: rgba(255, 255, 255, 0.1);
  }

  .header.scrolled {
    background-color: rgba(13, 27, 42, 0.98);
    box-shadow: 0 4px 20px rgba(0, 0, 0, 0.3);
  }

  .nav__link {
    color: rgba(255, 255, 255, 0.9);
  }

  .nav__link:hover,
  .router-link-exact-active {
    color: var(--accent-color);
  }

  .nav__user-welcome {
    color: rgba(255, 255, 255, 0.8);
  }
}

@media (prefers-reduced-motion: reduce) {
  .header,
  .nav__link,
  .nav__link::before,
  .nav__link--button,
  .nav__logout-btn,
  .nav__toggle-line,
  .nav__menu {
    transition: none;
  }

  .nav__link--button:hover {
    transform: none;
  }
}
</style>
