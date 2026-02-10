/* =====================================================
   ELEMENTY GLOBALNE
===================================================== */
const userMenuBtn = document.getElementById('userMenuBtn');
const userMenu = document.getElementById('userMenu');
const hamburgerBtn = document.getElementById('hamburgerBtn');
const mobileMenu = document.getElementById('mobileMenu');

const userEmailEl = document.getElementById('userEmail');
const userEmailMobile = document.getElementById('userEmailMobile');

/* =====================================================
   MENU / UI
===================================================== */
function closeAllMenus() {
	userMenu?.classList.add('hidden');
	mobileMenu?.classList.add('hidden');
}

userMenuBtn?.addEventListener('click', (e) => {
	e.stopPropagation();
	userMenu?.classList.toggle('hidden');
});

hamburgerBtn?.addEventListener('click', (e) => {
	e.stopPropagation();
	mobileMenu?.classList.toggle('hidden');
});

userMenu?.addEventListener('click', (e) => e.stopPropagation());

mobileMenu?.addEventListener('click', (e) => {
	const link = e.target.closest('a');
	if (link) {
		mobileMenu.classList.add('hidden');
	}
});
document.addEventListener('click', closeAllMenus);
/* =====================================================
   ZAMYKANIE HAMBURGERA PO KLIKNIĘCIU W LINK 
===================================================== */

mobileMenu?.querySelectorAll('a').forEach((link) => {
	link.addEventListener('click', () => {
		mobileMenu.classList.add('hidden');
	});
});

/* =====================================================
   KOMENTARZE
===================================================== */
const form = document.getElementById('commentForm');
const list = document.getElementById('commentList');
let currentRating = 5;
const stars = document.querySelectorAll('#starRating .star');

function updateStars(value) {
	stars.forEach((star) => {
		star.classList.toggle('active', Number(star.dataset.value) <= value);
	});
}

stars.forEach((star) => {
	star.addEventListener('click', (e) => {
		e.stopPropagation();
		currentRating = Number(star.dataset.value);
		updateStars(currentRating);
	});
});

if (stars.length) updateStars(currentRating);

function renderStars(rating = 5) {
	return '★'.repeat(rating) + '☆'.repeat(5 - rating);
}

function formatDate(date) {
	return new Date(date).toLocaleString('pl-PL');
}

async function loadComments() {
	if (!list) return;

	const res = await fetch('/api/comments', { credentials: 'include' });
	const data = await res.json();

	list.innerHTML = '';
	data.forEach((c) => {
		list.innerHTML += `
			<div class="comment">
				<div style="color:#facc15;font-size:18px;">${renderStars(c.rating)}</div>
				<strong>${c.name}</strong>
				<div style="font-size:12px;color:#94a3b8;">
					Dodano: ${formatDate(c.date)}
				</div>
				${c.text}
			</div>
		`;
	});
}

/* =====================================================
   SESJA / AUTH
===================================================== */
async function checkAuth() {
	try {
		const res = await fetch('/api/me', { credentials: 'include' });

		if (res.ok) {
			const user = await res.json();
			document.querySelectorAll('.auth-only').forEach((el) => el.classList.remove('hidden'));
			document.querySelectorAll('.guest-only').forEach((el) => el.classList.add('hidden'));

			if (userEmailEl) userEmailEl.textContent = user.email;
			if (userEmailMobile) userEmailMobile.textContent = user.email;
		} else {
			document.querySelectorAll('.auth-only').forEach((el) => el.classList.add('hidden'));
			document.querySelectorAll('.guest-only').forEach((el) => el.classList.remove('hidden'));
		}
	} catch {
		console.log('Auth check skipped');
	}

	loadComments();
}

/* =====================================================
   FUNKCJA WYKRYWAJĄCA MAPE
===================================================== */

function isMobile() {
  return window.matchMedia('(max-width: 768px)').matches;
}

/* =====================================================
   MAPA
===================================================== */
const mapElement = document.getElementById('map');

if (mapElement && typeof L !== 'undefined') {

	const map = L.map('map', {
		scrollWheelZoom: false,
		dragging: !isMobile(), // desktop: TAK, mobile: NIE
		tap: false,
	}).setView([51.761, 18.091], 12);

	L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png').addTo(map);
	L.marker([51.761, 18.091]).addTo(map);

	if (isMobile()) {
		// tap = aktywuj mapę
		mapElement.addEventListener('click', () => {
			map.dragging.enable();
			mapElement.classList.add('active');
		});

		// wyjazd palca = dezaktywuj (żeby scroll wrócił)
		mapElement.addEventListener('touchend', () => {
			setTimeout(() => {
				map.dragging.disable();
				mapElement.classList.remove('active');
			}, 300);
		});
	}
}

/* =====================================================
   START
===================================================== */
document.addEventListener('DOMContentLoaded', checkAuth);
