<script setup>
import { ref, watch, onMounted, onUnmounted } from 'vue'

const props = defineProps({
    project: {
        type: Object,
        default: null
    },
    isOpen: {
        type: Boolean,
        default: false
    }
})

const emit = defineEmits(['close'])

const sheetRef = ref(null)
const isDragging = ref(false)
const dragStartY = ref(0)
const currentTranslateY = ref(0)
const CLOSE_THRESHOLD = 160

const onDragStart = (e) => {
    isDragging.value = true
    dragStartY.value = e.type === 'touchstart' ? e.touches[0].clientY : e.clientY
    currentTranslateY.value = 0
    if (sheetRef.value) {
        sheetRef.value.style.transition = 'none'
    }
}

const onDragMove = (e) => {
    if (!isDragging.value) return
    const clientY = e.type === 'touchmove' ? e.touches[0].clientY : e.clientY
    const delta = clientY - dragStartY.value
    if (delta < 0) return
    currentTranslateY.value = delta
    if (sheetRef.value) {
        sheetRef.value.style.transform = `translateY(${delta}px)`
    }
}

const onDragEnd = () => {
    if (!isDragging.value) return
    isDragging.value = false
    if (sheetRef.value) {
        sheetRef.value.style.transition = ''
    }
    if (currentTranslateY.value > CLOSE_THRESHOLD) {
        emit('close')
    } else {
        if (sheetRef.value) {
            sheetRef.value.style.transform = ''
        }
    }
    currentTranslateY.value = 0
}

const close = () => emit('close')

const lightboxIndex = ref(null)

const openLightbox = (i) => { lightboxIndex.value = i }
const closeLightbox = () => { lightboxIndex.value = null }
const prevImage = () => {
    if (lightboxIndex.value > 0) lightboxIndex.value--
}
const nextImage = () => {
    if (lightboxIndex.value < props.project.screenshots.length - 1) lightboxIndex.value++
}

const lightboxTouchStartX = ref(0)

const onLightboxTouchStart = (e) => {
    lightboxTouchStartX.value = e.touches[0].clientX
}

const onLightboxTouchEnd = (e) => {
    const delta = e.changedTouches[0].clientX - lightboxTouchStartX.value
    if (Math.abs(delta) < 50) return
    if (delta < 0) nextImage()
    else prevImage()
}

watch(() => props.isOpen, (val) => {
    document.body.style.overflow = val ? 'hidden' : ''
    if (!val && sheetRef.value) {
        sheetRef.value.style.transform = ''
    }
})

onMounted(() => {
    window.addEventListener('mousemove', onDragMove)
    window.addEventListener('mouseup', onDragEnd)
    window.addEventListener('touchmove', onDragMove, { passive: true })
    window.addEventListener('touchend', onDragEnd)
})

onUnmounted(() => {
    window.removeEventListener('mousemove', onDragMove)
    window.removeEventListener('mouseup', onDragEnd)
    window.removeEventListener('touchmove', onDragMove)
    window.removeEventListener('touchend', onDragEnd)
    document.body.style.overflow = ''
})
</script>

