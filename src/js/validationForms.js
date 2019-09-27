
const formProfile = document.forms.new_profile;
const nameProfForm = formProfile.elements.user__name;
const onselfProfForm = formProfile.elements.about__oneself;

const userInfoName = document.querySelector(".user-info__name");
const userInfoJob = document.querySelector(".user-info__job");
const userPopupButtonSave = document.querySelector(".user__popup_button");
const buttonNewPlace = document.querySelector(".new-place__popup_button");
const MESSAGE_INPUT_MARK_REQUIRED = "Это обязательное поле";
const MESSAGE_INPUT_MARK_SYMBOLS = "Должно быть от 2 до 30 символов";
const popupUsNameMarker = document.querySelector(".popup_usname-marker");
const popupOnselfMarker = document.querySelector(".popup_oneself-marker");
// const buttonEdit = document.querySelector(".button__edit");

const formNewPlace = document.forms.new;
const nameNewPlace = formNewPlace.elements.name;
const linkNewPlace = formNewPlace.elements.link;


function addInPopupUserInfo() {
    userNameNew.value = userInfoName.textContent;
    userAboutOneselfNew.value = userInfoJob.textContent;
}

function zeroizPopupMarkersValid() {
    popupUsNameMarker.textContent = "";
    popupOnselfMarker.textContent = "";
}

function popUserOpen() {
    // userPopup.classList.add("popup_is-opened");
    addInPopupUserInfo();
    zeroizPopupMarkersValid();
}

//   buttonEdit.addEventListener("click", popUserOpen);

function userInfoNew(name, infoSelf) {
    userInfoName.textContent = name;
    userInfoJob.textContent = infoSelf;
}


function usProfileButtonActive() {
    userPopupButtonSave.removeAttribute("disabled");
    userPopupButtonSave.classList.add("user__popup_button-active");
}

function usProfileButtonActiveNot() {
    userPopupButtonSave.classList.remove("user__popup_button-active");
    userPopupButtonSave.setAttribute("disabled", true);
}

formProfile.addEventListener("input", function () {
    if (
        nameProfForm.value.length >= 2 &&
        nameProfForm.value.length <= 30 &&
        onselfProfForm.value.length >= 2 &&
        onselfProfForm.value.length <= 30
    ) {
        usProfileButtonActive();
    } else {
        usProfileButtonActiveNot();
    }
});

formNewPlace.addEventListener("input", function () {
    if (nameNewPlace.value.length === 0 || linkNewPlace.value.length === 0) {
        buttonNewPlace.classList.remove("user__popup_button-active");
        buttonNewPlace.setAttribute("disabled", true);
    } else {
        buttonNewPlace.removeAttribute("disabled");
        buttonNewPlace.classList.add("user__popup_button-active");
    }
});

nameProfForm.addEventListener("input", function (event) {
    if (event.target.value.length === 0) {
        popupUsNameMarker.textContent = MESSAGE_INPUT_MARK_REQUIRED;
    } else if (
        nameProfForm.value.length === 1 ||
        nameProfForm.value.length >= 30
    ) {
        popupUsNameMarker.textContent = MESSAGE_INPUT_MARK_SYMBOLS;
    } else {
        popupUsNameMarker.textContent = "";
    }
});

onselfProfForm.addEventListener("input", function () {
    if (onselfProfForm.value.length === 0) {
        popupOnselfMarker.textContent = MESSAGE_INPUT_MARK_REQUIRED;
    } else if (
        onselfProfForm.value.length === 1 ||
        onselfProfForm.value.length >= 30
    ) {
        popupOnselfMarker.textContent = MESSAGE_INPUT_MARK_SYMBOLS;
    } else {
        popupOnselfMarker.textContent = "";
    }
});