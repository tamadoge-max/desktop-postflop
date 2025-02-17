import { defineStore } from 'pinia';
import { ref } from 'vue';

export const useRunoutStore = defineStore('runout', () => {
  const selectedCards = ref<Set<number>>(new Set(Array.from({ length: 52 }, (_, i) => i)));

  function addCard(card: number) {
    selectedCards.value.add(card);
  }

  function removeCard(card: number) {
    selectedCards.value.delete(card);
  }

  function clearCards() {
    selectedCards.value.clear();
  }

  function isCardSelected(card: number): boolean {
    return selectedCards.value.has(card);
  }

  return {
    selectedCards,
    addCard,
    removeCard,
    clearCards,
    isCardSelected,
  };
}); 