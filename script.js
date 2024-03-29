function fillGrid() {
    let size = gridRange.value;
    gridRangeLabel.textContent = `${size} x ${size}`;

    // removes divs before inserting new ones
    gridContainer.innerHTML = "";

    gridContainer.style.gridTemplateColumns = `repeat(${size}, 1fr)`
    gridContainer.style.gridTemplateRows = `repeat(${size}, 1fr)`
    for (let i = 1; i <= size ** 2; i++) {
        let gridSquare = document.createElement("div");
        gridContainer.appendChild(gridSquare);
    }

    if (gridLinesBtn.classList.contains("clicked")) {
        gridContainer.childNodes.forEach(gridSquare => gridSquare.classList.toggle("grid-border"));
    }
}

function colorGrid(e) {
    if (e.target === gridContainer) return;
    if (e.type === "mousedown") mouseDown = true;

    if (mouseDown === true) {
        if (rainbowBtn.classList.contains("clicked")) e.target.style.backgroundColor = generateRandomColor();
        e.target.style.backgroundColor = color;
    }
}

function generateRandomColor() {
    let r = Math.floor(Math.random() * 256);
    let g = Math.floor(Math.random() * 256);
    let b = Math.floor(Math.random() * 256);
    color = `rgb(${r}, ${g}, ${b})`;
}

let gridContainer = document.querySelector("#grid-container");
let gridRange = document.querySelector("#grid-range");
let gridRangeLabel = document.querySelector("#grid-range-label");
let colorpicker = document.querySelector("#colorpicker");
let rainbowBtn = document.querySelector("#rainbow");
let gridLinesBtn = document.querySelector("#grid-lines");
let eraserBtn = document.querySelector("#eraser");
let clearBtn = document.querySelector("#clear");
let mouseDown = false;  
let color = colorpicker.value;

document.addEventListener("DOMContentLoaded", fillGrid);
gridRange.addEventListener("input", fillGrid);
clearBtn.addEventListener("click", fillGrid);
gridContainer.addEventListener("mouseover", colorGrid);
gridContainer.addEventListener("mousedown", colorGrid);
document.addEventListener("mouseup", () => mouseDown = false);

colorpicker.addEventListener("input", () => {
    if (rainbowBtn.classList.contains("clicked")) rainbowBtn.classList.toggle("clicked");
    if (eraserBtn.classList.contains("clicked")) eraserBtn.classList.toggle("clicked");
    color = colorpicker.value;
});

rainbowBtn.addEventListener("click", () => {
    rainbowBtn.classList.toggle("clicked");
    if (!eraserBtn.classList.contains("clicked")) color = colorpicker.value;
    if (eraserBtn.classList.contains("clicked")) eraserBtn.classList.toggle("clicked");
});

gridLinesBtn.addEventListener("click", () => {
    gridLinesBtn.classList.toggle("clicked");  
    gridContainer.childNodes.forEach(gridSquare => gridSquare.classList.toggle("grid-border"));
});

eraserBtn.addEventListener("click", () => {
    eraserBtn.classList.toggle("clicked");
    eraserBtn.classList.contains("clicked") ? color = "#eed9c4" : color = colorpicker.value;
    if (rainbowBtn.classList.contains("clicked")) rainbowBtn.classList.toggle("clicked");
});