window.addEventListener('load', () => {
	if (window.location.hash) {
		window.scrollTo(0, 0);
		history.replaceState(null, null, ' ');
	}
});
