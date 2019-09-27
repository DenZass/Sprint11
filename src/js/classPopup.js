const popup = document.querySelector('.popup');
const button = document.querySelector('.button');
const popupClose = document.querySelector('.popup__close');
const buttonEdit = document.querySelector(".button__edit");
const userPopup = document.querySelector(".user__popup");
const userPopupClose = document.querySelector(".user__popup_close");
const placesList = document.querySelector('.places-list');
const popapImgOpen = document.querySelector('.popap-switch');
const imagePopupClose = document.querySelector('.image__popup_close');
const imgbg = document.querySelector('.popup-image');
const userNameNew = document.querySelector(".popup__user_name");
const userAboutOneselfNew = document.querySelector(".popup__about_oneself");
const userInfoName = document.querySelector(".user-info__name");
const userInfoJob = document.querySelector(".user-info__job");
const popupUsNameMarker = document.querySelector(".popup_usname-marker");
const popupOnselfMarker = document.querySelector(".popup_oneself-marker");


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
let immmag = document.createElement('img')
let uurl = null;

class ImagePopup extends FormPopup {
  openPopup() {
    if (event.target.classList.contains('place-card__image')) {
      this.classList.add('popup_is-opened');
      imgbg.style.backgroundImage = event.target.style['background-image'];
    }
  }
}

const newPlacePopup = new FormPopup(button, popup, popupClose);
const userEditPop = new FormPopup(buttonEdit, userPopup, userPopupClose);
const imageOpen = new ImagePopup(placesList, popapImgOpen, imagePopupClose);


function addInPopupUserInfo() {
  userNameNew.value = userInfoName.textContent;
  userAboutOneselfNew.value = userInfoJob.textContent;
}

function zeroizPopupMarkersValid() {
  popupUsNameMarker.textContent = "";
  popupOnselfMarker.textContent = "";
}

function popUserOpen() {
  addInPopupUserInfo();
  zeroizPopupMarkersValid();
}

buttonEdit.addEventListener("click", popUserOpen);