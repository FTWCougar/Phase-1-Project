
const navList = document.getElementById('quote-type')
const div = document.getElementById("quote-body")
let limit = 10
let i = 0

const fetchQuotes = (tag) => {
    fetch(`https://api.quotable.io/quotes?tags=${tag}&limit=${limit}`)
    .then(resp => resp.json())
    .then(quoteData => {
        console.log(quoteData.results)
        renderQuotes(quoteData.results)
    })
}
const fetchThreeQuotes = (tag) => {
    limit = 3
    fetch(`https://api.quotable.io/quotes?tags=${tag}&limit=${limit}`)
    .then(resp => resp.json())
    .then(quoteData => {
        console.log(quoteData.results)
        renderQuotes(quoteData.results)
        limit = 10
    })
}

const fetchTags = () => {
    fetch('https://api.quotable.io/tags')
    .then(resp => resp.json())
    .then(tagArr => {
        console.log(tagArr)

        tagArr.forEach(tag => {
            if(tag.quoteCount !== 0){
                console.log(tag)
                createNav(tag)
            }
        }
    )})
    
}

const createNav = (tag) => {
    const span = document.createElement('span')
    const li = document.createElement('li')
    const btn = document.createElement('button')
    li.append(span)
    btn.textContent = tag.name.toUpperCase()
    btn.addEventListener('click', () => {
        i++
        btn.textContent = tag.name.toLowerCase()
        displayQuotes(btn)
        btn.textContent = tag.name.toUpperCase()
    })
    span.addEventListener('mouseover', () => {
        btn.textContent = tag.name.toLowerCase()
        previewQuotes(btn)
        btn.textContent = tag.name.toUpperCase()
    })
    span.addEventListener('mouseout', () => {
        if (i !== 1){
            div.textContent =''
        }else{
            i = 0
        }
    })
    console.log(li)
    span.append(btn)
    navList.append(span)

}

const displayQuotes = (btn) => {
    console.log(btn.textContent)
    const tag = btn.textContent
    fetchQuotes(tag)
}
const previewQuotes = (btn) => {
    console.log(btn.textContent)
    const tag = btn.textContent
    fetchThreeQuotes(tag)
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
    fetchTags()
}
init()