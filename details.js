import { startLoading, stopLoading } from "./loader.js";

const key = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NmQwOWQ0OTRlMWE5MjAwMTU1Mjg0ZDkiLCJpYXQiOjE3MjQ5NDc3ODUsImV4cCI6MTcyNjE1NzM4NX0.fAEaYqkOo7gTE93CjIseypDCjmKEmCh2Z_9Ujn3MuaY'; 
const url = 'https://striveschool-api.herokuapp.com/api/product/';
const params = new URLSearchParams(window.location.search);
const id = params.get("id");

const cardDetail = (product) => {
    const listItem = document.createElement("li");
    listItem.classList.add("list-group-item");
    listItem.innerHTML = `
        <div class="d-flex flex-column flex-md-row align-items-center my-auto">
            <img src="${product.imageUrl}" alt="${product.name} cover" class="w-25 h-25 h-auto">
            <div class="mt-3 mt-md-0 ms-md-3 text-center text-md-start">
              <p class="m-2"><strong>${product.description}</strong></p>
              <p class="mt-3 mt-md-5 m-2"><strong>Price:</strong> €${product.price?.toFixed(2)}</p>
             </div>
        </div>
    `;
    return listItem;
}

function fetchProductDetails() {
  
    startLoading();
    fetch(url + id, {
         headers : {
            "Content-Type": "application/JSON",
            "Authorization": `Bearer ${key}`
         }
    })
    
        .then(response => {
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
            return response.json();
        })
        .then(product => {
            const productList = document.getElementById('container-details');
            if (productList) {
                productList.innerHTML = '';
                const listItem = cardDetail(product);
                productList.appendChild(listItem);
            } else {
                console.error("Elemento con ID 'book-list' non trovato nel DOM.");
            }
        })
        .catch(error => {
            console.error("Errore nel recupero del libro:", error);
        })
        
        .finally(() =>{
            stopLoading();
        })
}

window.onload = fetchProductDetails;