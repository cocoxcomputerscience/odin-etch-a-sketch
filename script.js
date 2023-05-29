// to populate grid container
let gridContainer = document.querySelector("#grid-container");

function populateGrid() {
    for (let i = 0; i < 256; i++) {
        let gridItem = document.createElement("div");
        gridItem.classList.add("grid-item");
        gridContainer.appendChild(gridItem);
    }
}

populateGrid();

// change color of gridItem when mouse is over it
let gridItems = document.querySelectorAll(".grid-item");
gridItems.forEach(gridItem => gridItem.addEventListener("mouseover", addGridItemColor));

function addGridItemColor() {
    this.style.backgroundColor = "red";
}

// remove color of gridItem when mouse leaves it
gridItems.forEach(gridItem => gridItem.addEventListener("mouseleave", removeGridItemColor));

function removeGridItemColor() {
    this.style.backgroundColor = "white";
}
