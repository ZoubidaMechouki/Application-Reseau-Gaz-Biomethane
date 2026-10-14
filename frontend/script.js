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


