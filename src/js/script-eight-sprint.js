const initialCards = [{
    name: 'Архыз',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
  },
  {
    name: 'Челябинская область',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
  },
  {
    name: 'Иваново',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
  },
  {
    name: 'Камчатка',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
  },
  {
    name: 'Холмогорский район',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
  },
  {
    name: 'Байкал',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
  },
  {
    name: 'Нургуш',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/khrebet-nurgush.jpg'
  },
  {
    name: 'Тулиновка',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/tulinovka.jpg'
  },
  {
    name: 'Остров Желтухина',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/zheltukhin-island.jpg'
  },
  {
    name: 'Владивосток',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/vladivostok.jpg'
  }
];




      




const placesList = document.querySelector('.places-list');
//форма добавления карточки
const formAddCard = document.forms.new;
const formCardName = formAddCard.elements.name;//formCardNameValue, formCardLinkValue
const formCardLink = formAddCard.elements.link;
//кнопка добавить карточку
const btCardAdd = document.querySelector('.new-place__popup_button');
//popup новое место
const popup = document.querySelector('.popup');
const button = document.querySelector('.button');
const popupClose = document.querySelector('.popup__close');

//popup edit
// const buttonEdit = document.querySelector(".button__edit");
const userPopup = document.querySelector(".user__popup");
const userPopupClose = document.querySelector(".user__popup_close");

// popup image 
const imgbg = document.querySelector('.popup-image');
const popapImgOpen = document.querySelector('.popap-switch');
const imagePopupClose = document.querySelector('.image__popup_close');
const placeCardImage = document.querySelector('.place-card__image');
// const nameNewPlace = formNewPlace.elements.name;

// класс Card

class Card {
  constructor(nameValue, bgImage) {
    this.nameValue = nameValue; 
    this.bgImage = bgImage;
    this.create()
    this.element.addEventListener('click', ()=>{
      if(event.target.classList.contains('place-card__delete-icon')) {
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




 ///новый класс cardlist
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
const cardList = new CardList(placesList, initialCards);


///добавление карточки
buttonNewPlace.addEventListener('click', ()=>{
  event.preventDefault();
  cardList.addCard(formCardName.value, formCardLink.value);
  popup.classList.remove("popup_is-opened");
  document.querySelector('.popup__form').reset();
});
//


// класс Popup
class FormPopup {
  constructor(buttonOpen, okno, buttonClose) {
    buttonOpen.addEventListener('click', this.openPopup.bind(okno))
    buttonClose.addEventListener('click', this.closePopup.bind(okno))
  }
  openPopup() {
    this.classList.add('popup_is-opened');
  }
  closePopup() {
    this.classList.remove('popup_is-opened');
  }
}


class ImagePopup extends FormPopup {
  openPopup() {
    if (event.target.classList.contains('place-card__image')) {
      this.classList.add('popup_is-opened');
      imgbg.style.background = event.target.style['background-image'];
    }
  }
}

const newPlacePopup = new FormPopup(button, popup, popupClose);
const userEditPop = new FormPopup(buttonEdit, userPopup, userPopupClose);
const imageOpen = new ImagePopup(placesList, popapImgOpen, imagePopupClose);



// ////////Спринт 9 /////////////

class Api {
  constructor(url, token) {
    this.url = url;
    this.token = token;
  }
  //задача 1 метод загрузки информации о пользователе с сервера

  getUser() {
    return fetch(`${this.url}/users/me`, { //   http://95.216.175.5/cohort2
        headers: {
          method: 'GET',
          authorization: `${this.token}`, //76ce48b1-83d8-40a1-91c3-18e6fe90ce61
          'Content-Type': 'application/json'
        }
      })
      .then((res) => {
        if (res.ok) {
          return res.json();
        }
        return Promise.reject(res.status)
      })
      .catch((err) => {
        console.log(`Ошибка ${err}`);
      });
  }


  //задача 2 метод загрузки первоначальных карточек с сервера
  getCards() {
    return fetch(`${this.url}/cards`, { 
        headers: {
          method: 'GET',
          authorization: `${this.token}`, 
          'Content-Type': 'application/json'
        }
      })
      .then((res) => {
        if (res.ok) {
          return res.json();
        }
        return Promise.reject(res.status);
      })
      .catch((err) => {
        console.log(`Ошибка ${err}`);
      });
  }


  //задача 3 метод редактирования профиля 
  editProfile(name, onself) {
    return fetch(`${this.url}/users/me`, {
        method: 'PATCH',
        headers: {
          authorization: `${this.token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          name: name,
          about: onself
        })
      })
      .then((res) => {
        if (res.ok) {
          return res.json();
        }
        return Promise.reject(res.status)
      })
      .catch((err) => {
        console.log(`ошибка ${err}`);
      });
  } 

}

const enjoy = {
  url: 'http://95.216.175.5/cohort2',
  token: '76ce48b1-83d8-40a1-91c3-18e6fe90ce61'
}
const api = new Api(enjoy.url, enjoy.token); 

//задача 1 Загрузка информации о пользователе с сервера
function updateUser(object) {
  userInfoAvatar.style.backgroundImage = `url( ${object.avatar} )`;
  userInfoName.textContent = object.name;
  userInfoJob.textContent = object.about;
}

api.getUser()
  .then((res) => {
    updateUser(res);
  });

//задача 2 Загрузка первоначальных карточек с сервера
api.getCards()
  .then((res) => {
    cardList.render(res);
  });

//задача 3 Редактирование профиля
//доп задание кнопка загрузка
function loadingUXuserPopupButtonSave() {
  userPopupButtonSave.textContent = 'Загрузка...';
}
function loadingOFFUXuserPopupButtonSave() {
  userPopupButtonSave.textContent = 'Сохранить'
}

  

userPopupButtonSave.addEventListener("click", function () {
  event.preventDefault();
  loadingUXuserPopupButtonSave();
  api.editProfile(nameProfForm.value, onselfProfForm.value)
    .then((res)=>{
      loadingOFFUXuserPopupButtonSave();
      userPopup.classList.remove("popup_is-opened");
      updateUser(res);
    });
});
/////////////////////////////////////////////////////


