<script setup>
import { onMounted, ref } from 'vue'

const isMenuOpen = ref(false)

const toggleMenu = () => {
    isMenuOpen.value = !isMenuOpen.value
}

const closeMenu = () => {
    isMenuOpen.value = false
}

const title1 = ref('')
const title2 = ref('')

const typeText = (text, target, delay = 0) => {
    const letters = text.split('')
    letters.forEach((letter, i) => {
        setTimeout(() => {
            target.value += letter
        }, delay + i * 40)
    })
}

onMounted(() => {
    const t1 = 'Développeur Full-Stack.'
    const t2 = 'Création d\'expériences web modernes.'
    typeText(t1, title1)
    typeText(t2, title2, t1.length * 40 + 300)
})
</script>

<template>
    <header>
        <div class="container-logo">
            <h1 class="logo" title="Fahem Yassin">YF</h1>
            <span>•</span>
        </div>

        <nav class="desktop-nav">
            <a href="#projets" title="Voir mes projets">Projets</a>
            <a href="#a-propos" title="À propos de moi">À propos</a>
            <a href="#contact" title="Me contacter">Contact</a>
        </nav>

        <button class="burger-btn" @click="toggleMenu" aria-label="Toggle menu" :aria-expanded="isMenuOpen">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path class="line line1" :class="{ 'open': isMenuOpen }" d="M4 6h16" />
                <path class="line line2" :class="{ 'open': isMenuOpen }" d="M4 12h16" />
                <path class="line line3" :class="{ 'open': isMenuOpen }" d="M4 18h16" />
            </svg>
        </button>

        <Transition name="slide">
            <nav v-if="isMenuOpen" class="mobile-nav">
                <a href="#projets" @click="closeMenu">Projets</a>
                <a href="#a-propos" @click="closeMenu">À propos</a>
                <a href="#contact" @click="closeMenu">Contact</a>
            </nav>
        </Transition>
    </header>

    <section class="bloc fade-in" title="Qui je suis">
        <div class="titles">
            <h2 class="title typewriter">{{ title1 }}</h2>
            <h3 class="title typewriter">{{ title2 }}</h3>
        </div>
        <div class="btns">
            <a href="#projets" title="Voir mes projets" class="project-btn btn">Voir mes projets</a>
            <a href="#contact" title="Me contacter" class="contact-btn btn">Me contacter</a>
        </div>
    </section>
</template>

<style scoped>
header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin: 2% 5%;
    position: relative;
}

.container-logo {
    display: flex;
    align-items: flex-end;
}

.container-logo span {
    font-size: 22px;
    line-height: 1;
    margin-bottom: 4px;
    color: var(--text-primary);
    user-select: none;
}

h1.logo {
    font-weight: 700;
    letter-spacing: -0.04em;
    user-select: none;
}

.desktop-nav {
    display: flex;
    gap: 20px;
}

.desktop-nav a {
    font-size: 1em;
    color: var(--text-muted);
    letter-spacing: -0.04em;
}

.burger-btn {
    display: none;
    background: none;
    border: none;
    cursor: pointer;
    padding: 8px;
    z-index: 100;
    position: relative;
}

.burger-btn svg {
    width: 28px;
    height: 28px;
    color: var(--text-primary);
    display: block;
}

.line {
    transition: all 0.3s ease;
    transform-origin: center;
}

.line1.open {
    transform: rotate(45deg) translate(5px, 5px);
}

.line2.open {
    opacity: 0;
}

.line3.open {
    transform: rotate(-45deg) translate(1px, -1px);
}

.bloc {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 45px;
    margin-top: 7%;
    will-change: transform;
}

.titles {
    text-align: center;
}

.titles .title {
    font-weight: 700;
    font-size: 40px;
    margin: 0;
    line-height: 1;
    letter-spacing: -0.04em;
}

.titles h3 {
    color: var(--text-secondary);
}

.typewriter {
    overflow: hidden;
    position: relative;
    display: block;
    white-space: nowrap;
    will-change: contents;
    min-height: 1.2em;
}

.typewriter::after {
    content: '';
    position: absolute;
    right: -4px;
    top: 50%;
    transform: translateY(-50%);
    width: 2px;
    height: 0.8em;
    background: #0d1b2a;
    animation: blink 0.7s step-end infinite;
}

@keyframes blink {
    50% {
        background: transparent;
    }
}

.btns {
    display: flex;
    gap: 20px;
}

.btn {
    border-radius: 20px;
    padding: 5px 12px;
    letter-spacing: -0.04em;
}

.project-btn {
    background-color: #000;
    color: #fff;
}

.contact-btn {
    background-color: #eee;
    color: #000;
}

@media (max-width: 768px) {
    .desktop-nav {
        display: none;
    }

    .burger-btn {
        display: block;
    }

    .mobile-nav {
        display: flex;          
        position: absolute;
        top: 0;
        left: 0;   
        width: 100%;
        background-color: #fff;
        padding: 30px;
        gap: 30px;
        box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
    }

    .mobile-nav a {
        font-size: 18px;
        color: var(--text-muted);
        font-weight: 600;
        letter-spacing: -0.02em;
    }

    .titles .title {
        font-size: 32px;
    }

    .btns {
        flex-direction: column;
        width: 100%;
        padding: 0 20px;
    }

    .btn {
        text-align: center;
        padding: 10px;
    }

    .typewriter {
        white-space: normal;
    }
}

@media (max-width: 480px) {
    header {
        margin: 4% 5%;
    }

    .titles .title {
        font-size: 28px;
    }

    .bloc {
        margin-top: 12%;
    }
}

.slide-enter-active,
.slide-leave-active {
    transition: transform 0.3s ease;
}

.slide-enter-from,
.slide-leave-to {
    transform: translateX(100vw);
}
</style>
