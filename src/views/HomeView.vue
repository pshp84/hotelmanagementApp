<template>
  <div class="home">
    <section class="hero-section">
      <div class="hero-overlay"></div>
      <div class="container hero-content">
        <Stepper :current-step="1" />
        <h1 class="hero-title">Your Sanctuary Awaits.</h1>
        <p class="hero-subtitle">
          Discover and book a unique stay to relax and recharge.
        </p>

        <div class="search-box card">
          <form @submit.prevent="handleSearch">
            <div class="search-form-grid">
              <div class="form-group">
                <label for="check-in" class="form-label">Check-in</label>
                <input
                  type="date"
                  id="check-in"
                  class="form-input"
                  v-model="searchData.checkIn"
                  :min="today"
                />
              </div>
              <div class="form-group">
                <label for="check-out" class="form-label">Check-out</label>
                <input
                  type="date"
                  id="check-out"
                  class="form-input"
                  v-model="searchData.checkOut"
                  :min="searchData.checkIn || today"
                />
              </div>
              <div class="form-group">
                <label for="guests" class="form-label">Guests</label>
                <input
                  type="number"
                  id="guests"
                  class="form-input"
                  v-model="searchData.guests"
                  min="1"
                  max="10"
                />
              </div>
              <button type="submit" class="btn search-btn">Search</button>
            </div>
            <p v-if="error" class="form-error">{{ error }}</p>
          </form>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup>
import { ref, computed } from "vue";
import { useRouter } from "vue-router";
import { useBookingStore } from "@/stores/booking";
import Stepper from "@/components/Stepper.vue";

const router = useRouter();
const bookingStore = useBookingStore();
const error = ref("");

const searchData = ref({
  checkIn: "",
  checkOut: "",
  guests: 1,
});

const today = computed(() => {
  return new Date().toISOString().split("T")[0];
});

const handleSearch = () => {
  error.value = "";
  if (!searchData.value.checkIn || !searchData.value.checkOut) {
    error.value = "Please select both check-in and check-out dates.";
    return;
  }
  if (
    new Date(searchData.value.checkOut) <= new Date(searchData.value.checkIn)
  ) {
    error.value = "Check-out date must be after the check-in date.";
    return;
  }
  bookingStore.setSearchParams(searchData.value);
  router.push("/select-room");
};
</script>

<style scoped>
.hero-section {
  position: relative;
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background: url("@/assets/images/room-penthouse.jpg") no-repeat center
    center/cover;
  text-align: center;
}
.hero-overlay {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(13, 27, 42, 0.6);
}
.hero-content {
  position: relative;
  z-index: 2;
  color: #fff;
}
.hero-title {
  font-size: var(--biggest-font-size);
  margin-bottom: var(--space-xs);
  color: #fff;
  font-weight: 700;
  text-shadow: 2px 2px 10px rgba(0, 0, 0, 0.3);
}
.hero-subtitle {
  font-size: var(--h3-font-size);
  margin-bottom: var(--space-xl);
  font-weight: 400;
}
.search-box {
  padding: var(--space-md);
  box-shadow: var(--shadow);
}
.search-form-grid {
  display: grid;
  gap: var(--space-sm);
  align-items: flex-end;
}
@media screen and (min-width: 768px) {
  .search-form-grid {
    grid-template-columns: repeat(3, 1fr) auto;
  }
}
.search-btn {
  height: fit-content;
  padding-top: 0.8rem;
  padding-bottom: 0.8rem;
  align-self: center;
  justify-self: center;
  margin-top: 0.5rem;
}

.form-error {
  margin-top: var(--space-sm);
  color: var(--error-color);
}

:deep(.stepper__label) {
  color: #fff;
}
:deep(.stepper__icon) {
  background-color: rgba(255, 255, 255, 0.2);
  border-color: rgba(255, 255, 255, 0.3);
  color: #fff;
}
:deep(.stepper__step.active .stepper__icon) {
  background-color: var(--accent-color);
  border-color: var(--accent-color);
  color: var(--primary-color);
}
:deep(.stepper__step.active .stepper__label) {
  color: var(--accent-color);
}
:deep(.stepper__connector) {
  background-color: rgba(255, 255, 255, 0.3);
}
</style>
