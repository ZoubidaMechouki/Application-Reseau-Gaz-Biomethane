/*Créer la carte, centrée de la France*/

const map = L.map('map').setView([46.603354, 2.588334], 6);

/*Ajouter le fond de carte OpenStreetMap*/

L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; OpenStreetMap contributors',
    maxZoom: 19
}).addTo(map);

function formaterCapacite(valeur) {
    if (typeof valeur !== "number") {
        return "capacité non renseignée";
    }
    return valeur.toFixed(1) + " GWh/an";
}
async function chargerSites() {
    /* 1. Charger les deux fichiers */
    const reponseSites = await fetch("data/sites-injection-biomethane.geojson");
    const donneesSites = await reponseSites.json();

    const reponseCommunes = await fetch("data/communes-centres.json");
    const communes = await reponseCommunes.json();

    console.log("Sites :", donneesSites.features.length);
    console.log("Communes :", communes.length);

    /* 2. Dictionnaire : code INSEE -> [latitude, longitude] */
    const centres = {};
    for (const commune of communes) {
        if (commune.centre) {
            const longitude = commune.centre.coordinates[0];
            const latitude = commune.centre.coordinates[1];
            centres[commune.code] = [latitude, longitude];
        }
    }
    console.log("Sequedin :", centres["59566"]);

    /* 3. Créer un marqueur par site */
    const sitesNonPlaces = [];
    /* Corrections : sites dont le code commune est absent du fichier */
    const corrections = {
        "STEP DE SORMIOU - MARSEILLE -13": "13055"
    };
    for (const site of donneesSites.features) {
        const proprietes = site.properties;
        const code = proprietes.code_commune || corrections[proprietes.nom_du_projet];
        const position = centres[code];

        if (position) {
            L.marker(position)
                .addTo(map)
                .bindPopup(
                    `<b>${proprietes.nom_du_projet}</b><br>` +
                    `${proprietes.commune} (${proprietes.departement})<br>` +
                    `${formaterCapacite(proprietes.capacite_de_production_gwh_an)}`
                );
        } else {
            sitesNonPlaces.push(proprietes);
        }
    }

    console.log("Marqueurs créés :", donneesSites.features.length - sitesNonPlaces.length);
    console.log("Sites non placés :", sitesNonPlaces);
}
chargerSites();