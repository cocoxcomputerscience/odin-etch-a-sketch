function fillGrid() {
    let size = gridRange.value;
    gridRangeLabel.textContent = `${size} x ${size}`;

    // remove divs before inserting new ones
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

function changeColor() {
    if (rainbowBtn.classList.contains("clicked")) rainbowBtn.classList.toggle("clicked");
    if (eraserBtn.classList.contains("clicked")) eraserBtn.classList.toggle("clicked");
    color = colorpicker.value;
}

function toggleGridLines() {
    gridLinesBtn.classList.toggle("clicked");  
    gridContainer.childNodes.forEach(gridSquare => gridSquare.classList.toggle("grid-border"));
}

function toggleRainbow() {
    rainbowBtn.classList.toggle("clicked");
    if (!eraserBtn.classList.contains("clicked")) color = colorpicker.value;
    if (eraserBtn.classList.contains("clicked")) eraserBtn.classList.toggle("clicked");
}

function toggleEraser() {
    eraserBtn.classList.toggle("clicked");
    eraserBtn.classList.contains("clicked") ? color = "white" : color = colorpicker.value;
    if (rainbowBtn.classList.contains("clicked")) rainbowBtn.classList.toggle("clicked");
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

gridRange.addEventListener("input", fillGrid);
document.addEventListener("DOMContentLoaded", fillGrid);
gridContainer.addEventListener("mouseover", colorGrid);
gridContainer.addEventListener("mousedown", colorGrid);
document.addEventListener("mouseup", () => mouseDown = false);
rainbowBtn.addEventListener("click", toggleRainbow);
colorpicker.addEventListener("input", changeColor);
gridLinesBtn.addEventListener("click", toggleGridLines);
eraserBtn.addEventListener("click", toggleEraser);
clearBtn.addEventListener("click", fillGrid);