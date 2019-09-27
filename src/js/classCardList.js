
import {initialCards} from './initialCards';
import {Card} from './classCard';

const placesList = document.querySelector('.places-list');
const buttonNewPlace = document.querySelector(".new-place__popup_button");
const formAddCard = document.forms.new;
const formCardName = formAddCard.elements.name;
const formCardLink = formAddCard.elements.link;
const popup = document.querySelector('.popup');

class CardList {
    constructor(container, cards) {
  
      this.container = container;
      this.cards = cards;
      this.addCard = this.addCard;
      this.render(cards);
    }
  
    addCard(name, link) {
  
      const card = new Card(name, link);
       this.container.appendChild(card.element);
    }
    
    render(cards) {
      const self = this;
      cards.forEach(function (item) {
        self.addCard(item.name, item.link)
      });
    }
  } 
 export const cardList = new CardList(placesList, initialCards);
  
  
  ///добавление карточки
  buttonNewPlace.addEventListener('click', ()=>{
    event.preventDefault();
    cardList.addCard(formCardName.value, formCardLink.value);
    popup.classList.remove("popup_is-opened");
    document.querySelector('.popup__form').reset();
});