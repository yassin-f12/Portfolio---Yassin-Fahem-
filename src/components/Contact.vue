<script setup>
import { ref, computed } from 'vue'
import emailjs from '@emailjs/browser'

const form = ref(null)
const isSubmitting = ref(false)
const submitStatus = ref(null)
const nameValue = ref('')
const emailValue = ref('')
const messageValue = ref('')

const charCount = computed(() => messageValue.value.length)

const sendEmail = async (e) => {
  e.preventDefault()
  isSubmitting.value = true
  submitStatus.value = null

  try {
    await emailjs.sendForm(
      import.meta.env.VITE_EMAILJS_SERVICE_ID,
      import.meta.env.VITE_EMAILJS_TEMPLATE_ID,
      form.value,
      import.meta.env.VITE_EMAILJS_PUBLIC_KEY
    )
    submitStatus.value = 'success'
    form.value.reset()
    nameValue.value = ''
    emailValue.value = ''
    messageValue.value = ''
  } catch (error) {
    submitStatus.value = 'error'
  } finally {
    isSubmitting.value = false
    setTimeout(() => { submitStatus.value = null }, 5000)
  }
}
</script>

<template>
  <section id="contact" class="contact">
    <div class="split">
      <div class="left">
        <p class="eyebrow">Me contacter</p>
        <h6 class="title">Construisons quelque chose ensemble.</h6>
        <p class="sub">Une idée, un projet, une question ?</p>

        <div class="infos">
          <div class="info-item">
            <span class="info-label">Email</span>
            <a href="mailto:fah13.yous@gmail.com" class="info-value mail">fah13.yous@gmail.com</a>
          </div>
          <div class="info-item">
            <span class="info-label">Disponibilité</span>
            <span class="info-value">
              <span class="dot"></span>
              Disponible
            </span>
          </div>
          <div class="info-item">
            <span class="info-label">Localisation</span>
            <span class="info-value">France</span>
          </div>
        </div>
      </div>

      <div class="right">
        <form ref="form" @submit="sendEmail" class="form">

          <div class="row">
            <div class="field" style="--i: 0">
              <input type="text" id="name" name="user_name" required autocomplete="name" maxlength="100"
                v-model="nameValue" placeholder=" " />
              <label for="name">Nom complet</label>
              <span class="bar"></span>
            </div>
            <div class="field" style="--i: 1">
              <input type="email" id="email" name="user_email" required autocomplete="email" maxlength="255"
                v-model="emailValue" placeholder=" " />
              <label for="email">Email</label>
              <span class="bar"></span>
            </div>
          </div>

          <div class="field textarea-field" style="--i: 2">
            <textarea id="message" name="message" required maxlength="500" v-model="messageValue"
              placeholder=" "></textarea>
            <label for="message">Message</label>
            <span class="char-count" :class="{ warn: charCount > 450 }">{{ charCount }}/500</span>
          </div>

          <div class="form-footer">
            <button type="submit" class="btn-sub" :class="{ shaking: submitStatus === 'error' }"
              :disabled="isSubmitting">
              <span v-if="!isSubmitting && !submitStatus">Envoyer →</span>
              <span v-if="isSubmitting" class="spinner"></span>
              <span v-if="submitStatus === 'success'" class="btn-status">
                <svg class="checkmark" viewBox="0 0 24 24" fill="none">
                  <path class="check-path" d="M4 12l6 6L20 6" stroke="white" stroke-width="2.5" stroke-linecap="round"
                    stroke-linejoin="round" />
                </svg>
                Envoyé !
              </span>
              <span v-if="submitStatus === 'error'" class="btn-status">
                ✗ Erreur, réessaye
              </span>
            </button>
          </div>

        </form>
      </div>

    </div>
  </section>
</template>

<style scoped>
.contact {
  padding: 0 5%;
}

.split {
  display: grid;
  grid-template-columns: 1fr 1.4fr;
  gap: 80px;
  align-items: start;
}

.left {
  display: flex;
  flex-direction: column;
  gap: 20px;
  position: sticky;
  top: 40px;
}

.eyebrow {
  font-size: 22px;
  font-weight: 650;
  color: var(--text-primary);
}

.title {
  font-size: 32px;
  font-weight: 700;
  letter-spacing: -0.03em;
  line-height: 1.1;
  margin: 0;
  color: var(--text-secondary);
}

.sub {
  font-size: 15px;
  color: var(--text-primary);
  line-height: 1.65;
  margin: 0;
}

.infos {
  display: flex;
  flex-direction: column;
  gap: 16px;
  margin-top: 12px;
  padding-top: 24px;
}

.info-item {
  display: flex;
  flex-direction: column;
  gap: 2px;
}

.info-label {
  font-size: 12px;
  font-weight: 600;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  color: var(--text-primary);
}

.info-value {
  font-size: 15px;
  font-weight: 500;
  color: var(--text-secondary);
  text-decoration: none;
  display: flex;
  align-items: center;
  gap: 6px;
}

