<script setup>
defineProps({
  image: {
    type: String,
    default: null,
  },
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
})

defineEmits(['click'])
</script>

<template>
  <div
    class="project-card"
    role="button"
    tabindex="0"
    :title="title"
    @click="$emit('click')"
    @keydown.enter="$emit('click')"
    @keydown.space.prevent="$emit('click')"
  >
    <div class="image-wrapper">
      <img v-if="image" :src="image" :alt="title" loading="lazy"/>
      <div v-else class="image-placeholder">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
          <rect x="3" y="3" width="18" height="18" rx="3"/>
          <path d="M3 9l4-4 4 4 4-6 4 4"/>
        </svg>
        <span>Aperçu bientôt</span>
      </div>
    </div>

    <div class="card-content">
      <h3>{{ title }}</h3>
      <p>{{ description }}</p>
      <span class="see-more">Voir les détails →</span>
    </div>
  </div>
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
  cursor: pointer;
  transition: transform 0.4s ease, box-shadow 0.4s ease;
  outline: none;
}

.project-card:hover {
  transform: translateY(-8px);
  box-shadow: 0 18px 45px rgba(0, 0, 0, 0.12);
}

.project-card:focus-visible {
  box-shadow: 0 0 0 3px rgba(15, 23, 42, 0.3);
}

.image-wrapper {
  position: relative;
  height: 200px;
  overflow: hidden;
  background: #f1f5f9;
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

.image-placeholder {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 8px;
  background: linear-gradient(135deg, #f8fafc 0%, #f1f5f9 100%);
}

.image-placeholder svg {
  width: 32px;
  height: 32px;
  color: #cbd5e1;
}

.image-placeholder span {
  font-size: 12px;
  color: #94a3b8;
  font-weight: 500;
}

.card-content {
  padding: 18px;
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.card-content h3 {
  font-size: 17px;
  font-weight: 650;
  color: #0f172a;
  letter-spacing: -0.02em;
}

.card-content p {
  font-size: 13px;
  font-weight: 500;
  color: var(--text-secondary);
  line-height: 1.45em;
}

.see-more {
  font-size: 12px;
  font-weight: 600;
  color: #666;
  margin-top: 4px;
  transition: color 0.2s;
}

.project-card:hover .see-more {
  color: var(--text-primary);
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