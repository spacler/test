function kupTeraz() {
  alert("Dziękujemy za zainteresowanie! Skontaktujemy się w celu finalizacji zamówienia.");
}

document.getElementById("kontakt").addEventListener("submit", function(e) {
  e.preventDefault();
  alert("Dziękujemy za wiadomość! Skontaktujemy się z Tobą wkrótce.");
  this.reset();
});