.info-value.mail:hover {
  text-decoration: underline;
}

.dot {
  width: 7px;
  height: 7px;
  border-radius: 50%;
  background: #22c55e;
  display: inline-block;
  animation: pulse 2s ease infinite;
}

@keyframes pulse {

  0%,
  100% {
    opacity: 1;
  }

  50% {
    opacity: 0.4;
  }
}

.right {
  width: 100%;
}

.form {
  display: flex;
  flex-direction: column;
  gap: 32px;
}

.row {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 24px;
}

.field {
  position: relative;
  opacity: 0;
  transform: translateY(16px);
  animation: fadeUp 0.5s ease forwards;
  animation-delay: calc(var(--i) * 0.1s);
}

@keyframes fadeUp {
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.field input,
.field textarea {
  width: 100%;
  background: transparent;
  border: none;
  border-bottom: 1.5px solid var(--border);
  border-radius: 0;
  padding: 12px 0 8px;
  font-size: 14px;
  font-family: inherit;
  color: var(--text-primary);
  outline: none;
  transition: border-color 0.3s ease;
  box-sizing: border-box;
}

.field textarea {
  resize: none;
  height: 140px;
  padding-top: 20px;
}

.field label {
  position: absolute;
  left: 0;
  top: 12px;
  font-size: 15px;
  color: var(--text-muted);
  font-weight: 500;
  pointer-events: none;
  transition: all 0.25s ease;
}

.field input:focus~label,
.field input:not(:placeholder-shown)~label,
.field textarea:focus~label,
.field textarea:not(:placeholder-shown)~label {
  top: -8px;
  font-size: 11px;
  font-weight: 600;
  letter-spacing: 0.06em;
  text-transform: uppercase;
  color: var(--text-primary);
}

.bar {
  display: block;
  position: absolute;
  bottom: 0;
  left: 0;
  width: 0;
  height: 1.5px;
  background: var(--text-primary);
  transition: width 0.3s ease;
}

.field input:focus~.bar {
  width: 100%;
}

.textarea-field .bar {
  display: none;
}

.field textarea:focus {
  border-bottom-color: var(--text-primary);
}

.char-count {
  position: absolute;
  bottom: 8px;
  right: 12px;
  font-size: 11px;
  color: var(--text-muted);
  transition: color 0.2s;
}

.char-count.warn {
  color: #e67e22;
}

.form-footer {
  display: flex;
  justify-content: flex-end;
  opacity: 0;
  transform: translateY(16px);
  animation: fadeUp 0.5s ease forwards;
  animation-delay: 0.35s;
}

.btn-sub {
  position: relative;
  overflow: hidden;
  background: var(--text-primary);
  border: none;
  color: #fff;
  border-radius: 10px;
  padding: 12px 28px;
  font-weight: 600;
  font-size: 14px;
  cursor: pointer;
  transition: opacity 0.3s, transform 0.15s, background 0.3s;
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 46px;
  min-width: 140px;
}

.btn-sub::before {
  content: '';
  position: absolute;
  inset: 0;
  background: rgba(255, 255, 255, 0.08);
  transform: scaleX(0);
  transform-origin: left;
  transition: transform 0.3s ease;
}

.btn-sub:hover:not(:disabled)::before {
  transform: scaleX(1);
}

.btn-sub:hover:not(:disabled) {
  transform: translateY(-1px);
}

.btn-sub:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.btn-sub.shaking {
  animation: shake 0.4s ease;
  background: #e74c3c;
}

.btn-status {
  display: flex;
  align-items: center;
  gap: 6px;
}

@keyframes shake {

  0%,
  100% {
    transform: translateX(0);
  }

  20% {
    transform: translateX(-6px);
  }

  40% {
    transform: translateX(6px);
  }

  60% {
    transform: translateX(-4px);
  }

  80% {
    transform: translateX(4px);
  }
}

.spinner {
  width: 18px;
  height: 18px;
  border: 2px solid rgba(255, 255, 255, 0.3);
  border-top-color: #fff;
  border-radius: 50%;
  animation: spin 0.7s linear infinite;
}

@keyframes spin {
  to {
    transform: rotate(360deg);
  }
}

.checkmark {
  width: 22px;
  height: 22px;
}

.check-path {
  stroke-dasharray: 30;
  stroke-dashoffset: 30;
  animation: draw 0.5s ease forwards;
}

@keyframes draw {
  to {
    stroke-dashoffset: 0;
  }
}

@media (max-width: 968px) {
  .split {
    grid-template-columns: 1fr;
    gap: 40px;
  }

  .left {
    position: static;
  }

  .title {
    font-size: 26px;
  }
}

@media (max-width: 600px) {
  .contact {
    padding: 0 5%;
  }

  .row {
    grid-template-columns: 1fr;
  }

  .btn-sub {
    width: 100%;
  }

  .form-footer {
    justify-content: stretch;
  }
}
</style>