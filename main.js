const url = 'https://striveschool-api.herokuapp.com/api/product/';
const key = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NmQwOWQ0OTRlMWE5MjAwMTU1Mjg0ZDkiLCJpYXQiOjE3MjQ5NDc3ODUsImV4cCI6MTcyNjE1NzM4NX0.fAEaYqkOo7gTE93CjIseypDCjmKEmCh2Z_9Ujn3MuaY'; 
const containerCards = document.getElementById("container-cards");

const fetchAndDisplayProducts = async () => {
    console.log('Fetching products...');
    try {
        const response = await fetch(url, {
            headers: {
                "Authorization": `Bearer ${key}`
            }
        });

        if (!response.ok) {
            const errorText = await response.text();
            console.error('Error response:', errorText);
            return;
        }

        console.log('Response OK'); 

        const products = await response.json();
        products.forEach(product => 
           createCards(product));
       //console.log('Products:', products);
    } catch (error) {
        console.error('Error:', error);
    }
};

fetchAndDisplayProducts();

const createCards = (product) => {
    const divContainer = document.createElement("div");
    divContainer.setAttribute("class", "col-sm-12 col-md-6 col-lg-3 mb-4 m-4 card");

    const img = document.createElement("img");
    img.setAttribute("class", "card-img-top h-75");
    img.src = product.imageUrl;

    const divBody = document.createElement("div");
    divBody.setAttribute("class", "card-body");

    const title = document.createElement("h5");
    title.setAttribute("class", "card-title");
    title.innerText = product.name;

    const brand = document.createElement("p");
    brand.setAttribute("class", "card-text");
    brand.innerText = product.brand;

    const price = document.createElement("p");
    price.innerText = `$${product.price?.toFixed(2)}`;

    const deteails = document.createElement("button");
    deteails.innerText = "Deteails";
    deteails.addEventListener("click", () => {
        window.location.href = `details.html?id=${product._id}`
    });

    divBody.append(title, brand, price, deteails);
    divContainer.append(img, divBody);
    containerCards.append(divContainer);
}

containerCards.addEventListener("load", fetchAndDisplayProducts);


