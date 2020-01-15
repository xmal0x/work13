export class UserInfo {
    constructor(container, api) {
        this.userName = container.querySelector(".user-info__name");
        this.userAbout = container.querySelector('.user-info__job');
        this.userInfoPhoto = container.querySelector('.user-info__photo');   
        
        this.api = api;
    }

    getUserInfo() {
        this.api.getUserInfo()
        .then((json) => {
            this.userName.textContent = json.name;
            this.userAbout.textContent = json.about;
            this.userInfoPhoto.style.backgroundImage = `url(${json.avatar})`
            this.userId = json._id;
          });
    }
}