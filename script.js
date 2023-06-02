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

function addColor(e) {
    // event delegation is used for the dynamically created grid
    const target = e.target.closest(".grid-item");

    if (target) {
        if (e.type === "mouseover" && mouseDownFlag === false) return;

        // checking eraser and rainbow flags
        if (eraserFlag === true) {
            target.style.backgroundColor = "white";
            return;
        } else if (rainbowFlag === true) {
            target.style.backgroundColor = getRainbowColor();
            return;
        } else {
            target.style.backgroundColor = gridColor; 
        }
    }
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
    let gridContainerItems = gridContainer.childNodes;

    // if statement will run if function is called from updateGridSize
    // checks to see if grid lines button is clicked. If clicked, then re-adds grid lines
    if (newGridSize) {
        if (gridLinesButton.classList.contains("clicked-button")) {
            gridContainerItems.forEach(gridItem => gridItem.classList.toggle("grid-lines"));       
        }
        return;
    }

    gridLinesButton.classList.toggle("clicked-button");
    gridContainerItems.forEach(gridItem => gridItem.classList.toggle("grid-lines"));
}

function toggleEraser() {
    // need to toggle rainbow button if it is clicked
    if (rainbowFlag) toggleRainbow();

    eraserFlag = !eraserFlag;
    eraserButton.classList.toggle("clicked-button");
}

function clearGrid() {
    let gridContainerItems = gridContainer.childNodes;
    gridContainerItems.forEach(gridItem => gridItem.style.backgroundColor = "white");
}

function updateGridSize(e) {
    let gridSizeValue = e.target.value;
    
    // updating the displayed grid size underneath the range button
    gridSize.textContent = `${gridSizeValue} x ${gridSizeValue}`;

    // updating the actual grid size 
    populateGrid(gridSizeValue);
    toggleGridLines(true);
}

let mouseDownFlag = false;
let gridColor = "black";
let rainbowFlag = false;
let eraserFlag = false;
let gridContainer = document.querySelector("#grid-container");
let colorpicker = document.body.querySelector("#colorpicker");
let rainbowButton = document.body.querySelector("#rainbow-button");
let gridLinesButton = document.body.querySelector("#grid-lines-button");
let eraserButton = document.body.querySelector("#eraser-button");
let clearButton = document.body.querySelector("#clear-button");
let gridSizeToggle = document.querySelector("#grid-size-toggle");
let gridSize = document.querySelector("#grid-size");

document.body.addEventListener("mousedown", () => {mouseDownFlag = true;});
document.body.addEventListener("mouseup", () => {mouseDownFlag = false;});
document.body.addEventListener("mousedown", addColor);
document.body.addEventListener("mouseover", addColor);
colorpicker.addEventListener("input", () => gridColor = colorpicker.value);
rainbowButton.addEventListener("click", toggleRainbow);
// arrow function is used so that the default event argument is not passed
gridLinesButton.addEventListener("click", () => {toggleGridLines();});
eraserButton.addEventListener("click", toggleEraser);
clearButton.addEventListener("click", clearGrid);
gridSizeToggle.addEventListener("input", updateGridSize);

populateGrid();