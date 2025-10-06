<template>
  <div class="booking-card card">
    <div class="booking-card__header">
      <h3 class="booking-card__room-name">{{ booking.room_name }}</h3>
      <span
        class="booking-card__status"
        :class="`status--${booking.status.toLowerCase()}`"
      >
        {{ formatStatus(booking.status) }}
      </span>
    </div>
    <div class="booking-card__body">
      <div class="booking-card__detail">
        <span class="detail-label">Confirmation #</span>
        <span class="detail-value conf-number">{{
          booking.confirmation_number
        }}</span>
      </div>
      <div class="booking-card__detail">
        <span class="detail-label">Dates</span>
        <span class="detail-value">
          {{ formatDate(booking.check_in) }} &rarr;
          {{ formatDate(booking.check_out) }}
        </span>
      </div>
      <div class="booking-card__detail">
        <span class="detail-label">Total Price</span>
        <span class="detail-value price">${{ booking.total_price }}</span>
      </div>
      <div class="booking-card__detail">
        <span class="detail-label">Guests</span>
        <span class="detail-value">{{ booking.guests || 1 }}</span>
      </div>
    </div>
    <div class="booking-card__footer" v-if="booking.status === 'confirmed'">
      <button class="btn btn--secondary" @click="$emit('cancel', booking.id)">
        Cancel Booking
      </button>
    </div>
  </div>
</template>

<script setup>
import { computed } from "vue";

const props = defineProps({
  booking: { type: Object, required: true },
});

defineEmits(["cancel"]);

const formatDate = (dateString) => {
  const date = new Date(dateString);
  return date.toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
};

const formatStatus = (status) => {
  switch (status) {
    case "confirmed":
      return "Confirmed";
    case "cancelled":
      return "Cancelled";
    case "completed":
      return "Completed";
    default:
      return status;
  }
};
</script>

<style scoped>
.booking-card {
  padding: var(--space-md);
  border: 1px solid var(--border-color);
  border-radius: var(--radius);
  transition: all 0.3s ease;
}

.booking-card:hover {
  box-shadow: var(--shadow);
  transform: translateY(-2px);
}

.booking-card__header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: var(--space-md);
  padding-bottom: var(--space-sm);
  border-bottom: 1px solid var(--border-color);
}

.booking-card__room-name {
  font-size: var(--h3-font-size);
  font-weight: var(--font-semi-bold);
  color: var(--title-color);
  margin: 0;
}

.booking-card__status {
  padding: 0.25rem 0.75rem;
  border-radius: 1rem;
  font-size: var(--small-font-size);
  font-weight: var(--font-medium);
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

.status--confirmed {
  background-color: rgba(42, 157, 143, 0.1);
  color: var(--success-color);
}

.status--cancelled {
  background-color: rgba(231, 111, 81, 0.1);
  color: var(--error-color);
}

.status--completed {
  background-color: rgba(13, 27, 42, 0.1);
  color: var(--primary-color);
}

.booking-card__body {
  margin-bottom: var(--space-md);
}

.booking-card__detail {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: var(--space-xs);
}

.booking-card__detail:last-child {
  margin-bottom: 0;
}

.detail-label {
  font-size: var(--small-font-size);
  color: var(--text-color-light);
  font-weight: var(--font-medium);
}

.detail-value {
  font-size: var(--normal-font-size);
  color: var(--text-color);
  font-weight: var(--font-medium);
}

.detail-value.conf-number {
  font-family: monospace;
  font-size: var(--small-font-size);
  background-color: var(--secondary-color);
  padding: 0.25rem 0.5rem;
  border-radius: 4px;
}

.detail-value.price {
  font-size: var(--h3-font-size);
  font-weight: var(--font-semi-bold);
  color: var(--accent-color);
}

.booking-card__footer {
  padding-top: var(--space-sm);
  border-top: 1px solid var(--border-color);
}

.btn--secondary {
  background-color: transparent;
  color: var(--error-color);
  border: 1px solid var(--error-color);
}

.btn--secondary:hover {
  background-color: var(--error-color);
  color: white;
  transform: none;
}

/* Responsive Design */
@media (max-width: 768px) {
  .booking-card__header {
    flex-direction: column;
    align-items: flex-start;
    gap: var(--space-xs);
  }

  .booking-card__room-name {
    font-size: var(--normal-font-size);
  }

  .booking-card__detail {
    flex-direction: column;
    align-items: flex-start;
    gap: 0.25rem;
  }

  .detail-value {
    font-size: var(--small-font-size);
  }
}
</style>
