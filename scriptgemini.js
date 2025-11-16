document.addEventListener('DOMContentLoaded', () => {

    // --- MODEL: Definicja sekwencji różańca ---
    // (Łącznie 60 kroków: 1 krzyżyk + 59 paciorków)
    
    let rosarySequence = [];
    
    // 1. Wstęp (Krzyżyk + 5 paciorków)
    rosarySequence.push({ type: 'cross', name: 'Znak Krzyża / Wierzę w Boga' }); // 0
    rosarySequence.push({ type: 'large', name: 'Ojcze Nasz' });                 // 1
    rosarySequence.push({ type: 'small', name: 'Zdrowaś Maryjo (Wiara)' });    // 2
    rosarySequence.push({ type: 'small', name: 'Zdrowaś Maryjo (Nadzieja)' }); // 3
    rosarySequence.push({ type: 'small', name: 'Zdrowaś Maryjo (Miłość)' });   // 4

    // 2. Pięć dziesiątek (5 x (1 duży + 10 małych))
    for (let decade = 1; decade <= 5; decade++) {
        
        // Paciorek "Ojcze Nasz" i zapowiedź tajemnicy
        rosarySequence.push({ 
            type: 'large', 
            name: `Tajemnica ${decade} / Ojcze Nasz` 
        }); // np. 5, 16, 27, 38, 49
        
        // 10 paciorków "Zdrowaś Maryjo"
        for (let hailMary = 1; hailMary <= 10; hailMary++) {
            rosarySequence.push({ 
                type: 'small', 
                name: `Zdrowaś Maryjo (${hailMary}/10)` 
            });
        }
    }
    // Usuwamy ostatni "large" paciorek, bo pętla dodaje go po 10 "small"
    // A po 5. dziesiątce nie ma kolejnego "Ojcze Nasz"
    // Czekaj, moja logika pętli jest inna.
    // 5 (OF) + 10 (HM) -> 15
    // 16 (OF) + 10 (HM) -> 26
    // 27 (OF) + 10 (HM) -> 37
    // 38 (OF) + 10 (HM) -> 48
    // 49 (OF) + 10 (HM) -> 59
    // Wstęp (5) + Dziesiątki (5 * 11 = 55) = 60 kroków. Idealnie.


    // --- ZMIENNE: Stan aplikacji ---
    let currentStep = 0;
    const totalSteps = rosarySequence.length;

    // --- ELEMENTY DOM (Widok) ---
    const beadDisplay = document.getElementById('bead-display');
    const prayerName = document.getElementById('prayer-name');
    const stepCounter = document.getElementById('step-counter');
    const prevBtn = document.getElementById('prev-btn');
    const nextBtn = document.getElementById('next-btn');
    const indicatorContainer = document.getElementById('rosary-indicator');

    
    // --- INICJALIZACJA ---

    // 1. Funkcja budująca wskaźnik (minimapę) po prawej
    function buildIndicator() {
        indicatorContainer.innerHTML = ''; // Wyczyść stary wskaźnik
        rosarySequence.forEach((bead, index) => {
            const indicatorBead = document.createElement('div');
            indicatorBead.className = `indicator-bead ${bead.type}`;
            indicatorBead.id = `indicator-bead-${index}`; // Unikalne ID dla każdego
            indicatorContainer.appendChild(indicatorBead);
        });
    }

    // 2. Funkcja aktualizująca cały widok
    function updateView() {
        const currentBead = rosarySequence[currentStep];

        // 1. Aktualizuj "zoomowany" paciorek
        beadDisplay.className = `bead-display ${currentBead.type}`;
        prayerName.textContent = currentBead.name;
        stepCounter.textContent = `Krok ${currentStep + 1} / ${totalSteps}`;

        // 2. Aktualizuj przyciski
        prevBtn.disabled = (currentStep === 0);
        nextBtn.disabled = (currentStep === totalSteps - 1);

        // 3. Aktualizuj wskaźnik po prawej
        
        // Najpierw usuń klasę 'active' z poprzedniego
        const oldActive = document.querySelector('.indicator-bead.active');
        if (oldActive) {
            oldActive.classList.remove('active');
        }
        
        // Dodaj klasę 'active' do bieżącego
        const newActive = document.getElementById(`indicator-bead-${currentStep}`);
        if (newActive) {
            newActive.classList.add('active');
            
            // Automatyczne przewijanie wskaźnika, aby aktywny był widoczny
            newActive.scrollIntoView({
                behavior: 'smooth',
                block: 'center' // 'center', 'start', 'end'
            });
        }
    }

    // --- KONTROLERY: Obsługa zdarzeń ---

    nextBtn.addEventListener('click', () => {
        if (currentStep < totalSteps - 1) {
            currentStep++;
            updateView();
        }
    });

    prevBtn.addEventListener('click', () => {
        if (currentStep > 0) {
            currentStep--;
            updateView();
        }
    });

    // --- START APLIKACJI ---
    buildIndicator(); // Zbuduj wskaźnik
    updateView();     // Ustaw widok na pierwszy krok

});