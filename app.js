const apiKey = "4da9ee577fe345f9b7e829026fd276bb";

const inputEl = document.getElementById('inputEl');
const searchEl = document.getElementById("searchButt");
const news_result = document.querySelector('.news-result');
const show_more = document.getElementById('show-more');
const form = document.querySelector('form');

let pageSize = 5;
let query = ""
async function getRandomNews (pageSize) {
    try{
        const apiUrl = `https://newsapi.org/v2/top-headlines?country=us&pageSize=${pageSize}&apiKey=${apiKey}`;
        const responce = await fetch (apiUrl);
        const data = await responce.json();
        return data.articles;
    }catch(error){
        console.error("Error Fetching Random data", error);
        return [];
    }
}
(async (pageSize) => {
    try{
        pageSize = 5;
        const newsData = await getRandomNews(pageSize);
        displayNews(newsData);
      
    }catch(error){
        console.error("Error fetching getRandomNews", error);
    }
})();
// ------ //

function displayNews(newsData) {

    news_result.innerHTML = "";
    const validateNews = newsData.filter( newsData => 
        newsData.urlToImage && newsData.description && newsData.title
    );
    if(validateNews.length === 0){
        newsData.textContent = "[Error 404 not found]";
    }
    validateNews.forEach( (newsData) => {
        const newsWrapper = document.createElement('div');
        newsWrapper.classList.add('cursor-pointer','w-full', 'md:w-80', 'lg:w-72', 'shadow-lg', 'px-2', 'py-2', 'border-2', 'border-gray-300', 'rounded');

        const newsImg = document.createElement('img');
        newsImg.classList.add('mb-5', 'rounded', 'md:h-40', 'w-full');
        newsImg.src = newsData.urlToImage;
        newsImg.alt = newsData.title;

        const newsHeader = document.createElement('h1');
        newsHeader.classList.add('font-bold', 'text-sm', 'mb-2');
        newsHeader.textContent = newsData.title;

        const newsBody = document.createElement('p');
        newsBody.classList.add('text-sm');
        const cutBody = newsData.description ? (newsData.description.length > 90 ? newsData.description.slice(0,90) + "..." : newsData.description) : '[Error 404]';
        newsBody.textContent = cutBody;

        newsWrapper.appendChild(newsImg);
        newsWrapper.appendChild(newsHeader);
        newsWrapper.appendChild(newsBody);

        newsWrapper.addEventListener('click', () =>{
            window.open(newsData.url, "_blank");
        })
        news_result.appendChild(newsWrapper);
    })
    show_more.style.display = "block";
   
}

async function getInputNews(query, pageSize) {
    try{
        const apiUrl = `https://newsapi.org/v2/everything?q=${query}&pageSize=${pageSize}&apiKey=${apiKey}`;
        const responce = await fetch (apiUrl);
        const data = await responce.json();
        return data.articles;

    }catch(error){
        console.error("Error fetching inputed News", error);
        return [];
    }
}

searchEl.addEventListener("click", async (e) => {
    query = inputEl.value;
    e.preventDefault();
    if(query !== 0){
        try{  
            pageSize = 5;
            const newsData = await getInputNews(query, pageSize);
            displayNews(newsData);

        }catch(error){
            console.error('Error fetching inputed data', error);
        }
    }

})

show_more.addEventListener('click', async () => {
    pageSize += 5;
    let newsData;
    try{
        if(query !== ""){
             newsData = await getInputNews(query, pageSize);
        }else{
             newsData = await getRandomNews(pageSize);
        }
        displayNews(newsData);
    }catch(error){
        console.error("Could not load button", error);
    }
   
    

})



