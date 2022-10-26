
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

const fetchAuthorQuotes = (author) => {
    fetch(`https://api.quotable.io/quotes?author=${author}`)
    .then(resp => resp.json())
    .then(quoteData =>{
        renderQuotes(quoteData.results)
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
        const h2 = document.createElement('h2')
        p.textContent = quote.content;
        h2.textContent = quote.author
        const likeBtn = document.createElement('button');
        likeBtn.id = "likeBtn"
        likeBtn.textContent = 'Like'
        const numberOfLikes = document.createElement('h4');
        numberOfLikes.id = "numLikes"
        let num = quote.length;
        console.log(quote.length);
        likeBtn.addEventListener('click',()=>{
            num++
            numberOfLikes.textContent = '  ' +num + `❤️`
        })
        numberOfLikes.textContent = '  '+num +  `❤️`
        div.append(h2,p,numberOfLikes,likeBtn);

    })
}

const imageQuote = () => {
    const img1 = document.getElementById('img1')
    const img2 = document.getElementById('img2')
    const img3 = document.getElementById('img3')
    const img4 = document.getElementById('img4')
    const img5 = document.getElementById('img5')
    let author = ""
    img1.addEventListener('click', () => {
        author = "Alan-Watts"
        fetchAuthorQuotes(author)
    })
    img2.addEventListener('click', () => {
        author = "Margaret-Mead"
        fetchAuthorQuotes(author)
    })
    img3.addEventListener('click', () => {
        author = "Michael-Jordan"
        fetchAuthorQuotes(author)
    })
    img4.addEventListener('click', () => {
        author = "Winston-Churchill"
        fetchAuthorQuotes(author)
    })
    img5.addEventListener('click', () => {
        author = "Albert-Einstein"
        fetchAuthorQuotes(author)
    })
}



const init = () => {
    fetchTags()
    imageQuote()
}
init()