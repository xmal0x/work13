import {Validate} from './validate.js';

export class Popup {
    constructor(popupContaner) {
      this.popupContaner = popupContaner;    
      this.validate = new Validate();
      this.addNewPlaceForm = document.forms.new;
      this.editUserForm = document.forms.edit;
      this.avatarForm = document.forms.avatar;
    }

    open() {
      this.popupContaner.classList.add(`${this.popupContaner.classList[0]}_is-opened`);
      if(this.popupContaner.classList.contains('popup')) {
        this.openNewPlacePopup();
      }
      if(this.popupContaner.classList.contains('edit-popup')) {
        this.openUserEditPopup();
      }    
      if(this.popupContaner.classList.contains('avatar-popup')) {
        this.openAvatarPopup();
      }    
    }

    close() {
      this.popupContaner.classList.remove(`${this.popupContaner.classList[0]}_is-opened`);
    } 

    //открываем юзерИнфо попап
    openUserEditPopup() {
      this.validate.clearErrors(this.editUserForm);
      this.validate.validatePopup(this.editUserForm);
      this.editUserForm.name.value = document.querySelector('.user-info__name').textContent;
      this.editUserForm.about.value = document.querySelector('.user-info__job').textContent;
    }

    //Открывает попап для добавления карточки
    openNewPlacePopup() {
      this.addNewPlaceForm.place.value = "";
      this.addNewPlaceForm.link.value = "";
      
      const errorName =  document.querySelector(`#error-${this.addNewPlaceForm.place.name}`);
      if(errorName) errorName.textContent = "Это обязательное поле";

      const errorLink =  document.querySelector(`#error-${this.addNewPlaceForm.link.name}`);
      if(errorLink) errorLink.textContent = "Это обязательное поле";

      this.validate.validatePopup(this.addNewPlaceForm);
    }

    //открываем аватар попап
    openAvatarPopup() {
    const errorLink =  document.querySelector(`#error-${this.avatarForm.avatarLink.name}`);
    if(errorLink) errorLink.textContent = "Это обязательное поле";

    this.validate.validatePopup(this.avatarForm);
    this.avatarForm.avatarLink.value = "";
    }
}