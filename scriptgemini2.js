// Czekaj aż cała strona (HTML) się załaduje
document.addEventListener('DOMContentLoaded', () => {

    // Definicja ścieżki modlitwy (kolejność paciorków)
    const rosaryPath = [];
    const prayers = [];

    // Funkcja pomocnicza do dodawania paciorków
    const addBead = (type, label) => {
        rosaryPath.push({ type, label });
    };

    // 1. Początek (Ogonek)
    addBead('crucifix', 'Znak Krzyża / Wierzę w Boga');
    addBead('large-bead', 'Ojcze Nasz');
    addBead('small-bead', 'Zdrowaś Mario (o Wiarę)');
    addBead('small-bead', 'Zdrowaś Mario (o Nadzieję)');
    addBead('small-bead', 'Zdrowaś Mario (o Miłość)');
    addBead('large-bead', 'Chwała Ojcu / Tajemnica 1');

    // 2. Pięć dziesiątek (pętla)
    for (let i = 1; i <= 5; i++) {
        // 10x Zdrowaś Mario
        for (let j = 1; j <= 10; j++) {
            addBead('small-bead', `Zdrowaś Mario (${j}/10)`);
        }
        
        // Po każdej dziesiątce (oprócz ostatniej) jest "Ojcze Nasz" i zapowiedź tajemnicy
        if (i < 5) {
            addBead('large-bead', `Chwała Ojcu / Tajemnica ${i + 1}`);
        }
    }

    // 3. Zakończenie
    addBead('centerpiece', 'Zakończenie (np. Witaj Królowo)');

    // === Koniec definicji ścieżki ===
    // Mamy 1+1+3+1 + 5*(10) + 4 + 1 = 61 elementów

    // Pobieranie elementów z HTML
    const track = document.getElementById('rosary-track');
    const prevBtn = document.getElementById('prev-btn');
    const nextBtn = document.getElementById('next-btn');
    const progressText = document.getElementById('progress-text');
    const prayerText = document.getElementById('current-prayer-text');
    const viewport = document.querySelector('.viewport');

    let currentBeadIndex = 0;
    const beadElements = []; // Tablica na wygenerowane DIVy

    // Dynamiczne tworzenie DIVów (paciorków)
    rosaryPath.forEach((beadData, index) => {
        const beadDiv = document.createElement('div');
        beadDiv.className = `bead ${beadData.type}`; // np. "bead small-bead"
        beadDiv.dataset.index = index; // Zapisujemy index, aby wiedzieć który to
        
        // Dodajemy etykietę (np. 'Z' dla Zdrowaś)
        let label = '';
        if (beadData.type === 'small-bead') label = 'Z';
        if (beadData.type === 'large-bead') label = 'O';
        if (beadData.type === 'crucifix') label = '†';
        if (beadData.type === 'centerpiece') label = 'M';
        beadDiv.innerText = label;

        track.appendChild(beadDiv); // Dodaj DIV do "taśmy"
        beadElements.push(beadDiv); // Zapisz DIV w tablicy
    });

    // Funkcja aktualizująca pozycję "taśmy"
    function updatePosition() {
        const currentElement = beadElements[currentBeadIndex];
        
        // Obliczamy środek "okienka"
        const viewportCenter = viewport.offsetWidth / 2;
        
        // Obliczamy pozycję środka aktywnego paciorka względem całej taśmy
        const beadCenter = currentElement.offsetLeft + currentElement.offsetWidth / 2;
        
        // Obliczamy o ile przesunąć taśmę, aby środek paciorka znalazł się w środku okienka
        const newTransformValue = viewportCenter - beadCenter;
        
        track.style.transform = `translateX(${newTransformValue}px)`;

        // Aktualizacja klasy "active"
        beadElements.forEach(bead => bead.classList.remove('active'));
        currentElement.classList.add('active');

        // Aktualizacja tekstów
        progressText.innerText = `Krok ${currentBeadIndex + 1} / ${rosaryPath.length}`;
        prayerText.innerText = rosaryPath[currentBeadIndex].label;
        
        // Obsługa przycisków "Wstecz" / "Dalej" (włączanie/wyłączanie)
        prevBtn.disabled = (currentBeadIndex === 0);
        nextBtn.disabled = (currentBeadIndex === rosaryPath.length - 1);
    }

    // Obsługa przycisków
    nextBtn.addEventListener('click', () => {
        if (currentBeadIndex < rosaryPath.length - 1) {
            currentBeadIndex++;
            updatePosition();
        }
    });

    prevBtn.addEventListener('click', () => {
        if (currentBeadIndex > 0) {
            currentBeadIndex--;
            updatePosition();
        }
    });

    // Ustawienie początkowej pozycji (na pierwszym paciorku)
    updatePosition();
});