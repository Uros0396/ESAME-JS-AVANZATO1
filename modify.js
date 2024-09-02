import { startLoading, stopLoading } from "./loader.js";

const url = 'https://striveschool-api.herokuapp.com/api/product/';
const key = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NmQwOWQ0OTRlMWE5MjAwMTU1Mjg0ZDkiLCJpYXQiOjE3MjQ5NDc3ODUsImV4cCI6MTcyNjE1NzM4NX0.fAEaYqkOo7gTE93CjIseypDCjmKEmCh2Z_9Ujn3MuaY';

const name = document.getElementById("inputName");
const description = document.getElementById("inputDescription");
const brand = document.getElementById("inputBrand");
const imageUrl = document.getElementById("inputImageUrl");
const price = document.getElementById("inputPrice");
const params = new URLSearchParams(window.location.search);
const productId = params.get('id');

async function fillFormWithProductById() {
   if (productId) {
    startLoading()
        try {
            const response = await fetch(url + productId, {
                headers: {
                    "Authorization": `Bearer ${key}`
                }
            });

            if (response.ok) {
                const product = await response.json();
                name.value = product.name;
                description.value = product.description;
                brand.value = product.brand;
                imageUrl.value = product.imageUrl;
                price.value = product.price;
            } else {
                alert("Failed to fetch product");
            }
        } catch (error) {
            console.error("Error fetching product:", error);
        } finally {  
            stopLoading();
        }
        
        
    } else {
        alert("No product ID provided in the URL");
    }
  
}

async function updateProduct(event) {
    event.preventDefault();
const updatedProduct = {
        name: name.value,
        description: description.value,
        brand: brand.value,
        imageUrl: imageUrl.value,
        price: Number(price.value),
    };

    try {
        const response = await fetch(url + productId, {
            method: "PUT",
            headers: {
                "Authorization": `Bearer ${key}`,
                "Content-Type": "application/json",
            },
            body: JSON.stringify(updatedProduct),
        });

        if (response.ok) {
            alert("Product updated successfully!");
            window.location.href = "backoffice.html";
        } else {
            const errorText = await response.text();
            console.error("Failed to update product:", errorText);
            alert("Failed to update product");
        }
    } catch (error) {
        console.error("Error updating product:", error);
    }
}

document.getElementById("product-form").addEventListener("submit", updateProduct);

fillFormWithProductById();
