<template>
  <div class="hand-breakdown" v-if="show">
    <div class="breakdown-header">
      <h3>{{ hand }} Breakdown</h3>
      <button @click="$emit('close')" class="close-btn">&times;</button>
    </div>

    <div class="breakdown-sections">
      <!-- Strength Improvements Section -->
      <section class="breakdown-section">
        <h4>Hand Strength Breakdown</h4>
        <div v-if="isPocketPair">
          <div class="breakdown-row">
            <span>Unimproved:</span>
            <span>{{ formatEV(strengthBreakdown.unimproved) }}</span>
          </div>
          <div class="breakdown-row">
            <span>Improve to Set:</span>
            <span>{{ formatEV(strengthBreakdown.set) }}</span>
          </div>
          <div class="breakdown-row">
            <span>Improve to Straight:</span>
            <span>{{ formatEV(strengthBreakdown.straight) }}</span>
          </div>
          <div class="breakdown-row">
            <span>Improve to Flush+:</span>
            <span>{{ formatEV(strengthBreakdown.flushPlus) }}</span>
          </div>
        </div>
        <div v-else>
          <div class="breakdown-row">
            <span>Unimproved:</span>
            <span>{{ formatEV(strengthBreakdown.unimproved) }}</span>
          </div>
          <div class="breakdown-row">
            <span>Improve to Pair:</span>
            <span>{{ formatEV(strengthBreakdown.pair) }}</span>
          </div>
          <div class="breakdown-row">
            <span>Improve to 2Pair/Trips:</span>
            <span>{{ formatEV(strengthBreakdown.twoPairTrips) }}</span>
          </div>
          <div class="breakdown-row">
            <span>Improve to Straight:</span>
            <span>{{ formatEV(strengthBreakdown.straight) }}</span>
          </div>
          <div class="breakdown-row">
            <span>Improve to Flush+:</span>
            <span>{{ formatEV(strengthBreakdown.flushPlus) }}</span>
          </div>
        </div>
      </section>

      <!-- Action Breakdown Section -->
      <section class="breakdown-section">
        <h4>Action Breakdown</h4>
        <div class="breakdown-row">
          <span>Only Checks:</span>
          <span>{{ formatEV(actionBreakdown.onlyChecks) }}</span>
        </div>
        <div class="breakdown-row">
          <span>Face Bet:</span>
          <span>{{ formatEV(actionBreakdown.faceBet) }}</span>
        </div>
        <div class="breakdown-row">
          <span>Face Raise:</span>
          <span>{{ formatEV(actionBreakdown.faceRaise) }}</span>
        </div>
        <div class="breakdown-row">
          <span>Make Bet:</span>
          <span>{{ formatEV(actionBreakdown.makeBet) }}</span>
        </div>
        <div class="breakdown-row">
          <span>Make Raise:</span>
          <span>{{ formatEV(actionBreakdown.makeRaise) }}</span>
        </div>
        <div class="breakdown-row">
          <span>Make Call:</span>
          <span>{{ formatEV(actionBreakdown.makeCall) }}</span>
        </div>
      </section>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';

interface Props {
  show: boolean;
  hand: string;
  strengthBreakdown: {
    unimproved: number;
    pair?: number;
    set?: number;
    twoPairTrips?: number;
    straight: number;
    flushPlus: number;
  };
  actionBreakdown: {
    onlyChecks: number;
    faceBet: number;
    faceRaise: number;
    makeBet: number;
    makeRaise: number;
    makeCall: number;
  };
}

const props = defineProps<Props>();
defineEmits<{
  (e: 'close'): void;
}>();

const isPocketPair = computed(() => {
  return props.hand[0] === props.hand[2];
});

const formatEV = (ev: number) => {
  return ev.toFixed(2);
};
</script>

<style scoped>
.hand-breakdown {
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background: white;
  padding: 1.5rem;
  border-radius: 8px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  z-index: 1000;
  min-width: 400px;
}

.breakdown-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1rem;
}

.close-btn {
  background: none;
  border: none;
  font-size: 1.5rem;
  cursor: pointer;
  padding: 0.5rem;
}

.breakdown-sections {
  display: grid;
  gap: 1.5rem;
}

.breakdown-section {
  border-top: 1px solid #eee;
  padding-top: 1rem;
}

.breakdown-section h4 {
  margin-bottom: 0.75rem;
  font-weight: 600;
}

.breakdown-row {
  display: flex;
  justify-content: space-between;
  padding: 0.25rem 0;
}
</style> 