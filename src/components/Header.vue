<script setup>
import { ref } from 'vue'

const isMenuOpen = ref(false)

const toggleMenu = () => {
  isMenuOpen.value = !isMenuOpen.value
}

const closeMenu = () => {
  isMenuOpen.value = false
}
</script>

<template>
  <header class="fade-in">
    <h1 class="logo" title="Fahem Yassin">YF.</h1>

    <nav class="desktop-nav">
        <a href="#projects" title="View my projects">Projects</a> 
        <a href="#about" title="About me">About</a> 
        <a href="#contact" title="Contact me">Contact</a>
    </nav>

    <button 
      class="burger-btn" 
      @click="toggleMenu"
      aria-label="Toggle menu"
      :aria-expanded="isMenuOpen"
    >
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
        <path 
          class="line line1" 
          :class="{ 'open': isMenuOpen }"
          d="M4 6h16"
        />
        <path 
          class="line line2" 
          :class="{ 'open': isMenuOpen }"
          d="M4 12h16"
        />
        <path 
          class="line line3" 
          :class="{ 'open': isMenuOpen }"
          d="M4 18h16"
        />
      </svg>
    </button>

    <Transition name="slide">
      <nav v-if="isMenuOpen" class="mobile-nav">
        <a href="#projects" @click="closeMenu">Projects</a> 
        <a href="#about" @click="closeMenu">About</a> 
        <a href="#contact" @click="closeMenu">Contact</a>
      </nav>
    </Transition>
  </header>

  <section class="bloc fade-in"  title="Who I am">
    <div class="titles">
        <h2 class="title">Full-Stack Developer.</h2>
        <h3 class="title">Building modern web experiences.</h3>
    </div>
    <div class="btns">
        <a href="#projects" title="View my projects" class="project-btn btn">View Projects</a>
        <a href="#contact" title="Contact me" class="contact-btn btn">Contact Me</a>
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

h1.logo {
    font-weight: 700;
    letter-spacing: -0.04em;
}

.desktop-nav {
    display: flex;
    gap: 20px;
}

.desktop-nav a {
    font-size: 1em;
    color: #999;
    letter-spacing: -0.04em;
}

.burger-btn {
    display: none;
    background: none;
    border: none;
    cursor: pointer;
    padding: 8px;
    z-index: 1001;
    position: relative;
}

.burger-btn svg {
    width: 28px;
    height: 28px;
    color: #000;
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

.mobile-nav {
    display: none;
}

.bloc {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 45px;
    margin-top: 7%;
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
    color: #999;
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
        position: fixed;
        top: 0;
        right: 0;
        width: 100%;
        background-color: #fff;
        padding: 30px 30px 30px;
        gap: 30px;
        box-shadow: -2px 0 10px rgba(0, 0, 0, 0.1);
    }

    .mobile-nav a {
        font-size: 18px;
        color: #000;
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
}

@media (max-width: 480px) {
    header {
        margin: 4% 5%;
    }

    .mobile-nav {
        width: 100%;
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

.slide-enter-from {
    transform: translateX(100%);
}

.slide-leave-to {
    transform: translateX(100%);
}
</style>
