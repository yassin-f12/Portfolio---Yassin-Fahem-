<script setup>
import Header from './components/Header.vue'
import About from './components/About.vue'
import Projects from './components/Projects.vue'
import Contact from './components/Contact.vue'
import Footer from './components/Footer.vue';
import BackToTop from './components/BackToTop.vue';
import { useScrollAnimation } from './composables/useScrollAnimation'

useScrollAnimation()
</script>

<template>
    <Header class="fade-in" />
    <Projects class="fade-in" />
    <About class="fade-in" />
    <Contact class="fade-in" />
    <Footer class="fade-in" />
    <BackToTop />
</template>

<style>
* {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
}

html {
    scroll-behavior: smooth;
}

.fade-in {
    opacity: 0;
    transform: translateY(10px);
    transition: opacity 0.6s ease, transform 0.6s ease;
}

.fade-in.visible {
    opacity: 1;
    transform: translateY(0);
}

.parallax {
    transition: transform 0.1s ease-out;
    will-change: transform;
}

body {
    font-family: 'inter', sans-serif;
    line-height: 1.5;
    font-weight: 400;
    font-synthesis: none;
    text-rendering: optimizeLegibility;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
}

#app {
    display: flex;
    flex-direction: column;
    gap: 5rem;
}

a {
    font-weight: 500;
    text-decoration: none;
    text-transform: inherit;
}
</style>