<template>
    <Transition name="overlay-fade">
        <div v-if="isOpen" class="overlay" @click="close" />
    </Transition>

    <Transition name="sheet-slide">
        <div v-if="isOpen && project" ref="sheetRef" class="sheet" role="dialog" :aria-label="project.title">
            <div class="handle-zone" @mousedown="onDragStart" @touchstart="onDragStart">
                <div class="handle-bar" />
                <button class="close-btn" @click="close" title="Fermer" aria-label="Fermer">
                    <svg viewBox="0 5 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
                        <path d="M19 15l-7 7-7-7" />
                    </svg>
                </button>
            </div>

            <div class="sheet-body">
                <div class="sheet-content">

                    <div class="meta-row">
                        <span class="date" v-if="project.date">{{ project.date }}</span>
                        <span class="separator" v-if="project.date && project.role">·</span>
                        <span class="role" v-if="project.role">{{ project.role }}</span>
                    </div>
                   
                    <a v-if="project.link" :href="project.link" target="_blank" rel="noopener noreferrer" class="sheet-title-link">
                        <h2 class="sheet-title">{{ project.title }}
                            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                <path d="M18 13v6a2 2 0 01-2 2H5a2 2 0 01-2-2V8a2 2 0 012-2h6" />
                                <polyline points="15 3 21 3 21 9" />
                                <line x1="10" y1="14" x2="21" y2="3" />
                            </svg>
                        </h2>
                    </a>
                    <h2 v-else class="sheet-title">{{ project.title }}</h2>
                     
                    <p class="sheet-desc">{{ project.longDescription || project.description }}</p>
                    <p v-if="project.longDescriptionNote" class="sheet-desc-note">{{ project.longDescriptionNote }}</p>

                    <div class="two-cards-row">
                        <div class="card" v-if="project.highlights && project.highlights.length">
                            <span class="section-label">Points clés</span>
                            <ul class="highlights">
                                <li v-for="item in project.highlights" :key="item">{{ item }}</li>
                            </ul>
                        </div>

                        <div class="card side-info">
                            <div class="side-item" v-if="project.team">
                                <span class="section-label">Équipe</span>
                                <p class="section-text">{{ project.team }}</p>
                            </div>
                            <div class="side-item" v-if="project.methodology">
                                <span class="section-label">Gestion de projet</span>
                                <p class="section-text">{{ project.methodology }}</p>
                            </div>
                            <div class="side-item" v-if="project.stack && project.stack.length">
                                <span class="section-label">Stack technique</span>
                                <div class="badges">
                                    <span class="badge" v-for="tech in project.stack" :key="tech">{{ tech }}</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div v-if="project.screenshots && project.screenshots.length" class="section">
                        <span class="section-label">Aperçus</span>
                        <div class="gallery-thumbs">
                            <img v-for="(shot, i) in project.screenshots" :key="i" :src="shot"
                                :alt="`${project.title} screenshot ${i + 1}`" class="gallery-thumb"
                                @click="openLightbox(i)" />
                        </div>
                    </div>

                    <Teleport to="body">
                        <Transition name="lightbox-fade">
                            <div v-if="lightboxIndex !== null" class="lightbox" @click.self="closeLightbox" @touchstart="onLightboxTouchStart" @touchend="onLightboxTouchEnd">
                                <button class="lightbox-close" @click="closeLightbox">
                                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
                                        <line x1="18" y1="6" x2="6" y2="18" />
                                        <line x1="6" y1="6" x2="18" y2="18" />
                                    </svg>
                                </button>

                                <button class="lightbox-nav prev" @click="prevImage" v-if="lightboxIndex > 0">
                                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
                                        <polyline points="15 18 9 12 15 6" />
                                    </svg>
                                </button>

                                <img :src="project.screenshots[lightboxIndex]" :alt="`Screenshot ${lightboxIndex + 1}`"
                                    class="lightbox-img" />

                                <button class="lightbox-nav next" @click="nextImage"
                                    v-if="lightboxIndex < project.screenshots.length - 1">
                                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
                                        <polyline points="9 18 15 12 9 6" />
                                    </svg>
                                </button>

                                <span class="lightbox-counter" v-if="project.screenshots.length > 1">
                                    {{ lightboxIndex + 1 }} / {{ project.screenshots.length }}
                                </span>
                            </div>
                        </Transition>
                    </Teleport>

                    <div v-if="project.qrCode || project.qrCodeAndroid || project.linkExpo || project.linkApk"
                        class="two-cards-row">
                        <div class="card dl">
                            <span class="section-label">Télécharger / Tester</span>
                            <div class="install-note">
                                <p><strong>Expo Go</strong> (iOS & Android) - Télécharge <strong>Expo Go</strong> sur l'App Store ou le Play Store, puis scanne le QR code.</p>
                                <p><strong>Android APK</strong> - Téléchargez l'APK, puis rendez-vous dans <code>Paramètres → Applications → Accès spécial → Installer des applis inconnues → [choisir l'app] → Autoriser depuis cette source</code> et ouvrez le fichier.</p>
                            </div>
                        </div>
                        <div class="dl qr">
                            <div class="platform-block">
                                <span class="platform-title">iOS - Expo Go</span>
                                <img v-if="project.qrCode" :src="project.qrCode" alt="QR Code Expo Go"
                                    class="qr-code" />
                                <div v-else class="qr-placeholder">QR bientôt</div>
                                <a v-if="project.linkExpo" :href="project.linkExpo" target="_blank"
                                    rel="noopener noreferrer" class="project-link small">
                                    Tester sur Expo Go
                                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                        <path d="M18 13v6a2 2 0 01-2 2H5a2 2 0 01-2-2V8a2 2 0 012-2h6" />
                                        <polyline points="15 3 21 3 21 9" />
                                        <line x1="10" y1="14" x2="21" y2="3" />
                                    </svg>
                                </a>
                            </div>

                            <div class="platform-block">
                                <span class="platform-title">Android - APK</span>
                                <img v-if="project.qrCodeAndroid" :src="project.qrCodeAndroid" alt="QR Code APK Android"
                                    class="qr-code" />
                                <div v-else class="qr-placeholder">QR bientôt</div>
                                <a v-if="project.linkApk" :href="project.linkApk" target="_blank"
                                    rel="noopener noreferrer" class="project-link small">
                                    Télécharger l'APK
                                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                        <path d="M18 13v6a2 2 0 01-2 2H5a2 2 0 01-2-2V8a2 2 0 012-2h6" />
                                        <polyline points="15 3 21 3 21 9" />
                                        <line x1="10" y1="14" x2="21" y2="3" />
                                    </svg>
                                </a>
                            </div>
                        </div>
                    </div>
                    <a v-if="!project.qrCode && !project.qrCodeAndroid && project.link" :href="project.link"
                        target="_blank" rel="noopener noreferrer" class="project-link">
                        Voir le projet
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                            <path d="M18 13v6a2 2 0 01-2 2H5a2 2 0 01-2-2V8a2 2 0 012-2h6" />
                            <polyline points="15 3 21 3 21 9" />
                            <line x1="10" y1="14" x2="21" y2="3" />
                        </svg>
                    </a>

                    <span v-else-if="!project.qrCode && !project.qrCodeAndroid && !project.link" class="no-link">
                        bientôt disponible
                    </span>
                </div>
            </div>
        </div>
    </Transition>
