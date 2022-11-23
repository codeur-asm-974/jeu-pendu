const afficherChoix = (choixMapping) => {
	const choixhtml = choixMapping.map((lettreMapping) => {
		if (lettreMapping.isChoisi === false) {
			return `<li>${lettreMapping.lettre}</li>`;
		} else {
			return `<li class="disabled">${lettreMapping.lettre}</li>`;
		}
	});
	elements.choix.querySelector('ul').innerHTML = choixhtml.join('');
	elements.choix.querySelector('ul').style.backgroundColor= 'rgb(235, 172, 128)';
};

const afficherMot = (motMapping) => {
	const motHtml = motMapping.map((lettreMapping) => {
		if (lettreMapping.isVisible === true) {
			return `<li>${lettreMapping.lettre}</li>`;
		} else {
			return `<li>_</li>`;
		}
	});
	elements.reponse.querySelector('ul').innerHTML = motHtml.join('');
};
const genereChoix = () => {
	for (let index = 65; index <= 90; index++) {
		choix.push(String.fromCharCode(index));
	}
	return choix;
};

const getChoixMapping = (choix) => {
	const choixMapping = choix.map((lettre) => {
		return {
			lettre,
			isChoisi: false,
		};
	});
	return choixMapping;
};

const afficherScore = () => {
	elements.score.innerHTML =`<img src="img/00${scoreCount}.jpg" alt=pendu/>`

};

const getMotMapping = (mot) => {
	const motArr = mot.split('');
	console.log(mot);
	console.log(motArr);
	const motMapping = motArr.map((lettre, index) => {
		let isVisible = false;
		if (index === 0 || index == motArr.length - 1) {
			isVisible = true;
		}

		return {
			lettre: lettre,
			isVisible,
		};
	});
	return motMapping;
};

const choisirMot = () => {
	const randomIndex = getRandomInt(0, mots.length - 1);
	return mots[randomIndex];
};
