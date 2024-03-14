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
}

let gridContainer = document.querySelector("#grid-container");
let gridRange = document.querySelector("#grid-range");
let gridRangeLabel = document.querySelector("#grid-range-label");

gridRange.addEventListener("input", fillGrid);
document.addEventListener("DOMContentLoaded", fillGrid);
