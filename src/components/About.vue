<template>
  <section id="about" class="about fade-in">
    <div class="top">
      <h4 class="marg">Yassin Fahem</h4>
      <span class="marg">Developer</span>
    </div>

    <div class="content">
      <p class="para-1">I'm Yassin, a passionate full-stack web developer. I love building seamless, scalable applications that combine great design with strong performance.</p>
      <p class="para-2">With hands-on experience in modern JavaScript frameworks, backend technologies, and database management, I thrive on creating end-to-end solutions. I pay close attention to UI/UX and write clean, maintainable code.</p>
      <p class="para-3">I'm always eager to learn new technologies and tackle challenges. My goal is to solve problems collaboratively and build impactful digital experiences. Let's build the web together!</p>
    </div>
  </section>

  <section class="competences fade-in">
    <p class="tit">My Skills</p>
    <div class="skills">
      <div class="skill-category">
        <span>Front-End</span>
        <div class="stack">
          <p>HTML5 / CSS3</p>
          <p>JavaScript</p>
          <p>Vue.js</p>
          <p>React</p>
          <p>Sass</p>
          <p>Responsive Design</p>
        </div>
      </div>
      <div class="skill-category">
        <span>Back-End</span>
        <div class="stack">
          <p>PHP 8</p>
          <p>API REST (CRUD)</p>
          <p>MVC Architecture</p>
          <p>Form Handling</p>
        </div>
      </div>
      <div class="skill-category">
        <span>Database & Tools</span>
        <div class="stack">
          <p>MySQL</p>
          <p>Docker</p>
          <p>Git</p>
        </div>
      </div>
      <div class="skill-category">
        <span>Education</span>
        <p>DWWM (Web and Mobile Developer)</p>
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
  color: #999;
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
  color: #777;
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
}

.skill-category p {
  font-size: 14px;
  color: #475569; 
  line-height: 1.4em;
}

.stack {
  display: flex;
  flex-direction: column;
  gap: 4px;
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
