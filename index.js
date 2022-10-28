//Global Variables

const navList = document.getElementById('quote-type');
const div = document.getElementById("quote-body");
let limit = 10;
let interval = 0;

//Fetches to the Database

const fetchQuotes = (tag) => {
    limit = 10;
    const fetchreq1 = fetch(`https://api.quotable.io/quotes?tags=${tag}&limit=${limit}`)
    .then(resp => resp.json())
    const fetchreq2 = fetch(`http://localhost:3000/quotes`)
    .then(resp => resp.json())
    const twoDatas = Promise.all([fetchreq1, fetchreq2])
    twoDatas.then(res => {
        const quoteArr = res[0].results;
        const localQArr = res[1];
        prepareData(quoteArr, localQArr);
    })
}

const fetchThreeQuotes = (tag) => {
    limit = 3
    const fetchreq1 = fetch(`https://api.quotable.io/quotes?tags=${tag}&limit=${limit}`)
    .then(resp => resp.json())
    const fetchreq2 = fetch(`http://localhost:3000/quotes`)
    .then(resp => resp.json())
    const twoDatas = Promise.all([fetchreq1, fetchreq2])
    twoDatas.then(res => {
        const quoteArr = res[0].results;
        const localQArr = res[1];
        prepareData(quoteArr, localQArr);
        limit = 10;
    })
}

const fetchAuthorQuotes = (author) => {
    const fetchreq1 = fetch(`https://api.quotable.io/quotes?author=${author}`)
    .then(resp => resp.json())
    const fetchreq2 = fetch(`http://localhost:3000/quotes`)
    .then(resp => resp.json())
    const twoDatas = Promise.all([fetchreq1, fetchreq2])
    twoDatas.then(res => {
        const quoteArr = res[0].results;
        const localQArr = res[1];
        prepareData(quoteArr, localQArr);
    })
}

const fetchPreviewAuthorQuotes = (author) => {
    limit = 3
    const fetchreq1 = fetch(`https://api.quotable.io/quotes?author=${author}&limit=${limit}`)
    .then(resp => resp.json())
    const fetchreq2 = fetch(`http://localhost:3000/quotes`)
    .then(resp => resp.json())
    const twoDatas = Promise.all([fetchreq1, fetchreq2]);
    twoDatas.then(res => {
        limit = 10;
        const quoteArr = res[0].results;
        const localQArr = res[1];
        prepareData(quoteArr, localQArr);
    })
}

const fetchTags = () => {
    fetch('https://api.quotable.io/tags')
    .then(resp => resp.json())
    .then(tagArr => {
        console.log(tagArr)
        tagArr.forEach(tag => {
            if(tag.quoteCount !== 0){
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

const prepareData = (remoteQuotes, localQuotes) => {
    div.textContent = '';
    remoteQuotes.forEach(remoteQuote =>{
        const quoteIndex = localQuotes.findIndex(localQuote => localQuote.id === remoteQuote._id);
        let likeCount = 0;
        if(quoteIndex === -1){
            postLikes(likeCount, remoteQuote._id);

        }else{
            likeCount = localQuotes[quoteIndex].likes;
        }
        renderQuotes(remoteQuote, likeCount, localQuotes);
    })
}

const postLikes = (likeCount, quoteId) => {
    const likeObj = {
        id: quoteId,
        likes: likeCount
    }
    const postReqObj =  {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            Accept : 'application/json'
        },
        body: JSON.stringify(likeObj),
    }

    fetch('http://localhost:3000/quotes', postReqObj)
    .then(resp => resp.json())
    .then(likeObj => {
        console.log(likeObj);
    })
}

//Set content of elements and appends them to the page

const renderQuotes = (quote, likeCount, localQuotes) => {

    const p = document.createElement('p');
    p.textContent = quote.content;

    const h2 = document.createElement('h2');
    h2.textContent = quote.author;

    const likeBtn = document.createElement('button');
    likeBtn.id = "likeBtn";
    likeBtn.textContent = 'Like';
    likeBtn.addEventListener('click',(e)=>{
        likeCount++;
        patchLikes(likeCount, quote, localQuotes);
        e.preventDefault();
        numberOfLikes.textContent = '  ' + likeCount + `❤️`;
    })

    const deleteBtn = document.createElement('button');
    deleteBtn.textContent = 'X';
    deleteBtn.id = 'deleteBtn';
    deleteBtn.addEventListener('click', () =>{
        interval = 0;
        div1.remove();
    })
    
    const numberOfLikes = document.createElement('h4');
    numberOfLikes.id = "numLikes";
    numberOfLikes.textContent = '  ' + likeCount +  `❤️`;

    const div1 = document.createElement('div');
    
    div1.append(deleteBtn, h2, p, numberOfLikes, likeBtn);
    div.append(div1);
}

const patchLikes = (likeCount, quote, localQuotes) => {
    const quoteIndex = localQuotes.findIndex(localQuote => localQuote.id === quote._id);
    const patchReqObj = {
        method: "PATCH",
        headers: {
            "content-type": "application/json",
        },
        body: JSON.stringify({
            likes: likeCount,
        }),
    }
    
    fetch(`http://localhost:3000/quotes/${localQuotes[quoteIndex].id}`, patchReqObj)
    .then((response) => response.json())
    .then((localQArr) => {
        console.log(localQArr);
    });
}

//Displays 10 quotes

const displayQuotes = (btn) => {
    const tag = btn.textContent;
    fetchQuotes(tag);
}

//Shows a preview of quotes 

const previewQuotes = (btn) => {
    const tag = btn.textContent;
    fetchThreeQuotes(tag);
}

//Determines when a picture is clicked

const picEvents = () => {
    const img1 = document.getElementById('img1');
    const img2 = document.getElementById('img2');
    const img3 = document.getElementById('img3');
    const img4 = document.getElementById('img4');
    const img5 = document.getElementById('img5');
    const imgArr = [img1, img2, img3, img4, img5];
    let author = '';

    imgArr.forEach(img =>{
        img.addEventListener('click', () => {
            interval++;
            author = img.alt;
            fetchAuthorQuotes(author);
        })
        img.addEventListener('mouseover', () => {
            author = img.alt;
            fetchPreviewAuthorQuotes(author);
        })
        img.addEventListener('mouseout', () => {
            if (interval !== 1){
                div.textContent ='';
            }else{
                interval = 0;;
            }
        })
    })
    
}

//Starts the necessary functions

const init = () => {
    fetchTags();
    picEvents();
}

//Starts the page

init();