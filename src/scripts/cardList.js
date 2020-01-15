import {Card} from './card.js';

export class CardList {
    constructor(container, api) {
      this.container = container;
      this.cards = [];
      this.api = api;
    }

    fillCardsPage() {
        this.api.getCards()        
        .then((json) => {
            this.container.innerHTML = '';
            json.forEach(elem => {
                var card = new Card(elem, this.api);
                this.cards.push(card);                
            })       
            this.render();
        })
    }
  
    addCard(card) {
      this.cards.push(card);
    }
  
    render() {
      this.cards.forEach(card => {
        this.container.appendChild(card.cardElement);
      });
    }

  }