import fetchSnacks from './fetchSnacks.js';
import fetchSalesPoints from './fetchSalesPoints.js';

const loadSnacksBtn = document.querySelector('#load-snacks-btn');
const snacksContainer = document.querySelector('#snacks-container');
const feedback = document.querySelector('#feedback');
const sales_pointsContainer = document.querySelector('#sales_points-container');
const spfeedback = document.querySelector('#feedback');

// TODO task004: ajouter les références DOM nécessaires pour les points de vente
// TODO task004: prévoir une variable d'état pour éviter de recharger inutilement les données

loadSnacksBtn.addEventListener('click', loadSnacks);
// TODO task004: brancher ici l'événement du bouton des points de vente

async function loadSnacks() {
  feedback.textContent = '';

  try {
    const snacks = await fetchSnacks();
    displaySnacks(snacks);
  } catch (error) {
    console.error(error);
    feedback.textContent = 'Impossible de charger les snacks.';
  }
}

function displaySnacks(snacks) {
  snacksContainer.innerHTML = snacks.map((snack) => `
    <article class="card">
      <img src="${snack.imageUrl}" alt="${snack.alt}">
      <div class="card-content">
        <h3>${snack.name}</h3>
        <p>${snack.description}</p>
        <p class="price">CHF ${snack.price.toFixed(2)}</p>
        <span class="fake-action">Commander</span>
      </div>
    </article>
  `).join('');

  // TODO task002: adapter le rendu selon le cahier des charges
}

// TODO task003: créer une fonction loadSalesPoints

async function loadSalesPoints() {
  spfeedback.textContent = '';

  try {
    const sales_points = await fetchSalesPoints();
    displaySalesPoints(sales_points);
  } catch (error) {
    console.error(error);
    spfeedback.textContent = 'Impossible de charger les points de vente du campus.';
  }
}
// TODO task003: créer une fonction displaySalesPoints

function displaySalesPoints(sales_points) {
  sales_pointsContainer.innerHTML = sales_points.map((sp) => `
    <article class="sales-point-card">
      <article className="sales-point-card">
        <h3>${sp.bulding}</h3>
        <p><strong>Salle :</strong> ${sp.room}</p>
        <p><strong>Horaires :</strong> ${sp.openingHours}</p>
        <p><strong>Email :</strong>${sp.email}</p>
      </article>
  `).join('');



  // TODO task002: adapter le rendu selon le cahier des charges
}

// TODO task005: afficher un message lisible si le chargement échoue
