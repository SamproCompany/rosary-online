const NUM_BEADS = 59; // Cztery dziesiątki + pozostałe koraliki
const VISIBLE_BEADS = 9;
let currentBead = 0;

function renderRosary() {
    const zoomedView = document.getElementById('zoomedView');
    zoomedView.innerHTML = '';
    let start = Math.max(0, currentBead - Math.floor(VISIBLE_BEADS / 2));
    let end = Math.min(NUM_BEADS, start + VISIBLE_BEADS);

    // Umożliwia zoomowanie na końcówkach
    if (end - start < VISIBLE_BEADS) {
        start = Math.max(0, end - VISIBLE_BEADS);
    }

    for (let i = start; i < end; i++) {
        const bead = document.createElement('div');
        bead.className = 'bead' + (i === currentBead ? ' active' : '');
        zoomedView.appendChild(bead);
    }

    document.getElementById('beadPosition').textContent = `Pozycja: ${currentBead + 1} / ${NUM_BEADS}`;
}

document.getElementById('nextBead').onclick = () => {
    if (currentBead < NUM_BEADS - 1) {
        currentBead++;
        renderRosary();
    }
};
document.getElementById('prevBead').onclick = () => {
    if (currentBead > 0) {
        currentBead--;
        renderRosary();
    }
};

renderRosary();
