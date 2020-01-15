export class Api {
    constructor(serverUrl, token) {
        this.baseUrl = serverUrl;
        this.token = token;
      }    
    
      getUserInfo() {
        return fetch(`${this.baseUrl}/users/me`, {
          headers: {
            authorization: this.token
          }
        }).then((res) => {
          if(res.ok){
            return res.json();
          }
    
          return Promise.reject(`Ошибка: ${res.status}`);
        })
        .catch((err) => {
          console.log(err);
        });
      };
      
      getCards() {
        return fetch(`${this.baseUrl}/cards`, {
          headers: {
            authorization: this.token
          }
        }).then((res) => {
          if(res.ok){
            return res.json();
          }
          
          return Promise.reject(`Ошибка: ${res.status}`);
        })
        .catch((err) => {
          console.log(err);
        });
      }
    
      updateUserInfo(name, about) {
        fetch(`${this.baseUrl}/users/me`,{
          method: "PATCH",
          headers: {
            authorization: this.token,
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
              name: name,
              about: about
          })
        }).then(res => {
          if(res.ok) {
            return res.json();
          }
          return Promise.reject(`Ошибка: ${res.status}`);
        }).then(json => console.log(json))
          .catch(err => {
            console.log(err);
          })
      }
    
      addNewCard(name, link) {
        fetch(`${this.baseUrl}/cards`, {
          method: "POST",
          headers: {
            authorization: this.token,
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            name: name,
            link: link
          })
        }).then(res => {
          if(res.ok) {
            return res.json();
          }
          return Promise.reject(`Ошибка: ${res.status}`);
        }).then(json => console.log(json))
          .catch(err => {
            console.log(err);
          });
      }
    
      updateAvatar(link) {
        fetch(`${this.baseUrl}/users/me/avatar`, {
          method: "PATCH",
          headers: {
            authorization: this.token,
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            avatar: link
          })
        }).then(res => {
          if(res.ok) {
            return res.json();
          }
          return Promise.reject(`Ошибка: ${res.status}`);
        }).then(json => {
          console.log(json);
          
        })
          .catch(err => console.log(err))
      }
  }