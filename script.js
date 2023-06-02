// to initially populate grid container
let gridContainer = document.querySelector("#grid-container");

function populateGrid(size = 16) {
    // will delete all children nodes if grid size is updated
    if (gridContainer.hasChildNodes()) gridContainer.innerHTML = "";
    
    let area = size * size;
    for (let i = 0; i < area; i++) {
        let gridItem = document.createElement("div");
        gridItem.classList.add("grid-item");

        // updating the width and height depending on the grid size
        // !!! will need to update to a more efficient method
        let side = (480 / size) + "px";
        gridItem.style.width = side;
        gridItem.style.height = side;

        gridContainer.appendChild(gridItem);
    }
}

populateGrid();

// change color of gridItem when mouse is down and over gridItem
let mouseDown = false;
document.body.addEventListener("mousedown", () => {mouseDown = true;});
document.body.addEventListener("mouseup", () => {mouseDown = false;})

//let gridItems = document.querySelectorAll(".grid-item");
//gridItems.forEach(gridItem => gridItem.addEventListener("mouseover", addGridItemColor));
//gridItems.forEach(gridItem => gridItem.addEventListener("mousedown", addGridItemColor));
document.body.addEventListener("mouseover", addGridColor);
document.body.addEventListener("mousedown", addGridColor);
let gridColor = "black";

function addGridColor(e) {
    // event delegation is used for the dynamically created grid
    const target = e.target.closest(".grid-item");

    if (target) {
        if (e.type === 'mouseover' && mouseDown === false) {
            return
        }
        // !!! need to change to selected color later
        target.style.backgroundColor = gridColor; 
    }
}

// grid size slider
let gridSizeToggle = document.querySelector("#grid-size-toggle");
let gridSize = document.querySelector("#grid-size");

gridSizeToggle.addEventListener("input", updateGridSize);

function updateGridSize(e) {
    let gridSizeValue = this.value;
    // updating the displayed grid size underneath the range button
    gridSize.textContent = `${gridSizeValue} x ${gridSizeValue}`;

    // updating the acutal grid size 
    populateGrid(gridSizeValue);
}

// clear button
let clearButton = document.body.querySelector("#clear-button");
clearButton.addEventListener("click", clearGrid);

function clearGrid() {
    let gridContainerItems = gridContainer.childNodes;
    gridContainerItems.forEach(gridItem => gridItem.style.backgroundColor = "white");

    // defaults
    gridColor = "black";
    eraserToggle = false;

    // !!! need to add defaults of changing buttons back to unclicked states 
    // !!! did not add css style for that yet
}

// eraser button
let eraserToggle = false;
let eraserButton = document.body.querySelector("#eraser-button");
eraserButton.addEventListener("click", toggleEraser);

function toggleEraser() {
    // code to make color white
    if (!eraserToggle) {
        gridColor = "white";
        eraserToggle = true;
        return;
    }
    // !!! need to change to selected color later
    gridColor = "black";
    eraserToggle = false;
}

// add grid lines
let gridLinesButton = document.body.querySelector("#grid-lines-button");
gridLinesButton.addEventListener("click", toggleGridLines);

function toggleGridLines() {
    let gridContainerItems = gridContainer.childNodes;

    // checking if one child has grid-lines
    if (gridContainerItems[0].classList.contains("grid-lines")) {
        gridContainerItems.forEach(gridItem => gridItem.classList.remove("grid-lines"));
        return;
    }

    gridContainerItems.forEach(gridItem => gridItem.classList.add("grid-lines"));
}