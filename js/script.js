document.addEventListener("DOMContentLoaded", () => {
    const newsContainer = document.getElementById("news-container");

    fetch("./json/news.json")
        .then(response => response.json())
        .then(news => {
            news.forEach(item => {
                const newsItem = document.createElement("div");
                newsItem.className = "news-item";
                newsItem.innerHTML = `
                    <h3>${item.title}</h3>
                    <p>${item.content}</p>
                    <span>${item.date}</span>
                `;
                newsContainer.appendChild(newsItem);
            });
        })
        .catch(error => console.error("Error al cargar las noticias:", error));
});
