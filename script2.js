/* ================== KOMENTARZE ================== */
const form = document.getElementById('commentForm');
const list = document.getElementById('commentList');
const textInput = form?.querySelector('[name="text"]');

let currentRating = 5;
const stars = document.querySelectorAll('#starRating .star');

function updateStars(value) {
	stars.forEach(star => {
		star.classList.toggle('active', Number(star.dataset.value) <= value);
	});
}

stars.forEach(star => {
	star.addEventListener('click', e => {
		e.stopPropagation();
		currentRating = Number(star.dataset.value);
		updateStars(currentRating);
	});
});

updateStars(currentRating);

function renderStars(rating = 5) {
	return '★'.repeat(rating) + '☆'.repeat(5 - rating);
}

function formatDate(date) {
	return new Date(date).toLocaleString('pl-PL');
}

async function loadComments() {
	const res = await fetch('/api/comments', { credentials: 'include' });
	const data = await res.json();

	list.innerHTML = '';
	data.forEach(c => {
		list.innerHTML += `
			<div class="comment">
				<div style="color:#facc15;font-size:18px;">${renderStars(c.rating)}</div>
				<strong>${c.name}</strong>
				<div style="font-size:12px;color:#94a3b8;">Dodano: ${formatDate(c.date)}</div>
				${c.text}
			</div>
		`;
	});
}

/* ================== AUTH / MODAL ================== */
const modal = document.getElementById('authModal');
const modalBox = modal?.querySelector('.modal-box');

function openModal(type) {
	mode = type;
	modal.classList.add('active');
	document.body.style.overflow = 'hidden';
}

function closeModal() {
	modal.classList.remove('active');
	document.body.style.overflow = '';
}

/* 🔥 IZOLACJA MODALA */
modal?.addEventListener('click', e => {
	e.stopPropagation();
	if (e.target === modal) closeModal();
});

modalBox?.addEventListener('click', e => e.stopPropagation());

/* ================== USER MENU + HAMBURGER ================== */
const userMenu = document.getElementById('userMenu');
const mobileMenu = document.getElementById('mobileMenu');

document.addEventListener('click', () => {
	userMenu?.classList.add('hidden');
	mobileMenu?.classList.add('hidden');
});

/* ================== FORM AUTH ================== */
let mode = 'login';

document.getElementById('authForm')?.addEventListener('submit', async e => {
	e.preventDefault();

	const email = document.getElementById('email').value.trim();
	const password = document.getElementById('password').value;

	const res = await fetch(`/api/${mode}`, {
		method: 'POST',
		credentials: 'include',
		headers: { 'Content-Type': 'application/json' },
		body: JSON.stringify({ email, password }),
	});

	if (res.ok) {
		closeModal();
		checkAuth();
	}
});

/* ================== SESJA ================== */
async function checkAuth() {
	const res = await fetch('/api/me', { credentials: 'include' });
	if (res.ok) loadComments();
}

/* ================== REGULAMIN ================== */
const termsModal = document.getElementById('termsModal');

termsModal?.addEventListener('click', e => {
	if (e.target === termsModal) {
		termsModal.classList.remove('active');
	}
});

/* ================== INIT ================== */
document.addEventListener('DOMContentLoaded', () => {
	checkAuth();
});
