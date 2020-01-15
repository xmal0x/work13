export class Validate {
    //проверка валидности попапа и субмитКнопка вкл/выкл
   validatePopup(form) {
    let isValid = true;
    Array.from(form.elements).forEach((elem) => {
      const errorElem = document.querySelector(`#error-${elem.name}`);
      if (errorElem) {
        if(errorElem.textContent.length) {
          isValid = false;
        }
      }
    });
    if(form.classList.contains('edit-popup__form')) {
      this.setDisableButton(document.querySelector('.edit-popup__button'), !isValid);
    }
    if(form.classList.contains('popup__form')) {
      this.setDisableButton(document.querySelector('.popup__button'), !isValid);
    }
    if(form.classList.contains('avatar-popup__form')) {
      this.setDisableButton(document.querySelector('.avatar-popup__button'), !isValid);
    }
  }
  
  //валидацмя поля и попапа
  validateField(event) {
    this.resetError(event.target);
    Array.from(event.target).forEach((elem) => {
      if (document.querySelector(`#error-${elem.name}`)) {
        this.resetError(elem);
      }
    });

    const message = this.getErrorMessage(event.target);

    const errorElement = document.querySelector(`#error-${event.target.name}`);
    errorElement.textContent = message;  
    if(event.target.classList.contains('edit-popup__input')) {
      this.validatePopup(document.forms.edit);
    }
    if(event.target.classList.contains('popup__input')) {
      this.validatePopup(document.forms.new);
    }
    if(event.target.classList.contains('avatar-popup__input')) {
      this.validatePopup(document.forms.avatar);
    }
  }

  clearErrors(form) {
    Array.from(form.elements).forEach((elem) => {
      if (document.querySelector(`#error-${elem.name}`)) {
        this.resetError(elem);
      }
    });
  }

    //сброс ошибки для элемента
    resetError(element) {
        const errorElement = document.querySelector(`#error-${element.name}`);
        errorElement.textContent = "";
    }

    //вклВЫкл субмит буттон
    setDisableButton(button, isDisable) {
        let buttonDisableClass = "";
        if(button.classList.contains('edit-popup__button')) {
          buttonDisableClass = "edit-popup__button__is-disabled";
        }
        if(button.classList.contains('popup__button')) {
          buttonDisableClass = "popup__button__is-disabled";
        }
        if(button.classList.contains('avatar-popup__button')) {
          buttonDisableClass = "avatar-popup__button__is-disabled";
        }
    
        if(isDisable) {
          button.classList.add(buttonDisableClass);
          button.setAttribute('disabled', true);
        } else {
          button.classList.remove(buttonDisableClass);
          button.removeAttribute('disabled', false);
        }  
    }

    getErrorMessage(element) {
      if(element.validity.valueMissing) { 
        return "Это обязательное поле";
      }
      if(element.validity.tooShort || element.validity.tooLong) {
        return `Должно быть от ${element.getAttribute('minlength')} до ${element.getAttribute('maxlength')} символов`;
      }
      if(element.getAttribute('pattern') && !element.validity.patternMismatch) {
        return 'Здесь должна быть ссылка';
      }
      return "";
    }
}