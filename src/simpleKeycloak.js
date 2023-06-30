import {createCallbackStorage, createTokenStorage} from './keycloakStorage';
import {
  createUUID,
  decodeToken,
  generateCodeVerifier,
  generatePkceChallenge,
  isTokenExpired,
  parseCallbackUrl
} from './keycloakUtils';


class SimpleKeycloak{
  url = '';
  realm = '';
  clientId = '';
  scope = 'openid';
  responseMode = 'fragment';
  responseType = 'code';
  authorization_endpoint =  '';
  end_session_endpoint = '';
  callbackStorage = null;
  tokenStorage = null;
  authenticated = false;
  timeLocal = null;
  keycloakCallbackPrefix = undefined;
  tokenStorageName = undefined;

  verifyToken = () => {}
  exchangeCode = () => {}
  setInitialized = () => {}
  setError = () => {}

  constructor(config){
    this.url = config.url;
    this.realm = config.realm;
    this.clientId = config.clientId;
    if(config.scope) {
      this.scope = config.scope;
    }
    this.keycloakCallbackPrefix = config.keycloakCallbackPrefix;
    this.tokenStorageName = config.tokenStorageName || `kc-${config.realm}-${config.clientId}`;
    return this;
  }

  getRealmUrl = () => {
    return `${this.url}${this.url.charAt(this.url.length - 1) === '/'?'':'/'}realms/${encodeURIComponent(this.realm)}`;
  }

  init = (exchangeCode, verifyToken, setInitialized, setError) => {
    const realmUrl = this.getRealmUrl();
    this.authorization_endpoint = `${realmUrl}/protocol/openid-connect/auth`;
    this.end_session_endpoint = `${realmUrl}/protocol/openid-connect/logout`;
    this.callbackStorage = createCallbackStorage(this.keycloakCallbackPrefix);
    this.tokenStorage = createTokenStorage(this.tokenStorageName);
    this.exchangeCode = exchangeCode;
    this.verifyToken = verifyToken;
    this.setInitialized = setInitialized;
    this.setError = setError;
    const self = this;
    self.processInit();
  }

  createLoginUrl = ({ redirectUri }) => {
      const state = createUUID();
      const nonce = createUUID();

      const callbackState = {
        state: state,
        nonce: nonce,
        redirectUri: encodeURIComponent(redirectUri)
      };

      let url = `${this.authorization_endpoint}?client_id=${encodeURIComponent(this.clientId)}&redirect_uri=${encodeURIComponent(redirectUri)}&state=${encodeURIComponent(state)}&response_mode=${encodeURIComponent(this.responseMode)}&response_type=${encodeURIComponent(this.responseType)}&scope=${encodeURIComponent(this.scope)}&nonce=${encodeURIComponent(nonce)}`;

      const codeVerifier = generateCodeVerifier(96);
      callbackState.pkceCodeVerifier = codeVerifier;
      const pkceChallenge = generatePkceChallenge(codeVerifier);
      url = `${url}&code_challenge=${pkceChallenge}&code_challenge_method=S256`;

      this.callbackStorage.add(callbackState);
      return url;
  }

  login = (options) => {
    window.location.assign(this.createLoginUrl(options));
  }
  createLogoutUrl = ({ redirectUri, idToken }) => {
      let url = `${this.end_session_endpoint}?client_id=${encodeURIComponent(this.clientId)}&post_logout_redirect_uri=${encodeURIComponent(redirectUri)}`;
      if (idToken) {
        url = `${url}&id_token_hint=${encodeURIComponent(idToken)}`;
      }
      return url;
  }

  logout = (options) => {
    this.tokenStorage.remove();
    window.location.replace(this.createLogoutUrl(options));
  }

  parseCallback = (url) => {
    const oauth = parseCallbackUrl(url);
    if (!oauth) {
      return;
    }

    const oauthState = this.callbackStorage.get(oauth.state);

    if (oauthState) {
      oauth.valid = true;
      oauth.redirectUri = oauthState.redirectUri;
      oauth.storedNonce = oauthState.nonce;
      oauth.pkceCodeVerifier = oauthState.pkceCodeVerifier;
    }

    return oauth;
  }

  setToken = (tokenData, timeLocal) => {
    const data = {...tokenData};
    if (data.refresh_token) {
      data.refresh_token_parsed = decodeToken(data.refresh_token);
    }
    if (data.id_token) {
      data.id_token_parsed = decodeToken(data.id_token);
    }
    if (data.access_token) {
      data.token_parsed = decodeToken(data.access_token);
      data.authenticated = true;
      if (timeLocal) {
        data.timeSkew = Math.floor(timeLocal / 1000) - data.token_parsed.iat;
      }
      this.tokenStorage.add(data);
      return data;
    }
  }

  authSuccess = (tokenData) => { //{access_token, expires_in, refresh_token, refresh_expires_in, token_type, id_token, session_state, scope, timeLocal:oldTimeLocal, storedNonce}) => {
    if(tokenData) {
    const timeLocal = (tokenData.timeLocal + new Date().getTime()) / 2;
    const data = this.setToken(tokenData, timeLocal);
    if (data && data.authenticated && ((data.token_parsed && data.token_parsed.nonce === tokenData.storedNonce) ||
        (data.refresh_token_parsed && data.refresh_token_parsed.nonce === tokenData.storedNonce) ||
        (data.id_token_parsed && data.id_token_parsed.nonce === tokenData.storedNonce))) {
        return true;
      }
    }
    this.tokenStorage.remove();
    return false;
  }

  processCallback = (oauth) => {
    const {code, error, storedNonce} = oauth;
    const timeLocal = new Date().getTime();
    if (error) {
       const errorData = { error: error, error_description: oauth.error_description };
       this.setError(errorData);
       return;
    }
    if (code) {
      // выходим из класса и обмениваем билет на токен через бекенд
      this.exchangeCode(code, oauth.pkceCodeVerifier, timeLocal, storedNonce);
      return code;
    }
  }

  processInit = () => {
    const oauth = this.parseCallback(window.location.href);
    if (oauth) {
      // смотрим есть ли ссылка с колбэком
      window.history.replaceState(window.history.state, null, oauth.newUrl);
      if (oauth && oauth.valid) {
        const code = this.processCallback(oauth);
        if(code){
          return;
        }
      }
    }else{
      // смотрим есть ли в сторейдже токены и прогоняем их по приложению
      const tokenData = this.tokenStorage.get();
      if(tokenData){
        if(isTokenExpired(tokenData)){
          this.tokenStorage.remove();
        }else{
          this.verifyToken(tokenData);
          return;
        }
      }
    }
    this.setInitialized();
  }

}

export default SimpleKeycloak;