</template>

<style scoped>
.overlay {
    position: fixed;
    inset: 0;
    background: rgba(0, 0, 0, 0.45);
    z-index: 100;
    backdrop-filter: blur(2px);
}

.sheet {
    position: fixed;
    bottom: 0;
    left: 0;
    right: 0;
    height: 88vh;
    background: #fff;
    border-radius: 20px 20px 0 0;
    z-index: 101;
    display: flex;
    flex-direction: column;
    box-shadow: 0 -8px 40px rgba(0, 0, 0, 0.15);
    transition: transform 0.35s cubic-bezier(0.32, 0.72, 0, 1);
}

.handle-zone {
    flex-shrink: 0;
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 12px 20px 8px;
    cursor: grab;
    user-select: none;
    position: relative;
}

.handle-zone:active {
    cursor: grabbing;
}

.handle-bar {
    width: 40px;
    height: 4px;
    background: #666;
    border-radius: 99px;
    margin-bottom: 8px;
}

.close-btn {
    position: absolute;
    right: 20px;
    top: 10px;
    background: #f3f4f6;
    border: none;
    border-radius: 50%;
    width: 40px;
    height: 40px;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    transition: background 0.2s;
    z-index: 50;
}

.close-btn:hover {
    background: #e5e7eb;
}

.close-btn svg {
    width: 16px;
    height: 16px;
    color: #555;
}

.sheet-body {
    flex: 1;
    overflow-y: auto;
    overscroll-behavior: contain;
    padding: 0 50px;
}

.sheet-content {
    padding: 24px 28px 48px;
    display: flex;
    flex-direction: column;
    gap: 20px;
}

