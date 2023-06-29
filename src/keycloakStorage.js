const KEYCLOAK_CALLBACK_PREFIX = 'kc-callback-';
const TOKEN_STORAGE_NAME = 'kc-tokens';

const clearExpired = (keycloakCallbackPrefix) => {
  const time = new Date().getTime();
  for (let i = 0; i < localStorage.length; i++)  {
    const key = localStorage.key(i);
    if (key && key.indexOf(keycloakCallbackPrefix) === 0) {
      const value = localStorage.getItem(key);
      if (value) {
        try {
          const expires = JSON.parse(value).expires;
          if (!expires || expires < time) {
            localStorage.removeItem(key);
          }
        } catch (err) {
          localStorage.removeItem(key);
        }
      }
    }
  }
};

class LocalStorage{
  constructor(keycloakCallbackPrefix) {
    localStorage.setItem('kc-test', 'test');
    localStorage.removeItem('kc-test');
    this.keycloakCallbackPrefix = keycloakCallbackPrefix;
    return this;
  }

  get = (state) => {
    if (!state) {
      return;
    }

    const key = `${this.keycloakCallbackPrefix}${state}`;
    let value = localStorage.getItem(key);
    if (value) {
      localStorage.removeItem(key);
      value = JSON.parse(value);
    }

    clearExpired(this.keycloakCallbackPrefix);
    return value;
  };

  add = (stateData) => {
    clearExpired(this.keycloakCallbackPrefix);

    const key = `${this.keycloakCallbackPrefix}${stateData.state}`;
    stateData.expires = new Date().getTime() + (60 * 60 * 1000);
    localStorage.setItem(key, JSON.stringify(stateData));
  };
}


const cookieExpiration = (minutes) => {
  const exp = new Date();
  exp.setTime(exp.getTime() + (minutes*60*1000));
  return exp;
};

const getCookie = (key) => {
  const name = key + '=';
  const ca = document.cookie.split(';');
  for (let i = 0; i < ca.length; i++) {
    let c = ca[i];
    while (c.charAt(0) === ' ') {
      c = c.substring(1);
    }
    if (c.indexOf(name) === 0) {
      return c.substring(name.length, c.length);
    }
  }
  return '';
};

const setCookie = (key, value, expirationDate) => {
  document.cookie = `${key}=${value}; expires=${expirationDate.toUTCString()}; `;
};

class CookieStorage{
  constructor(keycloakCallbackPrefix) {
    this.keycloakCallbackPrefix = keycloakCallbackPrefix;
    return this;
  }

  get = (state) => {
    if (!state) {
      return;
    }
    const key = `${this.keycloakCallbackPrefix}${state}`;
    const value = getCookie(key);
    setCookie(key, '', cookieExpiration(-100));
    if (value) {
      return JSON.parse(value);
    }
  };

  add = (stateData) => {
    const key = `${this.keycloakCallbackPrefix}${stateData.state}`;
    setCookie(key, JSON.stringify(stateData), cookieExpiration(60));
  };


}

export const createCallbackStorage = (keycloakCallbackPrefix) => {
  try {
    return new LocalStorage(keycloakCallbackPrefix=KEYCLOAK_CALLBACK_PREFIX);
  } catch (err) {}
  return new CookieStorage(keycloakCallbackPrefix=KEYCLOAK_CALLBACK_PREFIX);
};


class LocalTokenStorage{
  constructor(tokenStorageName) {
    this.tokenStorageName = tokenStorageName;
    localStorage.setItem('kc-test', 'test');
    localStorage.removeItem('kc-test');
    return this;
  }
  add = (data) => {
    localStorage.setItem(this.tokenStorageName, JSON.stringify(data));
  }

  get = () => {
    const value = localStorage.getItem(this.tokenStorageName);
    if(value) {
      return JSON.parse(value);
    }
  }

  remove = () => {
    localStorage.removeItem(this.tokenStorageName);
  }
}

class CookieTokenStorage{
  constructor(tokenStorageName) {
    this.tokenStorageName = tokenStorageName;
    return this;
  }

  add = (data) => {
    setCookie(this.tokenStorageName, JSON.stringify(data), cookieExpiration(3600));
  }

  get = () => {
    const value = getCookie(this.tokenStorageName);
    if (value) {
      return JSON.parse(value);
    }
  }

  remove = () => {
    setCookie(this.tokenStorageName, '', cookieExpiration(-100));
  };
}


// 2 type storage:
// 1 TokenStorage class with methods add get remove
// 2 TicketStorage class with name +stateId and methods add get remove when get

export const createTokenStorage = (tokenStorageName=TOKEN_STORAGE_NAME) => {
  try {
    return new LocalTokenStorage(tokenStorageName);
  } catch (err) {}
  return new CookieTokenStorage(tokenStorageName);
}
