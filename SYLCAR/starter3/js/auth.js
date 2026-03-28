document.addEventListener('DOMContentLoaded', () => {
	const loginTab = document.getElementById('loginTab');
	const registerTab = document.getElementById('registerTab');
	const loginForm = document.getElementById('loginForm');
	const registerForm = document.getElementById('registerForm');

	// Obsługa przełączania zakładek
	loginTab.addEventListener('click', () => {
		loginTab.classList.add('active');
		registerTab.classList.remove('active');
		loginForm.classList.remove('is-hidden');
		registerForm.classList.add('is-hidden');
	});

	registerTab.addEventListener('click', () => {
		registerTab.classList.add('active');
		loginTab.classList.remove('active');
		registerForm.classList.remove('is-hidden');
		loginForm.classList.add('is-hidden');
	});
});

// Funkcja pokazująca/ukrywająca hasło
function togglePass(inputId) {
	const input = document.getElementById(inputId);
	input.type = input.type === 'password' ? 'text' : 'password';
}

function togglePass(inputId) {
	const input = document.getElementById(inputId);
	// Szukamy spana, który jest rodzeństwem (sibling) tego inputa
	const icon = input.parentElement.querySelector('.toggle-pass');

	if (input.type === 'password') {
		input.type = 'text';
		icon.textContent = '🙈'; // Zmieniamy ikonę na zasłonięte oczy
	} else {
		input.type = 'password';
		icon.textContent = '👁'; // Powrót do zwykłego oka
	}
}


// odrazu do register

document.addEventListener('DOMContentLoaded', () => {
	// Sprawdź czy w adresie jest #register
	if (window.location.hash === '#register') {
		const registerTab = document.getElementById('registerTab');
		const loginTab = document.getElementById('loginTab');
		const registerForm = document.getElementById('registerForm');
		const loginForm = document.getElementById('loginForm');

		if (registerTab) {
			registerTab.classList.add('active');
			loginTab.classList.remove('active');
			registerForm.classList.remove('is-hidden');
			loginForm.classList.add('is-hidden');
		}
	}
});