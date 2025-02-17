<template>
  <div class="runout-selector">
    <h3>Select Possible Runouts</h3>
    <div class="card-grid">
      <div 
        v-for="card in allCards" 
        :key="card"
        :class="['card', { selected: isSelected(card) }]"
        @click="toggleCard(card)"
        @mouseenter="startDrag"
        @mouseleave="endDrag"
        @mouseover="handleDragOver(card)"
      >
        {{ formatCard(card) }}
      </div>
    </div>
    <div class="controls">
      <button @click="selectAll">Select All</button>
      <button @click="deselectAll">Deselect All</button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { useRunoutStore } from '../stores/runout';

const store = useRunoutStore();

const isDragging = ref(false);
const initialDragState = ref<boolean>(false);

const allCards = Array.from({ length: 52 }, (_, i) => i);

const isSelected = (card: number): boolean => {
  return store.selectedCards.has(card);
};

const startDrag = (event: MouseEvent) => {
  isDragging.value = true;
  const target = event.target as HTMLElement;
  initialDragState.value = !isSelected(parseInt(target.getAttribute('data-card-index') || '0'));
};

const endDrag = () => {
  isDragging.value = false;
};

const handleDragOver = (card: number) => {
  if (isDragging.value) {
    if (initialDragState.value) {
      store.addCard(card);
    } else {
      store.removeCard(card);
    }
  }
};

const toggleCard = (card: number) => {
  if (isSelected(card)) {
    store.removeCard(card);
  } else {
    store.addCard(card);
  }
};

const selectAll = () => {
  allCards.forEach(card => store.addCard(card));
};

const deselectAll = () => {
  store.clearCards();
};

const formatCard = (card: number): string => {
  const ranks = '23456789TJQKA';
  const suits = '♣♦♥♠';
  const rank = ranks[Math.floor(card / 4)];
  const suit = suits[card % 4];
  return `${rank}${suit}`;
};

// Initialize all cards as selected by default
onMounted(() => {
  selectAll();
});
</script>

<style scoped>
.runout-selector {
  padding: 1rem;
}

.card-grid {
  display: grid;
  grid-template-columns: repeat(13, 1fr);
  gap: 4px;
  margin-bottom: 1rem;
}

.card {
  padding: 4px;
  border: 1px solid #666;
  text-align: center;
  cursor: pointer;
  user-select: none;
}

.card.selected {
  background-color: #4CAF50;
  color: white;
}

.controls {
  display: flex;
  gap: 1rem;
}

button {
  padding: 0.5rem 1rem;
  cursor: pointer;
}
</style> 