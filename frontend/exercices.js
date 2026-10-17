// Une variable
let nomSite = "Site de test";

// Un nombre
let capacite = 120;

// Un affichage dans la console
console.log("Le site", nomSite, "a une capacité de", capacite, "GWh/an");

function categorie(capacite) {
  if (capacite < 100) {
    return "Petit site";
  }
  return "Grand site";
}

console.log(categorie(capacite));

// Un objet : un site d'injection

let site1 ={
  nom: "Site A",
  region: "Bretagne",
  capacite: 120
};

console.log(site1. nom)
console.log(site1. capacite)

// Un tableau d'objets : plusieurs sites
let sites = [
  { nom: "Site A", region: "Bretagne", capacite: 120 },
  { nom: "Site B", region: "Hauts-de-France", capacite: 80 },
  { nom: "Site C", region: "Grand Est", capacite: 150 },
  { nom: "Site D", region: "Ile-de-France", capacite: 110 }
];

console.log(sites.length);
console.log(sites[0].nom);

console.log(sites[1].nom);
console.log(sites[2].region);
console.log(sites[3].nom);
console.log(sites[3].capacite);
console.log(categorie(sites[1].capacite));

// Parcourir tous les sites
for (let site of sites) {
  console.log(site.nom,":", site.region);
}

let total = 0;

for (let site of sites) {
  total = total + site.capacite;
}

console.log("Capacité totale :", total);

let nbGrandsSites = 0;

for (let site of sites) {
  if ( site.capacite >= 100 ) {
    nbGrandsSites = nbGrandsSites + 1;
  }
}

console.log("Nombre de grands sites :", nbGrandsSites);

let moyenne = total / sites.length;
console.log("Capacité moyenne :", moyenne);

let grandsSites = sites.filter(site => site.capacite >= 100);

console.log(grandsSites);
console.log(grandsSites.length);

function estGrandSite(site) {
  return site.capacite >= 100;
}

let petitsSites = sites.filter(site => site.capacite < 100);

console.log(petitsSites);
console.log(petitsSites.length);

let sitesBretagne = sites.filter(site => site.region === "Bretagne");

console.log(sitesBretagne);
console.log(sitesBretagne.length);

let grandsSitesBretagne = sites.filter(site => site.region === "Bretagne" && site.capacite >= 100);

console.log(grandsSitesBretagne);
console.log(grandsSitesBretagne.length);

let noms = sites.map(site => site.nom);

console.log(noms);

let capacites = sites.map(site => site.capacite);

console.log(capacites);

let mongrandSite = sites.find(site => site.capacite >= 100);

console.log(mongrandSite);

 let grandsSite = sites.filter(site => site.capacite >= 100);

console.log(grandsSite);

let nomsGrandsSites = grandsSites.map(site => site.nom);

console.log(nomsGrandsSites);

let nomsGrandsSite = sites.filter(site => site.capacite >= 100).map(site => site.nom);


console.log(nomsGrandsSite);

let capaciteTotale = sites.reduce((total, site) => total + site.capacite, 0);

console.log(capaciteTotale);

let totalGrandsSites = sites.filter(site => site.capacite >= 100).reduce((total, site) => total + site.capacite, 0);

console.log(totalGrandsSites);

let moyenneSites = capaciteTotale / sites.length;
console.log("Capacité moyenne :", moyenneSites);

let moyennesSites = sites.reduce((total, site) => total + site.capacite, 0) / sites.length;

console.log("Capacité moyenne :", moyenneSites);

