'use strict';

let photoElement = document.getElementById('photos-div');


let maxAttempts = 10;
let counter = 0;

let leftPhotoIndex;
let middelPhotoIndex;
let rightPhotoIndex;
let namesArr=[];
let votesArr=[];
let timesItShownArr=[];

function Product(name, path) {
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

console.log(Product.allProducts);

function generateRandomIndex() {
    return Math.floor(Math.random() * Product.allProducts.length);

}
console.log(generateRandomIndex());

function renderThreePhotos() {
    leftPhotoIndex = generateRandomIndex();
    middelPhotoIndex = generateRandomIndex();
    rightPhotoIndex = generateRandomIndex();

    while ((leftPhotoIndex === middelPhotoIndex) || (middelPhotoIndex === rightPhotoIndex) || (leftPhotoIndex === rightPhotoIndex)) {
        leftPhotoIndex = generateRandomIndex();
        middelPhotoIndex = generateRandomIndex();
        rightPhotoIndex = generateRandomIndex();


    }
    console.log('left', Product.allProducts[leftPhotoIndex].source);
    console.log('middel', Product.allProducts[middelPhotoIndex].source);
    console.log('right', Product.allProducts[rightPhotoIndex].source);

    let leftElement = document.getElementById('left-photo');
    leftElement.src = Product.allProducts[leftPhotoIndex].source;
    photoElement.appendChild(leftElement);
    Product.allProducts[leftPhotoIndex].timesItShown++;

    let middelElement = document.getElementById('middel-photo');
    photoElement.appendChild(middelElement);
    middelElement.src = Product.allProducts[middelPhotoIndex].source;
    Product.allProducts[middelPhotoIndex].timesItShown++;

    let rightElement = document.getElementById('right-photo');
    photoElement.appendChild(rightElement);
    rightElement.src = Product.allProducts[rightPhotoIndex].source;
    Product.allProducts[rightPhotoIndex].timesItShown++;
}
renderThreePhotos();






photoElement.addEventListener('click', handleUserClick);

function handleUserClick(event) {

    counter++;
    console.log(event.target.id);

    if (counter <= maxAttempts) {

        if (event.target.id === 'left-photo') {
            Product.allProducts[leftPhotoIndex].votes++;


        } else if (event.target.id === 'middel-photo') {
            Product.allProducts[middelPhotoIndex].votes++;

        } else {
            Product.allProducts[rightPhotoIndex].votes++;

        }

        renderThreePhotos();

        console.log(counter);

    } else {
        photoElement.removeEventListener('click', handleUserClick);

        let list = document.getElementById('results-list');

        let btn = document.getElementById('View Results');
        btn.hidden=false;
        for (let i = 0; i < Product.allProducts.length; i++) {
            votesArr.push(Product.allProducts[i].votes);
            timesItShownArr.push(Product.allProducts[i].timesItShown);
            
          }
          console.log(votesArr);
        //   console.log(timesItShown);

          chart();

        btn.addEventListener('click', creatResults)

        function creatResults(event) {

            console.log(event.target.id);
            for (let i = 0; i < Product.allProducts.length; i++) {

                let productsResults = document.createElement('li');

                list.appendChild(productsResults);

                productsResults.textContent = `${Product.allProducts[i].name} has ${Product.allProducts[i].votes} votes,and was seen ${Product.allProducts[i].timesItShown} times`
            }
            btn.removeEventListener('click', creatResults)

        }




    }
}

// chart.js
function chart() {
    let ctx = document.getElementById('myChart').getContext('2d');
    
    let chart= new Chart(ctx,{
      // what type is the chart
     type: 'bar',
  
    //  the data for showing
     data:{
      //  for the names
        labels: namesArr,
        
        datasets: [
          {
          label: 'Mall votes',
          data: votesArr,
          backgroundColor: [
            '#ead3cb',
          ],
    
          borderWidth: 1
        },
  
        {
          label: 'Mall shown',
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
