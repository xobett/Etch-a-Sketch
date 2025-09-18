//#region GRID SETTINGS
const grid = document.querySelector(".grid");

//#endregion GRID SETTINGS

//#region BUTTONS
const solidModeBtn = document.querySelector(".solid-mode-button");
const transparentModeBtn = document.querySelector(".transparent-mode-button");

const blackColorBtn = document.querySelector(".black-color-button");
const rgbColorBtn = document.querySelector(".rgb-color-button");

const resizeBtn = document.querySelector(".resize-button");

//#endregion BUTTONS

let transparencyMode = true;
let rgbMode = false;

const blackColor = "rgba(0, 0, 0, 1)";

let targetGridSize = 10;
let targetColor = blackColor;

blackColorBtn.addEventListener("click", () => modifyRgbState(false));
rgbColorBtn.addEventListener("click", () => modifyRgbState(true));
resizeBtn.addEventListener("click", () => resizeGrid());

window.addEventListener("resize", () => resetGrid());

resetGrid();


function interactWithGrid(elem) {
    const computedElem = window.getComputedStyle(elem);
    const color = computedElem.getPropertyValue("background-color");

    targetColor = rgbMode ? getRandomColor() : blackColor;
    let rgbValues;

    if (transparencyMode) {
        
        if (color.startsWith("rgb(")) {
            rgbValues = color.match(/\d+/g).map(Number);
            rgbValues.push(1);
        }
        else if (color.startsWith("rgba(")) {
            rgbValues = color.match(/[\d.]+/g).map(Number);
        }
    }

    console.log(rgbValues);

    if (color === "rgb(255, 255, 255)") {
        elem.style.backgroundColor = targetColor;
    }
}

//#region FUNCTIONS

function resizeGrid() {
    targetGridSize = prompt("Enter your desired grid size from 1 - 100.");
    resetGrid();
}

function drawGrid(size) {
    let gridWidth = grid.clientWidth;
    let gridHeight = grid.clientHeight;

    unitWidth = gridWidth / size;
    unitHeight = gridHeight / size;
    
    for (let i = 0; i < size * size; i++){
        const unit = document.createElement("div");
        unit.setAttribute("class", "grid-unit");

        unit.style.setProperty("--unit-width", `${unitWidth}px`);
        unit.style.setProperty("--unit-height", `${unitHeight}px`);

        unit.addEventListener("mouseenter", (e) => interactWithGrid(e.target))
    
        grid.appendChild(unit);
    }
}

function resetGrid() {
    if (grid.firstChild) {
            while (grid.firstChild) {
                grid.removeChild(grid.firstChild);
           }
    }

   drawGrid(targetGridSize);
}

function selectColor(colorValue){
    targetColor = colorValue;
}

function modifyRgbState(value) {
    rgbMode = value;

    resetGrid();
}

function toggleTransparencyMode() {
    transparencyMode = !transparencyMode;
}

function getRandomColor() {
    let r, g, b;

    r = Math.floor(Math.random() * 256);
    g = Math.floor(Math.random() * 256);
    b = Math.floor(Math.random() * 256);
    
    return `rgba(${r}, ${g}, ${b}, 1)`;
}
//#endregion FUNCTIONS