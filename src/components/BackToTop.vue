<script setup>
import { ref, onMounted, onUnmounted } from 'vue'

const isVisible = ref(false)

const handleScroll = () => {
  isVisible.value = window.scrollY > 300
}

const scrollToTop = () => {
  window.scrollTo({
    top: 0,
    behavior: 'smooth'
  })
}

onMounted(() => {
  window.addEventListener('scroll', handleScroll, { passive: true })
})

onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll)
})
</script>

<template>
  <Transition name="fade">
    <button 
      v-if="isVisible"
      @click="scrollToTop"
      class="scroll-to-top"
      aria-label="Scroll to top"
      title="Back to top"
    >
      <svg 
        viewBox="0 0 24 24" 
        fill="none" 
        stroke="currentColor" 
        stroke-width="2.5"
        stroke-linecap="round" 
        stroke-linejoin="round"
      >
        <path d="M12 19V5M5 12l7-7 7 7"/>
      </svg>
    </button>
  </Transition>
</template>

<style scoped>
.scroll-to-top {
  position: fixed;
  bottom: 30px;
  right: 30px;
  width: 50px;
  height: 50px;
  background-color: #000;
  color: #fff;
  border: none;
  border-radius: 50%;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  transition: all 0.3s ease;
  z-index: 1000;
}

.scroll-to-top:hover {
  background-color: #333;
  transform: translateY(-5px);
  box-shadow: 0 6px 16px rgba(0, 0, 0, 0.25);
}

.scroll-to-top:active {
  transform: translateY(-2px);
}

.scroll-to-top svg {
  width: 24px;
  height: 24px;
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.4s ease, transform 0.4s ease;
}

.fade-enter-from {
  opacity: 0;
  transform: translateY(20px);
}

.fade-leave-to {
  opacity: 0;
  transform: translateY(20px);
}
</style>