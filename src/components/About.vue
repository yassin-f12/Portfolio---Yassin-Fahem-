<template>
  <section id="a-propos" class="about fade-in">
    <div class="top">
      <h4 class="marg">Yassin Fahem</h4>
      <span class="marg">Développeur</span>
    </div>

    <div class="content">
      <p class="para-1">Je suis Yassin, développeur full-stack passionné par le web et le mobile. J'aime concevoir des applications modernes, scalables et soignées qui allient design et performance.</p>
      <p class="para-2">Avec une expérience concrète en frameworks JavaScript modernes — Vue.js, React, mais aussi React Native pour le mobile — je conçois des solutions de bout en bout. J'accorde une attention particulière à l'UI/UX et j'écris un code propre et maintenable.</p>
      <p class="para-3">Toujours curieux d'apprendre, je cherche activement un contrat d'alternance pour continuer à progresser et contribuer à des projets concrets au sein d'une équipe.</p>
    </div>
  </section>

  <section class="competences fade-in">
    <p class="tit">Compétences</p>
    <div class="skills">
      <div class="skill-category">
        <span>Front-End</span>
        <div class="stack">
          <p>HTML5 / CSS3</p>
          <p>JavaScript / TypeScript</p>
          <p>Vue.js</p>
          <p>React</p>
          <p>React Native / Expo</p>
          <p>Sass</p>
          <p>Responsive Design</p>
        </div>
      </div>
      <div class="skill-category">
        <span>Back-End</span>
        <div class="stack">
          <p>PHP 8</p>
          <p>Gestion des flux client-serveur</p>
          <p>Architecture MVC</p>
          <p>Authentification</p>
        </div>
      </div>
      <div class="skill-category">
        <span>Base de données & Outils</span>
        <div class="stack">
          <p>MySQL</p>
          <p>Docker</p>
          <p>GitHub / GitLab</p>
          <p>Figma</p>
          <p>Agile / Scrum</p>
        </div>
      </div>
      <div class="skill-category">
        <span>Formation</span>
        <div class="stack">
          <p>Titre Pro DWWM (Bac+2)</p>
          <p>En recherche d'alternance CDA (Bac+3)</p>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.about {
  margin: 0 5%;
}

.marg {
  margin: 0;
  line-height: 1em;
}

h4 {
  font-weight: 650;
  font-size: 24px;
  letter-spacing: -0.02em;
}

span {
  font-weight: 650;
  color: var(--text-secondary);
  font-size: 24px;
  letter-spacing: -0.02em;
}

.top {
  margin-bottom: 2%;
  width: 48%;
}

.content {
  display: flex;
  width: 50%;
  flex-direction: column;
  gap: 20px;
}

.content p {
  color: var(--text-secondary);
  font-size: 15px;
  font-weight: 500;
  letter-spacing: -0.01em;
  line-height: 1.3em;
}

.competences {
  margin: 0 5%;
  display: flex;
  flex-direction: column;
  gap: 24px;
}

.competences .tit {
  font-size: 22px;
  font-weight: 650;
  color: #0f172a;
}

.skills {
  display: flex;
  flex-wrap: wrap;
  gap: 32px;
}

.skill-category {
  min-width: 180px;
}

.skill-category span {
  font-size: 16px;
  font-weight: 600;
  color: #1e293b;
  margin-bottom: 6px;
  display: block;
}

.skill-category p {
  font-size: 14px;
  color: var(--text-secondary);
  line-height: 1.4em;
}

.stack {
  display: flex;
  flex-direction: column;
  gap: 4px;
  margin-top: 6px;
}

@media (max-width: 1024px) {
  .top {
    width: 70%;
  }

  .content {
    width: 70%;
  }
}

@media (max-width: 768px) {
  .top {
    width: 100%;
    margin-bottom: 6%;
  }

  .content {
    width: 100%;
  }

  .skills {
    gap: 24px;
  }

  .skill-category {
    min-width: 140px;
  }
}

@media (max-width: 480px) {
  h4, span {
    font-size: 20px;
  }

  .content p {
    font-size: 14px;
  }

  .competences .tit {
    font-size: 20px;
  }

  .skills {
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    gap: 20px;
  }

  .skill-category {
    width: calc(50% - 10px);
    min-width: unset;
  }
}
</style>