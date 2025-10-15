<template>
  <div class="loading-spinner" ref="spinner">
    <div class="spinner-ring"></div>
    <div class="spinner-ring"></div>
    <div class="spinner-ring"></div>
    <div class="spinner-center" ref="center">
      <div class="spinner-dot"></div>
      <div class="spinner-dot"></div>
      <div class="spinner-dot"></div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, inject } from 'vue';

const gsap = inject('gsap');

const spinner = ref(null);
const rings = ref([]);
const center = ref(null);
const dots = ref([]);

onMounted(() => {
  if (!spinner.value) return;
  
  const ringElements = spinner.value.querySelectorAll('.spinner-ring');
  const dotElements = spinner.value.querySelectorAll('.spinner-dot');
  
  rings.value = Array.from(ringElements);
  dots.value = Array.from(dotElements);
  
  gsap.to(rings.value, {
    rotation: 360,
    duration: 2,
    ease: "none",
    repeat: -1,
    stagger: 0.2
  });
  
  gsap.to(dots.value, {
    scale: 1.5,
    duration: 0.6,
    ease: "power2.inOut",
    yoyo: true,
    repeat: -1,
    stagger: 0.2
  });
  
  gsap.to(center.value, {
    rotation: 360,
    duration: 3,
    ease: "linear",
    repeat: -1
  });
});
</script>

<style scoped>
.loading-spinner {
  position: relative;
  width: 60px;
  height: 60px;
  margin: 0 auto;
}

.spinner-ring {
  position: absolute;
  width: 100%;
  height: 100%;
  border: 3px solid transparent;
  border-radius: 50%;
  animation: ring-spin 2s linear infinite;
}

.spinner-ring:nth-child(1) {
  border-top-color: var(--accent-color);
  animation-delay: 0s;
}

.spinner-ring:nth-child(2) {
  border-right-color: var(--primary-color);
  animation-delay: 0.2s;
}

.spinner-ring:nth-child(3) {
  border-bottom-color: var(--success-color);
  animation-delay: 0.4s;
}

.spinner-center {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 20px;
  height: 20px;
}

.spinner-dot {
  position: absolute;
  width: 4px;
  height: 4px;
  background-color: var(--accent-color);
  border-radius: 50%;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}

.spinner-dot:nth-child(1) {
  transform: translate(-50%, -50%) rotate(0deg) translateY(-8px);
}

.spinner-dot:nth-child(2) {
  transform: translate(-50%, -50%) rotate(120deg) translateY(-8px);
}

.spinner-dot:nth-child(3) {
  transform: translate(-50%, -50%) rotate(240deg) translateY(-8px);
}

@keyframes ring-spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}

.loading-spinner {
  animation: pulse 2s ease-in-out infinite;
}

@keyframes pulse {
  0%, 100% { opacity: 1; }
  50% { opacity: 0.7; }
}
</style>
