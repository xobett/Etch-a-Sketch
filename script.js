// GRID SETTINGS
const grid = document.querySelector(".grid");

const gridWidth = grid.clientWidth;
const gridHeight = grid.clientHeight;

// BUTTONS
const solidModeBtn = document.querySelector(".solid-mode-button");
const transparentModeBtn = document.querySelector(".transparent-mode-button");

const blackColorBtn = document.querySelector(".black-color-button");
const rgbColorBtn = document.querySelector(".rgb-color-button");

solidModeBtn.addEventListener("click", () => resetGrid())


drawGrid(16)

function drawGrid(size) {
    unitWidth = gridWidth / size;
    unitHeight = gridHeight / size;
    
    for (let i = 0; i < size * size; i++){
        const unit = document.createElement("div");
        unit.setAttribute("class", "grid-unit");


        unit.style.setProperty("--unit-width", `${unitWidth}px`);
        unit.style.setProperty("--unit-height", `${unitHeight}px`);
    
        grid.appendChild(unit);
    }
}

function resetGrid() {
    if (!grid.firstChild) return;

    while (grid.firstChild) {
    grid.removeChild(grid.firstChild);
   }
}

let windowResized = false; 

function resizeAlert() {
    if (windowResized) return;
    windowResized = true;

    alert("Page will refresh to update grid size.");
    location.reload();
}

window.addEventListener("resize", () => resizeAlert());


