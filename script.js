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

// change color of gridItem when mouse is down and over gridItem
let mouseDown = false;
document.body.addEventListener("mousedown", () => {mouseDown = true;});
document.body.addEventListener("mouseup", () => {mouseDown = false;})

let gridItems = document.querySelectorAll(".grid-item");
gridItems.forEach(gridItem => gridItem.addEventListener("mouseover", addGridItemColor));
gridItems.forEach(gridItem => gridItem.addEventListener("mousedown", addGridItemColor));

function addGridItemColor(e) {
    if (e.type === 'mouseover' && mouseDown === false) {
        return
    }
    this.style.backgroundColor = "red";
}

// grid size slider
let gridSizeToggle = document.querySelector("#grid-size-toggle");
let gridSize = document.querySelector("#grid-size");

gridSizeToggle.addEventListener("input", updateGridSize);

function updateGridSize() {
    let gridSizeValue = this.value;
    gridSize.textContent = `${gridSizeValue} x ${gridSizeValue}`;
}
