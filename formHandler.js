// Deaktiviere die Absendung des Formulars, solange es ungültig ausgefüllte Felder gibt
(() => {
    'use strict'
    // Greife auf das Formular 'formRegistrierung' zu
    const form = document.getElementById('formRegistrierung');
    // Füge dem Formular einen Event Listener hinzu
    form.addEventListener('submit', event => {
        // Verhindere das Absenden, solange die Validierung scheitert
        if (!form.checkValidity()) {
            event.preventDefault();
            event.stopPropagation();
        }
        // Füge bei gültigem Formular die Bootstrap-Klasse 'was-validated' hinzu
        form.classList.add('was-validated');
    }, false);
})()

// Speichere beim Laden der Seite die aktuelle Auswahl der Radio Buttons (Abholung vs. Abgabe) im SessionStorage
let selectedRadioValue = document.querySelector('input[name="auswahlAbholungAbgabe"]:checked').value;
window.onload = function() {
    sessionStorage.setItem('selectedRadioValue', selectedRadioValue);
}

// Blende die Datenfelder für die Abholung abhängig von der Auswahl Abholung vs. Übergabe ein bzw. aus
// Aktualisiere die Sessionvariable 'selectedRadioValue', wenn sich die Auswahl verändert
document.addEventListener('DOMContentLoaded', function () {
    // Deklariere benötigte Variablen
    const formAbholdaten = document.getElementById('abholdaten');
    const fieldsAbholdaten = formAbholdaten.querySelectorAll('input, select');
    const alertAbgabe = document.getElementById('formularAlertAbgabe');

    // Zeige die Felder zur Erfassung der Abholdaten standardmäßig an
    formAbholdaten.style.display = 'block';
    // Verstecke standardmäßig den Alert zur Registrierung bei Abgabe
    alertAbgabe.style.display = 'none';

    // Füge einen Event Listener zu den Radiobuttons hinzu
    let radioOptions = document.querySelectorAll('input[type=radio][name=auswahlAbholungAbgabe]');
    radioOptions.forEach(function (radio) {
        radio.addEventListener('change', function () {
            // Update die Variable und aktualisiere auch den Session Storage
            selectedRadioValue = radio.id;
            sessionStorage.setItem('selectedRadioValue', selectedRadioValue);
            if (selectedRadioValue === 'abgabe') {
                // Wenn "abgabe" ausgewählt ist, verstecke Formularfelder zu Abholdaten
                formAbholdaten.style.display = 'none';
                // Deaktiviere die Validierung für die versteckten Felder und lösche ggf. bereits eingegebene Daten   
                fieldsAbholdaten.forEach(field => {
                    field.removeAttribute('required')
                    field.value = '';
                });
                // Zeige den Alert zur Registrierung bei Abgabe
                alertAbgabe.style.display = 'block';
            } else {
                // Andernfalls zeige die Erfassung der Abholdaten an
                formAbholdaten.style.display = 'block';
                // Aktiviere die Validierung für die versteckten Felder
                fieldsAbholdaten.forEach(field => {
                    field.setAttribute('required', 'true')
                })
                // Verstecke den Alert zur Registrierung bei Abgabe
                alertAbgabe.style.display = 'none';
            }
        });
    });
});

// Passe die auswählbaren Abholdaten dynamisch an: frühestens am nächsten Tag, spätestens in 4 Wochen
document.addEventListener('DOMContentLoaded', function() {
    // Greife auf das Datepicker-Element zu
    let dateInput = document.getElementById('abholdatum');
    // Nimm das aktuelle Datum und berechne daraus das morgige Datum sowie das Datum in 4 Wochen
    let now = new Date();
    let tomorrow = new Date(now.getTime() + 24 * 60 * 60 * 1000); // 24 Stunden in Millisekunden
    var fourWeeksLater = new Date(now.getTime() + 28 * 24 * 60 * 60 * 1000); // 28 Tage in Millisekunden
    // Setze min auf das Datum von morgen
    dateInput.min = tomorrow.toISOString().slice(0, 10);
    // Setze max auf das Datum von in 4 Wochen
    dateInput.max = fourWeeksLater.toISOString().slice(0, 10);
});
