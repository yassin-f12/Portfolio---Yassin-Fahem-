<script setup>
import { ref, onMounted, onUnmounted } from 'vue';
import CardProjects from './CardProjects.vue';
import portfolio from '@/assets/img/portfolio.webp'
import adeir from '@/assets/img/adeir.webp'
import rps from '@/assets/img/rps.webp'
import psg from '@/assets/img/psg.webp'

const isMobile = ref(false);

const checkMobile = () => {
  isMobile.value = window.innerWidth <= 768;
};

onMounted(() => {
  checkMobile();
  window.addEventListener('resize', checkMobile);
});

onUnmounted(() => {
  window.removeEventListener('resize', checkMobile);
});

const projects = [
  {
    id: 1,
    title: "Portfolio",
    description: "Modern developer portfolio built with Vue 3 and smooth animations.",
    image: portfolio,
    link: ''
  },
  {
    id: 2,
    title: "ADEIR Platform Rebuild (coming soon...)",
    description: "A complete rebuild of Adeir's website using Vue.js and PHP, featuring a modern, responsive frontend, enhanced backend functionality, and developed as part of a collaborative team project.",
    image: adeir,
    link: 'https://www.adeir.fr/'
  },
  {
    id: 3,
    title: "Creative Rock-Paper-Scissors",
    description: "A creative take on Rock-Paper-Scissors, transformed into a mini battle game with dynamic visuals and animated moves, giving it a playful fighting-game vibe.",
    image: rps,
    link: 'https://yassin-f12.github.io/Creative-Rock-Paper-Scissors/#Pierre%F0%9F%A4%9CFeuille%E2%9C%8BCiseaux%E2%9C%8C%EF%B8%8F:th%C3%A8me_marvels%F0%9F%91%8ASpider_man%F0%9F%86%9AIron_man%F0%9F%92%AA'
  },
  {
    id: 4,
    title: "PSG Player Directory",
    description: "A web application built with PHP and JavaScript that lists PSG players in stylish cards, combining clean design with interactive features.",
    image: psg,
    link: 'https://projetfoot.infinityfreeapp.com/'
  }
]

const getProjectLink = (project) => {
  if (project.id === 3 && isMobile.value) {
    return '';
  }
  return project.link;
};
</script>

<template>
  <section id="projects" class="projects">
    <h5 class="title">Projects</h5>

    <div class="projects-flex">
      <CardProjects
        v-for="project in projects"
        :key="project.id"
        :image="project.image"
        :title="project.title"
        :description="project.description"
        :link="getProjectLink(project)"
      />
    </div>
  </section>
</template>

<style scoped>
.projects {
  margin: 0 5%;
}

.title {
  font-weight: 650;
  font-size: 24px;
  letter-spacing: -0.02em;
  margin-bottom: 2%;
}

.projects-flex {
  display: flex;
  justify-content: space-around;
  flex-wrap: wrap;
  gap: 32px;
}

@media (max-width: 1200px) {
  .projects-flex {
    gap: 24px;
  }
}

@media (max-width: 968px) {
  .projects-flex {
    justify-content: center;
  }
}
</style>
