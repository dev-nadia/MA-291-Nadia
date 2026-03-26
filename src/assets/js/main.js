// Import des fonctions pour récupérer les données JSON
import fetchSnacks from './fetchSnacks.js';
import fetchSalesPoints from './fetchSalesPoints.js';

// ----------------------------
// Références DOM pour les snacks
// ----------------------------
const loadSnacksBtn = document.querySelector('#load-snacks-btn'); // Bouton pour charger les snacks
const snacksContainer = document.querySelector('#snacks-container'); // Conteneur où les snacks seront affichés
const feedback = document.querySelector('#feedback');// Message de feedback ou d'erreur pour les snacks

// ----------------------------
// Références DOM pour les points de vente
// ----------------------------
// TODO task004: ajouter les références DOM nécessaires pour les points de vente
const sales_pointsContainer = document.querySelector('#sales_points-container');// Conteneur pour afficher les points de vente
const spfeedback = document.querySelector('#sp_feedback');// Message de feedback ou d'erreur pour les points de vente
const loadSalesPointsBtn = document.querySelector('#load-salespoints-btn');// Bouton pour charger les points de vente
const salesPointsSection = document.querySelector('.sales-points-section');// Section entière des points de vente

/ ----------------------------
// Variables d'état pour gérer l'affichage des points de vente
// ----------------------------
// TODO task004: prévoir une variable d'état pour éviter de recharger inutilement les données
let salesPointsVisible = false; // section cachée par défaut
let salesPointsData = null;// Stocke les données des points de vente pour ne pas recharger inutilement


// TODO task004: brancher ici l'événement du bouton des points de vente

// Bouton Load Sales Points
loadSalesPointsBtn.addEventListener('click', loadSalesPoints);// Appelle la fonction principale pour charger les points de vente

// Listener supplémentaire pour gérer le toggle affichage/masquage
loadSalesPointsBtn.addEventListener('click', async () => {
  if (!salesPointsVisible) {

    // Cela permet de charger les données uniquement la première fois
    if (!salesPointsData) {
      try {
        salesPointsData = await fetchSalesPoints();// Récupère les données via fetch
        displaySalesPoints(salesPointsData); // Affiche les points de vent
      } catch (error) {
        console.error(error); // Log pour debug
         // TODO task005: afficher un message lisible si le chargement échoue
        spFeedback.textContent = 'Impossible de charger les points de vente.';  // Message lisible pour le client
        spfeedback.style.color = 'red'; // Met le message en rouge
        return;                          // Arrête l'exécution
      }
    }
     // Affiche la section et change le texte du bouton
    salesPointsSection.style.display = 'block';
    loadSalesPointsBtn.textContent = 'Hide Sales Points';
    salesPointsVisible = true;
  } else {
    // Masque la section et remet le texte du bouton
    salesPointsSection.style.display = 'none';
    loadSalesPointsBtn.textContent = 'Show Sales Points';
    salesPointsVisible = false;
  }
});
// Bouton Load Snacks
loadSnacksBtn.addEventListener('click', loadSnacks);
// ----------------------------
// Fonction pour charger les snacks depuis le JSON
// ----------------------------
async function loadSnacks() {
  feedback.textContent = ''; // Vide le message précédent

  try {
    const snacks = await fetchSnacks();// Récupère les snacks
    displaySnacks(snacks); // Affiche les snacks
  } catch (error) {
    console.error(error);// Log pour debug
    feedback.textContent = 'Impossible de charger les snacks. Veuillez réessayez plus tard.';
  }
}
// TODO task002: adapter le rendu selon le cahier des charges
// ----------------------------
// Fonction pour afficher les snacks dans le DOM
// ----------------------------
function displaySnacks(snacks) {
// Injecte le contenu HTML dans le conteneur des snacks
  // map() parcourt chaque objet "sp" du tableau "sales_points"
  // join('') concatène toutes les chaînes en une seule (sans virgule)
  snacksContainer.innerHTML = snacks.map((snack) => `
    <article class="card">
      <img src="${snack.imageUrl}" alt="${snack.alt}">
      <div class="card-content">
        <h3>${snack.name.toUpperCase()}</h3>// Met les nom des snacks en majuscule avec to.UpperCase
        <p>${snack.description}</p>
        <p class="price">CHF ${snack.price.toFixed(2)}</p>
        <span class="fake-action">Commander</span>
      </div>
    </article>
  `).join('');

}

// TODO task003: créer une fonction loadSalesPoints
// ----------------------------
// Fonction pour charger les points de vente depuis le JSON
// ----------------------------
async function loadSalesPoints() {
  spfeedback.textContent = '';// Vide le message précédent

  try {
    const sales_points = await fetchSalesPoints();// Récupère les points de vente
    displaySalesPoints(sales_points); // Affiche les points de vente
  } catch (error) {
    console.error(error);
    // TODO task005: afficher un message lisible si le chargement échoue
    spfeedback.textContent = 'Impossible de charger les points de vente du campus.Veuillez réessayez plus tard.';
    spfeedback.style.color = 'red';
  }
}
// TODO task003: créer une fonction displaySalesPoints
// TODO task002: adapter le rendu selon le cahier des charges
// ----------------------------
// Fonction pour afficher les points de vente dans le DOM
// ----------------------------
function displaySalesPoints(sales_points) {
// Injecte le contenu HTML dans le conteneur des points de vente
  // map() parcourt chaque objet "sp" du tableau "sales_points"
  // join('') concatène toutes les chaînes en une seule (sans virgule)
  sales_pointsContainer.innerHTML = sales_points.map((sp) => `
    <article class="sales-point-card">
      
        <h3>${sp.building}</h3>
        <p><strong>Salle :</strong> ${sp.room}</p>
        <p><strong>Horaires :</strong> ${sp.openingHours}</p>
        <p><strong>Email :</strong>${sp.email}</p>
      </article>
  `).join('');




}


