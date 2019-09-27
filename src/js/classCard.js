export class Card {
  constructor(nameValue, bgImage) {
    this.nameValue = nameValue;
    this.bgImage = bgImage;
    this.create()
    this.element.addEventListener('click', () => {
      if (event.target.classList.contains('place-card__delete-icon')) {
        this.remove();

      } else if (event.target.classList.contains('place-card__like-icon')) {
        this.like();
      }
    });
  }

  create() {
    const placeCard = document.createElement('div');
    const placeCardImage = document.createElement('div');
    const btPlaceCardDelete = document.createElement('button');
    const placeCardDscription = document.createElement('div');
    const placeCardName = document.createElement('h3');
    const btPlaceCardLike = document.createElement('button');

    placeCard.classList.add('place-card');
    placeCardImage.classList.add('place-card__image');
    placeCardImage.style.backgroundImage = `url( ${this.bgImage} )`;

    btPlaceCardDelete.classList.add('place-card__delete-icon');
    placeCardDscription.classList.add('place-card__description');
    placeCardName.classList.add('place-card__name');
    placeCardName.textContent = this.nameValue;
    btPlaceCardLike.classList.add('place-card__like-icon');

    placeCardImage.appendChild(btPlaceCardDelete);
    placeCardDscription.appendChild(placeCardName);
    placeCardDscription.appendChild(btPlaceCardLike);
    placeCard.appendChild(placeCardImage);
    placeCard.appendChild(placeCardDscription);


    this.element = placeCard;
  }

  like() {
    event.target.classList.toggle('place-card__like-icon_liked');
    event.stopImmediatePropagation();
  }

  remove() {
    event.target.parentElement.parentElement.remove();
    event.stopImmediatePropagation();
  }
}

// console.log('classCard');