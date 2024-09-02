import { url, key, fetchData } from "./main.js";
import { startLoading, stopLoading } from "./loader.js";

window.onload = async () => {
    const containerCards = document.getElementById("product-list")

    if (!containerCards) {
        alert('Element with id "product-list" not found.');
        return;
    }

    document.getElementById("product-form").addEventListener("submit", handleFormSubmit);
    startLoading()
    const products =  await fetchData()
    stopLoading()
    products.forEach(product => createCards(product, containerCards));
}

export const postData = async (key, url, product) => {
    try {
        const response = await fetch(url, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${key}`
            },
            body: JSON.stringify(product)
        });

        if (!response.ok) {
            const errorText = await response.text();
            console.error('Error response:', errorText);
            return;
        }
        window.location.href = "backoffice.html"

        return await response.json();
    } catch (error) {
        console.error('Error:', error);
        return 
    }
}

const handleFormSubmit = async (e) => {
    e.preventDefault();
    
    const name = document.getElementById("inputName").value;
    const description = document.getElementById("inputDescription").value;
    const brand = document.getElementById("inputBrand").value;
    const imageUrl = document.getElementById("inputImageUrl").value;
    const price = Number(document.getElementById("inputPrice").value);

    const product = { name, description, brand, imageUrl, price };

    postData(key,url, product)
};

const createCards = (product, containerCards) => {
    const divContainer = document.createElement("div");
    divContainer.setAttribute("class", "col-sm-12 col-md-6 col-lg-3 m-3 mb-4 card card-shadow");

    const img = document.createElement("img");
    img.setAttribute("class", "card-img-top  customImg");
    img.src = product.imageUrl;

    const divBody = document.createElement("div");
    divBody.setAttribute("class", "card-body d-flex flex-column align-items-center");

    const brand = document.createElement("p");
    brand.setAttribute("class", "card-text");
    brand.innerText = product.brand;

    const price = document.createElement("p");
    price.setAttribute("class", "mt-auto mb-2")
    price.innerText = `$${product.price?.toFixed(2)}`;

    const divFooter = document.createElement("div");
    divFooter.setAttribute("class", "d-flex justify-content-around w-100 mt-auto mb-2")

    const deletebtn = document.createElement("button");
    deletebtn.setAttribute("class", "btn btn-secondary btn-sm");
    deletebtn.innerText = "Delete";

    deletebtn.addEventListener("click", () => {
        window.location.href = "delete.html?id=" + product._id 
    })
    
    const divDetails = document.createElement("div");
    divDetails.setAttribute("class", "mt-auto");

    const deteailsBtn = document.createElement("button");
    deteailsBtn.setAttribute("class", "btn btn-info btn-sm w-100 mb-2")
    
    deteailsBtn.innerText = "Deteails";
    deteailsBtn.addEventListener("click", () => {
        window.location.href = `details.html?id=${product._id}`
    });

    const updatebtn = document.createElement("button");
    updatebtn.setAttribute("class", "btn btn-primary btn-sm");
    updatebtn.innerText = "Update";

    updatebtn.addEventListener("click", () => {
        window.location.href = "modify.html?id=" + product._id 
    })

    divBody.append(brand, price, divDetails);
    divFooter.append(deletebtn, updatebtn)
    divDetails.append(deteailsBtn)
    divContainer.append(img, divBody,  divFooter);
    containerCards.append(divContainer);
}