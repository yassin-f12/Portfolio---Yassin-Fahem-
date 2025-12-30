<script setup>
defineProps({
  image: {
    type: String,
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  link: {
    type: String,
    required: false,
    default: ''
  },
})
</script>

<template>
   <component
    :is="link ? 'a' : 'div'"
    :href="link || undefined"
    :target="link ? '_blank' : undefined"
    :rel="link ? 'noopener' : undefined"
    class="project-card"
    :class="{ 'no-link': !link }"
    :title="link ? 'View project' : undefined"
    >
    <div class="image-wrapper">
      <img :src="image" :alt="description" loading="lazy"/>
    </div>

    <div class="card-content">
      <h3>{{ title }}</h3>
      <p>{{ description }}</p>
    </div>
   </component>
</template>

<style scoped>
.project-card {
  display: flex;
  flex-direction: column;
  width: 100%;
  max-width: 31%;
  border-radius: 18px;
  overflow: hidden;
  background: #fff;
  text-decoration: none;
  transition: transform 0.4s ease, box-shadow 0.4s ease;
}

.project-card:hover {
  transform: translateY(-8px);
  box-shadow: 0 18px 45px rgba(0, 0, 0, 0.12);
}

.project-card.no-link {
  cursor: default;
}

.project-card.no-link:hover {
  transform: none;
  box-shadow: none;
}

.project-card.no-link:hover img {
  transform: none;
}

.image-wrapper {
  position: relative;
  height: 200px;
  overflow: hidden;
}

.image-wrapper img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.6s ease;
}

.project-card:hover img {
  transform: scale(1.08);
}

.card-content {
  padding: 18px;
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.card-content h3 {
  font-size: 18px;
  font-weight: 650;
  color: #0f172a;
  letter-spacing: -0.02em;
}

.card-content p {
  font-size: 14px;
  font-weight: 500;
  color: #64748b;
  line-height: 1.4em;
}

@media (max-width: 1200px) {
  .project-card {
    max-width: 45%;
  }
}

@media (max-width: 768px) {
  .project-card {
    max-width: 100%;
  }

  .image-wrapper {
    height: 180px;
  }
}
</style>