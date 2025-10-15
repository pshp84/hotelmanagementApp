<template>
  <div 
    class="room-card" 
    ref="roomCard"
    @mouseenter="onCardHover"
    @mouseleave="onCardLeave"
  >
    <div class="room-card__image-wrapper">
      <img :src="room.image" :alt="room.name" class="room-card__image" ref="roomImage" />
    </div>
    <div class="room-card__content">
      <h3 class="room-card__title" ref="title">{{ room.name }}</h3>
      <p class="room-card__description" ref="description">{{ room.description }}</p>
      <div class="room-card__amenities" ref="amenities">
        <span
          v-for="amenity in room.amenities"
          :key="amenity"
          class="amenity-tag"
          >{{ amenity }}</span
        >
      </div>
      <div class="room-card__footer">
        <div class="room-card__price" ref="price">
          <span class="price-amount">${{ room.price }}</span>
          <span class="price-note">/ night</span>
        </div>
        <button 
          class="btn btn--primary" 
          ref="bookButton"
          @click="handleBookClick"
        >
          Book Now
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, inject } from 'vue';

const props = defineProps({ room: { type: Object, required: true } });
const emit = defineEmits(["book"]);

const gsap = inject('gsap');

const roomCard = ref(null);
const roomImage = ref(null);
const title = ref(null);
const description = ref(null);
const amenities = ref(null);
const price = ref(null);
const bookButton = ref(null);

onMounted(() => {
  if (!roomCard.value) return;
  
  gsap.set([roomCard.value, roomImage.value, title.value, description.value, amenities.value, price.value, bookButton.value], {
    opacity: 0,
    y: 20
  });
  
  gsap.to(roomCard.value, {
    opacity: 1,
    y: 0,
    duration: 0.6,
    ease: "power2.out"
  });
  
  gsap.to([roomImage.value, title.value, description.value], {
    opacity: 1,
    y: 0,
    duration: 0.5,
    stagger: 0.1,
    ease: "power2.out",
    delay: 0.2
  });
  
  gsap.to([amenities.value, price.value, bookButton.value], {
    opacity: 1,
    y: 0,
    duration: 0.4,
    stagger: 0.1,
    ease: "power2.out",
    delay: 0.4
  });
});

const onCardHover = () => {
  if (!roomCard.value || !roomImage.value) return;
  
  gsap.to(roomCard.value, {
    y: -5,
    scale: 1.02,
    duration: 0.3,
    ease: "power2.out"
  });
  
  gsap.to(roomImage.value, {
    scale: 1.05,
    duration: 0.4,
    ease: "power2.out"
  });
};

const onCardLeave = () => {
  if (!roomCard.value || !roomImage.value) return;
  
  gsap.to(roomCard.value, {
    y: 0,
    scale: 1,
    duration: 0.3,
    ease: "power2.out"
  });
  
  gsap.to(roomImage.value, {
    scale: 1,
    duration: 0.4,
    ease: "power2.out"
  });
};

const handleBookClick = () => {
  if (!bookButton.value) return;
  
  gsap.to(bookButton.value, {
    scale: 0.95,
    duration: 0.1,
    ease: "power2.in"
  });
  
  gsap.to(bookButton.value, {
    scale: 1,
    duration: 0.2,
    ease: "back.out(1.7)"
  });
  
  setTimeout(() => {
    emit('book', props.room);
  }, 150);
};
</script>

<style scoped>
.room-card {
  background-color: var(--container-color);
  border-radius: var(--radius);
  box-shadow: var(--shadow-sm);
  overflow: hidden;
  display: flex;
  flex-direction: column;
  will-change: transform;
}

.room-card__image-wrapper {
  overflow: hidden;
}

.room-card__image {
  width: 100%;
  height: 220px;
  object-fit: cover;
  will-change: transform;
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
  align-items: flex-end;
  margin-top: auto;
  border-top: 1px solid var(--border-color);
  padding-top: var(--space-sm);
  gap: var(--space-sm);
}

.room-card__price {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
}

.room-card__price .price-amount {
  font-size: var(--h2-font-size);
  font-weight: var(--font-semi-bold);
  color: var(--accent-color);
  line-height: 1;
}

.room-card__price .price-note {
  font-size: var(--small-font-size);
  color: var(--text-color-light);
  margin-top: 0.25rem;
}

.room-card__footer .btn {
  width: auto;
  padding: 0.75rem 1.5rem;
  font-size: var(--normal-font-size);
  flex-shrink: 0;
}
</style>
