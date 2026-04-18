<script setup>
const props = defineProps({
    modelValue: Boolean
})

const emit = defineEmits(['update:modelValue'])

const close = () => emit('update:modelValue', false)
</script>

<template>
    <Teleport to="body">
        <Transition name="fade">
            <div v-if="modelValue" class="modal-overlay" @click.self="close" role="dialog" aria-modal="true"
                aria-label="Mentions légales">
                <div class="modal-content">
                    <button class="modal-close" @click="close" aria-label="Fermer">✕</button>

                    <h2>Mentions légales</h2>

                    <section>
                        <h3>Éditeur du site</h3>
                        <p>Yassin Fahem — <a href="mailto:fah13.yous@gmail.com">fah13.yous@gmail.com</a></p>
                    </section>

                    <section>
                        <h3>Hébergement</h3>
                        <p>GitHub Pages — GitHub Inc., San Francisco, USA</p>
                    </section>

                    <section>
                        <h3>Propriété intellectuelle</h3>
                        <p>Le contenu de ce site (projets, textes, code) m'appartient sauf mention contraire. N'hésitez pas à me contacter si vous souhaitez réutiliser quelque chose.</p>
                    </section>

                    <section>
                        <h3>Données personnelles</h3>
                        <p>Ce site ne collecte aucune donnée. Le formulaire de contact passe par EmailJS — rien n'est
                            stocké de mon côté.</p>
                    </section>

                    <section>
                        <h3>Cookies</h3>
                        <p>Aucun cookie. Pas de tracking, pas de pub, rien.</p>
                    </section>

                    <section>
                        <h3>Loi applicable</h3>
                        <p>Droit français. Tribunaux français.</p>
                    </section>
                </div>
            </div>
        </Transition>
    </Teleport>
</template>

<style scoped>
.modal-overlay {
    position: fixed;
    inset: 0;
    background: rgba(0, 0, 0, 0.5);
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 9999;
    padding: 16px;
}

.modal-content {
    background: #fff;
    border-radius: 12px;
    padding: 32px;
    max-width: 580px;
    width: 100%;
    max-height: 80vh;
    overflow-y: auto;
    position: relative;
    box-shadow: 0 20px 60px rgba(0, 0, 0, 0.2);
}

.modal-content h2 {
    font-size: 20px;
    font-weight: 700;
    color: var(--text-primary);
    margin-bottom: 20px;
}

.modal-content section {
    margin-bottom: 18px;
}

.modal-content h3 {
    font-size: 13px;
    font-weight: 700;
    color: var(--text-primary);
    text-transform: uppercase;
    letter-spacing: 0.05em;
    margin-bottom: 6px;
}

.modal-content p {
    font-size: 13px;
    color: var(--text-secondary);
    line-height: 1.6;
}

.modal-content a {
    color: var(--text-muted);
    text-decoration: underline;
}

.modal-close {
    position: absolute;
    top: 16px;
    right: 16px;
    background: none;
    border: none;
    font-size: 18px;
    cursor: pointer;
    color: #6b7280;
    padding: 4px 8px;
    border-radius: 4px;
    transition: color 0.2s, background 0.2s;
}

.modal-close:hover {
    color: #111827;
    background: #f3f4f6;
}

.fade-enter-active,
.fade-leave-active {
    transition: opacity 0.2s ease;
}

.fade-enter-from,
.fade-leave-to {
    opacity: 0;
}

@media (max-width: 480px) {
    .modal-content {
        padding: 24px 20px;
        max-height: 85vh;
    }
}
</style>