<script setup>
import { ref, onMounted, onUnmounted } from 'vue';
import CardProjects from './CardProjects.vue';
import ProjectSheet from './ProjectSheet.vue';
import psg from'@/assets/img/psg.jpg'
import adeir1 from'@/assets/img/adeir1.jpg'
import adeir2 from'@/assets/img/adeir2.jpg'
import adeir3 from'@/assets/img/adeir3.jpg'
import adeir4 from'@/assets/img/adeir4.jpg'
import adeir5 from'@/assets/img/adeir5.jpg'
import adeir6 from'@/assets/img/adeir6.jpg'
import adeir7 from'@/assets/img/adeir7.jpg'
import adeir8 from'@/assets/img/adeir8.jpg'
import adeir9 from'@/assets/img/adeir9.jpg'
import adeir10 from'@/assets/img/adeir10.jpg'
import welcome from'@/assets/img/welcome.jpeg'
import tracker1 from'@/assets/img/tracker1.jpeg'
import tracker2 from'@/assets/img/tracker2.jpeg'
import tracker3 from'@/assets/img/tracker3.jpeg'
import tracker4 from'@/assets/img/tracker4.jpeg'
import tracker5 from'@/assets/img/tracker5.jpeg'
import tracker6 from'@/assets/img/tracker6.jpeg'
import tracker7 from'@/assets/img/tracker7.jpeg'
import tracker8 from'@/assets/img/tracker8.jpeg'
import tracker9 from'@/assets/img/tracker9.jpeg'
import qrapk from '@/assets/img/QRapk.jpg'
import qrgo from '@/assets/img/QRgo.png'

const isMobile = ref(false);
const selectedProject = ref(null);
const isSheetOpen = ref(false);

const checkMobile = () => {
  isMobile.value = window.innerWidth <= 768;
};

onMounted(() => {
  checkMobile();
  window.addEventListener('resize', checkMobile);
});

onUnmounted(() => {
  window.removeEventListener('resize', checkMobile);
});

const openProject = (project) => {
  selectedProject.value = project;
  isSheetOpen.value = true;
};

const closeSheet = () => {
  isSheetOpen.value = false;
  setTimeout(() => {
    selectedProject.value = null;
  }, 400);
};

