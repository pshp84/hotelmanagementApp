<template>
  <div class="confirmation-page main">
    <div class="container">
      <Stepper :current-step="4" />

      <div v-if="details" class="card confirmation-card">
        <div class="confirmation-header">
          <div class="success-icon">&#10004;</div>
          <h1 class="confirmation-title">
            Thank You, Your Booking is Confirmed!
          </h1>
          <p class="confirmation-subtitle">
            A confirmation email has been sent to
            {{ details.guestDetails.email }}.
          </p>
        </div>

        <div class="confirmation-number-block">
          <div class="conf-number-info">
            <span class="conf-label">Your Confirmation Number</span>
            <span class="conf-number">{{ details.confirmation_number }}</span>
          </div>
          <button class="btn-copy" @click="copyConfirmationNumber">
            {{ copyText }}
          </button>
        </div>

        <div class="details-grid">
          <div class="detail-section">
            <h3 class="detail-title">Guest Details</h3>
            <div class="detail-item">
              <span>Name:</span>
              <span
                >{{ details.guestDetails.title }}
                {{ details.guestDetails.fullName }}</span
              >
            </div>
            <div class="detail-item">
              <span>Guests:</span>
              <span>{{ details.stayDetails.guests }} Adult(s)</span>
            </div>
          </div>

          <div class="detail-section">
            <h3 class="detail-title">Stay Details</h3>
            <div class="detail-item">
              <span>Room:</span>
              <span>{{ details.roomDetails.name }}</span>
            </div>
            <div class="detail-item">
              <span>Check-in:</span>
              <span>{{ formatDate(details.stayDetails.checkIn) }}</span>
            </div>
            <div class="detail-item">
              <span>Check-out:</span>
              <span>{{ formatDate(details.stayDetails.checkOut) }}</span>
            </div>
          </div>
        </div>

        <div class="price-breakdown">
          <h3 class="detail-title">Price Breakdown</h3>
          <div class="summary-item">
            <span
              >{{ details.nights }} night(s) &times; ${{
                details.roomDetails.price
              }}</span
            >
            <span>${{ details.pricing.subtotal }}</span>
          </div>
          <div class="summary-item">
            <span>Taxes & Fees (9%)</span>
            <span>${{ details.pricing.tax }}</span>
          </div>
          <hr class="summary-divider" />
          <div class="summary-total">
            <span>Total Paid</span>
            <span class="total-price">${{ details.pricing.total }}</span>
          </div>
        </div>

        <div class="confirmation-actions">
          <router-link to="/dashboard" class="btn btn--primary"
            >View My Bookings</router-link
          >
          <router-link to="/" class="btn btn--secondary"
            >Back to Home</router-link
          >
        </div>
      </div>

      <div v-else class="card no-results">
        <h2>Booking details not found.</h2>
        <p>Your session may have expired. Please start a new search.</p>
      </div>
    </div>
  </div>
</template>

<script setup>
import { onMounted, onUnmounted, ref } from "vue";
import { useBookingStore } from "@/stores/booking";
import Stepper from "@/components/Stepper.vue";

const bookingStore = useBookingStore();
const details = ref(null);
const copyText = ref("Copy");

const formatDate = (dateString) => {
  return new Date(dateString).toLocaleDateString("en-US", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });
};

const copyConfirmationNumber = async () => {
  if (details.value?.confirmation_number) {
    try {
      await navigator.clipboard.writeText(details.value.confirmation_number);
      copyText.value = "Copied!";
      setTimeout(() => {
        copyText.value = "Copy";
      }, 2000);
    } catch (err) {
      console.error("Failed to copy: ", err);
      copyText.value = "Error";
    }
  }
};

onMounted(() => {
  details.value = bookingStore.confirmationDetails;
});

onUnmounted(() => {
  bookingStore.resetBooking();
});
</script>

<style scoped>
.confirmation-card {
  max-width: 800px;
  margin: 0 auto;
  padding: var(--space-xl);
}
.confirmation-header {
  text-align: center;
  margin-bottom: var(--space-lg);
}
.success-icon {
  width: 70px;
  height: 70px;
  border-radius: 50%;
  background-color: var(--success-color);
  color: white;
  font-size: 2.5rem;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto var(--space-md);
  box-shadow: 0 5px 15px hsla(174, 56%, 40%, 0.4);
}
.confirmation-title {
  font-size: var(--h1-font-size);
  color: var(--title-color);
  margin-bottom: var(--space-xs);
}
.confirmation-subtitle {
  color: var(--text-color-light);
  font-size: var(--h3-font-size);
}

/* Confirmation Number Block */
.confirmation-number-block {
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: var(--secondary-color);
  border: 1px dashed var(--border-color);
  border-radius: var(--radius);
  padding: var(--space-sm) var(--space-md);
  margin-bottom: var(--space-lg);
}
.conf-number-info {
  display: flex;
  flex-direction: column;
}
.conf-label {
  font-size: var(--small-font-size);
  color: var(--text-color-light);
}
.conf-number {
  font-family: monospace;
  font-size: var(--h2-font-size);
  font-weight: var(--font-semi-bold);
  color: var(--primary-color);
}
.btn-copy {
  background-color: var(--accent-color);
  color: var(--primary-color);
  border: none;
  border-radius: var(--radius);
  padding: 0.6rem 1rem;
  font-weight: var(--font-medium);
  cursor: pointer;
  transition: 0.3s;
}
.btn-copy:hover {
  background-color: var(--accent-color-hover);
}

/* Details Grid */
.details-grid {
  display: grid;
  gap: var(--space-lg);
  margin-bottom: var(--space-lg);
}
@media screen and (min-width: 768px) {
  .details-grid {
    grid-template-columns: 1fr 1fr;
  }
}
.detail-title {
  font-size: var(--h3-font-size);
  margin-bottom: var(--space-sm);
  padding-bottom: var(--space-xs);
  border-bottom: 1px solid var(--border-color);
}
.detail-item {
  display: flex;
  justify-content: space-between;
  font-size: var(--normal-font-size);
  margin-bottom: var(--space-xs);
}
.detail-item span:first-child {
  color: var(--text-color-light);
}
.detail-item span:last-child {
  font-weight: var(--font-medium);
  text-align: right;
}

/* Price Breakdown */
.price-breakdown {
  margin-bottom: var(--space-xl);
}
.summary-item,
.summary-total {
  display: flex;
  justify-content: space-between;
  margin-bottom: var(--space-sm);
}
.summary-divider {
  border: none;
  height: 1px;
  background-color: var(--border-color);
  margin: var(--space-sm) 0;
}
.summary-total {
  font-size: var(--h3-font-size);
  font-weight: var(--font-semi-bold);
}
.total-price {
  font-size: var(--h1-font-size);
  color: var(--accent-color);
}
/* Actions */
.confirmation-actions {
  display: flex;
  justify-content: center;
  gap: var(--space-sm);
}
.confirmation-actions .btn {
  width: auto;
}
/* No Results State */
.no-results {
  text-align: center;
  padding: var(--space-xl);
}
</style>
