const list = document.getElementById('list');
const passwordInput = document.getElementById('password');

function headers() {
	return {
		'x-admin-password': passwordInput.value,
	};
}

async function loadComments() {
	const res = await fetch('/api/admin/comments', {
		headers: headers(),
	});

	if (!res.ok) {
		alert('Złe hasło');
		return;
	}

	const data = await res.json();
	list.innerHTML = '';

	data.forEach((c, index) => {
		list.innerHTML += `
      <div class="comment">
        <strong>${c.name}</strong> (${c.rating}⭐)<br/>
        <small>${new Date(c.date).toLocaleString('pl-PL')}</small><br/><br/>
        ${c.text}<br/><br/>
        <button onclick="deleteOne(${index})">Usuń</button>
      </div>
    `;
	});
}

async function deleteOne(index) {
	await fetch(`/api/comments/${index}`, {
		method: 'DELETE',
		headers: headers(),
	});
	loadComments();
}

async function clearAll() {
	if (!confirm('Usunąć WSZYSTKIE komentarze?')) return;

	await fetch('/api/admin/comments', {
		method: 'DELETE',
		headers: headers(),
	});

	loadComments();
}