const projects = [
  {
    id: 1,
    title: "Application mobile - Projet client",
    description: "Développement front-end mobile en équipe : architecture, intégration API, et workflow Git rigoureux (branches par ticket, PR, revue de code).",
    longDescription: "Contribution à un projet client au sein d'une équipe de 3 développeurs, encadrée par un lead technique, dans un environnement Agile (gestion de tickets, organisation en sprints). Développement des interfaces front-end de l'application mobile, intégration des fonctionnalités UI, mise en place et maintien de l'architecture front-end (séparation des couches présentation / domaine / données). Intégration et consommation d'une API backend fournie par le lead développeur, avec gestion des appels et des données côté application. Collaboration active avec l'équipe sur Git (branches par ticket, pull requests, revue de code) et participation aux échanges techniques pour valider les choix d'implémentation.",
    image: null,
    screenshots: [],
    link: '',
    date: 'Fév. - Mai 2026',
    role: 'Développeur mobile front-end',
    team: '3 développeurs + 1 lead technique',
    methodology: 'Méthode Agile/Scrum - gestion de tickets, sprints, branches Git dédiées par ticket, Pull Requests avec revue de code systématique par le lead technique.',
    stack: ['React Native', 'Expo', 'TypeScript', 'Zustand', 'Axios', 'Expo Router', 'Git'],
    highlights: [
      'Architecture en couches séparées (data / domain / view)',
      'Gestion d\'état avec Zustand',
      'Appels API REST typés via Axios',
      'Navigation avec Expo Router',
      'Workflow Git : branches par ticket, Pull Requests, revue de code',
      'Méthode Agile/Scrum : gestion de tickets, sprints, adaptabilité',
      'Plus de détails disponibles à la sortie de l\'application...',
    ]
  },
  {
    id: 2,
    title: "Tracker App - Application mobile de finances - Projet personnel",
    description: "Application mobile de suivi de dépenses et revenus avec gestion multi-portefeuilles, statistiques visuelles et authentification Firebase.",
    longDescription: "Projet solo réalisé dans un but d'apprentissage et de progression sur React Native et TypeScript. L'application permet de gérer ses finances personnelles de manière complète : plusieurs portefeuilles avec solde en temps réel, ajout/modification/suppression de transactions catégorisées (courses, loyer, santé, loisirs...), statistiques visuelles en barres sur 7 jours, mois ou par année, recherche de transactions, photo de profil uploadée sur Cloudinary, et suppression de compte avec nettoyage intégral des données Firestore. L'authentification est gérée via Firebase Auth avec persistance de session. Le projet m'a permis de progresser sur l'architecture d'une app mobile avec Expo Router (file-based routing), la gestion d'état via Context API et hooks personnalisés, et l'intégration de services cloud tiers.",
    longDescriptionNote: "Basé sur une structure existante (cours de formation que j'ai suivi), puis restructuré et amélioré : modernisation des patterns React Native obsolètes, renforcement du typage TypeScript, réorganisation de l'architecture en couches (services, hooks, contextes), ainsi que l'ajout de fonctionnalités propres et du déploiement.",
    image: welcome,
    screenshots: [tracker7, tracker8, tracker9, tracker6, tracker1, tracker2, tracker3, tracker4, tracker5],
    link: 'https://github.com/yassin-f12/tracker-app',
    qrCode: qrgo,
    qrCodeAndroid: qrapk,
    linkExpo: 'https://expo.dev/preview/update?message=update+password+forget&updateRuntimeVersion=1.0.0&createdAt=2026-04-16T13%3A47%3A48.695Z&slug=exp&projectId=92ecb343-9a23-407a-b887-a22915c71c4f&group=baaf39d4-1e9c-4bf0-a319-0e974a0ee6a1',
    linkApk: 'https://github.com/yassin-f12/tracker-app/releases/download/v1.0.0/application-3765f356-61cc-449f-9ca5-964373a77196.apk',
    date: '2026',
    role: 'Développeur Mobile',
    team: 'Projet solo - Apprentissage personnel',
    methodology: 'Projet structuré en couches séparées : services (Firebase, Cloudinary), hooks personnalisés, contexte d\'authentification global. Architecture file-based avec Expo Router.',
    stack: ['React Native', 'Expo', 'TypeScript', 'Firebase Auth', 'Firestore', 'Cloudinary', 'Expo Router', 'Reanimated', 'Axios'],
    highlights: [
      'Authentification complète : inscription, connexion, persistance de session, changement d\'email avec re-authentification',
      'Gestion multi-portefeuilles : création, modification, suppression avec icône personnalisée uploadée sur Cloudinary',
      'Transactions CRUD complètes : dépenses et revenus avec 12 catégories, description, date, reçu photo et portefeuille associé',
      'Mise à jour automatique du solde des portefeuilles à chaque transaction (ajout, modification, suppression)',
      'Statistiques visuelles avec graphiques en barres (revenus vs dépenses) — hebdomadaires, mensuelles, annuelles',
      'Recherche de transactions en temps réel',
      'Photo de profil avec upload Cloudinary, modification du profil et de l\'email',
      'Suppression de compte avec nettoyage complet : transactions, portefeuilles, profil Firestore supprimés en batch',
      'Hook personnalisé useFetchData avec listener Firestore en temps réel (onSnapshot)',
      'Gestion centralisée des erreurs Firebase Auth et Firestore avec messages traduits en français',
      'APK Android disponible en téléchargement direct via Expo',
    ]
  },
  {
    id: 3,
    title: "Stage - Refonte plateforme ADEIR - Projet client",
    description: "Refonte complète du site d'une association avec Vue.js et PHP 8 - espace membres, gestion des adhésions, événements, forum communautaire et notifications en temps réel.",
    longDescription: "Dans le cadre de mon stage de fin de formation DWWM, j'ai participé à la refonte complète du site de l'ADEIR (Association pour le Développement Économique de l'Isère Rhodanienne) en équipe de 3 développeurs. Le site intègre un espace membres complet avec profils personnalisables, un système de gestion des adhésions avec validation admin, la gestion des événements avec inscription en ligne, un forum communautaire, la génération de PDF, un système de mailing automatique et un tableau de bord d'administration. J'étais personnellement responsable du forum et des interactions communautaires : conception et développement du système de topics (création, réponses, modification, suppression), archivage/restauration selon les droits, système de notifications en temps réel, mentions, moteur de recherche interne au forum, et automatisations CRON pour la gestion des expirations et l'envoi d'alertes. J'ai également développé les pages associées et contribué au maquettage Figma.",
    image: adeir4,
    screenshots: [adeir1, adeir2, adeir3, adeir5, adeir6, adeir7, adeir8, adeir9, adeir10],
    link: 'https://www.adeir.fr/',
    date: 'Sept. - Nov. 2025',
    role: 'Développeur Full Stack - Responsable Forum & Interactions',
    team: '3 développeurs',
    methodology: 'Méthode Agile adaptée - sprints de 2 à 3 semaines, réunions hebdomadaires, démonstrations client à chaque phase. Gestion des tâches sur Trello (Kanban), planning Gantt sur Google Sheets, centralisation des documents sur Google Drive. Communication client via Gmail avec comptes-rendus et validations à chaque livrable.',
    stack: ['Vue.js 3', 'PHP 8.3', 'MySQL', 'Docker', 'GitLab', 'Figma', 'Pinia', 'Axios', 'JWT', 'Vite'],
    highlights: [
      'Espace membres complet : profils personnalisables, gestion des rôles',
      'Gestion des adhésions : formulaire en ligne, validation admin, notifications automatiques, génération de PDF',
      'Gestion des événements : inscription en ligne, confirmation par mail, liste des participants',
      'Forum communautaire : topics, réponses, archivage/restauration, droits hiérarchiques par rôle',
      'Système de notifications en temps réel : alertes, mentions, topics urgents, automatisations CRON',
      'Moteur de recherche interne au forum',
      'Génération de PDF, mailing automatique, formulaire de contact avec accusé de réception',
      'Architecture MVC PHP 8.3, API REST sécurisée JWT, conformité RGPD complète',
      'Maquettage Figma haute-fidélité, design system partagé',
      'Tests unitaires Vitest',
      'Retour client unanimement positif - les adhérents ont hâte d\'utiliser le nouveau site',
    ]
  },
  {
    id: 4,
    title: "PSG Player Directory - Projet personnel",
    description: "Application web PHP/MySQL de gestion d'équipe de football avec CRUD complet, upload d'images, recherche en temps réel et cartes joueurs animées.",
    longDescription: "Application web développée en solo pour apprendre et pratiquer le développement full stack PHP/MySQL. Elle permet de gérer un effectif de football (PSG) avec un CRUD complet : affichage des joueurs sous forme de cartes animées style 'carte de joueur', ajout avec upload d'image sécurisé, modification avec remplacement d'image, suppression avec confirmation via modale, et recherche en temps réel par nom, prénom ou numéro. Le projet est hébergé en ligne sur InfinityFree avec base de données MySQL. L'environnement de développement est containerisé avec Docker.",
    image: psg,
    screenshots: [psg],
    link: 'https://projetfoot.infinityfreeapp.com/',
    date: '2024',
    role: 'Développeur Full Stack',
    team: 'Projet solo - Apprentissage personnel',
    methodology: 'Projet pédagogique structuré avec séparation des responsabilités : connexion BDD isolée (bdd.php), configuration séparée non versionnée (config.php), templates réutilisables (head, menu, footer), routing par paramètre GET. Environnement dockerisé avec PHP, MySQL et phpMyAdmin.',
    stack: ['PHP 8', 'MySQL', 'PDO', 'HTML5', 'CSS3', 'JavaScript', 'Docker', 'phpMyAdmin'],
    highlights: [
      'CRUD complet : ajout, affichage, modification et suppression de joueurs',
      'Upload d\'images sécurisé : validation type MIME, taille max 5MB, noms uniques, suppression automatique des anciennes images',
      'Cartes joueurs animées avec effets lumineux CSS et dégradé animé rotatif',
      'Recherche en temps réel par nom, prénom ou numéro de joueur',
      'Modale de confirmation avant suppression',
      'Sécurité : requêtes préparées PDO, htmlspecialchars, strip_tags, protection .htaccess sur config.php',
      'Architecture MVC simplifiée : routing via index.php, templates partagés, séparation config/BDD',
      'Responsive design — mobile, tablette et desktop',
      'Hébergé en ligne sur InfinityFree avec base de données MySQL',
      'Environnement de développement dockerisé (PHP + MySQL + phpMyAdmin)',
    ]
  },
]
</script>

<template>
  <section id="projets" class="projects">
    <h5 class="title">Projets</h5>

    <div class="projects-flex">
      <CardProjects v-for="project in projects" :key="project.id" :image="project.image" :title="project.title"
        :description="project.description" @click="openProject(project)" />
    </div>
  </section>

  <ProjectSheet :project="selectedProject" :isOpen="isSheetOpen" @close="closeSheet" />
</template>

<style scoped>
.projects {
  margin: 0 5%;
}

.title {
  font-weight: 650;
  font-size: 24px;
  letter-spacing: -0.02em;
  margin-bottom: 2%;
}

.projects-flex {
  display: flex;
  justify-content: space-around;
  flex-wrap: wrap;
  gap: 32px;
}

@media (max-width: 1200px) {
  .projects-flex {
    gap: 24px;
  }
}

@media (max-width: 968px) {
  .projects-flex {
    justify-content: center;
  }
}
</style>