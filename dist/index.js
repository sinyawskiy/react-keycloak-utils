(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define([], factory);
	else if(typeof exports === 'object')
		exports["react-keycloak-utils"] = factory();
	else
		root["react-keycloak-utils"] = factory();
})(this, () => {
return /******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ "./src/keycloakStorage.js":
/*!********************************!*\
  !*** ./src/keycloakStorage.js ***!
  \********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   createCallbackStorage: () => (/* binding */ createCallbackStorage),
/* harmony export */   createTokenStorage: () => (/* binding */ createTokenStorage)
/* harmony export */ });
/* harmony import */ var _babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/helpers/createClass */ "./node_modules/@babel/runtime/helpers/esm/createClass.js");
/* harmony import */ var _babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @babel/runtime/helpers/classCallCheck */ "./node_modules/@babel/runtime/helpers/esm/classCallCheck.js");
/* harmony import */ var _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @babel/runtime/helpers/defineProperty */ "./node_modules/@babel/runtime/helpers/esm/defineProperty.js");



var KEYCLOAK_CALLBACK_PREFIX = 'kc-callback-';
var TOKEN_STORAGE_NAME = 'kc-tokens';
var clearExpired = function clearExpired(keycloakCallbackPrefix) {
  var time = new Date().getTime();
  for (var i = 0; i < localStorage.length; i++) {
    var key = localStorage.key(i);
    if (key && key.indexOf(keycloakCallbackPrefix) === 0) {
      var value = localStorage.getItem(key);
      if (value) {
        try {
          var expires = JSON.parse(value).expires;
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
var LocalStorage = /*#__PURE__*/(0,_babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_0__["default"])(function LocalStorage(keycloakCallbackPrefix) {
  var _this = this;
  (0,_babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_1__["default"])(this, LocalStorage);
  (0,_babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_2__["default"])(this, "get", function (state) {
    if (!state) {
      return;
    }
    var key = "".concat(_this.keycloakCallbackPrefix).concat(state);
    var value = localStorage.getItem(key);
    if (value) {
      localStorage.removeItem(key);
      value = JSON.parse(value);
    }
    clearExpired(_this.keycloakCallbackPrefix);
    return value;
  });
  (0,_babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_2__["default"])(this, "add", function (stateData) {
    clearExpired(_this.keycloakCallbackPrefix);
    var key = "".concat(_this.keycloakCallbackPrefix).concat(stateData.state);
    stateData.expires = new Date().getTime() + 60 * 60 * 1000;
    localStorage.setItem(key, JSON.stringify(stateData));
  });
  localStorage.setItem('kc-test', 'test');
  localStorage.removeItem('kc-test');
  this.keycloakCallbackPrefix = keycloakCallbackPrefix;
  return this;
});
var cookieExpiration = function cookieExpiration(minutes) {
  var exp = new Date();
  exp.setTime(exp.getTime() + minutes * 60 * 1000);
  return exp;
};
var getCookie = function getCookie(key) {
  var name = key + '=';
  var ca = document.cookie.split(';');
  for (var i = 0; i < ca.length; i++) {
    var c = ca[i];
    while (c.charAt(0) === ' ') {
      c = c.substring(1);
    }
    if (c.indexOf(name) === 0) {
      return c.substring(name.length, c.length);
    }
  }
  return '';
};
var setCookie = function setCookie(key, value, expirationDate) {
  document.cookie = "".concat(key, "=").concat(value, "; expires=").concat(expirationDate.toUTCString(), "; ");
};
var CookieStorage = /*#__PURE__*/(0,_babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_0__["default"])(function CookieStorage(keycloakCallbackPrefix) {
  var _this2 = this;
  (0,_babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_1__["default"])(this, CookieStorage);
  (0,_babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_2__["default"])(this, "get", function (state) {
    if (!state) {
      return;
    }
    var key = "".concat(_this2.keycloakCallbackPrefix).concat(state);
    var value = getCookie(key);
    setCookie(key, '', cookieExpiration(-100));
    if (value) {
      return JSON.parse(value);
    }
  });
  (0,_babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_2__["default"])(this, "add", function (stateData) {
    var key = "".concat(_this2.keycloakCallbackPrefix).concat(stateData.state);
    setCookie(key, JSON.stringify(stateData), cookieExpiration(60));
  });
  this.keycloakCallbackPrefix = keycloakCallbackPrefix;
  return this;
});
var createCallbackStorage = function createCallbackStorage(keycloakCallbackPrefix) {
  try {
    return new LocalStorage(keycloakCallbackPrefix = KEYCLOAK_CALLBACK_PREFIX);
  } catch (err) {}
  return new CookieStorage(keycloakCallbackPrefix = KEYCLOAK_CALLBACK_PREFIX);
};
var LocalTokenStorage = /*#__PURE__*/(0,_babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_0__["default"])(function LocalTokenStorage(tokenStorageName) {
  var _this3 = this;
  (0,_babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_1__["default"])(this, LocalTokenStorage);
  (0,_babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_2__["default"])(this, "add", function (data) {
    localStorage.setItem(_this3.tokenStorageName, JSON.stringify(data));
  });
  (0,_babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_2__["default"])(this, "get", function () {
    var value = localStorage.getItem(_this3.tokenStorageName);
    if (value) {
      return JSON.parse(value);
    }
  });
  (0,_babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_2__["default"])(this, "remove", function () {
    localStorage.removeItem(_this3.tokenStorageName);
  });
  this.tokenStorageName = tokenStorageName;
  localStorage.setItem('kc-test', 'test');
  localStorage.removeItem('kc-test');
  return this;
});
var CookieTokenStorage = /*#__PURE__*/(0,_babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_0__["default"])(function CookieTokenStorage(tokenStorageName) {
  var _this4 = this;
  (0,_babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_1__["default"])(this, CookieTokenStorage);
  (0,_babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_2__["default"])(this, "add", function (data) {
    setCookie(_this4.tokenStorageName, JSON.stringify(data), cookieExpiration(3600));
  });
  (0,_babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_2__["default"])(this, "get", function () {
    var value = getCookie(_this4.tokenStorageName);
    if (value) {
      return JSON.parse(value);
    }
  });
  (0,_babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_2__["default"])(this, "remove", function () {
    setCookie(_this4.tokenStorageName, '', cookieExpiration(-100));
  });
  this.tokenStorageName = tokenStorageName;
  return this;
}); // 2 type storage:
// 1 TokenStorage class with methods add get remove
// 2 TicketStorage class with name +stateId and methods add get remove when get
var createTokenStorage = function createTokenStorage() {
  var tokenStorageName = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : TOKEN_STORAGE_NAME;
  try {
    return new LocalTokenStorage(tokenStorageName);
  } catch (err) {}
  return new CookieTokenStorage(tokenStorageName);
};

/***/ }),

/***/ "./src/keycloakUtils.js":
/*!******************************!*\
  !*** ./src/keycloakUtils.js ***!
  \******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   buildClaimsParameter: () => (/* binding */ buildClaimsParameter),
/* harmony export */   createUUID: () => (/* binding */ createUUID),
/* harmony export */   decodeToken: () => (/* binding */ decodeToken),
/* harmony export */   generateCodeVerifier: () => (/* binding */ generateCodeVerifier),
/* harmony export */   generatePkceChallenge: () => (/* binding */ generatePkceChallenge),
/* harmony export */   isTokenExpired: () => (/* binding */ isTokenExpired),
/* harmony export */   parseCallbackUrl: () => (/* binding */ parseCallbackUrl)
/* harmony export */ });
/* harmony import */ var js_sha256__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! js-sha256 */ "./node_modules/js-sha256/src/sha256.js");
/* harmony import */ var js_sha256__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(js_sha256__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var base64_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! base64-js */ "./node_modules/base64-js/index.js");


var generateRandomData = function generateRandomData(len) {
  var array = new Array(len);
  for (var j = 0; j < array.length; j++) {
    array[j] = Math.floor(256 * Math.random());
  }
  return array;
};
var generateRandomString = function generateRandomString(len, alphabet) {
  var randomData = generateRandomData(len);
  var chars = new Array(len);
  for (var i = 0; i < len; i++) {
    chars[i] = alphabet.charCodeAt(randomData[i] % alphabet.length);
  }
  return String.fromCharCode.apply(null, chars);
};
var generateCodeVerifier = function generateCodeVerifier(len) {
  return generateRandomString(len, 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789');
};
var generatePkceChallenge = function generatePkceChallenge(codeVerifier) {
  var hashBytes = new Uint8Array(js_sha256__WEBPACK_IMPORTED_MODULE_0__.sha256.arrayBuffer(codeVerifier));
  var encodedHash = base64_js__WEBPACK_IMPORTED_MODULE_1__.fromByteArray(hashBytes).replace(/\+/g, '-').replace(/\//g, '_').replace(/\=/g, '');
  return encodedHash;
};
var createUUID = function createUUID() {
  var hexDigits = '0123456789abcdef';
  var s = generateRandomString(36, hexDigits).split("");
  s[14] = '4';
  // s[19] = hexDigits.substr((s[19] & 0x3) | 0x8, 1);
  var start = s[19] & 0x3 | 0x8;
  s[19] = hexDigits.substring(start, start + 1);
  s[8] = s[13] = s[18] = s[23] = '-';
  var uuid = s.join('');
  return uuid;
};
var buildClaimsParameter = function buildClaimsParameter(requestedAcr) {
  return JSON.stringify({
    id_token: {
      acr: requestedAcr
    }
  });
};
var parseCallbackParams = function parseCallbackParams(paramsString, supportedParams) {
  var p = paramsString.split('&');
  var result = {
    paramsString: '',
    oauthParams: {}
  };
  for (var i = 0; i < p.length; i++) {
    var split = p[i].indexOf("=");
    var key = p[i].slice(0, split);
    if (supportedParams.indexOf(key) !== -1) {
      result.oauthParams[key] = p[i].slice(split + 1);
    } else {
      if (result.paramsString !== '') {
        result.paramsString += '&';
      }
      result.paramsString += p[i];
    }
  }
  return result;
};
var parseCallbackUrl = function parseCallbackUrl(url) {
  var supportedParams = ['code', 'state', 'session_state', 'error', 'error_description', 'error_uri'];
  // если приходит ошибка то кейклоку все равно какой запрос возвращает аттрибуты после знака вопросика
  var queryIndex = url.indexOf('?');
  var fragmentIndex = url.indexOf('#');
  var newUrl;
  var parsed;
  if (fragmentIndex !== -1) {
    newUrl = url.substring(0, fragmentIndex);
    parsed = parseCallbackParams(url.substring(fragmentIndex + 1), supportedParams);
    if (parsed.paramsString !== '') {
      newUrl += '#' + parsed.paramsString;
    }
  } else if (fragmentIndex === -1 && queryIndex !== -1) {
    newUrl = url.substring(0, queryIndex);
    parsed = parseCallbackParams(url.substring(queryIndex + 1), supportedParams);
    if (parsed.paramsString !== '') {
      newUrl += '#' + parsed.paramsString;
    }
  }
  if (parsed && parsed.oauthParams) {
    if ((parsed.oauthParams.code || parsed.oauthParams.error) && parsed.oauthParams.state) {
      parsed.oauthParams.newUrl = newUrl;
      return parsed.oauthParams;
    }
  }
};
var decodeToken = function decodeToken(str) {
  str = str.split('.')[1];
  str = str.replace(/-/g, '+');
  str = str.replace(/_/g, '/');
  switch (str.length % 4) {
    case 0:
      break;
    case 2:
      str += '==';
      break;
    case 3:
      str += '=';
      break;
    default:
      throw 'Invalid token';
  }
  str = decodeURIComponent(encodeURIComponent(window.atob(str)));
  str = JSON.parse(str);
  return str;
};
var isTokenExpired = function isTokenExpired(tokenData) {
  var minValidity = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 5;
  if (tokenData.timeSkew == null) {
    return true;
  }
  var expiresIn = tokenData.token_parsed['exp'] - Math.ceil(new Date().getTime() / 1000) + tokenData.timeSkew;
  expiresIn -= minValidity;
  return expiresIn < 0;
};


/***/ }),

/***/ "./src/simpleKeycloak.js":
/*!*******************************!*\
  !*** ./src/simpleKeycloak.js ***!
  \*******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/helpers/createClass */ "./node_modules/@babel/runtime/helpers/esm/createClass.js");
/* harmony import */ var _babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @babel/runtime/helpers/classCallCheck */ "./node_modules/@babel/runtime/helpers/esm/classCallCheck.js");
/* harmony import */ var _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @babel/runtime/helpers/defineProperty */ "./node_modules/@babel/runtime/helpers/esm/defineProperty.js");
/* harmony import */ var _keycloakStorage__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./keycloakStorage */ "./src/keycloakStorage.js");
/* harmony import */ var _keycloakUtils__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./keycloakUtils */ "./src/keycloakUtils.js");



function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }
function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { (0,_babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_2__["default"])(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }


var SimpleKeycloak = /*#__PURE__*/(0,_babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_0__["default"])(function SimpleKeycloak(config) {
  var _this = this;
  (0,_babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_1__["default"])(this, SimpleKeycloak);
  (0,_babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_2__["default"])(this, "url", '');
  (0,_babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_2__["default"])(this, "realm", '');
  (0,_babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_2__["default"])(this, "clientId", '');
  (0,_babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_2__["default"])(this, "scope", 'openid');
  (0,_babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_2__["default"])(this, "responseMode", 'fragment');
  (0,_babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_2__["default"])(this, "responseType", 'code');
  (0,_babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_2__["default"])(this, "authorization_endpoint", '');
  (0,_babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_2__["default"])(this, "end_session_endpoint", '');
  (0,_babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_2__["default"])(this, "callbackStorage", null);
  (0,_babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_2__["default"])(this, "tokenStorage", null);
  (0,_babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_2__["default"])(this, "authenticated", false);
  (0,_babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_2__["default"])(this, "timeLocal", null);
  (0,_babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_2__["default"])(this, "keycloakCallbackPrefix", undefined);
  (0,_babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_2__["default"])(this, "tokenStorageName", undefined);
  (0,_babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_2__["default"])(this, "verifyToken", function () {});
  (0,_babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_2__["default"])(this, "exchangeCode", function () {});
  (0,_babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_2__["default"])(this, "setInitialized", function () {});
  (0,_babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_2__["default"])(this, "setError", function () {});
  (0,_babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_2__["default"])(this, "getRealmUrl", function () {
    return "".concat(_this.url).concat(_this.url.charAt(_this.url.length - 1) === '/' ? '' : '/', "realms/").concat(encodeURIComponent(_this.realm));
  });
  (0,_babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_2__["default"])(this, "init", function (exchangeCode, verifyToken, setInitialized, setError) {
    var realmUrl = _this.getRealmUrl();
    _this.authorization_endpoint = "".concat(realmUrl, "/protocol/openid-connect/auth");
    _this.end_session_endpoint = "".concat(realmUrl, "/protocol/openid-connect/logout");
    _this.callbackStorage = (0,_keycloakStorage__WEBPACK_IMPORTED_MODULE_3__.createCallbackStorage)(_this.keycloakCallbackPrefix);
    _this.tokenStorage = (0,_keycloakStorage__WEBPACK_IMPORTED_MODULE_3__.createTokenStorage)(_this.tokenStorageName);
    _this.exchangeCode = exchangeCode;
    _this.verifyToken = verifyToken;
    _this.setInitialized = setInitialized;
    _this.setError = setError;
    var self = _this;
    self.processInit();
  });
  (0,_babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_2__["default"])(this, "createLoginUrl", function (_ref) {
    var redirectUri = _ref.redirectUri;
    var state = (0,_keycloakUtils__WEBPACK_IMPORTED_MODULE_4__.createUUID)();
    var nonce = (0,_keycloakUtils__WEBPACK_IMPORTED_MODULE_4__.createUUID)();
    var callbackState = {
      state: state,
      nonce: nonce,
      redirectUri: encodeURIComponent(redirectUri)
    };
    var url = "".concat(_this.authorization_endpoint, "?client_id=").concat(encodeURIComponent(_this.clientId), "&redirect_uri=").concat(encodeURIComponent(redirectUri), "&state=").concat(encodeURIComponent(state), "&response_mode=").concat(encodeURIComponent(_this.responseMode), "&response_type=").concat(encodeURIComponent(_this.responseType), "&scope=").concat(encodeURIComponent(_this.scope), "&nonce=").concat(encodeURIComponent(nonce));
    var codeVerifier = (0,_keycloakUtils__WEBPACK_IMPORTED_MODULE_4__.generateCodeVerifier)(96);
    callbackState.pkceCodeVerifier = codeVerifier;
    var pkceChallenge = (0,_keycloakUtils__WEBPACK_IMPORTED_MODULE_4__.generatePkceChallenge)(codeVerifier);
    url = "".concat(url, "&code_challenge=").concat(pkceChallenge, "&code_challenge_method=S256");
    _this.callbackStorage.add(callbackState);
    return url;
  });
  (0,_babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_2__["default"])(this, "login", function (options) {
    window.location.assign(_this.createLoginUrl(options));
  });
  (0,_babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_2__["default"])(this, "createLogoutUrl", function (_ref2) {
    var redirectUri = _ref2.redirectUri,
      idToken = _ref2.idToken;
    var url = "".concat(_this.end_session_endpoint, "?client_id=").concat(encodeURIComponent(_this.clientId), "&post_logout_redirect_uri=").concat(encodeURIComponent(redirectUri));
    if (idToken) {
      url = "".concat(url, "&id_token_hint=").concat(encodeURIComponent(idToken));
    }
    return url;
  });
  (0,_babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_2__["default"])(this, "logout", function (options) {
    _this.tokenStorage.remove();
    window.location.replace(_this.createLogoutUrl(options));
  });
  (0,_babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_2__["default"])(this, "parseCallback", function (url) {
    var oauth = (0,_keycloakUtils__WEBPACK_IMPORTED_MODULE_4__.parseCallbackUrl)(url);
    if (!oauth) {
      return;
    }
    var oauthState = _this.callbackStorage.get(oauth.state);
    if (oauthState) {
      oauth.valid = true;
      oauth.redirectUri = oauthState.redirectUri;
      oauth.storedNonce = oauthState.nonce;
      oauth.pkceCodeVerifier = oauthState.pkceCodeVerifier;
    }
    return oauth;
  });
  (0,_babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_2__["default"])(this, "setToken", function (tokenData, timeLocal) {
    var data = _objectSpread({}, tokenData);
    if (data.refresh_token) {
      data.refresh_token_parsed = (0,_keycloakUtils__WEBPACK_IMPORTED_MODULE_4__.decodeToken)(data.refresh_token);
    }
    if (data.id_token) {
      data.id_token_parsed = (0,_keycloakUtils__WEBPACK_IMPORTED_MODULE_4__.decodeToken)(data.id_token);
    }
    if (data.access_token) {
      data.token_parsed = (0,_keycloakUtils__WEBPACK_IMPORTED_MODULE_4__.decodeToken)(data.access_token);
      data.authenticated = true;
      if (timeLocal) {
        data.timeSkew = Math.floor(timeLocal / 1000) - data.token_parsed.iat;
      }
      _this.tokenStorage.add(data);
      return data;
    }
  });
  (0,_babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_2__["default"])(this, "authSuccess", function (tokenData) {
    //{access_token, expires_in, refresh_token, refresh_expires_in, token_type, id_token, session_state, scope, timeLocal:oldTimeLocal, storedNonce}) => {
    if (tokenData) {
      var timeLocal = (tokenData.timeLocal + new Date().getTime()) / 2;
      var data = _this.setToken(tokenData, timeLocal);
      if (data && data.authenticated && (data.token_parsed && data.token_parsed.nonce === tokenData.storedNonce || data.refresh_token_parsed && data.refresh_token_parsed.nonce === tokenData.storedNonce || data.id_token_parsed && data.id_token_parsed.nonce === tokenData.storedNonce)) {
        return true;
      }
    }
    _this.tokenStorage.remove();
    return false;
  });
  (0,_babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_2__["default"])(this, "processCallback", function (oauth) {
    var code = oauth.code,
      error = oauth.error,
      storedNonce = oauth.storedNonce;
    var timeLocal = new Date().getTime();
    if (error) {
      var errorData = {
        error: error,
        error_description: oauth.error_description
      };
      _this.setError(errorData);
      return;
    }
    if (code) {
      // выходим из класса и обмениваем билет на токен через бекенд
      _this.exchangeCode(code, oauth.pkceCodeVerifier, timeLocal, storedNonce);
      return code;
    }
  });
  (0,_babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_2__["default"])(this, "processInit", function () {
    var oauth = _this.parseCallback(window.location.href);
    if (oauth) {
      // смотрим есть ли ссылка с колбэком
      window.history.replaceState(window.history.state, null, oauth.newUrl);
      if (oauth && oauth.valid) {
        var code = _this.processCallback(oauth);
        if (code) {
          return;
        }
      }
    } else {
      // смотрим есть ли в сторейдже токены и прогоняем их по приложению
      var tokenData = _this.tokenStorage.get();
      if (tokenData) {
        if ((0,_keycloakUtils__WEBPACK_IMPORTED_MODULE_4__.isTokenExpired)(tokenData)) {
          _this.tokenStorage.remove();
        } else {
          _this.verifyToken(tokenData);
          return;
        }
      }
    }
    _this.setInitialized();
  });
  this.url = config.url;
  this.realm = config.realm;
  this.clientId = config.clientId;
  if (config.scope) {
    this.scope = config.scope;
  }
  this.keycloakCallbackPrefix = config.keycloakCallbackPrefix;
  this.tokenStorageName = config.tokenStorageName || "kc-".concat(config.realm, "-").concat(config.clientId);
  return this;
});
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (SimpleKeycloak);

/***/ }),

/***/ "./node_modules/base64-js/index.js":
/*!*****************************************!*\
  !*** ./node_modules/base64-js/index.js ***!
  \*****************************************/
/***/ ((__unused_webpack_module, exports) => {

"use strict";


exports.byteLength = byteLength
exports.toByteArray = toByteArray
exports.fromByteArray = fromByteArray

var lookup = []
var revLookup = []
var Arr = typeof Uint8Array !== 'undefined' ? Uint8Array : Array

var code = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/'
for (var i = 0, len = code.length; i < len; ++i) {
  lookup[i] = code[i]
  revLookup[code.charCodeAt(i)] = i
}

// Support decoding URL-safe base64 strings, as Node.js does.
// See: https://en.wikipedia.org/wiki/Base64#URL_applications
revLookup['-'.charCodeAt(0)] = 62
revLookup['_'.charCodeAt(0)] = 63

function getLens (b64) {
  var len = b64.length

  if (len % 4 > 0) {
    throw new Error('Invalid string. Length must be a multiple of 4')
  }

  // Trim off extra bytes after placeholder bytes are found
  // See: https://github.com/beatgammit/base64-js/issues/42
  var validLen = b64.indexOf('=')
  if (validLen === -1) validLen = len

  var placeHoldersLen = validLen === len
    ? 0
    : 4 - (validLen % 4)

  return [validLen, placeHoldersLen]
}

// base64 is 4/3 + up to two characters of the original data
function byteLength (b64) {
  var lens = getLens(b64)
  var validLen = lens[0]
  var placeHoldersLen = lens[1]
  return ((validLen + placeHoldersLen) * 3 / 4) - placeHoldersLen
}

function _byteLength (b64, validLen, placeHoldersLen) {
  return ((validLen + placeHoldersLen) * 3 / 4) - placeHoldersLen
}

function toByteArray (b64) {
  var tmp
  var lens = getLens(b64)
  var validLen = lens[0]
  var placeHoldersLen = lens[1]

  var arr = new Arr(_byteLength(b64, validLen, placeHoldersLen))

  var curByte = 0

  // if there are placeholders, only get up to the last complete 4 chars
  var len = placeHoldersLen > 0
    ? validLen - 4
    : validLen

  var i
  for (i = 0; i < len; i += 4) {
    tmp =
      (revLookup[b64.charCodeAt(i)] << 18) |
      (revLookup[b64.charCodeAt(i + 1)] << 12) |
      (revLookup[b64.charCodeAt(i + 2)] << 6) |
      revLookup[b64.charCodeAt(i + 3)]
    arr[curByte++] = (tmp >> 16) & 0xFF
    arr[curByte++] = (tmp >> 8) & 0xFF
    arr[curByte++] = tmp & 0xFF
  }

  if (placeHoldersLen === 2) {
    tmp =
      (revLookup[b64.charCodeAt(i)] << 2) |
      (revLookup[b64.charCodeAt(i + 1)] >> 4)
    arr[curByte++] = tmp & 0xFF
  }

  if (placeHoldersLen === 1) {
    tmp =
      (revLookup[b64.charCodeAt(i)] << 10) |
      (revLookup[b64.charCodeAt(i + 1)] << 4) |
      (revLookup[b64.charCodeAt(i + 2)] >> 2)
    arr[curByte++] = (tmp >> 8) & 0xFF
    arr[curByte++] = tmp & 0xFF
  }

  return arr
}

function tripletToBase64 (num) {
  return lookup[num >> 18 & 0x3F] +
    lookup[num >> 12 & 0x3F] +
    lookup[num >> 6 & 0x3F] +
    lookup[num & 0x3F]
}

function encodeChunk (uint8, start, end) {
  var tmp
  var output = []
  for (var i = start; i < end; i += 3) {
    tmp =
      ((uint8[i] << 16) & 0xFF0000) +
      ((uint8[i + 1] << 8) & 0xFF00) +
      (uint8[i + 2] & 0xFF)
    output.push(tripletToBase64(tmp))
  }
  return output.join('')
}

function fromByteArray (uint8) {
  var tmp
  var len = uint8.length
  var extraBytes = len % 3 // if we have 1 byte left, pad 2 bytes
  var parts = []
  var maxChunkLength = 16383 // must be multiple of 3

  // go through the array every three bytes, we'll deal with trailing stuff later
  for (var i = 0, len2 = len - extraBytes; i < len2; i += maxChunkLength) {
    parts.push(encodeChunk(uint8, i, (i + maxChunkLength) > len2 ? len2 : (i + maxChunkLength)))
  }

  // pad the end with zeros, but make sure to not forget the extra bytes
  if (extraBytes === 1) {
    tmp = uint8[len - 1]
    parts.push(
      lookup[tmp >> 2] +
      lookup[(tmp << 4) & 0x3F] +
      '=='
    )
  } else if (extraBytes === 2) {
    tmp = (uint8[len - 2] << 8) + uint8[len - 1]
    parts.push(
      lookup[tmp >> 10] +
      lookup[(tmp >> 4) & 0x3F] +
      lookup[(tmp << 2) & 0x3F] +
      '='
    )
  }

  return parts.join('')
}


/***/ }),

