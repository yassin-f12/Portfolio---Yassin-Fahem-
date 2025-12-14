import { onMounted, onUnmounted } from 'vue'

export function useScrollAnimation() {
  let observer

  onMounted(() => {
    observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible')
          } else {
            entry.target.classList.remove('visible')
          }
        })
      },
      { 
        threshold: 0.2,
        rootMargin: '-50px 0px -50px 0px'
      }
    )

    setTimeout(() => {
      const elements = document.querySelectorAll('.fade-in')
      
      elements.forEach((el, index) => {
        observer.observe(el)
      })
    }, 100)
  })

}