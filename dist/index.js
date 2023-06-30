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
  (0,_babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_2__["default"])(this, "getRealmUrl", function () {
    return "".concat(_this.url).concat(_this.url.charAt(_this.url.length - 1) === '/' ? '' : '/', "realms/").concat(encodeURIComponent(_this.realm));
  });
  (0,_babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_2__["default"])(this, "init", function (exchangeCode, verifyToken, setInitialized) {
    var realmUrl = _this.getRealmUrl();
    _this.authorization_endpoint = "".concat(realmUrl, "/protocol/openid-connect/auth");
    _this.end_session_endpoint = "".concat(realmUrl, "/protocol/openid-connect/logout");
    _this.callbackStorage = (0,_keycloakStorage__WEBPACK_IMPORTED_MODULE_3__.createCallbackStorage)(_this.keycloakCallbackPrefix);
    _this.tokenStorage = (0,_keycloakStorage__WEBPACK_IMPORTED_MODULE_3__.createTokenStorage)(_this.tokenStorageName);
    _this.exchangeCode = exchangeCode;
    _this.verifyToken = verifyToken;
    _this.setInitialized = setInitialized;
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
    var url = _this.createLoginUrl(options);
    console.log(url);
    window.location.assign(url);
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
      //   const errorData = { error: error, error_description: oauth.error_description };
      //   this.onAuthError && this.onAuthError(errorData);
      //   promise && promise.setError(errorData);
      // } else {
      //   promise && promise.setSuccess();
      // }
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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O0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUEsaUJBQWlCLFFBQVE7QUFDekI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQSxnQkFBZ0IsUUFBUTtBQUN4QjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxVQUFVO0FBQ1Y7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsUUFBUTtBQUNSO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esa0JBQWtCLFlBQVk7QUFDOUI7QUFDQTtBQUNBO0FBQ0EsVUFBVTtBQUNWO0FBQ0E7QUFDQSxVQUFVO0FBQ1Y7QUFDQTtBQUNBO0FBQ0EsVUFBVTtBQUNWO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxNQUFNO0FBQ047QUFDQTtBQUNBO0FBQ0EsVUFBVTtBQUNWO0FBQ0EsVUFBVTtBQUNWO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsUUFBUTtBQUNSO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQSxnQkFBZ0IsUUFBUTtBQUN4QjtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSxJQUFJO0FBQ0o7QUFDQTtBQUNBO0FBQ0EsTUFBTSxtQ0FBTztBQUNiO0FBQ0EsT0FBTztBQUFBLGtHQUFDO0FBQ1I7QUFDQTtBQUNBLENBQUM7Ozs7Ozs7Ozs7Ozs7Ozs7QUNyZ0JjO0FBQ2Y7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7Ozs7Ozs7Ozs7QUNKK0M7QUFDL0M7QUFDQSxrQkFBa0Isa0JBQWtCO0FBQ3BDO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esa0NBQWtDLDZEQUFhO0FBQy9DO0FBQ0E7QUFDZTtBQUNmO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7Ozs7Ozs7Ozs7Ozs7Ozs7QUNqQitDO0FBQ2hDO0FBQ2YsUUFBUSw2REFBYTtBQUNyQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0wsSUFBSTtBQUNKO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7Ozs7Ozs7Ozs7O0FDZGtDO0FBQ25CO0FBQ2YsTUFBTSxzREFBTztBQUNiO0FBQ0E7QUFDQTtBQUNBLFFBQVEsc0RBQU87QUFDZjtBQUNBO0FBQ0E7QUFDQTs7Ozs7Ozs7Ozs7Ozs7Ozs7QUNWa0M7QUFDUztBQUM1QjtBQUNmLFlBQVksMkRBQVc7QUFDdkIsU0FBUyxzREFBTztBQUNoQjs7Ozs7Ozs7Ozs7Ozs7O0FDTGU7QUFDZjs7QUFFQTtBQUNBO0FBQ0EsSUFBSTtBQUNKO0FBQ0EsR0FBRztBQUNIOzs7Ozs7VUNSQTtVQUNBOztVQUVBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBOztVQUVBO1VBQ0E7O1VBRUE7VUFDQTtVQUNBOzs7OztXQ3RCQTs7Ozs7V0NBQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0EsaUNBQWlDLFdBQVc7V0FDNUM7V0FDQTs7Ozs7V0NQQTtXQUNBO1dBQ0E7V0FDQTtXQUNBLHlDQUF5Qyx3Q0FBd0M7V0FDakY7V0FDQTtXQUNBOzs7OztXQ1BBO1dBQ0E7V0FDQTtXQUNBO1dBQ0EsR0FBRztXQUNIO1dBQ0E7V0FDQSxDQUFDOzs7OztXQ1BEOzs7OztXQ0FBO1dBQ0E7V0FDQTtXQUNBLHVEQUF1RCxpQkFBaUI7V0FDeEU7V0FDQSxnREFBZ0QsYUFBYTtXQUM3RDs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQ044QztBQUNjIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vcmVhY3Qta2V5Y2xvYWstdXRpbHMvd2VicGFjay91bml2ZXJzYWxNb2R1bGVEZWZpbml0aW9uIiwid2VicGFjazovL3JlYWN0LWtleWNsb2FrLXV0aWxzLy4vc3JjL2tleWNsb2FrU3RvcmFnZS5qcyIsIndlYnBhY2s6Ly9yZWFjdC1rZXljbG9hay11dGlscy8uL3NyYy9rZXljbG9ha1V0aWxzLmpzIiwid2VicGFjazovL3JlYWN0LWtleWNsb2FrLXV0aWxzLy4vc3JjL3NpbXBsZUtleWNsb2FrLmpzIiwid2VicGFjazovL3JlYWN0LWtleWNsb2FrLXV0aWxzLy4vbm9kZV9tb2R1bGVzL2Jhc2U2NC1qcy9pbmRleC5qcyIsIndlYnBhY2s6Ly9yZWFjdC1rZXljbG9hay11dGlscy8uL25vZGVfbW9kdWxlcy9qcy1zaGEyNTYvc3JjL3NoYTI1Ni5qcyIsIndlYnBhY2s6Ly9yZWFjdC1rZXljbG9hay11dGlscy8uL25vZGVfbW9kdWxlcy9AYmFiZWwvcnVudGltZS9oZWxwZXJzL2VzbS9jbGFzc0NhbGxDaGVjay5qcyIsIndlYnBhY2s6Ly9yZWFjdC1rZXljbG9hay11dGlscy8uL25vZGVfbW9kdWxlcy9AYmFiZWwvcnVudGltZS9oZWxwZXJzL2VzbS9jcmVhdGVDbGFzcy5qcyIsIndlYnBhY2s6Ly9yZWFjdC1rZXljbG9hay11dGlscy8uL25vZGVfbW9kdWxlcy9AYmFiZWwvcnVudGltZS9oZWxwZXJzL2VzbS9kZWZpbmVQcm9wZXJ0eS5qcyIsIndlYnBhY2s6Ly9yZWFjdC1rZXljbG9hay11dGlscy8uL25vZGVfbW9kdWxlcy9AYmFiZWwvcnVudGltZS9oZWxwZXJzL2VzbS90b1ByaW1pdGl2ZS5qcyIsIndlYnBhY2s6Ly9yZWFjdC1rZXljbG9hay11dGlscy8uL25vZGVfbW9kdWxlcy9AYmFiZWwvcnVudGltZS9oZWxwZXJzL2VzbS90b1Byb3BlcnR5S2V5LmpzIiwid2VicGFjazovL3JlYWN0LWtleWNsb2FrLXV0aWxzLy4vbm9kZV9tb2R1bGVzL0BiYWJlbC9ydW50aW1lL2hlbHBlcnMvZXNtL3R5cGVvZi5qcyIsIndlYnBhY2s6Ly9yZWFjdC1rZXljbG9hay11dGlscy93ZWJwYWNrL2Jvb3RzdHJhcCIsIndlYnBhY2s6Ly9yZWFjdC1rZXljbG9hay11dGlscy93ZWJwYWNrL3J1bnRpbWUvYW1kIG9wdGlvbnMiLCJ3ZWJwYWNrOi8vcmVhY3Qta2V5Y2xvYWstdXRpbHMvd2VicGFjay9ydW50aW1lL2NvbXBhdCBnZXQgZGVmYXVsdCBleHBvcnQiLCJ3ZWJwYWNrOi8vcmVhY3Qta2V5Y2xvYWstdXRpbHMvd2VicGFjay9ydW50aW1lL2RlZmluZSBwcm9wZXJ0eSBnZXR0ZXJzIiwid2VicGFjazovL3JlYWN0LWtleWNsb2FrLXV0aWxzL3dlYnBhY2svcnVudGltZS9nbG9iYWwiLCJ3ZWJwYWNrOi8vcmVhY3Qta2V5Y2xvYWstdXRpbHMvd2VicGFjay9ydW50aW1lL2hhc093blByb3BlcnR5IHNob3J0aGFuZCIsIndlYnBhY2s6Ly9yZWFjdC1rZXljbG9hay11dGlscy93ZWJwYWNrL3J1bnRpbWUvbWFrZSBuYW1lc3BhY2Ugb2JqZWN0Iiwid2VicGFjazovL3JlYWN0LWtleWNsb2FrLXV0aWxzLy4vc3JjL2luZGV4LmpzIl0sInNvdXJjZXNDb250ZW50IjpbIihmdW5jdGlvbiB3ZWJwYWNrVW5pdmVyc2FsTW9kdWxlRGVmaW5pdGlvbihyb290LCBmYWN0b3J5KSB7XG5cdGlmKHR5cGVvZiBleHBvcnRzID09PSAnb2JqZWN0JyAmJiB0eXBlb2YgbW9kdWxlID09PSAnb2JqZWN0Jylcblx0XHRtb2R1bGUuZXhwb3J0cyA9IGZhY3RvcnkoKTtcblx0ZWxzZSBpZih0eXBlb2YgZGVmaW5lID09PSAnZnVuY3Rpb24nICYmIGRlZmluZS5hbWQpXG5cdFx0ZGVmaW5lKFtdLCBmYWN0b3J5KTtcblx0ZWxzZSBpZih0eXBlb2YgZXhwb3J0cyA9PT0gJ29iamVjdCcpXG5cdFx0ZXhwb3J0c1tcInJlYWN0LWtleWNsb2FrLXV0aWxzXCJdID0gZmFjdG9yeSgpO1xuXHRlbHNlXG5cdFx0cm9vdFtcInJlYWN0LWtleWNsb2FrLXV0aWxzXCJdID0gZmFjdG9yeSgpO1xufSkodGhpcywgKCkgPT4ge1xucmV0dXJuICIsImNvbnN0IEtFWUNMT0FLX0NBTExCQUNLX1BSRUZJWCA9ICdrYy1jYWxsYmFjay0nO1xuY29uc3QgVE9LRU5fU1RPUkFHRV9OQU1FID0gJ2tjLXRva2Vucyc7XG5cbmNvbnN0IGNsZWFyRXhwaXJlZCA9IChrZXljbG9ha0NhbGxiYWNrUHJlZml4KSA9PiB7XG4gIGNvbnN0IHRpbWUgPSBuZXcgRGF0ZSgpLmdldFRpbWUoKTtcbiAgZm9yIChsZXQgaSA9IDA7IGkgPCBsb2NhbFN0b3JhZ2UubGVuZ3RoOyBpKyspICB7XG4gICAgY29uc3Qga2V5ID0gbG9jYWxTdG9yYWdlLmtleShpKTtcbiAgICBpZiAoa2V5ICYmIGtleS5pbmRleE9mKGtleWNsb2FrQ2FsbGJhY2tQcmVmaXgpID09PSAwKSB7XG4gICAgICBjb25zdCB2YWx1ZSA9IGxvY2FsU3RvcmFnZS5nZXRJdGVtKGtleSk7XG4gICAgICBpZiAodmFsdWUpIHtcbiAgICAgICAgdHJ5IHtcbiAgICAgICAgICBjb25zdCBleHBpcmVzID0gSlNPTi5wYXJzZSh2YWx1ZSkuZXhwaXJlcztcbiAgICAgICAgICBpZiAoIWV4cGlyZXMgfHwgZXhwaXJlcyA8IHRpbWUpIHtcbiAgICAgICAgICAgIGxvY2FsU3RvcmFnZS5yZW1vdmVJdGVtKGtleSk7XG4gICAgICAgICAgfVxuICAgICAgICB9IGNhdGNoIChlcnIpIHtcbiAgICAgICAgICBsb2NhbFN0b3JhZ2UucmVtb3ZlSXRlbShrZXkpO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuICB9XG59O1xuXG5jbGFzcyBMb2NhbFN0b3JhZ2V7XG4gIGNvbnN0cnVjdG9yKGtleWNsb2FrQ2FsbGJhY2tQcmVmaXgpIHtcbiAgICBsb2NhbFN0b3JhZ2Uuc2V0SXRlbSgna2MtdGVzdCcsICd0ZXN0Jyk7XG4gICAgbG9jYWxTdG9yYWdlLnJlbW92ZUl0ZW0oJ2tjLXRlc3QnKTtcbiAgICB0aGlzLmtleWNsb2FrQ2FsbGJhY2tQcmVmaXggPSBrZXljbG9ha0NhbGxiYWNrUHJlZml4O1xuICAgIHJldHVybiB0aGlzO1xuICB9XG5cbiAgZ2V0ID0gKHN0YXRlKSA9PiB7XG4gICAgaWYgKCFzdGF0ZSkge1xuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIGNvbnN0IGtleSA9IGAke3RoaXMua2V5Y2xvYWtDYWxsYmFja1ByZWZpeH0ke3N0YXRlfWA7XG4gICAgbGV0IHZhbHVlID0gbG9jYWxTdG9yYWdlLmdldEl0ZW0oa2V5KTtcbiAgICBpZiAodmFsdWUpIHtcbiAgICAgIGxvY2FsU3RvcmFnZS5yZW1vdmVJdGVtKGtleSk7XG4gICAgICB2YWx1ZSA9IEpTT04ucGFyc2UodmFsdWUpO1xuICAgIH1cblxuICAgIGNsZWFyRXhwaXJlZCh0aGlzLmtleWNsb2FrQ2FsbGJhY2tQcmVmaXgpO1xuICAgIHJldHVybiB2YWx1ZTtcbiAgfTtcblxuICBhZGQgPSAoc3RhdGVEYXRhKSA9PiB7XG4gICAgY2xlYXJFeHBpcmVkKHRoaXMua2V5Y2xvYWtDYWxsYmFja1ByZWZpeCk7XG5cbiAgICBjb25zdCBrZXkgPSBgJHt0aGlzLmtleWNsb2FrQ2FsbGJhY2tQcmVmaXh9JHtzdGF0ZURhdGEuc3RhdGV9YDtcbiAgICBzdGF0ZURhdGEuZXhwaXJlcyA9IG5ldyBEYXRlKCkuZ2V0VGltZSgpICsgKDYwICogNjAgKiAxMDAwKTtcbiAgICBsb2NhbFN0b3JhZ2Uuc2V0SXRlbShrZXksIEpTT04uc3RyaW5naWZ5KHN0YXRlRGF0YSkpO1xuICB9O1xufVxuXG5cbmNvbnN0IGNvb2tpZUV4cGlyYXRpb24gPSAobWludXRlcykgPT4ge1xuICBjb25zdCBleHAgPSBuZXcgRGF0ZSgpO1xuICBleHAuc2V0VGltZShleHAuZ2V0VGltZSgpICsgKG1pbnV0ZXMqNjAqMTAwMCkpO1xuICByZXR1cm4gZXhwO1xufTtcblxuY29uc3QgZ2V0Q29va2llID0gKGtleSkgPT4ge1xuICBjb25zdCBuYW1lID0ga2V5ICsgJz0nO1xuICBjb25zdCBjYSA9IGRvY3VtZW50LmNvb2tpZS5zcGxpdCgnOycpO1xuICBmb3IgKGxldCBpID0gMDsgaSA8IGNhLmxlbmd0aDsgaSsrKSB7XG4gICAgbGV0IGMgPSBjYVtpXTtcbiAgICB3aGlsZSAoYy5jaGFyQXQoMCkgPT09ICcgJykge1xuICAgICAgYyA9IGMuc3Vic3RyaW5nKDEpO1xuICAgIH1cbiAgICBpZiAoYy5pbmRleE9mKG5hbWUpID09PSAwKSB7XG4gICAgICByZXR1cm4gYy5zdWJzdHJpbmcobmFtZS5sZW5ndGgsIGMubGVuZ3RoKTtcbiAgICB9XG4gIH1cbiAgcmV0dXJuICcnO1xufTtcblxuY29uc3Qgc2V0Q29va2llID0gKGtleSwgdmFsdWUsIGV4cGlyYXRpb25EYXRlKSA9PiB7XG4gIGRvY3VtZW50LmNvb2tpZSA9IGAke2tleX09JHt2YWx1ZX07IGV4cGlyZXM9JHtleHBpcmF0aW9uRGF0ZS50b1VUQ1N0cmluZygpfTsgYDtcbn07XG5cbmNsYXNzIENvb2tpZVN0b3JhZ2V7XG4gIGNvbnN0cnVjdG9yKGtleWNsb2FrQ2FsbGJhY2tQcmVmaXgpIHtcbiAgICB0aGlzLmtleWNsb2FrQ2FsbGJhY2tQcmVmaXggPSBrZXljbG9ha0NhbGxiYWNrUHJlZml4O1xuICAgIHJldHVybiB0aGlzO1xuICB9XG5cbiAgZ2V0ID0gKHN0YXRlKSA9PiB7XG4gICAgaWYgKCFzdGF0ZSkge1xuICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICBjb25zdCBrZXkgPSBgJHt0aGlzLmtleWNsb2FrQ2FsbGJhY2tQcmVmaXh9JHtzdGF0ZX1gO1xuICAgIGNvbnN0IHZhbHVlID0gZ2V0Q29va2llKGtleSk7XG4gICAgc2V0Q29va2llKGtleSwgJycsIGNvb2tpZUV4cGlyYXRpb24oLTEwMCkpO1xuICAgIGlmICh2YWx1ZSkge1xuICAgICAgcmV0dXJuIEpTT04ucGFyc2UodmFsdWUpO1xuICAgIH1cbiAgfTtcblxuICBhZGQgPSAoc3RhdGVEYXRhKSA9PiB7XG4gICAgY29uc3Qga2V5ID0gYCR7dGhpcy5rZXljbG9ha0NhbGxiYWNrUHJlZml4fSR7c3RhdGVEYXRhLnN0YXRlfWA7XG4gICAgc2V0Q29va2llKGtleSwgSlNPTi5zdHJpbmdpZnkoc3RhdGVEYXRhKSwgY29va2llRXhwaXJhdGlvbig2MCkpO1xuICB9O1xuXG5cbn1cblxuZXhwb3J0IGNvbnN0IGNyZWF0ZUNhbGxiYWNrU3RvcmFnZSA9IChrZXljbG9ha0NhbGxiYWNrUHJlZml4KSA9PiB7XG4gIHRyeSB7XG4gICAgcmV0dXJuIG5ldyBMb2NhbFN0b3JhZ2Uoa2V5Y2xvYWtDYWxsYmFja1ByZWZpeD1LRVlDTE9BS19DQUxMQkFDS19QUkVGSVgpO1xuICB9IGNhdGNoIChlcnIpIHt9XG4gIHJldHVybiBuZXcgQ29va2llU3RvcmFnZShrZXljbG9ha0NhbGxiYWNrUHJlZml4PUtFWUNMT0FLX0NBTExCQUNLX1BSRUZJWCk7XG59O1xuXG5cbmNsYXNzIExvY2FsVG9rZW5TdG9yYWdle1xuICBjb25zdHJ1Y3Rvcih0b2tlblN0b3JhZ2VOYW1lKSB7XG4gICAgdGhpcy50b2tlblN0b3JhZ2VOYW1lID0gdG9rZW5TdG9yYWdlTmFtZTtcbiAgICBsb2NhbFN0b3JhZ2Uuc2V0SXRlbSgna2MtdGVzdCcsICd0ZXN0Jyk7XG4gICAgbG9jYWxTdG9yYWdlLnJlbW92ZUl0ZW0oJ2tjLXRlc3QnKTtcbiAgICByZXR1cm4gdGhpcztcbiAgfVxuICBhZGQgPSAoZGF0YSkgPT4ge1xuICAgIGxvY2FsU3RvcmFnZS5zZXRJdGVtKHRoaXMudG9rZW5TdG9yYWdlTmFtZSwgSlNPTi5zdHJpbmdpZnkoZGF0YSkpO1xuICB9XG5cbiAgZ2V0ID0gKCkgPT4ge1xuICAgIGNvbnN0IHZhbHVlID0gbG9jYWxTdG9yYWdlLmdldEl0ZW0odGhpcy50b2tlblN0b3JhZ2VOYW1lKTtcbiAgICBpZih2YWx1ZSkge1xuICAgICAgcmV0dXJuIEpTT04ucGFyc2UodmFsdWUpO1xuICAgIH1cbiAgfVxuXG4gIHJlbW92ZSA9ICgpID0+IHtcbiAgICBsb2NhbFN0b3JhZ2UucmVtb3ZlSXRlbSh0aGlzLnRva2VuU3RvcmFnZU5hbWUpO1xuICB9XG59XG5cbmNsYXNzIENvb2tpZVRva2VuU3RvcmFnZXtcbiAgY29uc3RydWN0b3IodG9rZW5TdG9yYWdlTmFtZSkge1xuICAgIHRoaXMudG9rZW5TdG9yYWdlTmFtZSA9IHRva2VuU3RvcmFnZU5hbWU7XG4gICAgcmV0dXJuIHRoaXM7XG4gIH1cblxuICBhZGQgPSAoZGF0YSkgPT4ge1xuICAgIHNldENvb2tpZSh0aGlzLnRva2VuU3RvcmFnZU5hbWUsIEpTT04uc3RyaW5naWZ5KGRhdGEpLCBjb29raWVFeHBpcmF0aW9uKDM2MDApKTtcbiAgfVxuXG4gIGdldCA9ICgpID0+IHtcbiAgICBjb25zdCB2YWx1ZSA9IGdldENvb2tpZSh0aGlzLnRva2VuU3RvcmFnZU5hbWUpO1xuICAgIGlmICh2YWx1ZSkge1xuICAgICAgcmV0dXJuIEpTT04ucGFyc2UodmFsdWUpO1xuICAgIH1cbiAgfVxuXG4gIHJlbW92ZSA9ICgpID0+IHtcbiAgICBzZXRDb29raWUodGhpcy50b2tlblN0b3JhZ2VOYW1lLCAnJywgY29va2llRXhwaXJhdGlvbigtMTAwKSk7XG4gIH07XG59XG5cblxuLy8gMiB0eXBlIHN0b3JhZ2U6XG4vLyAxIFRva2VuU3RvcmFnZSBjbGFzcyB3aXRoIG1ldGhvZHMgYWRkIGdldCByZW1vdmVcbi8vIDIgVGlja2V0U3RvcmFnZSBjbGFzcyB3aXRoIG5hbWUgK3N0YXRlSWQgYW5kIG1ldGhvZHMgYWRkIGdldCByZW1vdmUgd2hlbiBnZXRcblxuZXhwb3J0IGNvbnN0IGNyZWF0ZVRva2VuU3RvcmFnZSA9ICh0b2tlblN0b3JhZ2VOYW1lPVRPS0VOX1NUT1JBR0VfTkFNRSkgPT4ge1xuICB0cnkge1xuICAgIHJldHVybiBuZXcgTG9jYWxUb2tlblN0b3JhZ2UodG9rZW5TdG9yYWdlTmFtZSk7XG4gIH0gY2F0Y2ggKGVycikge31cbiAgcmV0dXJuIG5ldyBDb29raWVUb2tlblN0b3JhZ2UodG9rZW5TdG9yYWdlTmFtZSk7XG59XG4iLCJpbXBvcnQge3NoYTI1Nn0gZnJvbSAnanMtc2hhMjU2JztcbmltcG9ydCAqIGFzIGJhc2U2NEpzIGZyb20gJ2Jhc2U2NC1qcyc7XG5cbmNvbnN0IGdlbmVyYXRlUmFuZG9tRGF0YSA9IChsZW4pID0+IHtcbiAgY29uc3QgYXJyYXkgPSBuZXcgQXJyYXkobGVuKTtcbiAgZm9yIChsZXQgaiA9IDA7IGogPCBhcnJheS5sZW5ndGg7IGorKykge1xuICAgIGFycmF5W2pdID0gTWF0aC5mbG9vcigyNTYgKiBNYXRoLnJhbmRvbSgpKTtcbiAgfVxuICByZXR1cm4gYXJyYXk7XG59XG5cbmNvbnN0IGdlbmVyYXRlUmFuZG9tU3RyaW5nID0gKGxlbiwgYWxwaGFiZXQpID0+IHtcbiAgY29uc3QgcmFuZG9tRGF0YSA9IGdlbmVyYXRlUmFuZG9tRGF0YShsZW4pO1xuICBjb25zdCBjaGFycyA9IG5ldyBBcnJheShsZW4pO1xuICBmb3IgKGxldCBpID0gMDsgaSA8IGxlbjsgaSsrKSB7XG4gICAgY2hhcnNbaV0gPSBhbHBoYWJldC5jaGFyQ29kZUF0KHJhbmRvbURhdGFbaV0gJSBhbHBoYWJldC5sZW5ndGgpO1xuICB9XG4gIHJldHVybiBTdHJpbmcuZnJvbUNoYXJDb2RlLmFwcGx5KG51bGwsIGNoYXJzKTtcbn1cblxuY29uc3QgZ2VuZXJhdGVDb2RlVmVyaWZpZXIgPSAobGVuKSA9PiB7XG4gIHJldHVybiBnZW5lcmF0ZVJhbmRvbVN0cmluZyhsZW4sICdBQkNERUZHSElKS0xNTk9QUVJTVFVWV1hZWmFiY2RlZmdoaWprbG1ub3BxcnN0dXZ3eHl6MDEyMzQ1Njc4OScpO1xufVxuXG5jb25zdCBnZW5lcmF0ZVBrY2VDaGFsbGVuZ2UgPSAoY29kZVZlcmlmaWVyKSA9PiB7XG4gICAgICBjb25zdCBoYXNoQnl0ZXMgPSBuZXcgVWludDhBcnJheShzaGEyNTYuYXJyYXlCdWZmZXIoY29kZVZlcmlmaWVyKSk7XG4gICAgICBjb25zdCBlbmNvZGVkSGFzaCA9IGJhc2U2NEpzLmZyb21CeXRlQXJyYXkoaGFzaEJ5dGVzKVxuICAgICAgICAucmVwbGFjZSgvXFwrL2csICctJylcbiAgICAgICAgLnJlcGxhY2UoL1xcLy9nLCAnXycpXG4gICAgICAgIC5yZXBsYWNlKC9cXD0vZywgJycpO1xuICAgICAgcmV0dXJuIGVuY29kZWRIYXNoO1xufVxuXG5jb25zdCBjcmVhdGVVVUlEID0gKCkgPT4ge1xuICBjb25zdCBoZXhEaWdpdHMgPSAnMDEyMzQ1Njc4OWFiY2RlZic7XG4gIGNvbnN0IHMgPSBnZW5lcmF0ZVJhbmRvbVN0cmluZygzNiwgaGV4RGlnaXRzKS5zcGxpdChcIlwiKTtcbiAgc1sxNF0gPSAnNCc7XG4gIC8vIHNbMTldID0gaGV4RGlnaXRzLnN1YnN0cigoc1sxOV0gJiAweDMpIHwgMHg4LCAxKTtcbiAgY29uc3Qgc3RhcnQgPSAoc1sxOV0gJiAweDMpIHwgMHg4O1xuICBzWzE5XSA9IGhleERpZ2l0cy5zdWJzdHJpbmcoc3RhcnQsIHN0YXJ0KzEpO1xuICBzWzhdID0gc1sxM10gPSBzWzE4XSA9IHNbMjNdID0gJy0nO1xuICBjb25zdCB1dWlkID0gcy5qb2luKCcnKTtcbiAgcmV0dXJuIHV1aWQ7XG59XG5cbmNvbnN0IGJ1aWxkQ2xhaW1zUGFyYW1ldGVyID0gKHJlcXVlc3RlZEFjcikgPT4gSlNPTi5zdHJpbmdpZnkoe1xuICBpZF90b2tlbjoge1xuICAgIGFjcjogcmVxdWVzdGVkQWNyXG4gIH1cbn0pO1xuXG5jb25zdCBwYXJzZUNhbGxiYWNrUGFyYW1zID0gKHBhcmFtc1N0cmluZywgc3VwcG9ydGVkUGFyYW1zKSA9PiB7XG4gIGNvbnN0IHAgPSBwYXJhbXNTdHJpbmcuc3BsaXQoJyYnKTtcbiAgY29uc3QgcmVzdWx0ID0ge1xuICAgIHBhcmFtc1N0cmluZzogJycsXG4gICAgb2F1dGhQYXJhbXM6IHt9XG4gIH07XG4gIGZvciAobGV0IGkgPSAwOyBpIDwgcC5sZW5ndGg7IGkrKykge1xuICAgIGNvbnN0IHNwbGl0ID0gcFtpXS5pbmRleE9mKFwiPVwiKTtcbiAgICBjb25zdCBrZXkgPSBwW2ldLnNsaWNlKDAsIHNwbGl0KTtcbiAgICBpZiAoc3VwcG9ydGVkUGFyYW1zLmluZGV4T2Yoa2V5KSAhPT0gLTEpIHtcbiAgICAgIHJlc3VsdC5vYXV0aFBhcmFtc1trZXldID0gcFtpXS5zbGljZShzcGxpdCArIDEpO1xuICAgIH0gZWxzZSB7XG4gICAgICBpZiAocmVzdWx0LnBhcmFtc1N0cmluZyAhPT0gJycpIHtcbiAgICAgICAgcmVzdWx0LnBhcmFtc1N0cmluZyArPSAnJic7XG4gICAgICB9XG4gICAgICByZXN1bHQucGFyYW1zU3RyaW5nICs9IHBbaV07XG4gICAgfVxuICB9XG4gIHJldHVybiByZXN1bHQ7XG59XG5cbmNvbnN0IHBhcnNlQ2FsbGJhY2tVcmwgPSAodXJsKSA9PiB7XG4gIGNvbnN0IHN1cHBvcnRlZFBhcmFtcyA9IFsnY29kZScsICdzdGF0ZScsICdzZXNzaW9uX3N0YXRlJywgJ2Vycm9yJywgJ2Vycm9yX2Rlc2NyaXB0aW9uJywgJ2Vycm9yX3VyaSddO1xuICAvLyDQtdGB0LvQuCDQv9GA0LjRhdC+0LTQuNGCINC+0YjQuNCx0LrQsCDRgtC+INC60LXQudC60LvQvtC60YMg0LLRgdC1INGA0LDQstC90L4g0LrQsNC60L7QuSDQt9Cw0L/RgNC+0YEg0LLQvtC30LLRgNCw0YnQsNC10YIg0LDRgtGC0YDQuNCx0YPRgtGLINC/0L7RgdC70LUg0LfQvdCw0LrQsCDQstC+0L/RgNC+0YHQuNC60LBcbiAgY29uc3QgcXVlcnlJbmRleCA9IHVybC5pbmRleE9mKCc/Jyk7XG4gIGNvbnN0IGZyYWdtZW50SW5kZXggPSB1cmwuaW5kZXhPZignIycpO1xuICBsZXQgbmV3VXJsO1xuICBsZXQgcGFyc2VkO1xuICBpZiAoZnJhZ21lbnRJbmRleCAhPT0gLTEpIHtcbiAgICBuZXdVcmwgPSB1cmwuc3Vic3RyaW5nKDAsIGZyYWdtZW50SW5kZXgpO1xuICAgIHBhcnNlZCA9IHBhcnNlQ2FsbGJhY2tQYXJhbXModXJsLnN1YnN0cmluZyhmcmFnbWVudEluZGV4ICsgMSksIHN1cHBvcnRlZFBhcmFtcyk7XG4gICAgaWYgKHBhcnNlZC5wYXJhbXNTdHJpbmcgIT09ICcnKSB7XG4gICAgICBuZXdVcmwgKz0gJyMnICsgcGFyc2VkLnBhcmFtc1N0cmluZztcbiAgICB9XG4gIH1lbHNlIGlmKGZyYWdtZW50SW5kZXggPT09IC0xICYmIHF1ZXJ5SW5kZXggIT09IC0xKXtcbiAgICBuZXdVcmwgPSB1cmwuc3Vic3RyaW5nKDAsIHF1ZXJ5SW5kZXgpO1xuICAgIHBhcnNlZCA9IHBhcnNlQ2FsbGJhY2tQYXJhbXModXJsLnN1YnN0cmluZyhxdWVyeUluZGV4ICsgMSksIHN1cHBvcnRlZFBhcmFtcyk7XG4gICAgaWYgKHBhcnNlZC5wYXJhbXNTdHJpbmcgIT09ICcnKSB7XG4gICAgICBuZXdVcmwgKz0gJyMnICsgcGFyc2VkLnBhcmFtc1N0cmluZztcbiAgICB9XG4gIH1cblxuICBpZiAocGFyc2VkICYmIHBhcnNlZC5vYXV0aFBhcmFtcykge1xuICAgICAgaWYgKChwYXJzZWQub2F1dGhQYXJhbXMuY29kZSB8fCBwYXJzZWQub2F1dGhQYXJhbXMuZXJyb3IpICYmIHBhcnNlZC5vYXV0aFBhcmFtcy5zdGF0ZSkge1xuICAgICAgICBwYXJzZWQub2F1dGhQYXJhbXMubmV3VXJsID0gbmV3VXJsO1xuICAgICAgICByZXR1cm4gcGFyc2VkLm9hdXRoUGFyYW1zO1xuICAgICAgfVxuICAgIH1cblxufVxuXG5jb25zdCBkZWNvZGVUb2tlbiA9IChzdHIpID0+IHtcbiAgc3RyID0gc3RyLnNwbGl0KCcuJylbMV07XG4gIHN0ciA9IHN0ci5yZXBsYWNlKC8tL2csICcrJyk7XG4gIHN0ciA9IHN0ci5yZXBsYWNlKC9fL2csICcvJyk7XG4gIHN3aXRjaCAoc3RyLmxlbmd0aCAlIDQpIHtcbiAgICBjYXNlIDA6XG4gICAgICBicmVhaztcbiAgICBjYXNlIDI6XG4gICAgICBzdHIgKz0gJz09JztcbiAgICAgIGJyZWFrO1xuICAgIGNhc2UgMzpcbiAgICAgIHN0ciArPSAnPSc7XG4gICAgICBicmVhaztcbiAgICBkZWZhdWx0OlxuICAgICAgdGhyb3cgJ0ludmFsaWQgdG9rZW4nO1xuICB9XG4gIHN0ciA9IGRlY29kZVVSSUNvbXBvbmVudChlbmNvZGVVUklDb21wb25lbnQod2luZG93LmF0b2Ioc3RyKSkpO1xuICBzdHIgPSBKU09OLnBhcnNlKHN0cik7XG4gIHJldHVybiBzdHI7XG59XG5cbmNvbnN0IGlzVG9rZW5FeHBpcmVkID0gZnVuY3Rpb24odG9rZW5EYXRhLCBtaW5WYWxpZGl0eT01KSB7XG4gIGlmICh0b2tlbkRhdGEudGltZVNrZXcgPT0gbnVsbCkge1xuICAgIHJldHVybiB0cnVlO1xuICB9XG5cbiAgbGV0IGV4cGlyZXNJbiA9IHRva2VuRGF0YS50b2tlbl9wYXJzZWRbJ2V4cCddIC0gTWF0aC5jZWlsKG5ldyBEYXRlKCkuZ2V0VGltZSgpIC8gMTAwMCkgKyB0b2tlbkRhdGEudGltZVNrZXc7XG4gIGV4cGlyZXNJbiAtPSBtaW5WYWxpZGl0eTtcbiAgcmV0dXJuIGV4cGlyZXNJbiA8IDA7XG59O1xuXG5cbmV4cG9ydCB7XG4gIGJ1aWxkQ2xhaW1zUGFyYW1ldGVyLFxuICBnZW5lcmF0ZUNvZGVWZXJpZmllcixcbiAgZ2VuZXJhdGVQa2NlQ2hhbGxlbmdlLFxuICBjcmVhdGVVVUlELFxuICBwYXJzZUNhbGxiYWNrVXJsLFxuICBkZWNvZGVUb2tlbixcbiAgaXNUb2tlbkV4cGlyZWQsXG59O1xuIiwiaW1wb3J0IHtjcmVhdGVDYWxsYmFja1N0b3JhZ2UsIGNyZWF0ZVRva2VuU3RvcmFnZX0gZnJvbSAnLi9rZXljbG9ha1N0b3JhZ2UnO1xuaW1wb3J0IHtcbiAgY3JlYXRlVVVJRCxcbiAgZGVjb2RlVG9rZW4sXG4gIGdlbmVyYXRlQ29kZVZlcmlmaWVyLFxuICBnZW5lcmF0ZVBrY2VDaGFsbGVuZ2UsXG4gIGlzVG9rZW5FeHBpcmVkLFxuICBwYXJzZUNhbGxiYWNrVXJsXG59IGZyb20gJy4va2V5Y2xvYWtVdGlscyc7XG5cblxuY2xhc3MgU2ltcGxlS2V5Y2xvYWt7XG4gIHVybCA9ICcnO1xuICByZWFsbSA9ICcnO1xuICBjbGllbnRJZCA9ICcnO1xuICBzY29wZSA9ICdvcGVuaWQnO1xuICByZXNwb25zZU1vZGUgPSAnZnJhZ21lbnQnO1xuICByZXNwb25zZVR5cGUgPSAnY29kZSc7XG4gIGF1dGhvcml6YXRpb25fZW5kcG9pbnQgPSAgJyc7XG4gIGVuZF9zZXNzaW9uX2VuZHBvaW50ID0gJyc7XG4gIGNhbGxiYWNrU3RvcmFnZSA9IG51bGw7XG4gIHRva2VuU3RvcmFnZSA9IG51bGw7XG4gIGF1dGhlbnRpY2F0ZWQgPSBmYWxzZTtcbiAgdGltZUxvY2FsID0gbnVsbDtcbiAga2V5Y2xvYWtDYWxsYmFja1ByZWZpeCA9IHVuZGVmaW5lZDtcbiAgdG9rZW5TdG9yYWdlTmFtZSA9IHVuZGVmaW5lZDtcblxuICB2ZXJpZnlUb2tlbiA9ICgpID0+IHt9XG4gIGV4Y2hhbmdlQ29kZSA9ICgpID0+IHt9XG4gIHNldEluaXRpYWxpemVkID0gKCkgPT4ge31cblxuICBjb25zdHJ1Y3Rvcihjb25maWcpe1xuICAgIHRoaXMudXJsID0gY29uZmlnLnVybDtcbiAgICB0aGlzLnJlYWxtID0gY29uZmlnLnJlYWxtO1xuICAgIHRoaXMuY2xpZW50SWQgPSBjb25maWcuY2xpZW50SWQ7XG4gICAgaWYoY29uZmlnLnNjb3BlKSB7XG4gICAgICB0aGlzLnNjb3BlID0gY29uZmlnLnNjb3BlO1xuICAgIH1cbiAgICB0aGlzLmtleWNsb2FrQ2FsbGJhY2tQcmVmaXggPSBjb25maWcua2V5Y2xvYWtDYWxsYmFja1ByZWZpeDtcbiAgICB0aGlzLnRva2VuU3RvcmFnZU5hbWUgPSBjb25maWcudG9rZW5TdG9yYWdlTmFtZSB8fCBga2MtJHtjb25maWcucmVhbG19LSR7Y29uZmlnLmNsaWVudElkfWA7XG4gICAgcmV0dXJuIHRoaXM7XG4gIH1cblxuICBnZXRSZWFsbVVybCA9ICgpID0+IHtcbiAgICByZXR1cm4gYCR7dGhpcy51cmx9JHt0aGlzLnVybC5jaGFyQXQodGhpcy51cmwubGVuZ3RoIC0gMSkgPT09ICcvJz8nJzonLyd9cmVhbG1zLyR7ZW5jb2RlVVJJQ29tcG9uZW50KHRoaXMucmVhbG0pfWA7XG4gIH1cblxuICBpbml0ID0gKGV4Y2hhbmdlQ29kZSwgdmVyaWZ5VG9rZW4sIHNldEluaXRpYWxpemVkKSA9PiB7XG4gICAgY29uc3QgcmVhbG1VcmwgPSB0aGlzLmdldFJlYWxtVXJsKCk7XG4gICAgdGhpcy5hdXRob3JpemF0aW9uX2VuZHBvaW50ID0gYCR7cmVhbG1Vcmx9L3Byb3RvY29sL29wZW5pZC1jb25uZWN0L2F1dGhgO1xuICAgIHRoaXMuZW5kX3Nlc3Npb25fZW5kcG9pbnQgPSBgJHtyZWFsbVVybH0vcHJvdG9jb2wvb3BlbmlkLWNvbm5lY3QvbG9nb3V0YDtcbiAgICB0aGlzLmNhbGxiYWNrU3RvcmFnZSA9IGNyZWF0ZUNhbGxiYWNrU3RvcmFnZSh0aGlzLmtleWNsb2FrQ2FsbGJhY2tQcmVmaXgpO1xuICAgIHRoaXMudG9rZW5TdG9yYWdlID0gY3JlYXRlVG9rZW5TdG9yYWdlKHRoaXMudG9rZW5TdG9yYWdlTmFtZSk7XG4gICAgdGhpcy5leGNoYW5nZUNvZGUgPSBleGNoYW5nZUNvZGU7XG4gICAgdGhpcy52ZXJpZnlUb2tlbiA9IHZlcmlmeVRva2VuO1xuICAgIHRoaXMuc2V0SW5pdGlhbGl6ZWQgPSBzZXRJbml0aWFsaXplZDtcbiAgICBjb25zdCBzZWxmID0gdGhpcztcbiAgICBzZWxmLnByb2Nlc3NJbml0KCk7XG4gIH1cblxuICBjcmVhdGVMb2dpblVybCA9ICh7IHJlZGlyZWN0VXJpIH0pID0+IHtcbiAgICAgIGNvbnN0IHN0YXRlID0gY3JlYXRlVVVJRCgpO1xuICAgICAgY29uc3Qgbm9uY2UgPSBjcmVhdGVVVUlEKCk7XG5cbiAgICAgIGNvbnN0IGNhbGxiYWNrU3RhdGUgPSB7XG4gICAgICAgIHN0YXRlOiBzdGF0ZSxcbiAgICAgICAgbm9uY2U6IG5vbmNlLFxuICAgICAgICByZWRpcmVjdFVyaTogZW5jb2RlVVJJQ29tcG9uZW50KHJlZGlyZWN0VXJpKVxuICAgICAgfTtcblxuICAgICAgbGV0IHVybCA9IGAke3RoaXMuYXV0aG9yaXphdGlvbl9lbmRwb2ludH0/Y2xpZW50X2lkPSR7ZW5jb2RlVVJJQ29tcG9uZW50KHRoaXMuY2xpZW50SWQpfSZyZWRpcmVjdF91cmk9JHtlbmNvZGVVUklDb21wb25lbnQocmVkaXJlY3RVcmkpfSZzdGF0ZT0ke2VuY29kZVVSSUNvbXBvbmVudChzdGF0ZSl9JnJlc3BvbnNlX21vZGU9JHtlbmNvZGVVUklDb21wb25lbnQodGhpcy5yZXNwb25zZU1vZGUpfSZyZXNwb25zZV90eXBlPSR7ZW5jb2RlVVJJQ29tcG9uZW50KHRoaXMucmVzcG9uc2VUeXBlKX0mc2NvcGU9JHtlbmNvZGVVUklDb21wb25lbnQodGhpcy5zY29wZSl9Jm5vbmNlPSR7ZW5jb2RlVVJJQ29tcG9uZW50KG5vbmNlKX1gO1xuXG4gICAgICBjb25zdCBjb2RlVmVyaWZpZXIgPSBnZW5lcmF0ZUNvZGVWZXJpZmllcig5Nik7XG4gICAgICBjYWxsYmFja1N0YXRlLnBrY2VDb2RlVmVyaWZpZXIgPSBjb2RlVmVyaWZpZXI7XG4gICAgICBjb25zdCBwa2NlQ2hhbGxlbmdlID0gZ2VuZXJhdGVQa2NlQ2hhbGxlbmdlKGNvZGVWZXJpZmllcik7XG4gICAgICB1cmwgPSBgJHt1cmx9JmNvZGVfY2hhbGxlbmdlPSR7cGtjZUNoYWxsZW5nZX0mY29kZV9jaGFsbGVuZ2VfbWV0aG9kPVMyNTZgO1xuXG4gICAgICB0aGlzLmNhbGxiYWNrU3RvcmFnZS5hZGQoY2FsbGJhY2tTdGF0ZSk7XG4gICAgICByZXR1cm4gdXJsO1xuICB9XG5cbiAgbG9naW4gPSAob3B0aW9ucykgPT4ge1xuICAgIGNvbnN0IHVybCA9IHRoaXMuY3JlYXRlTG9naW5Vcmwob3B0aW9ucyk7XG4gICAgY29uc29sZS5sb2codXJsKTtcbiAgICB3aW5kb3cubG9jYXRpb24uYXNzaWduKHVybCk7XG4gIH1cbiAgY3JlYXRlTG9nb3V0VXJsID0gKHsgcmVkaXJlY3RVcmksIGlkVG9rZW4gfSkgPT4ge1xuICAgICAgbGV0IHVybCA9IGAke3RoaXMuZW5kX3Nlc3Npb25fZW5kcG9pbnR9P2NsaWVudF9pZD0ke2VuY29kZVVSSUNvbXBvbmVudCh0aGlzLmNsaWVudElkKX0mcG9zdF9sb2dvdXRfcmVkaXJlY3RfdXJpPSR7ZW5jb2RlVVJJQ29tcG9uZW50KHJlZGlyZWN0VXJpKX1gO1xuICAgICAgaWYgKGlkVG9rZW4pIHtcbiAgICAgICAgdXJsID0gYCR7dXJsfSZpZF90b2tlbl9oaW50PSR7ZW5jb2RlVVJJQ29tcG9uZW50KGlkVG9rZW4pfWA7XG4gICAgICB9XG4gICAgICByZXR1cm4gdXJsO1xuICB9XG5cbiAgbG9nb3V0ID0gKG9wdGlvbnMpID0+IHtcbiAgICB0aGlzLnRva2VuU3RvcmFnZS5yZW1vdmUoKTtcbiAgICB3aW5kb3cubG9jYXRpb24ucmVwbGFjZSh0aGlzLmNyZWF0ZUxvZ291dFVybChvcHRpb25zKSk7XG4gIH1cblxuICBwYXJzZUNhbGxiYWNrID0gKHVybCkgPT4ge1xuICAgIGNvbnN0IG9hdXRoID0gcGFyc2VDYWxsYmFja1VybCh1cmwpO1xuICAgIGlmICghb2F1dGgpIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICBjb25zdCBvYXV0aFN0YXRlID0gdGhpcy5jYWxsYmFja1N0b3JhZ2UuZ2V0KG9hdXRoLnN0YXRlKTtcblxuICAgIGlmIChvYXV0aFN0YXRlKSB7XG4gICAgICBvYXV0aC52YWxpZCA9IHRydWU7XG4gICAgICBvYXV0aC5yZWRpcmVjdFVyaSA9IG9hdXRoU3RhdGUucmVkaXJlY3RVcmk7XG4gICAgICBvYXV0aC5zdG9yZWROb25jZSA9IG9hdXRoU3RhdGUubm9uY2U7XG4gICAgICBvYXV0aC5wa2NlQ29kZVZlcmlmaWVyID0gb2F1dGhTdGF0ZS5wa2NlQ29kZVZlcmlmaWVyO1xuICAgIH1cblxuICAgIHJldHVybiBvYXV0aDtcbiAgfVxuXG4gIHNldFRva2VuID0gKHRva2VuRGF0YSwgdGltZUxvY2FsKSA9PiB7XG4gICAgY29uc3QgZGF0YSA9IHsuLi50b2tlbkRhdGF9O1xuICAgIGlmIChkYXRhLnJlZnJlc2hfdG9rZW4pIHtcbiAgICAgIGRhdGEucmVmcmVzaF90b2tlbl9wYXJzZWQgPSBkZWNvZGVUb2tlbihkYXRhLnJlZnJlc2hfdG9rZW4pO1xuICAgIH1cbiAgICBpZiAoZGF0YS5pZF90b2tlbikge1xuICAgICAgZGF0YS5pZF90b2tlbl9wYXJzZWQgPSBkZWNvZGVUb2tlbihkYXRhLmlkX3Rva2VuKTtcbiAgICB9XG4gICAgaWYgKGRhdGEuYWNjZXNzX3Rva2VuKSB7XG4gICAgICBkYXRhLnRva2VuX3BhcnNlZCA9IGRlY29kZVRva2VuKGRhdGEuYWNjZXNzX3Rva2VuKTtcbiAgICAgIGRhdGEuYXV0aGVudGljYXRlZCA9IHRydWU7XG4gICAgICBpZiAodGltZUxvY2FsKSB7XG4gICAgICAgIGRhdGEudGltZVNrZXcgPSBNYXRoLmZsb29yKHRpbWVMb2NhbCAvIDEwMDApIC0gZGF0YS50b2tlbl9wYXJzZWQuaWF0O1xuICAgICAgfVxuICAgICAgdGhpcy50b2tlblN0b3JhZ2UuYWRkKGRhdGEpO1xuICAgICAgcmV0dXJuIGRhdGE7XG4gICAgfVxuICB9XG5cbiAgYXV0aFN1Y2Nlc3MgPSAodG9rZW5EYXRhKSA9PiB7IC8ve2FjY2Vzc190b2tlbiwgZXhwaXJlc19pbiwgcmVmcmVzaF90b2tlbiwgcmVmcmVzaF9leHBpcmVzX2luLCB0b2tlbl90eXBlLCBpZF90b2tlbiwgc2Vzc2lvbl9zdGF0ZSwgc2NvcGUsIHRpbWVMb2NhbDpvbGRUaW1lTG9jYWwsIHN0b3JlZE5vbmNlfSkgPT4ge1xuICAgIGlmKHRva2VuRGF0YSkge1xuICAgIGNvbnN0IHRpbWVMb2NhbCA9ICh0b2tlbkRhdGEudGltZUxvY2FsICsgbmV3IERhdGUoKS5nZXRUaW1lKCkpIC8gMjtcbiAgICBjb25zdCBkYXRhID0gdGhpcy5zZXRUb2tlbih0b2tlbkRhdGEsIHRpbWVMb2NhbCk7XG4gICAgaWYgKGRhdGEgJiYgZGF0YS5hdXRoZW50aWNhdGVkICYmICgoZGF0YS50b2tlbl9wYXJzZWQgJiYgZGF0YS50b2tlbl9wYXJzZWQubm9uY2UgPT09IHRva2VuRGF0YS5zdG9yZWROb25jZSkgfHxcbiAgICAgICAgKGRhdGEucmVmcmVzaF90b2tlbl9wYXJzZWQgJiYgZGF0YS5yZWZyZXNoX3Rva2VuX3BhcnNlZC5ub25jZSA9PT0gdG9rZW5EYXRhLnN0b3JlZE5vbmNlKSB8fFxuICAgICAgICAoZGF0YS5pZF90b2tlbl9wYXJzZWQgJiYgZGF0YS5pZF90b2tlbl9wYXJzZWQubm9uY2UgPT09IHRva2VuRGF0YS5zdG9yZWROb25jZSkpKSB7XG4gICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgfVxuICAgIH1cbiAgICB0aGlzLnRva2VuU3RvcmFnZS5yZW1vdmUoKTtcbiAgICByZXR1cm4gZmFsc2U7XG4gIH1cblxuICBwcm9jZXNzQ2FsbGJhY2sgPSAob2F1dGgpID0+IHtcbiAgICBjb25zdCB7Y29kZSwgZXJyb3IsIHN0b3JlZE5vbmNlfSA9IG9hdXRoO1xuICAgIGNvbnN0IHRpbWVMb2NhbCA9IG5ldyBEYXRlKCkuZ2V0VGltZSgpO1xuICAgIGlmIChlcnJvcikge1xuICAgICAgLy8gICBjb25zdCBlcnJvckRhdGEgPSB7IGVycm9yOiBlcnJvciwgZXJyb3JfZGVzY3JpcHRpb246IG9hdXRoLmVycm9yX2Rlc2NyaXB0aW9uIH07XG4gICAgICAvLyAgIHRoaXMub25BdXRoRXJyb3IgJiYgdGhpcy5vbkF1dGhFcnJvcihlcnJvckRhdGEpO1xuICAgICAgLy8gICBwcm9taXNlICYmIHByb21pc2Uuc2V0RXJyb3IoZXJyb3JEYXRhKTtcbiAgICAgIC8vIH0gZWxzZSB7XG4gICAgICAvLyAgIHByb21pc2UgJiYgcHJvbWlzZS5zZXRTdWNjZXNzKCk7XG4gICAgICAvLyB9XG4gICAgICByZXR1cm47XG4gICAgfVxuICAgIGlmIChjb2RlKSB7XG4gICAgICAvLyDQstGL0YXQvtC00LjQvCDQuNC3INC60LvQsNGB0YHQsCDQuCDQvtCx0LzQtdC90LjQstCw0LXQvCDQsdC40LvQtdGCINC90LAg0YLQvtC60LXQvSDRh9C10YDQtdC3INCx0LXQutC10L3QtFxuICAgICAgdGhpcy5leGNoYW5nZUNvZGUoY29kZSwgb2F1dGgucGtjZUNvZGVWZXJpZmllciwgdGltZUxvY2FsLCBzdG9yZWROb25jZSk7XG4gICAgICByZXR1cm4gY29kZTtcbiAgICB9XG4gIH1cblxuICBwcm9jZXNzSW5pdCA9ICgpID0+IHtcbiAgICBjb25zdCBvYXV0aCA9IHRoaXMucGFyc2VDYWxsYmFjayh3aW5kb3cubG9jYXRpb24uaHJlZik7XG4gICAgaWYgKG9hdXRoKSB7XG4gICAgICAvLyDRgdC80L7RgtGA0LjQvCDQtdGB0YLRjCDQu9C4INGB0YHRi9C70LrQsCDRgSDQutC+0LvQsdGN0LrQvtC8XG4gICAgICB3aW5kb3cuaGlzdG9yeS5yZXBsYWNlU3RhdGUod2luZG93Lmhpc3Rvcnkuc3RhdGUsIG51bGwsIG9hdXRoLm5ld1VybCk7XG4gICAgICBpZiAob2F1dGggJiYgb2F1dGgudmFsaWQpIHtcbiAgICAgICAgY29uc3QgY29kZSA9IHRoaXMucHJvY2Vzc0NhbGxiYWNrKG9hdXRoKTtcbiAgICAgICAgaWYoY29kZSl7XG4gICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfWVsc2V7XG4gICAgICAvLyDRgdC80L7RgtGA0LjQvCDQtdGB0YLRjCDQu9C4INCyINGB0YLQvtGA0LXQudC00LbQtSDRgtC+0LrQtdC90Ysg0Lgg0L/RgNC+0LPQvtC90Y/QtdC8INC40YUg0L/QviDQv9GA0LjQu9C+0LbQtdC90LjRjlxuICAgICAgY29uc3QgdG9rZW5EYXRhID0gdGhpcy50b2tlblN0b3JhZ2UuZ2V0KCk7XG4gICAgICBpZih0b2tlbkRhdGEpe1xuICAgICAgICBpZihpc1Rva2VuRXhwaXJlZCh0b2tlbkRhdGEpKXtcbiAgICAgICAgICB0aGlzLnRva2VuU3RvcmFnZS5yZW1vdmUoKTtcbiAgICAgICAgfWVsc2V7XG4gICAgICAgICAgdGhpcy52ZXJpZnlUb2tlbih0b2tlbkRhdGEpO1xuICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cbiAgICB0aGlzLnNldEluaXRpYWxpemVkKCk7XG4gIH1cblxufVxuXG5leHBvcnQgZGVmYXVsdCBTaW1wbGVLZXljbG9haztcbiIsIid1c2Ugc3RyaWN0J1xuXG5leHBvcnRzLmJ5dGVMZW5ndGggPSBieXRlTGVuZ3RoXG5leHBvcnRzLnRvQnl0ZUFycmF5ID0gdG9CeXRlQXJyYXlcbmV4cG9ydHMuZnJvbUJ5dGVBcnJheSA9IGZyb21CeXRlQXJyYXlcblxudmFyIGxvb2t1cCA9IFtdXG52YXIgcmV2TG9va3VwID0gW11cbnZhciBBcnIgPSB0eXBlb2YgVWludDhBcnJheSAhPT0gJ3VuZGVmaW5lZCcgPyBVaW50OEFycmF5IDogQXJyYXlcblxudmFyIGNvZGUgPSAnQUJDREVGR0hJSktMTU5PUFFSU1RVVldYWVphYmNkZWZnaGlqa2xtbm9wcXJzdHV2d3h5ejAxMjM0NTY3ODkrLydcbmZvciAodmFyIGkgPSAwLCBsZW4gPSBjb2RlLmxlbmd0aDsgaSA8IGxlbjsgKytpKSB7XG4gIGxvb2t1cFtpXSA9IGNvZGVbaV1cbiAgcmV2TG9va3VwW2NvZGUuY2hhckNvZGVBdChpKV0gPSBpXG59XG5cbi8vIFN1cHBvcnQgZGVjb2RpbmcgVVJMLXNhZmUgYmFzZTY0IHN0cmluZ3MsIGFzIE5vZGUuanMgZG9lcy5cbi8vIFNlZTogaHR0cHM6Ly9lbi53aWtpcGVkaWEub3JnL3dpa2kvQmFzZTY0I1VSTF9hcHBsaWNhdGlvbnNcbnJldkxvb2t1cFsnLScuY2hhckNvZGVBdCgwKV0gPSA2MlxucmV2TG9va3VwWydfJy5jaGFyQ29kZUF0KDApXSA9IDYzXG5cbmZ1bmN0aW9uIGdldExlbnMgKGI2NCkge1xuICB2YXIgbGVuID0gYjY0Lmxlbmd0aFxuXG4gIGlmIChsZW4gJSA0ID4gMCkge1xuICAgIHRocm93IG5ldyBFcnJvcignSW52YWxpZCBzdHJpbmcuIExlbmd0aCBtdXN0IGJlIGEgbXVsdGlwbGUgb2YgNCcpXG4gIH1cblxuICAvLyBUcmltIG9mZiBleHRyYSBieXRlcyBhZnRlciBwbGFjZWhvbGRlciBieXRlcyBhcmUgZm91bmRcbiAgLy8gU2VlOiBodHRwczovL2dpdGh1Yi5jb20vYmVhdGdhbW1pdC9iYXNlNjQtanMvaXNzdWVzLzQyXG4gIHZhciB2YWxpZExlbiA9IGI2NC5pbmRleE9mKCc9JylcbiAgaWYgKHZhbGlkTGVuID09PSAtMSkgdmFsaWRMZW4gPSBsZW5cblxuICB2YXIgcGxhY2VIb2xkZXJzTGVuID0gdmFsaWRMZW4gPT09IGxlblxuICAgID8gMFxuICAgIDogNCAtICh2YWxpZExlbiAlIDQpXG5cbiAgcmV0dXJuIFt2YWxpZExlbiwgcGxhY2VIb2xkZXJzTGVuXVxufVxuXG4vLyBiYXNlNjQgaXMgNC8zICsgdXAgdG8gdHdvIGNoYXJhY3RlcnMgb2YgdGhlIG9yaWdpbmFsIGRhdGFcbmZ1bmN0aW9uIGJ5dGVMZW5ndGggKGI2NCkge1xuICB2YXIgbGVucyA9IGdldExlbnMoYjY0KVxuICB2YXIgdmFsaWRMZW4gPSBsZW5zWzBdXG4gIHZhciBwbGFjZUhvbGRlcnNMZW4gPSBsZW5zWzFdXG4gIHJldHVybiAoKHZhbGlkTGVuICsgcGxhY2VIb2xkZXJzTGVuKSAqIDMgLyA0KSAtIHBsYWNlSG9sZGVyc0xlblxufVxuXG5mdW5jdGlvbiBfYnl0ZUxlbmd0aCAoYjY0LCB2YWxpZExlbiwgcGxhY2VIb2xkZXJzTGVuKSB7XG4gIHJldHVybiAoKHZhbGlkTGVuICsgcGxhY2VIb2xkZXJzTGVuKSAqIDMgLyA0KSAtIHBsYWNlSG9sZGVyc0xlblxufVxuXG5mdW5jdGlvbiB0b0J5dGVBcnJheSAoYjY0KSB7XG4gIHZhciB0bXBcbiAgdmFyIGxlbnMgPSBnZXRMZW5zKGI2NClcbiAgdmFyIHZhbGlkTGVuID0gbGVuc1swXVxuICB2YXIgcGxhY2VIb2xkZXJzTGVuID0gbGVuc1sxXVxuXG4gIHZhciBhcnIgPSBuZXcgQXJyKF9ieXRlTGVuZ3RoKGI2NCwgdmFsaWRMZW4sIHBsYWNlSG9sZGVyc0xlbikpXG5cbiAgdmFyIGN1ckJ5dGUgPSAwXG5cbiAgLy8gaWYgdGhlcmUgYXJlIHBsYWNlaG9sZGVycywgb25seSBnZXQgdXAgdG8gdGhlIGxhc3QgY29tcGxldGUgNCBjaGFyc1xuICB2YXIgbGVuID0gcGxhY2VIb2xkZXJzTGVuID4gMFxuICAgID8gdmFsaWRMZW4gLSA0XG4gICAgOiB2YWxpZExlblxuXG4gIHZhciBpXG4gIGZvciAoaSA9IDA7IGkgPCBsZW47IGkgKz0gNCkge1xuICAgIHRtcCA9XG4gICAgICAocmV2TG9va3VwW2I2NC5jaGFyQ29kZUF0KGkpXSA8PCAxOCkgfFxuICAgICAgKHJldkxvb2t1cFtiNjQuY2hhckNvZGVBdChpICsgMSldIDw8IDEyKSB8XG4gICAgICAocmV2TG9va3VwW2I2NC5jaGFyQ29kZUF0KGkgKyAyKV0gPDwgNikgfFxuICAgICAgcmV2TG9va3VwW2I2NC5jaGFyQ29kZUF0KGkgKyAzKV1cbiAgICBhcnJbY3VyQnl0ZSsrXSA9ICh0bXAgPj4gMTYpICYgMHhGRlxuICAgIGFycltjdXJCeXRlKytdID0gKHRtcCA+PiA4KSAmIDB4RkZcbiAgICBhcnJbY3VyQnl0ZSsrXSA9IHRtcCAmIDB4RkZcbiAgfVxuXG4gIGlmIChwbGFjZUhvbGRlcnNMZW4gPT09IDIpIHtcbiAgICB0bXAgPVxuICAgICAgKHJldkxvb2t1cFtiNjQuY2hhckNvZGVBdChpKV0gPDwgMikgfFxuICAgICAgKHJldkxvb2t1cFtiNjQuY2hhckNvZGVBdChpICsgMSldID4+IDQpXG4gICAgYXJyW2N1ckJ5dGUrK10gPSB0bXAgJiAweEZGXG4gIH1cblxuICBpZiAocGxhY2VIb2xkZXJzTGVuID09PSAxKSB7XG4gICAgdG1wID1cbiAgICAgIChyZXZMb29rdXBbYjY0LmNoYXJDb2RlQXQoaSldIDw8IDEwKSB8XG4gICAgICAocmV2TG9va3VwW2I2NC5jaGFyQ29kZUF0KGkgKyAxKV0gPDwgNCkgfFxuICAgICAgKHJldkxvb2t1cFtiNjQuY2hhckNvZGVBdChpICsgMildID4+IDIpXG4gICAgYXJyW2N1ckJ5dGUrK10gPSAodG1wID4+IDgpICYgMHhGRlxuICAgIGFycltjdXJCeXRlKytdID0gdG1wICYgMHhGRlxuICB9XG5cbiAgcmV0dXJuIGFyclxufVxuXG5mdW5jdGlvbiB0cmlwbGV0VG9CYXNlNjQgKG51bSkge1xuICByZXR1cm4gbG9va3VwW251bSA+PiAxOCAmIDB4M0ZdICtcbiAgICBsb29rdXBbbnVtID4+IDEyICYgMHgzRl0gK1xuICAgIGxvb2t1cFtudW0gPj4gNiAmIDB4M0ZdICtcbiAgICBsb29rdXBbbnVtICYgMHgzRl1cbn1cblxuZnVuY3Rpb24gZW5jb2RlQ2h1bmsgKHVpbnQ4LCBzdGFydCwgZW5kKSB7XG4gIHZhciB0bXBcbiAgdmFyIG91dHB1dCA9IFtdXG4gIGZvciAodmFyIGkgPSBzdGFydDsgaSA8IGVuZDsgaSArPSAzKSB7XG4gICAgdG1wID1cbiAgICAgICgodWludDhbaV0gPDwgMTYpICYgMHhGRjAwMDApICtcbiAgICAgICgodWludDhbaSArIDFdIDw8IDgpICYgMHhGRjAwKSArXG4gICAgICAodWludDhbaSArIDJdICYgMHhGRilcbiAgICBvdXRwdXQucHVzaCh0cmlwbGV0VG9CYXNlNjQodG1wKSlcbiAgfVxuICByZXR1cm4gb3V0cHV0LmpvaW4oJycpXG59XG5cbmZ1bmN0aW9uIGZyb21CeXRlQXJyYXkgKHVpbnQ4KSB7XG4gIHZhciB0bXBcbiAgdmFyIGxlbiA9IHVpbnQ4Lmxlbmd0aFxuICB2YXIgZXh0cmFCeXRlcyA9IGxlbiAlIDMgLy8gaWYgd2UgaGF2ZSAxIGJ5dGUgbGVmdCwgcGFkIDIgYnl0ZXNcbiAgdmFyIHBhcnRzID0gW11cbiAgdmFyIG1heENodW5rTGVuZ3RoID0gMTYzODMgLy8gbXVzdCBiZSBtdWx0aXBsZSBvZiAzXG5cbiAgLy8gZ28gdGhyb3VnaCB0aGUgYXJyYXkgZXZlcnkgdGhyZWUgYnl0ZXMsIHdlJ2xsIGRlYWwgd2l0aCB0cmFpbGluZyBzdHVmZiBsYXRlclxuICBmb3IgKHZhciBpID0gMCwgbGVuMiA9IGxlbiAtIGV4dHJhQnl0ZXM7IGkgPCBsZW4yOyBpICs9IG1heENodW5rTGVuZ3RoKSB7XG4gICAgcGFydHMucHVzaChlbmNvZGVDaHVuayh1aW50OCwgaSwgKGkgKyBtYXhDaHVua0xlbmd0aCkgPiBsZW4yID8gbGVuMiA6IChpICsgbWF4Q2h1bmtMZW5ndGgpKSlcbiAgfVxuXG4gIC8vIHBhZCB0aGUgZW5kIHdpdGggemVyb3MsIGJ1dCBtYWtlIHN1cmUgdG8gbm90IGZvcmdldCB0aGUgZXh0cmEgYnl0ZXNcbiAgaWYgKGV4dHJhQnl0ZXMgPT09IDEpIHtcbiAgICB0bXAgPSB1aW50OFtsZW4gLSAxXVxuICAgIHBhcnRzLnB1c2goXG4gICAgICBsb29rdXBbdG1wID4+IDJdICtcbiAgICAgIGxvb2t1cFsodG1wIDw8IDQpICYgMHgzRl0gK1xuICAgICAgJz09J1xuICAgIClcbiAgfSBlbHNlIGlmIChleHRyYUJ5dGVzID09PSAyKSB7XG4gICAgdG1wID0gKHVpbnQ4W2xlbiAtIDJdIDw8IDgpICsgdWludDhbbGVuIC0gMV1cbiAgICBwYXJ0cy5wdXNoKFxuICAgICAgbG9va3VwW3RtcCA+PiAxMF0gK1xuICAgICAgbG9va3VwWyh0bXAgPj4gNCkgJiAweDNGXSArXG4gICAgICBsb29rdXBbKHRtcCA8PCAyKSAmIDB4M0ZdICtcbiAgICAgICc9J1xuICAgIClcbiAgfVxuXG4gIHJldHVybiBwYXJ0cy5qb2luKCcnKVxufVxuIiwiLyoqXG4gKiBbanMtc2hhMjU2XXtAbGluayBodHRwczovL2dpdGh1Yi5jb20vZW1uMTc4L2pzLXNoYTI1Nn1cbiAqXG4gKiBAdmVyc2lvbiAwLjkuMFxuICogQGF1dGhvciBDaGVuLCBZaS1DeXVhbiBbZW1uMTc4QGdtYWlsLmNvbV1cbiAqIEBjb3B5cmlnaHQgQ2hlbiwgWWktQ3l1YW4gMjAxNC0yMDE3XG4gKiBAbGljZW5zZSBNSVRcbiAqL1xuLypqc2xpbnQgYml0d2lzZTogdHJ1ZSAqL1xuKGZ1bmN0aW9uICgpIHtcbiAgJ3VzZSBzdHJpY3QnO1xuXG4gIHZhciBFUlJPUiA9ICdpbnB1dCBpcyBpbnZhbGlkIHR5cGUnO1xuICB2YXIgV0lORE9XID0gdHlwZW9mIHdpbmRvdyA9PT0gJ29iamVjdCc7XG4gIHZhciByb290ID0gV0lORE9XID8gd2luZG93IDoge307XG4gIGlmIChyb290LkpTX1NIQTI1Nl9OT19XSU5ET1cpIHtcbiAgICBXSU5ET1cgPSBmYWxzZTtcbiAgfVxuICB2YXIgV0VCX1dPUktFUiA9ICFXSU5ET1cgJiYgdHlwZW9mIHNlbGYgPT09ICdvYmplY3QnO1xuICB2YXIgTk9ERV9KUyA9ICFyb290LkpTX1NIQTI1Nl9OT19OT0RFX0pTICYmIHR5cGVvZiBwcm9jZXNzID09PSAnb2JqZWN0JyAmJiBwcm9jZXNzLnZlcnNpb25zICYmIHByb2Nlc3MudmVyc2lvbnMubm9kZTtcbiAgaWYgKE5PREVfSlMpIHtcbiAgICByb290ID0gZ2xvYmFsO1xuICB9IGVsc2UgaWYgKFdFQl9XT1JLRVIpIHtcbiAgICByb290ID0gc2VsZjtcbiAgfVxuICB2YXIgQ09NTU9OX0pTID0gIXJvb3QuSlNfU0hBMjU2X05PX0NPTU1PTl9KUyAmJiB0eXBlb2YgbW9kdWxlID09PSAnb2JqZWN0JyAmJiBtb2R1bGUuZXhwb3J0cztcbiAgdmFyIEFNRCA9IHR5cGVvZiBkZWZpbmUgPT09ICdmdW5jdGlvbicgJiYgZGVmaW5lLmFtZDtcbiAgdmFyIEFSUkFZX0JVRkZFUiA9ICFyb290LkpTX1NIQTI1Nl9OT19BUlJBWV9CVUZGRVIgJiYgdHlwZW9mIEFycmF5QnVmZmVyICE9PSAndW5kZWZpbmVkJztcbiAgdmFyIEhFWF9DSEFSUyA9ICcwMTIzNDU2Nzg5YWJjZGVmJy5zcGxpdCgnJyk7XG4gIHZhciBFWFRSQSA9IFstMjE0NzQ4MzY0OCwgODM4ODYwOCwgMzI3NjgsIDEyOF07XG4gIHZhciBTSElGVCA9IFsyNCwgMTYsIDgsIDBdO1xuICB2YXIgSyA9IFtcbiAgICAweDQyOGEyZjk4LCAweDcxMzc0NDkxLCAweGI1YzBmYmNmLCAweGU5YjVkYmE1LCAweDM5NTZjMjViLCAweDU5ZjExMWYxLCAweDkyM2Y4MmE0LCAweGFiMWM1ZWQ1LFxuICAgIDB4ZDgwN2FhOTgsIDB4MTI4MzViMDEsIDB4MjQzMTg1YmUsIDB4NTUwYzdkYzMsIDB4NzJiZTVkNzQsIDB4ODBkZWIxZmUsIDB4OWJkYzA2YTcsIDB4YzE5YmYxNzQsXG4gICAgMHhlNDliNjljMSwgMHhlZmJlNDc4NiwgMHgwZmMxOWRjNiwgMHgyNDBjYTFjYywgMHgyZGU5MmM2ZiwgMHg0YTc0ODRhYSwgMHg1Y2IwYTlkYywgMHg3NmY5ODhkYSxcbiAgICAweDk4M2U1MTUyLCAweGE4MzFjNjZkLCAweGIwMDMyN2M4LCAweGJmNTk3ZmM3LCAweGM2ZTAwYmYzLCAweGQ1YTc5MTQ3LCAweDA2Y2E2MzUxLCAweDE0MjkyOTY3LFxuICAgIDB4MjdiNzBhODUsIDB4MmUxYjIxMzgsIDB4NGQyYzZkZmMsIDB4NTMzODBkMTMsIDB4NjUwYTczNTQsIDB4NzY2YTBhYmIsIDB4ODFjMmM5MmUsIDB4OTI3MjJjODUsXG4gICAgMHhhMmJmZThhMSwgMHhhODFhNjY0YiwgMHhjMjRiOGI3MCwgMHhjNzZjNTFhMywgMHhkMTkyZTgxOSwgMHhkNjk5MDYyNCwgMHhmNDBlMzU4NSwgMHgxMDZhYTA3MCxcbiAgICAweDE5YTRjMTE2LCAweDFlMzc2YzA4LCAweDI3NDg3NzRjLCAweDM0YjBiY2I1LCAweDM5MWMwY2IzLCAweDRlZDhhYTRhLCAweDViOWNjYTRmLCAweDY4MmU2ZmYzLFxuICAgIDB4NzQ4ZjgyZWUsIDB4NzhhNTYzNmYsIDB4ODRjODc4MTQsIDB4OGNjNzAyMDgsIDB4OTBiZWZmZmEsIDB4YTQ1MDZjZWIsIDB4YmVmOWEzZjcsIDB4YzY3MTc4ZjJcbiAgXTtcbiAgdmFyIE9VVFBVVF9UWVBFUyA9IFsnaGV4JywgJ2FycmF5JywgJ2RpZ2VzdCcsICdhcnJheUJ1ZmZlciddO1xuXG4gIHZhciBibG9ja3MgPSBbXTtcblxuICBpZiAocm9vdC5KU19TSEEyNTZfTk9fTk9ERV9KUyB8fCAhQXJyYXkuaXNBcnJheSkge1xuICAgIEFycmF5LmlzQXJyYXkgPSBmdW5jdGlvbiAob2JqKSB7XG4gICAgICByZXR1cm4gT2JqZWN0LnByb3RvdHlwZS50b1N0cmluZy5jYWxsKG9iaikgPT09ICdbb2JqZWN0IEFycmF5XSc7XG4gICAgfTtcbiAgfVxuXG4gIGlmIChBUlJBWV9CVUZGRVIgJiYgKHJvb3QuSlNfU0hBMjU2X05PX0FSUkFZX0JVRkZFUl9JU19WSUVXIHx8ICFBcnJheUJ1ZmZlci5pc1ZpZXcpKSB7XG4gICAgQXJyYXlCdWZmZXIuaXNWaWV3ID0gZnVuY3Rpb24gKG9iaikge1xuICAgICAgcmV0dXJuIHR5cGVvZiBvYmogPT09ICdvYmplY3QnICYmIG9iai5idWZmZXIgJiYgb2JqLmJ1ZmZlci5jb25zdHJ1Y3RvciA9PT0gQXJyYXlCdWZmZXI7XG4gICAgfTtcbiAgfVxuXG4gIHZhciBjcmVhdGVPdXRwdXRNZXRob2QgPSBmdW5jdGlvbiAob3V0cHV0VHlwZSwgaXMyMjQpIHtcbiAgICByZXR1cm4gZnVuY3Rpb24gKG1lc3NhZ2UpIHtcbiAgICAgIHJldHVybiBuZXcgU2hhMjU2KGlzMjI0LCB0cnVlKS51cGRhdGUobWVzc2FnZSlbb3V0cHV0VHlwZV0oKTtcbiAgICB9O1xuICB9O1xuXG4gIHZhciBjcmVhdGVNZXRob2QgPSBmdW5jdGlvbiAoaXMyMjQpIHtcbiAgICB2YXIgbWV0aG9kID0gY3JlYXRlT3V0cHV0TWV0aG9kKCdoZXgnLCBpczIyNCk7XG4gICAgaWYgKE5PREVfSlMpIHtcbiAgICAgIG1ldGhvZCA9IG5vZGVXcmFwKG1ldGhvZCwgaXMyMjQpO1xuICAgIH1cbiAgICBtZXRob2QuY3JlYXRlID0gZnVuY3Rpb24gKCkge1xuICAgICAgcmV0dXJuIG5ldyBTaGEyNTYoaXMyMjQpO1xuICAgIH07XG4gICAgbWV0aG9kLnVwZGF0ZSA9IGZ1bmN0aW9uIChtZXNzYWdlKSB7XG4gICAgICByZXR1cm4gbWV0aG9kLmNyZWF0ZSgpLnVwZGF0ZShtZXNzYWdlKTtcbiAgICB9O1xuICAgIGZvciAodmFyIGkgPSAwOyBpIDwgT1VUUFVUX1RZUEVTLmxlbmd0aDsgKytpKSB7XG4gICAgICB2YXIgdHlwZSA9IE9VVFBVVF9UWVBFU1tpXTtcbiAgICAgIG1ldGhvZFt0eXBlXSA9IGNyZWF0ZU91dHB1dE1ldGhvZCh0eXBlLCBpczIyNCk7XG4gICAgfVxuICAgIHJldHVybiBtZXRob2Q7XG4gIH07XG5cbiAgdmFyIG5vZGVXcmFwID0gZnVuY3Rpb24gKG1ldGhvZCwgaXMyMjQpIHtcbiAgICB2YXIgY3J5cHRvID0gZXZhbChcInJlcXVpcmUoJ2NyeXB0bycpXCIpO1xuICAgIHZhciBCdWZmZXIgPSBldmFsKFwicmVxdWlyZSgnYnVmZmVyJykuQnVmZmVyXCIpO1xuICAgIHZhciBhbGdvcml0aG0gPSBpczIyNCA/ICdzaGEyMjQnIDogJ3NoYTI1Nic7XG4gICAgdmFyIG5vZGVNZXRob2QgPSBmdW5jdGlvbiAobWVzc2FnZSkge1xuICAgICAgaWYgKHR5cGVvZiBtZXNzYWdlID09PSAnc3RyaW5nJykge1xuICAgICAgICByZXR1cm4gY3J5cHRvLmNyZWF0ZUhhc2goYWxnb3JpdGhtKS51cGRhdGUobWVzc2FnZSwgJ3V0ZjgnKS5kaWdlc3QoJ2hleCcpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgaWYgKG1lc3NhZ2UgPT09IG51bGwgfHwgbWVzc2FnZSA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgdGhyb3cgbmV3IEVycm9yKEVSUk9SKTtcbiAgICAgICAgfSBlbHNlIGlmIChtZXNzYWdlLmNvbnN0cnVjdG9yID09PSBBcnJheUJ1ZmZlcikge1xuICAgICAgICAgIG1lc3NhZ2UgPSBuZXcgVWludDhBcnJheShtZXNzYWdlKTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgICAgaWYgKEFycmF5LmlzQXJyYXkobWVzc2FnZSkgfHwgQXJyYXlCdWZmZXIuaXNWaWV3KG1lc3NhZ2UpIHx8XG4gICAgICAgIG1lc3NhZ2UuY29uc3RydWN0b3IgPT09IEJ1ZmZlcikge1xuICAgICAgICByZXR1cm4gY3J5cHRvLmNyZWF0ZUhhc2goYWxnb3JpdGhtKS51cGRhdGUobmV3IEJ1ZmZlcihtZXNzYWdlKSkuZGlnZXN0KCdoZXgnKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHJldHVybiBtZXRob2QobWVzc2FnZSk7XG4gICAgICB9XG4gICAgfTtcbiAgICByZXR1cm4gbm9kZU1ldGhvZDtcbiAgfTtcblxuICB2YXIgY3JlYXRlSG1hY091dHB1dE1ldGhvZCA9IGZ1bmN0aW9uIChvdXRwdXRUeXBlLCBpczIyNCkge1xuICAgIHJldHVybiBmdW5jdGlvbiAoa2V5LCBtZXNzYWdlKSB7XG4gICAgICByZXR1cm4gbmV3IEhtYWNTaGEyNTYoa2V5LCBpczIyNCwgdHJ1ZSkudXBkYXRlKG1lc3NhZ2UpW291dHB1dFR5cGVdKCk7XG4gICAgfTtcbiAgfTtcblxuICB2YXIgY3JlYXRlSG1hY01ldGhvZCA9IGZ1bmN0aW9uIChpczIyNCkge1xuICAgIHZhciBtZXRob2QgPSBjcmVhdGVIbWFjT3V0cHV0TWV0aG9kKCdoZXgnLCBpczIyNCk7XG4gICAgbWV0aG9kLmNyZWF0ZSA9IGZ1bmN0aW9uIChrZXkpIHtcbiAgICAgIHJldHVybiBuZXcgSG1hY1NoYTI1NihrZXksIGlzMjI0KTtcbiAgICB9O1xuICAgIG1ldGhvZC51cGRhdGUgPSBmdW5jdGlvbiAoa2V5LCBtZXNzYWdlKSB7XG4gICAgICByZXR1cm4gbWV0aG9kLmNyZWF0ZShrZXkpLnVwZGF0ZShtZXNzYWdlKTtcbiAgICB9O1xuICAgIGZvciAodmFyIGkgPSAwOyBpIDwgT1VUUFVUX1RZUEVTLmxlbmd0aDsgKytpKSB7XG4gICAgICB2YXIgdHlwZSA9IE9VVFBVVF9UWVBFU1tpXTtcbiAgICAgIG1ldGhvZFt0eXBlXSA9IGNyZWF0ZUhtYWNPdXRwdXRNZXRob2QodHlwZSwgaXMyMjQpO1xuICAgIH1cbiAgICByZXR1cm4gbWV0aG9kO1xuICB9O1xuXG4gIGZ1bmN0aW9uIFNoYTI1NihpczIyNCwgc2hhcmVkTWVtb3J5KSB7XG4gICAgaWYgKHNoYXJlZE1lbW9yeSkge1xuICAgICAgYmxvY2tzWzBdID0gYmxvY2tzWzE2XSA9IGJsb2Nrc1sxXSA9IGJsb2Nrc1syXSA9IGJsb2Nrc1szXSA9XG4gICAgICAgIGJsb2Nrc1s0XSA9IGJsb2Nrc1s1XSA9IGJsb2Nrc1s2XSA9IGJsb2Nrc1s3XSA9XG4gICAgICAgIGJsb2Nrc1s4XSA9IGJsb2Nrc1s5XSA9IGJsb2Nrc1sxMF0gPSBibG9ja3NbMTFdID1cbiAgICAgICAgYmxvY2tzWzEyXSA9IGJsb2Nrc1sxM10gPSBibG9ja3NbMTRdID0gYmxvY2tzWzE1XSA9IDA7XG4gICAgICB0aGlzLmJsb2NrcyA9IGJsb2NrcztcbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy5ibG9ja3MgPSBbMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMF07XG4gICAgfVxuXG4gICAgaWYgKGlzMjI0KSB7XG4gICAgICB0aGlzLmgwID0gMHhjMTA1OWVkODtcbiAgICAgIHRoaXMuaDEgPSAweDM2N2NkNTA3O1xuICAgICAgdGhpcy5oMiA9IDB4MzA3MGRkMTc7XG4gICAgICB0aGlzLmgzID0gMHhmNzBlNTkzOTtcbiAgICAgIHRoaXMuaDQgPSAweGZmYzAwYjMxO1xuICAgICAgdGhpcy5oNSA9IDB4Njg1ODE1MTE7XG4gICAgICB0aGlzLmg2ID0gMHg2NGY5OGZhNztcbiAgICAgIHRoaXMuaDcgPSAweGJlZmE0ZmE0O1xuICAgIH0gZWxzZSB7IC8vIDI1NlxuICAgICAgdGhpcy5oMCA9IDB4NmEwOWU2Njc7XG4gICAgICB0aGlzLmgxID0gMHhiYjY3YWU4NTtcbiAgICAgIHRoaXMuaDIgPSAweDNjNmVmMzcyO1xuICAgICAgdGhpcy5oMyA9IDB4YTU0ZmY1M2E7XG4gICAgICB0aGlzLmg0ID0gMHg1MTBlNTI3ZjtcbiAgICAgIHRoaXMuaDUgPSAweDliMDU2ODhjO1xuICAgICAgdGhpcy5oNiA9IDB4MWY4M2Q5YWI7XG4gICAgICB0aGlzLmg3ID0gMHg1YmUwY2QxOTtcbiAgICB9XG5cbiAgICB0aGlzLmJsb2NrID0gdGhpcy5zdGFydCA9IHRoaXMuYnl0ZXMgPSB0aGlzLmhCeXRlcyA9IDA7XG4gICAgdGhpcy5maW5hbGl6ZWQgPSB0aGlzLmhhc2hlZCA9IGZhbHNlO1xuICAgIHRoaXMuZmlyc3QgPSB0cnVlO1xuICAgIHRoaXMuaXMyMjQgPSBpczIyNDtcbiAgfVxuXG4gIFNoYTI1Ni5wcm90b3R5cGUudXBkYXRlID0gZnVuY3Rpb24gKG1lc3NhZ2UpIHtcbiAgICBpZiAodGhpcy5maW5hbGl6ZWQpIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG4gICAgdmFyIG5vdFN0cmluZywgdHlwZSA9IHR5cGVvZiBtZXNzYWdlO1xuICAgIGlmICh0eXBlICE9PSAnc3RyaW5nJykge1xuICAgICAgaWYgKHR5cGUgPT09ICdvYmplY3QnKSB7XG4gICAgICAgIGlmIChtZXNzYWdlID09PSBudWxsKSB7XG4gICAgICAgICAgdGhyb3cgbmV3IEVycm9yKEVSUk9SKTtcbiAgICAgICAgfSBlbHNlIGlmIChBUlJBWV9CVUZGRVIgJiYgbWVzc2FnZS5jb25zdHJ1Y3RvciA9PT0gQXJyYXlCdWZmZXIpIHtcbiAgICAgICAgICBtZXNzYWdlID0gbmV3IFVpbnQ4QXJyYXkobWVzc2FnZSk7XG4gICAgICAgIH0gZWxzZSBpZiAoIUFycmF5LmlzQXJyYXkobWVzc2FnZSkpIHtcbiAgICAgICAgICBpZiAoIUFSUkFZX0JVRkZFUiB8fCAhQXJyYXlCdWZmZXIuaXNWaWV3KG1lc3NhZ2UpKSB7XG4gICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoRVJST1IpO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfSBlbHNlIHtcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKEVSUk9SKTtcbiAgICAgIH1cbiAgICAgIG5vdFN0cmluZyA9IHRydWU7XG4gICAgfVxuICAgIHZhciBjb2RlLCBpbmRleCA9IDAsIGksIGxlbmd0aCA9IG1lc3NhZ2UubGVuZ3RoLCBibG9ja3MgPSB0aGlzLmJsb2NrcztcblxuICAgIHdoaWxlIChpbmRleCA8IGxlbmd0aCkge1xuICAgICAgaWYgKHRoaXMuaGFzaGVkKSB7XG4gICAgICAgIHRoaXMuaGFzaGVkID0gZmFsc2U7XG4gICAgICAgIGJsb2Nrc1swXSA9IHRoaXMuYmxvY2s7XG4gICAgICAgIGJsb2Nrc1sxNl0gPSBibG9ja3NbMV0gPSBibG9ja3NbMl0gPSBibG9ja3NbM10gPVxuICAgICAgICAgIGJsb2Nrc1s0XSA9IGJsb2Nrc1s1XSA9IGJsb2Nrc1s2XSA9IGJsb2Nrc1s3XSA9XG4gICAgICAgICAgYmxvY2tzWzhdID0gYmxvY2tzWzldID0gYmxvY2tzWzEwXSA9IGJsb2Nrc1sxMV0gPVxuICAgICAgICAgIGJsb2Nrc1sxMl0gPSBibG9ja3NbMTNdID0gYmxvY2tzWzE0XSA9IGJsb2Nrc1sxNV0gPSAwO1xuICAgICAgfVxuXG4gICAgICBpZiAobm90U3RyaW5nKSB7XG4gICAgICAgIGZvciAoaSA9IHRoaXMuc3RhcnQ7IGluZGV4IDwgbGVuZ3RoICYmIGkgPCA2NDsgKytpbmRleCkge1xuICAgICAgICAgIGJsb2Nrc1tpID4+IDJdIHw9IG1lc3NhZ2VbaW5kZXhdIDw8IFNISUZUW2krKyAmIDNdO1xuICAgICAgICB9XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBmb3IgKGkgPSB0aGlzLnN0YXJ0OyBpbmRleCA8IGxlbmd0aCAmJiBpIDwgNjQ7ICsraW5kZXgpIHtcbiAgICAgICAgICBjb2RlID0gbWVzc2FnZS5jaGFyQ29kZUF0KGluZGV4KTtcbiAgICAgICAgICBpZiAoY29kZSA8IDB4ODApIHtcbiAgICAgICAgICAgIGJsb2Nrc1tpID4+IDJdIHw9IGNvZGUgPDwgU0hJRlRbaSsrICYgM107XG4gICAgICAgICAgfSBlbHNlIGlmIChjb2RlIDwgMHg4MDApIHtcbiAgICAgICAgICAgIGJsb2Nrc1tpID4+IDJdIHw9ICgweGMwIHwgKGNvZGUgPj4gNikpIDw8IFNISUZUW2krKyAmIDNdO1xuICAgICAgICAgICAgYmxvY2tzW2kgPj4gMl0gfD0gKDB4ODAgfCAoY29kZSAmIDB4M2YpKSA8PCBTSElGVFtpKysgJiAzXTtcbiAgICAgICAgICB9IGVsc2UgaWYgKGNvZGUgPCAweGQ4MDAgfHwgY29kZSA+PSAweGUwMDApIHtcbiAgICAgICAgICAgIGJsb2Nrc1tpID4+IDJdIHw9ICgweGUwIHwgKGNvZGUgPj4gMTIpKSA8PCBTSElGVFtpKysgJiAzXTtcbiAgICAgICAgICAgIGJsb2Nrc1tpID4+IDJdIHw9ICgweDgwIHwgKChjb2RlID4+IDYpICYgMHgzZikpIDw8IFNISUZUW2krKyAmIDNdO1xuICAgICAgICAgICAgYmxvY2tzW2kgPj4gMl0gfD0gKDB4ODAgfCAoY29kZSAmIDB4M2YpKSA8PCBTSElGVFtpKysgJiAzXTtcbiAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgY29kZSA9IDB4MTAwMDAgKyAoKChjb2RlICYgMHgzZmYpIDw8IDEwKSB8IChtZXNzYWdlLmNoYXJDb2RlQXQoKytpbmRleCkgJiAweDNmZikpO1xuICAgICAgICAgICAgYmxvY2tzW2kgPj4gMl0gfD0gKDB4ZjAgfCAoY29kZSA+PiAxOCkpIDw8IFNISUZUW2krKyAmIDNdO1xuICAgICAgICAgICAgYmxvY2tzW2kgPj4gMl0gfD0gKDB4ODAgfCAoKGNvZGUgPj4gMTIpICYgMHgzZikpIDw8IFNISUZUW2krKyAmIDNdO1xuICAgICAgICAgICAgYmxvY2tzW2kgPj4gMl0gfD0gKDB4ODAgfCAoKGNvZGUgPj4gNikgJiAweDNmKSkgPDwgU0hJRlRbaSsrICYgM107XG4gICAgICAgICAgICBibG9ja3NbaSA+PiAyXSB8PSAoMHg4MCB8IChjb2RlICYgMHgzZikpIDw8IFNISUZUW2krKyAmIDNdO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfVxuXG4gICAgICB0aGlzLmxhc3RCeXRlSW5kZXggPSBpO1xuICAgICAgdGhpcy5ieXRlcyArPSBpIC0gdGhpcy5zdGFydDtcbiAgICAgIGlmIChpID49IDY0KSB7XG4gICAgICAgIHRoaXMuYmxvY2sgPSBibG9ja3NbMTZdO1xuICAgICAgICB0aGlzLnN0YXJ0ID0gaSAtIDY0O1xuICAgICAgICB0aGlzLmhhc2goKTtcbiAgICAgICAgdGhpcy5oYXNoZWQgPSB0cnVlO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgdGhpcy5zdGFydCA9IGk7XG4gICAgICB9XG4gICAgfVxuICAgIGlmICh0aGlzLmJ5dGVzID4gNDI5NDk2NzI5NSkge1xuICAgICAgdGhpcy5oQnl0ZXMgKz0gdGhpcy5ieXRlcyAvIDQyOTQ5NjcyOTYgPDwgMDtcbiAgICAgIHRoaXMuYnl0ZXMgPSB0aGlzLmJ5dGVzICUgNDI5NDk2NzI5NjtcbiAgICB9XG4gICAgcmV0dXJuIHRoaXM7XG4gIH07XG5cbiAgU2hhMjU2LnByb3RvdHlwZS5maW5hbGl6ZSA9IGZ1bmN0aW9uICgpIHtcbiAgICBpZiAodGhpcy5maW5hbGl6ZWQpIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG4gICAgdGhpcy5maW5hbGl6ZWQgPSB0cnVlO1xuICAgIHZhciBibG9ja3MgPSB0aGlzLmJsb2NrcywgaSA9IHRoaXMubGFzdEJ5dGVJbmRleDtcbiAgICBibG9ja3NbMTZdID0gdGhpcy5ibG9jaztcbiAgICBibG9ja3NbaSA+PiAyXSB8PSBFWFRSQVtpICYgM107XG4gICAgdGhpcy5ibG9jayA9IGJsb2Nrc1sxNl07XG4gICAgaWYgKGkgPj0gNTYpIHtcbiAgICAgIGlmICghdGhpcy5oYXNoZWQpIHtcbiAgICAgICAgdGhpcy5oYXNoKCk7XG4gICAgICB9XG4gICAgICBibG9ja3NbMF0gPSB0aGlzLmJsb2NrO1xuICAgICAgYmxvY2tzWzE2XSA9IGJsb2Nrc1sxXSA9IGJsb2Nrc1syXSA9IGJsb2Nrc1szXSA9XG4gICAgICAgIGJsb2Nrc1s0XSA9IGJsb2Nrc1s1XSA9IGJsb2Nrc1s2XSA9IGJsb2Nrc1s3XSA9XG4gICAgICAgIGJsb2Nrc1s4XSA9IGJsb2Nrc1s5XSA9IGJsb2Nrc1sxMF0gPSBibG9ja3NbMTFdID1cbiAgICAgICAgYmxvY2tzWzEyXSA9IGJsb2Nrc1sxM10gPSBibG9ja3NbMTRdID0gYmxvY2tzWzE1XSA9IDA7XG4gICAgfVxuICAgIGJsb2Nrc1sxNF0gPSB0aGlzLmhCeXRlcyA8PCAzIHwgdGhpcy5ieXRlcyA+Pj4gMjk7XG4gICAgYmxvY2tzWzE1XSA9IHRoaXMuYnl0ZXMgPDwgMztcbiAgICB0aGlzLmhhc2goKTtcbiAgfTtcblxuICBTaGEyNTYucHJvdG90eXBlLmhhc2ggPSBmdW5jdGlvbiAoKSB7XG4gICAgdmFyIGEgPSB0aGlzLmgwLCBiID0gdGhpcy5oMSwgYyA9IHRoaXMuaDIsIGQgPSB0aGlzLmgzLCBlID0gdGhpcy5oNCwgZiA9IHRoaXMuaDUsIGcgPSB0aGlzLmg2LFxuICAgICAgaCA9IHRoaXMuaDcsIGJsb2NrcyA9IHRoaXMuYmxvY2tzLCBqLCBzMCwgczEsIG1haiwgdDEsIHQyLCBjaCwgYWIsIGRhLCBjZCwgYmM7XG5cbiAgICBmb3IgKGogPSAxNjsgaiA8IDY0OyArK2opIHtcbiAgICAgIC8vIHJpZ2h0cm90YXRlXG4gICAgICB0MSA9IGJsb2Nrc1tqIC0gMTVdO1xuICAgICAgczAgPSAoKHQxID4+PiA3KSB8ICh0MSA8PCAyNSkpIF4gKCh0MSA+Pj4gMTgpIHwgKHQxIDw8IDE0KSkgXiAodDEgPj4+IDMpO1xuICAgICAgdDEgPSBibG9ja3NbaiAtIDJdO1xuICAgICAgczEgPSAoKHQxID4+PiAxNykgfCAodDEgPDwgMTUpKSBeICgodDEgPj4+IDE5KSB8ICh0MSA8PCAxMykpIF4gKHQxID4+PiAxMCk7XG4gICAgICBibG9ja3Nbal0gPSBibG9ja3NbaiAtIDE2XSArIHMwICsgYmxvY2tzW2ogLSA3XSArIHMxIDw8IDA7XG4gICAgfVxuXG4gICAgYmMgPSBiICYgYztcbiAgICBmb3IgKGogPSAwOyBqIDwgNjQ7IGogKz0gNCkge1xuICAgICAgaWYgKHRoaXMuZmlyc3QpIHtcbiAgICAgICAgaWYgKHRoaXMuaXMyMjQpIHtcbiAgICAgICAgICBhYiA9IDMwMDAzMjtcbiAgICAgICAgICB0MSA9IGJsb2Nrc1swXSAtIDE0MTMyNTc4MTk7XG4gICAgICAgICAgaCA9IHQxIC0gMTUwMDU0NTk5IDw8IDA7XG4gICAgICAgICAgZCA9IHQxICsgMjQxNzcwNzcgPDwgMDtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBhYiA9IDcwNDc1MTEwOTtcbiAgICAgICAgICB0MSA9IGJsb2Nrc1swXSAtIDIxMDI0NDI0ODtcbiAgICAgICAgICBoID0gdDEgLSAxNTIxNDg2NTM0IDw8IDA7XG4gICAgICAgICAgZCA9IHQxICsgMTQzNjk0NTY1IDw8IDA7XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5maXJzdCA9IGZhbHNlO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgczAgPSAoKGEgPj4+IDIpIHwgKGEgPDwgMzApKSBeICgoYSA+Pj4gMTMpIHwgKGEgPDwgMTkpKSBeICgoYSA+Pj4gMjIpIHwgKGEgPDwgMTApKTtcbiAgICAgICAgczEgPSAoKGUgPj4+IDYpIHwgKGUgPDwgMjYpKSBeICgoZSA+Pj4gMTEpIHwgKGUgPDwgMjEpKSBeICgoZSA+Pj4gMjUpIHwgKGUgPDwgNykpO1xuICAgICAgICBhYiA9IGEgJiBiO1xuICAgICAgICBtYWogPSBhYiBeIChhICYgYykgXiBiYztcbiAgICAgICAgY2ggPSAoZSAmIGYpIF4gKH5lICYgZyk7XG4gICAgICAgIHQxID0gaCArIHMxICsgY2ggKyBLW2pdICsgYmxvY2tzW2pdO1xuICAgICAgICB0MiA9IHMwICsgbWFqO1xuICAgICAgICBoID0gZCArIHQxIDw8IDA7XG4gICAgICAgIGQgPSB0MSArIHQyIDw8IDA7XG4gICAgICB9XG4gICAgICBzMCA9ICgoZCA+Pj4gMikgfCAoZCA8PCAzMCkpIF4gKChkID4+PiAxMykgfCAoZCA8PCAxOSkpIF4gKChkID4+PiAyMikgfCAoZCA8PCAxMCkpO1xuICAgICAgczEgPSAoKGggPj4+IDYpIHwgKGggPDwgMjYpKSBeICgoaCA+Pj4gMTEpIHwgKGggPDwgMjEpKSBeICgoaCA+Pj4gMjUpIHwgKGggPDwgNykpO1xuICAgICAgZGEgPSBkICYgYTtcbiAgICAgIG1haiA9IGRhIF4gKGQgJiBiKSBeIGFiO1xuICAgICAgY2ggPSAoaCAmIGUpIF4gKH5oICYgZik7XG4gICAgICB0MSA9IGcgKyBzMSArIGNoICsgS1tqICsgMV0gKyBibG9ja3NbaiArIDFdO1xuICAgICAgdDIgPSBzMCArIG1hajtcbiAgICAgIGcgPSBjICsgdDEgPDwgMDtcbiAgICAgIGMgPSB0MSArIHQyIDw8IDA7XG4gICAgICBzMCA9ICgoYyA+Pj4gMikgfCAoYyA8PCAzMCkpIF4gKChjID4+PiAxMykgfCAoYyA8PCAxOSkpIF4gKChjID4+PiAyMikgfCAoYyA8PCAxMCkpO1xuICAgICAgczEgPSAoKGcgPj4+IDYpIHwgKGcgPDwgMjYpKSBeICgoZyA+Pj4gMTEpIHwgKGcgPDwgMjEpKSBeICgoZyA+Pj4gMjUpIHwgKGcgPDwgNykpO1xuICAgICAgY2QgPSBjICYgZDtcbiAgICAgIG1haiA9IGNkIF4gKGMgJiBhKSBeIGRhO1xuICAgICAgY2ggPSAoZyAmIGgpIF4gKH5nICYgZSk7XG4gICAgICB0MSA9IGYgKyBzMSArIGNoICsgS1tqICsgMl0gKyBibG9ja3NbaiArIDJdO1xuICAgICAgdDIgPSBzMCArIG1hajtcbiAgICAgIGYgPSBiICsgdDEgPDwgMDtcbiAgICAgIGIgPSB0MSArIHQyIDw8IDA7XG4gICAgICBzMCA9ICgoYiA+Pj4gMikgfCAoYiA8PCAzMCkpIF4gKChiID4+PiAxMykgfCAoYiA8PCAxOSkpIF4gKChiID4+PiAyMikgfCAoYiA8PCAxMCkpO1xuICAgICAgczEgPSAoKGYgPj4+IDYpIHwgKGYgPDwgMjYpKSBeICgoZiA+Pj4gMTEpIHwgKGYgPDwgMjEpKSBeICgoZiA+Pj4gMjUpIHwgKGYgPDwgNykpO1xuICAgICAgYmMgPSBiICYgYztcbiAgICAgIG1haiA9IGJjIF4gKGIgJiBkKSBeIGNkO1xuICAgICAgY2ggPSAoZiAmIGcpIF4gKH5mICYgaCk7XG4gICAgICB0MSA9IGUgKyBzMSArIGNoICsgS1tqICsgM10gKyBibG9ja3NbaiArIDNdO1xuICAgICAgdDIgPSBzMCArIG1hajtcbiAgICAgIGUgPSBhICsgdDEgPDwgMDtcbiAgICAgIGEgPSB0MSArIHQyIDw8IDA7XG4gICAgfVxuXG4gICAgdGhpcy5oMCA9IHRoaXMuaDAgKyBhIDw8IDA7XG4gICAgdGhpcy5oMSA9IHRoaXMuaDEgKyBiIDw8IDA7XG4gICAgdGhpcy5oMiA9IHRoaXMuaDIgKyBjIDw8IDA7XG4gICAgdGhpcy5oMyA9IHRoaXMuaDMgKyBkIDw8IDA7XG4gICAgdGhpcy5oNCA9IHRoaXMuaDQgKyBlIDw8IDA7XG4gICAgdGhpcy5oNSA9IHRoaXMuaDUgKyBmIDw8IDA7XG4gICAgdGhpcy5oNiA9IHRoaXMuaDYgKyBnIDw8IDA7XG4gICAgdGhpcy5oNyA9IHRoaXMuaDcgKyBoIDw8IDA7XG4gIH07XG5cbiAgU2hhMjU2LnByb3RvdHlwZS5oZXggPSBmdW5jdGlvbiAoKSB7XG4gICAgdGhpcy5maW5hbGl6ZSgpO1xuXG4gICAgdmFyIGgwID0gdGhpcy5oMCwgaDEgPSB0aGlzLmgxLCBoMiA9IHRoaXMuaDIsIGgzID0gdGhpcy5oMywgaDQgPSB0aGlzLmg0LCBoNSA9IHRoaXMuaDUsXG4gICAgICBoNiA9IHRoaXMuaDYsIGg3ID0gdGhpcy5oNztcblxuICAgIHZhciBoZXggPSBIRVhfQ0hBUlNbKGgwID4+IDI4KSAmIDB4MEZdICsgSEVYX0NIQVJTWyhoMCA+PiAyNCkgJiAweDBGXSArXG4gICAgICBIRVhfQ0hBUlNbKGgwID4+IDIwKSAmIDB4MEZdICsgSEVYX0NIQVJTWyhoMCA+PiAxNikgJiAweDBGXSArXG4gICAgICBIRVhfQ0hBUlNbKGgwID4+IDEyKSAmIDB4MEZdICsgSEVYX0NIQVJTWyhoMCA+PiA4KSAmIDB4MEZdICtcbiAgICAgIEhFWF9DSEFSU1soaDAgPj4gNCkgJiAweDBGXSArIEhFWF9DSEFSU1toMCAmIDB4MEZdICtcbiAgICAgIEhFWF9DSEFSU1soaDEgPj4gMjgpICYgMHgwRl0gKyBIRVhfQ0hBUlNbKGgxID4+IDI0KSAmIDB4MEZdICtcbiAgICAgIEhFWF9DSEFSU1soaDEgPj4gMjApICYgMHgwRl0gKyBIRVhfQ0hBUlNbKGgxID4+IDE2KSAmIDB4MEZdICtcbiAgICAgIEhFWF9DSEFSU1soaDEgPj4gMTIpICYgMHgwRl0gKyBIRVhfQ0hBUlNbKGgxID4+IDgpICYgMHgwRl0gK1xuICAgICAgSEVYX0NIQVJTWyhoMSA+PiA0KSAmIDB4MEZdICsgSEVYX0NIQVJTW2gxICYgMHgwRl0gK1xuICAgICAgSEVYX0NIQVJTWyhoMiA+PiAyOCkgJiAweDBGXSArIEhFWF9DSEFSU1soaDIgPj4gMjQpICYgMHgwRl0gK1xuICAgICAgSEVYX0NIQVJTWyhoMiA+PiAyMCkgJiAweDBGXSArIEhFWF9DSEFSU1soaDIgPj4gMTYpICYgMHgwRl0gK1xuICAgICAgSEVYX0NIQVJTWyhoMiA+PiAxMikgJiAweDBGXSArIEhFWF9DSEFSU1soaDIgPj4gOCkgJiAweDBGXSArXG4gICAgICBIRVhfQ0hBUlNbKGgyID4+IDQpICYgMHgwRl0gKyBIRVhfQ0hBUlNbaDIgJiAweDBGXSArXG4gICAgICBIRVhfQ0hBUlNbKGgzID4+IDI4KSAmIDB4MEZdICsgSEVYX0NIQVJTWyhoMyA+PiAyNCkgJiAweDBGXSArXG4gICAgICBIRVhfQ0hBUlNbKGgzID4+IDIwKSAmIDB4MEZdICsgSEVYX0NIQVJTWyhoMyA+PiAxNikgJiAweDBGXSArXG4gICAgICBIRVhfQ0hBUlNbKGgzID4+IDEyKSAmIDB4MEZdICsgSEVYX0NIQVJTWyhoMyA+PiA4KSAmIDB4MEZdICtcbiAgICAgIEhFWF9DSEFSU1soaDMgPj4gNCkgJiAweDBGXSArIEhFWF9DSEFSU1toMyAmIDB4MEZdICtcbiAgICAgIEhFWF9DSEFSU1soaDQgPj4gMjgpICYgMHgwRl0gKyBIRVhfQ0hBUlNbKGg0ID4+IDI0KSAmIDB4MEZdICtcbiAgICAgIEhFWF9DSEFSU1soaDQgPj4gMjApICYgMHgwRl0gKyBIRVhfQ0hBUlNbKGg0ID4+IDE2KSAmIDB4MEZdICtcbiAgICAgIEhFWF9DSEFSU1soaDQgPj4gMTIpICYgMHgwRl0gKyBIRVhfQ0hBUlNbKGg0ID4+IDgpICYgMHgwRl0gK1xuICAgICAgSEVYX0NIQVJTWyhoNCA+PiA0KSAmIDB4MEZdICsgSEVYX0NIQVJTW2g0ICYgMHgwRl0gK1xuICAgICAgSEVYX0NIQVJTWyhoNSA+PiAyOCkgJiAweDBGXSArIEhFWF9DSEFSU1soaDUgPj4gMjQpICYgMHgwRl0gK1xuICAgICAgSEVYX0NIQVJTWyhoNSA+PiAyMCkgJiAweDBGXSArIEhFWF9DSEFSU1soaDUgPj4gMTYpICYgMHgwRl0gK1xuICAgICAgSEVYX0NIQVJTWyhoNSA+PiAxMikgJiAweDBGXSArIEhFWF9DSEFSU1soaDUgPj4gOCkgJiAweDBGXSArXG4gICAgICBIRVhfQ0hBUlNbKGg1ID4+IDQpICYgMHgwRl0gKyBIRVhfQ0hBUlNbaDUgJiAweDBGXSArXG4gICAgICBIRVhfQ0hBUlNbKGg2ID4+IDI4KSAmIDB4MEZdICsgSEVYX0NIQVJTWyhoNiA+PiAyNCkgJiAweDBGXSArXG4gICAgICBIRVhfQ0hBUlNbKGg2ID4+IDIwKSAmIDB4MEZdICsgSEVYX0NIQVJTWyhoNiA+PiAxNikgJiAweDBGXSArXG4gICAgICBIRVhfQ0hBUlNbKGg2ID4+IDEyKSAmIDB4MEZdICsgSEVYX0NIQVJTWyhoNiA+PiA4KSAmIDB4MEZdICtcbiAgICAgIEhFWF9DSEFSU1soaDYgPj4gNCkgJiAweDBGXSArIEhFWF9DSEFSU1toNiAmIDB4MEZdO1xuICAgIGlmICghdGhpcy5pczIyNCkge1xuICAgICAgaGV4ICs9IEhFWF9DSEFSU1soaDcgPj4gMjgpICYgMHgwRl0gKyBIRVhfQ0hBUlNbKGg3ID4+IDI0KSAmIDB4MEZdICtcbiAgICAgICAgSEVYX0NIQVJTWyhoNyA+PiAyMCkgJiAweDBGXSArIEhFWF9DSEFSU1soaDcgPj4gMTYpICYgMHgwRl0gK1xuICAgICAgICBIRVhfQ0hBUlNbKGg3ID4+IDEyKSAmIDB4MEZdICsgSEVYX0NIQVJTWyhoNyA+PiA4KSAmIDB4MEZdICtcbiAgICAgICAgSEVYX0NIQVJTWyhoNyA+PiA0KSAmIDB4MEZdICsgSEVYX0NIQVJTW2g3ICYgMHgwRl07XG4gICAgfVxuICAgIHJldHVybiBoZXg7XG4gIH07XG5cbiAgU2hhMjU2LnByb3RvdHlwZS50b1N0cmluZyA9IFNoYTI1Ni5wcm90b3R5cGUuaGV4O1xuXG4gIFNoYTI1Ni5wcm90b3R5cGUuZGlnZXN0ID0gZnVuY3Rpb24gKCkge1xuICAgIHRoaXMuZmluYWxpemUoKTtcblxuICAgIHZhciBoMCA9IHRoaXMuaDAsIGgxID0gdGhpcy5oMSwgaDIgPSB0aGlzLmgyLCBoMyA9IHRoaXMuaDMsIGg0ID0gdGhpcy5oNCwgaDUgPSB0aGlzLmg1LFxuICAgICAgaDYgPSB0aGlzLmg2LCBoNyA9IHRoaXMuaDc7XG5cbiAgICB2YXIgYXJyID0gW1xuICAgICAgKGgwID4+IDI0KSAmIDB4RkYsIChoMCA+PiAxNikgJiAweEZGLCAoaDAgPj4gOCkgJiAweEZGLCBoMCAmIDB4RkYsXG4gICAgICAoaDEgPj4gMjQpICYgMHhGRiwgKGgxID4+IDE2KSAmIDB4RkYsIChoMSA+PiA4KSAmIDB4RkYsIGgxICYgMHhGRixcbiAgICAgIChoMiA+PiAyNCkgJiAweEZGLCAoaDIgPj4gMTYpICYgMHhGRiwgKGgyID4+IDgpICYgMHhGRiwgaDIgJiAweEZGLFxuICAgICAgKGgzID4+IDI0KSAmIDB4RkYsIChoMyA+PiAxNikgJiAweEZGLCAoaDMgPj4gOCkgJiAweEZGLCBoMyAmIDB4RkYsXG4gICAgICAoaDQgPj4gMjQpICYgMHhGRiwgKGg0ID4+IDE2KSAmIDB4RkYsIChoNCA+PiA4KSAmIDB4RkYsIGg0ICYgMHhGRixcbiAgICAgIChoNSA+PiAyNCkgJiAweEZGLCAoaDUgPj4gMTYpICYgMHhGRiwgKGg1ID4+IDgpICYgMHhGRiwgaDUgJiAweEZGLFxuICAgICAgKGg2ID4+IDI0KSAmIDB4RkYsIChoNiA+PiAxNikgJiAweEZGLCAoaDYgPj4gOCkgJiAweEZGLCBoNiAmIDB4RkZcbiAgICBdO1xuICAgIGlmICghdGhpcy5pczIyNCkge1xuICAgICAgYXJyLnB1c2goKGg3ID4+IDI0KSAmIDB4RkYsIChoNyA+PiAxNikgJiAweEZGLCAoaDcgPj4gOCkgJiAweEZGLCBoNyAmIDB4RkYpO1xuICAgIH1cbiAgICByZXR1cm4gYXJyO1xuICB9O1xuXG4gIFNoYTI1Ni5wcm90b3R5cGUuYXJyYXkgPSBTaGEyNTYucHJvdG90eXBlLmRpZ2VzdDtcblxuICBTaGEyNTYucHJvdG90eXBlLmFycmF5QnVmZmVyID0gZnVuY3Rpb24gKCkge1xuICAgIHRoaXMuZmluYWxpemUoKTtcblxuICAgIHZhciBidWZmZXIgPSBuZXcgQXJyYXlCdWZmZXIodGhpcy5pczIyNCA/IDI4IDogMzIpO1xuICAgIHZhciBkYXRhVmlldyA9IG5ldyBEYXRhVmlldyhidWZmZXIpO1xuICAgIGRhdGFWaWV3LnNldFVpbnQzMigwLCB0aGlzLmgwKTtcbiAgICBkYXRhVmlldy5zZXRVaW50MzIoNCwgdGhpcy5oMSk7XG4gICAgZGF0YVZpZXcuc2V0VWludDMyKDgsIHRoaXMuaDIpO1xuICAgIGRhdGFWaWV3LnNldFVpbnQzMigxMiwgdGhpcy5oMyk7XG4gICAgZGF0YVZpZXcuc2V0VWludDMyKDE2LCB0aGlzLmg0KTtcbiAgICBkYXRhVmlldy5zZXRVaW50MzIoMjAsIHRoaXMuaDUpO1xuICAgIGRhdGFWaWV3LnNldFVpbnQzMigyNCwgdGhpcy5oNik7XG4gICAgaWYgKCF0aGlzLmlzMjI0KSB7XG4gICAgICBkYXRhVmlldy5zZXRVaW50MzIoMjgsIHRoaXMuaDcpO1xuICAgIH1cbiAgICByZXR1cm4gYnVmZmVyO1xuICB9O1xuXG4gIGZ1bmN0aW9uIEhtYWNTaGEyNTYoa2V5LCBpczIyNCwgc2hhcmVkTWVtb3J5KSB7XG4gICAgdmFyIGksIHR5cGUgPSB0eXBlb2Yga2V5O1xuICAgIGlmICh0eXBlID09PSAnc3RyaW5nJykge1xuICAgICAgdmFyIGJ5dGVzID0gW10sIGxlbmd0aCA9IGtleS5sZW5ndGgsIGluZGV4ID0gMCwgY29kZTtcbiAgICAgIGZvciAoaSA9IDA7IGkgPCBsZW5ndGg7ICsraSkge1xuICAgICAgICBjb2RlID0ga2V5LmNoYXJDb2RlQXQoaSk7XG4gICAgICAgIGlmIChjb2RlIDwgMHg4MCkge1xuICAgICAgICAgIGJ5dGVzW2luZGV4KytdID0gY29kZTtcbiAgICAgICAgfSBlbHNlIGlmIChjb2RlIDwgMHg4MDApIHtcbiAgICAgICAgICBieXRlc1tpbmRleCsrXSA9ICgweGMwIHwgKGNvZGUgPj4gNikpO1xuICAgICAgICAgIGJ5dGVzW2luZGV4KytdID0gKDB4ODAgfCAoY29kZSAmIDB4M2YpKTtcbiAgICAgICAgfSBlbHNlIGlmIChjb2RlIDwgMHhkODAwIHx8IGNvZGUgPj0gMHhlMDAwKSB7XG4gICAgICAgICAgYnl0ZXNbaW5kZXgrK10gPSAoMHhlMCB8IChjb2RlID4+IDEyKSk7XG4gICAgICAgICAgYnl0ZXNbaW5kZXgrK10gPSAoMHg4MCB8ICgoY29kZSA+PiA2KSAmIDB4M2YpKTtcbiAgICAgICAgICBieXRlc1tpbmRleCsrXSA9ICgweDgwIHwgKGNvZGUgJiAweDNmKSk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgY29kZSA9IDB4MTAwMDAgKyAoKChjb2RlICYgMHgzZmYpIDw8IDEwKSB8IChrZXkuY2hhckNvZGVBdCgrK2kpICYgMHgzZmYpKTtcbiAgICAgICAgICBieXRlc1tpbmRleCsrXSA9ICgweGYwIHwgKGNvZGUgPj4gMTgpKTtcbiAgICAgICAgICBieXRlc1tpbmRleCsrXSA9ICgweDgwIHwgKChjb2RlID4+IDEyKSAmIDB4M2YpKTtcbiAgICAgICAgICBieXRlc1tpbmRleCsrXSA9ICgweDgwIHwgKChjb2RlID4+IDYpICYgMHgzZikpO1xuICAgICAgICAgIGJ5dGVzW2luZGV4KytdID0gKDB4ODAgfCAoY29kZSAmIDB4M2YpKTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgICAga2V5ID0gYnl0ZXM7XG4gICAgfSBlbHNlIHtcbiAgICAgIGlmICh0eXBlID09PSAnb2JqZWN0Jykge1xuICAgICAgICBpZiAoa2V5ID09PSBudWxsKSB7XG4gICAgICAgICAgdGhyb3cgbmV3IEVycm9yKEVSUk9SKTtcbiAgICAgICAgfSBlbHNlIGlmIChBUlJBWV9CVUZGRVIgJiYga2V5LmNvbnN0cnVjdG9yID09PSBBcnJheUJ1ZmZlcikge1xuICAgICAgICAgIGtleSA9IG5ldyBVaW50OEFycmF5KGtleSk7XG4gICAgICAgIH0gZWxzZSBpZiAoIUFycmF5LmlzQXJyYXkoa2V5KSkge1xuICAgICAgICAgIGlmICghQVJSQVlfQlVGRkVSIHx8ICFBcnJheUJ1ZmZlci5pc1ZpZXcoa2V5KSkge1xuICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKEVSUk9SKTtcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHRocm93IG5ldyBFcnJvcihFUlJPUik7XG4gICAgICB9XG4gICAgfVxuXG4gICAgaWYgKGtleS5sZW5ndGggPiA2NCkge1xuICAgICAga2V5ID0gKG5ldyBTaGEyNTYoaXMyMjQsIHRydWUpKS51cGRhdGUoa2V5KS5hcnJheSgpO1xuICAgIH1cblxuICAgIHZhciBvS2V5UGFkID0gW10sIGlLZXlQYWQgPSBbXTtcbiAgICBmb3IgKGkgPSAwOyBpIDwgNjQ7ICsraSkge1xuICAgICAgdmFyIGIgPSBrZXlbaV0gfHwgMDtcbiAgICAgIG9LZXlQYWRbaV0gPSAweDVjIF4gYjtcbiAgICAgIGlLZXlQYWRbaV0gPSAweDM2IF4gYjtcbiAgICB9XG5cbiAgICBTaGEyNTYuY2FsbCh0aGlzLCBpczIyNCwgc2hhcmVkTWVtb3J5KTtcblxuICAgIHRoaXMudXBkYXRlKGlLZXlQYWQpO1xuICAgIHRoaXMub0tleVBhZCA9IG9LZXlQYWQ7XG4gICAgdGhpcy5pbm5lciA9IHRydWU7XG4gICAgdGhpcy5zaGFyZWRNZW1vcnkgPSBzaGFyZWRNZW1vcnk7XG4gIH1cbiAgSG1hY1NoYTI1Ni5wcm90b3R5cGUgPSBuZXcgU2hhMjU2KCk7XG5cbiAgSG1hY1NoYTI1Ni5wcm90b3R5cGUuZmluYWxpemUgPSBmdW5jdGlvbiAoKSB7XG4gICAgU2hhMjU2LnByb3RvdHlwZS5maW5hbGl6ZS5jYWxsKHRoaXMpO1xuICAgIGlmICh0aGlzLmlubmVyKSB7XG4gICAgICB0aGlzLmlubmVyID0gZmFsc2U7XG4gICAgICB2YXIgaW5uZXJIYXNoID0gdGhpcy5hcnJheSgpO1xuICAgICAgU2hhMjU2LmNhbGwodGhpcywgdGhpcy5pczIyNCwgdGhpcy5zaGFyZWRNZW1vcnkpO1xuICAgICAgdGhpcy51cGRhdGUodGhpcy5vS2V5UGFkKTtcbiAgICAgIHRoaXMudXBkYXRlKGlubmVySGFzaCk7XG4gICAgICBTaGEyNTYucHJvdG90eXBlLmZpbmFsaXplLmNhbGwodGhpcyk7XG4gICAgfVxuICB9O1xuXG4gIHZhciBleHBvcnRzID0gY3JlYXRlTWV0aG9kKCk7XG4gIGV4cG9ydHMuc2hhMjU2ID0gZXhwb3J0cztcbiAgZXhwb3J0cy5zaGEyMjQgPSBjcmVhdGVNZXRob2QodHJ1ZSk7XG4gIGV4cG9ydHMuc2hhMjU2LmhtYWMgPSBjcmVhdGVIbWFjTWV0aG9kKCk7XG4gIGV4cG9ydHMuc2hhMjI0LmhtYWMgPSBjcmVhdGVIbWFjTWV0aG9kKHRydWUpO1xuXG4gIGlmIChDT01NT05fSlMpIHtcbiAgICBtb2R1bGUuZXhwb3J0cyA9IGV4cG9ydHM7XG4gIH0gZWxzZSB7XG4gICAgcm9vdC5zaGEyNTYgPSBleHBvcnRzLnNoYTI1NjtcbiAgICByb290LnNoYTIyNCA9IGV4cG9ydHMuc2hhMjI0O1xuICAgIGlmIChBTUQpIHtcbiAgICAgIGRlZmluZShmdW5jdGlvbiAoKSB7XG4gICAgICAgIHJldHVybiBleHBvcnRzO1xuICAgICAgfSk7XG4gICAgfVxuICB9XG59KSgpO1xuIiwiZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gX2NsYXNzQ2FsbENoZWNrKGluc3RhbmNlLCBDb25zdHJ1Y3Rvcikge1xuICBpZiAoIShpbnN0YW5jZSBpbnN0YW5jZW9mIENvbnN0cnVjdG9yKSkge1xuICAgIHRocm93IG5ldyBUeXBlRXJyb3IoXCJDYW5ub3QgY2FsbCBhIGNsYXNzIGFzIGEgZnVuY3Rpb25cIik7XG4gIH1cbn0iLCJpbXBvcnQgdG9Qcm9wZXJ0eUtleSBmcm9tIFwiLi90b1Byb3BlcnR5S2V5LmpzXCI7XG5mdW5jdGlvbiBfZGVmaW5lUHJvcGVydGllcyh0YXJnZXQsIHByb3BzKSB7XG4gIGZvciAodmFyIGkgPSAwOyBpIDwgcHJvcHMubGVuZ3RoOyBpKyspIHtcbiAgICB2YXIgZGVzY3JpcHRvciA9IHByb3BzW2ldO1xuICAgIGRlc2NyaXB0b3IuZW51bWVyYWJsZSA9IGRlc2NyaXB0b3IuZW51bWVyYWJsZSB8fCBmYWxzZTtcbiAgICBkZXNjcmlwdG9yLmNvbmZpZ3VyYWJsZSA9IHRydWU7XG4gICAgaWYgKFwidmFsdWVcIiBpbiBkZXNjcmlwdG9yKSBkZXNjcmlwdG9yLndyaXRhYmxlID0gdHJ1ZTtcbiAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkodGFyZ2V0LCB0b1Byb3BlcnR5S2V5KGRlc2NyaXB0b3Iua2V5KSwgZGVzY3JpcHRvcik7XG4gIH1cbn1cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIF9jcmVhdGVDbGFzcyhDb25zdHJ1Y3RvciwgcHJvdG9Qcm9wcywgc3RhdGljUHJvcHMpIHtcbiAgaWYgKHByb3RvUHJvcHMpIF9kZWZpbmVQcm9wZXJ0aWVzKENvbnN0cnVjdG9yLnByb3RvdHlwZSwgcHJvdG9Qcm9wcyk7XG4gIGlmIChzdGF0aWNQcm9wcykgX2RlZmluZVByb3BlcnRpZXMoQ29uc3RydWN0b3IsIHN0YXRpY1Byb3BzKTtcbiAgT2JqZWN0LmRlZmluZVByb3BlcnR5KENvbnN0cnVjdG9yLCBcInByb3RvdHlwZVwiLCB7XG4gICAgd3JpdGFibGU6IGZhbHNlXG4gIH0pO1xuICByZXR1cm4gQ29uc3RydWN0b3I7XG59IiwiaW1wb3J0IHRvUHJvcGVydHlLZXkgZnJvbSBcIi4vdG9Qcm9wZXJ0eUtleS5qc1wiO1xuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gX2RlZmluZVByb3BlcnR5KG9iaiwga2V5LCB2YWx1ZSkge1xuICBrZXkgPSB0b1Byb3BlcnR5S2V5KGtleSk7XG4gIGlmIChrZXkgaW4gb2JqKSB7XG4gICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KG9iaiwga2V5LCB7XG4gICAgICB2YWx1ZTogdmFsdWUsXG4gICAgICBlbnVtZXJhYmxlOiB0cnVlLFxuICAgICAgY29uZmlndXJhYmxlOiB0cnVlLFxuICAgICAgd3JpdGFibGU6IHRydWVcbiAgICB9KTtcbiAgfSBlbHNlIHtcbiAgICBvYmpba2V5XSA9IHZhbHVlO1xuICB9XG4gIHJldHVybiBvYmo7XG59IiwiaW1wb3J0IF90eXBlb2YgZnJvbSBcIi4vdHlwZW9mLmpzXCI7XG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBfdG9QcmltaXRpdmUoaW5wdXQsIGhpbnQpIHtcbiAgaWYgKF90eXBlb2YoaW5wdXQpICE9PSBcIm9iamVjdFwiIHx8IGlucHV0ID09PSBudWxsKSByZXR1cm4gaW5wdXQ7XG4gIHZhciBwcmltID0gaW5wdXRbU3ltYm9sLnRvUHJpbWl0aXZlXTtcbiAgaWYgKHByaW0gIT09IHVuZGVmaW5lZCkge1xuICAgIHZhciByZXMgPSBwcmltLmNhbGwoaW5wdXQsIGhpbnQgfHwgXCJkZWZhdWx0XCIpO1xuICAgIGlmIChfdHlwZW9mKHJlcykgIT09IFwib2JqZWN0XCIpIHJldHVybiByZXM7XG4gICAgdGhyb3cgbmV3IFR5cGVFcnJvcihcIkBAdG9QcmltaXRpdmUgbXVzdCByZXR1cm4gYSBwcmltaXRpdmUgdmFsdWUuXCIpO1xuICB9XG4gIHJldHVybiAoaGludCA9PT0gXCJzdHJpbmdcIiA/IFN0cmluZyA6IE51bWJlcikoaW5wdXQpO1xufSIsImltcG9ydCBfdHlwZW9mIGZyb20gXCIuL3R5cGVvZi5qc1wiO1xuaW1wb3J0IHRvUHJpbWl0aXZlIGZyb20gXCIuL3RvUHJpbWl0aXZlLmpzXCI7XG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBfdG9Qcm9wZXJ0eUtleShhcmcpIHtcbiAgdmFyIGtleSA9IHRvUHJpbWl0aXZlKGFyZywgXCJzdHJpbmdcIik7XG4gIHJldHVybiBfdHlwZW9mKGtleSkgPT09IFwic3ltYm9sXCIgPyBrZXkgOiBTdHJpbmcoa2V5KTtcbn0iLCJleHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBfdHlwZW9mKG9iaikge1xuICBcIkBiYWJlbC9oZWxwZXJzIC0gdHlwZW9mXCI7XG5cbiAgcmV0dXJuIF90eXBlb2YgPSBcImZ1bmN0aW9uXCIgPT0gdHlwZW9mIFN5bWJvbCAmJiBcInN5bWJvbFwiID09IHR5cGVvZiBTeW1ib2wuaXRlcmF0b3IgPyBmdW5jdGlvbiAob2JqKSB7XG4gICAgcmV0dXJuIHR5cGVvZiBvYmo7XG4gIH0gOiBmdW5jdGlvbiAob2JqKSB7XG4gICAgcmV0dXJuIG9iaiAmJiBcImZ1bmN0aW9uXCIgPT0gdHlwZW9mIFN5bWJvbCAmJiBvYmouY29uc3RydWN0b3IgPT09IFN5bWJvbCAmJiBvYmogIT09IFN5bWJvbC5wcm90b3R5cGUgPyBcInN5bWJvbFwiIDogdHlwZW9mIG9iajtcbiAgfSwgX3R5cGVvZihvYmopO1xufSIsIi8vIFRoZSBtb2R1bGUgY2FjaGVcbnZhciBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX18gPSB7fTtcblxuLy8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbmZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG5cdHZhciBjYWNoZWRNb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdO1xuXHRpZiAoY2FjaGVkTW9kdWxlICE9PSB1bmRlZmluZWQpIHtcblx0XHRyZXR1cm4gY2FjaGVkTW9kdWxlLmV4cG9ydHM7XG5cdH1cblx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcblx0dmFyIG1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF0gPSB7XG5cdFx0Ly8gbm8gbW9kdWxlLmlkIG5lZWRlZFxuXHRcdC8vIG5vIG1vZHVsZS5sb2FkZWQgbmVlZGVkXG5cdFx0ZXhwb3J0czoge31cblx0fTtcblxuXHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cblx0X193ZWJwYWNrX21vZHVsZXNfX1ttb2R1bGVJZF0obW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cblx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcblx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xufVxuXG4iLCJfX3dlYnBhY2tfcmVxdWlyZV9fLmFtZE8gPSB7fTsiLCIvLyBnZXREZWZhdWx0RXhwb3J0IGZ1bmN0aW9uIGZvciBjb21wYXRpYmlsaXR5IHdpdGggbm9uLWhhcm1vbnkgbW9kdWxlc1xuX193ZWJwYWNrX3JlcXVpcmVfXy5uID0gKG1vZHVsZSkgPT4ge1xuXHR2YXIgZ2V0dGVyID0gbW9kdWxlICYmIG1vZHVsZS5fX2VzTW9kdWxlID9cblx0XHQoKSA9PiAobW9kdWxlWydkZWZhdWx0J10pIDpcblx0XHQoKSA9PiAobW9kdWxlKTtcblx0X193ZWJwYWNrX3JlcXVpcmVfXy5kKGdldHRlciwgeyBhOiBnZXR0ZXIgfSk7XG5cdHJldHVybiBnZXR0ZXI7XG59OyIsIi8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb25zIGZvciBoYXJtb255IGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uZCA9IChleHBvcnRzLCBkZWZpbml0aW9uKSA9PiB7XG5cdGZvcih2YXIga2V5IGluIGRlZmluaXRpb24pIHtcblx0XHRpZihfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZGVmaW5pdGlvbiwga2V5KSAmJiAhX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIGtleSkpIHtcblx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBrZXksIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBkZWZpbml0aW9uW2tleV0gfSk7XG5cdFx0fVxuXHR9XG59OyIsIl9fd2VicGFja19yZXF1aXJlX18uZyA9IChmdW5jdGlvbigpIHtcblx0aWYgKHR5cGVvZiBnbG9iYWxUaGlzID09PSAnb2JqZWN0JykgcmV0dXJuIGdsb2JhbFRoaXM7XG5cdHRyeSB7XG5cdFx0cmV0dXJuIHRoaXMgfHwgbmV3IEZ1bmN0aW9uKCdyZXR1cm4gdGhpcycpKCk7XG5cdH0gY2F0Y2ggKGUpIHtcblx0XHRpZiAodHlwZW9mIHdpbmRvdyA9PT0gJ29iamVjdCcpIHJldHVybiB3aW5kb3c7XG5cdH1cbn0pKCk7IiwiX193ZWJwYWNrX3JlcXVpcmVfXy5vID0gKG9iaiwgcHJvcCkgPT4gKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmosIHByb3ApKSIsIi8vIGRlZmluZSBfX2VzTW9kdWxlIG9uIGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uciA9IChleHBvcnRzKSA9PiB7XG5cdGlmKHR5cGVvZiBTeW1ib2wgIT09ICd1bmRlZmluZWQnICYmIFN5bWJvbC50b1N0cmluZ1RhZykge1xuXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBTeW1ib2wudG9TdHJpbmdUYWcsIHsgdmFsdWU6ICdNb2R1bGUnIH0pO1xuXHR9XG5cdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHsgdmFsdWU6IHRydWUgfSk7XG59OyIsImltcG9ydCBTaW1wbGVLZXljbG9hayBmcm9tICcuL3NpbXBsZUtleWNsb2FrJztcbmltcG9ydCB7ZGVjb2RlVG9rZW4sIGlzVG9rZW5FeHBpcmVkfSBmcm9tICcuL2tleWNsb2FrVXRpbHMnO1xuXG5leHBvcnQgeyBkZWNvZGVUb2tlbiwgaXNUb2tlbkV4cGlyZWQsIFNpbXBsZUtleWNsb2FrIH07XG4iXSwibmFtZXMiOlsiS0VZQ0xPQUtfQ0FMTEJBQ0tfUFJFRklYIiwiVE9LRU5fU1RPUkFHRV9OQU1FIiwiY2xlYXJFeHBpcmVkIiwia2V5Y2xvYWtDYWxsYmFja1ByZWZpeCIsInRpbWUiLCJEYXRlIiwiZ2V0VGltZSIsImkiLCJsb2NhbFN0b3JhZ2UiLCJsZW5ndGgiLCJrZXkiLCJpbmRleE9mIiwidmFsdWUiLCJnZXRJdGVtIiwiZXhwaXJlcyIsIkpTT04iLCJwYXJzZSIsInJlbW92ZUl0ZW0iLCJlcnIiLCJMb2NhbFN0b3JhZ2UiLCJfY3JlYXRlQ2xhc3MiLCJfdGhpcyIsIl9jbGFzc0NhbGxDaGVjayIsIl9kZWZpbmVQcm9wZXJ0eSIsInN0YXRlIiwiY29uY2F0Iiwic3RhdGVEYXRhIiwic2V0SXRlbSIsInN0cmluZ2lmeSIsImNvb2tpZUV4cGlyYXRpb24iLCJtaW51dGVzIiwiZXhwIiwic2V0VGltZSIsImdldENvb2tpZSIsIm5hbWUiLCJjYSIsImRvY3VtZW50IiwiY29va2llIiwic3BsaXQiLCJjIiwiY2hhckF0Iiwic3Vic3RyaW5nIiwic2V0Q29va2llIiwiZXhwaXJhdGlvbkRhdGUiLCJ0b1VUQ1N0cmluZyIsIkNvb2tpZVN0b3JhZ2UiLCJfdGhpczIiLCJjcmVhdGVDYWxsYmFja1N0b3JhZ2UiLCJMb2NhbFRva2VuU3RvcmFnZSIsInRva2VuU3RvcmFnZU5hbWUiLCJfdGhpczMiLCJkYXRhIiwiQ29va2llVG9rZW5TdG9yYWdlIiwiX3RoaXM0IiwiY3JlYXRlVG9rZW5TdG9yYWdlIiwiYXJndW1lbnRzIiwidW5kZWZpbmVkIiwic2hhMjU2IiwiYmFzZTY0SnMiLCJnZW5lcmF0ZVJhbmRvbURhdGEiLCJsZW4iLCJhcnJheSIsIkFycmF5IiwiaiIsIk1hdGgiLCJmbG9vciIsInJhbmRvbSIsImdlbmVyYXRlUmFuZG9tU3RyaW5nIiwiYWxwaGFiZXQiLCJyYW5kb21EYXRhIiwiY2hhcnMiLCJjaGFyQ29kZUF0IiwiU3RyaW5nIiwiZnJvbUNoYXJDb2RlIiwiYXBwbHkiLCJnZW5lcmF0ZUNvZGVWZXJpZmllciIsImdlbmVyYXRlUGtjZUNoYWxsZW5nZSIsImNvZGVWZXJpZmllciIsImhhc2hCeXRlcyIsIlVpbnQ4QXJyYXkiLCJhcnJheUJ1ZmZlciIsImVuY29kZWRIYXNoIiwiZnJvbUJ5dGVBcnJheSIsInJlcGxhY2UiLCJjcmVhdGVVVUlEIiwiaGV4RGlnaXRzIiwicyIsInN0YXJ0IiwidXVpZCIsImpvaW4iLCJidWlsZENsYWltc1BhcmFtZXRlciIsInJlcXVlc3RlZEFjciIsImlkX3Rva2VuIiwiYWNyIiwicGFyc2VDYWxsYmFja1BhcmFtcyIsInBhcmFtc1N0cmluZyIsInN1cHBvcnRlZFBhcmFtcyIsInAiLCJyZXN1bHQiLCJvYXV0aFBhcmFtcyIsInNsaWNlIiwicGFyc2VDYWxsYmFja1VybCIsInVybCIsInF1ZXJ5SW5kZXgiLCJmcmFnbWVudEluZGV4IiwibmV3VXJsIiwicGFyc2VkIiwiY29kZSIsImVycm9yIiwiZGVjb2RlVG9rZW4iLCJzdHIiLCJkZWNvZGVVUklDb21wb25lbnQiLCJlbmNvZGVVUklDb21wb25lbnQiLCJ3aW5kb3ciLCJhdG9iIiwiaXNUb2tlbkV4cGlyZWQiLCJ0b2tlbkRhdGEiLCJtaW5WYWxpZGl0eSIsInRpbWVTa2V3IiwiZXhwaXJlc0luIiwidG9rZW5fcGFyc2VkIiwiY2VpbCIsIlNpbXBsZUtleWNsb2FrIiwiY29uZmlnIiwicmVhbG0iLCJleGNoYW5nZUNvZGUiLCJ2ZXJpZnlUb2tlbiIsInNldEluaXRpYWxpemVkIiwicmVhbG1VcmwiLCJnZXRSZWFsbVVybCIsImF1dGhvcml6YXRpb25fZW5kcG9pbnQiLCJlbmRfc2Vzc2lvbl9lbmRwb2ludCIsImNhbGxiYWNrU3RvcmFnZSIsInRva2VuU3RvcmFnZSIsInNlbGYiLCJwcm9jZXNzSW5pdCIsIl9yZWYiLCJyZWRpcmVjdFVyaSIsIm5vbmNlIiwiY2FsbGJhY2tTdGF0ZSIsImNsaWVudElkIiwicmVzcG9uc2VNb2RlIiwicmVzcG9uc2VUeXBlIiwic2NvcGUiLCJwa2NlQ29kZVZlcmlmaWVyIiwicGtjZUNoYWxsZW5nZSIsImFkZCIsIm9wdGlvbnMiLCJjcmVhdGVMb2dpblVybCIsImNvbnNvbGUiLCJsb2ciLCJsb2NhdGlvbiIsImFzc2lnbiIsIl9yZWYyIiwiaWRUb2tlbiIsInJlbW92ZSIsImNyZWF0ZUxvZ291dFVybCIsIm9hdXRoIiwib2F1dGhTdGF0ZSIsImdldCIsInZhbGlkIiwic3RvcmVkTm9uY2UiLCJ0aW1lTG9jYWwiLCJfb2JqZWN0U3ByZWFkIiwicmVmcmVzaF90b2tlbiIsInJlZnJlc2hfdG9rZW5fcGFyc2VkIiwiaWRfdG9rZW5fcGFyc2VkIiwiYWNjZXNzX3Rva2VuIiwiYXV0aGVudGljYXRlZCIsImlhdCIsInNldFRva2VuIiwicGFyc2VDYWxsYmFjayIsImhyZWYiLCJoaXN0b3J5IiwicmVwbGFjZVN0YXRlIiwicHJvY2Vzc0NhbGxiYWNrIl0sInNvdXJjZVJvb3QiOiIifQ==