document.addEventListener('DOMContentLoaded', () => {
  //card options
  const cardArray = [
    {
      name: 'angular',
      img: 'img/angular.svg'
    },
    {
      name: 'aurelia',
      img: 'img/aurelia.svg'
    },
    {
      name: 'backbone',
      img: 'img/backbone.svg'
    },
    {
      name: 'ember',
      img: 'img/ember.svg'
    },
    {
      name: 'react',
      img: 'img/react.svg'
    },
    {
      name: 'vue',
      img: 'img/vue.svg'
    },
    {
      name: 'angular',
      img: 'img/angular.svg'
    },
    {
      name: 'aurelia',
      img: 'img/aurelia.svg'
    },
    {
      name: 'backbone',
      img: 'img/backbone.svg'
    },
    {
      name: 'ember',
      img: 'img/ember.svg'
    },
    {
      name: 'react',
      img: 'img/react.svg'
    },
    {
      name: 'vue',
      img: 'img/vue.svg'
    }
  ]

  const grid = document.querySelector('.grid');
  let resultDisplay = document.querySelector('#result');
  resultDisplay.textContent = 'Score: 0';
  let cardsChosenId = []
  let cardsWonId = []

  // Create grid
  function createGrid() {
    for (let i = 0; i < cardArray.length; i++) {
      let card = document.createElement('div')
      let img = document.createElement('img');
      img.setAttribute('src', 'img/js-badge.svg');
      card.setAttribute('data-id', i);
      card.addEventListener('click', flipCard);
      card.appendChild(img);
      grid.appendChild(card);
    }
  }

  cardArray.sort(() => 0.5 - Math.random());

  // Check for matches
  function checkForMatch() {
    let cards = document.querySelectorAll('.grid div');
    console.log(cards);
    const optionOneId = cardsChosenId[0];
    const optionTwoId = cardsChosenId[1];
    if (optionOneId !== optionTwoId && cardArray[optionOneId].name === cardArray[optionTwoId].name) {
      cards[optionOneId].removeEventListener("click", flipCard); 
      cards[optionTwoId].removeEventListener("click", flipCard);
      cardsWonId.push(cardsChosenId);
    }
    else {
      cards[optionOneId].querySelector('img').setAttribute('src', 'img/js-badge.svg');
      cards[optionTwoId].querySelector('img').setAttribute('src', 'img/js-badge.svg');
    }
    cardsChosenId = [];

    // If Player Win
    resultDisplay.textContent = 'Score: ' + cardsWonId.length;
    if (cardsWonId.length === cardArray.length / 2) {
      resultDisplay.textContent = 'You Won';

      // Create Restart Now Button
      let restart = document.createElement('span');
      restart.textContent = 'Restart Now';
      restart.classList += 'restart';
      let score = document.querySelector('.score');
      score.appendChild(restart);
      restart.addEventListener('click', reStart);
    }
  }

  // Flip my cards
  function flipCard() {
    let cardId = this.getAttribute('data-id');
    cardsChosenId.push(cardId);
    this.querySelector('img').setAttribute('src', cardArray[cardId].img);
    if (cardsChosenId.length === 2) {
      setTimeout(checkForMatch, 500);
    }
  }

  // Restart Game
  function reStart(){
    cardsWonId = [];
    let cards = document.querySelectorAll('.grid div');
    for(let i=0; i<cards.length; i++){
      cards[i].addEventListener('click', flipCard);
      cards[i].querySelector('img').setAttribute('src', 'img/js-badge.svg');
    }

    // Remove Restart Button
    let score = document.querySelector('.score');
    let restart = document.querySelector('.restart');
    score.removeChild(restart);

    resultDisplay.textContent = 'Score: 0';
  }
  createGrid();
})