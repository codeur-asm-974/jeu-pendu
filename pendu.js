const elements = {
	score: null,
	reponse: null,
	choix: null,
};

const mots = [
	'PATRICIA',
	'DOCTEUR',
	'INTELLECTUEL',
	'ECOLE',
	'FRANCES',
	'ELEPHANT',
	'CROCODILE',
	'MOUSTIQUE',
	'PIEUVRE',
	'ANIMAUX',
	'PORTABLE',
	'ORDINATEUR',
	'LEGUME',
	'POIREAU',
	'YOGA',
];
let choix = [];
let mot = '';
let motMapping = [];
let choixMapping = [];
let scoreCount = 0;
let scoreMax = 8;

const init = () => {
	console.log('init');

	//Attacher elements
	elements.score = document.getElementById('score');
	elements.reponse = document.getElementById('reponse');
	elements.choix = document.getElementById('choix');

	//choisir mot
	mot = choisirMot();
	//console.log(mot);
	//  -create word mapping
	motMapping = getMotMapping(mot);
	console.log(motMapping);
	//generate choices
	choix = genereChoix();

	//  create choices mapping
	choixMapping = getChoixMapping(choix);

	//afficher information
	afficherMot(motMapping);
	//afficher choix
	afficherChoix(choixMapping);
	//afficher score
	//afficherScore();
	//ecouter evenements
	//  -mouse events

	// vérifier lettre
	//  - si pas dans le mot on ajoute au score
	//  -si dans le mot on ajoute la lettre
	//  -fin de jeu
	//      -score ==max: perdu
	//      -tous lettre trouver:gagner

	elements.choix.addEventListener('click', ({ target }) => {
		if (target.matches('li')) {
			choisirLettre(target.innerHTML);
		}
	});
	//  -keyboard events
	document.addEventListener('keydown', ({ keyCode }) => {
		const lettre = String.fromCharCode(keyCode);
		if (keyCode >= 65 && keyCode <= 90) {
			console.log(lettre);
			choisirLettre(lettre);
		}
	});
};

const choisirLettre = (lettre) => {
	console.log(lettre);
	let islettreInMot = false;
	let tousLettreDecouvert = true;
	motMapping.forEach((lettreMapping) => {
		if (lettreMapping.lettre === lettre) {
			lettreMapping.isVisible = true;
			islettreInMot = true;
		}

		if (!lettreMapping.isVisible) {
			tousLettreDecouvert = false;
		}
		//console.log(islettreInMot);
	});

	choixMapping.forEach((lettreMapping) => {
		if (lettreMapping.lettre === lettre) {
			lettreMapping.isChoisi = true;
		}
	});

	afficherChoix(choixMapping);
	if (islettreInMot === true) {
		afficherMot(motMapping);
	} else {
		scoreCount++;
		afficherScore();
	}
	if (scoreCount === scoreMax) {
		finJeux();
	}
	if (tousLettreDecouvert) {
		winGame();
	}
};
	const finJeux = () => {
		document.querySelector('body').style.backgroundColor = 'red';
		elements.choix.innerHTML = `<h1>PENDU</h1>`;
	};
	const winGame = () => {
		elements.choix.innerHTML = `<h1>TROUVER</h1>`;
	};

window.addEventListener('load', () => {
	init();
});

const getRandomInt = (min, max) => {
	min = Math.ceil(min);
	max = Math.floor(max);
	return Math.floor(Math.random() * (max - min)) + min;
};
