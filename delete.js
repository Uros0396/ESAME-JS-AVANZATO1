import { url,key } from "./main.js";

window.onload =() => {
    const params = new URLSearchParams(window.location.search);
    const id = params.get("id");
    const eliminationBtn = document.querySelector('#confirmElimination')
    eliminationBtn.addEventListener('click', ()=> {
        deleteProduct(id,key)
    })

}

const deleteProduct = async (id,key) => {
    await fetch(url + id, {
        method: 'DELETE',
        headers: {
            "Authorization": `Bearer ${key}`,
            "Content-Type": "application/json",
        },
    });
    window.location.href = "backoffice.html"
}