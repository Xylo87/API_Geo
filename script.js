// sélection de l'élément HTML avec la classe "cp"
const inputCP = document.querySelector(".cp")

// sélection de l'élément HTML avec la classe "ville"
const selectVille = document.querySelector(".ville")



// ajoute un écouteur d'évènement "input" (pendant la saisie) au champ de code postal
inputCP.addEventListener("input", async function() {
    
    // récupère la valeur entrée dans le champ de code postal
    let value = inputCP.value
    
    // vide le contenu actuel de la liste de sélection de ville
    selectVille.innerText = null
    
    // requête fetch vers l'API de géoloc avec le code postal saisi
    const response = await fetch(
        `https://geo.api.gouv.fr/communes?codePostal=${value}&fields=region,nom,code,codesPostaux,codeRegion&format=json`)

    // convertit la réponse en format JSON
    const data = await response.json()
    console.log(data)
    
    // parcours chaque objet "ville" dans les données récupérées
    data.forEach(ville => {
        
        // créé un nouvel élément d'option HTML
        let option = document.createElement("option")
        
        // définit le texte affiché de l'option comme le nom de la ville
        option.innerText = `${ville.nom}`
        
        // ajoute l'option à la liste de sélection de ville
        selectVille.append(option)
    });
})
