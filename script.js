// Configuration du jeu
const totalSpheres = 50;
const totalGarcons = 30;
const totalFilles = 20;
let spheresRevealed = 0;
let currentStep = 0;

// Images
const garconImage = 'images/garcon.png';
const filleImage = 'images/fille.png';

// Générer une grille de sphères
function generateGrille(grilleId, count) {
    const grille = document.getElementById(grilleId);
    grille.innerHTML = '';
    grille.style.display = 'grid';
    
    for (let i = 0; i < count; i++) {
        const sphere = document.createElement('div');
        sphere.className = 'sphere';
        sphere.textContent = '?';
        sphere.dataset.index = i;
        sphere.dataset.type = i < totalGarcons ? 'garcon' : 'fille';
        sphere.addEventListener('click', () => handleSphereClick(sphere, grilleId));
        grille.appendChild(sphere);
    }
}

// Gérer le clic sur une sphère
function handleSphereClick(sphere, grilleId) {
    if (sphere.classList.contains('clicked') || sphere.classList.contains('revealed-garcon') || sphere.classList.contains('revealed-fille')) {
        return;
    }

    sphere.classList.add('clicked');
    
    if (sphere.dataset.type === 'garcon') {
        sphere.classList.add('revealed-garcon');
    } else {
        sphere.classList.add('revealed-fille');
    }

    spheresRevealed++;

    // Logique pour les étapes
    if (currentStep === 0 && spheresRevealed === 2) {
        document.getElementById('btn-suite-intro').style.display = 'block';
    } else if (currentStep === 1 && spheresRevealed === 10) {
        document.getElementById('btn-suite-interaction').style.display = 'block';
    } else if (currentStep === 3 && spheresRevealed === 20) {
        document.getElementById('btn-suite-3').style.display = 'block';
    }
}

// Passer à l'étape suivante
function nextStep() {
    currentStep++;
    spheresRevealed = 0;
    
    // Masquer toutes les pages
    document.querySelectorAll('.page').forEach(page => {
        page.style.display = 'none';
    });

    // Afficher la page correspondante
    switch (currentStep) {
        case 0:
            document.getElementById('introduction').style.display = 'block';
            generateGrille('grille-spheres', 50);
            break;
        case 1:
            document.getElementById('premiere-interaction').style.display = 'block';
            generateGrille('grille-spheres-2', 50);
            break;
        case 2:
            document.getElementById('deuxieme-interaction').style.display = 'block';
            break;
        case 3:
            document.getElementById('suite').style.display = 'block';
            generateGrille('grille-spheres-3', 50);
            break;
        case 4:
            document.getElementById('resultat-10-clics').style.display = 'block';
            break;
        case 5:
            document.getElementById('revelation-finale').style.display = 'block';
            break;
        case 6:
            document.getElementById('explication-biais-societal').style.display = 'block';
            break;
        case 7:
            document.getElementById('resultat-biais-societal').style.display = 'block';
            break;
        case 8:
            document.getElementById('exemples-reels').style.display = 'block';
            break;
        case 9:
            document.getElementById('solutions-biais').style.display = 'block';
            break;
        case 10:
            document.getElementById('conclusion').style.display = 'block';
            break;
        case 11:
            document.getElementById('bulles-filtres').style.display = 'block';
            break;
        case 12:
            document.getElementById('fin').style.display = 'block';
            break;
    }
}

// Gérer les choix de l'utilisateur
function handleChoice(choice) {
    if (currentStep === 2) {
        if (choice === 'filles') {
            document.getElementById('resultat-correct').style.display = 'block';
        } else {
            document.getElementById('resultat-incorrect').style.display = 'block';
        }
    } else if (currentStep === 4) {
        if (choice === 'filles') {
            document.getElementById('revelation-finale').style.display = 'block';
        } else {
            alert("Essayez encore !");
        }
    } else if (currentStep === 6) {
        if (choice === 'violet') {
            document.getElementById('resultat-biais-societal').style.display = 'block';
        } else {
            alert("Aïe, aïe, aïe ! Cette fille fait partie d'une minorité de filles qui détestent les vêtements violets !");
        }
    }
}

// Initialisation
window.onload = function() {
    document.getElementById('accueil').style.display = 'block';
    
    // Boutons de navigation
    document.getElementById('btn-decouvrir').addEventListener('click', () => {
        document.getElementById('accueil').style.display = 'none';
        nextStep();
    });

    document.getElementById('btn-suite-intro').addEventListener('click', () => {
        document.getElementById('introduction').style.display = 'none';
        nextStep();
    });

    document.getElementById('btn-suite-interaction').addEventListener('click', () => {
        document.getElementById('premiere-interaction').style.display = 'none';
        nextStep();
    });

    document.getElementById('btn-garcons').addEventListener('click', () => handleChoice('garcons'));
    document.getElementById('btn-filles').addEventListener('click', () => handleChoice('filles'));

    document.getElementById('btn-reessayer').addEventListener('click', () => {
        document.getElementById('resultat-incorrect').style.display = 'none';
        currentStep = 1;
        nextStep();
    });

    document.getElementById('btn-je-vois').addEventListener('click', () => {
        document.getElementById('resultat-correct').style.display = 'none';
        nextStep();
    });

    document.getElementById('btn-je-vois-2').addEventListener('click', () => {
        document.getElementById('explication-biais').style.display = 'none';
        nextStep();
    });

    document.getElementById('btn-jai-compris').addEventListener('click', () => {
        document.getElementById('explication-comptage').style.display = 'none';
        nextStep();
    });

    document.getElementById('btn-suite-3').addEventListener('click', () => {
        document.getElementById('suite').style.display = 'none';
        nextStep();
    });

    document.getElementById('btn-filles-2').addEventListener('click', () => handleChoice('filles'));
    document.getElementById('btn-garcons-2').addEventListener('click', () => handleChoice('garcons'));

    document.getElementById('btn-ah-oui').addEventListener('click', () => {
        document.getElementById('revelation-finale').style.display = 'none';
        nextStep();
    });

    document.getElementById('btn-vert').addEventListener('click', () => handleChoice('vert'));
    document.getElementById('btn-violet').addEventListener('click', () => handleChoice('violet'));

    document.getElementById('btn-ah-oui-2').addEventListener('click', () => {
        document.getElementById('resultat-biais-societal').style.display = 'none';
        nextStep();
    });

    document.getElementById('btn-suite-exemples').addEventListener('click', () => {
        document.getElementById('exemples-reels').style.display = 'none';
        nextStep();
    });

    document.getElementById('btn-que-puis-je-faire').addEventListener('click', () => {
        document.getElementById('solutions-biais').style.display = 'none';
        nextStep();
    });

    document.getElementById('btn-pourquoi').addEventListener('click', () => {
        document.getElementById('conclusion').style.display = 'none';
        nextStep();
    });

    document.getElementById('btn-mince').addEventListener('click', () => {
        document.getElementById('bulles-filtres').style.display = 'none';
        nextStep();
    });
};
