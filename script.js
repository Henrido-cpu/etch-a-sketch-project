const gridContainer = document.querySelector(".grid-container");
/*
GET amount of divs defined by INPUT number
and append on container.
*/

function getDivs(num){
    let divArr = [];
    if(num > 100){
        return alert("ERROR, can't get a size more than 100 x 100");
    }
    for(i = 0; i < num * num; i++){      
        const div = document.createElement("div");
        divArr.push(div);
    }
    return divArr;
}


function getDivSize(arr, num){
    let gridContainerWidth = gridContainer.offsetWidth;
    arr.forEach(div => {
        div.className = "grid-item";
        gridContainer.appendChild(div);
        div.style.width = `${gridContainerWidth / num}px`
        div.style.height = `${gridContainerWidth / num}px`
    })
    return gridContainerWidth;
}
/*
GET default size
*/
 getDivSize(getDivs(16), 16);

/*GET size based on user input */

const input = document.querySelector("#input");
function getSizeOnUserInput(){
    gridContainer.innerHTML = "";
    let num = +input.value;
    if(!num){
        getDivSize(getDivs(16), 16);
    }
    getDivSize(getDivs(num), num);
}

input.addEventListener("change", getSizeOnUserInput);


/*
IMPLEMENT draw function
foreach div in div arr returned addeventlistener onmousedown
and change color for div
*/
/*
GET colors
*/
let color = "black";


const colorButtons = document.querySelectorAll(".color-picker button");
colorButtons.forEach(button => {
    button.addEventListener("click", ()=>{
        eraserModeOn = false;
        rainbowModeOn = false;
        shadowModeOn = false;
        color = "";
        color += button.className;
    })
})


function drawOnDivs(e){
    console.log(e.target);
    if(e.target.style.opacity === ""){
        e.target.style.opacity = 1;
    }
    if(shadowModeOn && e.target.className !== "grid-container"){
        color = e.target.style.backgroundColor;
        if(e.target.style.opacity > 0){
            e.target.style.opacity -= 0.1;
        }
    }
    if(!shadowModeOn){
        e.target.style.opacity = 1;
    }
    console.log(color);
    if(rainbowModeOn){
        e.target.style.opacity = 1;
        color = "";
        color += returnRandomRgb();
    }
    if(eraserModeOn){
        color = "";
        color = "white";
        e.target.style.opacity = 1;
    }
    if(e.target.className !== "grid-container"){
        e.target.style.backgroundColor = color;
    }
}


gridContainer.addEventListener("mousedown", (e) =>{
    e.preventDefault();
    gridContainer.addEventListener("mousemove", drawOnDivs);
    gridContainer.addEventListener("mouseup", (e)=>{
        gridContainer.removeEventListener("mousemove", drawOnDivs);
    })
});

gridContainer.addEventListener("click", drawOnDivs);

/*
GET eraser and trashcan and CREATE function to handle logic
*/
let eraserModeOn = false;

const eraser = document.querySelector(".eraser");
const trashcan = document.querySelector(".trashcan");
eraser.addEventListener("click", (e)=>{
    e.preventDefault();
    color = "white";
    eraserModeOn = true;
})

const clearBtn = document.querySelector(".delete");
clearBtn.addEventListener("click", ()=>{
    const divs = document.querySelectorAll(".grid-item");
    divs.forEach(div => {
        div.style.backgroundColor = "white"
        div.style.opacity = 1;
    });
})


/*
GET random color and enable rainbow mode based on click of button
*/
let rainbowModeOn = false;

function randomNumber(){
let random = Math.floor(Math.random() * 255); 
return random;
}

function returnRandomRgb(){
    return `rgb(${randomNumber()}, ${randomNumber()}, ${randomNumber()})`; 
}
    const randomColorBtn = document.querySelector(".rainbow");
    randomColorBtn.addEventListener("click", () =>{
        eraserModeOn = false;
        shadowModeOn = false;
        rainbowModeOn = true;
    })


/*
GET shadow button and transform opacity of color based on interaction
*/
let shadowModeOn = false;

const shadowBtn = document.querySelector(".shadow");
shadowBtn.addEventListener("click", ()=>{
    shadowModeOn = true;
    rainbowModeOn = false;
})