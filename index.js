//Global Variables

const navList = document.getElementById('quote-type');
const div = document.getElementById("quote-body");
let limit = 10;
let interval = 0;

//Fetches to the Database

const fetchQuotes = (tag) => {
    fetch(`https://api.quotable.io/quotes?tags=${tag}&limit=${limit}`)
    .then(resp => resp.json())
    .then(quoteData => {
        console.log(quoteData.results);
        buildStage(quoteData.results);
    });
}

const fetchThreeQuotes = (tag) => {
    limit = 3
    fetch(`https://api.quotable.io/quotes?tags=${tag}&limit=${limit}`)
    .then(resp => resp.json())
    .then(quoteData => {
        console.log(quoteData.results);
        buildStage(quoteData.results);
        limit = 10
    });
}

const fetchAuthorQuotes = (author) => {
    fetch(`https://api.quotable.io/quotes?author=${author}`)
    .then(resp => resp.json())
    .then(quoteData =>{
        buildStage(quoteData.results);
    });
}

const fetchTags = () => {
    fetch('https://api.quotable.io/tags')
    .then(resp => resp.json())
    .then(tagArr => {
        console.log(tagArr)
        tagArr.forEach(tag => {
            if(tag.quoteCount !== 0){
                console.log(tag);
                createNav(tag);
            };
        }
    )});
}

//Creates elements for the page

const createNav = (tag) => {
    const span = document.createElement('span');
    const li = document.createElement('li');
    const btn = document.createElement('button');
    li.append(span);
    btn.textContent = tag.name.toUpperCase();
    createBtnEvents(tag, btn, span);
    console.log(li);
    span.append(btn);
    navList.append(span);

}

//Creates events for the page

const createBtnEvents = (tag, btn, span) => {
    btn.addEventListener('click', () => {
        interval++;
        btn.textContent = tag.name.toLowerCase();
        displayQuotes(btn);
        btn.textContent = tag.name.toUpperCase();
    })
    span.addEventListener('mouseover', () => {
        btn.textContent = tag.name.toLowerCase();
        previewQuotes(btn);
        btn.textContent = tag.name.toUpperCase();
    })
    span.addEventListener('mouseout', () => {
        if (interval !== 1){
            div.textContent ='';
        }else{
            interval = 0;
        }
    })
}

//Creates elements for the page

const buildStage = (quoteArr) => {
    div.textContent = '';
    quoteArr.forEach(quote =>{
        const p = document.createElement('p');
        const h2 = document.createElement('h2');
        const likeBtn = document.createElement('button');
        const numberOfLikes = document.createElement('h4');
        let num = quote.length;
        renderQuotes(quote, p, h2, likeBtn, numberOfLikes, num);
    })
}

//Creates elements for the page

const imageQuote = () => {
    const img1 = document.getElementById('img1');
    const img2 = document.getElementById('img2');
    const img3 = document.getElementById('img3');
    const img4 = document.getElementById('img4');
    const img5 = document.getElementById('img5');
    let author = "";
    picClicked(author, img1, img2, img3, img4, img5);
}

//Set content of elements and appends them to the page

const renderQuotes = (quote, p, h2, likeBtn, numberOfLikes, num) => {
    console.log(quote);
    p.textContent = quote.content;
    h2.textContent = quote.author;
    likeBtn.id = "likeBtn";
    likeBtn.textContent = 'Like';
    numberOfLikes.id = "numLikes";
    console.log(quote.length);
    likeBtn.addEventListener('click',()=>{
        num++;
        numberOfLikes.textContent = '  ' +num + `❤️`;
    })
    numberOfLikes.textContent = '  '+num +  `❤️`;
    div.append(h2,p,numberOfLikes,likeBtn);
}

//Displays 10 quotes

const displayQuotes = (btn) => {
    console.log(btn.textContent);
    const tag = btn.textContent;
    fetchQuotes(tag);
}

//Shows a preview of quotes 

const previewQuotes = (btn) => {
    console.log(btn.textContent);
    const tag = btn.textContent;
    fetchThreeQuotes(tag);
}

//Determines when a picture is clicked

const picClicked = (author, img1, img2, img3, img4, img5) => {
    img1.addEventListener('click', () => {
        author = "Alan-Watts";
        fetchAuthorQuotes(author);
    })
    img2.addEventListener('click', () => {
        author = "Margaret-Mead";
        fetchAuthorQuotes(author);
    })
    img3.addEventListener('click', () => {
        author = "Michael-Jordan";
        fetchAuthorQuotes(author);
    })
    img4.addEventListener('click', () => {
        author = "Winston-Churchill";
        fetchAuthorQuotes(author);
    })
    img5.addEventListener('click', () => {
        author = "Albert-Einstein";
        fetchAuthorQuotes(author);
    })
}

//Starts the necessary functions

const init = () => {
    fetchTags();
    imageQuote();
}

//Starts the page

init()