/***/ "./node_modules/js-sha256/src/sha256.js":
/*!**********************************************!*\
  !*** ./node_modules/js-sha256/src/sha256.js ***!
  \**********************************************/
/***/ ((module, exports, __webpack_require__) => {

var __WEBPACK_AMD_DEFINE_RESULT__;/**
 * [js-sha256]{@link https://github.com/emn178/js-sha256}
 *
 * @version 0.9.0
 * @author Chen, Yi-Cyuan [emn178@gmail.com]
 * @copyright Chen, Yi-Cyuan 2014-2017
 * @license MIT
 */
/*jslint bitwise: true */
(function () {
  'use strict';

  var ERROR = 'input is invalid type';
  var WINDOW = typeof window === 'object';
  var root = WINDOW ? window : {};
  if (root.JS_SHA256_NO_WINDOW) {
    WINDOW = false;
  }
  var WEB_WORKER = !WINDOW && typeof self === 'object';
  var NODE_JS = !root.JS_SHA256_NO_NODE_JS && typeof process === 'object' && process.versions && process.versions.node;
  if (NODE_JS) {
    root = __webpack_require__.g;
  } else if (WEB_WORKER) {
    root = self;
  }
  var COMMON_JS = !root.JS_SHA256_NO_COMMON_JS && "object" === 'object' && module.exports;
  var AMD =  true && __webpack_require__.amdO;
  var ARRAY_BUFFER = !root.JS_SHA256_NO_ARRAY_BUFFER && typeof ArrayBuffer !== 'undefined';
  var HEX_CHARS = '0123456789abcdef'.split('');
  var EXTRA = [-2147483648, 8388608, 32768, 128];
  var SHIFT = [24, 16, 8, 0];
  var K = [
    0x428a2f98, 0x71374491, 0xb5c0fbcf, 0xe9b5dba5, 0x3956c25b, 0x59f111f1, 0x923f82a4, 0xab1c5ed5,
    0xd807aa98, 0x12835b01, 0x243185be, 0x550c7dc3, 0x72be5d74, 0x80deb1fe, 0x9bdc06a7, 0xc19bf174,
    0xe49b69c1, 0xefbe4786, 0x0fc19dc6, 0x240ca1cc, 0x2de92c6f, 0x4a7484aa, 0x5cb0a9dc, 0x76f988da,
    0x983e5152, 0xa831c66d, 0xb00327c8, 0xbf597fc7, 0xc6e00bf3, 0xd5a79147, 0x06ca6351, 0x14292967,
    0x27b70a85, 0x2e1b2138, 0x4d2c6dfc, 0x53380d13, 0x650a7354, 0x766a0abb, 0x81c2c92e, 0x92722c85,
    0xa2bfe8a1, 0xa81a664b, 0xc24b8b70, 0xc76c51a3, 0xd192e819, 0xd6990624, 0xf40e3585, 0x106aa070,
    0x19a4c116, 0x1e376c08, 0x2748774c, 0x34b0bcb5, 0x391c0cb3, 0x4ed8aa4a, 0x5b9cca4f, 0x682e6ff3,
    0x748f82ee, 0x78a5636f, 0x84c87814, 0x8cc70208, 0x90befffa, 0xa4506ceb, 0xbef9a3f7, 0xc67178f2
  ];
  var OUTPUT_TYPES = ['hex', 'array', 'digest', 'arrayBuffer'];

  var blocks = [];

  if (root.JS_SHA256_NO_NODE_JS || !Array.isArray) {
    Array.isArray = function (obj) {
      return Object.prototype.toString.call(obj) === '[object Array]';
    };
  }

  if (ARRAY_BUFFER && (root.JS_SHA256_NO_ARRAY_BUFFER_IS_VIEW || !ArrayBuffer.isView)) {
    ArrayBuffer.isView = function (obj) {
      return typeof obj === 'object' && obj.buffer && obj.buffer.constructor === ArrayBuffer;
    };
  }

  var createOutputMethod = function (outputType, is224) {
    return function (message) {
      return new Sha256(is224, true).update(message)[outputType]();
    };
  };

  var createMethod = function (is224) {
    var method = createOutputMethod('hex', is224);
    if (NODE_JS) {
      method = nodeWrap(method, is224);
    }
    method.create = function () {
      return new Sha256(is224);
    };
    method.update = function (message) {
      return method.create().update(message);
    };
    for (var i = 0; i < OUTPUT_TYPES.length; ++i) {
      var type = OUTPUT_TYPES[i];
      method[type] = createOutputMethod(type, is224);
    }
    return method;
  };

  var nodeWrap = function (method, is224) {
    var crypto = eval("require('crypto')");
    var Buffer = eval("require('buffer').Buffer");
    var algorithm = is224 ? 'sha224' : 'sha256';
    var nodeMethod = function (message) {
      if (typeof message === 'string') {
        return crypto.createHash(algorithm).update(message, 'utf8').digest('hex');
      } else {
        if (message === null || message === undefined) {
          throw new Error(ERROR);
        } else if (message.constructor === ArrayBuffer) {
          message = new Uint8Array(message);
        }
      }
      if (Array.isArray(message) || ArrayBuffer.isView(message) ||
        message.constructor === Buffer) {
        return crypto.createHash(algorithm).update(new Buffer(message)).digest('hex');
      } else {
        return method(message);
      }
    };
    return nodeMethod;
  };

  var createHmacOutputMethod = function (outputType, is224) {
    return function (key, message) {
      return new HmacSha256(key, is224, true).update(message)[outputType]();
    };
  };

  var createHmacMethod = function (is224) {
    var method = createHmacOutputMethod('hex', is224);
    method.create = function (key) {
      return new HmacSha256(key, is224);
    };
    method.update = function (key, message) {
      return method.create(key).update(message);
    };
    for (var i = 0; i < OUTPUT_TYPES.length; ++i) {
      var type = OUTPUT_TYPES[i];
      method[type] = createHmacOutputMethod(type, is224);
    }
    return method;
  };

  function Sha256(is224, sharedMemory) {
    if (sharedMemory) {
      blocks[0] = blocks[16] = blocks[1] = blocks[2] = blocks[3] =
        blocks[4] = blocks[5] = blocks[6] = blocks[7] =
        blocks[8] = blocks[9] = blocks[10] = blocks[11] =
        blocks[12] = blocks[13] = blocks[14] = blocks[15] = 0;
      this.blocks = blocks;
    } else {
      this.blocks = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
    }

    if (is224) {
      this.h0 = 0xc1059ed8;
      this.h1 = 0x367cd507;
      this.h2 = 0x3070dd17;
      this.h3 = 0xf70e5939;
      this.h4 = 0xffc00b31;
      this.h5 = 0x68581511;
      this.h6 = 0x64f98fa7;
      this.h7 = 0xbefa4fa4;
    } else { // 256
      this.h0 = 0x6a09e667;
      this.h1 = 0xbb67ae85;
      this.h2 = 0x3c6ef372;
      this.h3 = 0xa54ff53a;
      this.h4 = 0x510e527f;
      this.h5 = 0x9b05688c;
      this.h6 = 0x1f83d9ab;
      this.h7 = 0x5be0cd19;
    }

    this.block = this.start = this.bytes = this.hBytes = 0;
    this.finalized = this.hashed = false;
    this.first = true;
    this.is224 = is224;
  }

  Sha256.prototype.update = function (message) {
    if (this.finalized) {
      return;
    }
    var notString, type = typeof message;
    if (type !== 'string') {
      if (type === 'object') {
        if (message === null) {
          throw new Error(ERROR);
        } else if (ARRAY_BUFFER && message.constructor === ArrayBuffer) {
          message = new Uint8Array(message);
        } else if (!Array.isArray(message)) {
          if (!ARRAY_BUFFER || !ArrayBuffer.isView(message)) {
            throw new Error(ERROR);
          }
        }
      } else {
        throw new Error(ERROR);
      }
      notString = true;
    }
    var code, index = 0, i, length = message.length, blocks = this.blocks;

    while (index < length) {
      if (this.hashed) {
        this.hashed = false;
        blocks[0] = this.block;
        blocks[16] = blocks[1] = blocks[2] = blocks[3] =
          blocks[4] = blocks[5] = blocks[6] = blocks[7] =
          blocks[8] = blocks[9] = blocks[10] = blocks[11] =
          blocks[12] = blocks[13] = blocks[14] = blocks[15] = 0;
      }

      if (notString) {
        for (i = this.start; index < length && i < 64; ++index) {
          blocks[i >> 2] |= message[index] << SHIFT[i++ & 3];
        }
      } else {
        for (i = this.start; index < length && i < 64; ++index) {
          code = message.charCodeAt(index);
          if (code < 0x80) {
            blocks[i >> 2] |= code << SHIFT[i++ & 3];
          } else if (code < 0x800) {
            blocks[i >> 2] |= (0xc0 | (code >> 6)) << SHIFT[i++ & 3];
            blocks[i >> 2] |= (0x80 | (code & 0x3f)) << SHIFT[i++ & 3];
          } else if (code < 0xd800 || code >= 0xe000) {
            blocks[i >> 2] |= (0xe0 | (code >> 12)) << SHIFT[i++ & 3];
            blocks[i >> 2] |= (0x80 | ((code >> 6) & 0x3f)) << SHIFT[i++ & 3];
            blocks[i >> 2] |= (0x80 | (code & 0x3f)) << SHIFT[i++ & 3];
          } else {
            code = 0x10000 + (((code & 0x3ff) << 10) | (message.charCodeAt(++index) & 0x3ff));
            blocks[i >> 2] |= (0xf0 | (code >> 18)) << SHIFT[i++ & 3];
            blocks[i >> 2] |= (0x80 | ((code >> 12) & 0x3f)) << SHIFT[i++ & 3];
            blocks[i >> 2] |= (0x80 | ((code >> 6) & 0x3f)) << SHIFT[i++ & 3];
            blocks[i >> 2] |= (0x80 | (code & 0x3f)) << SHIFT[i++ & 3];
          }
        }
      }

      this.lastByteIndex = i;
      this.bytes += i - this.start;
      if (i >= 64) {
        this.block = blocks[16];
        this.start = i - 64;
        this.hash();
        this.hashed = true;
      } else {
        this.start = i;
      }
    }
    if (this.bytes > 4294967295) {
      this.hBytes += this.bytes / 4294967296 << 0;
      this.bytes = this.bytes % 4294967296;
    }
    return this;
  };

  Sha256.prototype.finalize = function () {
    if (this.finalized) {
      return;
    }
    this.finalized = true;
    var blocks = this.blocks, i = this.lastByteIndex;
    blocks[16] = this.block;
    blocks[i >> 2] |= EXTRA[i & 3];
    this.block = blocks[16];
    if (i >= 56) {
      if (!this.hashed) {
        this.hash();
      }
      blocks[0] = this.block;
      blocks[16] = blocks[1] = blocks[2] = blocks[3] =
        blocks[4] = blocks[5] = blocks[6] = blocks[7] =
        blocks[8] = blocks[9] = blocks[10] = blocks[11] =
        blocks[12] = blocks[13] = blocks[14] = blocks[15] = 0;
    }
    blocks[14] = this.hBytes << 3 | this.bytes >>> 29;
    blocks[15] = this.bytes << 3;
    this.hash();
  };

  Sha256.prototype.hash = function () {
    var a = this.h0, b = this.h1, c = this.h2, d = this.h3, e = this.h4, f = this.h5, g = this.h6,
      h = this.h7, blocks = this.blocks, j, s0, s1, maj, t1, t2, ch, ab, da, cd, bc;

    for (j = 16; j < 64; ++j) {
      // rightrotate
      t1 = blocks[j - 15];
      s0 = ((t1 >>> 7) | (t1 << 25)) ^ ((t1 >>> 18) | (t1 << 14)) ^ (t1 >>> 3);
      t1 = blocks[j - 2];
      s1 = ((t1 >>> 17) | (t1 << 15)) ^ ((t1 >>> 19) | (t1 << 13)) ^ (t1 >>> 10);
      blocks[j] = blocks[j - 16] + s0 + blocks[j - 7] + s1 << 0;
    }

    bc = b & c;
    for (j = 0; j < 64; j += 4) {
      if (this.first) {
        if (this.is224) {
          ab = 300032;
          t1 = blocks[0] - 1413257819;
          h = t1 - 150054599 << 0;
          d = t1 + 24177077 << 0;
        } else {
          ab = 704751109;
          t1 = blocks[0] - 210244248;
          h = t1 - 1521486534 << 0;
          d = t1 + 143694565 << 0;
        }
        this.first = false;
      } else {
        s0 = ((a >>> 2) | (a << 30)) ^ ((a >>> 13) | (a << 19)) ^ ((a >>> 22) | (a << 10));
        s1 = ((e >>> 6) | (e << 26)) ^ ((e >>> 11) | (e << 21)) ^ ((e >>> 25) | (e << 7));
        ab = a & b;
        maj = ab ^ (a & c) ^ bc;
        ch = (e & f) ^ (~e & g);
        t1 = h + s1 + ch + K[j] + blocks[j];
        t2 = s0 + maj;
        h = d + t1 << 0;
        d = t1 + t2 << 0;
      }
      s0 = ((d >>> 2) | (d << 30)) ^ ((d >>> 13) | (d << 19)) ^ ((d >>> 22) | (d << 10));
      s1 = ((h >>> 6) | (h << 26)) ^ ((h >>> 11) | (h << 21)) ^ ((h >>> 25) | (h << 7));
      da = d & a;
      maj = da ^ (d & b) ^ ab;
      ch = (h & e) ^ (~h & f);
      t1 = g + s1 + ch + K[j + 1] + blocks[j + 1];
      t2 = s0 + maj;
      g = c + t1 << 0;
      c = t1 + t2 << 0;
      s0 = ((c >>> 2) | (c << 30)) ^ ((c >>> 13) | (c << 19)) ^ ((c >>> 22) | (c << 10));
      s1 = ((g >>> 6) | (g << 26)) ^ ((g >>> 11) | (g << 21)) ^ ((g >>> 25) | (g << 7));
      cd = c & d;
      maj = cd ^ (c & a) ^ da;
      ch = (g & h) ^ (~g & e);
      t1 = f + s1 + ch + K[j + 2] + blocks[j + 2];
      t2 = s0 + maj;
      f = b + t1 << 0;
      b = t1 + t2 << 0;
      s0 = ((b >>> 2) | (b << 30)) ^ ((b >>> 13) | (b << 19)) ^ ((b >>> 22) | (b << 10));
      s1 = ((f >>> 6) | (f << 26)) ^ ((f >>> 11) | (f << 21)) ^ ((f >>> 25) | (f << 7));
      bc = b & c;
      maj = bc ^ (b & d) ^ cd;
      ch = (f & g) ^ (~f & h);
      t1 = e + s1 + ch + K[j + 3] + blocks[j + 3];
      t2 = s0 + maj;
      e = a + t1 << 0;
      a = t1 + t2 << 0;
    }

    this.h0 = this.h0 + a << 0;
    this.h1 = this.h1 + b << 0;
    this.h2 = this.h2 + c << 0;
    this.h3 = this.h3 + d << 0;
    this.h4 = this.h4 + e << 0;
    this.h5 = this.h5 + f << 0;
    this.h6 = this.h6 + g << 0;
    this.h7 = this.h7 + h << 0;
  };

  Sha256.prototype.hex = function () {
    this.finalize();

    var h0 = this.h0, h1 = this.h1, h2 = this.h2, h3 = this.h3, h4 = this.h4, h5 = this.h5,
      h6 = this.h6, h7 = this.h7;

    var hex = HEX_CHARS[(h0 >> 28) & 0x0F] + HEX_CHARS[(h0 >> 24) & 0x0F] +
      HEX_CHARS[(h0 >> 20) & 0x0F] + HEX_CHARS[(h0 >> 16) & 0x0F] +
      HEX_CHARS[(h0 >> 12) & 0x0F] + HEX_CHARS[(h0 >> 8) & 0x0F] +
      HEX_CHARS[(h0 >> 4) & 0x0F] + HEX_CHARS[h0 & 0x0F] +
      HEX_CHARS[(h1 >> 28) & 0x0F] + HEX_CHARS[(h1 >> 24) & 0x0F] +
      HEX_CHARS[(h1 >> 20) & 0x0F] + HEX_CHARS[(h1 >> 16) & 0x0F] +
      HEX_CHARS[(h1 >> 12) & 0x0F] + HEX_CHARS[(h1 >> 8) & 0x0F] +
      HEX_CHARS[(h1 >> 4) & 0x0F] + HEX_CHARS[h1 & 0x0F] +
      HEX_CHARS[(h2 >> 28) & 0x0F] + HEX_CHARS[(h2 >> 24) & 0x0F] +
      HEX_CHARS[(h2 >> 20) & 0x0F] + HEX_CHARS[(h2 >> 16) & 0x0F] +
      HEX_CHARS[(h2 >> 12) & 0x0F] + HEX_CHARS[(h2 >> 8) & 0x0F] +
      HEX_CHARS[(h2 >> 4) & 0x0F] + HEX_CHARS[h2 & 0x0F] +
      HEX_CHARS[(h3 >> 28) & 0x0F] + HEX_CHARS[(h3 >> 24) & 0x0F] +
      HEX_CHARS[(h3 >> 20) & 0x0F] + HEX_CHARS[(h3 >> 16) & 0x0F] +
      HEX_CHARS[(h3 >> 12) & 0x0F] + HEX_CHARS[(h3 >> 8) & 0x0F] +
      HEX_CHARS[(h3 >> 4) & 0x0F] + HEX_CHARS[h3 & 0x0F] +
      HEX_CHARS[(h4 >> 28) & 0x0F] + HEX_CHARS[(h4 >> 24) & 0x0F] +
      HEX_CHARS[(h4 >> 20) & 0x0F] + HEX_CHARS[(h4 >> 16) & 0x0F] +
      HEX_CHARS[(h4 >> 12) & 0x0F] + HEX_CHARS[(h4 >> 8) & 0x0F] +
      HEX_CHARS[(h4 >> 4) & 0x0F] + HEX_CHARS[h4 & 0x0F] +
      HEX_CHARS[(h5 >> 28) & 0x0F] + HEX_CHARS[(h5 >> 24) & 0x0F] +
      HEX_CHARS[(h5 >> 20) & 0x0F] + HEX_CHARS[(h5 >> 16) & 0x0F] +
      HEX_CHARS[(h5 >> 12) & 0x0F] + HEX_CHARS[(h5 >> 8) & 0x0F] +
      HEX_CHARS[(h5 >> 4) & 0x0F] + HEX_CHARS[h5 & 0x0F] +
      HEX_CHARS[(h6 >> 28) & 0x0F] + HEX_CHARS[(h6 >> 24) & 0x0F] +
      HEX_CHARS[(h6 >> 20) & 0x0F] + HEX_CHARS[(h6 >> 16) & 0x0F] +
      HEX_CHARS[(h6 >> 12) & 0x0F] + HEX_CHARS[(h6 >> 8) & 0x0F] +
      HEX_CHARS[(h6 >> 4) & 0x0F] + HEX_CHARS[h6 & 0x0F];
    if (!this.is224) {
      hex += HEX_CHARS[(h7 >> 28) & 0x0F] + HEX_CHARS[(h7 >> 24) & 0x0F] +
        HEX_CHARS[(h7 >> 20) & 0x0F] + HEX_CHARS[(h7 >> 16) & 0x0F] +
        HEX_CHARS[(h7 >> 12) & 0x0F] + HEX_CHARS[(h7 >> 8) & 0x0F] +
        HEX_CHARS[(h7 >> 4) & 0x0F] + HEX_CHARS[h7 & 0x0F];
    }
    return hex;
  };

  Sha256.prototype.toString = Sha256.prototype.hex;

  Sha256.prototype.digest = function () {
    this.finalize();

    var h0 = this.h0, h1 = this.h1, h2 = this.h2, h3 = this.h3, h4 = this.h4, h5 = this.h5,
      h6 = this.h6, h7 = this.h7;

    var arr = [
      (h0 >> 24) & 0xFF, (h0 >> 16) & 0xFF, (h0 >> 8) & 0xFF, h0 & 0xFF,
      (h1 >> 24) & 0xFF, (h1 >> 16) & 0xFF, (h1 >> 8) & 0xFF, h1 & 0xFF,
      (h2 >> 24) & 0xFF, (h2 >> 16) & 0xFF, (h2 >> 8) & 0xFF, h2 & 0xFF,
      (h3 >> 24) & 0xFF, (h3 >> 16) & 0xFF, (h3 >> 8) & 0xFF, h3 & 0xFF,
      (h4 >> 24) & 0xFF, (h4 >> 16) & 0xFF, (h4 >> 8) & 0xFF, h4 & 0xFF,
      (h5 >> 24) & 0xFF, (h5 >> 16) & 0xFF, (h5 >> 8) & 0xFF, h5 & 0xFF,
      (h6 >> 24) & 0xFF, (h6 >> 16) & 0xFF, (h6 >> 8) & 0xFF, h6 & 0xFF
    ];
    if (!this.is224) {
      arr.push((h7 >> 24) & 0xFF, (h7 >> 16) & 0xFF, (h7 >> 8) & 0xFF, h7 & 0xFF);
    }
    return arr;
  };

  Sha256.prototype.array = Sha256.prototype.digest;

  Sha256.prototype.arrayBuffer = function () {
    this.finalize();

    var buffer = new ArrayBuffer(this.is224 ? 28 : 32);
    var dataView = new DataView(buffer);
    dataView.setUint32(0, this.h0);
    dataView.setUint32(4, this.h1);
    dataView.setUint32(8, this.h2);
    dataView.setUint32(12, this.h3);
    dataView.setUint32(16, this.h4);
    dataView.setUint32(20, this.h5);
    dataView.setUint32(24, this.h6);
    if (!this.is224) {
      dataView.setUint32(28, this.h7);
    }
    return buffer;
  };

  function HmacSha256(key, is224, sharedMemory) {
    var i, type = typeof key;
    if (type === 'string') {
      var bytes = [], length = key.length, index = 0, code;
      for (i = 0; i < length; ++i) {
        code = key.charCodeAt(i);
        if (code < 0x80) {
          bytes[index++] = code;
        } else if (code < 0x800) {
          bytes[index++] = (0xc0 | (code >> 6));
          bytes[index++] = (0x80 | (code & 0x3f));
        } else if (code < 0xd800 || code >= 0xe000) {
          bytes[index++] = (0xe0 | (code >> 12));
          bytes[index++] = (0x80 | ((code >> 6) & 0x3f));
          bytes[index++] = (0x80 | (code & 0x3f));
        } else {
          code = 0x10000 + (((code & 0x3ff) << 10) | (key.charCodeAt(++i) & 0x3ff));
          bytes[index++] = (0xf0 | (code >> 18));
          bytes[index++] = (0x80 | ((code >> 12) & 0x3f));
          bytes[index++] = (0x80 | ((code >> 6) & 0x3f));
          bytes[index++] = (0x80 | (code & 0x3f));
        }
      }
      key = bytes;
    } else {
      if (type === 'object') {
        if (key === null) {
          throw new Error(ERROR);
        } else if (ARRAY_BUFFER && key.constructor === ArrayBuffer) {
          key = new Uint8Array(key);
        } else if (!Array.isArray(key)) {
          if (!ARRAY_BUFFER || !ArrayBuffer.isView(key)) {
            throw new Error(ERROR);
          }
        }
      } else {
        throw new Error(ERROR);
      }
    }

    if (key.length > 64) {
      key = (new Sha256(is224, true)).update(key).array();
    }

    var oKeyPad = [], iKeyPad = [];
    for (i = 0; i < 64; ++i) {
      var b = key[i] || 0;
      oKeyPad[i] = 0x5c ^ b;
      iKeyPad[i] = 0x36 ^ b;
    }

    Sha256.call(this, is224, sharedMemory);

    this.update(iKeyPad);
    this.oKeyPad = oKeyPad;
    this.inner = true;
    this.sharedMemory = sharedMemory;
  }
  HmacSha256.prototype = new Sha256();

  HmacSha256.prototype.finalize = function () {
    Sha256.prototype.finalize.call(this);
    if (this.inner) {
      this.inner = false;
      var innerHash = this.array();
      Sha256.call(this, this.is224, this.sharedMemory);
      this.update(this.oKeyPad);
      this.update(innerHash);
      Sha256.prototype.finalize.call(this);
    }
  };

  var exports = createMethod();
  exports.sha256 = exports;
  exports.sha224 = createMethod(true);
  exports.sha256.hmac = createHmacMethod();
  exports.sha224.hmac = createHmacMethod(true);

  if (COMMON_JS) {
    module.exports = exports;
  } else {
    root.sha256 = exports.sha256;
    root.sha224 = exports.sha224;
    if (AMD) {
      !(__WEBPACK_AMD_DEFINE_RESULT__ = (function () {
        return exports;
      }).call(exports, __webpack_require__, exports, module),
		__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
    }
  }
})();


/***/ }),

/***/ "./node_modules/@babel/runtime/helpers/esm/classCallCheck.js":
/*!*******************************************************************!*\
  !*** ./node_modules/@babel/runtime/helpers/esm/classCallCheck.js ***!
  \*******************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ _classCallCheck)
/* harmony export */ });
function _classCallCheck(instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
}

