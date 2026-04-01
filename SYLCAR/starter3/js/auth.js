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

// Walidacja Formularza 

const form = document.getElementById("registerForm");

const forbiddenWords = ["admin", "root", "system", "test", "kurwa"]; // możesz rozszerzyć

function setError(inputId, message) {
    const input = document.getElementById(inputId);
    const group = input.parentElement;
    const error = document.getElementById(inputId + "Error");

    group.classList.remove("success");
    group.classList.add("error");
    error.textContent = message;
}

function setSuccess(inputId) {
    const input = document.getElementById(inputId);
    const group = input.parentElement;
    const error = document.getElementById(inputId + "Error");

    group.classList.remove("error");
    group.classList.add("success");
    error.textContent = "";
}

function containsForbidden(value) {
    return forbiddenWords.some(word => value.toLowerCase().includes(word));
}

// IMIĘ / NAZWISKO
function validateName(id) {
    const value = document.getElementById(id).value.trim();

    if (value.length < 3) {
        setError(id, "Minimum 3 znaki");
        return false;
    }

    if (!/^[A-Za-zĄąĆćĘęŁłŃńÓóŚśŹźŻż]+$/.test(value)) {
        setError(id, "Tylko litery");
        return false;
    }

    if (containsForbidden(value)) {
        setError(id, "Niedozwolona nazwa");
        return false;
    }

    setSuccess(id);
    return true;
}

// TELEFON
function validatePhone() {
    const id = "regPhone";
    const value = document.getElementById(id).value.trim();

    const phoneRegex = /^(\+48\s?)?(\d{3}[\s-]?){2}\d{3}$/;

    if (!phoneRegex.test(value)) {
        setError(id, "Niepoprawny numer telefonu");
        return false;
    }

    setSuccess(id);
    return true;
}

// EMAIL
function validateEmail() {
    const id = "regEmail";
    const value = document.getElementById(id).value.trim();

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailRegex.test(value)) {
        setError(id, "Niepoprawny email");
        return false;
    }

    setSuccess(id);
    return true;
}

// HASŁO
function validatePassword() {
    const id = "regPass";
    const value = document.getElementById(id).value;

    if (value.length < 8) {
        setError(id, "Minimum 8 znaków");
        return false;
    }

    if (!/[a-z]/.test(value)) {
        setError(id, "Brak małej litery");
        return false;
    }

    if (!/[A-Z]/.test(value)) {
        setError(id, "Brak dużej litery");
        return false;
    }

    if (/[;,]/.test(value)) {
        setError(id, "Zakazane znaki , ;");
        return false;
    }

    setSuccess(id);
    return true;
}

// POWTÓRZ HASŁO
function validatePassword2() {
    const pass1 = document.getElementById("regPass").value;
    const pass2 = document.getElementById("regPass2").value;

    if (pass1 !== pass2) {
        setError("regPass2", "Hasła się nie zgadzają");
        return false;
    }

    setSuccess("regPass2");
    return true;
}

// CHECKBOX
function validateTerms() {
    const checkbox = document.getElementById("regTerms");

    if (!checkbox.checked) {
        alert("Musisz zaakceptować regulamin");
        return false;
    }

    return true;
}

// SUBMIT
form.addEventListener("submit", function (e) {
    e.preventDefault();

    const valid =
        validateName("regFirstName") &&
        validateName("regLastName") &&
        validatePhone() &&
        validateEmail() &&
        validatePassword() &&
        validatePassword2() &&
        validateTerms();

    if (valid) {
        alert("Rejestracja OK 🚀");
        form.submit();
    }
});

document.querySelectorAll("input").forEach(input => {
    input.addEventListener("input", () => {
        switch (input.id) {
            case "regFirstName":
            case "regLastName":
                validateName(input.id);
                break;
            case "regPhone":
                validatePhone();
                break;
            case "regEmail":
                validateEmail();
                break;
            case "regPass":
                validatePassword();
                break;
            case "regPass2":
                validatePassword2();
                break;
        }
    });
});