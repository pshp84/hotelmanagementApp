<template>
  <div class="filter-panel card">
    <h3 class="filter-panel__title">Filter & Sort</h3>

    <div class="form-group">
      <label for="sort-by" class="form-label">Sort by</label>
      <select
        id="sort-by"
        class="form-select"
        v-model="localFilters.sortBy"
        @change="emitUpdate"
      >
        <option value="default">Recommended</option>
        <option value="price-asc">Lowest Price</option>
        <option value="price-desc">Highest Price</option>
      </select>
    </div>

    <div class="form-group">
      <label class="form-label">Amenities</label>
      <div class="amenity-options">
        <div
          v-for="amenity in availableAmenities"
          :key="amenity"
          class="checkbox-group"
        >
          <input
            type="checkbox"
            :id="amenity"
            :value="amenity"
            v-model="localFilters.amenities"
            @change="emitUpdate"
          />
          <label :for="amenity">{{ amenity }}</label>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive } from "vue";

const emit = defineEmits(["update-filters"]);

const availableAmenities = ref([
  "King Bed",
  "Ocean View",
  "Free WiFi",
  "Air Conditioning",
  "Jacuzzi",
  "Kitchenette",
]);

const localFilters = reactive({
  sortBy: "default",
  amenities: [],
});

const emitUpdate = () => {
  emit("update-filters", { ...localFilters });
};
</script>

<style scoped>
.filter-panel {
  padding: var(--space-md);
  position: sticky;
  top: calc(var(--header-height) + var(--space-lg));
  align-self: start;
}

.filter-panel__title {
  margin-bottom: var(--space-md);
  padding-bottom: var(--space-sm);
  border-bottom: 1px solid var(--border-color);
}

.amenity-options {
  display: flex;
  flex-direction: column;
  gap: var(--space-xs);
}

.checkbox-group {
  display: flex;
  align-items: center;
  gap: var(--space-xs);
}

.checkbox-group input[type="checkbox"] {
  width: 1.15em;
  height: 1.15em;
  border-radius: 0.25em;
  border: 1px solid var(--border-color);
  cursor: pointer;
  accent-color: var(--accent-color);
}

.checkbox-group label {
  font-size: var(--normal-font-size);
  color: var(--text-color);
  cursor: pointer;
}
</style>