/***/ }),

/***/ "./node_modules/@babel/runtime/helpers/esm/createClass.js":
/*!****************************************************************!*\
  !*** ./node_modules/@babel/runtime/helpers/esm/createClass.js ***!
  \****************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ _createClass)
/* harmony export */ });
/* harmony import */ var _toPropertyKey_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./toPropertyKey.js */ "./node_modules/@babel/runtime/helpers/esm/toPropertyKey.js");

function _defineProperties(target, props) {
  for (var i = 0; i < props.length; i++) {
    var descriptor = props[i];
    descriptor.enumerable = descriptor.enumerable || false;
    descriptor.configurable = true;
    if ("value" in descriptor) descriptor.writable = true;
    Object.defineProperty(target, (0,_toPropertyKey_js__WEBPACK_IMPORTED_MODULE_0__["default"])(descriptor.key), descriptor);
  }
}
function _createClass(Constructor, protoProps, staticProps) {
  if (protoProps) _defineProperties(Constructor.prototype, protoProps);
  if (staticProps) _defineProperties(Constructor, staticProps);
  Object.defineProperty(Constructor, "prototype", {
    writable: false
  });
  return Constructor;
}

/***/ }),

/***/ "./node_modules/@babel/runtime/helpers/esm/defineProperty.js":
/*!*******************************************************************!*\
  !*** ./node_modules/@babel/runtime/helpers/esm/defineProperty.js ***!
  \*******************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ _defineProperty)
/* harmony export */ });
/* harmony import */ var _toPropertyKey_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./toPropertyKey.js */ "./node_modules/@babel/runtime/helpers/esm/toPropertyKey.js");

function _defineProperty(obj, key, value) {
  key = (0,_toPropertyKey_js__WEBPACK_IMPORTED_MODULE_0__["default"])(key);
  if (key in obj) {
    Object.defineProperty(obj, key, {
      value: value,
      enumerable: true,
      configurable: true,
      writable: true
    });
  } else {
    obj[key] = value;
  }
  return obj;
}

/***/ }),

/***/ "./node_modules/@babel/runtime/helpers/esm/toPrimitive.js":
/*!****************************************************************!*\
  !*** ./node_modules/@babel/runtime/helpers/esm/toPrimitive.js ***!
  \****************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ _toPrimitive)
/* harmony export */ });
/* harmony import */ var _typeof_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./typeof.js */ "./node_modules/@babel/runtime/helpers/esm/typeof.js");

function _toPrimitive(input, hint) {
  if ((0,_typeof_js__WEBPACK_IMPORTED_MODULE_0__["default"])(input) !== "object" || input === null) return input;
  var prim = input[Symbol.toPrimitive];
  if (prim !== undefined) {
    var res = prim.call(input, hint || "default");
    if ((0,_typeof_js__WEBPACK_IMPORTED_MODULE_0__["default"])(res) !== "object") return res;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }
  return (hint === "string" ? String : Number)(input);
}

/***/ }),

/***/ "./node_modules/@babel/runtime/helpers/esm/toPropertyKey.js":
/*!******************************************************************!*\
  !*** ./node_modules/@babel/runtime/helpers/esm/toPropertyKey.js ***!
  \******************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ _toPropertyKey)
/* harmony export */ });
/* harmony import */ var _typeof_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./typeof.js */ "./node_modules/@babel/runtime/helpers/esm/typeof.js");
/* harmony import */ var _toPrimitive_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./toPrimitive.js */ "./node_modules/@babel/runtime/helpers/esm/toPrimitive.js");


function _toPropertyKey(arg) {
  var key = (0,_toPrimitive_js__WEBPACK_IMPORTED_MODULE_1__["default"])(arg, "string");
  return (0,_typeof_js__WEBPACK_IMPORTED_MODULE_0__["default"])(key) === "symbol" ? key : String(key);
}

/***/ }),

