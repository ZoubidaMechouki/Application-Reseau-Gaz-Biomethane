/* 1. Créer la carte, centrée sur la France */
const map = L.map("map").setView([46.603354, 2.588334], 6);

/* 2. Ajouter le fond de carte OpenStreetMap */
L.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png", {
  attribution: "&copy; OpenStreetMap contributors",
  maxZoom: 19
}).addTo(map);

/* 3. Formater la capacité pour les popups */
function formaterCapacite(valeur) {
  if (typeof valeur !== "number") {
    return "capacité non renseignée";
  }
  return valeur.toFixed(1) + " GWh/an";
}

/* 4. Charger les sites et créer les marqueurs */
async function chargerSites() {
  /* Charger les deux fichiers */
  const reponseSites = await fetch("data/sites-injection-biomethane.geojson");
  const donneesSites = await reponseSites.json();

  const reponseCommunes = await fetch("data/communes-centres.json");
  const communes = await reponseCommunes.json();

  /* Dictionnaire : code INSEE -> [latitude, longitude] */
  const centres = {};
  for (const commune of communes) {
    if (commune.centre) {
      const longitude = commune.centre.coordinates[0];
      const latitude = commune.centre.coordinates[1];
      centres[commune.code] = [latitude, longitude];
    }
  }

  /* Corrections : sites dont le code commune est absent du fichier */
  const corrections = {
    "STEP DE SORMIOU - MARSEILLE -13": "13055"
  };

  /* Groupe de marqueurs */
  const groupe = L.markerClusterGroup();
  const sitesNonPlaces = [];

  for (const site of donneesSites.features) {
    const proprietes = site.properties;
    const code = proprietes.code_commune || corrections[proprietes.nom_du_projet];
    const position = centres[code];

    if (position) {
      const marqueur = L.marker(position).bindPopup(
        `<b>${proprietes.nom_du_projet}</b><br>` +
        `${proprietes.commune} (${proprietes.departement})<br>` +
        `${formaterCapacite(proprietes.capacite_de_production_gwh_an)}`
      );
      groupe.addLayer(marqueur);
    } else {
      sitesNonPlaces.push(proprietes);
    }
  }

  map.addLayer(groupe);

  console.log("Marqueurs créés :", donneesSites.features.length - sitesNonPlaces.length);
  console.log("Sites non placés :", sitesNonPlaces);
}

chargerSites();