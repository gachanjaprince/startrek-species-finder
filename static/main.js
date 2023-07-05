document.querySelector('button').addEventListener('click', apiRequest)

async function apiRequest() {
    const alienName = document.querySelector('input').value.toLocaleLowerCase()
    console.log(alienName)
    try {
        let options = ['humans', 'vulcans', 'klingons']
        if (!options.includes(alienName)) {
            document.querySelector('#errorSearch').innerText = `Sorry we could'nt find results for '${alienName}'. You can try searching for Humans, Klingons or Vulcans instead.`
            document.querySelector('.noResult').style.visibility = "visible"
        }
        const response = await fetch(`https://species-api-startrek.herokuapp.com/api/${alienName}`)
        const data = await response.json()
        console.log(data)

        document.querySelector('#alienImage').src = data.images
        document.querySelector('#alienImage').style.visibility = "visible"

        document.querySelector('#alienName').innerText = data.speciesName
        document.querySelector('#alienWorld').innerText = data.homeWorld
        document.querySelector('#alienFeatures').innerText = data.features
        document.querySelector('#alienExamples').innerText = data.notableExample
        document.querySelector('#fact').innerText = data.interestingFact
    } catch(error) {
        console.log(error)
    }
}