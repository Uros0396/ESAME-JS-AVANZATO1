export function startLoading() {
    const wrap = document.createElement("div");
    const p = document.createElement("p");
    wrap.id = "Loader"
    p.innerHTML = "Wait few minutes...";
    wrap.append(p)
    document.body.append(wrap)
}

export function stopLoading() {
    document.getElementById("Loader").remove()
}