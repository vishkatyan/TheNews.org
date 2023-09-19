// variables
const generalBtn = document.getElementById("general");
const businessBtn = document.getElementById("business");
const sportsBtn = document.getElementById("sports");
const technologyBtn = document.getElementById("technology");
const searchBtn = document.getElementById("searchBtn");


const newsQuery = document.getElementById("newsQuery");
const newsType = document.getElementById("newsType");
const newsdetails = document.getElementById("newsdetails");

// Array
var newsDataArr = [];


//api section
const API_KEY = "7ba871c1d44c47cf9966bc461d1c9c0a";
const HEADLINES_NEWS = "https://newsapi.org/v2/top-headlines?country=in&apiKey=";
const BUSINESS_NEWS = "https://newsapi.org/v2/top-headlines?country=in&category=business&apiKey=";
const GENERAL_NEWS = "https://newsapi.org/v2/top-headlines?country=in&category=general&apiKey=";
const SPORTS_NEWS = "https://newsapi.org/v2/top-headlines?country=in&category=sports&apiKey=";
const TECHNOLOGY_NEWS = "https://newsapi.org/v2/top-headlines?country=in&category=technology&apiKey=";
const SEARCH_NEWS = "https://newsapi.org/v2/everything?q=";


window.onload = function(){
    newsType.innerHTML= "<h4>Headlines</h4>"
    fetchHeadlines();
};
generalBtn.addEventListener("click", function(){
    newsType.innerHTML= "<h4>General News</h4>"
fetchGeneralNews();
});
businessBtn.addEventListener("click", function(){
    newsType.innerHTML= "<h4>Business News</h4>"
    fetchBusinessNews();

});
sportsBtn.addEventListener("click", function(){
    newsType.innerHTML= "<h4>Sports News</h4>"
    fetchSportsNews();

});
technologyBtn.addEventListener("click", function(){
    newsType.innerHTML= "<h4>Tech News</h4>"
    fetchTechnologyNews();

});

searchBtn.addEventListener("click", function(){
    newsType.innerHTML= "<h4>Search: '+newsQuery.value'</h4>"
    fetchQueryNews();

});

const fetchHeadlines = async()=>{
    const response = await fetch(HEADLINES_NEWS+ API_KEY);
    newsDataArr = [];
    if(response.status>=200 && response.status<300){
        const myJson = await response.json();
        newsDataArr = myJson.articles;
    } else{
        //handle errors
        console.log(response.status, response.statusText);


    }
    displayNews();
};


const fetchGeneralNews = async()=>{
    const response = await fetch(GENERAL_NEWS+ API_KEY);
    newsDataArr = [];
    if(response.status>=200 && response.status<300){
        const myJson = await response.json();
        newsDataArr = myJson.articles;
    } else{
        //handle errors
        console.log(response.status, response.statusText);


    }
    displayNews();
};

const fetchBusinessNews = async()=>{
    const response = await fetch(BUSINESS_NEWS+ API_KEY);
    newsDataArr = [];
    if(response.status>=200 && response.status<300){
        const myJson = await response.json();
        console.log(myJson.articles);
        newsDataArr = myJson.articles;
    } else{
        //handle errors
        console.log(response.status, response.statusText);


    }
    displayNews();
};

const fetchSportsNews = async()=>{
    const response = await fetch(SPORTS_NEWS+ API_KEY);
    newsDataArr = [];
    if(response.status>=200 && response.status<300){
        const myJson = await response.json();
        newsDataArr = myJson.articles;
    } else{
        //handle errors
        console.log(response.status, response.statusText);


    }
    displayNews();
};

const fetchTechnologyNews = async()=>{
    const response = await fetch(TECHNOLOGY_NEWS+ API_KEY);
    newsDataArr = [];
    if(response.status>=200 && response.status<300){
        const myJson = await response.json();
        newsDataArr = myJson.articles;
    } else{
        //handle errors
        console.log(response.status, response.statusText);
    }
    displayNews();
};

const  fetchQueryNews = async()=>{
    if(newsQuery.value==null)
    return;
    const response = await fetch(SEARCH_NEWS+ newsQuery.value + "&apikey="+ API_KEY);
    newsDataArr = [];
    if(response.status>=200 && response.status<300){
        const myJson = await response.json();
        newsDataArr = myJson.articles;
    } else{
        //handle errors
        console.log(response.status, response.statusText);

    }
    displayNews();
};


function displayNews(){
    newsdetails.innerHTML= "";

    if(newsDataArr.length==0){
        newsdetails.innerHTML = "<h5>No Data Found!</h5>";
        return;
    }
    newsDataArr.forEach(news=>{
        var date = news.publishedAt.split("T");
        var col = document.createElement('div');
        col.className= "col-sm-12 col-md-4 col-lg-3 p-2";
        var card = document.createElement('div');
        card.className = "p-2";

        var image = document.createElement('img');
        image.setAttribute("height", "matchparent");
        image.setAttribute("width", "100%");
        image.src = news.urlToImage;

        var cardBody = document.createElement('div');
        var newsHeading = document.createElement('h5');
        newsHeading.className= "card-title";
        newsHeading.innerHTML = news.title;

        var dateHeading = document.createElement('h6');
        dateHeading.className= "text-primary";
        dateHeading.innerHTML = date[0];
        var description = document.createElement('p');
        description.className = "text-muted";
        description.innerHTML = news.description;

        var link  = document.createElement('a');
        link.className = "btn btn-dark";
        link.setAttribute("target", "_blank");
        link.href = news.url;
        link.innerHTML = "Read More...";

        cardBody.appendChild(newsHeading);
        cardBody.appendChild(dateHeading);
        cardBody.appendChild(description);
        cardBody.appendChild(link);

        card.appendChild(image);
        card.appendChild(cardBody);

        col.appendChild(card);

        newsdetails.append(col);
    })
}