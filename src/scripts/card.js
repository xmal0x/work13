export class Card {
    constructor(cardJson, api, container) {
      this.api = api;

      this.cardElement = this.create(cardJson);
      this.cardElement.querySelector('.place-card__like-icon').addEventListener('click', this.like);

      if(this.cardElement.querySelector('.place-card__delete-icon')){
        this.cardElement.querySelector('.place-card__delete-icon').addEventListener('click', this.remove);
      }

      this.container = container;
    }
    
    create(cardJson) { 
      const card = document.createElement('div');
      card.classList.add('place-card');

      if(cardJson._id) {
        card.dataset._id = cardJson._id;
      }
      
      const placeImage = document.createElement('div');
      placeImage.classList.add('place-card__image');
      
      if(cardJson.owner && cardJson.owner._id == this.api.userId) {
        const delButton = document.createElement('button');
        delButton.classList.add('place-card__delete-icon');
        placeImage.appendChild(delButton);
      }
      placeImage.style.backgroundImage = `url(${cardJson.link})`;
  
      const placeDescription = document.createElement('div');
      placeDescription.classList.add('place-card__description');
      const placeName = document.createElement('h3');
      placeName.classList.add('place-card__name');
      placeName.textContent = cardJson.name;
      const likesContainer = document.createElement('div');
      likesContainer.classList.add('place-card__likes-container');
      const likeButton = document.createElement('div');
      likeButton.classList.add('place-card__like-icon');
      const numLikes = document.createElement('span');
      numLikes.classList.add('place-card__num-likes');
      numLikes.textContent = cardJson.likes.length;
  
      likesContainer.appendChild(likeButton);
      likesContainer.appendChild(numLikes);
  
      placeDescription.appendChild(placeName);
      placeDescription.appendChild(likesContainer);
  
  
      card.appendChild(placeImage);
      card.appendChild(placeDescription);
  
      return card;
    }
  
    like(event) {
      const needLike = !event.target.classList.contains('place-card__like-icon_liked');  
      
      event.target.classList.toggle('place-card__like-icon_liked');      
    }
  
    remove(event) {
      this.container.removeChild(event.target.parentElement.parentElement);
    }
  }