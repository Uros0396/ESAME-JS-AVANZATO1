import { startLoading, stopLoading } from "./loader.js";

const counterCart = document.getElementById("counterCart");
let globalCounterCart = 0;
let cartIcon = document.getElementById("cartOffCanvas");
let quantityOffCanvas = document.getElementById("cartItemCount");
const cartContainer = document.getElementById("cartContainer");
let cartTotalPrice = document.getElementById("cartPriceCount");
let globalPriceCounter = 0;


export const url = 'https://striveschool-api.herokuapp.com/api/product/';
export const key = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NmQwOWQ0OTRlMWE5MjAwMTU1Mjg0ZDkiLCJpYXQiOjE3MjQ5NDc3ODUsImV4cCI6MTcyNjE1NzM4NX0.fAEaYqkOo7gTE93CjIseypDCjmKEmCh2Z_9Ujn3MuaY'; 


window.onload = async () => {
    const containerCards = document.getElementById("container-cards");
    startLoading(); 
    await displayProducts(containerCards); 
    stopLoading(); 
};

export const fetchData = async () => {
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

        return await response.json();
    } catch (error) {
        console.error('Error:', error);
    }
    
}


const displayProducts = async (containerCards) => {
    const products =  await fetchData()
    products.forEach(product => createCards(product, containerCards));
};

const createCards = (product, containerCards) => {
    const divContainer = document.createElement("div");
    divContainer.setAttribute("class", "col-sm-12 col-md-6 col-lg-3 mb-4 m-4 card shadow");

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
    price.innerText = `€${product.price?.toFixed(2)}`;

    const deteails = document.createElement("a");
    deteails.setAttribute("class", "text-decoration-none")
    deteails.innerText = "more infos...";
    deteails.href = "#";
    deteails.addEventListener("click", () => {
        window.location.href = `details.html?id=${product._id}`
    });

    const divFooter = document.createElement("div");
    divFooter.setAttribute("class", "card-footer text-center");

    const buttonFooter = document.createElement("button");
    buttonFooter.setAttribute("class", "btn btn-text")
    buttonFooter.innerText = "ADD TO CART"

    divBody.append(title, brand, price, deteails);
    divFooter.append(buttonFooter);
    divContainer.append(img, divBody, divFooter);
    containerCards.append(divContainer);

    buttonFooter.addEventListener("click", () => {
        if(globalCounterCart >= 0) {
            globalCounterCart++
            globalPriceCounter+=product.price
            counterCart.innerText = globalCounterCart;
            quantityOffCanvas.innerText = globalCounterCart;
            cartTotalPrice.innerText = `$${globalPriceCounter.toFixed(2)}`;
            divContainer.classList.add("opacity")
            buttonFooter.innerText = "ADDED";
            addToCart(product, divContainer)
        }
    })
}

const addToCart = (product, originalCard) => {
    
    const cartCard = document.createElement("div");
    cartCard.setAttribute("class", "d-flex justify-content-between mb-2 border-bottom pb-2");

    const imgBook = document.createElement("img");
    imgBook.setAttribute("class", "w-25 modifyImg");
    imgBook.src = product.imageUrl;

    const cartCardBody = document.createElement("div");
    cartCardBody.setAttribute("class", "ms-3");

    const title = document.createElement("h5");
    title.setAttribute("class", "mb-1");
    title.innerText = product.brand;

    const price = document.createElement("p");
    price.setAttribute("class", "mb-1");
    price.innerText = `$${product.price?.toFixed(2)}`;

    const ionRemove = document.createElement("ion-icon");
    ionRemove.setAttribute("name", "trash-outline");
    

    cartCardBody.append(title, price);
    cartCard.append(imgBook, cartCardBody, ionRemove);
    cartContainer.appendChild(cartCard);
        
    ionRemove.addEventListener("click", () => {
        if (globalCounterCart > 0) {
            globalCounterCart--;
            globalPriceCounter-=product.price
            counterCart.innerText = globalCounterCart;
            quantityOffCanvas.innerText = globalCounterCart;
            cartTotalPrice.innerText=`€${globalPriceCounter.toFixed(2)}`;
            originalCard.classList.remove("opacity");
            originalCard.querySelector(".btn.btn-text").innerText = "ADD TO CART";
            cartCard.remove();
        }
    });
};


