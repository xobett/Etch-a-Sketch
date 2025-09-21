//#region GRID SETTINGS
const grid = document.querySelector(".grid");

let targetGridSize;
let transparencyMode = true;
//#endregion GRID SETTINGS

//#region BUTTONS
const solidModeBtn = document.querySelector(".solid-mode-button");
const transparentModeBtn = document.querySelector(".transparent-mode-button");

const blackColorBtn = document.querySelector(".black-color-button");
const rgbColorBtn = document.querySelector(".rgb-color-button");

const resizeBtn = document.querySelector(".resize-button");
//#endregion BUTTONS

//#region COLOR SETTINGS
let targetColor;
let rgbColorMode = false;

const blackColor = "rgba(0, 0, 0, 1)";
const whiteColor = "rgb(255, 255, 255)";
//#endregion

targetGridSize = 16;
targetColor = blackColor;

assignEventListeners();
resetGrid();

//#region FUNCTIONS
function assignEventListeners() {
    solidModeBtn.addEventListener("click", () => enableTransparency(false));
    transparentModeBtn.addEventListener("click", () => enableTransparency(true));

    blackColorBtn.addEventListener("click", () => enableRgb(false));
    rgbColorBtn.addEventListener("click", () => enableRgb(true));

    resizeBtn.addEventListener("click", () => resizeGrid());

    window.addEventListener("resize", () => resetGrid());
}

function interactWithGrid(elem) {
    const computedElem = window.getComputedStyle(elem);
    const color = computedElem.getPropertyValue("background-color");
    
    let newColor;
    
    if (color === whiteColor) {
        targetColor = rgbColorMode ? getRandomColor() : blackColor;
        let rgbValues = getRgbValues(targetColor);
        
        newColor = `rgba(${rgbValues[0]}, ${rgbValues[1]}, ${rgbValues[2]}, ${transparencyMode ? 0.1 : 1})`;
    }
    else {
        if (!transparencyMode) return;
        
        let rgbValues = getRgbValues(color);
        rgbValues[3] = Math.min(rgbValues[3] + 0.1, 1);
        
        newColor = `rgba(${rgbValues[0]}, ${rgbValues[1]}, ${rgbValues[2]}, ${rgbValues[3]})`;
    }
    
    elem.style.backgroundColor = newColor;
}

function resizeGrid() {
    size = prompt("Enter your desired grid size from 1 - 100. \nDefault size will be set to 16");
    
    console.log(size);
    targetGridSize = size < 1 ? 16 : size > 100 ? 100 : size;
    
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

function enableRgb(value) {
    rgbColorMode = value;

    resetGrid();
}

function enableTransparency(value) {
    transparencyMode = value;

    resetGrid();
}

function getRgbValues(color){
    let values = [];

    if (color.startsWith("rgb(")) {
            values = color.match(/\d+/g).map(Number);
            values.push(1);
    }
    else if (color.startsWith("rgba(")) {
            values = color.match(/[\d.]+/g).map(Number);
    }

    return values;
}

function getRandomColor() {
    let r, g, b;

    r = Math.floor(Math.random() * 256);
    g = Math.floor(Math.random() * 256);
    b = Math.floor(Math.random() * 256);
    
    return `rgba(${r}, ${g}, ${b}, 1)`;
}
//#endregion FUNCTIONS