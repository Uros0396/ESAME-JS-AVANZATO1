const url = 'https://striveschool-api.herokuapp.com/api/product/';
const key = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NmQwOWQ0OTRlMWE5MjAwMTU1Mjg0ZDkiLCJpYXQiOjE3MjQ5NDc3ODUsImV4cCI6MTcyNjE1NzM4NX0.fAEaYqkOo7gTE93CjIseypDCjmKEmCh2Z_9Ujn3MuaY';
const handleFormSubmit = async (e) => {
    e.preventDefault();
    
    const name = document.getElementById("inputName").value;
    const description = document.getElementById("inputDescription").value;
    const brand = document.getElementById("inputBrand").value;
    const imageUrl = document.getElementById("inputImageUrl").value;
    const price = Number(document.getElementById("inputPrice").value);

    
    const product = { name, description, brand, imageUrl, price };

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

        
        const result = await response.json();
        console.log('Product saved:', result);
    } catch (error) {
        console.error('Error:', error);
    }
};

document.getElementById("product-form").addEventListener("submit", handleFormSubmit);

