let quoteCount = 0;

async function generateQuote() {

    try {

        const response = await fetch(
            "https://dummyjson.com/quotes/random"
        );

        const data = await response.json();

        document.getElementById("quote").innerText =
            `"${data.quote}"`;

        document.getElementById("author").innerText =
            `— ${data.author}`;

        quoteCount++;

        document.getElementById("counter").innerText =
            `Quotes Generated: ${quoteCount}`;

    } catch (error) {

        document.getElementById("quote").innerText =
            "Unable to fetch quote.";

        document.getElementById("author").innerText = "";
    }
}

function copyQuote() {

    const quoteText =
        document.getElementById("quote").innerText;

    navigator.clipboard.writeText(quoteText);

    alert("Quote copied successfully!");
}

function toggleTheme() {

    document.body.classList.toggle("dark");

    if (document.body.classList.contains("dark")) {
        localStorage.setItem("theme", "dark");
    } else {
        localStorage.setItem("theme", "light");
    }
}

function loadTheme() {

    const savedTheme =
        localStorage.getItem("theme");

    if (savedTheme === "dark") {
        document.body.classList.add("dark");
    }
}

loadTheme();

window.onload = generateQuote;