<template>
  <div class="stepper">
    <div
      class="stepper__step"
      :class="{ active: currentStep >= 1, completed: currentStep > 1 }"
    >
      <div class="stepper__icon">1</div>
      <div class="stepper__label">Search</div>
    </div>
    <div class="stepper__connector"></div>
    <div
      class="stepper__step"
      :class="{ active: currentStep >= 2, completed: currentStep > 2 }"
    >
      <div class="stepper__icon">2</div>
      <div class="stepper__label">Select Room</div>
    </div>
    <div class="stepper__connector"></div>
    <div
      class="stepper__step"
      :class="{ active: currentStep >= 3, completed: currentStep > 3 }"
    >
      <div class="stepper__icon">3</div>
      <div class="stepper__label">Contact</div>
    </div>
    <div class="stepper__connector"></div>
    <div class="stepper__step" :class="{ active: currentStep === 4 }">
      <div class="stepper__icon">4</div>
      <div class="stepper__label">Confirmation</div>
    </div>
  </div>
</template>

<script setup>
defineProps({
  currentStep: {
    type: Number,
    required: true,
  },
});
</script>

<style scoped>
.stepper {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin: var(--space-xl) auto var(--space-lg);
  width: 100%;
  max-width: 800px;
}
.stepper__step {
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
}
.stepper__icon {
  width: 36px;
  height: 36px;
  border-radius: 50%;
  background-color: #e0e0e0;
  color: var(--text-color-light);
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: var(--font-semi-bold);
  transition: 0.4s ease;
  border: 2px solid #e0e0e0;
}
.stepper__label {
  margin-top: var(--mb-0-5);
  font-size: var(--small-font-size);
  color: var(--text-color-light);
  font-weight: var(--font-medium);
}
.stepper__step.active .stepper__icon {
  background-color: var(--body-color);
  border-color: var(--primary-color);
  color: var(--primary-color);
}
.stepper__step.active .stepper__label {
  color: var(--primary-color);
}
.stepper__step.completed .stepper__icon {
  background-color: var(--primary-color);
  border-color: var(--primary-color);
  color: #fff;
}
.stepper__step.completed .stepper__label {
  color: var(--title-color);
}
.stepper__connector {
  flex-grow: 1;
  height: 2px;
  background-color: #e0e0e0;
  margin: 0 1rem;
  transform: translateY(-0.8rem);
}
</style>
