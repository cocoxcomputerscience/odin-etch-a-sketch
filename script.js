function populateGrid(size = 16) {
    // will delete all child elements of gridContainer if grid size is updated
    if (gridContainer.children.length) gridContainer.innerHTML = "";

    // update grid-container grid template rows and columns
    gridContainer.style.gridTemplateRows = `repeat(${size}, 1fr)`;
    gridContainer.style.gridTemplateColumns = `repeat(${size}, 1fr)`;
    
    let area = size * size;
    for (let i = 0; i < area; i++) {
        let gridItem = document.createElement("div");
        gridContainer.appendChild(gridItem);
    }
}

function addColor(e) {
    // event delegation is used for the dynamically created grid
    const target = e.target.closest("#grid-container > div");

    if (target) {
        if (e.type === "mouseover" && !mouseDownFlag) return;

        // checking flags
        if (eraserFlag) target.style.backgroundColor = "white";
        else if (rainbowFlag) target.style.backgroundColor = getRainbowColor();
        else target.style.backgroundColor = gridColor; 
    }
}

function changeColor() {
    // need to toggle buttons if it is clicked
    if (eraserFlag) toggleEraser();
    if (rainbowFlag) toggleRainbow();

    gridColor = colorpicker.value;
}

function toggleRainbow() {
    // need to toggle eraser button if it is clicked
    if (eraserFlag) toggleEraser();

    rainbowFlag = !rainbowFlag;
    rainbowButton.classList.toggle("clicked-button");
}

function getRainbowColor() {
    let rainbowColor = "#" + Math.floor(Math.random() * 16777215).toString(16);
    return rainbowColor;
}

function toggleGridLines(newGridSize = false) {
    // if gridLinesButton is clicked, class is toggled
    if (!newGridSize) gridLinesButton.classList.toggle("clicked-button");

    // if gridLinesButton is not in clicked state and function was called by updating grid size, then return
    if (newGridSize && !gridLinesButton.classList.contains("clicked-button")) return;

    let gridContainerItems = gridContainer.children;
    let size = gridSizeInput.value;
    let area = size * size;
    let gridBottom = area - size;
    let gridLastSquare = area - 1;
    for (let i = 0; i < area; i++) {
        // different gridItems have different border sides colored
        if (i === gridLastSquare) continue;
        else if ((i + 1) % size === 0) gridContainerItems[i].classList.toggle("grid-lines-bottom");
        else if(i >= gridBottom && i < area) gridContainerItems[i].classList.toggle("grid-lines-right");
        else gridContainerItems[i].classList.toggle("grid-lines-bottom-right");
    }
}

function toggleEraser() {
    // need to toggle rainbow button if it is clicked
    if (rainbowFlag) toggleRainbow();

    eraserFlag = !eraserFlag;
    eraserButton.classList.toggle("clicked-button");
}

function clearGrid() {
    // need to toggle eraser button if it is clicked
    if (eraserFlag) toggleEraser();
    
    let gridContainerItems = Array.from(gridContainer.children);
    gridContainerItems.forEach(gridItem => gridItem.style.backgroundColor = "white");
}

function updateGridSize(e) {  
    let gridSizeValue = e.target.value;
    
    // updating the displayed grid size underneath the range button
    gridSizeDisplay.textContent = `${gridSizeValue} x ${gridSizeValue}`;

    // updating the actual grid size 
    populateGrid(gridSizeValue);
    toggleGridLines(true);
}

let gridColor = "#000000";
let mouseDownFlag = false;
let rainbowFlag = false;
let eraserFlag = false;
let gridContainer = document.querySelector("#grid-container");
let colorpicker = document.body.querySelector("#colorpicker");
let rainbowButton = document.body.querySelector("#rainbow-button");
let gridLinesButton = document.body.querySelector("#grid-lines-button");
let eraserButton = document.body.querySelector("#eraser-button");
let clearButton = document.body.querySelector("#clear-button");
let gridSizeInput = document.querySelector("#grid-size-input");
let gridSizeDisplay = document.querySelector("#grid-size-display");

// need to add preventDefault so that holding the mouse down will not drag the grid container or items inside
gridContainer.addEventListener("mousedown", (e) => e.preventDefault());
document.body.addEventListener("mousedown", () => {mouseDownFlag = true;});
document.body.addEventListener("mouseup", () => {mouseDownFlag = false;});
document.body.addEventListener("mousedown", addColor);
document.body.addEventListener("mouseover", addColor);
colorpicker.addEventListener("input", changeColor);
rainbowButton.addEventListener("click", toggleRainbow);
// arrow function is used so that the default event argument is not passed
gridLinesButton.addEventListener("click", () => {toggleGridLines();});
eraserButton.addEventListener("click", toggleEraser);
clearButton.addEventListener("click", clearGrid);
gridSizeInput.addEventListener("input", updateGridSize);

populateGrid();