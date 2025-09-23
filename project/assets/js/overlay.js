const settingsButton = document.getElementById('settingsButton');
const settingsOverlay = document.getElementById('settingsOverlay');
const closeOverlay = document.getElementById('closeOverlay');
const startZoom = document.getElementById('startZoom');
const zoomValue = document.getElementById('zoomValue');

settingsButton.addEventListener('click', (e) => {
    e.preventDefault();
    settingsOverlay.classList.add('active');
});

closeOverlay.addEventListener('click', (e) => {
    e.preventDefault();
    settingsOverlay.classList.remove('active');
});

startZoom.addEventListener('input', () => {
    zoomValue.textContent = startZoom.value;
});