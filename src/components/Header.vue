<template>
  <header class="fade-in">
    <h1 class="logo" title="Fahem Yassin">YF.</h1>
    <nav>
        <a href="#projects" title="View my projects">Projects</a> 
        <a href="#about" title="About me">About</a> 
        <a href="#contact" title="Contact me">Contact</a>
    </nav>
  </header>

  <section class="bloc fade-in"  title="Who I am">
    <div class="titles">
        <h2 class="title">Full-Stack Developer.</h2>
        <h3 class="title">Building modern web experiences.</h3>
    </div>
    <div class="btns">
        <a href="#projects" title="View my projects" class="project-btn btn">View Projects</a>
        <a href="#contact" title="Contact me" class="contact-btn btn">Contact Me</a>
    </div>
  </section>
</template>

<style scoped>
header {
    display: flex;
    justify-content: space-between;
    margin: 2% 5%;
}

h1.logo {
    font-weight: 700;
    letter-spacing: -0.04em;
}

nav {
    display: flex;
    gap: 20px;
}

nav a {
    font-size: 1em;
    color: #999;
    letter-spacing: -0.04em;
}

.bloc {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 45px;
    margin-top: 7%;
}

.titles {
    text-align: center;
}

.titles .title {
    font-weight: 700;
    font-size: 40px;
    margin: 0;
    line-height: 1;
    letter-spacing: -0.04em;
}

.titles h3 {
    color: #999;
}

.btns {
    display: flex;
    gap: 20px;
}

.btn {
    border-radius: 20px;
    padding: 5px 12px;
    letter-spacing: -0.04em;
}

.project-btn {
    background-color: #000;
    color: #fff;
}

.contact-btn {
    background-color: #eee;
    color: #000;
}
</style>
