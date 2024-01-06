
window.onload = function () {

    // Lies aus dem SessionStorage die Auswahl von Abgabe vs. Abholung aus
    let selectedRadioValue = sessionStorage.getItem('selectedRadioValue');
    // Greife auf die unterschiedlichen Seiteninhalte zu
    const divAbholung = document.getElementById('abholung');
    const divAbgabe = document.getElementById('abgabe');

    // Zeige den entsprechenden Seiteninhalt abhängig davon, 
    // ob Abgabe oder Abholung ausgewählt wurde
    if (selectedRadioValue === "abholung") {
        divAbholung.style.display = 'block';
        divAbgabe.style.display = 'none';
    }
    else if (selectedRadioValue === "abgabe") {
        divAbholung.style.display = 'none';
        divAbgabe.style.display = 'block';
    }

    // Lies die Formulareingaben über die GET-Methode aus der URL aus
    let params = new URLSearchParams(window.location.search);
    let vorname = params.get('vorname');
    let nachname = params.get('nachname');
    let strasse = params.get('strasse');
    let hausnummer = params.get('hausnummer');
    let plz = params.get('plz');
    let ort = params.get('ort');
    let abholdatum = params.get('abholdatum');
    let abholzeit = params.get('abholzeit');
    let kleidung = params.get('kleidung');
    let gebiet = params.get('gebiet');

    // Fülle die Tabelle auf der Bestätigungseite mit den richtigen Daten 
    // abhängig davon, welche Option ausgewählt wurde
    if (selectedRadioValue === "abholung") {
        // Formatiere das Datum in das übliche Format dd.MM.yyyy
        let abholdatumFormatted = formatDate(abholdatum);
        // Fülle die Tabelle mit den Formulareingaben
        document.getElementById('name1').innerText = vorname + " " + nachname;
        document.getElementById('adresse1').innerText = strasse + " " + hausnummer + ", " + plz + " " + ort;
        document.getElementById('zeit1').innerText = abholdatumFormatted + " um " + abholzeit + " Uhr";
        document.getElementById('kleidung1').innerText = kleidung;
        document.getElementById('gebiet1').innerText = gebiet;
    }
    else if (selectedRadioValue === "abgabe") {
        // Fülle die Tabelle mit den Formulareingaben
        document.getElementById('kleidung2').innerText = kleidung;
        document.getElementById('gebiet2').innerText = gebiet;
        // Nimm die aktuelle Uhrzeit zur Dokumentation des Registrierungszeitpunktes
        let now = new Date();
        // Wandle die Uhrzeit zur Ausgabe in einen lokalen String um
        let nowLocaleString = now.toLocaleString('de-DE');
        document.getElementById('zeit2').innerText = nowLocaleString;
    }

    // Funktion für die Formatierung des Abholdatums in dd.MM.yyyy
    function formatDate(abholdatum) {
        let year = abholdatum.slice(0, 4);
        let month = abholdatum.slice(5, 7);
        let day = abholdatum.slice(8, 10);
        return day + "." + month + "." + year;
    }

};
