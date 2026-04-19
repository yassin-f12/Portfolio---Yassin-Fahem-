<script setup>
import { ref, onMounted, onUnmounted, computed } from 'vue'

const dudeRef = ref(null)
const isHanging = ref(true)
const isLanded = ref(false)
const posY = ref(0)

const HEIGHT = 60

const updatePosition = () => {
    const scrollTop = window.scrollY
    const docHeight = document.documentElement.scrollHeight - window.innerHeight
    const footer = document.getElementById('footer')

    const footerTopAbsolute = footer
        ? footer.offsetTop
        : document.documentElement.scrollHeight

    const maxYAbsolute = footerTopAbsolute - HEIGHT - 10

    if (scrollTop === 0) {
        isHanging.value = true
        isLanded.value = false
        posY.value = HEIGHT
        return
    }

    isHanging.value = false

    const percent = docHeight <= 0 ? 0 : Math.min(scrollTop / docHeight, 1)
    const targetAbsolute = HEIGHT + percent * (maxYAbsolute - HEIGHT)
    const targetRelative = targetAbsolute - scrollTop

    if (targetRelative <= HEIGHT) {
        isLanded.value = true
        posY.value = HEIGHT
    } else {
        isLanded.value = false
        posY.value = targetRelative
    }
}

const handleClick = () => {
    if (isLanded.value || !isHanging.value) {
        window.scrollTo({ top: 0, behavior: 'smooth' })
    } else {
        window.scrollTo({ top: document.documentElement.scrollHeight, behavior: 'smooth' })
    }
}

const ropeHeight = computed(() => Math.max(posY.value - 10, 10))

onMounted(() => {
    updatePosition()
    window.addEventListener('scroll', updatePosition, { passive: true })
})

onUnmounted(() => {
    window.removeEventListener('scroll', updatePosition)
})
</script>

<template>
    <div class="scroll-track">

        <svg class="rope-svg" :height="ropeHeight + 20" width="50">
            <path :d="`M 29 0 Q 34 ${ropeHeight * 0.5} 29 ${ropeHeight}`" fill="none" stroke="#c8d6e5"
                stroke-width="1.5" stroke-dasharray="4 4" />
        </svg>

        <div ref="dudeRef" class="dude" :class="{
            hanging: isHanging,
            falling: !isHanging && !isLanded,
            landed: isLanded
        }" :style="{ top: posY + 'px' }" @click="handleClick"
            :title="isHanging ? 'Tomber en bas ↓' : 'Remonter en haut ↑'">
            <svg class="dude-svg" :class="{ wobble: !isHanging && !isLanded }" viewBox="0 0 160 160"
                xmlns="http://www.w3.org/2000/svg">
                <!-- Tête -->
                <circle cx="80" cy="35" r="18" fill="currentColor" />
                <path d="M 70 39 Q 80 49 90 39" fill="none" stroke="white" stroke-width="3" stroke-linecap="round" />
                <circle cx="73" cy="31" r="3" fill="white" />
                <circle cx="87" cy="31" r="3" fill="white" />
                <!-- Corps -->
                <line x1="80" y1="53" x2="80" y2="98" stroke="currentColor" stroke-width="8" stroke-linecap="round" />
                <!-- Bras droit -->
                <line x1="80" y1="68" x2="130" y2="10" stroke="currentColor" stroke-width="7" stroke-linecap="round" />
                <!-- Bras gauche écarté -->
                <line x1="80" y1="68" x2="30" y2="85" stroke="currentColor" stroke-width="7" stroke-linecap="round" />
                <!-- Jambes -->
                <line x1="80" y1="98" x2="50" y2="148" stroke="currentColor" stroke-width="7" stroke-linecap="round" />
                <line x1="80" y1="98" x2="110" y2="148" stroke="currentColor" stroke-width="7" stroke-linecap="round" />
            </svg>
        </div>

    </div>
</template>

<style scoped>
.scroll-track {
    position: fixed;
    right: 20px;
    top: 0;
    bottom: 0;
    width: 50px;
    z-index: 1001;
    pointer-events: none;
}

.rope-svg {
    position: absolute;
    top: 0;
    left: 3px;
    pointer-events: none;
}

.dude {
    position: absolute;
    left: 0;
    width: 36px;
    cursor: pointer;
    pointer-events: all;
    transition: top 0.12s linear;
    display: flex;
    justify-content: center;
    color: var(--text-primary);
}

.dude-svg {
    width: 36px;
    height: auto;
}

.wobble {
    animation: wobble 0.35s ease-in-out infinite alternate;
    transform-origin: center;
}

@keyframes wobble {
    from {
        transform: rotate(-8deg);
    }

    to {
        transform: rotate(8deg);
    }
}

.landed .dude-svg {
    animation: bounce-in 0.4s ease forwards;
}

@keyframes bounce-in {
    0% {
        transform: scaleY(0.8) translateY(4px);
    }

    60% {
        transform: scaleY(1.1) translateY(-3px);
    }

    100% {
        transform: scaleY(1) translateY(0);
    }
}

.dude:hover {
    opacity: 0.7;
}

@media (max-width: 480px) {
    .scroll-track {
        right: 6px;
    }
}
</style>