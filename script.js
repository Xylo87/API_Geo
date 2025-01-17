// sélection de l'élément HTML avec la classe "cp"
const inputCP = document.querySelector(".cp")

// sélection de l'élément HTML avec la classe "ville"
const selectVille = document.querySelector(".ville")



// intégration de la carte dans le DOM (avec coordonnées et zoom initiaux)
let map = L.map("map").setView([48.866667, 2.333333], 8)

// ajout de la couche visuelle (+ zoom maximum & mentions légales)
L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
}).addTo(map);

// ajout d'un marqueur aux coordonnées désignées
let marker = L.marker([48.866667, 2.333333]).addTo(map);



// ajoute un écouteur d'évènement "input" (pendant la saisie) au champ de code postal
inputCP.addEventListener("input", async function() {
    
    // récupère la valeur entrée dans le champ de code postal
    let value = inputCP.value
    
    // vide le contenu actuel de la liste de sélection de ville
    selectVille.innerText = null

    // retrait du marqueur à chaque entrée
    marker.remove()
    
    // requête fetch vers l'API de géoloc avec le code postal saisi
    const response = await fetch(
        `https://geo.api.gouv.fr/communes?codePostal=${value}&fields=region,nom,code,codesPostaux,codeRegion,centre,population&boost=population&format=json`)

    // convertit la réponse en format JSON
    const data = await response.json()
    // console.log(data)

    // sauvegarde des coordonnées relatives au code postal
    let coorY = data[0].centre.coordinates[0]
    let coorX = data[0].centre.coordinates[1]

    // nouvelle "vue" de la carte en fonction des coordonnées
    map.setView([coorX, coorY], 8)

    // création et placement d'un nouveau marqueur pour correspondre aux coordonnées
    marker = L.marker([coorX, coorY]).addTo(map);

    // parcours chaque objet "ville" dans les données récupérées
    data.forEach(ville => {

        // créé un nouvel élément d'option HTML
        let option = document.createElement("option")

        // définit la valeur de l'option comme le code de la ville
        option.value = `${ville.code}`
        
        // définit le texte affiché de l'option comme le nom de la ville
        option.innerText = `${ville.nom}`
        
        // ajoute l'option à la liste de sélection de ville
        selectVille.append(option)
    });
    


selectVille.addEventListener("change", function () {
    const maVille = data.find((element) => element.code === selectVille.value)
    console.log(maVille)

    marker.remove()

    let coorY = maVille.centre.coordinates[0]
    let coorX = maVille.centre.coordinates[1]

    map.setView([coorX, coorY], 8)

    marker = L.marker([coorX, coorY]).addTo(map);
    })
})