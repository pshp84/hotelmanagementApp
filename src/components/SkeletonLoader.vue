<template>
  <div class="skeleton-container" ref="skeletonContainer">
    <!-- Room Card Skeleton -->
    <div v-if="type === 'room-card'" class="skeleton-room-card">
      <div class="skeleton-image" ref="imageSkeleton"></div>
      <div class="skeleton-content">
        <div class="skeleton-line skeleton-title" ref="titleSkeleton"></div>
        <div class="skeleton-line skeleton-description" ref="descriptionSkeleton"></div>
        <div class="skeleton-amenities">
          <div class="skeleton-tag" ref="tag1"></div>
          <div class="skeleton-tag" ref="tag2"></div>
          <div class="skeleton-tag" ref="tag3"></div>
        </div>
        <div class="skeleton-footer">
          <div class="skeleton-price" ref="priceSkeleton"></div>
          <div class="skeleton-button" ref="buttonSkeleton"></div>
        </div>
      </div>
    </div>

    <!-- Booking Card Skeleton -->
    <div v-else-if="type === 'booking-card'" class="skeleton-booking-card">
      <div class="skeleton-header">
        <div class="skeleton-line skeleton-room-name" ref="roomNameSkeleton"></div>
        <div class="skeleton-status" ref="statusSkeleton"></div>
      </div>
      <div class="skeleton-body">
        <div class="skeleton-detail" v-for="i in 4" :key="i">
          <div class="skeleton-line skeleton-label" :ref="el => labelRefs[i-1] = el"></div>
          <div class="skeleton-line skeleton-value" :ref="el => valueRefs[i-1] = el"></div>
        </div>
      </div>
    </div>

    <!-- Dashboard Skeleton -->
    <div v-else-if="type === 'dashboard'" class="skeleton-dashboard">
      <div class="skeleton-section">
        <div class="skeleton-line skeleton-section-title" ref="sectionTitle"></div>
        <div class="skeleton-cards">
          <div class="skeleton-card" v-for="i in count" :key="i" :ref="el => cardRefs[i-1] = el"></div>
        </div>
      </div>
    </div>

    <!-- Generic List Skeleton -->
    <div v-else class="skeleton-list">
      <div class="skeleton-line" v-for="i in count" :key="i" :ref="el => lineRefs[i-1] = el"></div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, inject } from 'vue';

const props = defineProps({
  type: {
    type: String,
    default: 'list',
    validator: (value) => ['room-card', 'booking-card', 'dashboard', 'list'].includes(value)
  },
  count: {
    type: Number,
    default: 3
  }
});

const gsap = inject('gsap');


const skeletonContainer = ref(null);

onMounted(() => {
  if (!skeletonContainer.value) return;
  

  const skeletonElements = skeletonContainer.value.querySelectorAll('.skeleton-line, .skeleton-image, .skeleton-tag, .skeleton-status, .skeleton-button, .skeleton-card');
  
  if (skeletonElements.length === 0) return;
  

  gsap.set(skeletonElements, {
    opacity: 0.3
  });
  

  gsap.to(skeletonElements, {
    opacity: 1,
    duration: 0.6,
    stagger: 0.1,
    ease: "power2.out",
    delay: 0.2
  });
});

</script>

<style scoped>
.skeleton-container {
  width: 100%;
}

.skeleton-line,
.skeleton-image,
.skeleton-tag,
.skeleton-status,
.skeleton-button,
.skeleton-card {
  background: linear-gradient(90deg, 
    var(--border-color) 25%, 
    var(--secondary-color) 50%, 
    var(--border-color) 75%);
  background-size: 200% 100%;
  border-radius: 4px;
  animation: shimmer 1.5s infinite;
}

.skeleton-room-card {
  background-color: var(--container-color);
  border-radius: var(--radius);
  box-shadow: var(--shadow-sm);
  overflow: hidden;
  margin-bottom: var(--space-md);
}

.skeleton-image {
  width: 100%;
  height: 220px;
  margin-bottom: var(--space-md);
}

.skeleton-content {
  padding: var(--space-md);
}

.skeleton-title {
  width: 70%;
  height: 24px;
  margin-bottom: var(--space-sm);
}

.skeleton-description {
  width: 100%;
  height: 16px;
  margin-bottom: var(--space-md);
}

.skeleton-amenities {
  display: flex;
  gap: var(--space-xs);
  margin-bottom: var(--space-md);
}

.skeleton-tag {
  width: 80px;
  height: 24px;
  border-radius: 12px;
}

.skeleton-footer {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-top: var(--space-sm);
  border-top: 1px solid var(--border-color);
}

.skeleton-price {
  width: 100px;
  height: 28px;
}

.skeleton-button {
  width: 120px;
  height: 40px;
  border-radius: var(--radius);
}

.skeleton-booking-card {
  background-color: var(--container-color);
  border: 1px solid var(--border-color);
  border-radius: var(--radius);
  padding: var(--space-md);
  margin-bottom: var(--space-md);
}

.skeleton-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: var(--space-md);
  padding-bottom: var(--space-sm);
  border-bottom: 1px solid var(--border-color);
}

.skeleton-room-name {
  width: 60%;
  height: 20px;
}

.skeleton-status {
  width: 80px;
  height: 24px;
  border-radius: 12px;
}

.skeleton-detail {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: var(--space-xs);
}

.skeleton-label {
  width: 40%;
  height: 14px;
}

.skeleton-value {
  width: 50%;
  height: 16px;
}

.skeleton-dashboard {
  width: 100%;
}

.skeleton-section-title {
  width: 200px;
  height: 28px;
  margin-bottom: var(--space-md);
  border-radius: 4px;
}

.skeleton-cards {
  display: grid;
  gap: var(--space-md);
}

.skeleton-card {
  height: 120px;
  border-radius: var(--radius);
}

.skeleton-list {
  width: 100%;
}

.skeleton-list .skeleton-line {
  width: 100%;
  height: 16px;
  margin-bottom: var(--space-sm);
}

.skeleton-list .skeleton-line:last-child {
  width: 60%;
}

@keyframes shimmer {
  0% {
    background-position: -200% 0;
  }
  100% {
    background-position: 200% 0;
  }
}

@media (max-width: 768px) {
  .skeleton-footer {
    flex-direction: column;
    gap: var(--space-sm);
    align-items: stretch;
  }
  
  .skeleton-button {
    width: 100%;
  }
}
</style>
