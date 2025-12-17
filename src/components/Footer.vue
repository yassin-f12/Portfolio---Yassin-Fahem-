<script setup>
const year = new Date().getFullYear()
</script>

<template>
  <footer id="footer" class="footer">
    <p class="footer-text">
      © {{ year }} Yassin F. — All rights reserved
    </p>

    <div class="footer-links">
      <a
        href="https://github.com/yassin-f12"
        target="_blank"
        rel="noopener noreferrer"
        aria-label="GitHub"
        title="My GitHub" 
      >
        <svg viewBox="0 0 24 24" aria-hidden="true">
          <path
            fill="currentColor"
            d="M12 .5C5.73.5.5 5.74.5 12.02c0 5.11 3.29 9.44 7.86 10.97.57.1.78-.25.78-.56v-2.02c-3.2.7-3.88-1.38-3.88-1.38-.53-1.34-1.29-1.7-1.29-1.7-1.05-.72.08-.7.08-.7 1.16.08 1.77 1.2 1.77 1.2 1.04 1.78 2.73 1.27 3.4.97.1-.76.4-1.27.73-1.56-2.55-.3-5.23-1.29-5.23-5.74 0-1.27.45-2.31 1.19-3.13-.12-.3-.52-1.52.11-3.17 0 0 .97-.31 3.18 1.2.92-.26 1.91-.38 2.9-.38.99 0 1.98.13 2.9.38 2.2-1.51 3.17-1.2 3.17-1.2.64 1.65.24 2.87.12 3.17.74.82 1.18 1.86 1.18 3.13 0 4.46-2.69 5.43-5.25 5.72.42.36.79 1.07.79 2.16v3.2c0 .31.2.67.79.56A11.52 11.52 0 0 0 23.5 12C23.5 5.74 18.27.5 12 .5z"
          />
        </svg>
      </a>

      <a
        href="https://www.linkedin.com/in/yassin-fahem-12-in"
        target="_blank"
        rel="noopener noreferrer"
        aria-label="LinkedIn"
        title="My LinkedIn"
      >
        <svg viewBox="0 0 24 24" aria-hidden="true">
          <path
            fill="currentColor"
            d="M4.98 3.5C4.98 4.88 3.86 6 2.5 6S0 4.88 0 3.5 1.12 1 2.5 1s2.48 1.12 2.48 2.5zM0.5 8h4v15h-4V8zM8.5 8h3.8v2.05h.05c.53-1 1.82-2.05 3.75-2.05 4 0 4.75 2.63 4.75 6.05V23h-4v-7.95c0-1.9-.03-4.35-2.65-4.35-2.65 0-3.05 2.07-3.05 4.2V23h-4V8z"
          />
        </svg>
      </a>

      <a
        href="/Portfolio---Yassin-Fahem-/CV_Yassin_Fahem.pdf" 
        target="_blank"
        rel="noopener noreferrer"
        class="cv-link"
        title="View CV"
      >
        CV 
      </a>
    </div>
  </footer>
</template>

<style scoped>
.footer {
  padding: 24px;
  background-color: #ddd; 
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 12px;
}

.footer-text {
  font-size: 12px;
  font-weight: 600;
  color: #1f2933; 
}

.footer-links {
  display: flex;
  align-items: center;
  gap: 16px;
}

.footer-links a {
  color: #111827; 
  transition: color 0.2s ease, transform 0.2s ease;
}

.footer-links a:hover {
  color: #374141; 
  transform: translateY(-2px);
}

.footer-links svg {
  width: 20px;
  height: 20px;
}

.cv-link {
  font-size: 12px;
  font-weight: 600;
  text-decoration: none;
  color: #374141;
}

@media (max-width: 480px) {
  .footer {
    padding: 20px;
  }

  .footer-text {
    font-size: 11px;
    text-align: center;
  }

  .footer-links {
    gap: 12px;
  }

  .footer-links svg {
    width: 18px;
    height: 18px;
  }

  .cv-link {
    font-size: 11px;
  }
}
</style>
