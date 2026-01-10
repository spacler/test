const form = document.getElementById('commentForm');
const list = document.getElementById('commentList');

const nameInput = form.querySelector('[name="name"]');
const textInput = form.querySelector('[name="text"]');

async function loadComments() {
	const res = await fetch('/api/comments');
	const data = await res.json();
	list.innerHTML = '';

	data.forEach((c) => {
		list.innerHTML += `
      <div class="comment">
        <strong>${c.name}</strong><br/>
        ${c.text}
      </div>
    `;
	});
}

form.addEventListener('submit', async (e) => {
	e.preventDefault();

	await fetch('/api/comments', {
		method: 'POST',
		headers: { 'Content-Type': 'application/json' },
		body: JSON.stringify({
			name: nameInput.value,
			text: textInput.value,
		}),
	});

	form.reset();
	loadComments();
});

loadComments();
