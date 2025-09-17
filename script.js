//#region GRID SETTINGS
const grid = document.querySelector(".grid");

let gridWidth = grid.clientWidth;
let gridHeight = grid.clientHeight;

//#endregion GRID SETTINGS

//#region BUTTONS
const solidModeBtn = document.querySelector(".solid-mode-button");
const transparentModeBtn = document.querySelector(".transparent-mode-button");

const blackColorBtn = document.querySelector(".black-color-button");
const rgbColorBtn = document.querySelector(".rgb-color-button");

const resizeBtn = document.querySelector(".resize-button");
resizeBtn.addEventListener("click", () => resizeGrid());

//#endregion BUTTONS

let windowResized = false; 
window.addEventListener("resize", () => resizeAlert());

resetGrid();
drawGrid(16);

// FUNCTIONS

function incrementAlpha(elem) {
    const computedElem = window.getComputedStyle(elem);
    console.log(computedElem.getPropertyValue("color"));
}

function resizeGrid() {
    const querySize = prompt("Enter your desired grid size from 1 - 100.");
    resetGrid();
    drawGrid(querySize);
}

function drawGrid(size) {
    gridWidth = grid.clientWidth;
    gridHeight = grid.clientHeight;

    unitWidth = gridWidth / size;
    unitHeight = gridHeight / size;
    
    for (let i = 0; i < size * size; i++){
        const unit = document.createElement("div");
        unit.setAttribute("class", "grid-unit");

        unit.style.setProperty("--unit-width", `${unitWidth}px`);
        unit.style.setProperty("--unit-height", `${unitHeight}px`);

        unit.addEventListener("mouseenter", (e) => incrementAlpha(e.target))
    
        grid.appendChild(unit);
    }
}

function resetGrid() {
    if (!grid.firstChild) return;

    while (grid.firstChild) {
    grid.removeChild(grid.firstChild);
   }
}

function resizeAlert() {
    resetGrid();
    drawGrid(16)
}



