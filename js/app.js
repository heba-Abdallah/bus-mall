'use strict';

let photoElement = document.getElementById('photos-div');


let maxAttempts = 25;
let counter = 0;

let photoArr = [];

let leftPhotoIndex;
let middlePhotoIndex;
let rightPhotoIndex;

let namesArr = [];
let votesArr = [];
let timesItShownArr = [];

function Product(name, path,votes,timesItShown) {
    this.name = name;
    this.source = path;
    this.votes = 0;
    this.timesItShown = 0;
    Product.allProducts.push(this)
    namesArr.push(this.name)

}

Product.allProducts = [];

new Product('bag', 'img/bag.jpg');
new Product('banana', 'img/banana.jpg');
new Product('bathroom', 'img/bathroom.jpg');
new Product('boots', 'img/boots.jpg');
new Product('breakfast', 'img/breakfast.jpg');
new Product('bubblegum', 'img/bubblegum.jpg');
new Product('chair', 'img/chair.jpg');
new Product('cthulhu', 'img/cthulhu.jpg');
new Product('dog-duck', 'img/dog-duck.jpg');
new Product('dragon', 'img/dragon.jpg');
new Product('pen', 'img/pen.jpg');
new Product('pet-sweep', 'img/pet-sweep.jpg');
new Product('scissors', 'img/scissors.jpg');
new Product('shark', 'img/shark.jpg');
new Product('sweep', 'img/sweep.png');
new Product('tauntaun', 'img/tauntaun.jpg');
new Product('unicorn', 'img/unicorn.jpg');
new Product('usb', 'img/usb.gif');
new Product('water-can', 'img/water-can.jpg');
new Product('wine-glass', 'img/wine-glass.jpg');

// console.log(Product.allProducts);


function mallStorage() {
    let arrayString = JSON.stringify(Product.allProducts);

    console.log('hi', Product.allProducts);
    console.log('hello', arrayString);


    localStorage.setItem('user', arrayString);

}

function mallOrder() {
    let data = localStorage.getItem('user');
    console.log('data', data);
    let mallData = JSON.parse(data);
    console.log('mall', mallData);

    if (mallData !== null) {
        Product.allProducts = mallData;
    }
    renderThreePhotos();
}

function generateRandomIndex() {
    return Math.floor(Math.random() * Product.allProducts.length);

}
// console.log(generateRandomIndex());



function renderThreePhotos() {
    leftPhotoIndex = generateRandomIndex();
    middlePhotoIndex = generateRandomIndex();
    rightPhotoIndex = generateRandomIndex();

    while (leftPhotoIndex === middlePhotoIndex || middlePhotoIndex === rightPhotoIndex || leftPhotoIndex === rightPhotoIndex || photoArr.includes(leftPhotoIndex) || photoArr.includes(middlePhotoIndex) || photoArr.includes(rightPhotoIndex)) {
        leftPhotoIndex = generateRandomIndex();
        middlePhotoIndex = generateRandomIndex();
        rightPhotoIndex = generateRandomIndex();

    }
    // console.log('left', Product.allProducts[leftPhotoIndex].source);
    // console.log('middel', Product.allProducts[middlePhotoIndex].source);
    // console.log('right', Product.allProducts[rightPhotoIndex].source);





    let leftElement = document.getElementById('left-photo');
    leftElement.src = Product.allProducts[leftPhotoIndex].source;
    photoElement.appendChild(leftElement);
    Product.allProducts[leftPhotoIndex].timesItShown++;

    let middleElement = document.getElementById('middle-photo');
    photoElement.appendChild(middleElement);
    middleElement.src = Product.allProducts[middlePhotoIndex].source;
    Product.allProducts[middlePhotoIndex].timesItShown++;

    let rightElement = document.getElementById('right-photo');
    photoElement.appendChild(rightElement);
    rightElement.src = Product.allProducts[rightPhotoIndex].source;
    Product.allProducts[rightPhotoIndex].timesItShown++;
    photoArr = [];
    photoArr.push(leftPhotoIndex, middlePhotoIndex, rightPhotoIndex);

    console.log('allPhoto', photoArr);

    
}
renderThreePhotos();






photoElement.addEventListener('click', handleUserClick);

function handleUserClick(event) {

    counter++;
    // console.log("hello", event.target.id);

    if (counter <= maxAttempts) {

        if (event.target.id === 'left-photo') {
            Product.allProducts[leftPhotoIndex].votes++;


        } else if (event.target.id === 'middle-photo') {
            Product.allProducts[middlePhotoIndex].votes++;

        } else if (event.target.id === 'right-photo') {
            Product.allProducts[rightPhotoIndex].votes++;

        } else {
            counter--;
        }

        renderThreePhotos();

        // console.log(counter);

    } else {
        photoElement.removeEventListener('click', handleUserClick);

        let list = document.getElementById('results-list');

        let btn = document.getElementById('View-Results');
        btn.hidden = false;
        for (let i = 0; i < Product.allProducts.length; i++) {
            votesArr.push(Product.allProducts[i].votes);
            timesItShownArr.push(Product.allProducts[i].timesItShown);

        }
        // console.log(votesArr);
        // console.log(timesItShownArr);

        chart();

        btn.addEventListener('click', creatResults)

        function creatResults(event) {

            // console.log("hi",event.target.id);
            for (let i = 0; i < Product.allProducts.length; i++) {

                let productsResults = document.createElement('li');

                list.appendChild(productsResults);

                productsResults.textContent = `${Product.allProducts[i].name} has ${Product.allProducts[i].votes} votes,and was seen ${Product.allProducts[i].timesItShown} times`
            }
            btn.removeEventListener('click', creatResults)

        }




    }
    mallStorage();
}

// chart.js
function chart() {
    let ctx = document.getElementById('myChart').getContext('2d');

    let chart = new Chart(ctx, {
        // what type is the chart
        type: 'bar',

        //  the data for showing
        data: {
            //  for the names
            labels: namesArr,

            datasets: [
                {
                    label: 'User votes',
                    data: votesArr,
                    backgroundColor: [
                        '#ead3cb',
                    ],

                    borderWidth: 1
                },

                {
                    label: 'Products shown',
                    data: timesItShownArr,
                    backgroundColor: [
                        '#845460',
                    ],

                    borderWidth: 1
                }

            ]
        },
        options: {}
    });

}
mallOrder();