/***/ "./node_modules/@babel/runtime/helpers/esm/typeof.js":
/*!***********************************************************!*\
  !*** ./node_modules/@babel/runtime/helpers/esm/typeof.js ***!
  \***********************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ _typeof)
/* harmony export */ });
function _typeof(obj) {
  "@babel/helpers - typeof";

  return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) {
    return typeof obj;
  } : function (obj) {
    return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
  }, _typeof(obj);
}

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/amd options */
/******/ 	(() => {
/******/ 		__webpack_require__.amdO = {};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/compat get default export */
/******/ 	(() => {
/******/ 		// getDefaultExport function for compatibility with non-harmony modules
/******/ 		__webpack_require__.n = (module) => {
/******/ 			var getter = module && module.__esModule ?
/******/ 				() => (module['default']) :
/******/ 				() => (module);
/******/ 			__webpack_require__.d(getter, { a: getter });
/******/ 			return getter;
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/global */
/******/ 	(() => {
/******/ 		__webpack_require__.g = (function() {
/******/ 			if (typeof globalThis === 'object') return globalThis;
/******/ 			try {
/******/ 				return this || new Function('return this')();
/******/ 			} catch (e) {
/******/ 				if (typeof window === 'object') return window;
/******/ 			}
/******/ 		})();
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be in strict mode.
(() => {
"use strict";
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   SimpleKeycloak: () => (/* reexport safe */ _simpleKeycloak__WEBPACK_IMPORTED_MODULE_0__["default"]),
/* harmony export */   decodeToken: () => (/* reexport safe */ _keycloakUtils__WEBPACK_IMPORTED_MODULE_1__.decodeToken),
/* harmony export */   isTokenExpired: () => (/* reexport safe */ _keycloakUtils__WEBPACK_IMPORTED_MODULE_1__.isTokenExpired)
/* harmony export */ });
/* harmony import */ var _simpleKeycloak__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./simpleKeycloak */ "./src/simpleKeycloak.js");
/* harmony import */ var _keycloakUtils__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./keycloakUtils */ "./src/keycloakUtils.js");



})();

/******/ 	return __webpack_exports__;
/******/ })()
;
});
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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Q0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUEsaUJBQWlCLFFBQVE7QUFDekI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQSxnQkFBZ0IsUUFBUTtBQUN4QjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxVQUFVO0FBQ1Y7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsUUFBUTtBQUNSO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esa0JBQWtCLFlBQVk7QUFDOUI7QUFDQTtBQUNBO0FBQ0EsVUFBVTtBQUNWO0FBQ0E7QUFDQSxVQUFVO0FBQ1Y7QUFDQTtBQUNBO0FBQ0EsVUFBVTtBQUNWO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxNQUFNO0FBQ047QUFDQTtBQUNBO0FBQ0EsVUFBVTtBQUNWO0FBQ0EsVUFBVTtBQUNWO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsUUFBUTtBQUNSO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQSxnQkFBZ0IsUUFBUTtBQUN4QjtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSxJQUFJO0FBQ0o7QUFDQTtBQUNBO0FBQ0EsTUFBTSxtQ0FBTztBQUNiO0FBQ0EsT0FBTztBQUFBLGtHQUFDO0FBQ1I7QUFDQTtBQUNBLENBQUM7Ozs7Ozs7Ozs7Ozs7Ozs7QUNyZ0JjO0FBQ2Y7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7Ozs7Ozs7Ozs7QUNKK0M7QUFDL0M7QUFDQSxrQkFBa0Isa0JBQWtCO0FBQ3BDO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esa0NBQWtDLDZEQUFhO0FBQy9DO0FBQ0E7QUFDZTtBQUNmO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7Ozs7Ozs7Ozs7Ozs7Ozs7QUNqQitDO0FBQ2hDO0FBQ2YsUUFBUSw2REFBYTtBQUNyQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0wsSUFBSTtBQUNKO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7Ozs7Ozs7Ozs7O0FDZGtDO0FBQ25CO0FBQ2YsTUFBTSxzREFBTztBQUNiO0FBQ0E7QUFDQTtBQUNBLFFBQVEsc0RBQU87QUFDZjtBQUNBO0FBQ0E7QUFDQTs7Ozs7Ozs7Ozs7Ozs7Ozs7QUNWa0M7QUFDUztBQUM1QjtBQUNmLFlBQVksMkRBQVc7QUFDdkIsU0FBUyxzREFBTztBQUNoQjs7Ozs7Ozs7Ozs7Ozs7O0FDTGU7QUFDZjs7QUFFQTtBQUNBO0FBQ0EsSUFBSTtBQUNKO0FBQ0EsR0FBRztBQUNIOzs7Ozs7VUNSQTtVQUNBOztVQUVBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBOztVQUVBO1VBQ0E7O1VBRUE7VUFDQTtVQUNBOzs7OztXQ3RCQTs7Ozs7V0NBQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0EsaUNBQWlDLFdBQVc7V0FDNUM7V0FDQTs7Ozs7V0NQQTtXQUNBO1dBQ0E7V0FDQTtXQUNBLHlDQUF5Qyx3Q0FBd0M7V0FDakY7V0FDQTtXQUNBOzs7OztXQ1BBO1dBQ0E7V0FDQTtXQUNBO1dBQ0EsR0FBRztXQUNIO1dBQ0E7V0FDQSxDQUFDOzs7OztXQ1BEOzs7OztXQ0FBO1dBQ0E7V0FDQTtXQUNBLHVEQUF1RCxpQkFBaUI7V0FDeEU7V0FDQSxnREFBZ0QsYUFBYTtXQUM3RDs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQ044QztBQUNjIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vcmVhY3Qta2V5Y2xvYWstdXRpbHMvd2VicGFjay91bml2ZXJzYWxNb2R1bGVEZWZpbml0aW9uIiwid2VicGFjazovL3JlYWN0LWtleWNsb2FrLXV0aWxzLy4vc3JjL2tleWNsb2FrU3RvcmFnZS5qcyIsIndlYnBhY2s6Ly9yZWFjdC1rZXljbG9hay11dGlscy8uL3NyYy9rZXljbG9ha1V0aWxzLmpzIiwid2VicGFjazovL3JlYWN0LWtleWNsb2FrLXV0aWxzLy4vc3JjL3NpbXBsZUtleWNsb2FrLmpzIiwid2VicGFjazovL3JlYWN0LWtleWNsb2FrLXV0aWxzLy4vbm9kZV9tb2R1bGVzL2Jhc2U2NC1qcy9pbmRleC5qcyIsIndlYnBhY2s6Ly9yZWFjdC1rZXljbG9hay11dGlscy8uL25vZGVfbW9kdWxlcy9qcy1zaGEyNTYvc3JjL3NoYTI1Ni5qcyIsIndlYnBhY2s6Ly9yZWFjdC1rZXljbG9hay11dGlscy8uL25vZGVfbW9kdWxlcy9AYmFiZWwvcnVudGltZS9oZWxwZXJzL2VzbS9jbGFzc0NhbGxDaGVjay5qcyIsIndlYnBhY2s6Ly9yZWFjdC1rZXljbG9hay11dGlscy8uL25vZGVfbW9kdWxlcy9AYmFiZWwvcnVudGltZS9oZWxwZXJzL2VzbS9jcmVhdGVDbGFzcy5qcyIsIndlYnBhY2s6Ly9yZWFjdC1rZXljbG9hay11dGlscy8uL25vZGVfbW9kdWxlcy9AYmFiZWwvcnVudGltZS9oZWxwZXJzL2VzbS9kZWZpbmVQcm9wZXJ0eS5qcyIsIndlYnBhY2s6Ly9yZWFjdC1rZXljbG9hay11dGlscy8uL25vZGVfbW9kdWxlcy9AYmFiZWwvcnVudGltZS9oZWxwZXJzL2VzbS90b1ByaW1pdGl2ZS5qcyIsIndlYnBhY2s6Ly9yZWFjdC1rZXljbG9hay11dGlscy8uL25vZGVfbW9kdWxlcy9AYmFiZWwvcnVudGltZS9oZWxwZXJzL2VzbS90b1Byb3BlcnR5S2V5LmpzIiwid2VicGFjazovL3JlYWN0LWtleWNsb2FrLXV0aWxzLy4vbm9kZV9tb2R1bGVzL0BiYWJlbC9ydW50aW1lL2hlbHBlcnMvZXNtL3R5cGVvZi5qcyIsIndlYnBhY2s6Ly9yZWFjdC1rZXljbG9hay11dGlscy93ZWJwYWNrL2Jvb3RzdHJhcCIsIndlYnBhY2s6Ly9yZWFjdC1rZXljbG9hay11dGlscy93ZWJwYWNrL3J1bnRpbWUvYW1kIG9wdGlvbnMiLCJ3ZWJwYWNrOi8vcmVhY3Qta2V5Y2xvYWstdXRpbHMvd2VicGFjay9ydW50aW1lL2NvbXBhdCBnZXQgZGVmYXVsdCBleHBvcnQiLCJ3ZWJwYWNrOi8vcmVhY3Qta2V5Y2xvYWstdXRpbHMvd2VicGFjay9ydW50aW1lL2RlZmluZSBwcm9wZXJ0eSBnZXR0ZXJzIiwid2VicGFjazovL3JlYWN0LWtleWNsb2FrLXV0aWxzL3dlYnBhY2svcnVudGltZS9nbG9iYWwiLCJ3ZWJwYWNrOi8vcmVhY3Qta2V5Y2xvYWstdXRpbHMvd2VicGFjay9ydW50aW1lL2hhc093blByb3BlcnR5IHNob3J0aGFuZCIsIndlYnBhY2s6Ly9yZWFjdC1rZXljbG9hay11dGlscy93ZWJwYWNrL3J1bnRpbWUvbWFrZSBuYW1lc3BhY2Ugb2JqZWN0Iiwid2VicGFjazovL3JlYWN0LWtleWNsb2FrLXV0aWxzLy4vc3JjL2luZGV4LmpzIl0sInNvdXJjZXNDb250ZW50IjpbIihmdW5jdGlvbiB3ZWJwYWNrVW5pdmVyc2FsTW9kdWxlRGVmaW5pdGlvbihyb290LCBmYWN0b3J5KSB7XG5cdGlmKHR5cGVvZiBleHBvcnRzID09PSAnb2JqZWN0JyAmJiB0eXBlb2YgbW9kdWxlID09PSAnb2JqZWN0Jylcblx0XHRtb2R1bGUuZXhwb3J0cyA9IGZhY3RvcnkoKTtcblx0ZWxzZSBpZih0eXBlb2YgZGVmaW5lID09PSAnZnVuY3Rpb24nICYmIGRlZmluZS5hbWQpXG5cdFx0ZGVmaW5lKFtdLCBmYWN0b3J5KTtcblx0ZWxzZSBpZih0eXBlb2YgZXhwb3J0cyA9PT0gJ29iamVjdCcpXG5cdFx0ZXhwb3J0c1tcInJlYWN0LWtleWNsb2FrLXV0aWxzXCJdID0gZmFjdG9yeSgpO1xuXHRlbHNlXG5cdFx0cm9vdFtcInJlYWN0LWtleWNsb2FrLXV0aWxzXCJdID0gZmFjdG9yeSgpO1xufSkodGhpcywgKCkgPT4ge1xucmV0dXJuICIsImNvbnN0IEtFWUNMT0FLX0NBTExCQUNLX1BSRUZJWCA9ICdrYy1jYWxsYmFjay0nO1xuY29uc3QgVE9LRU5fU1RPUkFHRV9OQU1FID0gJ2tjLXRva2Vucyc7XG5cbmNvbnN0IGNsZWFyRXhwaXJlZCA9IChrZXljbG9ha0NhbGxiYWNrUHJlZml4KSA9PiB7XG4gIGNvbnN0IHRpbWUgPSBuZXcgRGF0ZSgpLmdldFRpbWUoKTtcbiAgZm9yIChsZXQgaSA9IDA7IGkgPCBsb2NhbFN0b3JhZ2UubGVuZ3RoOyBpKyspICB7XG4gICAgY29uc3Qga2V5ID0gbG9jYWxTdG9yYWdlLmtleShpKTtcbiAgICBpZiAoa2V5ICYmIGtleS5pbmRleE9mKGtleWNsb2FrQ2FsbGJhY2tQcmVmaXgpID09PSAwKSB7XG4gICAgICBjb25zdCB2YWx1ZSA9IGxvY2FsU3RvcmFnZS5nZXRJdGVtKGtleSk7XG4gICAgICBpZiAodmFsdWUpIHtcbiAgICAgICAgdHJ5IHtcbiAgICAgICAgICBjb25zdCBleHBpcmVzID0gSlNPTi5wYXJzZSh2YWx1ZSkuZXhwaXJlcztcbiAgICAgICAgICBpZiAoIWV4cGlyZXMgfHwgZXhwaXJlcyA8IHRpbWUpIHtcbiAgICAgICAgICAgIGxvY2FsU3RvcmFnZS5yZW1vdmVJdGVtKGtleSk7XG4gICAgICAgICAgfVxuICAgICAgICB9IGNhdGNoIChlcnIpIHtcbiAgICAgICAgICBsb2NhbFN0b3JhZ2UucmVtb3ZlSXRlbShrZXkpO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuICB9XG59O1xuXG5jbGFzcyBMb2NhbFN0b3JhZ2V7XG4gIGNvbnN0cnVjdG9yKGtleWNsb2FrQ2FsbGJhY2tQcmVmaXgpIHtcbiAgICBsb2NhbFN0b3JhZ2Uuc2V0SXRlbSgna2MtdGVzdCcsICd0ZXN0Jyk7XG4gICAgbG9jYWxTdG9yYWdlLnJlbW92ZUl0ZW0oJ2tjLXRlc3QnKTtcbiAgICB0aGlzLmtleWNsb2FrQ2FsbGJhY2tQcmVmaXggPSBrZXljbG9ha0NhbGxiYWNrUHJlZml4O1xuICAgIHJldHVybiB0aGlzO1xuICB9XG5cbiAgZ2V0ID0gKHN0YXRlKSA9PiB7XG4gICAgaWYgKCFzdGF0ZSkge1xuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIGNvbnN0IGtleSA9IGAke3RoaXMua2V5Y2xvYWtDYWxsYmFja1ByZWZpeH0ke3N0YXRlfWA7XG4gICAgbGV0IHZhbHVlID0gbG9jYWxTdG9yYWdlLmdldEl0ZW0oa2V5KTtcbiAgICBpZiAodmFsdWUpIHtcbiAgICAgIGxvY2FsU3RvcmFnZS5yZW1vdmVJdGVtKGtleSk7XG4gICAgICB2YWx1ZSA9IEpTT04ucGFyc2UodmFsdWUpO1xuICAgIH1cblxuICAgIGNsZWFyRXhwaXJlZCh0aGlzLmtleWNsb2FrQ2FsbGJhY2tQcmVmaXgpO1xuICAgIHJldHVybiB2YWx1ZTtcbiAgfTtcblxuICBhZGQgPSAoc3RhdGVEYXRhKSA9PiB7XG4gICAgY2xlYXJFeHBpcmVkKHRoaXMua2V5Y2xvYWtDYWxsYmFja1ByZWZpeCk7XG5cbiAgICBjb25zdCBrZXkgPSBgJHt0aGlzLmtleWNsb2FrQ2FsbGJhY2tQcmVmaXh9JHtzdGF0ZURhdGEuc3RhdGV9YDtcbiAgICBzdGF0ZURhdGEuZXhwaXJlcyA9IG5ldyBEYXRlKCkuZ2V0VGltZSgpICsgKDYwICogNjAgKiAxMDAwKTtcbiAgICBsb2NhbFN0b3JhZ2Uuc2V0SXRlbShrZXksIEpTT04uc3RyaW5naWZ5KHN0YXRlRGF0YSkpO1xuICB9O1xufVxuXG5cbmNvbnN0IGNvb2tpZUV4cGlyYXRpb24gPSAobWludXRlcykgPT4ge1xuICBjb25zdCBleHAgPSBuZXcgRGF0ZSgpO1xuICBleHAuc2V0VGltZShleHAuZ2V0VGltZSgpICsgKG1pbnV0ZXMqNjAqMTAwMCkpO1xuICByZXR1cm4gZXhwO1xufTtcblxuY29uc3QgZ2V0Q29va2llID0gKGtleSkgPT4ge1xuICBjb25zdCBuYW1lID0ga2V5ICsgJz0nO1xuICBjb25zdCBjYSA9IGRvY3VtZW50LmNvb2tpZS5zcGxpdCgnOycpO1xuICBmb3IgKGxldCBpID0gMDsgaSA8IGNhLmxlbmd0aDsgaSsrKSB7XG4gICAgbGV0IGMgPSBjYVtpXTtcbiAgICB3aGlsZSAoYy5jaGFyQXQoMCkgPT09ICcgJykge1xuICAgICAgYyA9IGMuc3Vic3RyaW5nKDEpO1xuICAgIH1cbiAgICBpZiAoYy5pbmRleE9mKG5hbWUpID09PSAwKSB7XG4gICAgICByZXR1cm4gYy5zdWJzdHJpbmcobmFtZS5sZW5ndGgsIGMubGVuZ3RoKTtcbiAgICB9XG4gIH1cbiAgcmV0dXJuICcnO1xufTtcblxuY29uc3Qgc2V0Q29va2llID0gKGtleSwgdmFsdWUsIGV4cGlyYXRpb25EYXRlKSA9PiB7XG4gIGRvY3VtZW50LmNvb2tpZSA9IGAke2tleX09JHt2YWx1ZX07IGV4cGlyZXM9JHtleHBpcmF0aW9uRGF0ZS50b1VUQ1N0cmluZygpfTsgYDtcbn07XG5cbmNsYXNzIENvb2tpZVN0b3JhZ2V7XG4gIGNvbnN0cnVjdG9yKGtleWNsb2FrQ2FsbGJhY2tQcmVmaXgpIHtcbiAgICB0aGlzLmtleWNsb2FrQ2FsbGJhY2tQcmVmaXggPSBrZXljbG9ha0NhbGxiYWNrUHJlZml4O1xuICAgIHJldHVybiB0aGlzO1xuICB9XG5cbiAgZ2V0ID0gKHN0YXRlKSA9PiB7XG4gICAgaWYgKCFzdGF0ZSkge1xuICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICBjb25zdCBrZXkgPSBgJHt0aGlzLmtleWNsb2FrQ2FsbGJhY2tQcmVmaXh9JHtzdGF0ZX1gO1xuICAgIGNvbnN0IHZhbHVlID0gZ2V0Q29va2llKGtleSk7XG4gICAgc2V0Q29va2llKGtleSwgJycsIGNvb2tpZUV4cGlyYXRpb24oLTEwMCkpO1xuICAgIGlmICh2YWx1ZSkge1xuICAgICAgcmV0dXJuIEpTT04ucGFyc2UodmFsdWUpO1xuICAgIH1cbiAgfTtcblxuICBhZGQgPSAoc3RhdGVEYXRhKSA9PiB7XG4gICAgY29uc3Qga2V5ID0gYCR7dGhpcy5rZXljbG9ha0NhbGxiYWNrUHJlZml4fSR7c3RhdGVEYXRhLnN0YXRlfWA7XG4gICAgc2V0Q29va2llKGtleSwgSlNPTi5zdHJpbmdpZnkoc3RhdGVEYXRhKSwgY29va2llRXhwaXJhdGlvbig2MCkpO1xuICB9O1xuXG5cbn1cblxuZXhwb3J0IGNvbnN0IGNyZWF0ZUNhbGxiYWNrU3RvcmFnZSA9IChrZXljbG9ha0NhbGxiYWNrUHJlZml4KSA9PiB7XG4gIHRyeSB7XG4gICAgcmV0dXJuIG5ldyBMb2NhbFN0b3JhZ2Uoa2V5Y2xvYWtDYWxsYmFja1ByZWZpeD1LRVlDTE9BS19DQUxMQkFDS19QUkVGSVgpO1xuICB9IGNhdGNoIChlcnIpIHt9XG4gIHJldHVybiBuZXcgQ29va2llU3RvcmFnZShrZXljbG9ha0NhbGxiYWNrUHJlZml4PUtFWUNMT0FLX0NBTExCQUNLX1BSRUZJWCk7XG59O1xuXG5cbmNsYXNzIExvY2FsVG9rZW5TdG9yYWdle1xuICBjb25zdHJ1Y3Rvcih0b2tlblN0b3JhZ2VOYW1lKSB7XG4gICAgdGhpcy50b2tlblN0b3JhZ2VOYW1lID0gdG9rZW5TdG9yYWdlTmFtZTtcbiAgICBsb2NhbFN0b3JhZ2Uuc2V0SXRlbSgna2MtdGVzdCcsICd0ZXN0Jyk7XG4gICAgbG9jYWxTdG9yYWdlLnJlbW92ZUl0ZW0oJ2tjLXRlc3QnKTtcbiAgICByZXR1cm4gdGhpcztcbiAgfVxuICBhZGQgPSAoZGF0YSkgPT4ge1xuICAgIGxvY2FsU3RvcmFnZS5zZXRJdGVtKHRoaXMudG9rZW5TdG9yYWdlTmFtZSwgSlNPTi5zdHJpbmdpZnkoZGF0YSkpO1xuICB9XG5cbiAgZ2V0ID0gKCkgPT4ge1xuICAgIGNvbnN0IHZhbHVlID0gbG9jYWxTdG9yYWdlLmdldEl0ZW0odGhpcy50b2tlblN0b3JhZ2VOYW1lKTtcbiAgICBpZih2YWx1ZSkge1xuICAgICAgcmV0dXJuIEpTT04ucGFyc2UodmFsdWUpO1xuICAgIH1cbiAgfVxuXG4gIHJlbW92ZSA9ICgpID0+IHtcbiAgICBsb2NhbFN0b3JhZ2UucmVtb3ZlSXRlbSh0aGlzLnRva2VuU3RvcmFnZU5hbWUpO1xuICB9XG59XG5cbmNsYXNzIENvb2tpZVRva2VuU3RvcmFnZXtcbiAgY29uc3RydWN0b3IodG9rZW5TdG9yYWdlTmFtZSkge1xuICAgIHRoaXMudG9rZW5TdG9yYWdlTmFtZSA9IHRva2VuU3RvcmFnZU5hbWU7XG4gICAgcmV0dXJuIHRoaXM7XG4gIH1cblxuICBhZGQgPSAoZGF0YSkgPT4ge1xuICAgIHNldENvb2tpZSh0aGlzLnRva2VuU3RvcmFnZU5hbWUsIEpTT04uc3RyaW5naWZ5KGRhdGEpLCBjb29raWVFeHBpcmF0aW9uKDM2MDApKTtcbiAgfVxuXG4gIGdldCA9ICgpID0+IHtcbiAgICBjb25zdCB2YWx1ZSA9IGdldENvb2tpZSh0aGlzLnRva2VuU3RvcmFnZU5hbWUpO1xuICAgIGlmICh2YWx1ZSkge1xuICAgICAgcmV0dXJuIEpTT04ucGFyc2UodmFsdWUpO1xuICAgIH1cbiAgfVxuXG4gIHJlbW92ZSA9ICgpID0+IHtcbiAgICBzZXRDb29raWUodGhpcy50b2tlblN0b3JhZ2VOYW1lLCAnJywgY29va2llRXhwaXJhdGlvbigtMTAwKSk7XG4gIH07XG59XG5cblxuLy8gMiB0eXBlIHN0b3JhZ2U6XG4vLyAxIFRva2VuU3RvcmFnZSBjbGFzcyB3aXRoIG1ldGhvZHMgYWRkIGdldCByZW1vdmVcbi8vIDIgVGlja2V0U3RvcmFnZSBjbGFzcyB3aXRoIG5hbWUgK3N0YXRlSWQgYW5kIG1ldGhvZHMgYWRkIGdldCByZW1vdmUgd2hlbiBnZXRcblxuZXhwb3J0IGNvbnN0IGNyZWF0ZVRva2VuU3RvcmFnZSA9ICh0b2tlblN0b3JhZ2VOYW1lPVRPS0VOX1NUT1JBR0VfTkFNRSkgPT4ge1xuICB0cnkge1xuICAgIHJldHVybiBuZXcgTG9jYWxUb2tlblN0b3JhZ2UodG9rZW5TdG9yYWdlTmFtZSk7XG4gIH0gY2F0Y2ggKGVycikge31cbiAgcmV0dXJuIG5ldyBDb29raWVUb2tlblN0b3JhZ2UodG9rZW5TdG9yYWdlTmFtZSk7XG59XG4iLCJpbXBvcnQge3NoYTI1Nn0gZnJvbSAnanMtc2hhMjU2JztcbmltcG9ydCAqIGFzIGJhc2U2NEpzIGZyb20gJ2Jhc2U2NC1qcyc7XG5cbmNvbnN0IGdlbmVyYXRlUmFuZG9tRGF0YSA9IChsZW4pID0+IHtcbiAgY29uc3QgYXJyYXkgPSBuZXcgQXJyYXkobGVuKTtcbiAgZm9yIChsZXQgaiA9IDA7IGogPCBhcnJheS5sZW5ndGg7IGorKykge1xuICAgIGFycmF5W2pdID0gTWF0aC5mbG9vcigyNTYgKiBNYXRoLnJhbmRvbSgpKTtcbiAgfVxuICByZXR1cm4gYXJyYXk7XG59XG5cbmNvbnN0IGdlbmVyYXRlUmFuZG9tU3RyaW5nID0gKGxlbiwgYWxwaGFiZXQpID0+IHtcbiAgY29uc3QgcmFuZG9tRGF0YSA9IGdlbmVyYXRlUmFuZG9tRGF0YShsZW4pO1xuICBjb25zdCBjaGFycyA9IG5ldyBBcnJheShsZW4pO1xuICBmb3IgKGxldCBpID0gMDsgaSA8IGxlbjsgaSsrKSB7XG4gICAgY2hhcnNbaV0gPSBhbHBoYWJldC5jaGFyQ29kZUF0KHJhbmRvbURhdGFbaV0gJSBhbHBoYWJldC5sZW5ndGgpO1xuICB9XG4gIHJldHVybiBTdHJpbmcuZnJvbUNoYXJDb2RlLmFwcGx5KG51bGwsIGNoYXJzKTtcbn1cblxuY29uc3QgZ2VuZXJhdGVDb2RlVmVyaWZpZXIgPSAobGVuKSA9PiB7XG4gIHJldHVybiBnZW5lcmF0ZVJhbmRvbVN0cmluZyhsZW4sICdBQkNERUZHSElKS0xNTk9QUVJTVFVWV1hZWmFiY2RlZmdoaWprbG1ub3BxcnN0dXZ3eHl6MDEyMzQ1Njc4OScpO1xufVxuXG5jb25zdCBnZW5lcmF0ZVBrY2VDaGFsbGVuZ2UgPSAoY29kZVZlcmlmaWVyKSA9PiB7XG4gICAgICBjb25zdCBoYXNoQnl0ZXMgPSBuZXcgVWludDhBcnJheShzaGEyNTYuYXJyYXlCdWZmZXIoY29kZVZlcmlmaWVyKSk7XG4gICAgICBjb25zdCBlbmNvZGVkSGFzaCA9IGJhc2U2NEpzLmZyb21CeXRlQXJyYXkoaGFzaEJ5dGVzKVxuICAgICAgICAucmVwbGFjZSgvXFwrL2csICctJylcbiAgICAgICAgLnJlcGxhY2UoL1xcLy9nLCAnXycpXG4gICAgICAgIC5yZXBsYWNlKC9cXD0vZywgJycpO1xuICAgICAgcmV0dXJuIGVuY29kZWRIYXNoO1xufVxuXG5jb25zdCBjcmVhdGVVVUlEID0gKCkgPT4ge1xuICBjb25zdCBoZXhEaWdpdHMgPSAnMDEyMzQ1Njc4OWFiY2RlZic7XG4gIGNvbnN0IHMgPSBnZW5lcmF0ZVJhbmRvbVN0cmluZygzNiwgaGV4RGlnaXRzKS5zcGxpdChcIlwiKTtcbiAgc1sxNF0gPSAnNCc7XG4gIC8vIHNbMTldID0gaGV4RGlnaXRzLnN1YnN0cigoc1sxOV0gJiAweDMpIHwgMHg4LCAxKTtcbiAgY29uc3Qgc3RhcnQgPSAoc1sxOV0gJiAweDMpIHwgMHg4O1xuICBzWzE5XSA9IGhleERpZ2l0cy5zdWJzdHJpbmcoc3RhcnQsIHN0YXJ0KzEpO1xuICBzWzhdID0gc1sxM10gPSBzWzE4XSA9IHNbMjNdID0gJy0nO1xuICBjb25zdCB1dWlkID0gcy5qb2luKCcnKTtcbiAgcmV0dXJuIHV1aWQ7XG59XG5cbmNvbnN0IGJ1aWxkQ2xhaW1zUGFyYW1ldGVyID0gKHJlcXVlc3RlZEFjcikgPT4gSlNPTi5zdHJpbmdpZnkoe1xuICBpZF90b2tlbjoge1xuICAgIGFjcjogcmVxdWVzdGVkQWNyXG4gIH1cbn0pO1xuXG5jb25zdCBwYXJzZUNhbGxiYWNrUGFyYW1zID0gKHBhcmFtc1N0cmluZywgc3VwcG9ydGVkUGFyYW1zKSA9PiB7XG4gIGNvbnN0IHAgPSBwYXJhbXNTdHJpbmcuc3BsaXQoJyYnKTtcbiAgY29uc3QgcmVzdWx0ID0ge1xuICAgIHBhcmFtc1N0cmluZzogJycsXG4gICAgb2F1dGhQYXJhbXM6IHt9XG4gIH07XG4gIGZvciAobGV0IGkgPSAwOyBpIDwgcC5sZW5ndGg7IGkrKykge1xuICAgIGNvbnN0IHNwbGl0ID0gcFtpXS5pbmRleE9mKFwiPVwiKTtcbiAgICBjb25zdCBrZXkgPSBwW2ldLnNsaWNlKDAsIHNwbGl0KTtcbiAgICBpZiAoc3VwcG9ydGVkUGFyYW1zLmluZGV4T2Yoa2V5KSAhPT0gLTEpIHtcbiAgICAgIHJlc3VsdC5vYXV0aFBhcmFtc1trZXldID0gcFtpXS5zbGljZShzcGxpdCArIDEpO1xuICAgIH0gZWxzZSB7XG4gICAgICBpZiAocmVzdWx0LnBhcmFtc1N0cmluZyAhPT0gJycpIHtcbiAgICAgICAgcmVzdWx0LnBhcmFtc1N0cmluZyArPSAnJic7XG4gICAgICB9XG4gICAgICByZXN1bHQucGFyYW1zU3RyaW5nICs9IHBbaV07XG4gICAgfVxuICB9XG4gIHJldHVybiByZXN1bHQ7XG59XG5cbmNvbnN0IHBhcnNlQ2FsbGJhY2tVcmwgPSAodXJsKSA9PiB7XG4gIGNvbnN0IHN1cHBvcnRlZFBhcmFtcyA9IFsnY29kZScsICdzdGF0ZScsICdzZXNzaW9uX3N0YXRlJywgJ2Vycm9yJywgJ2Vycm9yX2Rlc2NyaXB0aW9uJywgJ2Vycm9yX3VyaSddO1xuICAvLyDQtdGB0LvQuCDQv9GA0LjRhdC+0LTQuNGCINC+0YjQuNCx0LrQsCDRgtC+INC60LXQudC60LvQvtC60YMg0LLRgdC1INGA0LDQstC90L4g0LrQsNC60L7QuSDQt9Cw0L/RgNC+0YEg0LLQvtC30LLRgNCw0YnQsNC10YIg0LDRgtGC0YDQuNCx0YPRgtGLINC/0L7RgdC70LUg0LfQvdCw0LrQsCDQstC+0L/RgNC+0YHQuNC60LBcbiAgY29uc3QgcXVlcnlJbmRleCA9IHVybC5pbmRleE9mKCc/Jyk7XG4gIGNvbnN0IGZyYWdtZW50SW5kZXggPSB1cmwuaW5kZXhPZignIycpO1xuICBsZXQgbmV3VXJsO1xuICBsZXQgcGFyc2VkO1xuICBpZiAoZnJhZ21lbnRJbmRleCAhPT0gLTEpIHtcbiAgICBuZXdVcmwgPSB1cmwuc3Vic3RyaW5nKDAsIGZyYWdtZW50SW5kZXgpO1xuICAgIHBhcnNlZCA9IHBhcnNlQ2FsbGJhY2tQYXJhbXModXJsLnN1YnN0cmluZyhmcmFnbWVudEluZGV4ICsgMSksIHN1cHBvcnRlZFBhcmFtcyk7XG4gICAgaWYgKHBhcnNlZC5wYXJhbXNTdHJpbmcgIT09ICcnKSB7XG4gICAgICBuZXdVcmwgKz0gJyMnICsgcGFyc2VkLnBhcmFtc1N0cmluZztcbiAgICB9XG4gIH1lbHNlIGlmKGZyYWdtZW50SW5kZXggPT09IC0xICYmIHF1ZXJ5SW5kZXggIT09IC0xKXtcbiAgICBuZXdVcmwgPSB1cmwuc3Vic3RyaW5nKDAsIHF1ZXJ5SW5kZXgpO1xuICAgIHBhcnNlZCA9IHBhcnNlQ2FsbGJhY2tQYXJhbXModXJsLnN1YnN0cmluZyhxdWVyeUluZGV4ICsgMSksIHN1cHBvcnRlZFBhcmFtcyk7XG4gICAgaWYgKHBhcnNlZC5wYXJhbXNTdHJpbmcgIT09ICcnKSB7XG4gICAgICBuZXdVcmwgKz0gJyMnICsgcGFyc2VkLnBhcmFtc1N0cmluZztcbiAgICB9XG4gIH1cblxuICBpZiAocGFyc2VkICYmIHBhcnNlZC5vYXV0aFBhcmFtcykge1xuICAgICAgaWYgKChwYXJzZWQub2F1dGhQYXJhbXMuY29kZSB8fCBwYXJzZWQub2F1dGhQYXJhbXMuZXJyb3IpICYmIHBhcnNlZC5vYXV0aFBhcmFtcy5zdGF0ZSkge1xuICAgICAgICBwYXJzZWQub2F1dGhQYXJhbXMubmV3VXJsID0gbmV3VXJsO1xuICAgICAgICByZXR1cm4gcGFyc2VkLm9hdXRoUGFyYW1zO1xuICAgICAgfVxuICAgIH1cblxufVxuXG5jb25zdCBkZWNvZGVUb2tlbiA9IChzdHIpID0+IHtcbiAgc3RyID0gc3RyLnNwbGl0KCcuJylbMV07XG4gIHN0ciA9IHN0ci5yZXBsYWNlKC8tL2csICcrJyk7XG4gIHN0ciA9IHN0ci5yZXBsYWNlKC9fL2csICcvJyk7XG4gIHN3aXRjaCAoc3RyLmxlbmd0aCAlIDQpIHtcbiAgICBjYXNlIDA6XG4gICAgICBicmVhaztcbiAgICBjYXNlIDI6XG4gICAgICBzdHIgKz0gJz09JztcbiAgICAgIGJyZWFrO1xuICAgIGNhc2UgMzpcbiAgICAgIHN0ciArPSAnPSc7XG4gICAgICBicmVhaztcbiAgICBkZWZhdWx0OlxuICAgICAgdGhyb3cgJ0ludmFsaWQgdG9rZW4nO1xuICB9XG4gIHN0ciA9IGRlY29kZVVSSUNvbXBvbmVudChlbmNvZGVVUklDb21wb25lbnQod2luZG93LmF0b2Ioc3RyKSkpO1xuICBzdHIgPSBKU09OLnBhcnNlKHN0cik7XG4gIHJldHVybiBzdHI7XG59XG5cbmNvbnN0IGlzVG9rZW5FeHBpcmVkID0gZnVuY3Rpb24odG9rZW5EYXRhLCBtaW5WYWxpZGl0eT01KSB7XG4gIGlmICh0b2tlbkRhdGEudGltZVNrZXcgPT0gbnVsbCkge1xuICAgIHJldHVybiB0cnVlO1xuICB9XG5cbiAgbGV0IGV4cGlyZXNJbiA9IHRva2VuRGF0YS50b2tlbl9wYXJzZWRbJ2V4cCddIC0gTWF0aC5jZWlsKG5ldyBEYXRlKCkuZ2V0VGltZSgpIC8gMTAwMCkgKyB0b2tlbkRhdGEudGltZVNrZXc7XG4gIGV4cGlyZXNJbiAtPSBtaW5WYWxpZGl0eTtcbiAgcmV0dXJuIGV4cGlyZXNJbiA8IDA7XG59O1xuXG5cbmV4cG9ydCB7XG4gIGJ1aWxkQ2xhaW1zUGFyYW1ldGVyLFxuICBnZW5lcmF0ZUNvZGVWZXJpZmllcixcbiAgZ2VuZXJhdGVQa2NlQ2hhbGxlbmdlLFxuICBjcmVhdGVVVUlELFxuICBwYXJzZUNhbGxiYWNrVXJsLFxuICBkZWNvZGVUb2tlbixcbiAgaXNUb2tlbkV4cGlyZWQsXG59O1xuIiwiaW1wb3J0IHtjcmVhdGVDYWxsYmFja1N0b3JhZ2UsIGNyZWF0ZVRva2VuU3RvcmFnZX0gZnJvbSAnLi9rZXljbG9ha1N0b3JhZ2UnO1xuaW1wb3J0IHtcbiAgY3JlYXRlVVVJRCxcbiAgZGVjb2RlVG9rZW4sXG4gIGdlbmVyYXRlQ29kZVZlcmlmaWVyLFxuICBnZW5lcmF0ZVBrY2VDaGFsbGVuZ2UsXG4gIGlzVG9rZW5FeHBpcmVkLFxuICBwYXJzZUNhbGxiYWNrVXJsXG59IGZyb20gJy4va2V5Y2xvYWtVdGlscyc7XG5cblxuY2xhc3MgU2ltcGxlS2V5Y2xvYWt7XG4gIHVybCA9ICcnO1xuICByZWFsbSA9ICcnO1xuICBjbGllbnRJZCA9ICcnO1xuICBzY29wZSA9ICdvcGVuaWQnO1xuICByZXNwb25zZU1vZGUgPSAnZnJhZ21lbnQnO1xuICByZXNwb25zZVR5cGUgPSAnY29kZSc7XG4gIGF1dGhvcml6YXRpb25fZW5kcG9pbnQgPSAgJyc7XG4gIGVuZF9zZXNzaW9uX2VuZHBvaW50ID0gJyc7XG4gIGNhbGxiYWNrU3RvcmFnZSA9IG51bGw7XG4gIHRva2VuU3RvcmFnZSA9IG51bGw7XG4gIGF1dGhlbnRpY2F0ZWQgPSBmYWxzZTtcbiAgdGltZUxvY2FsID0gbnVsbDtcbiAga2V5Y2xvYWtDYWxsYmFja1ByZWZpeCA9IHVuZGVmaW5lZDtcbiAgdG9rZW5TdG9yYWdlTmFtZSA9IHVuZGVmaW5lZDtcblxuICB2ZXJpZnlUb2tlbiA9ICgpID0+IHt9XG4gIGV4Y2hhbmdlQ29kZSA9ICgpID0+IHt9XG4gIHNldEluaXRpYWxpemVkID0gKCkgPT4ge31cbiAgc2V0RXJyb3IgPSAoKSA9PiB7fVxuXG4gIGNvbnN0cnVjdG9yKGNvbmZpZyl7XG4gICAgdGhpcy51cmwgPSBjb25maWcudXJsO1xuICAgIHRoaXMucmVhbG0gPSBjb25maWcucmVhbG07XG4gICAgdGhpcy5jbGllbnRJZCA9IGNvbmZpZy5jbGllbnRJZDtcbiAgICBpZihjb25maWcuc2NvcGUpIHtcbiAgICAgIHRoaXMuc2NvcGUgPSBjb25maWcuc2NvcGU7XG4gICAgfVxuICAgIHRoaXMua2V5Y2xvYWtDYWxsYmFja1ByZWZpeCA9IGNvbmZpZy5rZXljbG9ha0NhbGxiYWNrUHJlZml4O1xuICAgIHRoaXMudG9rZW5TdG9yYWdlTmFtZSA9IGNvbmZpZy50b2tlblN0b3JhZ2VOYW1lIHx8IGBrYy0ke2NvbmZpZy5yZWFsbX0tJHtjb25maWcuY2xpZW50SWR9YDtcbiAgICByZXR1cm4gdGhpcztcbiAgfVxuXG4gIGdldFJlYWxtVXJsID0gKCkgPT4ge1xuICAgIHJldHVybiBgJHt0aGlzLnVybH0ke3RoaXMudXJsLmNoYXJBdCh0aGlzLnVybC5sZW5ndGggLSAxKSA9PT0gJy8nPycnOicvJ31yZWFsbXMvJHtlbmNvZGVVUklDb21wb25lbnQodGhpcy5yZWFsbSl9YDtcbiAgfVxuXG4gIGluaXQgPSAoZXhjaGFuZ2VDb2RlLCB2ZXJpZnlUb2tlbiwgc2V0SW5pdGlhbGl6ZWQsIHNldEVycm9yKSA9PiB7XG4gICAgY29uc3QgcmVhbG1VcmwgPSB0aGlzLmdldFJlYWxtVXJsKCk7XG4gICAgdGhpcy5hdXRob3JpemF0aW9uX2VuZHBvaW50ID0gYCR7cmVhbG1Vcmx9L3Byb3RvY29sL29wZW5pZC1jb25uZWN0L2F1dGhgO1xuICAgIHRoaXMuZW5kX3Nlc3Npb25fZW5kcG9pbnQgPSBgJHtyZWFsbVVybH0vcHJvdG9jb2wvb3BlbmlkLWNvbm5lY3QvbG9nb3V0YDtcbiAgICB0aGlzLmNhbGxiYWNrU3RvcmFnZSA9IGNyZWF0ZUNhbGxiYWNrU3RvcmFnZSh0aGlzLmtleWNsb2FrQ2FsbGJhY2tQcmVmaXgpO1xuICAgIHRoaXMudG9rZW5TdG9yYWdlID0gY3JlYXRlVG9rZW5TdG9yYWdlKHRoaXMudG9rZW5TdG9yYWdlTmFtZSk7XG4gICAgdGhpcy5leGNoYW5nZUNvZGUgPSBleGNoYW5nZUNvZGU7XG4gICAgdGhpcy52ZXJpZnlUb2tlbiA9IHZlcmlmeVRva2VuO1xuICAgIHRoaXMuc2V0SW5pdGlhbGl6ZWQgPSBzZXRJbml0aWFsaXplZDtcbiAgICB0aGlzLnNldEVycm9yID0gc2V0RXJyb3I7XG4gICAgY29uc3Qgc2VsZiA9IHRoaXM7XG4gICAgc2VsZi5wcm9jZXNzSW5pdCgpO1xuICB9XG5cbiAgY3JlYXRlTG9naW5VcmwgPSAoeyByZWRpcmVjdFVyaSB9KSA9PiB7XG4gICAgICBjb25zdCBzdGF0ZSA9IGNyZWF0ZVVVSUQoKTtcbiAgICAgIGNvbnN0IG5vbmNlID0gY3JlYXRlVVVJRCgpO1xuXG4gICAgICBjb25zdCBjYWxsYmFja1N0YXRlID0ge1xuICAgICAgICBzdGF0ZTogc3RhdGUsXG4gICAgICAgIG5vbmNlOiBub25jZSxcbiAgICAgICAgcmVkaXJlY3RVcmk6IGVuY29kZVVSSUNvbXBvbmVudChyZWRpcmVjdFVyaSlcbiAgICAgIH07XG5cbiAgICAgIGxldCB1cmwgPSBgJHt0aGlzLmF1dGhvcml6YXRpb25fZW5kcG9pbnR9P2NsaWVudF9pZD0ke2VuY29kZVVSSUNvbXBvbmVudCh0aGlzLmNsaWVudElkKX0mcmVkaXJlY3RfdXJpPSR7ZW5jb2RlVVJJQ29tcG9uZW50KHJlZGlyZWN0VXJpKX0mc3RhdGU9JHtlbmNvZGVVUklDb21wb25lbnQoc3RhdGUpfSZyZXNwb25zZV9tb2RlPSR7ZW5jb2RlVVJJQ29tcG9uZW50KHRoaXMucmVzcG9uc2VNb2RlKX0mcmVzcG9uc2VfdHlwZT0ke2VuY29kZVVSSUNvbXBvbmVudCh0aGlzLnJlc3BvbnNlVHlwZSl9JnNjb3BlPSR7ZW5jb2RlVVJJQ29tcG9uZW50KHRoaXMuc2NvcGUpfSZub25jZT0ke2VuY29kZVVSSUNvbXBvbmVudChub25jZSl9YDtcblxuICAgICAgY29uc3QgY29kZVZlcmlmaWVyID0gZ2VuZXJhdGVDb2RlVmVyaWZpZXIoOTYpO1xuICAgICAgY2FsbGJhY2tTdGF0ZS5wa2NlQ29kZVZlcmlmaWVyID0gY29kZVZlcmlmaWVyO1xuICAgICAgY29uc3QgcGtjZUNoYWxsZW5nZSA9IGdlbmVyYXRlUGtjZUNoYWxsZW5nZShjb2RlVmVyaWZpZXIpO1xuICAgICAgdXJsID0gYCR7dXJsfSZjb2RlX2NoYWxsZW5nZT0ke3BrY2VDaGFsbGVuZ2V9JmNvZGVfY2hhbGxlbmdlX21ldGhvZD1TMjU2YDtcblxuICAgICAgdGhpcy5jYWxsYmFja1N0b3JhZ2UuYWRkKGNhbGxiYWNrU3RhdGUpO1xuICAgICAgcmV0dXJuIHVybDtcbiAgfVxuXG4gIGxvZ2luID0gKG9wdGlvbnMpID0+IHtcbiAgICB3aW5kb3cubG9jYXRpb24uYXNzaWduKHRoaXMuY3JlYXRlTG9naW5Vcmwob3B0aW9ucykpO1xuICB9XG4gIGNyZWF0ZUxvZ291dFVybCA9ICh7IHJlZGlyZWN0VXJpLCBpZFRva2VuIH0pID0+IHtcbiAgICAgIGxldCB1cmwgPSBgJHt0aGlzLmVuZF9zZXNzaW9uX2VuZHBvaW50fT9jbGllbnRfaWQ9JHtlbmNvZGVVUklDb21wb25lbnQodGhpcy5jbGllbnRJZCl9JnBvc3RfbG9nb3V0X3JlZGlyZWN0X3VyaT0ke2VuY29kZVVSSUNvbXBvbmVudChyZWRpcmVjdFVyaSl9YDtcbiAgICAgIGlmIChpZFRva2VuKSB7XG4gICAgICAgIHVybCA9IGAke3VybH0maWRfdG9rZW5faGludD0ke2VuY29kZVVSSUNvbXBvbmVudChpZFRva2VuKX1gO1xuICAgICAgfVxuICAgICAgcmV0dXJuIHVybDtcbiAgfVxuXG4gIGxvZ291dCA9IChvcHRpb25zKSA9PiB7XG4gICAgdGhpcy50b2tlblN0b3JhZ2UucmVtb3ZlKCk7XG4gICAgd2luZG93LmxvY2F0aW9uLnJlcGxhY2UodGhpcy5jcmVhdGVMb2dvdXRVcmwob3B0aW9ucykpO1xuICB9XG5cbiAgcGFyc2VDYWxsYmFjayA9ICh1cmwpID0+IHtcbiAgICBjb25zdCBvYXV0aCA9IHBhcnNlQ2FsbGJhY2tVcmwodXJsKTtcbiAgICBpZiAoIW9hdXRoKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgY29uc3Qgb2F1dGhTdGF0ZSA9IHRoaXMuY2FsbGJhY2tTdG9yYWdlLmdldChvYXV0aC5zdGF0ZSk7XG5cbiAgICBpZiAob2F1dGhTdGF0ZSkge1xuICAgICAgb2F1dGgudmFsaWQgPSB0cnVlO1xuICAgICAgb2F1dGgucmVkaXJlY3RVcmkgPSBvYXV0aFN0YXRlLnJlZGlyZWN0VXJpO1xuICAgICAgb2F1dGguc3RvcmVkTm9uY2UgPSBvYXV0aFN0YXRlLm5vbmNlO1xuICAgICAgb2F1dGgucGtjZUNvZGVWZXJpZmllciA9IG9hdXRoU3RhdGUucGtjZUNvZGVWZXJpZmllcjtcbiAgICB9XG5cbiAgICByZXR1cm4gb2F1dGg7XG4gIH1cblxuICBzZXRUb2tlbiA9ICh0b2tlbkRhdGEsIHRpbWVMb2NhbCkgPT4ge1xuICAgIGNvbnN0IGRhdGEgPSB7Li4udG9rZW5EYXRhfTtcbiAgICBpZiAoZGF0YS5yZWZyZXNoX3Rva2VuKSB7XG4gICAgICBkYXRhLnJlZnJlc2hfdG9rZW5fcGFyc2VkID0gZGVjb2RlVG9rZW4oZGF0YS5yZWZyZXNoX3Rva2VuKTtcbiAgICB9XG4gICAgaWYgKGRhdGEuaWRfdG9rZW4pIHtcbiAgICAgIGRhdGEuaWRfdG9rZW5fcGFyc2VkID0gZGVjb2RlVG9rZW4oZGF0YS5pZF90b2tlbik7XG4gICAgfVxuICAgIGlmIChkYXRhLmFjY2Vzc190b2tlbikge1xuICAgICAgZGF0YS50b2tlbl9wYXJzZWQgPSBkZWNvZGVUb2tlbihkYXRhLmFjY2Vzc190b2tlbik7XG4gICAgICBkYXRhLmF1dGhlbnRpY2F0ZWQgPSB0cnVlO1xuICAgICAgaWYgKHRpbWVMb2NhbCkge1xuICAgICAgICBkYXRhLnRpbWVTa2V3ID0gTWF0aC5mbG9vcih0aW1lTG9jYWwgLyAxMDAwKSAtIGRhdGEudG9rZW5fcGFyc2VkLmlhdDtcbiAgICAgIH1cbiAgICAgIHRoaXMudG9rZW5TdG9yYWdlLmFkZChkYXRhKTtcbiAgICAgIHJldHVybiBkYXRhO1xuICAgIH1cbiAgfVxuXG4gIGF1dGhTdWNjZXNzID0gKHRva2VuRGF0YSkgPT4geyAvL3thY2Nlc3NfdG9rZW4sIGV4cGlyZXNfaW4sIHJlZnJlc2hfdG9rZW4sIHJlZnJlc2hfZXhwaXJlc19pbiwgdG9rZW5fdHlwZSwgaWRfdG9rZW4sIHNlc3Npb25fc3RhdGUsIHNjb3BlLCB0aW1lTG9jYWw6b2xkVGltZUxvY2FsLCBzdG9yZWROb25jZX0pID0+IHtcbiAgICBpZih0b2tlbkRhdGEpIHtcbiAgICBjb25zdCB0aW1lTG9jYWwgPSAodG9rZW5EYXRhLnRpbWVMb2NhbCArIG5ldyBEYXRlKCkuZ2V0VGltZSgpKSAvIDI7XG4gICAgY29uc3QgZGF0YSA9IHRoaXMuc2V0VG9rZW4odG9rZW5EYXRhLCB0aW1lTG9jYWwpO1xuICAgIGlmIChkYXRhICYmIGRhdGEuYXV0aGVudGljYXRlZCAmJiAoKGRhdGEudG9rZW5fcGFyc2VkICYmIGRhdGEudG9rZW5fcGFyc2VkLm5vbmNlID09PSB0b2tlbkRhdGEuc3RvcmVkTm9uY2UpIHx8XG4gICAgICAgIChkYXRhLnJlZnJlc2hfdG9rZW5fcGFyc2VkICYmIGRhdGEucmVmcmVzaF90b2tlbl9wYXJzZWQubm9uY2UgPT09IHRva2VuRGF0YS5zdG9yZWROb25jZSkgfHxcbiAgICAgICAgKGRhdGEuaWRfdG9rZW5fcGFyc2VkICYmIGRhdGEuaWRfdG9rZW5fcGFyc2VkLm5vbmNlID09PSB0b2tlbkRhdGEuc3RvcmVkTm9uY2UpKSkge1xuICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgIH1cbiAgICB9XG4gICAgdGhpcy50b2tlblN0b3JhZ2UucmVtb3ZlKCk7XG4gICAgcmV0dXJuIGZhbHNlO1xuICB9XG5cbiAgcHJvY2Vzc0NhbGxiYWNrID0gKG9hdXRoKSA9PiB7XG4gICAgY29uc3Qge2NvZGUsIGVycm9yLCBzdG9yZWROb25jZX0gPSBvYXV0aDtcbiAgICBjb25zdCB0aW1lTG9jYWwgPSBuZXcgRGF0ZSgpLmdldFRpbWUoKTtcbiAgICBpZiAoZXJyb3IpIHtcbiAgICAgICBjb25zdCBlcnJvckRhdGEgPSB7IGVycm9yOiBlcnJvciwgZXJyb3JfZGVzY3JpcHRpb246IG9hdXRoLmVycm9yX2Rlc2NyaXB0aW9uIH07XG4gICAgICAgdGhpcy5zZXRFcnJvcihlcnJvckRhdGEpO1xuICAgICAgIHJldHVybjtcbiAgICB9XG4gICAgaWYgKGNvZGUpIHtcbiAgICAgIC8vINCy0YvRhdC+0LTQuNC8INC40Lcg0LrQu9Cw0YHRgdCwINC4INC+0LHQvNC10L3QuNCy0LDQtdC8INCx0LjQu9C10YIg0L3QsCDRgtC+0LrQtdC9INGH0LXRgNC10Lcg0LHQtdC60LXQvdC0XG4gICAgICB0aGlzLmV4Y2hhbmdlQ29kZShjb2RlLCBvYXV0aC5wa2NlQ29kZVZlcmlmaWVyLCB0aW1lTG9jYWwsIHN0b3JlZE5vbmNlKTtcbiAgICAgIHJldHVybiBjb2RlO1xuICAgIH1cbiAgfVxuXG4gIHByb2Nlc3NJbml0ID0gKCkgPT4ge1xuICAgIGNvbnN0IG9hdXRoID0gdGhpcy5wYXJzZUNhbGxiYWNrKHdpbmRvdy5sb2NhdGlvbi5ocmVmKTtcbiAgICBpZiAob2F1dGgpIHtcbiAgICAgIC8vINGB0LzQvtGC0YDQuNC8INC10YHRgtGMINC70Lgg0YHRgdGL0LvQutCwINGBINC60L7Qu9Cx0Y3QutC+0LxcbiAgICAgIHdpbmRvdy5oaXN0b3J5LnJlcGxhY2VTdGF0ZSh3aW5kb3cuaGlzdG9yeS5zdGF0ZSwgbnVsbCwgb2F1dGgubmV3VXJsKTtcbiAgICAgIGlmIChvYXV0aCAmJiBvYXV0aC52YWxpZCkge1xuICAgICAgICBjb25zdCBjb2RlID0gdGhpcy5wcm9jZXNzQ2FsbGJhY2sob2F1dGgpO1xuICAgICAgICBpZihjb2RlKXtcbiAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9ZWxzZXtcbiAgICAgIC8vINGB0LzQvtGC0YDQuNC8INC10YHRgtGMINC70Lgg0LIg0YHRgtC+0YDQtdC50LTQttC1INGC0L7QutC10L3RiyDQuCDQv9GA0L7Qs9C+0L3Rj9C10Lwg0LjRhSDQv9C+INC/0YDQuNC70L7QttC10L3QuNGOXG4gICAgICBjb25zdCB0b2tlbkRhdGEgPSB0aGlzLnRva2VuU3RvcmFnZS5nZXQoKTtcbiAgICAgIGlmKHRva2VuRGF0YSl7XG4gICAgICAgIGlmKGlzVG9rZW5FeHBpcmVkKHRva2VuRGF0YSkpe1xuICAgICAgICAgIHRoaXMudG9rZW5TdG9yYWdlLnJlbW92ZSgpO1xuICAgICAgICB9ZWxzZXtcbiAgICAgICAgICB0aGlzLnZlcmlmeVRva2VuKHRva2VuRGF0YSk7XG4gICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuICAgIHRoaXMuc2V0SW5pdGlhbGl6ZWQoKTtcbiAgfVxuXG59XG5cbmV4cG9ydCBkZWZhdWx0IFNpbXBsZUtleWNsb2FrO1xuIiwiJ3VzZSBzdHJpY3QnXG5cbmV4cG9ydHMuYnl0ZUxlbmd0aCA9IGJ5dGVMZW5ndGhcbmV4cG9ydHMudG9CeXRlQXJyYXkgPSB0b0J5dGVBcnJheVxuZXhwb3J0cy5mcm9tQnl0ZUFycmF5ID0gZnJvbUJ5dGVBcnJheVxuXG52YXIgbG9va3VwID0gW11cbnZhciByZXZMb29rdXAgPSBbXVxudmFyIEFyciA9IHR5cGVvZiBVaW50OEFycmF5ICE9PSAndW5kZWZpbmVkJyA/IFVpbnQ4QXJyYXkgOiBBcnJheVxuXG52YXIgY29kZSA9ICdBQkNERUZHSElKS0xNTk9QUVJTVFVWV1hZWmFiY2RlZmdoaWprbG1ub3BxcnN0dXZ3eHl6MDEyMzQ1Njc4OSsvJ1xuZm9yICh2YXIgaSA9IDAsIGxlbiA9IGNvZGUubGVuZ3RoOyBpIDwgbGVuOyArK2kpIHtcbiAgbG9va3VwW2ldID0gY29kZVtpXVxuICByZXZMb29rdXBbY29kZS5jaGFyQ29kZUF0KGkpXSA9IGlcbn1cblxuLy8gU3VwcG9ydCBkZWNvZGluZyBVUkwtc2FmZSBiYXNlNjQgc3RyaW5ncywgYXMgTm9kZS5qcyBkb2VzLlxuLy8gU2VlOiBodHRwczovL2VuLndpa2lwZWRpYS5vcmcvd2lraS9CYXNlNjQjVVJMX2FwcGxpY2F0aW9uc1xucmV2TG9va3VwWyctJy5jaGFyQ29kZUF0KDApXSA9IDYyXG5yZXZMb29rdXBbJ18nLmNoYXJDb2RlQXQoMCldID0gNjNcblxuZnVuY3Rpb24gZ2V0TGVucyAoYjY0KSB7XG4gIHZhciBsZW4gPSBiNjQubGVuZ3RoXG5cbiAgaWYgKGxlbiAlIDQgPiAwKSB7XG4gICAgdGhyb3cgbmV3IEVycm9yKCdJbnZhbGlkIHN0cmluZy4gTGVuZ3RoIG11c3QgYmUgYSBtdWx0aXBsZSBvZiA0JylcbiAgfVxuXG4gIC8vIFRyaW0gb2ZmIGV4dHJhIGJ5dGVzIGFmdGVyIHBsYWNlaG9sZGVyIGJ5dGVzIGFyZSBmb3VuZFxuICAvLyBTZWU6IGh0dHBzOi8vZ2l0aHViLmNvbS9iZWF0Z2FtbWl0L2Jhc2U2NC1qcy9pc3N1ZXMvNDJcbiAgdmFyIHZhbGlkTGVuID0gYjY0LmluZGV4T2YoJz0nKVxuICBpZiAodmFsaWRMZW4gPT09IC0xKSB2YWxpZExlbiA9IGxlblxuXG4gIHZhciBwbGFjZUhvbGRlcnNMZW4gPSB2YWxpZExlbiA9PT0gbGVuXG4gICAgPyAwXG4gICAgOiA0IC0gKHZhbGlkTGVuICUgNClcblxuICByZXR1cm4gW3ZhbGlkTGVuLCBwbGFjZUhvbGRlcnNMZW5dXG59XG5cbi8vIGJhc2U2NCBpcyA0LzMgKyB1cCB0byB0d28gY2hhcmFjdGVycyBvZiB0aGUgb3JpZ2luYWwgZGF0YVxuZnVuY3Rpb24gYnl0ZUxlbmd0aCAoYjY0KSB7XG4gIHZhciBsZW5zID0gZ2V0TGVucyhiNjQpXG4gIHZhciB2YWxpZExlbiA9IGxlbnNbMF1cbiAgdmFyIHBsYWNlSG9sZGVyc0xlbiA9IGxlbnNbMV1cbiAgcmV0dXJuICgodmFsaWRMZW4gKyBwbGFjZUhvbGRlcnNMZW4pICogMyAvIDQpIC0gcGxhY2VIb2xkZXJzTGVuXG59XG5cbmZ1bmN0aW9uIF9ieXRlTGVuZ3RoIChiNjQsIHZhbGlkTGVuLCBwbGFjZUhvbGRlcnNMZW4pIHtcbiAgcmV0dXJuICgodmFsaWRMZW4gKyBwbGFjZUhvbGRlcnNMZW4pICogMyAvIDQpIC0gcGxhY2VIb2xkZXJzTGVuXG59XG5cbmZ1bmN0aW9uIHRvQnl0ZUFycmF5IChiNjQpIHtcbiAgdmFyIHRtcFxuICB2YXIgbGVucyA9IGdldExlbnMoYjY0KVxuICB2YXIgdmFsaWRMZW4gPSBsZW5zWzBdXG4gIHZhciBwbGFjZUhvbGRlcnNMZW4gPSBsZW5zWzFdXG5cbiAgdmFyIGFyciA9IG5ldyBBcnIoX2J5dGVMZW5ndGgoYjY0LCB2YWxpZExlbiwgcGxhY2VIb2xkZXJzTGVuKSlcblxuICB2YXIgY3VyQnl0ZSA9IDBcblxuICAvLyBpZiB0aGVyZSBhcmUgcGxhY2Vob2xkZXJzLCBvbmx5IGdldCB1cCB0byB0aGUgbGFzdCBjb21wbGV0ZSA0IGNoYXJzXG4gIHZhciBsZW4gPSBwbGFjZUhvbGRlcnNMZW4gPiAwXG4gICAgPyB2YWxpZExlbiAtIDRcbiAgICA6IHZhbGlkTGVuXG5cbiAgdmFyIGlcbiAgZm9yIChpID0gMDsgaSA8IGxlbjsgaSArPSA0KSB7XG4gICAgdG1wID1cbiAgICAgIChyZXZMb29rdXBbYjY0LmNoYXJDb2RlQXQoaSldIDw8IDE4KSB8XG4gICAgICAocmV2TG9va3VwW2I2NC5jaGFyQ29kZUF0KGkgKyAxKV0gPDwgMTIpIHxcbiAgICAgIChyZXZMb29rdXBbYjY0LmNoYXJDb2RlQXQoaSArIDIpXSA8PCA2KSB8XG4gICAgICByZXZMb29rdXBbYjY0LmNoYXJDb2RlQXQoaSArIDMpXVxuICAgIGFycltjdXJCeXRlKytdID0gKHRtcCA+PiAxNikgJiAweEZGXG4gICAgYXJyW2N1ckJ5dGUrK10gPSAodG1wID4+IDgpICYgMHhGRlxuICAgIGFycltjdXJCeXRlKytdID0gdG1wICYgMHhGRlxuICB9XG5cbiAgaWYgKHBsYWNlSG9sZGVyc0xlbiA9PT0gMikge1xuICAgIHRtcCA9XG4gICAgICAocmV2TG9va3VwW2I2NC5jaGFyQ29kZUF0KGkpXSA8PCAyKSB8XG4gICAgICAocmV2TG9va3VwW2I2NC5jaGFyQ29kZUF0KGkgKyAxKV0gPj4gNClcbiAgICBhcnJbY3VyQnl0ZSsrXSA9IHRtcCAmIDB4RkZcbiAgfVxuXG4gIGlmIChwbGFjZUhvbGRlcnNMZW4gPT09IDEpIHtcbiAgICB0bXAgPVxuICAgICAgKHJldkxvb2t1cFtiNjQuY2hhckNvZGVBdChpKV0gPDwgMTApIHxcbiAgICAgIChyZXZMb29rdXBbYjY0LmNoYXJDb2RlQXQoaSArIDEpXSA8PCA0KSB8XG4gICAgICAocmV2TG9va3VwW2I2NC5jaGFyQ29kZUF0KGkgKyAyKV0gPj4gMilcbiAgICBhcnJbY3VyQnl0ZSsrXSA9ICh0bXAgPj4gOCkgJiAweEZGXG4gICAgYXJyW2N1ckJ5dGUrK10gPSB0bXAgJiAweEZGXG4gIH1cblxuICByZXR1cm4gYXJyXG59XG5cbmZ1bmN0aW9uIHRyaXBsZXRUb0Jhc2U2NCAobnVtKSB7XG4gIHJldHVybiBsb29rdXBbbnVtID4+IDE4ICYgMHgzRl0gK1xuICAgIGxvb2t1cFtudW0gPj4gMTIgJiAweDNGXSArXG4gICAgbG9va3VwW251bSA+PiA2ICYgMHgzRl0gK1xuICAgIGxvb2t1cFtudW0gJiAweDNGXVxufVxuXG5mdW5jdGlvbiBlbmNvZGVDaHVuayAodWludDgsIHN0YXJ0LCBlbmQpIHtcbiAgdmFyIHRtcFxuICB2YXIgb3V0cHV0ID0gW11cbiAgZm9yICh2YXIgaSA9IHN0YXJ0OyBpIDwgZW5kOyBpICs9IDMpIHtcbiAgICB0bXAgPVxuICAgICAgKCh1aW50OFtpXSA8PCAxNikgJiAweEZGMDAwMCkgK1xuICAgICAgKCh1aW50OFtpICsgMV0gPDwgOCkgJiAweEZGMDApICtcbiAgICAgICh1aW50OFtpICsgMl0gJiAweEZGKVxuICAgIG91dHB1dC5wdXNoKHRyaXBsZXRUb0Jhc2U2NCh0bXApKVxuICB9XG4gIHJldHVybiBvdXRwdXQuam9pbignJylcbn1cblxuZnVuY3Rpb24gZnJvbUJ5dGVBcnJheSAodWludDgpIHtcbiAgdmFyIHRtcFxuICB2YXIgbGVuID0gdWludDgubGVuZ3RoXG4gIHZhciBleHRyYUJ5dGVzID0gbGVuICUgMyAvLyBpZiB3ZSBoYXZlIDEgYnl0ZSBsZWZ0LCBwYWQgMiBieXRlc1xuICB2YXIgcGFydHMgPSBbXVxuICB2YXIgbWF4Q2h1bmtMZW5ndGggPSAxNjM4MyAvLyBtdXN0IGJlIG11bHRpcGxlIG9mIDNcblxuICAvLyBnbyB0aHJvdWdoIHRoZSBhcnJheSBldmVyeSB0aHJlZSBieXRlcywgd2UnbGwgZGVhbCB3aXRoIHRyYWlsaW5nIHN0dWZmIGxhdGVyXG4gIGZvciAodmFyIGkgPSAwLCBsZW4yID0gbGVuIC0gZXh0cmFCeXRlczsgaSA8IGxlbjI7IGkgKz0gbWF4Q2h1bmtMZW5ndGgpIHtcbiAgICBwYXJ0cy5wdXNoKGVuY29kZUNodW5rKHVpbnQ4LCBpLCAoaSArIG1heENodW5rTGVuZ3RoKSA+IGxlbjIgPyBsZW4yIDogKGkgKyBtYXhDaHVua0xlbmd0aCkpKVxuICB9XG5cbiAgLy8gcGFkIHRoZSBlbmQgd2l0aCB6ZXJvcywgYnV0IG1ha2Ugc3VyZSB0byBub3QgZm9yZ2V0IHRoZSBleHRyYSBieXRlc1xuICBpZiAoZXh0cmFCeXRlcyA9PT0gMSkge1xuICAgIHRtcCA9IHVpbnQ4W2xlbiAtIDFdXG4gICAgcGFydHMucHVzaChcbiAgICAgIGxvb2t1cFt0bXAgPj4gMl0gK1xuICAgICAgbG9va3VwWyh0bXAgPDwgNCkgJiAweDNGXSArXG4gICAgICAnPT0nXG4gICAgKVxuICB9IGVsc2UgaWYgKGV4dHJhQnl0ZXMgPT09IDIpIHtcbiAgICB0bXAgPSAodWludDhbbGVuIC0gMl0gPDwgOCkgKyB1aW50OFtsZW4gLSAxXVxuICAgIHBhcnRzLnB1c2goXG4gICAgICBsb29rdXBbdG1wID4+IDEwXSArXG4gICAgICBsb29rdXBbKHRtcCA+PiA0KSAmIDB4M0ZdICtcbiAgICAgIGxvb2t1cFsodG1wIDw8IDIpICYgMHgzRl0gK1xuICAgICAgJz0nXG4gICAgKVxuICB9XG5cbiAgcmV0dXJuIHBhcnRzLmpvaW4oJycpXG59XG4iLCIvKipcbiAqIFtqcy1zaGEyNTZde0BsaW5rIGh0dHBzOi8vZ2l0aHViLmNvbS9lbW4xNzgvanMtc2hhMjU2fVxuICpcbiAqIEB2ZXJzaW9uIDAuOS4wXG4gKiBAYXV0aG9yIENoZW4sIFlpLUN5dWFuIFtlbW4xNzhAZ21haWwuY29tXVxuICogQGNvcHlyaWdodCBDaGVuLCBZaS1DeXVhbiAyMDE0LTIwMTdcbiAqIEBsaWNlbnNlIE1JVFxuICovXG4vKmpzbGludCBiaXR3aXNlOiB0cnVlICovXG4oZnVuY3Rpb24gKCkge1xuICAndXNlIHN0cmljdCc7XG5cbiAgdmFyIEVSUk9SID0gJ2lucHV0IGlzIGludmFsaWQgdHlwZSc7XG4gIHZhciBXSU5ET1cgPSB0eXBlb2Ygd2luZG93ID09PSAnb2JqZWN0JztcbiAgdmFyIHJvb3QgPSBXSU5ET1cgPyB3aW5kb3cgOiB7fTtcbiAgaWYgKHJvb3QuSlNfU0hBMjU2X05PX1dJTkRPVykge1xuICAgIFdJTkRPVyA9IGZhbHNlO1xuICB9XG4gIHZhciBXRUJfV09SS0VSID0gIVdJTkRPVyAmJiB0eXBlb2Ygc2VsZiA9PT0gJ29iamVjdCc7XG4gIHZhciBOT0RFX0pTID0gIXJvb3QuSlNfU0hBMjU2X05PX05PREVfSlMgJiYgdHlwZW9mIHByb2Nlc3MgPT09ICdvYmplY3QnICYmIHByb2Nlc3MudmVyc2lvbnMgJiYgcHJvY2Vzcy52ZXJzaW9ucy5ub2RlO1xuICBpZiAoTk9ERV9KUykge1xuICAgIHJvb3QgPSBnbG9iYWw7XG4gIH0gZWxzZSBpZiAoV0VCX1dPUktFUikge1xuICAgIHJvb3QgPSBzZWxmO1xuICB9XG4gIHZhciBDT01NT05fSlMgPSAhcm9vdC5KU19TSEEyNTZfTk9fQ09NTU9OX0pTICYmIHR5cGVvZiBtb2R1bGUgPT09ICdvYmplY3QnICYmIG1vZHVsZS5leHBvcnRzO1xuICB2YXIgQU1EID0gdHlwZW9mIGRlZmluZSA9PT0gJ2Z1bmN0aW9uJyAmJiBkZWZpbmUuYW1kO1xuICB2YXIgQVJSQVlfQlVGRkVSID0gIXJvb3QuSlNfU0hBMjU2X05PX0FSUkFZX0JVRkZFUiAmJiB0eXBlb2YgQXJyYXlCdWZmZXIgIT09ICd1bmRlZmluZWQnO1xuICB2YXIgSEVYX0NIQVJTID0gJzAxMjM0NTY3ODlhYmNkZWYnLnNwbGl0KCcnKTtcbiAgdmFyIEVYVFJBID0gWy0yMTQ3NDgzNjQ4LCA4Mzg4NjA4LCAzMjc2OCwgMTI4XTtcbiAgdmFyIFNISUZUID0gWzI0LCAxNiwgOCwgMF07XG4gIHZhciBLID0gW1xuICAgIDB4NDI4YTJmOTgsIDB4NzEzNzQ0OTEsIDB4YjVjMGZiY2YsIDB4ZTliNWRiYTUsIDB4Mzk1NmMyNWIsIDB4NTlmMTExZjEsIDB4OTIzZjgyYTQsIDB4YWIxYzVlZDUsXG4gICAgMHhkODA3YWE5OCwgMHgxMjgzNWIwMSwgMHgyNDMxODViZSwgMHg1NTBjN2RjMywgMHg3MmJlNWQ3NCwgMHg4MGRlYjFmZSwgMHg5YmRjMDZhNywgMHhjMTliZjE3NCxcbiAgICAweGU0OWI2OWMxLCAweGVmYmU0Nzg2LCAweDBmYzE5ZGM2LCAweDI0MGNhMWNjLCAweDJkZTkyYzZmLCAweDRhNzQ4NGFhLCAweDVjYjBhOWRjLCAweDc2Zjk4OGRhLFxuICAgIDB4OTgzZTUxNTIsIDB4YTgzMWM2NmQsIDB4YjAwMzI3YzgsIDB4YmY1OTdmYzcsIDB4YzZlMDBiZjMsIDB4ZDVhNzkxNDcsIDB4MDZjYTYzNTEsIDB4MTQyOTI5NjcsXG4gICAgMHgyN2I3MGE4NSwgMHgyZTFiMjEzOCwgMHg0ZDJjNmRmYywgMHg1MzM4MGQxMywgMHg2NTBhNzM1NCwgMHg3NjZhMGFiYiwgMHg4MWMyYzkyZSwgMHg5MjcyMmM4NSxcbiAgICAweGEyYmZlOGExLCAweGE4MWE2NjRiLCAweGMyNGI4YjcwLCAweGM3NmM1MWEzLCAweGQxOTJlODE5LCAweGQ2OTkwNjI0LCAweGY0MGUzNTg1LCAweDEwNmFhMDcwLFxuICAgIDB4MTlhNGMxMTYsIDB4MWUzNzZjMDgsIDB4Mjc0ODc3NGMsIDB4MzRiMGJjYjUsIDB4MzkxYzBjYjMsIDB4NGVkOGFhNGEsIDB4NWI5Y2NhNGYsIDB4NjgyZTZmZjMsXG4gICAgMHg3NDhmODJlZSwgMHg3OGE1NjM2ZiwgMHg4NGM4NzgxNCwgMHg4Y2M3MDIwOCwgMHg5MGJlZmZmYSwgMHhhNDUwNmNlYiwgMHhiZWY5YTNmNywgMHhjNjcxNzhmMlxuICBdO1xuICB2YXIgT1VUUFVUX1RZUEVTID0gWydoZXgnLCAnYXJyYXknLCAnZGlnZXN0JywgJ2FycmF5QnVmZmVyJ107XG5cbiAgdmFyIGJsb2NrcyA9IFtdO1xuXG4gIGlmIChyb290LkpTX1NIQTI1Nl9OT19OT0RFX0pTIHx8ICFBcnJheS5pc0FycmF5KSB7XG4gICAgQXJyYXkuaXNBcnJheSA9IGZ1bmN0aW9uIChvYmopIHtcbiAgICAgIHJldHVybiBPYmplY3QucHJvdG90eXBlLnRvU3RyaW5nLmNhbGwob2JqKSA9PT0gJ1tvYmplY3QgQXJyYXldJztcbiAgICB9O1xuICB9XG5cbiAgaWYgKEFSUkFZX0JVRkZFUiAmJiAocm9vdC5KU19TSEEyNTZfTk9fQVJSQVlfQlVGRkVSX0lTX1ZJRVcgfHwgIUFycmF5QnVmZmVyLmlzVmlldykpIHtcbiAgICBBcnJheUJ1ZmZlci5pc1ZpZXcgPSBmdW5jdGlvbiAob2JqKSB7XG4gICAgICByZXR1cm4gdHlwZW9mIG9iaiA9PT0gJ29iamVjdCcgJiYgb2JqLmJ1ZmZlciAmJiBvYmouYnVmZmVyLmNvbnN0cnVjdG9yID09PSBBcnJheUJ1ZmZlcjtcbiAgICB9O1xuICB9XG5cbiAgdmFyIGNyZWF0ZU91dHB1dE1ldGhvZCA9IGZ1bmN0aW9uIChvdXRwdXRUeXBlLCBpczIyNCkge1xuICAgIHJldHVybiBmdW5jdGlvbiAobWVzc2FnZSkge1xuICAgICAgcmV0dXJuIG5ldyBTaGEyNTYoaXMyMjQsIHRydWUpLnVwZGF0ZShtZXNzYWdlKVtvdXRwdXRUeXBlXSgpO1xuICAgIH07XG4gIH07XG5cbiAgdmFyIGNyZWF0ZU1ldGhvZCA9IGZ1bmN0aW9uIChpczIyNCkge1xuICAgIHZhciBtZXRob2QgPSBjcmVhdGVPdXRwdXRNZXRob2QoJ2hleCcsIGlzMjI0KTtcbiAgICBpZiAoTk9ERV9KUykge1xuICAgICAgbWV0aG9kID0gbm9kZVdyYXAobWV0aG9kLCBpczIyNCk7XG4gICAgfVxuICAgIG1ldGhvZC5jcmVhdGUgPSBmdW5jdGlvbiAoKSB7XG4gICAgICByZXR1cm4gbmV3IFNoYTI1NihpczIyNCk7XG4gICAgfTtcbiAgICBtZXRob2QudXBkYXRlID0gZnVuY3Rpb24gKG1lc3NhZ2UpIHtcbiAgICAgIHJldHVybiBtZXRob2QuY3JlYXRlKCkudXBkYXRlKG1lc3NhZ2UpO1xuICAgIH07XG4gICAgZm9yICh2YXIgaSA9IDA7IGkgPCBPVVRQVVRfVFlQRVMubGVuZ3RoOyArK2kpIHtcbiAgICAgIHZhciB0eXBlID0gT1VUUFVUX1RZUEVTW2ldO1xuICAgICAgbWV0aG9kW3R5cGVdID0gY3JlYXRlT3V0cHV0TWV0aG9kKHR5cGUsIGlzMjI0KTtcbiAgICB9XG4gICAgcmV0dXJuIG1ldGhvZDtcbiAgfTtcblxuICB2YXIgbm9kZVdyYXAgPSBmdW5jdGlvbiAobWV0aG9kLCBpczIyNCkge1xuICAgIHZhciBjcnlwdG8gPSBldmFsKFwicmVxdWlyZSgnY3J5cHRvJylcIik7XG4gICAgdmFyIEJ1ZmZlciA9IGV2YWwoXCJyZXF1aXJlKCdidWZmZXInKS5CdWZmZXJcIik7XG4gICAgdmFyIGFsZ29yaXRobSA9IGlzMjI0ID8gJ3NoYTIyNCcgOiAnc2hhMjU2JztcbiAgICB2YXIgbm9kZU1ldGhvZCA9IGZ1bmN0aW9uIChtZXNzYWdlKSB7XG4gICAgICBpZiAodHlwZW9mIG1lc3NhZ2UgPT09ICdzdHJpbmcnKSB7XG4gICAgICAgIHJldHVybiBjcnlwdG8uY3JlYXRlSGFzaChhbGdvcml0aG0pLnVwZGF0ZShtZXNzYWdlLCAndXRmOCcpLmRpZ2VzdCgnaGV4Jyk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBpZiAobWVzc2FnZSA9PT0gbnVsbCB8fCBtZXNzYWdlID09PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoRVJST1IpO1xuICAgICAgICB9IGVsc2UgaWYgKG1lc3NhZ2UuY29uc3RydWN0b3IgPT09IEFycmF5QnVmZmVyKSB7XG4gICAgICAgICAgbWVzc2FnZSA9IG5ldyBVaW50OEFycmF5KG1lc3NhZ2UpO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgICBpZiAoQXJyYXkuaXNBcnJheShtZXNzYWdlKSB8fCBBcnJheUJ1ZmZlci5pc1ZpZXcobWVzc2FnZSkgfHxcbiAgICAgICAgbWVzc2FnZS5jb25zdHJ1Y3RvciA9PT0gQnVmZmVyKSB7XG4gICAgICAgIHJldHVybiBjcnlwdG8uY3JlYXRlSGFzaChhbGdvcml0aG0pLnVwZGF0ZShuZXcgQnVmZmVyKG1lc3NhZ2UpKS5kaWdlc3QoJ2hleCcpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgcmV0dXJuIG1ldGhvZChtZXNzYWdlKTtcbiAgICAgIH1cbiAgICB9O1xuICAgIHJldHVybiBub2RlTWV0aG9kO1xuICB9O1xuXG4gIHZhciBjcmVhdGVIbWFjT3V0cHV0TWV0aG9kID0gZnVuY3Rpb24gKG91dHB1dFR5cGUsIGlzMjI0KSB7XG4gICAgcmV0dXJuIGZ1bmN0aW9uIChrZXksIG1lc3NhZ2UpIHtcbiAgICAgIHJldHVybiBuZXcgSG1hY1NoYTI1NihrZXksIGlzMjI0LCB0cnVlKS51cGRhdGUobWVzc2FnZSlbb3V0cHV0VHlwZV0oKTtcbiAgICB9O1xuICB9O1xuXG4gIHZhciBjcmVhdGVIbWFjTWV0aG9kID0gZnVuY3Rpb24gKGlzMjI0KSB7XG4gICAgdmFyIG1ldGhvZCA9IGNyZWF0ZUhtYWNPdXRwdXRNZXRob2QoJ2hleCcsIGlzMjI0KTtcbiAgICBtZXRob2QuY3JlYXRlID0gZnVuY3Rpb24gKGtleSkge1xuICAgICAgcmV0dXJuIG5ldyBIbWFjU2hhMjU2KGtleSwgaXMyMjQpO1xuICAgIH07XG4gICAgbWV0aG9kLnVwZGF0ZSA9IGZ1bmN0aW9uIChrZXksIG1lc3NhZ2UpIHtcbiAgICAgIHJldHVybiBtZXRob2QuY3JlYXRlKGtleSkudXBkYXRlKG1lc3NhZ2UpO1xuICAgIH07XG4gICAgZm9yICh2YXIgaSA9IDA7IGkgPCBPVVRQVVRfVFlQRVMubGVuZ3RoOyArK2kpIHtcbiAgICAgIHZhciB0eXBlID0gT1VUUFVUX1RZUEVTW2ldO1xuICAgICAgbWV0aG9kW3R5cGVdID0gY3JlYXRlSG1hY091dHB1dE1ldGhvZCh0eXBlLCBpczIyNCk7XG4gICAgfVxuICAgIHJldHVybiBtZXRob2Q7XG4gIH07XG5cbiAgZnVuY3Rpb24gU2hhMjU2KGlzMjI0LCBzaGFyZWRNZW1vcnkpIHtcbiAgICBpZiAoc2hhcmVkTWVtb3J5KSB7XG4gICAgICBibG9ja3NbMF0gPSBibG9ja3NbMTZdID0gYmxvY2tzWzFdID0gYmxvY2tzWzJdID0gYmxvY2tzWzNdID1cbiAgICAgICAgYmxvY2tzWzRdID0gYmxvY2tzWzVdID0gYmxvY2tzWzZdID0gYmxvY2tzWzddID1cbiAgICAgICAgYmxvY2tzWzhdID0gYmxvY2tzWzldID0gYmxvY2tzWzEwXSA9IGJsb2Nrc1sxMV0gPVxuICAgICAgICBibG9ja3NbMTJdID0gYmxvY2tzWzEzXSA9IGJsb2Nrc1sxNF0gPSBibG9ja3NbMTVdID0gMDtcbiAgICAgIHRoaXMuYmxvY2tzID0gYmxvY2tzO1xuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLmJsb2NrcyA9IFswLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwXTtcbiAgICB9XG5cbiAgICBpZiAoaXMyMjQpIHtcbiAgICAgIHRoaXMuaDAgPSAweGMxMDU5ZWQ4O1xuICAgICAgdGhpcy5oMSA9IDB4MzY3Y2Q1MDc7XG4gICAgICB0aGlzLmgyID0gMHgzMDcwZGQxNztcbiAgICAgIHRoaXMuaDMgPSAweGY3MGU1OTM5O1xuICAgICAgdGhpcy5oNCA9IDB4ZmZjMDBiMzE7XG4gICAgICB0aGlzLmg1ID0gMHg2ODU4MTUxMTtcbiAgICAgIHRoaXMuaDYgPSAweDY0Zjk4ZmE3O1xuICAgICAgdGhpcy5oNyA9IDB4YmVmYTRmYTQ7XG4gICAgfSBlbHNlIHsgLy8gMjU2XG4gICAgICB0aGlzLmgwID0gMHg2YTA5ZTY2NztcbiAgICAgIHRoaXMuaDEgPSAweGJiNjdhZTg1O1xuICAgICAgdGhpcy5oMiA9IDB4M2M2ZWYzNzI7XG4gICAgICB0aGlzLmgzID0gMHhhNTRmZjUzYTtcbiAgICAgIHRoaXMuaDQgPSAweDUxMGU1MjdmO1xuICAgICAgdGhpcy5oNSA9IDB4OWIwNTY4OGM7XG4gICAgICB0aGlzLmg2ID0gMHgxZjgzZDlhYjtcbiAgICAgIHRoaXMuaDcgPSAweDViZTBjZDE5O1xuICAgIH1cblxuICAgIHRoaXMuYmxvY2sgPSB0aGlzLnN0YXJ0ID0gdGhpcy5ieXRlcyA9IHRoaXMuaEJ5dGVzID0gMDtcbiAgICB0aGlzLmZpbmFsaXplZCA9IHRoaXMuaGFzaGVkID0gZmFsc2U7XG4gICAgdGhpcy5maXJzdCA9IHRydWU7XG4gICAgdGhpcy5pczIyNCA9IGlzMjI0O1xuICB9XG5cbiAgU2hhMjU2LnByb3RvdHlwZS51cGRhdGUgPSBmdW5jdGlvbiAobWVzc2FnZSkge1xuICAgIGlmICh0aGlzLmZpbmFsaXplZCkge1xuICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICB2YXIgbm90U3RyaW5nLCB0eXBlID0gdHlwZW9mIG1lc3NhZ2U7XG4gICAgaWYgKHR5cGUgIT09ICdzdHJpbmcnKSB7XG4gICAgICBpZiAodHlwZSA9PT0gJ29iamVjdCcpIHtcbiAgICAgICAgaWYgKG1lc3NhZ2UgPT09IG51bGwpIHtcbiAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoRVJST1IpO1xuICAgICAgICB9IGVsc2UgaWYgKEFSUkFZX0JVRkZFUiAmJiBtZXNzYWdlLmNvbnN0cnVjdG9yID09PSBBcnJheUJ1ZmZlcikge1xuICAgICAgICAgIG1lc3NhZ2UgPSBuZXcgVWludDhBcnJheShtZXNzYWdlKTtcbiAgICAgICAgfSBlbHNlIGlmICghQXJyYXkuaXNBcnJheShtZXNzYWdlKSkge1xuICAgICAgICAgIGlmICghQVJSQVlfQlVGRkVSIHx8ICFBcnJheUJ1ZmZlci5pc1ZpZXcobWVzc2FnZSkpIHtcbiAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcihFUlJPUik7XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9IGVsc2Uge1xuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoRVJST1IpO1xuICAgICAgfVxuICAgICAgbm90U3RyaW5nID0gdHJ1ZTtcbiAgICB9XG4gICAgdmFyIGNvZGUsIGluZGV4ID0gMCwgaSwgbGVuZ3RoID0gbWVzc2FnZS5sZW5ndGgsIGJsb2NrcyA9IHRoaXMuYmxvY2tzO1xuXG4gICAgd2hpbGUgKGluZGV4IDwgbGVuZ3RoKSB7XG4gICAgICBpZiAodGhpcy5oYXNoZWQpIHtcbiAgICAgICAgdGhpcy5oYXNoZWQgPSBmYWxzZTtcbiAgICAgICAgYmxvY2tzWzBdID0gdGhpcy5ibG9jaztcbiAgICAgICAgYmxvY2tzWzE2XSA9IGJsb2Nrc1sxXSA9IGJsb2Nrc1syXSA9IGJsb2Nrc1szXSA9XG4gICAgICAgICAgYmxvY2tzWzRdID0gYmxvY2tzWzVdID0gYmxvY2tzWzZdID0gYmxvY2tzWzddID1cbiAgICAgICAgICBibG9ja3NbOF0gPSBibG9ja3NbOV0gPSBibG9ja3NbMTBdID0gYmxvY2tzWzExXSA9XG4gICAgICAgICAgYmxvY2tzWzEyXSA9IGJsb2Nrc1sxM10gPSBibG9ja3NbMTRdID0gYmxvY2tzWzE1XSA9IDA7XG4gICAgICB9XG5cbiAgICAgIGlmIChub3RTdHJpbmcpIHtcbiAgICAgICAgZm9yIChpID0gdGhpcy5zdGFydDsgaW5kZXggPCBsZW5ndGggJiYgaSA8IDY0OyArK2luZGV4KSB7XG4gICAgICAgICAgYmxvY2tzW2kgPj4gMl0gfD0gbWVzc2FnZVtpbmRleF0gPDwgU0hJRlRbaSsrICYgM107XG4gICAgICAgIH1cbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGZvciAoaSA9IHRoaXMuc3RhcnQ7IGluZGV4IDwgbGVuZ3RoICYmIGkgPCA2NDsgKytpbmRleCkge1xuICAgICAgICAgIGNvZGUgPSBtZXNzYWdlLmNoYXJDb2RlQXQoaW5kZXgpO1xuICAgICAgICAgIGlmIChjb2RlIDwgMHg4MCkge1xuICAgICAgICAgICAgYmxvY2tzW2kgPj4gMl0gfD0gY29kZSA8PCBTSElGVFtpKysgJiAzXTtcbiAgICAgICAgICB9IGVsc2UgaWYgKGNvZGUgPCAweDgwMCkge1xuICAgICAgICAgICAgYmxvY2tzW2kgPj4gMl0gfD0gKDB4YzAgfCAoY29kZSA+PiA2KSkgPDwgU0hJRlRbaSsrICYgM107XG4gICAgICAgICAgICBibG9ja3NbaSA+PiAyXSB8PSAoMHg4MCB8IChjb2RlICYgMHgzZikpIDw8IFNISUZUW2krKyAmIDNdO1xuICAgICAgICAgIH0gZWxzZSBpZiAoY29kZSA8IDB4ZDgwMCB8fCBjb2RlID49IDB4ZTAwMCkge1xuICAgICAgICAgICAgYmxvY2tzW2kgPj4gMl0gfD0gKDB4ZTAgfCAoY29kZSA+PiAxMikpIDw8IFNISUZUW2krKyAmIDNdO1xuICAgICAgICAgICAgYmxvY2tzW2kgPj4gMl0gfD0gKDB4ODAgfCAoKGNvZGUgPj4gNikgJiAweDNmKSkgPDwgU0hJRlRbaSsrICYgM107XG4gICAgICAgICAgICBibG9ja3NbaSA+PiAyXSB8PSAoMHg4MCB8IChjb2RlICYgMHgzZikpIDw8IFNISUZUW2krKyAmIDNdO1xuICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBjb2RlID0gMHgxMDAwMCArICgoKGNvZGUgJiAweDNmZikgPDwgMTApIHwgKG1lc3NhZ2UuY2hhckNvZGVBdCgrK2luZGV4KSAmIDB4M2ZmKSk7XG4gICAgICAgICAgICBibG9ja3NbaSA+PiAyXSB8PSAoMHhmMCB8IChjb2RlID4+IDE4KSkgPDwgU0hJRlRbaSsrICYgM107XG4gICAgICAgICAgICBibG9ja3NbaSA+PiAyXSB8PSAoMHg4MCB8ICgoY29kZSA+PiAxMikgJiAweDNmKSkgPDwgU0hJRlRbaSsrICYgM107XG4gICAgICAgICAgICBibG9ja3NbaSA+PiAyXSB8PSAoMHg4MCB8ICgoY29kZSA+PiA2KSAmIDB4M2YpKSA8PCBTSElGVFtpKysgJiAzXTtcbiAgICAgICAgICAgIGJsb2Nrc1tpID4+IDJdIHw9ICgweDgwIHwgKGNvZGUgJiAweDNmKSkgPDwgU0hJRlRbaSsrICYgM107XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9XG5cbiAgICAgIHRoaXMubGFzdEJ5dGVJbmRleCA9IGk7XG4gICAgICB0aGlzLmJ5dGVzICs9IGkgLSB0aGlzLnN0YXJ0O1xuICAgICAgaWYgKGkgPj0gNjQpIHtcbiAgICAgICAgdGhpcy5ibG9jayA9IGJsb2Nrc1sxNl07XG4gICAgICAgIHRoaXMuc3RhcnQgPSBpIC0gNjQ7XG4gICAgICAgIHRoaXMuaGFzaCgpO1xuICAgICAgICB0aGlzLmhhc2hlZCA9IHRydWU7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICB0aGlzLnN0YXJ0ID0gaTtcbiAgICAgIH1cbiAgICB9XG4gICAgaWYgKHRoaXMuYnl0ZXMgPiA0Mjk0OTY3Mjk1KSB7XG4gICAgICB0aGlzLmhCeXRlcyArPSB0aGlzLmJ5dGVzIC8gNDI5NDk2NzI5NiA8PCAwO1xuICAgICAgdGhpcy5ieXRlcyA9IHRoaXMuYnl0ZXMgJSA0Mjk0OTY3Mjk2O1xuICAgIH1cbiAgICByZXR1cm4gdGhpcztcbiAgfTtcblxuICBTaGEyNTYucHJvdG90eXBlLmZpbmFsaXplID0gZnVuY3Rpb24gKCkge1xuICAgIGlmICh0aGlzLmZpbmFsaXplZCkge1xuICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICB0aGlzLmZpbmFsaXplZCA9IHRydWU7XG4gICAgdmFyIGJsb2NrcyA9IHRoaXMuYmxvY2tzLCBpID0gdGhpcy5sYXN0Qnl0ZUluZGV4O1xuICAgIGJsb2Nrc1sxNl0gPSB0aGlzLmJsb2NrO1xuICAgIGJsb2Nrc1tpID4+IDJdIHw9IEVYVFJBW2kgJiAzXTtcbiAgICB0aGlzLmJsb2NrID0gYmxvY2tzWzE2XTtcbiAgICBpZiAoaSA+PSA1Nikge1xuICAgICAgaWYgKCF0aGlzLmhhc2hlZCkge1xuICAgICAgICB0aGlzLmhhc2goKTtcbiAgICAgIH1cbiAgICAgIGJsb2Nrc1swXSA9IHRoaXMuYmxvY2s7XG4gICAgICBibG9ja3NbMTZdID0gYmxvY2tzWzFdID0gYmxvY2tzWzJdID0gYmxvY2tzWzNdID1cbiAgICAgICAgYmxvY2tzWzRdID0gYmxvY2tzWzVdID0gYmxvY2tzWzZdID0gYmxvY2tzWzddID1cbiAgICAgICAgYmxvY2tzWzhdID0gYmxvY2tzWzldID0gYmxvY2tzWzEwXSA9IGJsb2Nrc1sxMV0gPVxuICAgICAgICBibG9ja3NbMTJdID0gYmxvY2tzWzEzXSA9IGJsb2Nrc1sxNF0gPSBibG9ja3NbMTVdID0gMDtcbiAgICB9XG4gICAgYmxvY2tzWzE0XSA9IHRoaXMuaEJ5dGVzIDw8IDMgfCB0aGlzLmJ5dGVzID4+PiAyOTtcbiAgICBibG9ja3NbMTVdID0gdGhpcy5ieXRlcyA8PCAzO1xuICAgIHRoaXMuaGFzaCgpO1xuICB9O1xuXG4gIFNoYTI1Ni5wcm90b3R5cGUuaGFzaCA9IGZ1bmN0aW9uICgpIHtcbiAgICB2YXIgYSA9IHRoaXMuaDAsIGIgPSB0aGlzLmgxLCBjID0gdGhpcy5oMiwgZCA9IHRoaXMuaDMsIGUgPSB0aGlzLmg0LCBmID0gdGhpcy5oNSwgZyA9IHRoaXMuaDYsXG4gICAgICBoID0gdGhpcy5oNywgYmxvY2tzID0gdGhpcy5ibG9ja3MsIGosIHMwLCBzMSwgbWFqLCB0MSwgdDIsIGNoLCBhYiwgZGEsIGNkLCBiYztcblxuICAgIGZvciAoaiA9IDE2OyBqIDwgNjQ7ICsraikge1xuICAgICAgLy8gcmlnaHRyb3RhdGVcbiAgICAgIHQxID0gYmxvY2tzW2ogLSAxNV07XG4gICAgICBzMCA9ICgodDEgPj4+IDcpIHwgKHQxIDw8IDI1KSkgXiAoKHQxID4+PiAxOCkgfCAodDEgPDwgMTQpKSBeICh0MSA+Pj4gMyk7XG4gICAgICB0MSA9IGJsb2Nrc1tqIC0gMl07XG4gICAgICBzMSA9ICgodDEgPj4+IDE3KSB8ICh0MSA8PCAxNSkpIF4gKCh0MSA+Pj4gMTkpIHwgKHQxIDw8IDEzKSkgXiAodDEgPj4+IDEwKTtcbiAgICAgIGJsb2Nrc1tqXSA9IGJsb2Nrc1tqIC0gMTZdICsgczAgKyBibG9ja3NbaiAtIDddICsgczEgPDwgMDtcbiAgICB9XG5cbiAgICBiYyA9IGIgJiBjO1xuICAgIGZvciAoaiA9IDA7IGogPCA2NDsgaiArPSA0KSB7XG4gICAgICBpZiAodGhpcy5maXJzdCkge1xuICAgICAgICBpZiAodGhpcy5pczIyNCkge1xuICAgICAgICAgIGFiID0gMzAwMDMyO1xuICAgICAgICAgIHQxID0gYmxvY2tzWzBdIC0gMTQxMzI1NzgxOTtcbiAgICAgICAgICBoID0gdDEgLSAxNTAwNTQ1OTkgPDwgMDtcbiAgICAgICAgICBkID0gdDEgKyAyNDE3NzA3NyA8PCAwO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIGFiID0gNzA0NzUxMTA5O1xuICAgICAgICAgIHQxID0gYmxvY2tzWzBdIC0gMjEwMjQ0MjQ4O1xuICAgICAgICAgIGggPSB0MSAtIDE1MjE0ODY1MzQgPDwgMDtcbiAgICAgICAgICBkID0gdDEgKyAxNDM2OTQ1NjUgPDwgMDtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLmZpcnN0ID0gZmFsc2U7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBzMCA9ICgoYSA+Pj4gMikgfCAoYSA8PCAzMCkpIF4gKChhID4+PiAxMykgfCAoYSA8PCAxOSkpIF4gKChhID4+PiAyMikgfCAoYSA8PCAxMCkpO1xuICAgICAgICBzMSA9ICgoZSA+Pj4gNikgfCAoZSA8PCAyNikpIF4gKChlID4+PiAxMSkgfCAoZSA8PCAyMSkpIF4gKChlID4+PiAyNSkgfCAoZSA8PCA3KSk7XG4gICAgICAgIGFiID0gYSAmIGI7XG4gICAgICAgIG1haiA9IGFiIF4gKGEgJiBjKSBeIGJjO1xuICAgICAgICBjaCA9IChlICYgZikgXiAofmUgJiBnKTtcbiAgICAgICAgdDEgPSBoICsgczEgKyBjaCArIEtbal0gKyBibG9ja3Nbal07XG4gICAgICAgIHQyID0gczAgKyBtYWo7XG4gICAgICAgIGggPSBkICsgdDEgPDwgMDtcbiAgICAgICAgZCA9IHQxICsgdDIgPDwgMDtcbiAgICAgIH1cbiAgICAgIHMwID0gKChkID4+PiAyKSB8IChkIDw8IDMwKSkgXiAoKGQgPj4+IDEzKSB8IChkIDw8IDE5KSkgXiAoKGQgPj4+IDIyKSB8IChkIDw8IDEwKSk7XG4gICAgICBzMSA9ICgoaCA+Pj4gNikgfCAoaCA8PCAyNikpIF4gKChoID4+PiAxMSkgfCAoaCA8PCAyMSkpIF4gKChoID4+PiAyNSkgfCAoaCA8PCA3KSk7XG4gICAgICBkYSA9IGQgJiBhO1xuICAgICAgbWFqID0gZGEgXiAoZCAmIGIpIF4gYWI7XG4gICAgICBjaCA9IChoICYgZSkgXiAofmggJiBmKTtcbiAgICAgIHQxID0gZyArIHMxICsgY2ggKyBLW2ogKyAxXSArIGJsb2Nrc1tqICsgMV07XG4gICAgICB0MiA9IHMwICsgbWFqO1xuICAgICAgZyA9IGMgKyB0MSA8PCAwO1xuICAgICAgYyA9IHQxICsgdDIgPDwgMDtcbiAgICAgIHMwID0gKChjID4+PiAyKSB8IChjIDw8IDMwKSkgXiAoKGMgPj4+IDEzKSB8IChjIDw8IDE5KSkgXiAoKGMgPj4+IDIyKSB8IChjIDw8IDEwKSk7XG4gICAgICBzMSA9ICgoZyA+Pj4gNikgfCAoZyA8PCAyNikpIF4gKChnID4+PiAxMSkgfCAoZyA8PCAyMSkpIF4gKChnID4+PiAyNSkgfCAoZyA8PCA3KSk7XG4gICAgICBjZCA9IGMgJiBkO1xuICAgICAgbWFqID0gY2QgXiAoYyAmIGEpIF4gZGE7XG4gICAgICBjaCA9IChnICYgaCkgXiAofmcgJiBlKTtcbiAgICAgIHQxID0gZiArIHMxICsgY2ggKyBLW2ogKyAyXSArIGJsb2Nrc1tqICsgMl07XG4gICAgICB0MiA9IHMwICsgbWFqO1xuICAgICAgZiA9IGIgKyB0MSA8PCAwO1xuICAgICAgYiA9IHQxICsgdDIgPDwgMDtcbiAgICAgIHMwID0gKChiID4+PiAyKSB8IChiIDw8IDMwKSkgXiAoKGIgPj4+IDEzKSB8IChiIDw8IDE5KSkgXiAoKGIgPj4+IDIyKSB8IChiIDw8IDEwKSk7XG4gICAgICBzMSA9ICgoZiA+Pj4gNikgfCAoZiA8PCAyNikpIF4gKChmID4+PiAxMSkgfCAoZiA8PCAyMSkpIF4gKChmID4+PiAyNSkgfCAoZiA8PCA3KSk7XG4gICAgICBiYyA9IGIgJiBjO1xuICAgICAgbWFqID0gYmMgXiAoYiAmIGQpIF4gY2Q7XG4gICAgICBjaCA9IChmICYgZykgXiAofmYgJiBoKTtcbiAgICAgIHQxID0gZSArIHMxICsgY2ggKyBLW2ogKyAzXSArIGJsb2Nrc1tqICsgM107XG4gICAgICB0MiA9IHMwICsgbWFqO1xuICAgICAgZSA9IGEgKyB0MSA8PCAwO1xuICAgICAgYSA9IHQxICsgdDIgPDwgMDtcbiAgICB9XG5cbiAgICB0aGlzLmgwID0gdGhpcy5oMCArIGEgPDwgMDtcbiAgICB0aGlzLmgxID0gdGhpcy5oMSArIGIgPDwgMDtcbiAgICB0aGlzLmgyID0gdGhpcy5oMiArIGMgPDwgMDtcbiAgICB0aGlzLmgzID0gdGhpcy5oMyArIGQgPDwgMDtcbiAgICB0aGlzLmg0ID0gdGhpcy5oNCArIGUgPDwgMDtcbiAgICB0aGlzLmg1ID0gdGhpcy5oNSArIGYgPDwgMDtcbiAgICB0aGlzLmg2ID0gdGhpcy5oNiArIGcgPDwgMDtcbiAgICB0aGlzLmg3ID0gdGhpcy5oNyArIGggPDwgMDtcbiAgfTtcblxuICBTaGEyNTYucHJvdG90eXBlLmhleCA9IGZ1bmN0aW9uICgpIHtcbiAgICB0aGlzLmZpbmFsaXplKCk7XG5cbiAgICB2YXIgaDAgPSB0aGlzLmgwLCBoMSA9IHRoaXMuaDEsIGgyID0gdGhpcy5oMiwgaDMgPSB0aGlzLmgzLCBoNCA9IHRoaXMuaDQsIGg1ID0gdGhpcy5oNSxcbiAgICAgIGg2ID0gdGhpcy5oNiwgaDcgPSB0aGlzLmg3O1xuXG4gICAgdmFyIGhleCA9IEhFWF9DSEFSU1soaDAgPj4gMjgpICYgMHgwRl0gKyBIRVhfQ0hBUlNbKGgwID4+IDI0KSAmIDB4MEZdICtcbiAgICAgIEhFWF9DSEFSU1soaDAgPj4gMjApICYgMHgwRl0gKyBIRVhfQ0hBUlNbKGgwID4+IDE2KSAmIDB4MEZdICtcbiAgICAgIEhFWF9DSEFSU1soaDAgPj4gMTIpICYgMHgwRl0gKyBIRVhfQ0hBUlNbKGgwID4+IDgpICYgMHgwRl0gK1xuICAgICAgSEVYX0NIQVJTWyhoMCA+PiA0KSAmIDB4MEZdICsgSEVYX0NIQVJTW2gwICYgMHgwRl0gK1xuICAgICAgSEVYX0NIQVJTWyhoMSA+PiAyOCkgJiAweDBGXSArIEhFWF9DSEFSU1soaDEgPj4gMjQpICYgMHgwRl0gK1xuICAgICAgSEVYX0NIQVJTWyhoMSA+PiAyMCkgJiAweDBGXSArIEhFWF9DSEFSU1soaDEgPj4gMTYpICYgMHgwRl0gK1xuICAgICAgSEVYX0NIQVJTWyhoMSA+PiAxMikgJiAweDBGXSArIEhFWF9DSEFSU1soaDEgPj4gOCkgJiAweDBGXSArXG4gICAgICBIRVhfQ0hBUlNbKGgxID4+IDQpICYgMHgwRl0gKyBIRVhfQ0hBUlNbaDEgJiAweDBGXSArXG4gICAgICBIRVhfQ0hBUlNbKGgyID4+IDI4KSAmIDB4MEZdICsgSEVYX0NIQVJTWyhoMiA+PiAyNCkgJiAweDBGXSArXG4gICAgICBIRVhfQ0hBUlNbKGgyID4+IDIwKSAmIDB4MEZdICsgSEVYX0NIQVJTWyhoMiA+PiAxNikgJiAweDBGXSArXG4gICAgICBIRVhfQ0hBUlNbKGgyID4+IDEyKSAmIDB4MEZdICsgSEVYX0NIQVJTWyhoMiA+PiA4KSAmIDB4MEZdICtcbiAgICAgIEhFWF9DSEFSU1soaDIgPj4gNCkgJiAweDBGXSArIEhFWF9DSEFSU1toMiAmIDB4MEZdICtcbiAgICAgIEhFWF9DSEFSU1soaDMgPj4gMjgpICYgMHgwRl0gKyBIRVhfQ0hBUlNbKGgzID4+IDI0KSAmIDB4MEZdICtcbiAgICAgIEhFWF9DSEFSU1soaDMgPj4gMjApICYgMHgwRl0gKyBIRVhfQ0hBUlNbKGgzID4+IDE2KSAmIDB4MEZdICtcbiAgICAgIEhFWF9DSEFSU1soaDMgPj4gMTIpICYgMHgwRl0gKyBIRVhfQ0hBUlNbKGgzID4+IDgpICYgMHgwRl0gK1xuICAgICAgSEVYX0NIQVJTWyhoMyA+PiA0KSAmIDB4MEZdICsgSEVYX0NIQVJTW2gzICYgMHgwRl0gK1xuICAgICAgSEVYX0NIQVJTWyhoNCA+PiAyOCkgJiAweDBGXSArIEhFWF9DSEFSU1soaDQgPj4gMjQpICYgMHgwRl0gK1xuICAgICAgSEVYX0NIQVJTWyhoNCA+PiAyMCkgJiAweDBGXSArIEhFWF9DSEFSU1soaDQgPj4gMTYpICYgMHgwRl0gK1xuICAgICAgSEVYX0NIQVJTWyhoNCA+PiAxMikgJiAweDBGXSArIEhFWF9DSEFSU1soaDQgPj4gOCkgJiAweDBGXSArXG4gICAgICBIRVhfQ0hBUlNbKGg0ID4+IDQpICYgMHgwRl0gKyBIRVhfQ0hBUlNbaDQgJiAweDBGXSArXG4gICAgICBIRVhfQ0hBUlNbKGg1ID4+IDI4KSAmIDB4MEZdICsgSEVYX0NIQVJTWyhoNSA+PiAyNCkgJiAweDBGXSArXG4gICAgICBIRVhfQ0hBUlNbKGg1ID4+IDIwKSAmIDB4MEZdICsgSEVYX0NIQVJTWyhoNSA+PiAxNikgJiAweDBGXSArXG4gICAgICBIRVhfQ0hBUlNbKGg1ID4+IDEyKSAmIDB4MEZdICsgSEVYX0NIQVJTWyhoNSA+PiA4KSAmIDB4MEZdICtcbiAgICAgIEhFWF9DSEFSU1soaDUgPj4gNCkgJiAweDBGXSArIEhFWF9DSEFSU1toNSAmIDB4MEZdICtcbiAgICAgIEhFWF9DSEFSU1soaDYgPj4gMjgpICYgMHgwRl0gKyBIRVhfQ0hBUlNbKGg2ID4+IDI0KSAmIDB4MEZdICtcbiAgICAgIEhFWF9DSEFSU1soaDYgPj4gMjApICYgMHgwRl0gKyBIRVhfQ0hBUlNbKGg2ID4+IDE2KSAmIDB4MEZdICtcbiAgICAgIEhFWF9DSEFSU1soaDYgPj4gMTIpICYgMHgwRl0gKyBIRVhfQ0hBUlNbKGg2ID4+IDgpICYgMHgwRl0gK1xuICAgICAgSEVYX0NIQVJTWyhoNiA+PiA0KSAmIDB4MEZdICsgSEVYX0NIQVJTW2g2ICYgMHgwRl07XG4gICAgaWYgKCF0aGlzLmlzMjI0KSB7XG4gICAgICBoZXggKz0gSEVYX0NIQVJTWyhoNyA+PiAyOCkgJiAweDBGXSArIEhFWF9DSEFSU1soaDcgPj4gMjQpICYgMHgwRl0gK1xuICAgICAgICBIRVhfQ0hBUlNbKGg3ID4+IDIwKSAmIDB4MEZdICsgSEVYX0NIQVJTWyhoNyA+PiAxNikgJiAweDBGXSArXG4gICAgICAgIEhFWF9DSEFSU1soaDcgPj4gMTIpICYgMHgwRl0gKyBIRVhfQ0hBUlNbKGg3ID4+IDgpICYgMHgwRl0gK1xuICAgICAgICBIRVhfQ0hBUlNbKGg3ID4+IDQpICYgMHgwRl0gKyBIRVhfQ0hBUlNbaDcgJiAweDBGXTtcbiAgICB9XG4gICAgcmV0dXJuIGhleDtcbiAgfTtcblxuICBTaGEyNTYucHJvdG90eXBlLnRvU3RyaW5nID0gU2hhMjU2LnByb3RvdHlwZS5oZXg7XG5cbiAgU2hhMjU2LnByb3RvdHlwZS5kaWdlc3QgPSBmdW5jdGlvbiAoKSB7XG4gICAgdGhpcy5maW5hbGl6ZSgpO1xuXG4gICAgdmFyIGgwID0gdGhpcy5oMCwgaDEgPSB0aGlzLmgxLCBoMiA9IHRoaXMuaDIsIGgzID0gdGhpcy5oMywgaDQgPSB0aGlzLmg0LCBoNSA9IHRoaXMuaDUsXG4gICAgICBoNiA9IHRoaXMuaDYsIGg3ID0gdGhpcy5oNztcblxuICAgIHZhciBhcnIgPSBbXG4gICAgICAoaDAgPj4gMjQpICYgMHhGRiwgKGgwID4+IDE2KSAmIDB4RkYsIChoMCA+PiA4KSAmIDB4RkYsIGgwICYgMHhGRixcbiAgICAgIChoMSA+PiAyNCkgJiAweEZGLCAoaDEgPj4gMTYpICYgMHhGRiwgKGgxID4+IDgpICYgMHhGRiwgaDEgJiAweEZGLFxuICAgICAgKGgyID4+IDI0KSAmIDB4RkYsIChoMiA+PiAxNikgJiAweEZGLCAoaDIgPj4gOCkgJiAweEZGLCBoMiAmIDB4RkYsXG4gICAgICAoaDMgPj4gMjQpICYgMHhGRiwgKGgzID4+IDE2KSAmIDB4RkYsIChoMyA+PiA4KSAmIDB4RkYsIGgzICYgMHhGRixcbiAgICAgIChoNCA+PiAyNCkgJiAweEZGLCAoaDQgPj4gMTYpICYgMHhGRiwgKGg0ID4+IDgpICYgMHhGRiwgaDQgJiAweEZGLFxuICAgICAgKGg1ID4+IDI0KSAmIDB4RkYsIChoNSA+PiAxNikgJiAweEZGLCAoaDUgPj4gOCkgJiAweEZGLCBoNSAmIDB4RkYsXG4gICAgICAoaDYgPj4gMjQpICYgMHhGRiwgKGg2ID4+IDE2KSAmIDB4RkYsIChoNiA+PiA4KSAmIDB4RkYsIGg2ICYgMHhGRlxuICAgIF07XG4gICAgaWYgKCF0aGlzLmlzMjI0KSB7XG4gICAgICBhcnIucHVzaCgoaDcgPj4gMjQpICYgMHhGRiwgKGg3ID4+IDE2KSAmIDB4RkYsIChoNyA+PiA4KSAmIDB4RkYsIGg3ICYgMHhGRik7XG4gICAgfVxuICAgIHJldHVybiBhcnI7XG4gIH07XG5cbiAgU2hhMjU2LnByb3RvdHlwZS5hcnJheSA9IFNoYTI1Ni5wcm90b3R5cGUuZGlnZXN0O1xuXG4gIFNoYTI1Ni5wcm90b3R5cGUuYXJyYXlCdWZmZXIgPSBmdW5jdGlvbiAoKSB7XG4gICAgdGhpcy5maW5hbGl6ZSgpO1xuXG4gICAgdmFyIGJ1ZmZlciA9IG5ldyBBcnJheUJ1ZmZlcih0aGlzLmlzMjI0ID8gMjggOiAzMik7XG4gICAgdmFyIGRhdGFWaWV3ID0gbmV3IERhdGFWaWV3KGJ1ZmZlcik7XG4gICAgZGF0YVZpZXcuc2V0VWludDMyKDAsIHRoaXMuaDApO1xuICAgIGRhdGFWaWV3LnNldFVpbnQzMig0LCB0aGlzLmgxKTtcbiAgICBkYXRhVmlldy5zZXRVaW50MzIoOCwgdGhpcy5oMik7XG4gICAgZGF0YVZpZXcuc2V0VWludDMyKDEyLCB0aGlzLmgzKTtcbiAgICBkYXRhVmlldy5zZXRVaW50MzIoMTYsIHRoaXMuaDQpO1xuICAgIGRhdGFWaWV3LnNldFVpbnQzMigyMCwgdGhpcy5oNSk7XG4gICAgZGF0YVZpZXcuc2V0VWludDMyKDI0LCB0aGlzLmg2KTtcbiAgICBpZiAoIXRoaXMuaXMyMjQpIHtcbiAgICAgIGRhdGFWaWV3LnNldFVpbnQzMigyOCwgdGhpcy5oNyk7XG4gICAgfVxuICAgIHJldHVybiBidWZmZXI7XG4gIH07XG5cbiAgZnVuY3Rpb24gSG1hY1NoYTI1NihrZXksIGlzMjI0LCBzaGFyZWRNZW1vcnkpIHtcbiAgICB2YXIgaSwgdHlwZSA9IHR5cGVvZiBrZXk7XG4gICAgaWYgKHR5cGUgPT09ICdzdHJpbmcnKSB7XG4gICAgICB2YXIgYnl0ZXMgPSBbXSwgbGVuZ3RoID0ga2V5Lmxlbmd0aCwgaW5kZXggPSAwLCBjb2RlO1xuICAgICAgZm9yIChpID0gMDsgaSA8IGxlbmd0aDsgKytpKSB7XG4gICAgICAgIGNvZGUgPSBrZXkuY2hhckNvZGVBdChpKTtcbiAgICAgICAgaWYgKGNvZGUgPCAweDgwKSB7XG4gICAgICAgICAgYnl0ZXNbaW5kZXgrK10gPSBjb2RlO1xuICAgICAgICB9IGVsc2UgaWYgKGNvZGUgPCAweDgwMCkge1xuICAgICAgICAgIGJ5dGVzW2luZGV4KytdID0gKDB4YzAgfCAoY29kZSA+PiA2KSk7XG4gICAgICAgICAgYnl0ZXNbaW5kZXgrK10gPSAoMHg4MCB8IChjb2RlICYgMHgzZikpO1xuICAgICAgICB9IGVsc2UgaWYgKGNvZGUgPCAweGQ4MDAgfHwgY29kZSA+PSAweGUwMDApIHtcbiAgICAgICAgICBieXRlc1tpbmRleCsrXSA9ICgweGUwIHwgKGNvZGUgPj4gMTIpKTtcbiAgICAgICAgICBieXRlc1tpbmRleCsrXSA9ICgweDgwIHwgKChjb2RlID4+IDYpICYgMHgzZikpO1xuICAgICAgICAgIGJ5dGVzW2luZGV4KytdID0gKDB4ODAgfCAoY29kZSAmIDB4M2YpKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBjb2RlID0gMHgxMDAwMCArICgoKGNvZGUgJiAweDNmZikgPDwgMTApIHwgKGtleS5jaGFyQ29kZUF0KCsraSkgJiAweDNmZikpO1xuICAgICAgICAgIGJ5dGVzW2luZGV4KytdID0gKDB4ZjAgfCAoY29kZSA+PiAxOCkpO1xuICAgICAgICAgIGJ5dGVzW2luZGV4KytdID0gKDB4ODAgfCAoKGNvZGUgPj4gMTIpICYgMHgzZikpO1xuICAgICAgICAgIGJ5dGVzW2luZGV4KytdID0gKDB4ODAgfCAoKGNvZGUgPj4gNikgJiAweDNmKSk7XG4gICAgICAgICAgYnl0ZXNbaW5kZXgrK10gPSAoMHg4MCB8IChjb2RlICYgMHgzZikpO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgICBrZXkgPSBieXRlcztcbiAgICB9IGVsc2Uge1xuICAgICAgaWYgKHR5cGUgPT09ICdvYmplY3QnKSB7XG4gICAgICAgIGlmIChrZXkgPT09IG51bGwpIHtcbiAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoRVJST1IpO1xuICAgICAgICB9IGVsc2UgaWYgKEFSUkFZX0JVRkZFUiAmJiBrZXkuY29uc3RydWN0b3IgPT09IEFycmF5QnVmZmVyKSB7XG4gICAgICAgICAga2V5ID0gbmV3IFVpbnQ4QXJyYXkoa2V5KTtcbiAgICAgICAgfSBlbHNlIGlmICghQXJyYXkuaXNBcnJheShrZXkpKSB7XG4gICAgICAgICAgaWYgKCFBUlJBWV9CVUZGRVIgfHwgIUFycmF5QnVmZmVyLmlzVmlldyhrZXkpKSB7XG4gICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoRVJST1IpO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfSBlbHNlIHtcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKEVSUk9SKTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICBpZiAoa2V5Lmxlbmd0aCA+IDY0KSB7XG4gICAgICBrZXkgPSAobmV3IFNoYTI1NihpczIyNCwgdHJ1ZSkpLnVwZGF0ZShrZXkpLmFycmF5KCk7XG4gICAgfVxuXG4gICAgdmFyIG9LZXlQYWQgPSBbXSwgaUtleVBhZCA9IFtdO1xuICAgIGZvciAoaSA9IDA7IGkgPCA2NDsgKytpKSB7XG4gICAgICB2YXIgYiA9IGtleVtpXSB8fCAwO1xuICAgICAgb0tleVBhZFtpXSA9IDB4NWMgXiBiO1xuICAgICAgaUtleVBhZFtpXSA9IDB4MzYgXiBiO1xuICAgIH1cblxuICAgIFNoYTI1Ni5jYWxsKHRoaXMsIGlzMjI0LCBzaGFyZWRNZW1vcnkpO1xuXG4gICAgdGhpcy51cGRhdGUoaUtleVBhZCk7XG4gICAgdGhpcy5vS2V5UGFkID0gb0tleVBhZDtcbiAgICB0aGlzLmlubmVyID0gdHJ1ZTtcbiAgICB0aGlzLnNoYXJlZE1lbW9yeSA9IHNoYXJlZE1lbW9yeTtcbiAgfVxuICBIbWFjU2hhMjU2LnByb3RvdHlwZSA9IG5ldyBTaGEyNTYoKTtcblxuICBIbWFjU2hhMjU2LnByb3RvdHlwZS5maW5hbGl6ZSA9IGZ1bmN0aW9uICgpIHtcbiAgICBTaGEyNTYucHJvdG90eXBlLmZpbmFsaXplLmNhbGwodGhpcyk7XG4gICAgaWYgKHRoaXMuaW5uZXIpIHtcbiAgICAgIHRoaXMuaW5uZXIgPSBmYWxzZTtcbiAgICAgIHZhciBpbm5lckhhc2ggPSB0aGlzLmFycmF5KCk7XG4gICAgICBTaGEyNTYuY2FsbCh0aGlzLCB0aGlzLmlzMjI0LCB0aGlzLnNoYXJlZE1lbW9yeSk7XG4gICAgICB0aGlzLnVwZGF0ZSh0aGlzLm9LZXlQYWQpO1xuICAgICAgdGhpcy51cGRhdGUoaW5uZXJIYXNoKTtcbiAgICAgIFNoYTI1Ni5wcm90b3R5cGUuZmluYWxpemUuY2FsbCh0aGlzKTtcbiAgICB9XG4gIH07XG5cbiAgdmFyIGV4cG9ydHMgPSBjcmVhdGVNZXRob2QoKTtcbiAgZXhwb3J0cy5zaGEyNTYgPSBleHBvcnRzO1xuICBleHBvcnRzLnNoYTIyNCA9IGNyZWF0ZU1ldGhvZCh0cnVlKTtcbiAgZXhwb3J0cy5zaGEyNTYuaG1hYyA9IGNyZWF0ZUhtYWNNZXRob2QoKTtcbiAgZXhwb3J0cy5zaGEyMjQuaG1hYyA9IGNyZWF0ZUhtYWNNZXRob2QodHJ1ZSk7XG5cbiAgaWYgKENPTU1PTl9KUykge1xuICAgIG1vZHVsZS5leHBvcnRzID0gZXhwb3J0cztcbiAgfSBlbHNlIHtcbiAgICByb290LnNoYTI1NiA9IGV4cG9ydHMuc2hhMjU2O1xuICAgIHJvb3Quc2hhMjI0ID0gZXhwb3J0cy5zaGEyMjQ7XG4gICAgaWYgKEFNRCkge1xuICAgICAgZGVmaW5lKGZ1bmN0aW9uICgpIHtcbiAgICAgICAgcmV0dXJuIGV4cG9ydHM7XG4gICAgICB9KTtcbiAgICB9XG4gIH1cbn0pKCk7XG4iLCJleHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBfY2xhc3NDYWxsQ2hlY2soaW5zdGFuY2UsIENvbnN0cnVjdG9yKSB7XG4gIGlmICghKGluc3RhbmNlIGluc3RhbmNlb2YgQ29uc3RydWN0b3IpKSB7XG4gICAgdGhyb3cgbmV3IFR5cGVFcnJvcihcIkNhbm5vdCBjYWxsIGEgY2xhc3MgYXMgYSBmdW5jdGlvblwiKTtcbiAgfVxufSIsImltcG9ydCB0b1Byb3BlcnR5S2V5IGZyb20gXCIuL3RvUHJvcGVydHlLZXkuanNcIjtcbmZ1bmN0aW9uIF9kZWZpbmVQcm9wZXJ0aWVzKHRhcmdldCwgcHJvcHMpIHtcbiAgZm9yICh2YXIgaSA9IDA7IGkgPCBwcm9wcy5sZW5ndGg7IGkrKykge1xuICAgIHZhciBkZXNjcmlwdG9yID0gcHJvcHNbaV07XG4gICAgZGVzY3JpcHRvci5lbnVtZXJhYmxlID0gZGVzY3JpcHRvci5lbnVtZXJhYmxlIHx8IGZhbHNlO1xuICAgIGRlc2NyaXB0b3IuY29uZmlndXJhYmxlID0gdHJ1ZTtcbiAgICBpZiAoXCJ2YWx1ZVwiIGluIGRlc2NyaXB0b3IpIGRlc2NyaXB0b3Iud3JpdGFibGUgPSB0cnVlO1xuICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eSh0YXJnZXQsIHRvUHJvcGVydHlLZXkoZGVzY3JpcHRvci5rZXkpLCBkZXNjcmlwdG9yKTtcbiAgfVxufVxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gX2NyZWF0ZUNsYXNzKENvbnN0cnVjdG9yLCBwcm90b1Byb3BzLCBzdGF0aWNQcm9wcykge1xuICBpZiAocHJvdG9Qcm9wcykgX2RlZmluZVByb3BlcnRpZXMoQ29uc3RydWN0b3IucHJvdG90eXBlLCBwcm90b1Byb3BzKTtcbiAgaWYgKHN0YXRpY1Byb3BzKSBfZGVmaW5lUHJvcGVydGllcyhDb25zdHJ1Y3Rvciwgc3RhdGljUHJvcHMpO1xuICBPYmplY3QuZGVmaW5lUHJvcGVydHkoQ29uc3RydWN0b3IsIFwicHJvdG90eXBlXCIsIHtcbiAgICB3cml0YWJsZTogZmFsc2VcbiAgfSk7XG4gIHJldHVybiBDb25zdHJ1Y3Rvcjtcbn0iLCJpbXBvcnQgdG9Qcm9wZXJ0eUtleSBmcm9tIFwiLi90b1Byb3BlcnR5S2V5LmpzXCI7XG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBfZGVmaW5lUHJvcGVydHkob2JqLCBrZXksIHZhbHVlKSB7XG4gIGtleSA9IHRvUHJvcGVydHlLZXkoa2V5KTtcbiAgaWYgKGtleSBpbiBvYmopIHtcbiAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkob2JqLCBrZXksIHtcbiAgICAgIHZhbHVlOiB2YWx1ZSxcbiAgICAgIGVudW1lcmFibGU6IHRydWUsXG4gICAgICBjb25maWd1cmFibGU6IHRydWUsXG4gICAgICB3cml0YWJsZTogdHJ1ZVxuICAgIH0pO1xuICB9IGVsc2Uge1xuICAgIG9ialtrZXldID0gdmFsdWU7XG4gIH1cbiAgcmV0dXJuIG9iajtcbn0iLCJpbXBvcnQgX3R5cGVvZiBmcm9tIFwiLi90eXBlb2YuanNcIjtcbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIF90b1ByaW1pdGl2ZShpbnB1dCwgaGludCkge1xuICBpZiAoX3R5cGVvZihpbnB1dCkgIT09IFwib2JqZWN0XCIgfHwgaW5wdXQgPT09IG51bGwpIHJldHVybiBpbnB1dDtcbiAgdmFyIHByaW0gPSBpbnB1dFtTeW1ib2wudG9QcmltaXRpdmVdO1xuICBpZiAocHJpbSAhPT0gdW5kZWZpbmVkKSB7XG4gICAgdmFyIHJlcyA9IHByaW0uY2FsbChpbnB1dCwgaGludCB8fCBcImRlZmF1bHRcIik7XG4gICAgaWYgKF90eXBlb2YocmVzKSAhPT0gXCJvYmplY3RcIikgcmV0dXJuIHJlcztcbiAgICB0aHJvdyBuZXcgVHlwZUVycm9yKFwiQEB0b1ByaW1pdGl2ZSBtdXN0IHJldHVybiBhIHByaW1pdGl2ZSB2YWx1ZS5cIik7XG4gIH1cbiAgcmV0dXJuIChoaW50ID09PSBcInN0cmluZ1wiID8gU3RyaW5nIDogTnVtYmVyKShpbnB1dCk7XG59IiwiaW1wb3J0IF90eXBlb2YgZnJvbSBcIi4vdHlwZW9mLmpzXCI7XG5pbXBvcnQgdG9QcmltaXRpdmUgZnJvbSBcIi4vdG9QcmltaXRpdmUuanNcIjtcbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIF90b1Byb3BlcnR5S2V5KGFyZykge1xuICB2YXIga2V5ID0gdG9QcmltaXRpdmUoYXJnLCBcInN0cmluZ1wiKTtcbiAgcmV0dXJuIF90eXBlb2Yoa2V5KSA9PT0gXCJzeW1ib2xcIiA/IGtleSA6IFN0cmluZyhrZXkpO1xufSIsImV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIF90eXBlb2Yob2JqKSB7XG4gIFwiQGJhYmVsL2hlbHBlcnMgLSB0eXBlb2ZcIjtcblxuICByZXR1cm4gX3R5cGVvZiA9IFwiZnVuY3Rpb25cIiA9PSB0eXBlb2YgU3ltYm9sICYmIFwic3ltYm9sXCIgPT0gdHlwZW9mIFN5bWJvbC5pdGVyYXRvciA/IGZ1bmN0aW9uIChvYmopIHtcbiAgICByZXR1cm4gdHlwZW9mIG9iajtcbiAgfSA6IGZ1bmN0aW9uIChvYmopIHtcbiAgICByZXR1cm4gb2JqICYmIFwiZnVuY3Rpb25cIiA9PSB0eXBlb2YgU3ltYm9sICYmIG9iai5jb25zdHJ1Y3RvciA9PT0gU3ltYm9sICYmIG9iaiAhPT0gU3ltYm9sLnByb3RvdHlwZSA/IFwic3ltYm9sXCIgOiB0eXBlb2Ygb2JqO1xuICB9LCBfdHlwZW9mKG9iaik7XG59IiwiLy8gVGhlIG1vZHVsZSBjYWNoZVxudmFyIF9fd2VicGFja19tb2R1bGVfY2FjaGVfXyA9IHt9O1xuXG4vLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcblx0dmFyIGNhY2hlZE1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF07XG5cdGlmIChjYWNoZWRNb2R1bGUgIT09IHVuZGVmaW5lZCkge1xuXHRcdHJldHVybiBjYWNoZWRNb2R1bGUuZXhwb3J0cztcblx0fVxuXHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuXHR2YXIgbW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXSA9IHtcblx0XHQvLyBubyBtb2R1bGUuaWQgbmVlZGVkXG5cdFx0Ly8gbm8gbW9kdWxlLmxvYWRlZCBuZWVkZWRcblx0XHRleHBvcnRzOiB7fVxuXHR9O1xuXG5cdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuXHRfX3dlYnBhY2tfbW9kdWxlc19fW21vZHVsZUlkXShtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuXHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuXHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG59XG5cbiIsIl9fd2VicGFja19yZXF1aXJlX18uYW1kTyA9IHt9OyIsIi8vIGdldERlZmF1bHRFeHBvcnQgZnVuY3Rpb24gZm9yIGNvbXBhdGliaWxpdHkgd2l0aCBub24taGFybW9ueSBtb2R1bGVzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLm4gPSAobW9kdWxlKSA9PiB7XG5cdHZhciBnZXR0ZXIgPSBtb2R1bGUgJiYgbW9kdWxlLl9fZXNNb2R1bGUgP1xuXHRcdCgpID0+IChtb2R1bGVbJ2RlZmF1bHQnXSkgOlxuXHRcdCgpID0+IChtb2R1bGUpO1xuXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQoZ2V0dGVyLCB7IGE6IGdldHRlciB9KTtcblx0cmV0dXJuIGdldHRlcjtcbn07IiwiLy8gZGVmaW5lIGdldHRlciBmdW5jdGlvbnMgZm9yIGhhcm1vbnkgZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5kID0gKGV4cG9ydHMsIGRlZmluaXRpb24pID0+IHtcblx0Zm9yKHZhciBrZXkgaW4gZGVmaW5pdGlvbikge1xuXHRcdGlmKF9fd2VicGFja19yZXF1aXJlX18ubyhkZWZpbml0aW9uLCBrZXkpICYmICFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywga2V5KSkge1xuXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIGtleSwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGRlZmluaXRpb25ba2V5XSB9KTtcblx0XHR9XG5cdH1cbn07IiwiX193ZWJwYWNrX3JlcXVpcmVfXy5nID0gKGZ1bmN0aW9uKCkge1xuXHRpZiAodHlwZW9mIGdsb2JhbFRoaXMgPT09ICdvYmplY3QnKSByZXR1cm4gZ2xvYmFsVGhpcztcblx0dHJ5IHtcblx0XHRyZXR1cm4gdGhpcyB8fCBuZXcgRnVuY3Rpb24oJ3JldHVybiB0aGlzJykoKTtcblx0fSBjYXRjaCAoZSkge1xuXHRcdGlmICh0eXBlb2Ygd2luZG93ID09PSAnb2JqZWN0JykgcmV0dXJuIHdpbmRvdztcblx0fVxufSkoKTsiLCJfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSAob2JqLCBwcm9wKSA9PiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iaiwgcHJvcCkpIiwiLy8gZGVmaW5lIF9fZXNNb2R1bGUgb24gZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5yID0gKGV4cG9ydHMpID0+IHtcblx0aWYodHlwZW9mIFN5bWJvbCAhPT0gJ3VuZGVmaW5lZCcgJiYgU3ltYm9sLnRvU3RyaW5nVGFnKSB7XG5cdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFN5bWJvbC50b1N0cmluZ1RhZywgeyB2YWx1ZTogJ01vZHVsZScgfSk7XG5cdH1cblx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywgeyB2YWx1ZTogdHJ1ZSB9KTtcbn07IiwiaW1wb3J0IFNpbXBsZUtleWNsb2FrIGZyb20gJy4vc2ltcGxlS2V5Y2xvYWsnO1xuaW1wb3J0IHtkZWNvZGVUb2tlbiwgaXNUb2tlbkV4cGlyZWR9IGZyb20gJy4va2V5Y2xvYWtVdGlscyc7XG5cbmV4cG9ydCB7IGRlY29kZVRva2VuLCBpc1Rva2VuRXhwaXJlZCwgU2ltcGxlS2V5Y2xvYWsgfTtcbiJdLCJuYW1lcyI6WyJLRVlDTE9BS19DQUxMQkFDS19QUkVGSVgiLCJUT0tFTl9TVE9SQUdFX05BTUUiLCJjbGVhckV4cGlyZWQiLCJrZXljbG9ha0NhbGxiYWNrUHJlZml4IiwidGltZSIsIkRhdGUiLCJnZXRUaW1lIiwiaSIsImxvY2FsU3RvcmFnZSIsImxlbmd0aCIsImtleSIsImluZGV4T2YiLCJ2YWx1ZSIsImdldEl0ZW0iLCJleHBpcmVzIiwiSlNPTiIsInBhcnNlIiwicmVtb3ZlSXRlbSIsImVyciIsIkxvY2FsU3RvcmFnZSIsIl9jcmVhdGVDbGFzcyIsIl90aGlzIiwiX2NsYXNzQ2FsbENoZWNrIiwiX2RlZmluZVByb3BlcnR5Iiwic3RhdGUiLCJjb25jYXQiLCJzdGF0ZURhdGEiLCJzZXRJdGVtIiwic3RyaW5naWZ5IiwiY29va2llRXhwaXJhdGlvbiIsIm1pbnV0ZXMiLCJleHAiLCJzZXRUaW1lIiwiZ2V0Q29va2llIiwibmFtZSIsImNhIiwiZG9jdW1lbnQiLCJjb29raWUiLCJzcGxpdCIsImMiLCJjaGFyQXQiLCJzdWJzdHJpbmciLCJzZXRDb29raWUiLCJleHBpcmF0aW9uRGF0ZSIsInRvVVRDU3RyaW5nIiwiQ29va2llU3RvcmFnZSIsIl90aGlzMiIsImNyZWF0ZUNhbGxiYWNrU3RvcmFnZSIsIkxvY2FsVG9rZW5TdG9yYWdlIiwidG9rZW5TdG9yYWdlTmFtZSIsIl90aGlzMyIsImRhdGEiLCJDb29raWVUb2tlblN0b3JhZ2UiLCJfdGhpczQiLCJjcmVhdGVUb2tlblN0b3JhZ2UiLCJhcmd1bWVudHMiLCJ1bmRlZmluZWQiLCJzaGEyNTYiLCJiYXNlNjRKcyIsImdlbmVyYXRlUmFuZG9tRGF0YSIsImxlbiIsImFycmF5IiwiQXJyYXkiLCJqIiwiTWF0aCIsImZsb29yIiwicmFuZG9tIiwiZ2VuZXJhdGVSYW5kb21TdHJpbmciLCJhbHBoYWJldCIsInJhbmRvbURhdGEiLCJjaGFycyIsImNoYXJDb2RlQXQiLCJTdHJpbmciLCJmcm9tQ2hhckNvZGUiLCJhcHBseSIsImdlbmVyYXRlQ29kZVZlcmlmaWVyIiwiZ2VuZXJhdGVQa2NlQ2hhbGxlbmdlIiwiY29kZVZlcmlmaWVyIiwiaGFzaEJ5dGVzIiwiVWludDhBcnJheSIsImFycmF5QnVmZmVyIiwiZW5jb2RlZEhhc2giLCJmcm9tQnl0ZUFycmF5IiwicmVwbGFjZSIsImNyZWF0ZVVVSUQiLCJoZXhEaWdpdHMiLCJzIiwic3RhcnQiLCJ1dWlkIiwiam9pbiIsImJ1aWxkQ2xhaW1zUGFyYW1ldGVyIiwicmVxdWVzdGVkQWNyIiwiaWRfdG9rZW4iLCJhY3IiLCJwYXJzZUNhbGxiYWNrUGFyYW1zIiwicGFyYW1zU3RyaW5nIiwic3VwcG9ydGVkUGFyYW1zIiwicCIsInJlc3VsdCIsIm9hdXRoUGFyYW1zIiwic2xpY2UiLCJwYXJzZUNhbGxiYWNrVXJsIiwidXJsIiwicXVlcnlJbmRleCIsImZyYWdtZW50SW5kZXgiLCJuZXdVcmwiLCJwYXJzZWQiLCJjb2RlIiwiZXJyb3IiLCJkZWNvZGVUb2tlbiIsInN0ciIsImRlY29kZVVSSUNvbXBvbmVudCIsImVuY29kZVVSSUNvbXBvbmVudCIsIndpbmRvdyIsImF0b2IiLCJpc1Rva2VuRXhwaXJlZCIsInRva2VuRGF0YSIsIm1pblZhbGlkaXR5IiwidGltZVNrZXciLCJleHBpcmVzSW4iLCJ0b2tlbl9wYXJzZWQiLCJjZWlsIiwiU2ltcGxlS2V5Y2xvYWsiLCJjb25maWciLCJyZWFsbSIsImV4Y2hhbmdlQ29kZSIsInZlcmlmeVRva2VuIiwic2V0SW5pdGlhbGl6ZWQiLCJzZXRFcnJvciIsInJlYWxtVXJsIiwiZ2V0UmVhbG1VcmwiLCJhdXRob3JpemF0aW9uX2VuZHBvaW50IiwiZW5kX3Nlc3Npb25fZW5kcG9pbnQiLCJjYWxsYmFja1N0b3JhZ2UiLCJ0b2tlblN0b3JhZ2UiLCJzZWxmIiwicHJvY2Vzc0luaXQiLCJfcmVmIiwicmVkaXJlY3RVcmkiLCJub25jZSIsImNhbGxiYWNrU3RhdGUiLCJjbGllbnRJZCIsInJlc3BvbnNlTW9kZSIsInJlc3BvbnNlVHlwZSIsInNjb3BlIiwicGtjZUNvZGVWZXJpZmllciIsInBrY2VDaGFsbGVuZ2UiLCJhZGQiLCJvcHRpb25zIiwibG9jYXRpb24iLCJhc3NpZ24iLCJjcmVhdGVMb2dpblVybCIsIl9yZWYyIiwiaWRUb2tlbiIsInJlbW92ZSIsImNyZWF0ZUxvZ291dFVybCIsIm9hdXRoIiwib2F1dGhTdGF0ZSIsImdldCIsInZhbGlkIiwic3RvcmVkTm9uY2UiLCJ0aW1lTG9jYWwiLCJfb2JqZWN0U3ByZWFkIiwicmVmcmVzaF90b2tlbiIsInJlZnJlc2hfdG9rZW5fcGFyc2VkIiwiaWRfdG9rZW5fcGFyc2VkIiwiYWNjZXNzX3Rva2VuIiwiYXV0aGVudGljYXRlZCIsImlhdCIsInNldFRva2VuIiwiZXJyb3JEYXRhIiwiZXJyb3JfZGVzY3JpcHRpb24iLCJwYXJzZUNhbGxiYWNrIiwiaHJlZiIsImhpc3RvcnkiLCJyZXBsYWNlU3RhdGUiLCJwcm9jZXNzQ2FsbGJhY2siXSwic291cmNlUm9vdCI6IiJ9