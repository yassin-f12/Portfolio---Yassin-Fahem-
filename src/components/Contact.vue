<script setup>
import { ref } from 'vue'
import emailjs from '@emailjs/browser'

const form = ref(null)
const isSubmitting = ref(false)
const submitStatus = ref(null) 

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
  } catch (error) {
    console.error('Erreur:', error)
    submitStatus.value = 'error'
  } finally {
    isSubmitting.value = false
    
    setTimeout(() => {
      submitStatus.value = null
    }, 5000)
  }
}
</script>

<template>
  <section id="contact" class="contact">
    <div class="top">
      <h6 class="marg">Get In Touch</h6>
      <p class="marg">Let's build something together!</p>
    </div>

    <form ref="form" @submit="sendEmail" class="form">
      <label for="name">
        Full Name
        <input
          type="text"
          id="name"
          name="user_name"
          placeholder="Your full name"
          required
          autocomplete="name"
          maxlength="100"
        />
      </label>

      <label for="email">
        Email
        <input
          type="email"
          id="email"
          name="user_email"
          placeholder="your@email.com"
          required
          autocomplete="email"
          maxlength="255"
        />
      </label>

      <label for="message">
        Message
        <textarea
          id="message"
          name="message"
          placeholder="Your message..."
          required
          maxlength="500"
        ></textarea>
      </label>

      <button 
        type="submit" 
        class="btn-sub" 
        :disabled="isSubmitting"
        title="Send your message"
      >
        {{ isSubmitting ? 'Envoi...' : 'Send Message' }}
      </button>

      <div v-if="submitStatus === 'success'" class="status-message success">
        ✓ Message sent successfully!
      </div>
      <div v-if="submitStatus === 'error'" class="status-message error">
        ✗ Failed to send message. Please try again.
      </div>
    </form>
  </section>
</template>

<style scoped>
.contact {
  display: flex;
  align-items: center;
  flex-direction: column;
}

p {
  color: #999;
}

.top {
  text-align: center;
  margin-bottom: 3%;
}

.marg {
  font-size: 32px;
  font-weight: 700;
  letter-spacing: -0.03em;
  line-height: 1em;
  margin: 0;
}

.form {
  display: flex;
  flex-direction: column;
  gap: 30px;
  width: 25%;
}

label {
  display: flex;
  flex-direction: column;
  font-size: 12px;
  line-height: 1.2em;
  color: #999;
  font-weight: 600;
}

input,
textarea {
  margin-top: 8px;
  border-radius: 10px;
  padding: 12px;
  background-color: #eee;
  border: none;
}

input::placeholder,
textarea::placeholder {
  color: #999;
}

textarea {
  resize: none;
  height: 120px;
  font-family: inherit;
}

input:focus,
textarea:focus {
  outline: none;
  border: 1.2px solid #999;
}

.btn-sub {
  background-color: #000;
  border: none;
  color: #fff;
  border-radius: 8px;
  padding: 10px;
  font-weight: 600;
  font-size: 14px;
  cursor: pointer;
  transition: opacity 0.3s;
}

.btn-sub:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.btn-sub:hover:not(:disabled) {
  opacity: 0.8;
}

.status-message {
  padding: 12px;
  border-radius: 8px;
  text-align: center;
  font-size: 14px;
  font-weight: 500;
  animation: slideIn 0.3s ease;
}

.status-message.success {
  background-color: #d4edda;
  color: #155724;
  border: 1px solid #c3e6cb;
}

.status-message.error {
  background-color: #f8d7da;
  color: #721c24;
  border: 1px solid #f5c6cb;
}

@keyframes slideIn {
  from {
    opacity: 0;
    transform: translateY(-10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
</style>