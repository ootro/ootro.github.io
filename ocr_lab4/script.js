//[task 1]/////////////////////////////////////////////////////////////////////////////////////////////////////
const block1 = document.getElementById("header");
const block2 = document.getElementById("menu");
const block3 = document.getElementById("content");
const block4 = document.getElementById("сontent-right");
const block5 = document.getElementById("content-bottom");
const block6 = document.getElementById("footer");

const delay = 5000;

let blocks = [block1, block2, block3, block4, block5, block6];
let blocksHtml = [];

for (let i = 0; i < blocks.length; i++) {
    blocksHtml.push(blocks[i].innerHTML);
}

function changeBlocks() {
    for (let i = 0; i < 6; i++) {
        setTimeout(() => {
            blocks[i].innerHTML = i === 5 ? blocksHtml[0] : blocksHtml[i + 1];
        }, 5000 + i * delay);
    }
}
//changeBlocks();
//[task 2]/////////////////////////////////////////////////////////////////////////////////////////////////////
function textBlink() {
    let counter = 1;
    let timerID = setInterval(setColor, 5000);
    function setColor() {
        if (counter % 2 === 1) {
            document.getElementById("сontent-right").style.color = 'red';
        }
        else {
            document.getElementById("сontent-right").style.color = 'black';
        }
        counter += 1;
    }
}

textBlink();

let counter = 0;
function OnMouseOverHandler() {
    let timerID = setTimeout(setColor, 5000);
    function setColor() {
        if (counter % 2 === 1) {
            document.getElementById("header").style.color = 'red';
            document.getElementById("footer").style.color = 'red';
        }
        else {
            document.getElementById("header").style.color = 'black';
            document.getElementById("footer").style.color = 'black';
        }
    }
    counter++;
}

//[task 3]/////////////////////////////////////////////////////////////////////////////////////////////////////
let button = document.getElementById("button_edit");
button.addEventListener("click", formHandler);
// checkRepository();
// commitMessage();
// errorMessage();
function formHandler() {
    let accValue = document.getElementById("account");
    let repValue = document.getElementById("repository");
    console.log(accValue.value);
    console.log(repValue.value);
    checkRepository(accValue.value, repValue.value);
}

async function checkRepository(login, repository) {
    let url = `https://api.github.com/repos/${login}/${repository}/commits`;
    let response = await fetch(url);

    console.log(response.status);
    console.log(response.ok);
    let commits = await response.json();
    console.log(commits);
    if (response.ok) {
        commitMessage(commits);
    }
    else {
        errorMessage(response.status);
    }
}

function commitMessage(data) {
    debugger;
    if (document.getElementById("content").lastElementChild.tagName == "DIV") {
        document.getElementById("content").lastElementChild.remove();
    }
    if (document.getElementById("content").lastElementChild.tagName == "UL") {
        document.getElementById("content").lastElementChild.remove();
    }
    let ul = document.createElement("ul");
    ul.style = "list-style: none;";
    document.getElementById("content").append(ul);
    for (let item of data) {
        ul.insertAdjacentHTML('afterbegin', `<li>${item.commit.author.name} : ${item.commit.message}</li>`);
    }

}

function errorMessage(type_erorr) {
    debugger;
    if (document.getElementById("content").lastElementChild.tagName == "UL") {
        document.getElementById("content").lastElementChild.remove();
    }
    if (document.getElementById("content").lastElementChild.tagName == "DIV") {
        document.getElementById("content").lastElementChild.remove();
    }

    let div = document.createElement("div");
    div.style = "background: #ffb09f; border: 1px solid; color: red; text-align: center; width: 125px; padding: 5px 0px; margin: 5px;";
    div.innerHTML = `<b>Error: ${type_erorr}</b>`;
    document.getElementById("content").append(div);

}

//[task 4]/////////////////////////////////////////////////////////////////////////////////////////////////////
let foo1 = () => console.log("1st callback")
let foo2 = () => console.log("2st callback")
function callbackFunction(callback1, callback2) {
    callback1();
    callback2();
}

callbackFunction(foo1, foo2);

//[task 5]/////////////////////////////////////////////////////////////////////////////////////////////////////
function selectionSort(arr) {
    let n = arr.length;

    for (let i = 0; i < n; i++) {
        let min = i;
        for (let j = i + 1; j < n; j++) {
            if (arr[j] < arr[min]) {
                min = j;
            }
        }
        if (min != i) {
            let tmp = arr[i];
            arr[i] = arr[min];
            arr[min] = tmp;
        }
    }
    return arr;
}

function sortHandler() {
    let line = document.getElementById('sortForm').value;
    let regex = new RegExp(/\d+/g);
    let arrOfNumbers;
    let arr = [];
    while ((arrOfNumbers = regex.exec(line)) != null) {
        arr.push(Number(arrOfNumbers[0]));
    }
    //console.log(arr);
    //console.log(selectionSort(arr));
    alert(selectionSort(arr));
}