.meta-row {
    display: flex;
    align-items: center;
    gap: 8px;
}

.date,
.role {
    font-size: 12px;
    font-weight: 600;
    color: var(--text-secondary);
    letter-spacing: 0.02em;
    text-transform: uppercase;
}

.separator {
    color: var(--text-secondary);
}

.sheet-title {
    font-size: 26px;
    font-weight: 700;
    letter-spacing: -0.03em;
    color: var(--text-primary);
    line-height: 1.1;
    margin: 0;
}

.sheet-desc {
    font-size: 14px;
    color: var(--text-secondary);
    line-height: 1.65;
    font-weight: 450;
}

.sheet-desc-note {
  font-size: 13px;
  color: var(--text-muted);
  line-height: 1.65;
  font-style: italic;
}

.section {
    display: flex;
    flex-direction: column;
    gap: 10px;
}

.section-label {
    font-size: 11px;
    font-weight: 700;
    letter-spacing: 0.08em;
    text-transform: uppercase;
    color: var(--text-primary);
}

.two-cards-row {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 12px;
}
 
.card {
  background: #fff;
  border: 1px solid #e2e8f0;
  border-radius: 14px;
  padding: 16px;
  display: flex;
  flex-direction: column;
  gap: 15px;
}
 
.side-info {
  display: flex;
  flex-direction: column;
  gap: 14px;
}
 
