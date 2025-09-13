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

 getDivSize(getDivs(16), 16);
/*GET size based on user input */

const input = document.querySelector("#input");
function getSizeOnUserInput(){
    gridContainer.innerHTML = "";
    let num = +input.value;
    if(typeof(num) !== "number"){
        alert("Please enter a number");
    }
    getDivSize(getDivs(num), num);
}

input.addEventListener("change", getSizeOnUserInput);


