import {UserInfo} from './userInfo.js';
import {Api} from './api.js';
import {CardList} from './cardList.js';
import {Popup} from './popup.js';
import {Validate} from './validate.js';


const serverUrl = NODE_ENV === 'development' ? 'http://praktikum.tk/cohort4' : 'https://praktikum.tk/cohort4';
const token = "26b23f41-747a-4421-9417-946bd06a01e2";

/* Переменные */
//кнопки
const addPlaceButton = document.querySelector('.user-info__button');
const userEditButton = document.querySelector('.user-info__button-edit');
const avatarButton = document.querySelector('.user-info__photo');
//кнопки закрыть
const closeNewPlacePopupButton = document.querySelector('.popup__close');
const closeEditPopupButton = document.querySelector('.edit-popup__close');
const closePlacePopupButton = document.querySelector('.place-popup__close');
const closeAvatarPopupButton = document.querySelector('.avatar-popup__close');
//формы
const addNewPlaceForm = document.forms.new;
const editUserForm = document.forms.edit;
const avatarForm = document.forms.avatar;
//Доп поля 
const placePopupImage = document.querySelector('.place-popup__image');
//Поля попапов
const addNewPlaceNameField = addNewPlaceForm.place;
const addNewPlaceLinkField = addNewPlaceForm.link;
const updateUserInfoNameField = editUserForm.name;
const updateUserInfoAboutField = editUserForm.about;
const avatarLinkField = avatarForm.avatarLink;
//Objects 
const api = new Api(serverUrl, token);
const userInfo = new UserInfo(document.querySelector('.user-info'), api);
const cardList = new CardList(document.querySelector('.places-list'),api);
const validate = new Validate();
const popupNewPlace = new Popup(document.querySelector('.popup'));
const editPopup = new Popup(document.querySelector('.edit-popup'));
const placePopup = new Popup(document.querySelector('.place-popup'));
const avatarPopup = new Popup(document.querySelector('.avatar-popup'));

//func
//Добавляет новую карточку из попапа
function addNewPlace(event) {
  event.preventDefault();
  api.addNewCard(addNewPlaceNameField.value, addNewPlaceLinkField.value);
  cardList.fillCardsPage();
  addNewPlaceForm.reset();
  popupNewPlace.close();
}

//обновляем инфо о пользователе
function updateUserInfo(event) {
  event.preventDefault();
  userInfo.userName.textContent = updateUserInfoNameField.value;
  userInfo.userAbout.textContent = updateUserInfoAboutField.value;  
  api.updateUserInfo(updateUserInfoNameField.value, updateUserInfoAboutField.value)
  editPopup.close();
}

//обновляем аватар
function updateAvatar(event) {
  event.preventDefault();
  userInfo.userInfoPhoto.style.backgroundImage = `url(${avatarForm.avatarLink.value})`;
  api.updateAvatar(avatarForm.avatarLink.value);
  avatarPopup.close();
}

function openPlacePopup(event) {
  const length = event.target.style.backgroundImage.length - 2;
  const image = event.target.style.backgroundImage.substring(5, length);
  placePopupImage.setAttribute('src', image);
  placePopup.open();
}

/*Обработчики*/
addPlaceButton.addEventListener('click', popupNewPlace.open.bind(popupNewPlace));

userEditButton.addEventListener('click', editPopup.open.bind(editPopup));

avatarButton.addEventListener('click', avatarPopup.open.bind(avatarPopup));

closeNewPlacePopupButton.addEventListener('click', popupNewPlace.close.bind(popupNewPlace));

closeEditPopupButton.addEventListener('click', editPopup.close.bind(editPopup));

closePlacePopupButton.addEventListener('click', placePopup.close.bind(placePopup));

closeAvatarPopupButton.addEventListener('click', avatarPopup.close.bind(avatarPopup));

addNewPlaceForm.addEventListener('submit', addNewPlace);

editUserForm.addEventListener('submit', updateUserInfo);

avatarForm.addEventListener('submit', updateAvatar);

updateUserInfoNameField.addEventListener('input', validate.validateField.bind(validate));

updateUserInfoAboutField.addEventListener('input', validate.validateField.bind(validate));

addNewPlaceNameField.addEventListener('input', validate.validateField.bind(validate));

addNewPlaceLinkField.addEventListener('input', validate.validateField.bind(validate));

avatarLinkField.addEventListener('input', validate.validateField.bind(validate));

cardList.container.addEventListener('click', function(event) {
  if(event.target.classList.contains('place-card__image')) {
    openPlacePopup(event);
  }
});

//main
userInfo.getUserInfo(); 
cardList.fillCardsPage();