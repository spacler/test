/* =====================================================
   AUTH – ELEMENTY
===================================================== */
const registerForm = document.getElementById('registerForm');

const emailInput = document.getElementById('email');
const passwordInput = document.getElementById('password');
const password2Input = document.getElementById('password2');
const termsCheckbox = document.getElementById('terms');

const ruleEmail = document.getElementById('rule-email');
const ruleLength = document.getElementById('rule-length');
const ruleUpper = document.getElementById('rule-upper');
const passwordMatch = document.getElementById('passwordMatch');
const authError = document.getElementById('authError');

/* =====================================================
   WALIDACJA EMAIL
===================================================== */
function validateEmail(value) {
	const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
	const valid = emailRegex.test(value);

	ruleEmail.classList.toggle('valid', valid);
	return valid;
}

/* =====================================================
   WALIDACJA HASŁA
===================================================== */
function validatePassword(value) {
	const lengthOk = value.length >= 8;
	const upperOk = /[A-Z]/.test(value);

	ruleLength.classList.toggle('valid', lengthOk);
	ruleUpper.classList.toggle('valid', upperOk);

	return lengthOk && upperOk;
}

/* =====================================================
   ZGODNOŚĆ HASEŁ
===================================================== */
function validatePasswordMatch() {
	if (!password2Input.value) {
		passwordMatch.classList.add('hidden');
		passwordMatch.classList.remove('valid');
		return false;
	}

	const match = passwordInput.value === password2Input.value;

	passwordMatch.classList.toggle('hidden', match);
	passwordMatch.classList.toggle('valid', match);

	return match;
}


/* =====================================================
   LISTENERY LIVE
===================================================== */
emailInput?.addEventListener('input', () => {
	validateEmail(emailInput.value);
});

passwordInput?.addEventListener('input', () => {
	validatePassword(passwordInput.value);
	validatePasswordMatch();
});

password2Input?.addEventListener('input', validatePasswordMatch);

/* =====================================================
   SUBMIT
===================================================== */
registerForm?.addEventListener('submit', (e) => {
	e.preventDefault();

	authError.classList.add('hidden');

	const emailOk = validateEmail(emailInput.value);
	const passwordOk = validatePassword(passwordInput.value);
	const matchOk = validatePasswordMatch();
	const termsOk = termsCheckbox.checked;

	if (!termsOk) {
		authError.textContent = 'Musisz zaakceptować regulamin.';
		authError.classList.remove('hidden');
		return;
	}

	if (!emailOk || !passwordOk || !matchOk) {
		authError.textContent = 'Popraw błędy w formularzu.';
		authError.classList.remove('hidden');
		return;
	}

	/* ⬇️ TU PODPINASZ FETCH DO API */
	console.log('FORM OK – wysyłamy rejestrację');
});
emailInput?.addEventListener('focus', () => {
	console.log('EMAIL FOCUS');
});
