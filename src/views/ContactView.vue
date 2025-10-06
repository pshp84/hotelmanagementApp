<template>
  <div class="contact-page main">
    <div class="container">
      <Stepper :current-step="3" />

      <div class="page-layout">
        <main class="main-content card">
          <h1 class="form-title">Almost there!</h1>
          <p class="form-subtitle">
            Please provide your details to complete the booking.
          </p>

          <form @submit.prevent="handleSubmit">
            <div class="form-group">
              <label for="full-name" class="form-label">Full Name</label>
              <input
                type="text"
                id="full-name"
                class="form-input"
                v-model="contact.fullName"
                required
                placeholder="e.g., John Doe"
              />
            </div>

            <div class="form-group">
              <label for="email" class="form-label">Email Address</label>
              <input
                type="email"
                id="email"
                class="form-input"
                v-model="contact.email"
                required
                placeholder="e.g., your.email@example.com"
              />
            </div>

            <div class="form-group">
              <label for="mobile" class="form-label">Mobile Number</label>
              <input
                type="tel"
                id="mobile"
                class="form-input"
                v-model="contact.mobile"
                required
                placeholder="e.g., 9876543210"
                maxlength="10"
                pattern="[0-9]{10}"
              />
            </div>

            <button type="submit" class="btn btn--primary">
              Proceed & Confirm
            </button>
          </form>
        </main>

        <aside class="sidebar">
          <div class="booking-summary card" v-if="bookingStore.selectedRoom">
            <img
              :src="bookingStore.selectedRoom.image"
              alt="Selected Room"
              class="summary__image"
            />
            <div class="summary__content">
              <h3 class="summary__room-name">
                {{ bookingStore.selectedRoom.name }}
              </h3>

              <div class="summary-item">
                <span>{{ bookingStore.numberOfNights }} night(s)</span>
                <span>${{ bookingStore.priceDetails.subtotal }}</span>
              </div>
              <div class="summary-item">
                <span>Taxes & Fees (9%)</span>
                <span>${{ bookingStore.priceDetails.tax }}</span>
              </div>

              <hr class="summary-divider" />

              <div class="summary-total">
                <span class="total-label">Total</span>
                <span class="total-price"
                  >${{ bookingStore.priceDetails.total }}</span
                >
              </div>
            </div>
          </div>
        </aside>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { useRouter } from "vue-router";
import { useBookingStore } from "@/stores/booking";
import Stepper from "@/components/Stepper.vue";

const router = useRouter();
const bookingStore = useBookingStore();

const contact = ref({
  fullName: "",
  email: "",
  mobile: "",
});

const handleSubmit = async () => {
  try {
    bookingStore.setContactDetails(contact.value);

    await bookingStore.bookRoom();

    router.push("/confirmation");
  } catch (error) {
    console.error("Booking failed:", error);
  }
};

onMounted(() => {
  if (!bookingStore.selectedRoom) {
    router.push("/select-room");
  }
});
</script>

<style scoped>
.page-layout {
  display: grid;
  gap: var(--space-lg);
  align-items: start;
}

@media screen and (min-width: 992px) {
  .page-layout {
    grid-template-columns: 2fr 1fr;
  }
}

.form-title {
  font-size: var(--h1-font-size);
  text-align: center;
}
.form-subtitle {
  text-align: center;
  color: var(--text-color-light);
  margin-bottom: var(--space-lg);
}

/* Booking Summary Sidebar */
.booking-summary {
  padding: 0;
  position: sticky;
  top: calc(var(--header-height) + var(--space-lg));
  overflow: hidden;
}
.summary__image {
  width: 100%;
  height: 200px;
  object-fit: cover;
}
.summary__content {
  padding: var(--space-md);
}
.summary__room-name {
  font-size: var(--h2-font-size);
  margin-bottom: var(--space-md);
}
.summary-item {
  display: flex;
  justify-content: space-between;
  margin-bottom: var(--space-sm);
  color: var(--text-color);
}
.summary-divider {
  border: none;
  height: 1px;
  background-color: var(--border-color);
  margin: var(--space-sm) 0;
}
.summary-total {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: var(--space-sm);
}
.total-label {
  font-size: var(--h3-font-size);
  font-weight: var(--font-medium);
  color: var(--title-color);
}
.total-price {
  font-size: var(--h1-font-size);
  font-weight: var(--font-semi-bold);
  color: var(--accent-color);
}
</style>
