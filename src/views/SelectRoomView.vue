<template>
  <div class="select-room-page main">
    <div class="container">
      <Stepper :current-step="2" />
      <h1 class="section__title">Choose Your Perfect Room</h1>

      <div class="page-layout">
        <aside class="sidebar">
          <RoomFilter @update-filters="handleFilterUpdate" />
        </aside>

        <main class="main-content">
          <div v-if="filteredRooms.length > 0" class="room-grid">
            <RoomCard
              v-for="room in filteredRooms"
              :key="room.id"
              :room="room"
              @book="handleBookRoom"
            />
          </div>
          <div v-else class="card no-results">
            <h3>No Rooms Found</h3>
            <p>Try adjusting your filters to find available rooms.</p>
          </div>
        </main>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from "vue";
import { useRouter } from "vue-router";
import { useBookingStore } from "@/stores/booking";
import { useAuthStore } from "@/stores/auth";
import Stepper from "@/components/Stepper.vue";
import RoomCard from "@/components/RoomCard.vue";
import RoomFilter from "@/components/RoomFilter.vue";

const router = useRouter();
const bookingStore = useBookingStore();
const authStore = useAuthStore();

const activeFilters = ref({
  sortBy: "default",
  amenities: [],
});

const handleFilterUpdate = (filters) => {
  activeFilters.value = filters;
};

const filteredRooms = computed(() => {
  let roomsToFilter = [...bookingStore.rooms];

  if (activeFilters.value.amenities.length > 0) {
    roomsToFilter = roomsToFilter.filter((room) =>
      activeFilters.value.amenities.every((amenity) =>
        room.amenities.includes(amenity)
      )
    );
  }

  switch (activeFilters.value.sortBy) {
    case "price-asc":
      roomsToFilter.sort((a, b) => a.price - b.price);
      break;
    case "price-desc":
      roomsToFilter.sort((a, b) => b.price - a.price);
      break;
  }

  return roomsToFilter;
});

const handleBookRoom = (room) => {
  if (!authStore.isAuthenticated) {
    bookingStore.selectRoom(room);
    router.push("/login");
    return;
  }

  bookingStore.selectRoom(room);
  router.push("/contact");
};

onMounted(async () => {
  if (!bookingStore.searchParams.checkIn) {
    router.push("/");
    return;
  }

  try {
    await bookingStore.fetchRooms();
  } catch (error) {
    console.error("Failed to fetch rooms:", error);
  }
});
</script>

<style scoped>
.page-layout {
  display: grid;
  gap: var(--space-lg);
}

@media screen and (min-width: 992px) {
  .page-layout {
    grid-template-columns: 280px 1fr;
  }
}

.room-grid {
  display: grid;
  gap: var(--space-md);
}

@media screen and (min-width: 768px) {
  .room-grid {
    grid-template-columns: repeat(2, 1fr);
  }
}

.no-results {
  text-align: center;
  padding: var(--space-xl);
}
.no-results h3 {
  margin-bottom: var(--space-sm);
}
.no-results p {
  color: var(--text-color-light);
}
</style>
