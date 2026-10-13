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

console.log(categorie(120));