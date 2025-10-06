<template>
  <div class="room-card">
    <div class="room-card__image-wrapper">
      <img :src="room.image" :alt="room.name" class="room-card__image" />
    </div>
    <div class="room-card__content">
      <h3 class="room-card__title">{{ room.name }}</h3>
      <p class="room-card__description">{{ room.description }}</p>
      <div class="room-card__amenities">
        <span
          v-for="amenity in room.amenities"
          :key="amenity"
          class="amenity-tag"
          >{{ amenity }}</span
        >
      </div>
      <div class="room-card__footer">
        <div class="room-card__price">
          <span class="price-amount">${{ room.price }}</span>
          <span class="price-note">/ night</span>
        </div>
        <button class="btn btn--primary" @click="$emit('book', room)">
          Book Now
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
defineProps({ room: { type: Object, required: true } });
defineEmits(["book"]);
</script>

<style scoped>
.room-card {
  background-color: var(--container-color);
  border-radius: var(--radius);
  box-shadow: var(--shadow-sm);
  overflow: hidden;
  display: flex;
  flex-direction: column;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}
.room-card:hover {
  transform: translateY(-8px);
  box-shadow: var(--shadow);
}
.room-card__image-wrapper {
  overflow: hidden;
}
.room-card__image {
  width: 100%;
  height: 220px;
  object-fit: cover;
  transition: transform 0.4s ease;
}
.room-card:hover .room-card__image {
  transform: scale(1.05);
}
.room-card__content {
  padding: var(--space-md);
  display: flex;
  flex-direction: column;
  flex-grow: 1;
}
.room-card__title {
  font-size: var(--h3-font-size);
  margin-bottom: var(--space-xs);
}
.room-card__description {
  margin-bottom: var(--space-sm);
  flex-grow: 1;
  font-size: var(--small-font-size);
  line-height: 1.6;
}
.room-card__amenities {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  margin-bottom: var(--space-md);
}
.amenity-tag {
  background-color: var(--secondary-color);
  padding: 0.25rem 0.75rem;
  border-radius: 99px;
  font-size: var(--small-font-size);
  color: var(--text-color);
  border: 1px solid var(--border-color);
}
.room-card__footer {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: auto;
  border-top: 1px solid var(--border-color);
  padding-top: var(--space-sm);
}
.room-card__price .price-amount {
  font-size: var(--h2-font-size);
  font-weight: var(--font-semi-bold);
  color: var(--accent-color);
}
.room-card__price .price-note {
  font-size: var(--small-font-size);
  color: var(--text-color-light);
  margin-left: 0.25rem;
}
.room-card__footer .btn {
  width: auto;
  padding: 0.75rem 1.5rem;
  font-size: var(--normal-font-size);
}
</style>
