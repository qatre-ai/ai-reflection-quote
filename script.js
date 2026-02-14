
const QUOTE_API = "https://dummyjson.com/quotes/random";
const OPENAI_API_KEY = ""
const AI_MODEL = "gpt-4o";

let currentQuote = { text: "", author: "" };
let favorites = JSON.parse(localStorage.getItem("favoriteQuotes")) || [];


const quoteEl = document.getElementById("quote");
const authorEl = document.getElementById("author");
const aiBox = document.getElementById("ai-response-box");
const aiText = document.getElementById("ai-text");
const favList = document.getElementById("favorites-list");
const themeToggle = document.getElementById("theme-toggle");
const actionButtons = document.getElementById("action-buttons");
const quoteContainer = document.getElementById("quote-container");

// دکمه‌ها
const newQuoteBtn = document.getElementById("new-quote-btn");
const tweetBtn = document.getElementById("tweet-btn");
const favBtn = document.getElementById("favorite-btn");
const aiBtn = document.getElementById("ai-explain-btn");
const speechBtn = document.getElementById("speech-btn");
const downloadBtn = document.getElementById("download-btn");



async function fetchQuote() {
    quoteEl.innerHTML = "Loading...";
    authorEl.innerHTML = "";
    aiBox.classList.add("hidden"); 
    
    try {
        const response = await fetch(QUOTE_API);
        const data = await response.json();
        currentQuote = { text: data.quote, author: data.author };
        
        quoteEl.innerHTML = `"${currentQuote.text}"`;
        authorEl.innerHTML = `- ${currentQuote.author}`;
        
        updateFavButtonState();
    } catch (error) {
        quoteEl.innerHTML = "Failed to fetch quote!";
        console.error(error);
    }
}

async function explainQuote() {
    if (!currentQuote.text) return;
    
    aiBox.classList.remove("hidden");
    aiText.innerHTML = '<i>Analyzing with AI... <i class="fas fa-spinner fa-spin"></i></i>';

    const prompt = `Write a simple, inspiring, and short reflection (maximum 3 lines) in English for this quote: "${currentQuote.text}" by ${currentQuote.author}`;

    try {
        const response = await fetch(OPENAI_BASE_URL, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${OPENAI_API_KEY}`
            },
            body: JSON.stringify({
                model: AI_MODEL,
                messages: [{ role: "user", content: prompt }]
            })
        });

        const data = await response.json();
        if(data.choices && data.choices.length > 0) {
            aiText.innerHTML = `<strong>AI Reflection:</strong><br>` + data.choices[0].message.content;
        } else {
            aiText.innerHTML = "خطا در دریافت پاسخ از هوش مصنوعی.";
        }
    } catch (error) {
        aiText.innerHTML = "متاسفانه ارتباط با سرور هوش مصنوعی برقرار نشد.";
        console.error(error);
    }
}

function shareToX() {
    if (!currentQuote.text) return;
    const tweetContent = `"${currentQuote.text}" - ${currentQuote.author}`;
    const xUrl = `https://x.com/intent/tweet?text=${encodeURIComponent(tweetContent)}`;
    window.open(xUrl, "Tweet Window", "width=600, height=400");
}

function readQuote() {
    if (!currentQuote.text) return;
    window.speechSynthesis.cancel(); 
    const textToRead = `${currentQuote.text}. Quote by ${currentQuote.author}`;
    const utterance = new SpeechSynthesisUtterance(textToRead);
    utterance.lang = "en-US";
    utterance.rate = 0.9;
    window.speechSynthesis.speak(utterance);
}

async function downloadPoster() {
    actionButtons.style.display = "none";
    downloadBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i>';

    try {
        const canvas = await html2canvas(quoteContainer, {
            scale: 2, 
            backgroundColor: getComputedStyle(document.documentElement).getPropertyValue('--box-bg'),
            borderRadius: 15
        });
        
        const link = document.createElement("a");
        link.download = "My-Quote-Poster.png";
        link.href = canvas.toDataURL("image/png");
        link.click();
    } catch (error) {
        console.error("Error creating poster:", error);
        alert("Failed to create poster.");
    } finally {
        actionButtons.style.display = "flex";
        downloadBtn.innerHTML = '<i class="fas fa-download"></i>';
    }
}

function toggleFavorite() {
    const existsIndex = favorites.findIndex(f => f.text === currentQuote.text);
    if (existsIndex === -1) {
        favorites.push(currentQuote);
    } else {
        favorites.splice(existsIndex, 1);
    }
    
    localStorage.setItem("favoriteQuotes", JSON.stringify(favorites));
    updateFavButtonState();
    renderFavorites();
}

function updateFavButtonState() {
    const isFav = favorites.some(f => f.text === currentQuote.text);
    favBtn.innerHTML = isFav ? '<i class="fas fa-heart"></i>' : '<i class="far fa-heart"></i>';
}

function renderFavorites() {
    favList.innerHTML = "";
    if(favorites.length === 0){
        favList.innerHTML = "<li>No favorite quotes yet.</li>";
        return;
    }
    favorites.forEach(fav => {
        const li = document.createElement("li");
        li.innerHTML = `<strong>"${fav.text}"</strong> - <i>${fav.author}</i>`;
        favList.appendChild(li);
    });
}

function toggleTheme() {
    const htmlEl = document.documentElement;
    const currentTheme = htmlEl.getAttribute("data-theme");
    const newTheme = currentTheme === "light" ? "dark" : "light";
    
    htmlEl.setAttribute("data-theme", newTheme);
    localStorage.setItem("theme", newTheme);
    themeToggle.innerHTML = newTheme === "light" ? '<i class="fas fa-moon"></i>' : '<i class="fas fa-sun"></i>';
}

function loadTheme() {
    const savedTheme = localStorage.getItem("theme") || "light";
    document.documentElement.setAttribute("data-theme", savedTheme);
    themeToggle.innerHTML = savedTheme === "light" ? '<i class="fas fa-moon"></i>' : '<i class="fas fa-sun"></i>';
}


newQuoteBtn.addEventListener("click", fetchQuote);
aiBtn.addEventListener("click", explainQuote);
tweetBtn.addEventListener("click", shareToX);
speechBtn.addEventListener("click", readQuote);
downloadBtn.addEventListener("click", downloadPoster);
favBtn.addEventListener("click", toggleFavorite);
themeToggle.addEventListener("click", toggleTheme);


loadTheme();
renderFavorites();
fetchQuote();