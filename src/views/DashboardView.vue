<template>
  <div class="dashboard-page main">
    <div class="container">
      <h1 class="section__title">My Bookings</h1>

      <!-- Loading State -->
      <div v-if="bookingStore.isLoading" class="loading-state">
        <p>Loading your bookings...</p>
      </div>

      <!-- Error State -->
      <div v-else-if="bookingStore.error" class="error-state">
        <p>{{ bookingStore.error }}</p>
        <button @click="refreshBookings" class="btn btn--primary">Retry</button>
      </div>

      <!-- Bookings Content -->
      <div v-else>
        <section class="bookings-section">
          <h2>Upcoming Stays</h2>
          <div v-if="upcomingBookings.length > 0" class="bookings-grid">
            <BookingCard
              v-for="booking in upcomingBookings"
              :key="booking.id"
              :booking="booking"
              @cancel="handleCancel"
            />
          </div>
          <div v-else class="card empty-state">
            <p>You have no upcoming stays. Time for a vacation?</p>
            <router-link to="/" class="btn">Find a Room</router-link>
          </div>
        </section>

        <section class="bookings-section">
          <h2>Past Stays</h2>
          <div v-if="pastBookings.length > 0" class="bookings-grid">
            <BookingCard
              v-for="booking in pastBookings"
              :key="booking.id"
              :booking="booking"
            />
          </div>
          <div v-else class="card empty-state">
            <p>Your booking history is empty.</p>
          </div>
        </section>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from "vue";
import { useBookingStore } from "@/stores/booking";
import BookingCard from "@/components/BookingCard.vue";

const bookingStore = useBookingStore();

const upcomingBookings = computed(() => {
  const today = new Date().toISOString().split("T")[0];
  return bookingStore.userBookings.filter((booking) => {
    return booking.status === "confirmed" && booking.check_in >= today;
  });
});

const pastBookings = computed(() => {
  const today = new Date().toISOString().split("T")[0];
  return bookingStore.userBookings.filter((booking) => {
    return (booking.status === "completed" || booking.status === "confirmed") && booking.check_in < today;
  });
});

const handleCancel = async (bookingId) => {
  if (confirm("Are you sure you want to cancel this booking?")) {
    try {
      await bookingStore.cancelBooking(bookingId);
    } catch (error) {
      console.error("Failed to cancel booking:", error);
      alert("Failed to cancel booking. Please try again.");
    }
  }
};

const refreshBookings = async () => {
  try {
    await bookingStore.fetchUserBookings();
  } catch (error) {
    console.error("Failed to refresh bookings:", error);
  }
};

onMounted(async () => {
  try {
    await bookingStore.fetchUserBookings();
  } catch (error) {
    console.error("Failed to fetch bookings:", error);
  }
});
</script>

<style scoped>
.bookings-section {
  margin-bottom: var(--space-xl);
}

.bookings-section h2 {
  font-size: var(--h2-font-size);
  margin-bottom: var(--space-md);
  border-bottom: 2px solid var(--accent-color);
  padding-bottom: var(--space-xs);
  display: inline-block;
}

.bookings-grid {
  display: grid;
  gap: var(--space-md);
}

.empty-state {
  text-align: center;
  padding: var(--space-xl);
}

.empty-state p {
  margin-bottom: var(--space-md);
  font-size: var(--h3-font-size);
}

.empty-state .btn {
  width: auto;
}

.loading-state,
.error-state {
  text-align: center;
  padding: var(--space-xl);
  font-size: var(--h3-font-size);
}

.error-state {
  color: var(--error-color);
}

.error-state .btn {
  margin-top: var(--space-md);
}
</style>