.side-item {
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.dl {
    display: flex;
    border: 1px solid #e2e8f0;
    border-radius: 14px;
    padding: 16px;
}
.dl.qr {
    justify-content: space-around;
}
.install-note {
  display: flex;
  flex-direction: column;
  gap: 6px;
  background: #f8fafc;
  border-radius: 8px;
  padding: 12px 14px;
  font-size: 13px;
  color: var(--text-secondary);
  line-height: 1.5;
}

.install-note code {
  background: #e2e8f0;
  padding: 2px 6px;
  border-radius: 4px;
  font-size: 12px;
  color: var(--text-secondary);
}

.download-section {
    display: flex;
    justify-content: center;
    width: 100%;
}

.section-text {
    font-size: 14px;
    color: var(--text-secondary);
    font-weight: 500;
}

.badges {
    display: flex;
    flex-wrap: wrap;
    gap: 8px;
}

.badge {
    font-size: 12px;
    font-weight: 600;
    padding: 4px 12px;
    border-radius: 99px;
    background: var(--text-secondary);
    color: #fff;
    letter-spacing: -0.01em;
    word-break: break-word;
}

.highlights {
    list-style: none;
    display: flex;
    flex-direction: column;
    gap: 8px;
}

.highlights li {
    font-size: 14px;
    color: var(--text-secondary);
    padding-left: 16px;
    position: relative;
    line-height: 1.5;
}

.highlights li::before {
    content: '—';
    position: absolute;
    left: 0;
    color: var(--text-muted);
    font-size: 12px;
}

.gallery-thumbs {
    display: flex;
    flex-wrap: wrap;
    gap: 10px;
}

.gallery-thumb {
    width: 200px;
    height: 200px;
    object-fit: contain;
    border-radius: 10px;
    background: #f1f5f9;
    cursor: pointer;
    transition: opacity 0.2s;
}

.gallery-thumb:hover {
    opacity: 0.85;
}

.lightbox {
    position: fixed;
    inset: 0;
    background: rgba(0, 0, 0, 0.92);
    z-index: 200;
    display: flex;
    align-items: center;
    justify-content: center;
}

.lightbox-img {
    max-width: 90vw;
    max-height: 85vh;
    object-fit: contain;
    border-radius: 8px;
}

.lightbox-close {
    position: absolute;
    top: 20px;
    right: 20px;
    background: rgba(255, 255, 255, 0.1);
    border: none;
    border-radius: 50%;
    width: 40px;
    height: 40px;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    transition: background 0.2s;
}

.lightbox-close:hover {
    background: rgba(255, 255, 255, 0.2);
}

.lightbox-close svg {
    width: 18px;
    height: 18px;
    color: #fff;
}

.lightbox-nav {
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    background: rgba(0, 0, 0, 0.5);
    border: none;
    border-radius: 50%;
    width: 44px;
    height: 44px;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    transition: background 0.2s;
}

.lightbox-nav:hover {
    background: rgba(255, 255, 255, 0.2);
}

.lightbox-nav svg {
    width: 20px;
    height: 20px;
    color: #fff;
}

.lightbox-nav.prev {
    left: 20px;
}

.lightbox-nav.next {
    right: 20px;
}

.lightbox-counter {
    position: absolute;
    bottom: 20px;
    color: rgba(255, 255, 255, 0.6);
    font-size: 13px;
    font-weight: 500;
}

.lightbox-fade-enter-active,
.lightbox-fade-leave-active {
    transition: opacity 0.25s ease;
}

.lightbox-fade-enter-from,
.lightbox-fade-leave-to {
    opacity: 0;
}

.platform-row {
    display: flex;
    gap: 20px;
    flex-wrap: wrap;
}

.platform-block {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 10px;
}

.platform-title {
    font-size: 12px;
    font-weight: 700;
    color: var(--text-secondary);
    text-transform: uppercase;
    letter-spacing: 0.05em;
}

.qr-code {
    width: 180px;
    height: 180px;
    border-radius: 10px;
    border: 1px solid #f1f5f9;
}

.qr-placeholder {
    width: 130px;
    height: 130px;
    border-radius: 10px;
    border: 1px dashed #cbd5e1;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 12px;
    color: #94a3b8;
}

.project-link.small {
    font-size: 12px;
    padding: 8px 14px;
}

.dl .project-link.small {
    align-self: center;
}

.project-link {
    display: inline-flex;
    align-items: center;
    gap: 8px;
    background: #0f172a;
    color: #fff;
    font-size: 13px;
    font-weight: 600;
    padding: 12px 20px;
    border-radius: 10px;
    text-decoration: none;
    align-self: flex-start;
    transition: opacity 0.2s;
    letter-spacing: -0.01em;
}

.project-link:hover {
    opacity: 0.8;
}

.project-link svg {
    width: 14px;
    height: 14px;
}

.sheet-title-link {
    text-decoration: none;
    display: inline-flex;
    align-items: center;
}

.sheet-title svg {
    width: 18px;
    height: 18px;
    margin-left: 8px;
    color: #94a3b8;
    flex-shrink: 0;
    transition: color 0.2s;
    vertical-align: middle;
}

.sheet-title-link:hover svg {
    color: #0f172a;
}

.no-link {
    font-size: 13px;
    color: var(--text-secondary);
    font-style: italic;
}

.overlay-fade-enter-active,
.overlay-fade-leave-active {
    transition: opacity 0.3s ease;
}

.overlay-fade-enter-from,
.overlay-fade-leave-to {
    opacity: 0;
}

.sheet-slide-enter-active,
.sheet-slide-leave-active {
    transition: transform 0.4s cubic-bezier(0.32, 0.72, 0, 1);
}

.sheet-slide-enter-from,
.sheet-slide-leave-to {
    transform: translateY(100%);
}

@media (max-width: 768px) {
    .sheet {
        height: 100dvh;
        max-height: 92dvh;
    }

    .sheet-content {
        padding: 20px 20px 40px;
        gap: 16px;
    }

    .sheet-title {
        font-size: 22px;
    }

    .sheet-body {
        padding: 0;
    }

    .gallery-thumbs {
        display: grid;
        grid-template-columns: repeat(2, 1fr);
    }

    .gallery-thumb {
        width: 100%;
        height: auto;
        object-fit: cover;
    }

    .project-link {
        align-self: stretch;
        justify-content: center;
    }

    .lightbox-nav {
        display: none;
    }

    .two-cards-row {
        grid-template-columns: 1fr;
    }

    .dl {
        width: 100%;
    }

    .dl.qr {
        flex-direction: column;
        align-items: center;
        gap: 20px;
    }
}
</style>