const happinessBtn = document.getElementById('happiness')
const famousBtn = document.getElementById('famous')
const div = document.getElementById("quote-body")
const limit = 10

const fetchQuotes = (tag) => {
    fetch(`https://api.quotable.io/quotes?tags=${tag}&limit=${limit}`)
    .then(resp => resp.json())
    .then(quoteData => {
        console.log(quoteData.results)
        renderQuotes(quoteData.results)
    })
}

const eventListeners = () => {
    happinessBtn.addEventListener('click', () => {
        const tag = happinessBtn.textContent
        fetchQuotes(tag)
    })
    famousBtn.addEventListener('click', () => {
        const tag = famousBtn.textContent
        fetchQuotes(tag)
    })
}

const renderQuotes = (quoteArr) => {
    div.textContent = ''
    quoteArr.forEach(quote =>{
        const p = document.createElement('p');
        const h3 = document.createElement('h3')
        p.textContent = quote.content;
        h3.textContent = quote.author
        div.append(h3,p)
    })
}

const init = () => {
    eventListeners()
}
init()