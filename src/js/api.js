
import {cardList} from './classCardList'


const userInfoAvatar = document.querySelector(".user-info__photo");
const userInfoName = document.querySelector(".user-info__name");
const userInfoJob = document.querySelector(".user-info__job");
const userPopupButtonSave = document.querySelector(".user__popup_button");
const formProfile = document.forms.new_profile;
const nameProfForm = formProfile.elements.user__name;
const onselfProfForm = formProfile.elements.about__oneself;
const userPopup = document.querySelector(".user__popup");

class Api {
    constructor(url, token) {
      this.url = url;
      this.token = token;
    }
    // метод загрузки информации о пользователе с сервера
  
    getUser() {
      return fetch(`${this.url}/users/me`, { 
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
          return Promise.reject(res.status)
        })
        .catch((err) => {
          console.log(`Ошибка ${err}`);
        });
    }
  
  
    // метод загрузки первоначальных карточек с сервера
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
  
  
    // метод редактирования профиля 
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
    url:   'https://praktikum.tk/cohort2',                 
    token: '76ce48b1-83d8-40a1-91c3-18e6fe90ce61'
  }
  const api = new Api(enjoy.url, enjoy.token); 
  
  // Загрузка информации о пользователе с сервера
  function updateUser(object) {
    userInfoAvatar.style.backgroundImage = `url( ${object.avatar} )`;
    userInfoName.textContent = object.name;
    userInfoJob.textContent = object.about;
  }
  
  api.getUser()
    .then((res) => {
      updateUser(res);
    });
  
  // Загрузка первоначальных карточек с сервера
  api.getCards()
    .then((res) => {
      cardList.render(res);
    });

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