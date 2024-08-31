const key = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NmQwOWQ0OTRlMWE5MjAwMTU1Mjg0ZDkiLCJpYXQiOjE3MjQ5NDc3ODUsImV4cCI6MTcyNjE1NzM4NX0.fAEaYqkOo7gTE93CjIseypDCjmKEmCh2Z_9Ujn3MuaY'; 
const url = 'https://striveschool-api.herokuapp.com/api/product/';
const params = new URLSearchParams(window.location.search);
const id = params.get("id");

const cardDetail = (product) => {
    const listItem = document.createElement("li");
    listItem.classList.add("list-group-item");
    listItem.innerHTML = `
        <div class="d-flex mt-5">
            <img src="${product.imageUrl}" alt="${product.name} cover" class="w-25 h-25">
            <div class="ms-3">
                <p class="m-2"><strong>${product.description}</strong></p>
             </div>
        </div>
    `;
    return listItem;
}

function fetchProductDetails() {
  

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
        });
}

window.onload = fetchProductDetails;