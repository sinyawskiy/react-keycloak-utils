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
  this.scope = config.scope;
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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QTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsVUFBVTtBQUNWO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFFBQVE7QUFDUjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGtCQUFrQixZQUFZO0FBQzlCO0FBQ0E7QUFDQTtBQUNBLFVBQVU7QUFDVjtBQUNBO0FBQ0EsVUFBVTtBQUNWO0FBQ0E7QUFDQTtBQUNBLFVBQVU7QUFDVjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsTUFBTTtBQUNOO0FBQ0E7QUFDQTtBQUNBLFVBQVU7QUFDVjtBQUNBLFVBQVU7QUFDVjtBQUNBO0FBQ0E7QUFDQTtBQUNBLFFBQVE7QUFDUjtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0EsZ0JBQWdCLFFBQVE7QUFDeEI7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsSUFBSTtBQUNKO0FBQ0E7QUFDQTtBQUNBLE1BQU0sbUNBQU87QUFDYjtBQUNBLE9BQU87QUFBQSxrR0FBQztBQUNSO0FBQ0E7QUFDQSxDQUFDOzs7Ozs7Ozs7Ozs7Ozs7O0FDcmdCYztBQUNmO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7Ozs7Ozs7Ozs7O0FDSitDO0FBQy9DO0FBQ0Esa0JBQWtCLGtCQUFrQjtBQUNwQztBQUNBO0FBQ0E7QUFDQTtBQUNBLGtDQUFrQyw2REFBYTtBQUMvQztBQUNBO0FBQ2U7QUFDZjtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBOzs7Ozs7Ozs7Ozs7Ozs7O0FDakIrQztBQUNoQztBQUNmLFFBQVEsNkRBQWE7QUFDckI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMLElBQUk7QUFDSjtBQUNBO0FBQ0E7QUFDQTs7Ozs7Ozs7Ozs7Ozs7OztBQ2RrQztBQUNuQjtBQUNmLE1BQU0sc0RBQU87QUFDYjtBQUNBO0FBQ0E7QUFDQSxRQUFRLHNEQUFPO0FBQ2Y7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7Ozs7Ozs7Ozs7O0FDVmtDO0FBQ1M7QUFDNUI7QUFDZixZQUFZLDJEQUFXO0FBQ3ZCLFNBQVMsc0RBQU87QUFDaEI7Ozs7Ozs7Ozs7Ozs7OztBQ0xlO0FBQ2Y7O0FBRUE7QUFDQTtBQUNBLElBQUk7QUFDSjtBQUNBLEdBQUc7QUFDSDs7Ozs7O1VDUkE7VUFDQTs7VUFFQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTs7VUFFQTtVQUNBOztVQUVBO1VBQ0E7VUFDQTs7Ozs7V0N0QkE7Ozs7O1dDQUE7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBLGlDQUFpQyxXQUFXO1dBQzVDO1dBQ0E7Ozs7O1dDUEE7V0FDQTtXQUNBO1dBQ0E7V0FDQSx5Q0FBeUMsd0NBQXdDO1dBQ2pGO1dBQ0E7V0FDQTs7Ozs7V0NQQTtXQUNBO1dBQ0E7V0FDQTtXQUNBLEdBQUc7V0FDSDtXQUNBO1dBQ0EsQ0FBQzs7Ozs7V0NQRDs7Ozs7V0NBQTtXQUNBO1dBQ0E7V0FDQSx1REFBdUQsaUJBQWlCO1dBQ3hFO1dBQ0EsZ0RBQWdELGFBQWE7V0FDN0Q7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUNOOEM7QUFDYyIsInNvdXJjZXMiOlsid2VicGFjazovL3JlYWN0LWtleWNsb2FrLXV0aWxzL3dlYnBhY2svdW5pdmVyc2FsTW9kdWxlRGVmaW5pdGlvbiIsIndlYnBhY2s6Ly9yZWFjdC1rZXljbG9hay11dGlscy8uL3NyYy9rZXljbG9ha1N0b3JhZ2UuanMiLCJ3ZWJwYWNrOi8vcmVhY3Qta2V5Y2xvYWstdXRpbHMvLi9zcmMva2V5Y2xvYWtVdGlscy5qcyIsIndlYnBhY2s6Ly9yZWFjdC1rZXljbG9hay11dGlscy8uL3NyYy9zaW1wbGVLZXljbG9hay5qcyIsIndlYnBhY2s6Ly9yZWFjdC1rZXljbG9hay11dGlscy8uL25vZGVfbW9kdWxlcy9iYXNlNjQtanMvaW5kZXguanMiLCJ3ZWJwYWNrOi8vcmVhY3Qta2V5Y2xvYWstdXRpbHMvLi9ub2RlX21vZHVsZXMvanMtc2hhMjU2L3NyYy9zaGEyNTYuanMiLCJ3ZWJwYWNrOi8vcmVhY3Qta2V5Y2xvYWstdXRpbHMvLi9ub2RlX21vZHVsZXMvQGJhYmVsL3J1bnRpbWUvaGVscGVycy9lc20vY2xhc3NDYWxsQ2hlY2suanMiLCJ3ZWJwYWNrOi8vcmVhY3Qta2V5Y2xvYWstdXRpbHMvLi9ub2RlX21vZHVsZXMvQGJhYmVsL3J1bnRpbWUvaGVscGVycy9lc20vY3JlYXRlQ2xhc3MuanMiLCJ3ZWJwYWNrOi8vcmVhY3Qta2V5Y2xvYWstdXRpbHMvLi9ub2RlX21vZHVsZXMvQGJhYmVsL3J1bnRpbWUvaGVscGVycy9lc20vZGVmaW5lUHJvcGVydHkuanMiLCJ3ZWJwYWNrOi8vcmVhY3Qta2V5Y2xvYWstdXRpbHMvLi9ub2RlX21vZHVsZXMvQGJhYmVsL3J1bnRpbWUvaGVscGVycy9lc20vdG9QcmltaXRpdmUuanMiLCJ3ZWJwYWNrOi8vcmVhY3Qta2V5Y2xvYWstdXRpbHMvLi9ub2RlX21vZHVsZXMvQGJhYmVsL3J1bnRpbWUvaGVscGVycy9lc20vdG9Qcm9wZXJ0eUtleS5qcyIsIndlYnBhY2s6Ly9yZWFjdC1rZXljbG9hay11dGlscy8uL25vZGVfbW9kdWxlcy9AYmFiZWwvcnVudGltZS9oZWxwZXJzL2VzbS90eXBlb2YuanMiLCJ3ZWJwYWNrOi8vcmVhY3Qta2V5Y2xvYWstdXRpbHMvd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vcmVhY3Qta2V5Y2xvYWstdXRpbHMvd2VicGFjay9ydW50aW1lL2FtZCBvcHRpb25zIiwid2VicGFjazovL3JlYWN0LWtleWNsb2FrLXV0aWxzL3dlYnBhY2svcnVudGltZS9jb21wYXQgZ2V0IGRlZmF1bHQgZXhwb3J0Iiwid2VicGFjazovL3JlYWN0LWtleWNsb2FrLXV0aWxzL3dlYnBhY2svcnVudGltZS9kZWZpbmUgcHJvcGVydHkgZ2V0dGVycyIsIndlYnBhY2s6Ly9yZWFjdC1rZXljbG9hay11dGlscy93ZWJwYWNrL3J1bnRpbWUvZ2xvYmFsIiwid2VicGFjazovL3JlYWN0LWtleWNsb2FrLXV0aWxzL3dlYnBhY2svcnVudGltZS9oYXNPd25Qcm9wZXJ0eSBzaG9ydGhhbmQiLCJ3ZWJwYWNrOi8vcmVhY3Qta2V5Y2xvYWstdXRpbHMvd2VicGFjay9ydW50aW1lL21ha2UgbmFtZXNwYWNlIG9iamVjdCIsIndlYnBhY2s6Ly9yZWFjdC1rZXljbG9hay11dGlscy8uL3NyYy9pbmRleC5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyIoZnVuY3Rpb24gd2VicGFja1VuaXZlcnNhbE1vZHVsZURlZmluaXRpb24ocm9vdCwgZmFjdG9yeSkge1xuXHRpZih0eXBlb2YgZXhwb3J0cyA9PT0gJ29iamVjdCcgJiYgdHlwZW9mIG1vZHVsZSA9PT0gJ29iamVjdCcpXG5cdFx0bW9kdWxlLmV4cG9ydHMgPSBmYWN0b3J5KCk7XG5cdGVsc2UgaWYodHlwZW9mIGRlZmluZSA9PT0gJ2Z1bmN0aW9uJyAmJiBkZWZpbmUuYW1kKVxuXHRcdGRlZmluZShbXSwgZmFjdG9yeSk7XG5cdGVsc2UgaWYodHlwZW9mIGV4cG9ydHMgPT09ICdvYmplY3QnKVxuXHRcdGV4cG9ydHNbXCJyZWFjdC1rZXljbG9hay11dGlsc1wiXSA9IGZhY3RvcnkoKTtcblx0ZWxzZVxuXHRcdHJvb3RbXCJyZWFjdC1rZXljbG9hay11dGlsc1wiXSA9IGZhY3RvcnkoKTtcbn0pKHRoaXMsICgpID0+IHtcbnJldHVybiAiLCJjb25zdCBLRVlDTE9BS19DQUxMQkFDS19QUkVGSVggPSAna2MtY2FsbGJhY2stJztcbmNvbnN0IFRPS0VOX1NUT1JBR0VfTkFNRSA9ICdrYy10b2tlbnMnO1xuXG5jb25zdCBjbGVhckV4cGlyZWQgPSAoa2V5Y2xvYWtDYWxsYmFja1ByZWZpeCkgPT4ge1xuICBjb25zdCB0aW1lID0gbmV3IERhdGUoKS5nZXRUaW1lKCk7XG4gIGZvciAobGV0IGkgPSAwOyBpIDwgbG9jYWxTdG9yYWdlLmxlbmd0aDsgaSsrKSAge1xuICAgIGNvbnN0IGtleSA9IGxvY2FsU3RvcmFnZS5rZXkoaSk7XG4gICAgaWYgKGtleSAmJiBrZXkuaW5kZXhPZihrZXljbG9ha0NhbGxiYWNrUHJlZml4KSA9PT0gMCkge1xuICAgICAgY29uc3QgdmFsdWUgPSBsb2NhbFN0b3JhZ2UuZ2V0SXRlbShrZXkpO1xuICAgICAgaWYgKHZhbHVlKSB7XG4gICAgICAgIHRyeSB7XG4gICAgICAgICAgY29uc3QgZXhwaXJlcyA9IEpTT04ucGFyc2UodmFsdWUpLmV4cGlyZXM7XG4gICAgICAgICAgaWYgKCFleHBpcmVzIHx8IGV4cGlyZXMgPCB0aW1lKSB7XG4gICAgICAgICAgICBsb2NhbFN0b3JhZ2UucmVtb3ZlSXRlbShrZXkpO1xuICAgICAgICAgIH1cbiAgICAgICAgfSBjYXRjaCAoZXJyKSB7XG4gICAgICAgICAgbG9jYWxTdG9yYWdlLnJlbW92ZUl0ZW0oa2V5KTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cbiAgfVxufTtcblxuY2xhc3MgTG9jYWxTdG9yYWdle1xuICBjb25zdHJ1Y3RvcihrZXljbG9ha0NhbGxiYWNrUHJlZml4KSB7XG4gICAgbG9jYWxTdG9yYWdlLnNldEl0ZW0oJ2tjLXRlc3QnLCAndGVzdCcpO1xuICAgIGxvY2FsU3RvcmFnZS5yZW1vdmVJdGVtKCdrYy10ZXN0Jyk7XG4gICAgdGhpcy5rZXljbG9ha0NhbGxiYWNrUHJlZml4ID0ga2V5Y2xvYWtDYWxsYmFja1ByZWZpeDtcbiAgICByZXR1cm4gdGhpcztcbiAgfVxuXG4gIGdldCA9IChzdGF0ZSkgPT4ge1xuICAgIGlmICghc3RhdGUpIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICBjb25zdCBrZXkgPSBgJHt0aGlzLmtleWNsb2FrQ2FsbGJhY2tQcmVmaXh9JHtzdGF0ZX1gO1xuICAgIGxldCB2YWx1ZSA9IGxvY2FsU3RvcmFnZS5nZXRJdGVtKGtleSk7XG4gICAgaWYgKHZhbHVlKSB7XG4gICAgICBsb2NhbFN0b3JhZ2UucmVtb3ZlSXRlbShrZXkpO1xuICAgICAgdmFsdWUgPSBKU09OLnBhcnNlKHZhbHVlKTtcbiAgICB9XG5cbiAgICBjbGVhckV4cGlyZWQodGhpcy5rZXljbG9ha0NhbGxiYWNrUHJlZml4KTtcbiAgICByZXR1cm4gdmFsdWU7XG4gIH07XG5cbiAgYWRkID0gKHN0YXRlRGF0YSkgPT4ge1xuICAgIGNsZWFyRXhwaXJlZCh0aGlzLmtleWNsb2FrQ2FsbGJhY2tQcmVmaXgpO1xuXG4gICAgY29uc3Qga2V5ID0gYCR7dGhpcy5rZXljbG9ha0NhbGxiYWNrUHJlZml4fSR7c3RhdGVEYXRhLnN0YXRlfWA7XG4gICAgc3RhdGVEYXRhLmV4cGlyZXMgPSBuZXcgRGF0ZSgpLmdldFRpbWUoKSArICg2MCAqIDYwICogMTAwMCk7XG4gICAgbG9jYWxTdG9yYWdlLnNldEl0ZW0oa2V5LCBKU09OLnN0cmluZ2lmeShzdGF0ZURhdGEpKTtcbiAgfTtcbn1cblxuXG5jb25zdCBjb29raWVFeHBpcmF0aW9uID0gKG1pbnV0ZXMpID0+IHtcbiAgY29uc3QgZXhwID0gbmV3IERhdGUoKTtcbiAgZXhwLnNldFRpbWUoZXhwLmdldFRpbWUoKSArIChtaW51dGVzKjYwKjEwMDApKTtcbiAgcmV0dXJuIGV4cDtcbn07XG5cbmNvbnN0IGdldENvb2tpZSA9IChrZXkpID0+IHtcbiAgY29uc3QgbmFtZSA9IGtleSArICc9JztcbiAgY29uc3QgY2EgPSBkb2N1bWVudC5jb29raWUuc3BsaXQoJzsnKTtcbiAgZm9yIChsZXQgaSA9IDA7IGkgPCBjYS5sZW5ndGg7IGkrKykge1xuICAgIGxldCBjID0gY2FbaV07XG4gICAgd2hpbGUgKGMuY2hhckF0KDApID09PSAnICcpIHtcbiAgICAgIGMgPSBjLnN1YnN0cmluZygxKTtcbiAgICB9XG4gICAgaWYgKGMuaW5kZXhPZihuYW1lKSA9PT0gMCkge1xuICAgICAgcmV0dXJuIGMuc3Vic3RyaW5nKG5hbWUubGVuZ3RoLCBjLmxlbmd0aCk7XG4gICAgfVxuICB9XG4gIHJldHVybiAnJztcbn07XG5cbmNvbnN0IHNldENvb2tpZSA9IChrZXksIHZhbHVlLCBleHBpcmF0aW9uRGF0ZSkgPT4ge1xuICBkb2N1bWVudC5jb29raWUgPSBgJHtrZXl9PSR7dmFsdWV9OyBleHBpcmVzPSR7ZXhwaXJhdGlvbkRhdGUudG9VVENTdHJpbmcoKX07IGA7XG59O1xuXG5jbGFzcyBDb29raWVTdG9yYWdle1xuICBjb25zdHJ1Y3RvcihrZXljbG9ha0NhbGxiYWNrUHJlZml4KSB7XG4gICAgdGhpcy5rZXljbG9ha0NhbGxiYWNrUHJlZml4ID0ga2V5Y2xvYWtDYWxsYmFja1ByZWZpeDtcbiAgICByZXR1cm4gdGhpcztcbiAgfVxuXG4gIGdldCA9IChzdGF0ZSkgPT4ge1xuICAgIGlmICghc3RhdGUpIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG4gICAgY29uc3Qga2V5ID0gYCR7dGhpcy5rZXljbG9ha0NhbGxiYWNrUHJlZml4fSR7c3RhdGV9YDtcbiAgICBjb25zdCB2YWx1ZSA9IGdldENvb2tpZShrZXkpO1xuICAgIHNldENvb2tpZShrZXksICcnLCBjb29raWVFeHBpcmF0aW9uKC0xMDApKTtcbiAgICBpZiAodmFsdWUpIHtcbiAgICAgIHJldHVybiBKU09OLnBhcnNlKHZhbHVlKTtcbiAgICB9XG4gIH07XG5cbiAgYWRkID0gKHN0YXRlRGF0YSkgPT4ge1xuICAgIGNvbnN0IGtleSA9IGAke3RoaXMua2V5Y2xvYWtDYWxsYmFja1ByZWZpeH0ke3N0YXRlRGF0YS5zdGF0ZX1gO1xuICAgIHNldENvb2tpZShrZXksIEpTT04uc3RyaW5naWZ5KHN0YXRlRGF0YSksIGNvb2tpZUV4cGlyYXRpb24oNjApKTtcbiAgfTtcblxuXG59XG5cbmV4cG9ydCBjb25zdCBjcmVhdGVDYWxsYmFja1N0b3JhZ2UgPSAoa2V5Y2xvYWtDYWxsYmFja1ByZWZpeCkgPT4ge1xuICB0cnkge1xuICAgIHJldHVybiBuZXcgTG9jYWxTdG9yYWdlKGtleWNsb2FrQ2FsbGJhY2tQcmVmaXg9S0VZQ0xPQUtfQ0FMTEJBQ0tfUFJFRklYKTtcbiAgfSBjYXRjaCAoZXJyKSB7fVxuICByZXR1cm4gbmV3IENvb2tpZVN0b3JhZ2Uoa2V5Y2xvYWtDYWxsYmFja1ByZWZpeD1LRVlDTE9BS19DQUxMQkFDS19QUkVGSVgpO1xufTtcblxuXG5jbGFzcyBMb2NhbFRva2VuU3RvcmFnZXtcbiAgY29uc3RydWN0b3IodG9rZW5TdG9yYWdlTmFtZSkge1xuICAgIHRoaXMudG9rZW5TdG9yYWdlTmFtZSA9IHRva2VuU3RvcmFnZU5hbWU7XG4gICAgbG9jYWxTdG9yYWdlLnNldEl0ZW0oJ2tjLXRlc3QnLCAndGVzdCcpO1xuICAgIGxvY2FsU3RvcmFnZS5yZW1vdmVJdGVtKCdrYy10ZXN0Jyk7XG4gICAgcmV0dXJuIHRoaXM7XG4gIH1cbiAgYWRkID0gKGRhdGEpID0+IHtcbiAgICBsb2NhbFN0b3JhZ2Uuc2V0SXRlbSh0aGlzLnRva2VuU3RvcmFnZU5hbWUsIEpTT04uc3RyaW5naWZ5KGRhdGEpKTtcbiAgfVxuXG4gIGdldCA9ICgpID0+IHtcbiAgICBjb25zdCB2YWx1ZSA9IGxvY2FsU3RvcmFnZS5nZXRJdGVtKHRoaXMudG9rZW5TdG9yYWdlTmFtZSk7XG4gICAgaWYodmFsdWUpIHtcbiAgICAgIHJldHVybiBKU09OLnBhcnNlKHZhbHVlKTtcbiAgICB9XG4gIH1cblxuICByZW1vdmUgPSAoKSA9PiB7XG4gICAgbG9jYWxTdG9yYWdlLnJlbW92ZUl0ZW0odGhpcy50b2tlblN0b3JhZ2VOYW1lKTtcbiAgfVxufVxuXG5jbGFzcyBDb29raWVUb2tlblN0b3JhZ2V7XG4gIGNvbnN0cnVjdG9yKHRva2VuU3RvcmFnZU5hbWUpIHtcbiAgICB0aGlzLnRva2VuU3RvcmFnZU5hbWUgPSB0b2tlblN0b3JhZ2VOYW1lO1xuICAgIHJldHVybiB0aGlzO1xuICB9XG5cbiAgYWRkID0gKGRhdGEpID0+IHtcbiAgICBzZXRDb29raWUodGhpcy50b2tlblN0b3JhZ2VOYW1lLCBKU09OLnN0cmluZ2lmeShkYXRhKSwgY29va2llRXhwaXJhdGlvbigzNjAwKSk7XG4gIH1cblxuICBnZXQgPSAoKSA9PiB7XG4gICAgY29uc3QgdmFsdWUgPSBnZXRDb29raWUodGhpcy50b2tlblN0b3JhZ2VOYW1lKTtcbiAgICBpZiAodmFsdWUpIHtcbiAgICAgIHJldHVybiBKU09OLnBhcnNlKHZhbHVlKTtcbiAgICB9XG4gIH1cblxuICByZW1vdmUgPSAoKSA9PiB7XG4gICAgc2V0Q29va2llKHRoaXMudG9rZW5TdG9yYWdlTmFtZSwgJycsIGNvb2tpZUV4cGlyYXRpb24oLTEwMCkpO1xuICB9O1xufVxuXG5cbi8vIDIgdHlwZSBzdG9yYWdlOlxuLy8gMSBUb2tlblN0b3JhZ2UgY2xhc3Mgd2l0aCBtZXRob2RzIGFkZCBnZXQgcmVtb3ZlXG4vLyAyIFRpY2tldFN0b3JhZ2UgY2xhc3Mgd2l0aCBuYW1lICtzdGF0ZUlkIGFuZCBtZXRob2RzIGFkZCBnZXQgcmVtb3ZlIHdoZW4gZ2V0XG5cbmV4cG9ydCBjb25zdCBjcmVhdGVUb2tlblN0b3JhZ2UgPSAodG9rZW5TdG9yYWdlTmFtZT1UT0tFTl9TVE9SQUdFX05BTUUpID0+IHtcbiAgdHJ5IHtcbiAgICByZXR1cm4gbmV3IExvY2FsVG9rZW5TdG9yYWdlKHRva2VuU3RvcmFnZU5hbWUpO1xuICB9IGNhdGNoIChlcnIpIHt9XG4gIHJldHVybiBuZXcgQ29va2llVG9rZW5TdG9yYWdlKHRva2VuU3RvcmFnZU5hbWUpO1xufVxuIiwiaW1wb3J0IHtzaGEyNTZ9IGZyb20gJ2pzLXNoYTI1Nic7XG5pbXBvcnQgKiBhcyBiYXNlNjRKcyBmcm9tICdiYXNlNjQtanMnO1xuXG5jb25zdCBnZW5lcmF0ZVJhbmRvbURhdGEgPSAobGVuKSA9PiB7XG4gIGNvbnN0IGFycmF5ID0gbmV3IEFycmF5KGxlbik7XG4gIGZvciAobGV0IGogPSAwOyBqIDwgYXJyYXkubGVuZ3RoOyBqKyspIHtcbiAgICBhcnJheVtqXSA9IE1hdGguZmxvb3IoMjU2ICogTWF0aC5yYW5kb20oKSk7XG4gIH1cbiAgcmV0dXJuIGFycmF5O1xufVxuXG5jb25zdCBnZW5lcmF0ZVJhbmRvbVN0cmluZyA9IChsZW4sIGFscGhhYmV0KSA9PiB7XG4gIGNvbnN0IHJhbmRvbURhdGEgPSBnZW5lcmF0ZVJhbmRvbURhdGEobGVuKTtcbiAgY29uc3QgY2hhcnMgPSBuZXcgQXJyYXkobGVuKTtcbiAgZm9yIChsZXQgaSA9IDA7IGkgPCBsZW47IGkrKykge1xuICAgIGNoYXJzW2ldID0gYWxwaGFiZXQuY2hhckNvZGVBdChyYW5kb21EYXRhW2ldICUgYWxwaGFiZXQubGVuZ3RoKTtcbiAgfVxuICByZXR1cm4gU3RyaW5nLmZyb21DaGFyQ29kZS5hcHBseShudWxsLCBjaGFycyk7XG59XG5cbmNvbnN0IGdlbmVyYXRlQ29kZVZlcmlmaWVyID0gKGxlbikgPT4ge1xuICByZXR1cm4gZ2VuZXJhdGVSYW5kb21TdHJpbmcobGVuLCAnQUJDREVGR0hJSktMTU5PUFFSU1RVVldYWVphYmNkZWZnaGlqa2xtbm9wcXJzdHV2d3h5ejAxMjM0NTY3ODknKTtcbn1cblxuY29uc3QgZ2VuZXJhdGVQa2NlQ2hhbGxlbmdlID0gKGNvZGVWZXJpZmllcikgPT4ge1xuICAgICAgY29uc3QgaGFzaEJ5dGVzID0gbmV3IFVpbnQ4QXJyYXkoc2hhMjU2LmFycmF5QnVmZmVyKGNvZGVWZXJpZmllcikpO1xuICAgICAgY29uc3QgZW5jb2RlZEhhc2ggPSBiYXNlNjRKcy5mcm9tQnl0ZUFycmF5KGhhc2hCeXRlcylcbiAgICAgICAgLnJlcGxhY2UoL1xcKy9nLCAnLScpXG4gICAgICAgIC5yZXBsYWNlKC9cXC8vZywgJ18nKVxuICAgICAgICAucmVwbGFjZSgvXFw9L2csICcnKTtcbiAgICAgIHJldHVybiBlbmNvZGVkSGFzaDtcbn1cblxuY29uc3QgY3JlYXRlVVVJRCA9ICgpID0+IHtcbiAgY29uc3QgaGV4RGlnaXRzID0gJzAxMjM0NTY3ODlhYmNkZWYnO1xuICBjb25zdCBzID0gZ2VuZXJhdGVSYW5kb21TdHJpbmcoMzYsIGhleERpZ2l0cykuc3BsaXQoXCJcIik7XG4gIHNbMTRdID0gJzQnO1xuICAvLyBzWzE5XSA9IGhleERpZ2l0cy5zdWJzdHIoKHNbMTldICYgMHgzKSB8IDB4OCwgMSk7XG4gIGNvbnN0IHN0YXJ0ID0gKHNbMTldICYgMHgzKSB8IDB4ODtcbiAgc1sxOV0gPSBoZXhEaWdpdHMuc3Vic3RyaW5nKHN0YXJ0LCBzdGFydCsxKTtcbiAgc1s4XSA9IHNbMTNdID0gc1sxOF0gPSBzWzIzXSA9ICctJztcbiAgY29uc3QgdXVpZCA9IHMuam9pbignJyk7XG4gIHJldHVybiB1dWlkO1xufVxuXG5jb25zdCBidWlsZENsYWltc1BhcmFtZXRlciA9IChyZXF1ZXN0ZWRBY3IpID0+IEpTT04uc3RyaW5naWZ5KHtcbiAgaWRfdG9rZW46IHtcbiAgICBhY3I6IHJlcXVlc3RlZEFjclxuICB9XG59KTtcblxuY29uc3QgcGFyc2VDYWxsYmFja1BhcmFtcyA9IChwYXJhbXNTdHJpbmcsIHN1cHBvcnRlZFBhcmFtcykgPT4ge1xuICBjb25zdCBwID0gcGFyYW1zU3RyaW5nLnNwbGl0KCcmJyk7XG4gIGNvbnN0IHJlc3VsdCA9IHtcbiAgICBwYXJhbXNTdHJpbmc6ICcnLFxuICAgIG9hdXRoUGFyYW1zOiB7fVxuICB9O1xuICBmb3IgKGxldCBpID0gMDsgaSA8IHAubGVuZ3RoOyBpKyspIHtcbiAgICBjb25zdCBzcGxpdCA9IHBbaV0uaW5kZXhPZihcIj1cIik7XG4gICAgY29uc3Qga2V5ID0gcFtpXS5zbGljZSgwLCBzcGxpdCk7XG4gICAgaWYgKHN1cHBvcnRlZFBhcmFtcy5pbmRleE9mKGtleSkgIT09IC0xKSB7XG4gICAgICByZXN1bHQub2F1dGhQYXJhbXNba2V5XSA9IHBbaV0uc2xpY2Uoc3BsaXQgKyAxKTtcbiAgICB9IGVsc2Uge1xuICAgICAgaWYgKHJlc3VsdC5wYXJhbXNTdHJpbmcgIT09ICcnKSB7XG4gICAgICAgIHJlc3VsdC5wYXJhbXNTdHJpbmcgKz0gJyYnO1xuICAgICAgfVxuICAgICAgcmVzdWx0LnBhcmFtc1N0cmluZyArPSBwW2ldO1xuICAgIH1cbiAgfVxuICByZXR1cm4gcmVzdWx0O1xufVxuXG5jb25zdCBwYXJzZUNhbGxiYWNrVXJsID0gKHVybCkgPT4ge1xuICBjb25zdCBzdXBwb3J0ZWRQYXJhbXMgPSBbJ2NvZGUnLCAnc3RhdGUnLCAnc2Vzc2lvbl9zdGF0ZScsICdlcnJvcicsICdlcnJvcl9kZXNjcmlwdGlvbicsICdlcnJvcl91cmknXTtcbiAgLy8g0LXRgdC70Lgg0L/RgNC40YXQvtC00LjRgiDQvtGI0LjQsdC60LAg0YLQviDQutC10LnQutC70L7QutGDINCy0YHQtSDRgNCw0LLQvdC+INC60LDQutC+0Lkg0LfQsNC/0YDQvtGBINCy0L7Qt9Cy0YDQsNGJ0LDQtdGCINCw0YLRgtGA0LjQsdGD0YLRiyDQv9C+0YHQu9C1INC30L3QsNC60LAg0LLQvtC/0YDQvtGB0LjQutCwXG4gIGNvbnN0IHF1ZXJ5SW5kZXggPSB1cmwuaW5kZXhPZignPycpO1xuICBjb25zdCBmcmFnbWVudEluZGV4ID0gdXJsLmluZGV4T2YoJyMnKTtcbiAgbGV0IG5ld1VybDtcbiAgbGV0IHBhcnNlZDtcbiAgaWYgKGZyYWdtZW50SW5kZXggIT09IC0xKSB7XG4gICAgbmV3VXJsID0gdXJsLnN1YnN0cmluZygwLCBmcmFnbWVudEluZGV4KTtcbiAgICBwYXJzZWQgPSBwYXJzZUNhbGxiYWNrUGFyYW1zKHVybC5zdWJzdHJpbmcoZnJhZ21lbnRJbmRleCArIDEpLCBzdXBwb3J0ZWRQYXJhbXMpO1xuICAgIGlmIChwYXJzZWQucGFyYW1zU3RyaW5nICE9PSAnJykge1xuICAgICAgbmV3VXJsICs9ICcjJyArIHBhcnNlZC5wYXJhbXNTdHJpbmc7XG4gICAgfVxuICB9ZWxzZSBpZihmcmFnbWVudEluZGV4ID09PSAtMSAmJiBxdWVyeUluZGV4ICE9PSAtMSl7XG4gICAgbmV3VXJsID0gdXJsLnN1YnN0cmluZygwLCBxdWVyeUluZGV4KTtcbiAgICBwYXJzZWQgPSBwYXJzZUNhbGxiYWNrUGFyYW1zKHVybC5zdWJzdHJpbmcocXVlcnlJbmRleCArIDEpLCBzdXBwb3J0ZWRQYXJhbXMpO1xuICAgIGlmIChwYXJzZWQucGFyYW1zU3RyaW5nICE9PSAnJykge1xuICAgICAgbmV3VXJsICs9ICcjJyArIHBhcnNlZC5wYXJhbXNTdHJpbmc7XG4gICAgfVxuICB9XG5cbiAgaWYgKHBhcnNlZCAmJiBwYXJzZWQub2F1dGhQYXJhbXMpIHtcbiAgICAgIGlmICgocGFyc2VkLm9hdXRoUGFyYW1zLmNvZGUgfHwgcGFyc2VkLm9hdXRoUGFyYW1zLmVycm9yKSAmJiBwYXJzZWQub2F1dGhQYXJhbXMuc3RhdGUpIHtcbiAgICAgICAgcGFyc2VkLm9hdXRoUGFyYW1zLm5ld1VybCA9IG5ld1VybDtcbiAgICAgICAgcmV0dXJuIHBhcnNlZC5vYXV0aFBhcmFtcztcbiAgICAgIH1cbiAgICB9XG5cbn1cblxuY29uc3QgZGVjb2RlVG9rZW4gPSAoc3RyKSA9PiB7XG4gIHN0ciA9IHN0ci5zcGxpdCgnLicpWzFdO1xuICBzdHIgPSBzdHIucmVwbGFjZSgvLS9nLCAnKycpO1xuICBzdHIgPSBzdHIucmVwbGFjZSgvXy9nLCAnLycpO1xuICBzd2l0Y2ggKHN0ci5sZW5ndGggJSA0KSB7XG4gICAgY2FzZSAwOlxuICAgICAgYnJlYWs7XG4gICAgY2FzZSAyOlxuICAgICAgc3RyICs9ICc9PSc7XG4gICAgICBicmVhaztcbiAgICBjYXNlIDM6XG4gICAgICBzdHIgKz0gJz0nO1xuICAgICAgYnJlYWs7XG4gICAgZGVmYXVsdDpcbiAgICAgIHRocm93ICdJbnZhbGlkIHRva2VuJztcbiAgfVxuICBzdHIgPSBkZWNvZGVVUklDb21wb25lbnQoZW5jb2RlVVJJQ29tcG9uZW50KHdpbmRvdy5hdG9iKHN0cikpKTtcbiAgc3RyID0gSlNPTi5wYXJzZShzdHIpO1xuICByZXR1cm4gc3RyO1xufVxuXG5jb25zdCBpc1Rva2VuRXhwaXJlZCA9IGZ1bmN0aW9uKHRva2VuRGF0YSwgbWluVmFsaWRpdHk9NSkge1xuICBpZiAodG9rZW5EYXRhLnRpbWVTa2V3ID09IG51bGwpIHtcbiAgICByZXR1cm4gdHJ1ZTtcbiAgfVxuXG4gIGxldCBleHBpcmVzSW4gPSB0b2tlbkRhdGEudG9rZW5fcGFyc2VkWydleHAnXSAtIE1hdGguY2VpbChuZXcgRGF0ZSgpLmdldFRpbWUoKSAvIDEwMDApICsgdG9rZW5EYXRhLnRpbWVTa2V3O1xuICBleHBpcmVzSW4gLT0gbWluVmFsaWRpdHk7XG4gIHJldHVybiBleHBpcmVzSW4gPCAwO1xufTtcblxuXG5leHBvcnQge1xuICBidWlsZENsYWltc1BhcmFtZXRlcixcbiAgZ2VuZXJhdGVDb2RlVmVyaWZpZXIsXG4gIGdlbmVyYXRlUGtjZUNoYWxsZW5nZSxcbiAgY3JlYXRlVVVJRCxcbiAgcGFyc2VDYWxsYmFja1VybCxcbiAgZGVjb2RlVG9rZW4sXG4gIGlzVG9rZW5FeHBpcmVkLFxufTtcbiIsImltcG9ydCB7Y3JlYXRlQ2FsbGJhY2tTdG9yYWdlLCBjcmVhdGVUb2tlblN0b3JhZ2V9IGZyb20gJy4va2V5Y2xvYWtTdG9yYWdlJztcbmltcG9ydCB7XG4gIGNyZWF0ZVVVSUQsXG4gIGRlY29kZVRva2VuLFxuICBnZW5lcmF0ZUNvZGVWZXJpZmllcixcbiAgZ2VuZXJhdGVQa2NlQ2hhbGxlbmdlLFxuICBpc1Rva2VuRXhwaXJlZCxcbiAgcGFyc2VDYWxsYmFja1VybFxufSBmcm9tICcuL2tleWNsb2FrVXRpbHMnO1xuXG5cbmNsYXNzIFNpbXBsZUtleWNsb2Fre1xuICB1cmwgPSAnJztcbiAgcmVhbG0gPSAnJztcbiAgY2xpZW50SWQgPSAnJztcbiAgc2NvcGUgPSAnb3BlbmlkJztcbiAgcmVzcG9uc2VNb2RlID0gJ2ZyYWdtZW50JztcbiAgcmVzcG9uc2VUeXBlID0gJ2NvZGUnO1xuICBhdXRob3JpemF0aW9uX2VuZHBvaW50ID0gICcnO1xuICBlbmRfc2Vzc2lvbl9lbmRwb2ludCA9ICcnO1xuICBjYWxsYmFja1N0b3JhZ2UgPSBudWxsO1xuICB0b2tlblN0b3JhZ2UgPSBudWxsO1xuICBhdXRoZW50aWNhdGVkID0gZmFsc2U7XG4gIHRpbWVMb2NhbCA9IG51bGw7XG4gIGtleWNsb2FrQ2FsbGJhY2tQcmVmaXggPSB1bmRlZmluZWQ7XG4gIHRva2VuU3RvcmFnZU5hbWUgPSB1bmRlZmluZWQ7XG5cbiAgdmVyaWZ5VG9rZW4gPSAoKSA9PiB7fVxuICBleGNoYW5nZUNvZGUgPSAoKSA9PiB7fVxuICBzZXRJbml0aWFsaXplZCA9ICgpID0+IHt9XG5cbiAgY29uc3RydWN0b3IoY29uZmlnKXtcbiAgICB0aGlzLnVybCA9IGNvbmZpZy51cmw7XG4gICAgdGhpcy5yZWFsbSA9IGNvbmZpZy5yZWFsbTtcbiAgICB0aGlzLmNsaWVudElkID0gY29uZmlnLmNsaWVudElkO1xuICAgIHRoaXMuc2NvcGUgPSBjb25maWcuc2NvcGU7XG4gICAgdGhpcy5rZXljbG9ha0NhbGxiYWNrUHJlZml4ID0gY29uZmlnLmtleWNsb2FrQ2FsbGJhY2tQcmVmaXg7XG4gICAgdGhpcy50b2tlblN0b3JhZ2VOYW1lID0gY29uZmlnLnRva2VuU3RvcmFnZU5hbWUgfHwgYGtjLSR7Y29uZmlnLnJlYWxtfS0ke2NvbmZpZy5jbGllbnRJZH1gO1xuICAgIHJldHVybiB0aGlzO1xuICB9XG5cbiAgZ2V0UmVhbG1VcmwgPSAoKSA9PiB7XG4gICAgcmV0dXJuIGAke3RoaXMudXJsfSR7dGhpcy51cmwuY2hhckF0KHRoaXMudXJsLmxlbmd0aCAtIDEpID09PSAnLyc/Jyc6Jy8nfXJlYWxtcy8ke2VuY29kZVVSSUNvbXBvbmVudCh0aGlzLnJlYWxtKX1gO1xuICB9XG5cbiAgaW5pdCA9IChleGNoYW5nZUNvZGUsIHZlcmlmeVRva2VuLCBzZXRJbml0aWFsaXplZCkgPT4ge1xuICAgIGNvbnN0IHJlYWxtVXJsID0gdGhpcy5nZXRSZWFsbVVybCgpO1xuICAgIHRoaXMuYXV0aG9yaXphdGlvbl9lbmRwb2ludCA9IGAke3JlYWxtVXJsfS9wcm90b2NvbC9vcGVuaWQtY29ubmVjdC9hdXRoYDtcbiAgICB0aGlzLmVuZF9zZXNzaW9uX2VuZHBvaW50ID0gYCR7cmVhbG1Vcmx9L3Byb3RvY29sL29wZW5pZC1jb25uZWN0L2xvZ291dGA7XG4gICAgdGhpcy5jYWxsYmFja1N0b3JhZ2UgPSBjcmVhdGVDYWxsYmFja1N0b3JhZ2UodGhpcy5rZXljbG9ha0NhbGxiYWNrUHJlZml4KTtcbiAgICB0aGlzLnRva2VuU3RvcmFnZSA9IGNyZWF0ZVRva2VuU3RvcmFnZSh0aGlzLnRva2VuU3RvcmFnZU5hbWUpO1xuICAgIHRoaXMuZXhjaGFuZ2VDb2RlID0gZXhjaGFuZ2VDb2RlO1xuICAgIHRoaXMudmVyaWZ5VG9rZW4gPSB2ZXJpZnlUb2tlbjtcbiAgICB0aGlzLnNldEluaXRpYWxpemVkID0gc2V0SW5pdGlhbGl6ZWQ7XG4gICAgY29uc3Qgc2VsZiA9IHRoaXM7XG4gICAgc2VsZi5wcm9jZXNzSW5pdCgpO1xuICB9XG5cbiAgY3JlYXRlTG9naW5VcmwgPSAoeyByZWRpcmVjdFVyaSB9KSA9PiB7XG4gICAgICBjb25zdCBzdGF0ZSA9IGNyZWF0ZVVVSUQoKTtcbiAgICAgIGNvbnN0IG5vbmNlID0gY3JlYXRlVVVJRCgpO1xuXG4gICAgICBjb25zdCBjYWxsYmFja1N0YXRlID0ge1xuICAgICAgICBzdGF0ZTogc3RhdGUsXG4gICAgICAgIG5vbmNlOiBub25jZSxcbiAgICAgICAgcmVkaXJlY3RVcmk6IGVuY29kZVVSSUNvbXBvbmVudChyZWRpcmVjdFVyaSlcbiAgICAgIH07XG5cbiAgICAgIGxldCB1cmwgPSBgJHt0aGlzLmF1dGhvcml6YXRpb25fZW5kcG9pbnR9P2NsaWVudF9pZD0ke2VuY29kZVVSSUNvbXBvbmVudCh0aGlzLmNsaWVudElkKX0mcmVkaXJlY3RfdXJpPSR7ZW5jb2RlVVJJQ29tcG9uZW50KHJlZGlyZWN0VXJpKX0mc3RhdGU9JHtlbmNvZGVVUklDb21wb25lbnQoc3RhdGUpfSZyZXNwb25zZV9tb2RlPSR7ZW5jb2RlVVJJQ29tcG9uZW50KHRoaXMucmVzcG9uc2VNb2RlKX0mcmVzcG9uc2VfdHlwZT0ke2VuY29kZVVSSUNvbXBvbmVudCh0aGlzLnJlc3BvbnNlVHlwZSl9JnNjb3BlPSR7ZW5jb2RlVVJJQ29tcG9uZW50KHRoaXMuc2NvcGUpfSZub25jZT0ke2VuY29kZVVSSUNvbXBvbmVudChub25jZSl9YDtcblxuICAgICAgY29uc3QgY29kZVZlcmlmaWVyID0gZ2VuZXJhdGVDb2RlVmVyaWZpZXIoOTYpO1xuICAgICAgY2FsbGJhY2tTdGF0ZS5wa2NlQ29kZVZlcmlmaWVyID0gY29kZVZlcmlmaWVyO1xuICAgICAgY29uc3QgcGtjZUNoYWxsZW5nZSA9IGdlbmVyYXRlUGtjZUNoYWxsZW5nZShjb2RlVmVyaWZpZXIpO1xuICAgICAgdXJsID0gYCR7dXJsfSZjb2RlX2NoYWxsZW5nZT0ke3BrY2VDaGFsbGVuZ2V9JmNvZGVfY2hhbGxlbmdlX21ldGhvZD1TMjU2YDtcblxuICAgICAgdGhpcy5jYWxsYmFja1N0b3JhZ2UuYWRkKGNhbGxiYWNrU3RhdGUpO1xuICAgICAgcmV0dXJuIHVybDtcbiAgfVxuXG4gIGxvZ2luID0gKG9wdGlvbnMpID0+IHtcbiAgICB3aW5kb3cubG9jYXRpb24uYXNzaWduKHRoaXMuY3JlYXRlTG9naW5Vcmwob3B0aW9ucykpO1xuICB9XG4gIGNyZWF0ZUxvZ291dFVybCA9ICh7IHJlZGlyZWN0VXJpLCBpZFRva2VuIH0pID0+IHtcbiAgICAgIGxldCB1cmwgPSBgJHt0aGlzLmVuZF9zZXNzaW9uX2VuZHBvaW50fT9jbGllbnRfaWQ9JHtlbmNvZGVVUklDb21wb25lbnQodGhpcy5jbGllbnRJZCl9JnBvc3RfbG9nb3V0X3JlZGlyZWN0X3VyaT0ke2VuY29kZVVSSUNvbXBvbmVudChyZWRpcmVjdFVyaSl9YDtcbiAgICAgIGlmIChpZFRva2VuKSB7XG4gICAgICAgIHVybCA9IGAke3VybH0maWRfdG9rZW5faGludD0ke2VuY29kZVVSSUNvbXBvbmVudChpZFRva2VuKX1gO1xuICAgICAgfVxuICAgICAgcmV0dXJuIHVybDtcbiAgfVxuXG4gIGxvZ291dCA9IChvcHRpb25zKSA9PiB7XG4gICAgdGhpcy50b2tlblN0b3JhZ2UucmVtb3ZlKCk7XG4gICAgd2luZG93LmxvY2F0aW9uLnJlcGxhY2UodGhpcy5jcmVhdGVMb2dvdXRVcmwob3B0aW9ucykpO1xuICB9XG5cbiAgcGFyc2VDYWxsYmFjayA9ICh1cmwpID0+IHtcbiAgICBjb25zdCBvYXV0aCA9IHBhcnNlQ2FsbGJhY2tVcmwodXJsKTtcbiAgICBpZiAoIW9hdXRoKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgY29uc3Qgb2F1dGhTdGF0ZSA9IHRoaXMuY2FsbGJhY2tTdG9yYWdlLmdldChvYXV0aC5zdGF0ZSk7XG5cbiAgICBpZiAob2F1dGhTdGF0ZSkge1xuICAgICAgb2F1dGgudmFsaWQgPSB0cnVlO1xuICAgICAgb2F1dGgucmVkaXJlY3RVcmkgPSBvYXV0aFN0YXRlLnJlZGlyZWN0VXJpO1xuICAgICAgb2F1dGguc3RvcmVkTm9uY2UgPSBvYXV0aFN0YXRlLm5vbmNlO1xuICAgICAgb2F1dGgucGtjZUNvZGVWZXJpZmllciA9IG9hdXRoU3RhdGUucGtjZUNvZGVWZXJpZmllcjtcbiAgICB9XG5cbiAgICByZXR1cm4gb2F1dGg7XG4gIH1cblxuICBzZXRUb2tlbiA9ICh0b2tlbkRhdGEsIHRpbWVMb2NhbCkgPT4ge1xuICAgIGNvbnN0IGRhdGEgPSB7Li4udG9rZW5EYXRhfTtcbiAgICBpZiAoZGF0YS5yZWZyZXNoX3Rva2VuKSB7XG4gICAgICBkYXRhLnJlZnJlc2hfdG9rZW5fcGFyc2VkID0gZGVjb2RlVG9rZW4oZGF0YS5yZWZyZXNoX3Rva2VuKTtcbiAgICB9XG4gICAgaWYgKGRhdGEuaWRfdG9rZW4pIHtcbiAgICAgIGRhdGEuaWRfdG9rZW5fcGFyc2VkID0gZGVjb2RlVG9rZW4oZGF0YS5pZF90b2tlbik7XG4gICAgfVxuICAgIGlmIChkYXRhLmFjY2Vzc190b2tlbikge1xuICAgICAgZGF0YS50b2tlbl9wYXJzZWQgPSBkZWNvZGVUb2tlbihkYXRhLmFjY2Vzc190b2tlbik7XG4gICAgICBkYXRhLmF1dGhlbnRpY2F0ZWQgPSB0cnVlO1xuICAgICAgaWYgKHRpbWVMb2NhbCkge1xuICAgICAgICBkYXRhLnRpbWVTa2V3ID0gTWF0aC5mbG9vcih0aW1lTG9jYWwgLyAxMDAwKSAtIGRhdGEudG9rZW5fcGFyc2VkLmlhdDtcbiAgICAgIH1cbiAgICAgIHRoaXMudG9rZW5TdG9yYWdlLmFkZChkYXRhKTtcbiAgICAgIHJldHVybiBkYXRhO1xuICAgIH1cbiAgfVxuXG4gIGF1dGhTdWNjZXNzID0gKHRva2VuRGF0YSkgPT4geyAvL3thY2Nlc3NfdG9rZW4sIGV4cGlyZXNfaW4sIHJlZnJlc2hfdG9rZW4sIHJlZnJlc2hfZXhwaXJlc19pbiwgdG9rZW5fdHlwZSwgaWRfdG9rZW4sIHNlc3Npb25fc3RhdGUsIHNjb3BlLCB0aW1lTG9jYWw6b2xkVGltZUxvY2FsLCBzdG9yZWROb25jZX0pID0+IHtcbiAgICBpZih0b2tlbkRhdGEpIHtcbiAgICBjb25zdCB0aW1lTG9jYWwgPSAodG9rZW5EYXRhLnRpbWVMb2NhbCArIG5ldyBEYXRlKCkuZ2V0VGltZSgpKSAvIDI7XG4gICAgY29uc3QgZGF0YSA9IHRoaXMuc2V0VG9rZW4odG9rZW5EYXRhLCB0aW1lTG9jYWwpO1xuICAgIGlmIChkYXRhICYmIGRhdGEuYXV0aGVudGljYXRlZCAmJiAoKGRhdGEudG9rZW5fcGFyc2VkICYmIGRhdGEudG9rZW5fcGFyc2VkLm5vbmNlID09PSB0b2tlbkRhdGEuc3RvcmVkTm9uY2UpIHx8XG4gICAgICAgIChkYXRhLnJlZnJlc2hfdG9rZW5fcGFyc2VkICYmIGRhdGEucmVmcmVzaF90b2tlbl9wYXJzZWQubm9uY2UgPT09IHRva2VuRGF0YS5zdG9yZWROb25jZSkgfHxcbiAgICAgICAgKGRhdGEuaWRfdG9rZW5fcGFyc2VkICYmIGRhdGEuaWRfdG9rZW5fcGFyc2VkLm5vbmNlID09PSB0b2tlbkRhdGEuc3RvcmVkTm9uY2UpKSkge1xuICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgIH1cbiAgICB9XG4gICAgdGhpcy50b2tlblN0b3JhZ2UucmVtb3ZlKCk7XG4gICAgcmV0dXJuIGZhbHNlO1xuICB9XG5cbiAgcHJvY2Vzc0NhbGxiYWNrID0gKG9hdXRoKSA9PiB7XG4gICAgY29uc3Qge2NvZGUsIGVycm9yLCBzdG9yZWROb25jZX0gPSBvYXV0aDtcbiAgICBjb25zdCB0aW1lTG9jYWwgPSBuZXcgRGF0ZSgpLmdldFRpbWUoKTtcbiAgICBpZiAoZXJyb3IpIHtcbiAgICAgIC8vICAgY29uc3QgZXJyb3JEYXRhID0geyBlcnJvcjogZXJyb3IsIGVycm9yX2Rlc2NyaXB0aW9uOiBvYXV0aC5lcnJvcl9kZXNjcmlwdGlvbiB9O1xuICAgICAgLy8gICB0aGlzLm9uQXV0aEVycm9yICYmIHRoaXMub25BdXRoRXJyb3IoZXJyb3JEYXRhKTtcbiAgICAgIC8vICAgcHJvbWlzZSAmJiBwcm9taXNlLnNldEVycm9yKGVycm9yRGF0YSk7XG4gICAgICAvLyB9IGVsc2Uge1xuICAgICAgLy8gICBwcm9taXNlICYmIHByb21pc2Uuc2V0U3VjY2VzcygpO1xuICAgICAgLy8gfVxuICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICBpZiAoY29kZSkge1xuICAgICAgLy8g0LLRi9GF0L7QtNC40Lwg0LjQtyDQutC70LDRgdGB0LAg0Lgg0L7QsdC80LXQvdC40LLQsNC10Lwg0LHQuNC70LXRgiDQvdCwINGC0L7QutC10L0g0YfQtdGA0LXQtyDQsdC10LrQtdC90LRcbiAgICAgIHRoaXMuZXhjaGFuZ2VDb2RlKGNvZGUsIG9hdXRoLnBrY2VDb2RlVmVyaWZpZXIsIHRpbWVMb2NhbCwgc3RvcmVkTm9uY2UpO1xuICAgICAgcmV0dXJuIGNvZGU7XG4gICAgfVxuICB9XG5cbiAgcHJvY2Vzc0luaXQgPSAoKSA9PiB7XG4gICAgY29uc3Qgb2F1dGggPSB0aGlzLnBhcnNlQ2FsbGJhY2sod2luZG93LmxvY2F0aW9uLmhyZWYpO1xuICAgIGlmIChvYXV0aCkge1xuICAgICAgLy8g0YHQvNC+0YLRgNC40Lwg0LXRgdGC0Ywg0LvQuCDRgdGB0YvQu9C60LAg0YEg0LrQvtC70LHRjdC60L7QvFxuICAgICAgd2luZG93Lmhpc3RvcnkucmVwbGFjZVN0YXRlKHdpbmRvdy5oaXN0b3J5LnN0YXRlLCBudWxsLCBvYXV0aC5uZXdVcmwpO1xuICAgICAgaWYgKG9hdXRoICYmIG9hdXRoLnZhbGlkKSB7XG4gICAgICAgIGNvbnN0IGNvZGUgPSB0aGlzLnByb2Nlc3NDYWxsYmFjayhvYXV0aCk7XG4gICAgICAgIGlmKGNvZGUpe1xuICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1lbHNle1xuICAgICAgLy8g0YHQvNC+0YLRgNC40Lwg0LXRgdGC0Ywg0LvQuCDQsiDRgdGC0L7RgNC10LnQtNC20LUg0YLQvtC60LXQvdGLINC4INC/0YDQvtCz0L7QvdGP0LXQvCDQuNGFINC/0L4g0L/RgNC40LvQvtC20LXQvdC40Y5cbiAgICAgIGNvbnN0IHRva2VuRGF0YSA9IHRoaXMudG9rZW5TdG9yYWdlLmdldCgpO1xuICAgICAgaWYodG9rZW5EYXRhKXtcbiAgICAgICAgaWYoaXNUb2tlbkV4cGlyZWQodG9rZW5EYXRhKSl7XG4gICAgICAgICAgdGhpcy50b2tlblN0b3JhZ2UucmVtb3ZlKCk7XG4gICAgICAgIH1lbHNle1xuICAgICAgICAgIHRoaXMudmVyaWZ5VG9rZW4odG9rZW5EYXRhKTtcbiAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG4gICAgdGhpcy5zZXRJbml0aWFsaXplZCgpO1xuICB9XG5cbn1cblxuZXhwb3J0IGRlZmF1bHQgU2ltcGxlS2V5Y2xvYWs7XG4iLCIndXNlIHN0cmljdCdcblxuZXhwb3J0cy5ieXRlTGVuZ3RoID0gYnl0ZUxlbmd0aFxuZXhwb3J0cy50b0J5dGVBcnJheSA9IHRvQnl0ZUFycmF5XG5leHBvcnRzLmZyb21CeXRlQXJyYXkgPSBmcm9tQnl0ZUFycmF5XG5cbnZhciBsb29rdXAgPSBbXVxudmFyIHJldkxvb2t1cCA9IFtdXG52YXIgQXJyID0gdHlwZW9mIFVpbnQ4QXJyYXkgIT09ICd1bmRlZmluZWQnID8gVWludDhBcnJheSA6IEFycmF5XG5cbnZhciBjb2RlID0gJ0FCQ0RFRkdISUpLTE1OT1BRUlNUVVZXWFlaYWJjZGVmZ2hpamtsbW5vcHFyc3R1dnd4eXowMTIzNDU2Nzg5Ky8nXG5mb3IgKHZhciBpID0gMCwgbGVuID0gY29kZS5sZW5ndGg7IGkgPCBsZW47ICsraSkge1xuICBsb29rdXBbaV0gPSBjb2RlW2ldXG4gIHJldkxvb2t1cFtjb2RlLmNoYXJDb2RlQXQoaSldID0gaVxufVxuXG4vLyBTdXBwb3J0IGRlY29kaW5nIFVSTC1zYWZlIGJhc2U2NCBzdHJpbmdzLCBhcyBOb2RlLmpzIGRvZXMuXG4vLyBTZWU6IGh0dHBzOi8vZW4ud2lraXBlZGlhLm9yZy93aWtpL0Jhc2U2NCNVUkxfYXBwbGljYXRpb25zXG5yZXZMb29rdXBbJy0nLmNoYXJDb2RlQXQoMCldID0gNjJcbnJldkxvb2t1cFsnXycuY2hhckNvZGVBdCgwKV0gPSA2M1xuXG5mdW5jdGlvbiBnZXRMZW5zIChiNjQpIHtcbiAgdmFyIGxlbiA9IGI2NC5sZW5ndGhcblxuICBpZiAobGVuICUgNCA+IDApIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoJ0ludmFsaWQgc3RyaW5nLiBMZW5ndGggbXVzdCBiZSBhIG11bHRpcGxlIG9mIDQnKVxuICB9XG5cbiAgLy8gVHJpbSBvZmYgZXh0cmEgYnl0ZXMgYWZ0ZXIgcGxhY2Vob2xkZXIgYnl0ZXMgYXJlIGZvdW5kXG4gIC8vIFNlZTogaHR0cHM6Ly9naXRodWIuY29tL2JlYXRnYW1taXQvYmFzZTY0LWpzL2lzc3Vlcy80MlxuICB2YXIgdmFsaWRMZW4gPSBiNjQuaW5kZXhPZignPScpXG4gIGlmICh2YWxpZExlbiA9PT0gLTEpIHZhbGlkTGVuID0gbGVuXG5cbiAgdmFyIHBsYWNlSG9sZGVyc0xlbiA9IHZhbGlkTGVuID09PSBsZW5cbiAgICA/IDBcbiAgICA6IDQgLSAodmFsaWRMZW4gJSA0KVxuXG4gIHJldHVybiBbdmFsaWRMZW4sIHBsYWNlSG9sZGVyc0xlbl1cbn1cblxuLy8gYmFzZTY0IGlzIDQvMyArIHVwIHRvIHR3byBjaGFyYWN0ZXJzIG9mIHRoZSBvcmlnaW5hbCBkYXRhXG5mdW5jdGlvbiBieXRlTGVuZ3RoIChiNjQpIHtcbiAgdmFyIGxlbnMgPSBnZXRMZW5zKGI2NClcbiAgdmFyIHZhbGlkTGVuID0gbGVuc1swXVxuICB2YXIgcGxhY2VIb2xkZXJzTGVuID0gbGVuc1sxXVxuICByZXR1cm4gKCh2YWxpZExlbiArIHBsYWNlSG9sZGVyc0xlbikgKiAzIC8gNCkgLSBwbGFjZUhvbGRlcnNMZW5cbn1cblxuZnVuY3Rpb24gX2J5dGVMZW5ndGggKGI2NCwgdmFsaWRMZW4sIHBsYWNlSG9sZGVyc0xlbikge1xuICByZXR1cm4gKCh2YWxpZExlbiArIHBsYWNlSG9sZGVyc0xlbikgKiAzIC8gNCkgLSBwbGFjZUhvbGRlcnNMZW5cbn1cblxuZnVuY3Rpb24gdG9CeXRlQXJyYXkgKGI2NCkge1xuICB2YXIgdG1wXG4gIHZhciBsZW5zID0gZ2V0TGVucyhiNjQpXG4gIHZhciB2YWxpZExlbiA9IGxlbnNbMF1cbiAgdmFyIHBsYWNlSG9sZGVyc0xlbiA9IGxlbnNbMV1cblxuICB2YXIgYXJyID0gbmV3IEFycihfYnl0ZUxlbmd0aChiNjQsIHZhbGlkTGVuLCBwbGFjZUhvbGRlcnNMZW4pKVxuXG4gIHZhciBjdXJCeXRlID0gMFxuXG4gIC8vIGlmIHRoZXJlIGFyZSBwbGFjZWhvbGRlcnMsIG9ubHkgZ2V0IHVwIHRvIHRoZSBsYXN0IGNvbXBsZXRlIDQgY2hhcnNcbiAgdmFyIGxlbiA9IHBsYWNlSG9sZGVyc0xlbiA+IDBcbiAgICA/IHZhbGlkTGVuIC0gNFxuICAgIDogdmFsaWRMZW5cblxuICB2YXIgaVxuICBmb3IgKGkgPSAwOyBpIDwgbGVuOyBpICs9IDQpIHtcbiAgICB0bXAgPVxuICAgICAgKHJldkxvb2t1cFtiNjQuY2hhckNvZGVBdChpKV0gPDwgMTgpIHxcbiAgICAgIChyZXZMb29rdXBbYjY0LmNoYXJDb2RlQXQoaSArIDEpXSA8PCAxMikgfFxuICAgICAgKHJldkxvb2t1cFtiNjQuY2hhckNvZGVBdChpICsgMildIDw8IDYpIHxcbiAgICAgIHJldkxvb2t1cFtiNjQuY2hhckNvZGVBdChpICsgMyldXG4gICAgYXJyW2N1ckJ5dGUrK10gPSAodG1wID4+IDE2KSAmIDB4RkZcbiAgICBhcnJbY3VyQnl0ZSsrXSA9ICh0bXAgPj4gOCkgJiAweEZGXG4gICAgYXJyW2N1ckJ5dGUrK10gPSB0bXAgJiAweEZGXG4gIH1cblxuICBpZiAocGxhY2VIb2xkZXJzTGVuID09PSAyKSB7XG4gICAgdG1wID1cbiAgICAgIChyZXZMb29rdXBbYjY0LmNoYXJDb2RlQXQoaSldIDw8IDIpIHxcbiAgICAgIChyZXZMb29rdXBbYjY0LmNoYXJDb2RlQXQoaSArIDEpXSA+PiA0KVxuICAgIGFycltjdXJCeXRlKytdID0gdG1wICYgMHhGRlxuICB9XG5cbiAgaWYgKHBsYWNlSG9sZGVyc0xlbiA9PT0gMSkge1xuICAgIHRtcCA9XG4gICAgICAocmV2TG9va3VwW2I2NC5jaGFyQ29kZUF0KGkpXSA8PCAxMCkgfFxuICAgICAgKHJldkxvb2t1cFtiNjQuY2hhckNvZGVBdChpICsgMSldIDw8IDQpIHxcbiAgICAgIChyZXZMb29rdXBbYjY0LmNoYXJDb2RlQXQoaSArIDIpXSA+PiAyKVxuICAgIGFycltjdXJCeXRlKytdID0gKHRtcCA+PiA4KSAmIDB4RkZcbiAgICBhcnJbY3VyQnl0ZSsrXSA9IHRtcCAmIDB4RkZcbiAgfVxuXG4gIHJldHVybiBhcnJcbn1cblxuZnVuY3Rpb24gdHJpcGxldFRvQmFzZTY0IChudW0pIHtcbiAgcmV0dXJuIGxvb2t1cFtudW0gPj4gMTggJiAweDNGXSArXG4gICAgbG9va3VwW251bSA+PiAxMiAmIDB4M0ZdICtcbiAgICBsb29rdXBbbnVtID4+IDYgJiAweDNGXSArXG4gICAgbG9va3VwW251bSAmIDB4M0ZdXG59XG5cbmZ1bmN0aW9uIGVuY29kZUNodW5rICh1aW50OCwgc3RhcnQsIGVuZCkge1xuICB2YXIgdG1wXG4gIHZhciBvdXRwdXQgPSBbXVxuICBmb3IgKHZhciBpID0gc3RhcnQ7IGkgPCBlbmQ7IGkgKz0gMykge1xuICAgIHRtcCA9XG4gICAgICAoKHVpbnQ4W2ldIDw8IDE2KSAmIDB4RkYwMDAwKSArXG4gICAgICAoKHVpbnQ4W2kgKyAxXSA8PCA4KSAmIDB4RkYwMCkgK1xuICAgICAgKHVpbnQ4W2kgKyAyXSAmIDB4RkYpXG4gICAgb3V0cHV0LnB1c2godHJpcGxldFRvQmFzZTY0KHRtcCkpXG4gIH1cbiAgcmV0dXJuIG91dHB1dC5qb2luKCcnKVxufVxuXG5mdW5jdGlvbiBmcm9tQnl0ZUFycmF5ICh1aW50OCkge1xuICB2YXIgdG1wXG4gIHZhciBsZW4gPSB1aW50OC5sZW5ndGhcbiAgdmFyIGV4dHJhQnl0ZXMgPSBsZW4gJSAzIC8vIGlmIHdlIGhhdmUgMSBieXRlIGxlZnQsIHBhZCAyIGJ5dGVzXG4gIHZhciBwYXJ0cyA9IFtdXG4gIHZhciBtYXhDaHVua0xlbmd0aCA9IDE2MzgzIC8vIG11c3QgYmUgbXVsdGlwbGUgb2YgM1xuXG4gIC8vIGdvIHRocm91Z2ggdGhlIGFycmF5IGV2ZXJ5IHRocmVlIGJ5dGVzLCB3ZSdsbCBkZWFsIHdpdGggdHJhaWxpbmcgc3R1ZmYgbGF0ZXJcbiAgZm9yICh2YXIgaSA9IDAsIGxlbjIgPSBsZW4gLSBleHRyYUJ5dGVzOyBpIDwgbGVuMjsgaSArPSBtYXhDaHVua0xlbmd0aCkge1xuICAgIHBhcnRzLnB1c2goZW5jb2RlQ2h1bmsodWludDgsIGksIChpICsgbWF4Q2h1bmtMZW5ndGgpID4gbGVuMiA/IGxlbjIgOiAoaSArIG1heENodW5rTGVuZ3RoKSkpXG4gIH1cblxuICAvLyBwYWQgdGhlIGVuZCB3aXRoIHplcm9zLCBidXQgbWFrZSBzdXJlIHRvIG5vdCBmb3JnZXQgdGhlIGV4dHJhIGJ5dGVzXG4gIGlmIChleHRyYUJ5dGVzID09PSAxKSB7XG4gICAgdG1wID0gdWludDhbbGVuIC0gMV1cbiAgICBwYXJ0cy5wdXNoKFxuICAgICAgbG9va3VwW3RtcCA+PiAyXSArXG4gICAgICBsb29rdXBbKHRtcCA8PCA0KSAmIDB4M0ZdICtcbiAgICAgICc9PSdcbiAgICApXG4gIH0gZWxzZSBpZiAoZXh0cmFCeXRlcyA9PT0gMikge1xuICAgIHRtcCA9ICh1aW50OFtsZW4gLSAyXSA8PCA4KSArIHVpbnQ4W2xlbiAtIDFdXG4gICAgcGFydHMucHVzaChcbiAgICAgIGxvb2t1cFt0bXAgPj4gMTBdICtcbiAgICAgIGxvb2t1cFsodG1wID4+IDQpICYgMHgzRl0gK1xuICAgICAgbG9va3VwWyh0bXAgPDwgMikgJiAweDNGXSArXG4gICAgICAnPSdcbiAgICApXG4gIH1cblxuICByZXR1cm4gcGFydHMuam9pbignJylcbn1cbiIsIi8qKlxuICogW2pzLXNoYTI1Nl17QGxpbmsgaHR0cHM6Ly9naXRodWIuY29tL2VtbjE3OC9qcy1zaGEyNTZ9XG4gKlxuICogQHZlcnNpb24gMC45LjBcbiAqIEBhdXRob3IgQ2hlbiwgWWktQ3l1YW4gW2VtbjE3OEBnbWFpbC5jb21dXG4gKiBAY29weXJpZ2h0IENoZW4sIFlpLUN5dWFuIDIwMTQtMjAxN1xuICogQGxpY2Vuc2UgTUlUXG4gKi9cbi8qanNsaW50IGJpdHdpc2U6IHRydWUgKi9cbihmdW5jdGlvbiAoKSB7XG4gICd1c2Ugc3RyaWN0JztcblxuICB2YXIgRVJST1IgPSAnaW5wdXQgaXMgaW52YWxpZCB0eXBlJztcbiAgdmFyIFdJTkRPVyA9IHR5cGVvZiB3aW5kb3cgPT09ICdvYmplY3QnO1xuICB2YXIgcm9vdCA9IFdJTkRPVyA/IHdpbmRvdyA6IHt9O1xuICBpZiAocm9vdC5KU19TSEEyNTZfTk9fV0lORE9XKSB7XG4gICAgV0lORE9XID0gZmFsc2U7XG4gIH1cbiAgdmFyIFdFQl9XT1JLRVIgPSAhV0lORE9XICYmIHR5cGVvZiBzZWxmID09PSAnb2JqZWN0JztcbiAgdmFyIE5PREVfSlMgPSAhcm9vdC5KU19TSEEyNTZfTk9fTk9ERV9KUyAmJiB0eXBlb2YgcHJvY2VzcyA9PT0gJ29iamVjdCcgJiYgcHJvY2Vzcy52ZXJzaW9ucyAmJiBwcm9jZXNzLnZlcnNpb25zLm5vZGU7XG4gIGlmIChOT0RFX0pTKSB7XG4gICAgcm9vdCA9IGdsb2JhbDtcbiAgfSBlbHNlIGlmIChXRUJfV09SS0VSKSB7XG4gICAgcm9vdCA9IHNlbGY7XG4gIH1cbiAgdmFyIENPTU1PTl9KUyA9ICFyb290LkpTX1NIQTI1Nl9OT19DT01NT05fSlMgJiYgdHlwZW9mIG1vZHVsZSA9PT0gJ29iamVjdCcgJiYgbW9kdWxlLmV4cG9ydHM7XG4gIHZhciBBTUQgPSB0eXBlb2YgZGVmaW5lID09PSAnZnVuY3Rpb24nICYmIGRlZmluZS5hbWQ7XG4gIHZhciBBUlJBWV9CVUZGRVIgPSAhcm9vdC5KU19TSEEyNTZfTk9fQVJSQVlfQlVGRkVSICYmIHR5cGVvZiBBcnJheUJ1ZmZlciAhPT0gJ3VuZGVmaW5lZCc7XG4gIHZhciBIRVhfQ0hBUlMgPSAnMDEyMzQ1Njc4OWFiY2RlZicuc3BsaXQoJycpO1xuICB2YXIgRVhUUkEgPSBbLTIxNDc0ODM2NDgsIDgzODg2MDgsIDMyNzY4LCAxMjhdO1xuICB2YXIgU0hJRlQgPSBbMjQsIDE2LCA4LCAwXTtcbiAgdmFyIEsgPSBbXG4gICAgMHg0MjhhMmY5OCwgMHg3MTM3NDQ5MSwgMHhiNWMwZmJjZiwgMHhlOWI1ZGJhNSwgMHgzOTU2YzI1YiwgMHg1OWYxMTFmMSwgMHg5MjNmODJhNCwgMHhhYjFjNWVkNSxcbiAgICAweGQ4MDdhYTk4LCAweDEyODM1YjAxLCAweDI0MzE4NWJlLCAweDU1MGM3ZGMzLCAweDcyYmU1ZDc0LCAweDgwZGViMWZlLCAweDliZGMwNmE3LCAweGMxOWJmMTc0LFxuICAgIDB4ZTQ5YjY5YzEsIDB4ZWZiZTQ3ODYsIDB4MGZjMTlkYzYsIDB4MjQwY2ExY2MsIDB4MmRlOTJjNmYsIDB4NGE3NDg0YWEsIDB4NWNiMGE5ZGMsIDB4NzZmOTg4ZGEsXG4gICAgMHg5ODNlNTE1MiwgMHhhODMxYzY2ZCwgMHhiMDAzMjdjOCwgMHhiZjU5N2ZjNywgMHhjNmUwMGJmMywgMHhkNWE3OTE0NywgMHgwNmNhNjM1MSwgMHgxNDI5Mjk2NyxcbiAgICAweDI3YjcwYTg1LCAweDJlMWIyMTM4LCAweDRkMmM2ZGZjLCAweDUzMzgwZDEzLCAweDY1MGE3MzU0LCAweDc2NmEwYWJiLCAweDgxYzJjOTJlLCAweDkyNzIyYzg1LFxuICAgIDB4YTJiZmU4YTEsIDB4YTgxYTY2NGIsIDB4YzI0YjhiNzAsIDB4Yzc2YzUxYTMsIDB4ZDE5MmU4MTksIDB4ZDY5OTA2MjQsIDB4ZjQwZTM1ODUsIDB4MTA2YWEwNzAsXG4gICAgMHgxOWE0YzExNiwgMHgxZTM3NmMwOCwgMHgyNzQ4Nzc0YywgMHgzNGIwYmNiNSwgMHgzOTFjMGNiMywgMHg0ZWQ4YWE0YSwgMHg1YjljY2E0ZiwgMHg2ODJlNmZmMyxcbiAgICAweDc0OGY4MmVlLCAweDc4YTU2MzZmLCAweDg0Yzg3ODE0LCAweDhjYzcwMjA4LCAweDkwYmVmZmZhLCAweGE0NTA2Y2ViLCAweGJlZjlhM2Y3LCAweGM2NzE3OGYyXG4gIF07XG4gIHZhciBPVVRQVVRfVFlQRVMgPSBbJ2hleCcsICdhcnJheScsICdkaWdlc3QnLCAnYXJyYXlCdWZmZXInXTtcblxuICB2YXIgYmxvY2tzID0gW107XG5cbiAgaWYgKHJvb3QuSlNfU0hBMjU2X05PX05PREVfSlMgfHwgIUFycmF5LmlzQXJyYXkpIHtcbiAgICBBcnJheS5pc0FycmF5ID0gZnVuY3Rpb24gKG9iaikge1xuICAgICAgcmV0dXJuIE9iamVjdC5wcm90b3R5cGUudG9TdHJpbmcuY2FsbChvYmopID09PSAnW29iamVjdCBBcnJheV0nO1xuICAgIH07XG4gIH1cblxuICBpZiAoQVJSQVlfQlVGRkVSICYmIChyb290LkpTX1NIQTI1Nl9OT19BUlJBWV9CVUZGRVJfSVNfVklFVyB8fCAhQXJyYXlCdWZmZXIuaXNWaWV3KSkge1xuICAgIEFycmF5QnVmZmVyLmlzVmlldyA9IGZ1bmN0aW9uIChvYmopIHtcbiAgICAgIHJldHVybiB0eXBlb2Ygb2JqID09PSAnb2JqZWN0JyAmJiBvYmouYnVmZmVyICYmIG9iai5idWZmZXIuY29uc3RydWN0b3IgPT09IEFycmF5QnVmZmVyO1xuICAgIH07XG4gIH1cblxuICB2YXIgY3JlYXRlT3V0cHV0TWV0aG9kID0gZnVuY3Rpb24gKG91dHB1dFR5cGUsIGlzMjI0KSB7XG4gICAgcmV0dXJuIGZ1bmN0aW9uIChtZXNzYWdlKSB7XG4gICAgICByZXR1cm4gbmV3IFNoYTI1NihpczIyNCwgdHJ1ZSkudXBkYXRlKG1lc3NhZ2UpW291dHB1dFR5cGVdKCk7XG4gICAgfTtcbiAgfTtcblxuICB2YXIgY3JlYXRlTWV0aG9kID0gZnVuY3Rpb24gKGlzMjI0KSB7XG4gICAgdmFyIG1ldGhvZCA9IGNyZWF0ZU91dHB1dE1ldGhvZCgnaGV4JywgaXMyMjQpO1xuICAgIGlmIChOT0RFX0pTKSB7XG4gICAgICBtZXRob2QgPSBub2RlV3JhcChtZXRob2QsIGlzMjI0KTtcbiAgICB9XG4gICAgbWV0aG9kLmNyZWF0ZSA9IGZ1bmN0aW9uICgpIHtcbiAgICAgIHJldHVybiBuZXcgU2hhMjU2KGlzMjI0KTtcbiAgICB9O1xuICAgIG1ldGhvZC51cGRhdGUgPSBmdW5jdGlvbiAobWVzc2FnZSkge1xuICAgICAgcmV0dXJuIG1ldGhvZC5jcmVhdGUoKS51cGRhdGUobWVzc2FnZSk7XG4gICAgfTtcbiAgICBmb3IgKHZhciBpID0gMDsgaSA8IE9VVFBVVF9UWVBFUy5sZW5ndGg7ICsraSkge1xuICAgICAgdmFyIHR5cGUgPSBPVVRQVVRfVFlQRVNbaV07XG4gICAgICBtZXRob2RbdHlwZV0gPSBjcmVhdGVPdXRwdXRNZXRob2QodHlwZSwgaXMyMjQpO1xuICAgIH1cbiAgICByZXR1cm4gbWV0aG9kO1xuICB9O1xuXG4gIHZhciBub2RlV3JhcCA9IGZ1bmN0aW9uIChtZXRob2QsIGlzMjI0KSB7XG4gICAgdmFyIGNyeXB0byA9IGV2YWwoXCJyZXF1aXJlKCdjcnlwdG8nKVwiKTtcbiAgICB2YXIgQnVmZmVyID0gZXZhbChcInJlcXVpcmUoJ2J1ZmZlcicpLkJ1ZmZlclwiKTtcbiAgICB2YXIgYWxnb3JpdGhtID0gaXMyMjQgPyAnc2hhMjI0JyA6ICdzaGEyNTYnO1xuICAgIHZhciBub2RlTWV0aG9kID0gZnVuY3Rpb24gKG1lc3NhZ2UpIHtcbiAgICAgIGlmICh0eXBlb2YgbWVzc2FnZSA9PT0gJ3N0cmluZycpIHtcbiAgICAgICAgcmV0dXJuIGNyeXB0by5jcmVhdGVIYXNoKGFsZ29yaXRobSkudXBkYXRlKG1lc3NhZ2UsICd1dGY4JykuZGlnZXN0KCdoZXgnKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGlmIChtZXNzYWdlID09PSBudWxsIHx8IG1lc3NhZ2UgPT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgIHRocm93IG5ldyBFcnJvcihFUlJPUik7XG4gICAgICAgIH0gZWxzZSBpZiAobWVzc2FnZS5jb25zdHJ1Y3RvciA9PT0gQXJyYXlCdWZmZXIpIHtcbiAgICAgICAgICBtZXNzYWdlID0gbmV3IFVpbnQ4QXJyYXkobWVzc2FnZSk7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICAgIGlmIChBcnJheS5pc0FycmF5KG1lc3NhZ2UpIHx8IEFycmF5QnVmZmVyLmlzVmlldyhtZXNzYWdlKSB8fFxuICAgICAgICBtZXNzYWdlLmNvbnN0cnVjdG9yID09PSBCdWZmZXIpIHtcbiAgICAgICAgcmV0dXJuIGNyeXB0by5jcmVhdGVIYXNoKGFsZ29yaXRobSkudXBkYXRlKG5ldyBCdWZmZXIobWVzc2FnZSkpLmRpZ2VzdCgnaGV4Jyk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICByZXR1cm4gbWV0aG9kKG1lc3NhZ2UpO1xuICAgICAgfVxuICAgIH07XG4gICAgcmV0dXJuIG5vZGVNZXRob2Q7XG4gIH07XG5cbiAgdmFyIGNyZWF0ZUhtYWNPdXRwdXRNZXRob2QgPSBmdW5jdGlvbiAob3V0cHV0VHlwZSwgaXMyMjQpIHtcbiAgICByZXR1cm4gZnVuY3Rpb24gKGtleSwgbWVzc2FnZSkge1xuICAgICAgcmV0dXJuIG5ldyBIbWFjU2hhMjU2KGtleSwgaXMyMjQsIHRydWUpLnVwZGF0ZShtZXNzYWdlKVtvdXRwdXRUeXBlXSgpO1xuICAgIH07XG4gIH07XG5cbiAgdmFyIGNyZWF0ZUhtYWNNZXRob2QgPSBmdW5jdGlvbiAoaXMyMjQpIHtcbiAgICB2YXIgbWV0aG9kID0gY3JlYXRlSG1hY091dHB1dE1ldGhvZCgnaGV4JywgaXMyMjQpO1xuICAgIG1ldGhvZC5jcmVhdGUgPSBmdW5jdGlvbiAoa2V5KSB7XG4gICAgICByZXR1cm4gbmV3IEhtYWNTaGEyNTYoa2V5LCBpczIyNCk7XG4gICAgfTtcbiAgICBtZXRob2QudXBkYXRlID0gZnVuY3Rpb24gKGtleSwgbWVzc2FnZSkge1xuICAgICAgcmV0dXJuIG1ldGhvZC5jcmVhdGUoa2V5KS51cGRhdGUobWVzc2FnZSk7XG4gICAgfTtcbiAgICBmb3IgKHZhciBpID0gMDsgaSA8IE9VVFBVVF9UWVBFUy5sZW5ndGg7ICsraSkge1xuICAgICAgdmFyIHR5cGUgPSBPVVRQVVRfVFlQRVNbaV07XG4gICAgICBtZXRob2RbdHlwZV0gPSBjcmVhdGVIbWFjT3V0cHV0TWV0aG9kKHR5cGUsIGlzMjI0KTtcbiAgICB9XG4gICAgcmV0dXJuIG1ldGhvZDtcbiAgfTtcblxuICBmdW5jdGlvbiBTaGEyNTYoaXMyMjQsIHNoYXJlZE1lbW9yeSkge1xuICAgIGlmIChzaGFyZWRNZW1vcnkpIHtcbiAgICAgIGJsb2Nrc1swXSA9IGJsb2Nrc1sxNl0gPSBibG9ja3NbMV0gPSBibG9ja3NbMl0gPSBibG9ja3NbM10gPVxuICAgICAgICBibG9ja3NbNF0gPSBibG9ja3NbNV0gPSBibG9ja3NbNl0gPSBibG9ja3NbN10gPVxuICAgICAgICBibG9ja3NbOF0gPSBibG9ja3NbOV0gPSBibG9ja3NbMTBdID0gYmxvY2tzWzExXSA9XG4gICAgICAgIGJsb2Nrc1sxMl0gPSBibG9ja3NbMTNdID0gYmxvY2tzWzE0XSA9IGJsb2Nrc1sxNV0gPSAwO1xuICAgICAgdGhpcy5ibG9ja3MgPSBibG9ja3M7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMuYmxvY2tzID0gWzAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDBdO1xuICAgIH1cblxuICAgIGlmIChpczIyNCkge1xuICAgICAgdGhpcy5oMCA9IDB4YzEwNTllZDg7XG4gICAgICB0aGlzLmgxID0gMHgzNjdjZDUwNztcbiAgICAgIHRoaXMuaDIgPSAweDMwNzBkZDE3O1xuICAgICAgdGhpcy5oMyA9IDB4ZjcwZTU5Mzk7XG4gICAgICB0aGlzLmg0ID0gMHhmZmMwMGIzMTtcbiAgICAgIHRoaXMuaDUgPSAweDY4NTgxNTExO1xuICAgICAgdGhpcy5oNiA9IDB4NjRmOThmYTc7XG4gICAgICB0aGlzLmg3ID0gMHhiZWZhNGZhNDtcbiAgICB9IGVsc2UgeyAvLyAyNTZcbiAgICAgIHRoaXMuaDAgPSAweDZhMDllNjY3O1xuICAgICAgdGhpcy5oMSA9IDB4YmI2N2FlODU7XG4gICAgICB0aGlzLmgyID0gMHgzYzZlZjM3MjtcbiAgICAgIHRoaXMuaDMgPSAweGE1NGZmNTNhO1xuICAgICAgdGhpcy5oNCA9IDB4NTEwZTUyN2Y7XG4gICAgICB0aGlzLmg1ID0gMHg5YjA1Njg4YztcbiAgICAgIHRoaXMuaDYgPSAweDFmODNkOWFiO1xuICAgICAgdGhpcy5oNyA9IDB4NWJlMGNkMTk7XG4gICAgfVxuXG4gICAgdGhpcy5ibG9jayA9IHRoaXMuc3RhcnQgPSB0aGlzLmJ5dGVzID0gdGhpcy5oQnl0ZXMgPSAwO1xuICAgIHRoaXMuZmluYWxpemVkID0gdGhpcy5oYXNoZWQgPSBmYWxzZTtcbiAgICB0aGlzLmZpcnN0ID0gdHJ1ZTtcbiAgICB0aGlzLmlzMjI0ID0gaXMyMjQ7XG4gIH1cblxuICBTaGEyNTYucHJvdG90eXBlLnVwZGF0ZSA9IGZ1bmN0aW9uIChtZXNzYWdlKSB7XG4gICAgaWYgKHRoaXMuZmluYWxpemVkKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuICAgIHZhciBub3RTdHJpbmcsIHR5cGUgPSB0eXBlb2YgbWVzc2FnZTtcbiAgICBpZiAodHlwZSAhPT0gJ3N0cmluZycpIHtcbiAgICAgIGlmICh0eXBlID09PSAnb2JqZWN0Jykge1xuICAgICAgICBpZiAobWVzc2FnZSA9PT0gbnVsbCkge1xuICAgICAgICAgIHRocm93IG5ldyBFcnJvcihFUlJPUik7XG4gICAgICAgIH0gZWxzZSBpZiAoQVJSQVlfQlVGRkVSICYmIG1lc3NhZ2UuY29uc3RydWN0b3IgPT09IEFycmF5QnVmZmVyKSB7XG4gICAgICAgICAgbWVzc2FnZSA9IG5ldyBVaW50OEFycmF5KG1lc3NhZ2UpO1xuICAgICAgICB9IGVsc2UgaWYgKCFBcnJheS5pc0FycmF5KG1lc3NhZ2UpKSB7XG4gICAgICAgICAgaWYgKCFBUlJBWV9CVUZGRVIgfHwgIUFycmF5QnVmZmVyLmlzVmlldyhtZXNzYWdlKSkge1xuICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKEVSUk9SKTtcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHRocm93IG5ldyBFcnJvcihFUlJPUik7XG4gICAgICB9XG4gICAgICBub3RTdHJpbmcgPSB0cnVlO1xuICAgIH1cbiAgICB2YXIgY29kZSwgaW5kZXggPSAwLCBpLCBsZW5ndGggPSBtZXNzYWdlLmxlbmd0aCwgYmxvY2tzID0gdGhpcy5ibG9ja3M7XG5cbiAgICB3aGlsZSAoaW5kZXggPCBsZW5ndGgpIHtcbiAgICAgIGlmICh0aGlzLmhhc2hlZCkge1xuICAgICAgICB0aGlzLmhhc2hlZCA9IGZhbHNlO1xuICAgICAgICBibG9ja3NbMF0gPSB0aGlzLmJsb2NrO1xuICAgICAgICBibG9ja3NbMTZdID0gYmxvY2tzWzFdID0gYmxvY2tzWzJdID0gYmxvY2tzWzNdID1cbiAgICAgICAgICBibG9ja3NbNF0gPSBibG9ja3NbNV0gPSBibG9ja3NbNl0gPSBibG9ja3NbN10gPVxuICAgICAgICAgIGJsb2Nrc1s4XSA9IGJsb2Nrc1s5XSA9IGJsb2Nrc1sxMF0gPSBibG9ja3NbMTFdID1cbiAgICAgICAgICBibG9ja3NbMTJdID0gYmxvY2tzWzEzXSA9IGJsb2Nrc1sxNF0gPSBibG9ja3NbMTVdID0gMDtcbiAgICAgIH1cblxuICAgICAgaWYgKG5vdFN0cmluZykge1xuICAgICAgICBmb3IgKGkgPSB0aGlzLnN0YXJ0OyBpbmRleCA8IGxlbmd0aCAmJiBpIDwgNjQ7ICsraW5kZXgpIHtcbiAgICAgICAgICBibG9ja3NbaSA+PiAyXSB8PSBtZXNzYWdlW2luZGV4XSA8PCBTSElGVFtpKysgJiAzXTtcbiAgICAgICAgfVxuICAgICAgfSBlbHNlIHtcbiAgICAgICAgZm9yIChpID0gdGhpcy5zdGFydDsgaW5kZXggPCBsZW5ndGggJiYgaSA8IDY0OyArK2luZGV4KSB7XG4gICAgICAgICAgY29kZSA9IG1lc3NhZ2UuY2hhckNvZGVBdChpbmRleCk7XG4gICAgICAgICAgaWYgKGNvZGUgPCAweDgwKSB7XG4gICAgICAgICAgICBibG9ja3NbaSA+PiAyXSB8PSBjb2RlIDw8IFNISUZUW2krKyAmIDNdO1xuICAgICAgICAgIH0gZWxzZSBpZiAoY29kZSA8IDB4ODAwKSB7XG4gICAgICAgICAgICBibG9ja3NbaSA+PiAyXSB8PSAoMHhjMCB8IChjb2RlID4+IDYpKSA8PCBTSElGVFtpKysgJiAzXTtcbiAgICAgICAgICAgIGJsb2Nrc1tpID4+IDJdIHw9ICgweDgwIHwgKGNvZGUgJiAweDNmKSkgPDwgU0hJRlRbaSsrICYgM107XG4gICAgICAgICAgfSBlbHNlIGlmIChjb2RlIDwgMHhkODAwIHx8IGNvZGUgPj0gMHhlMDAwKSB7XG4gICAgICAgICAgICBibG9ja3NbaSA+PiAyXSB8PSAoMHhlMCB8IChjb2RlID4+IDEyKSkgPDwgU0hJRlRbaSsrICYgM107XG4gICAgICAgICAgICBibG9ja3NbaSA+PiAyXSB8PSAoMHg4MCB8ICgoY29kZSA+PiA2KSAmIDB4M2YpKSA8PCBTSElGVFtpKysgJiAzXTtcbiAgICAgICAgICAgIGJsb2Nrc1tpID4+IDJdIHw9ICgweDgwIHwgKGNvZGUgJiAweDNmKSkgPDwgU0hJRlRbaSsrICYgM107XG4gICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGNvZGUgPSAweDEwMDAwICsgKCgoY29kZSAmIDB4M2ZmKSA8PCAxMCkgfCAobWVzc2FnZS5jaGFyQ29kZUF0KCsraW5kZXgpICYgMHgzZmYpKTtcbiAgICAgICAgICAgIGJsb2Nrc1tpID4+IDJdIHw9ICgweGYwIHwgKGNvZGUgPj4gMTgpKSA8PCBTSElGVFtpKysgJiAzXTtcbiAgICAgICAgICAgIGJsb2Nrc1tpID4+IDJdIHw9ICgweDgwIHwgKChjb2RlID4+IDEyKSAmIDB4M2YpKSA8PCBTSElGVFtpKysgJiAzXTtcbiAgICAgICAgICAgIGJsb2Nrc1tpID4+IDJdIHw9ICgweDgwIHwgKChjb2RlID4+IDYpICYgMHgzZikpIDw8IFNISUZUW2krKyAmIDNdO1xuICAgICAgICAgICAgYmxvY2tzW2kgPj4gMl0gfD0gKDB4ODAgfCAoY29kZSAmIDB4M2YpKSA8PCBTSElGVFtpKysgJiAzXTtcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH1cblxuICAgICAgdGhpcy5sYXN0Qnl0ZUluZGV4ID0gaTtcbiAgICAgIHRoaXMuYnl0ZXMgKz0gaSAtIHRoaXMuc3RhcnQ7XG4gICAgICBpZiAoaSA+PSA2NCkge1xuICAgICAgICB0aGlzLmJsb2NrID0gYmxvY2tzWzE2XTtcbiAgICAgICAgdGhpcy5zdGFydCA9IGkgLSA2NDtcbiAgICAgICAgdGhpcy5oYXNoKCk7XG4gICAgICAgIHRoaXMuaGFzaGVkID0gdHJ1ZTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHRoaXMuc3RhcnQgPSBpO1xuICAgICAgfVxuICAgIH1cbiAgICBpZiAodGhpcy5ieXRlcyA+IDQyOTQ5NjcyOTUpIHtcbiAgICAgIHRoaXMuaEJ5dGVzICs9IHRoaXMuYnl0ZXMgLyA0Mjk0OTY3Mjk2IDw8IDA7XG4gICAgICB0aGlzLmJ5dGVzID0gdGhpcy5ieXRlcyAlIDQyOTQ5NjcyOTY7XG4gICAgfVxuICAgIHJldHVybiB0aGlzO1xuICB9O1xuXG4gIFNoYTI1Ni5wcm90b3R5cGUuZmluYWxpemUgPSBmdW5jdGlvbiAoKSB7XG4gICAgaWYgKHRoaXMuZmluYWxpemVkKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuICAgIHRoaXMuZmluYWxpemVkID0gdHJ1ZTtcbiAgICB2YXIgYmxvY2tzID0gdGhpcy5ibG9ja3MsIGkgPSB0aGlzLmxhc3RCeXRlSW5kZXg7XG4gICAgYmxvY2tzWzE2XSA9IHRoaXMuYmxvY2s7XG4gICAgYmxvY2tzW2kgPj4gMl0gfD0gRVhUUkFbaSAmIDNdO1xuICAgIHRoaXMuYmxvY2sgPSBibG9ja3NbMTZdO1xuICAgIGlmIChpID49IDU2KSB7XG4gICAgICBpZiAoIXRoaXMuaGFzaGVkKSB7XG4gICAgICAgIHRoaXMuaGFzaCgpO1xuICAgICAgfVxuICAgICAgYmxvY2tzWzBdID0gdGhpcy5ibG9jaztcbiAgICAgIGJsb2Nrc1sxNl0gPSBibG9ja3NbMV0gPSBibG9ja3NbMl0gPSBibG9ja3NbM10gPVxuICAgICAgICBibG9ja3NbNF0gPSBibG9ja3NbNV0gPSBibG9ja3NbNl0gPSBibG9ja3NbN10gPVxuICAgICAgICBibG9ja3NbOF0gPSBibG9ja3NbOV0gPSBibG9ja3NbMTBdID0gYmxvY2tzWzExXSA9XG4gICAgICAgIGJsb2Nrc1sxMl0gPSBibG9ja3NbMTNdID0gYmxvY2tzWzE0XSA9IGJsb2Nrc1sxNV0gPSAwO1xuICAgIH1cbiAgICBibG9ja3NbMTRdID0gdGhpcy5oQnl0ZXMgPDwgMyB8IHRoaXMuYnl0ZXMgPj4+IDI5O1xuICAgIGJsb2Nrc1sxNV0gPSB0aGlzLmJ5dGVzIDw8IDM7XG4gICAgdGhpcy5oYXNoKCk7XG4gIH07XG5cbiAgU2hhMjU2LnByb3RvdHlwZS5oYXNoID0gZnVuY3Rpb24gKCkge1xuICAgIHZhciBhID0gdGhpcy5oMCwgYiA9IHRoaXMuaDEsIGMgPSB0aGlzLmgyLCBkID0gdGhpcy5oMywgZSA9IHRoaXMuaDQsIGYgPSB0aGlzLmg1LCBnID0gdGhpcy5oNixcbiAgICAgIGggPSB0aGlzLmg3LCBibG9ja3MgPSB0aGlzLmJsb2NrcywgaiwgczAsIHMxLCBtYWosIHQxLCB0MiwgY2gsIGFiLCBkYSwgY2QsIGJjO1xuXG4gICAgZm9yIChqID0gMTY7IGogPCA2NDsgKytqKSB7XG4gICAgICAvLyByaWdodHJvdGF0ZVxuICAgICAgdDEgPSBibG9ja3NbaiAtIDE1XTtcbiAgICAgIHMwID0gKCh0MSA+Pj4gNykgfCAodDEgPDwgMjUpKSBeICgodDEgPj4+IDE4KSB8ICh0MSA8PCAxNCkpIF4gKHQxID4+PiAzKTtcbiAgICAgIHQxID0gYmxvY2tzW2ogLSAyXTtcbiAgICAgIHMxID0gKCh0MSA+Pj4gMTcpIHwgKHQxIDw8IDE1KSkgXiAoKHQxID4+PiAxOSkgfCAodDEgPDwgMTMpKSBeICh0MSA+Pj4gMTApO1xuICAgICAgYmxvY2tzW2pdID0gYmxvY2tzW2ogLSAxNl0gKyBzMCArIGJsb2Nrc1tqIC0gN10gKyBzMSA8PCAwO1xuICAgIH1cblxuICAgIGJjID0gYiAmIGM7XG4gICAgZm9yIChqID0gMDsgaiA8IDY0OyBqICs9IDQpIHtcbiAgICAgIGlmICh0aGlzLmZpcnN0KSB7XG4gICAgICAgIGlmICh0aGlzLmlzMjI0KSB7XG4gICAgICAgICAgYWIgPSAzMDAwMzI7XG4gICAgICAgICAgdDEgPSBibG9ja3NbMF0gLSAxNDEzMjU3ODE5O1xuICAgICAgICAgIGggPSB0MSAtIDE1MDA1NDU5OSA8PCAwO1xuICAgICAgICAgIGQgPSB0MSArIDI0MTc3MDc3IDw8IDA7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgYWIgPSA3MDQ3NTExMDk7XG4gICAgICAgICAgdDEgPSBibG9ja3NbMF0gLSAyMTAyNDQyNDg7XG4gICAgICAgICAgaCA9IHQxIC0gMTUyMTQ4NjUzNCA8PCAwO1xuICAgICAgICAgIGQgPSB0MSArIDE0MzY5NDU2NSA8PCAwO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMuZmlyc3QgPSBmYWxzZTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHMwID0gKChhID4+PiAyKSB8IChhIDw8IDMwKSkgXiAoKGEgPj4+IDEzKSB8IChhIDw8IDE5KSkgXiAoKGEgPj4+IDIyKSB8IChhIDw8IDEwKSk7XG4gICAgICAgIHMxID0gKChlID4+PiA2KSB8IChlIDw8IDI2KSkgXiAoKGUgPj4+IDExKSB8IChlIDw8IDIxKSkgXiAoKGUgPj4+IDI1KSB8IChlIDw8IDcpKTtcbiAgICAgICAgYWIgPSBhICYgYjtcbiAgICAgICAgbWFqID0gYWIgXiAoYSAmIGMpIF4gYmM7XG4gICAgICAgIGNoID0gKGUgJiBmKSBeICh+ZSAmIGcpO1xuICAgICAgICB0MSA9IGggKyBzMSArIGNoICsgS1tqXSArIGJsb2Nrc1tqXTtcbiAgICAgICAgdDIgPSBzMCArIG1hajtcbiAgICAgICAgaCA9IGQgKyB0MSA8PCAwO1xuICAgICAgICBkID0gdDEgKyB0MiA8PCAwO1xuICAgICAgfVxuICAgICAgczAgPSAoKGQgPj4+IDIpIHwgKGQgPDwgMzApKSBeICgoZCA+Pj4gMTMpIHwgKGQgPDwgMTkpKSBeICgoZCA+Pj4gMjIpIHwgKGQgPDwgMTApKTtcbiAgICAgIHMxID0gKChoID4+PiA2KSB8IChoIDw8IDI2KSkgXiAoKGggPj4+IDExKSB8IChoIDw8IDIxKSkgXiAoKGggPj4+IDI1KSB8IChoIDw8IDcpKTtcbiAgICAgIGRhID0gZCAmIGE7XG4gICAgICBtYWogPSBkYSBeIChkICYgYikgXiBhYjtcbiAgICAgIGNoID0gKGggJiBlKSBeICh+aCAmIGYpO1xuICAgICAgdDEgPSBnICsgczEgKyBjaCArIEtbaiArIDFdICsgYmxvY2tzW2ogKyAxXTtcbiAgICAgIHQyID0gczAgKyBtYWo7XG4gICAgICBnID0gYyArIHQxIDw8IDA7XG4gICAgICBjID0gdDEgKyB0MiA8PCAwO1xuICAgICAgczAgPSAoKGMgPj4+IDIpIHwgKGMgPDwgMzApKSBeICgoYyA+Pj4gMTMpIHwgKGMgPDwgMTkpKSBeICgoYyA+Pj4gMjIpIHwgKGMgPDwgMTApKTtcbiAgICAgIHMxID0gKChnID4+PiA2KSB8IChnIDw8IDI2KSkgXiAoKGcgPj4+IDExKSB8IChnIDw8IDIxKSkgXiAoKGcgPj4+IDI1KSB8IChnIDw8IDcpKTtcbiAgICAgIGNkID0gYyAmIGQ7XG4gICAgICBtYWogPSBjZCBeIChjICYgYSkgXiBkYTtcbiAgICAgIGNoID0gKGcgJiBoKSBeICh+ZyAmIGUpO1xuICAgICAgdDEgPSBmICsgczEgKyBjaCArIEtbaiArIDJdICsgYmxvY2tzW2ogKyAyXTtcbiAgICAgIHQyID0gczAgKyBtYWo7XG4gICAgICBmID0gYiArIHQxIDw8IDA7XG4gICAgICBiID0gdDEgKyB0MiA8PCAwO1xuICAgICAgczAgPSAoKGIgPj4+IDIpIHwgKGIgPDwgMzApKSBeICgoYiA+Pj4gMTMpIHwgKGIgPDwgMTkpKSBeICgoYiA+Pj4gMjIpIHwgKGIgPDwgMTApKTtcbiAgICAgIHMxID0gKChmID4+PiA2KSB8IChmIDw8IDI2KSkgXiAoKGYgPj4+IDExKSB8IChmIDw8IDIxKSkgXiAoKGYgPj4+IDI1KSB8IChmIDw8IDcpKTtcbiAgICAgIGJjID0gYiAmIGM7XG4gICAgICBtYWogPSBiYyBeIChiICYgZCkgXiBjZDtcbiAgICAgIGNoID0gKGYgJiBnKSBeICh+ZiAmIGgpO1xuICAgICAgdDEgPSBlICsgczEgKyBjaCArIEtbaiArIDNdICsgYmxvY2tzW2ogKyAzXTtcbiAgICAgIHQyID0gczAgKyBtYWo7XG4gICAgICBlID0gYSArIHQxIDw8IDA7XG4gICAgICBhID0gdDEgKyB0MiA8PCAwO1xuICAgIH1cblxuICAgIHRoaXMuaDAgPSB0aGlzLmgwICsgYSA8PCAwO1xuICAgIHRoaXMuaDEgPSB0aGlzLmgxICsgYiA8PCAwO1xuICAgIHRoaXMuaDIgPSB0aGlzLmgyICsgYyA8PCAwO1xuICAgIHRoaXMuaDMgPSB0aGlzLmgzICsgZCA8PCAwO1xuICAgIHRoaXMuaDQgPSB0aGlzLmg0ICsgZSA8PCAwO1xuICAgIHRoaXMuaDUgPSB0aGlzLmg1ICsgZiA8PCAwO1xuICAgIHRoaXMuaDYgPSB0aGlzLmg2ICsgZyA8PCAwO1xuICAgIHRoaXMuaDcgPSB0aGlzLmg3ICsgaCA8PCAwO1xuICB9O1xuXG4gIFNoYTI1Ni5wcm90b3R5cGUuaGV4ID0gZnVuY3Rpb24gKCkge1xuICAgIHRoaXMuZmluYWxpemUoKTtcblxuICAgIHZhciBoMCA9IHRoaXMuaDAsIGgxID0gdGhpcy5oMSwgaDIgPSB0aGlzLmgyLCBoMyA9IHRoaXMuaDMsIGg0ID0gdGhpcy5oNCwgaDUgPSB0aGlzLmg1LFxuICAgICAgaDYgPSB0aGlzLmg2LCBoNyA9IHRoaXMuaDc7XG5cbiAgICB2YXIgaGV4ID0gSEVYX0NIQVJTWyhoMCA+PiAyOCkgJiAweDBGXSArIEhFWF9DSEFSU1soaDAgPj4gMjQpICYgMHgwRl0gK1xuICAgICAgSEVYX0NIQVJTWyhoMCA+PiAyMCkgJiAweDBGXSArIEhFWF9DSEFSU1soaDAgPj4gMTYpICYgMHgwRl0gK1xuICAgICAgSEVYX0NIQVJTWyhoMCA+PiAxMikgJiAweDBGXSArIEhFWF9DSEFSU1soaDAgPj4gOCkgJiAweDBGXSArXG4gICAgICBIRVhfQ0hBUlNbKGgwID4+IDQpICYgMHgwRl0gKyBIRVhfQ0hBUlNbaDAgJiAweDBGXSArXG4gICAgICBIRVhfQ0hBUlNbKGgxID4+IDI4KSAmIDB4MEZdICsgSEVYX0NIQVJTWyhoMSA+PiAyNCkgJiAweDBGXSArXG4gICAgICBIRVhfQ0hBUlNbKGgxID4+IDIwKSAmIDB4MEZdICsgSEVYX0NIQVJTWyhoMSA+PiAxNikgJiAweDBGXSArXG4gICAgICBIRVhfQ0hBUlNbKGgxID4+IDEyKSAmIDB4MEZdICsgSEVYX0NIQVJTWyhoMSA+PiA4KSAmIDB4MEZdICtcbiAgICAgIEhFWF9DSEFSU1soaDEgPj4gNCkgJiAweDBGXSArIEhFWF9DSEFSU1toMSAmIDB4MEZdICtcbiAgICAgIEhFWF9DSEFSU1soaDIgPj4gMjgpICYgMHgwRl0gKyBIRVhfQ0hBUlNbKGgyID4+IDI0KSAmIDB4MEZdICtcbiAgICAgIEhFWF9DSEFSU1soaDIgPj4gMjApICYgMHgwRl0gKyBIRVhfQ0hBUlNbKGgyID4+IDE2KSAmIDB4MEZdICtcbiAgICAgIEhFWF9DSEFSU1soaDIgPj4gMTIpICYgMHgwRl0gKyBIRVhfQ0hBUlNbKGgyID4+IDgpICYgMHgwRl0gK1xuICAgICAgSEVYX0NIQVJTWyhoMiA+PiA0KSAmIDB4MEZdICsgSEVYX0NIQVJTW2gyICYgMHgwRl0gK1xuICAgICAgSEVYX0NIQVJTWyhoMyA+PiAyOCkgJiAweDBGXSArIEhFWF9DSEFSU1soaDMgPj4gMjQpICYgMHgwRl0gK1xuICAgICAgSEVYX0NIQVJTWyhoMyA+PiAyMCkgJiAweDBGXSArIEhFWF9DSEFSU1soaDMgPj4gMTYpICYgMHgwRl0gK1xuICAgICAgSEVYX0NIQVJTWyhoMyA+PiAxMikgJiAweDBGXSArIEhFWF9DSEFSU1soaDMgPj4gOCkgJiAweDBGXSArXG4gICAgICBIRVhfQ0hBUlNbKGgzID4+IDQpICYgMHgwRl0gKyBIRVhfQ0hBUlNbaDMgJiAweDBGXSArXG4gICAgICBIRVhfQ0hBUlNbKGg0ID4+IDI4KSAmIDB4MEZdICsgSEVYX0NIQVJTWyhoNCA+PiAyNCkgJiAweDBGXSArXG4gICAgICBIRVhfQ0hBUlNbKGg0ID4+IDIwKSAmIDB4MEZdICsgSEVYX0NIQVJTWyhoNCA+PiAxNikgJiAweDBGXSArXG4gICAgICBIRVhfQ0hBUlNbKGg0ID4+IDEyKSAmIDB4MEZdICsgSEVYX0NIQVJTWyhoNCA+PiA4KSAmIDB4MEZdICtcbiAgICAgIEhFWF9DSEFSU1soaDQgPj4gNCkgJiAweDBGXSArIEhFWF9DSEFSU1toNCAmIDB4MEZdICtcbiAgICAgIEhFWF9DSEFSU1soaDUgPj4gMjgpICYgMHgwRl0gKyBIRVhfQ0hBUlNbKGg1ID4+IDI0KSAmIDB4MEZdICtcbiAgICAgIEhFWF9DSEFSU1soaDUgPj4gMjApICYgMHgwRl0gKyBIRVhfQ0hBUlNbKGg1ID4+IDE2KSAmIDB4MEZdICtcbiAgICAgIEhFWF9DSEFSU1soaDUgPj4gMTIpICYgMHgwRl0gKyBIRVhfQ0hBUlNbKGg1ID4+IDgpICYgMHgwRl0gK1xuICAgICAgSEVYX0NIQVJTWyhoNSA+PiA0KSAmIDB4MEZdICsgSEVYX0NIQVJTW2g1ICYgMHgwRl0gK1xuICAgICAgSEVYX0NIQVJTWyhoNiA+PiAyOCkgJiAweDBGXSArIEhFWF9DSEFSU1soaDYgPj4gMjQpICYgMHgwRl0gK1xuICAgICAgSEVYX0NIQVJTWyhoNiA+PiAyMCkgJiAweDBGXSArIEhFWF9DSEFSU1soaDYgPj4gMTYpICYgMHgwRl0gK1xuICAgICAgSEVYX0NIQVJTWyhoNiA+PiAxMikgJiAweDBGXSArIEhFWF9DSEFSU1soaDYgPj4gOCkgJiAweDBGXSArXG4gICAgICBIRVhfQ0hBUlNbKGg2ID4+IDQpICYgMHgwRl0gKyBIRVhfQ0hBUlNbaDYgJiAweDBGXTtcbiAgICBpZiAoIXRoaXMuaXMyMjQpIHtcbiAgICAgIGhleCArPSBIRVhfQ0hBUlNbKGg3ID4+IDI4KSAmIDB4MEZdICsgSEVYX0NIQVJTWyhoNyA+PiAyNCkgJiAweDBGXSArXG4gICAgICAgIEhFWF9DSEFSU1soaDcgPj4gMjApICYgMHgwRl0gKyBIRVhfQ0hBUlNbKGg3ID4+IDE2KSAmIDB4MEZdICtcbiAgICAgICAgSEVYX0NIQVJTWyhoNyA+PiAxMikgJiAweDBGXSArIEhFWF9DSEFSU1soaDcgPj4gOCkgJiAweDBGXSArXG4gICAgICAgIEhFWF9DSEFSU1soaDcgPj4gNCkgJiAweDBGXSArIEhFWF9DSEFSU1toNyAmIDB4MEZdO1xuICAgIH1cbiAgICByZXR1cm4gaGV4O1xuICB9O1xuXG4gIFNoYTI1Ni5wcm90b3R5cGUudG9TdHJpbmcgPSBTaGEyNTYucHJvdG90eXBlLmhleDtcblxuICBTaGEyNTYucHJvdG90eXBlLmRpZ2VzdCA9IGZ1bmN0aW9uICgpIHtcbiAgICB0aGlzLmZpbmFsaXplKCk7XG5cbiAgICB2YXIgaDAgPSB0aGlzLmgwLCBoMSA9IHRoaXMuaDEsIGgyID0gdGhpcy5oMiwgaDMgPSB0aGlzLmgzLCBoNCA9IHRoaXMuaDQsIGg1ID0gdGhpcy5oNSxcbiAgICAgIGg2ID0gdGhpcy5oNiwgaDcgPSB0aGlzLmg3O1xuXG4gICAgdmFyIGFyciA9IFtcbiAgICAgIChoMCA+PiAyNCkgJiAweEZGLCAoaDAgPj4gMTYpICYgMHhGRiwgKGgwID4+IDgpICYgMHhGRiwgaDAgJiAweEZGLFxuICAgICAgKGgxID4+IDI0KSAmIDB4RkYsIChoMSA+PiAxNikgJiAweEZGLCAoaDEgPj4gOCkgJiAweEZGLCBoMSAmIDB4RkYsXG4gICAgICAoaDIgPj4gMjQpICYgMHhGRiwgKGgyID4+IDE2KSAmIDB4RkYsIChoMiA+PiA4KSAmIDB4RkYsIGgyICYgMHhGRixcbiAgICAgIChoMyA+PiAyNCkgJiAweEZGLCAoaDMgPj4gMTYpICYgMHhGRiwgKGgzID4+IDgpICYgMHhGRiwgaDMgJiAweEZGLFxuICAgICAgKGg0ID4+IDI0KSAmIDB4RkYsIChoNCA+PiAxNikgJiAweEZGLCAoaDQgPj4gOCkgJiAweEZGLCBoNCAmIDB4RkYsXG4gICAgICAoaDUgPj4gMjQpICYgMHhGRiwgKGg1ID4+IDE2KSAmIDB4RkYsIChoNSA+PiA4KSAmIDB4RkYsIGg1ICYgMHhGRixcbiAgICAgIChoNiA+PiAyNCkgJiAweEZGLCAoaDYgPj4gMTYpICYgMHhGRiwgKGg2ID4+IDgpICYgMHhGRiwgaDYgJiAweEZGXG4gICAgXTtcbiAgICBpZiAoIXRoaXMuaXMyMjQpIHtcbiAgICAgIGFyci5wdXNoKChoNyA+PiAyNCkgJiAweEZGLCAoaDcgPj4gMTYpICYgMHhGRiwgKGg3ID4+IDgpICYgMHhGRiwgaDcgJiAweEZGKTtcbiAgICB9XG4gICAgcmV0dXJuIGFycjtcbiAgfTtcblxuICBTaGEyNTYucHJvdG90eXBlLmFycmF5ID0gU2hhMjU2LnByb3RvdHlwZS5kaWdlc3Q7XG5cbiAgU2hhMjU2LnByb3RvdHlwZS5hcnJheUJ1ZmZlciA9IGZ1bmN0aW9uICgpIHtcbiAgICB0aGlzLmZpbmFsaXplKCk7XG5cbiAgICB2YXIgYnVmZmVyID0gbmV3IEFycmF5QnVmZmVyKHRoaXMuaXMyMjQgPyAyOCA6IDMyKTtcbiAgICB2YXIgZGF0YVZpZXcgPSBuZXcgRGF0YVZpZXcoYnVmZmVyKTtcbiAgICBkYXRhVmlldy5zZXRVaW50MzIoMCwgdGhpcy5oMCk7XG4gICAgZGF0YVZpZXcuc2V0VWludDMyKDQsIHRoaXMuaDEpO1xuICAgIGRhdGFWaWV3LnNldFVpbnQzMig4LCB0aGlzLmgyKTtcbiAgICBkYXRhVmlldy5zZXRVaW50MzIoMTIsIHRoaXMuaDMpO1xuICAgIGRhdGFWaWV3LnNldFVpbnQzMigxNiwgdGhpcy5oNCk7XG4gICAgZGF0YVZpZXcuc2V0VWludDMyKDIwLCB0aGlzLmg1KTtcbiAgICBkYXRhVmlldy5zZXRVaW50MzIoMjQsIHRoaXMuaDYpO1xuICAgIGlmICghdGhpcy5pczIyNCkge1xuICAgICAgZGF0YVZpZXcuc2V0VWludDMyKDI4LCB0aGlzLmg3KTtcbiAgICB9XG4gICAgcmV0dXJuIGJ1ZmZlcjtcbiAgfTtcblxuICBmdW5jdGlvbiBIbWFjU2hhMjU2KGtleSwgaXMyMjQsIHNoYXJlZE1lbW9yeSkge1xuICAgIHZhciBpLCB0eXBlID0gdHlwZW9mIGtleTtcbiAgICBpZiAodHlwZSA9PT0gJ3N0cmluZycpIHtcbiAgICAgIHZhciBieXRlcyA9IFtdLCBsZW5ndGggPSBrZXkubGVuZ3RoLCBpbmRleCA9IDAsIGNvZGU7XG4gICAgICBmb3IgKGkgPSAwOyBpIDwgbGVuZ3RoOyArK2kpIHtcbiAgICAgICAgY29kZSA9IGtleS5jaGFyQ29kZUF0KGkpO1xuICAgICAgICBpZiAoY29kZSA8IDB4ODApIHtcbiAgICAgICAgICBieXRlc1tpbmRleCsrXSA9IGNvZGU7XG4gICAgICAgIH0gZWxzZSBpZiAoY29kZSA8IDB4ODAwKSB7XG4gICAgICAgICAgYnl0ZXNbaW5kZXgrK10gPSAoMHhjMCB8IChjb2RlID4+IDYpKTtcbiAgICAgICAgICBieXRlc1tpbmRleCsrXSA9ICgweDgwIHwgKGNvZGUgJiAweDNmKSk7XG4gICAgICAgIH0gZWxzZSBpZiAoY29kZSA8IDB4ZDgwMCB8fCBjb2RlID49IDB4ZTAwMCkge1xuICAgICAgICAgIGJ5dGVzW2luZGV4KytdID0gKDB4ZTAgfCAoY29kZSA+PiAxMikpO1xuICAgICAgICAgIGJ5dGVzW2luZGV4KytdID0gKDB4ODAgfCAoKGNvZGUgPj4gNikgJiAweDNmKSk7XG4gICAgICAgICAgYnl0ZXNbaW5kZXgrK10gPSAoMHg4MCB8IChjb2RlICYgMHgzZikpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIGNvZGUgPSAweDEwMDAwICsgKCgoY29kZSAmIDB4M2ZmKSA8PCAxMCkgfCAoa2V5LmNoYXJDb2RlQXQoKytpKSAmIDB4M2ZmKSk7XG4gICAgICAgICAgYnl0ZXNbaW5kZXgrK10gPSAoMHhmMCB8IChjb2RlID4+IDE4KSk7XG4gICAgICAgICAgYnl0ZXNbaW5kZXgrK10gPSAoMHg4MCB8ICgoY29kZSA+PiAxMikgJiAweDNmKSk7XG4gICAgICAgICAgYnl0ZXNbaW5kZXgrK10gPSAoMHg4MCB8ICgoY29kZSA+PiA2KSAmIDB4M2YpKTtcbiAgICAgICAgICBieXRlc1tpbmRleCsrXSA9ICgweDgwIHwgKGNvZGUgJiAweDNmKSk7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICAgIGtleSA9IGJ5dGVzO1xuICAgIH0gZWxzZSB7XG4gICAgICBpZiAodHlwZSA9PT0gJ29iamVjdCcpIHtcbiAgICAgICAgaWYgKGtleSA9PT0gbnVsbCkge1xuICAgICAgICAgIHRocm93IG5ldyBFcnJvcihFUlJPUik7XG4gICAgICAgIH0gZWxzZSBpZiAoQVJSQVlfQlVGRkVSICYmIGtleS5jb25zdHJ1Y3RvciA9PT0gQXJyYXlCdWZmZXIpIHtcbiAgICAgICAgICBrZXkgPSBuZXcgVWludDhBcnJheShrZXkpO1xuICAgICAgICB9IGVsc2UgaWYgKCFBcnJheS5pc0FycmF5KGtleSkpIHtcbiAgICAgICAgICBpZiAoIUFSUkFZX0JVRkZFUiB8fCAhQXJyYXlCdWZmZXIuaXNWaWV3KGtleSkpIHtcbiAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcihFUlJPUik7XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9IGVsc2Uge1xuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoRVJST1IpO1xuICAgICAgfVxuICAgIH1cblxuICAgIGlmIChrZXkubGVuZ3RoID4gNjQpIHtcbiAgICAgIGtleSA9IChuZXcgU2hhMjU2KGlzMjI0LCB0cnVlKSkudXBkYXRlKGtleSkuYXJyYXkoKTtcbiAgICB9XG5cbiAgICB2YXIgb0tleVBhZCA9IFtdLCBpS2V5UGFkID0gW107XG4gICAgZm9yIChpID0gMDsgaSA8IDY0OyArK2kpIHtcbiAgICAgIHZhciBiID0ga2V5W2ldIHx8IDA7XG4gICAgICBvS2V5UGFkW2ldID0gMHg1YyBeIGI7XG4gICAgICBpS2V5UGFkW2ldID0gMHgzNiBeIGI7XG4gICAgfVxuXG4gICAgU2hhMjU2LmNhbGwodGhpcywgaXMyMjQsIHNoYXJlZE1lbW9yeSk7XG5cbiAgICB0aGlzLnVwZGF0ZShpS2V5UGFkKTtcbiAgICB0aGlzLm9LZXlQYWQgPSBvS2V5UGFkO1xuICAgIHRoaXMuaW5uZXIgPSB0cnVlO1xuICAgIHRoaXMuc2hhcmVkTWVtb3J5ID0gc2hhcmVkTWVtb3J5O1xuICB9XG4gIEhtYWNTaGEyNTYucHJvdG90eXBlID0gbmV3IFNoYTI1NigpO1xuXG4gIEhtYWNTaGEyNTYucHJvdG90eXBlLmZpbmFsaXplID0gZnVuY3Rpb24gKCkge1xuICAgIFNoYTI1Ni5wcm90b3R5cGUuZmluYWxpemUuY2FsbCh0aGlzKTtcbiAgICBpZiAodGhpcy5pbm5lcikge1xuICAgICAgdGhpcy5pbm5lciA9IGZhbHNlO1xuICAgICAgdmFyIGlubmVySGFzaCA9IHRoaXMuYXJyYXkoKTtcbiAgICAgIFNoYTI1Ni5jYWxsKHRoaXMsIHRoaXMuaXMyMjQsIHRoaXMuc2hhcmVkTWVtb3J5KTtcbiAgICAgIHRoaXMudXBkYXRlKHRoaXMub0tleVBhZCk7XG4gICAgICB0aGlzLnVwZGF0ZShpbm5lckhhc2gpO1xuICAgICAgU2hhMjU2LnByb3RvdHlwZS5maW5hbGl6ZS5jYWxsKHRoaXMpO1xuICAgIH1cbiAgfTtcblxuICB2YXIgZXhwb3J0cyA9IGNyZWF0ZU1ldGhvZCgpO1xuICBleHBvcnRzLnNoYTI1NiA9IGV4cG9ydHM7XG4gIGV4cG9ydHMuc2hhMjI0ID0gY3JlYXRlTWV0aG9kKHRydWUpO1xuICBleHBvcnRzLnNoYTI1Ni5obWFjID0gY3JlYXRlSG1hY01ldGhvZCgpO1xuICBleHBvcnRzLnNoYTIyNC5obWFjID0gY3JlYXRlSG1hY01ldGhvZCh0cnVlKTtcblxuICBpZiAoQ09NTU9OX0pTKSB7XG4gICAgbW9kdWxlLmV4cG9ydHMgPSBleHBvcnRzO1xuICB9IGVsc2Uge1xuICAgIHJvb3Quc2hhMjU2ID0gZXhwb3J0cy5zaGEyNTY7XG4gICAgcm9vdC5zaGEyMjQgPSBleHBvcnRzLnNoYTIyNDtcbiAgICBpZiAoQU1EKSB7XG4gICAgICBkZWZpbmUoZnVuY3Rpb24gKCkge1xuICAgICAgICByZXR1cm4gZXhwb3J0cztcbiAgICAgIH0pO1xuICAgIH1cbiAgfVxufSkoKTtcbiIsImV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIF9jbGFzc0NhbGxDaGVjayhpbnN0YW5jZSwgQ29uc3RydWN0b3IpIHtcbiAgaWYgKCEoaW5zdGFuY2UgaW5zdGFuY2VvZiBDb25zdHJ1Y3RvcikpIHtcbiAgICB0aHJvdyBuZXcgVHlwZUVycm9yKFwiQ2Fubm90IGNhbGwgYSBjbGFzcyBhcyBhIGZ1bmN0aW9uXCIpO1xuICB9XG59IiwiaW1wb3J0IHRvUHJvcGVydHlLZXkgZnJvbSBcIi4vdG9Qcm9wZXJ0eUtleS5qc1wiO1xuZnVuY3Rpb24gX2RlZmluZVByb3BlcnRpZXModGFyZ2V0LCBwcm9wcykge1xuICBmb3IgKHZhciBpID0gMDsgaSA8IHByb3BzLmxlbmd0aDsgaSsrKSB7XG4gICAgdmFyIGRlc2NyaXB0b3IgPSBwcm9wc1tpXTtcbiAgICBkZXNjcmlwdG9yLmVudW1lcmFibGUgPSBkZXNjcmlwdG9yLmVudW1lcmFibGUgfHwgZmFsc2U7XG4gICAgZGVzY3JpcHRvci5jb25maWd1cmFibGUgPSB0cnVlO1xuICAgIGlmIChcInZhbHVlXCIgaW4gZGVzY3JpcHRvcikgZGVzY3JpcHRvci53cml0YWJsZSA9IHRydWU7XG4gICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KHRhcmdldCwgdG9Qcm9wZXJ0eUtleShkZXNjcmlwdG9yLmtleSksIGRlc2NyaXB0b3IpO1xuICB9XG59XG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBfY3JlYXRlQ2xhc3MoQ29uc3RydWN0b3IsIHByb3RvUHJvcHMsIHN0YXRpY1Byb3BzKSB7XG4gIGlmIChwcm90b1Byb3BzKSBfZGVmaW5lUHJvcGVydGllcyhDb25zdHJ1Y3Rvci5wcm90b3R5cGUsIHByb3RvUHJvcHMpO1xuICBpZiAoc3RhdGljUHJvcHMpIF9kZWZpbmVQcm9wZXJ0aWVzKENvbnN0cnVjdG9yLCBzdGF0aWNQcm9wcyk7XG4gIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShDb25zdHJ1Y3RvciwgXCJwcm90b3R5cGVcIiwge1xuICAgIHdyaXRhYmxlOiBmYWxzZVxuICB9KTtcbiAgcmV0dXJuIENvbnN0cnVjdG9yO1xufSIsImltcG9ydCB0b1Byb3BlcnR5S2V5IGZyb20gXCIuL3RvUHJvcGVydHlLZXkuanNcIjtcbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIF9kZWZpbmVQcm9wZXJ0eShvYmosIGtleSwgdmFsdWUpIHtcbiAga2V5ID0gdG9Qcm9wZXJ0eUtleShrZXkpO1xuICBpZiAoa2V5IGluIG9iaikge1xuICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShvYmosIGtleSwge1xuICAgICAgdmFsdWU6IHZhbHVlLFxuICAgICAgZW51bWVyYWJsZTogdHJ1ZSxcbiAgICAgIGNvbmZpZ3VyYWJsZTogdHJ1ZSxcbiAgICAgIHdyaXRhYmxlOiB0cnVlXG4gICAgfSk7XG4gIH0gZWxzZSB7XG4gICAgb2JqW2tleV0gPSB2YWx1ZTtcbiAgfVxuICByZXR1cm4gb2JqO1xufSIsImltcG9ydCBfdHlwZW9mIGZyb20gXCIuL3R5cGVvZi5qc1wiO1xuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gX3RvUHJpbWl0aXZlKGlucHV0LCBoaW50KSB7XG4gIGlmIChfdHlwZW9mKGlucHV0KSAhPT0gXCJvYmplY3RcIiB8fCBpbnB1dCA9PT0gbnVsbCkgcmV0dXJuIGlucHV0O1xuICB2YXIgcHJpbSA9IGlucHV0W1N5bWJvbC50b1ByaW1pdGl2ZV07XG4gIGlmIChwcmltICE9PSB1bmRlZmluZWQpIHtcbiAgICB2YXIgcmVzID0gcHJpbS5jYWxsKGlucHV0LCBoaW50IHx8IFwiZGVmYXVsdFwiKTtcbiAgICBpZiAoX3R5cGVvZihyZXMpICE9PSBcIm9iamVjdFwiKSByZXR1cm4gcmVzO1xuICAgIHRocm93IG5ldyBUeXBlRXJyb3IoXCJAQHRvUHJpbWl0aXZlIG11c3QgcmV0dXJuIGEgcHJpbWl0aXZlIHZhbHVlLlwiKTtcbiAgfVxuICByZXR1cm4gKGhpbnQgPT09IFwic3RyaW5nXCIgPyBTdHJpbmcgOiBOdW1iZXIpKGlucHV0KTtcbn0iLCJpbXBvcnQgX3R5cGVvZiBmcm9tIFwiLi90eXBlb2YuanNcIjtcbmltcG9ydCB0b1ByaW1pdGl2ZSBmcm9tIFwiLi90b1ByaW1pdGl2ZS5qc1wiO1xuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gX3RvUHJvcGVydHlLZXkoYXJnKSB7XG4gIHZhciBrZXkgPSB0b1ByaW1pdGl2ZShhcmcsIFwic3RyaW5nXCIpO1xuICByZXR1cm4gX3R5cGVvZihrZXkpID09PSBcInN5bWJvbFwiID8ga2V5IDogU3RyaW5nKGtleSk7XG59IiwiZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gX3R5cGVvZihvYmopIHtcbiAgXCJAYmFiZWwvaGVscGVycyAtIHR5cGVvZlwiO1xuXG4gIHJldHVybiBfdHlwZW9mID0gXCJmdW5jdGlvblwiID09IHR5cGVvZiBTeW1ib2wgJiYgXCJzeW1ib2xcIiA9PSB0eXBlb2YgU3ltYm9sLml0ZXJhdG9yID8gZnVuY3Rpb24gKG9iaikge1xuICAgIHJldHVybiB0eXBlb2Ygb2JqO1xuICB9IDogZnVuY3Rpb24gKG9iaikge1xuICAgIHJldHVybiBvYmogJiYgXCJmdW5jdGlvblwiID09IHR5cGVvZiBTeW1ib2wgJiYgb2JqLmNvbnN0cnVjdG9yID09PSBTeW1ib2wgJiYgb2JqICE9PSBTeW1ib2wucHJvdG90eXBlID8gXCJzeW1ib2xcIiA6IHR5cGVvZiBvYmo7XG4gIH0sIF90eXBlb2Yob2JqKTtcbn0iLCIvLyBUaGUgbW9kdWxlIGNhY2hlXG52YXIgX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fID0ge307XG5cbi8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG5mdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuXHR2YXIgY2FjaGVkTW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXTtcblx0aWYgKGNhY2hlZE1vZHVsZSAhPT0gdW5kZWZpbmVkKSB7XG5cdFx0cmV0dXJuIGNhY2hlZE1vZHVsZS5leHBvcnRzO1xuXHR9XG5cdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG5cdHZhciBtb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdID0ge1xuXHRcdC8vIG5vIG1vZHVsZS5pZCBuZWVkZWRcblx0XHQvLyBubyBtb2R1bGUubG9hZGVkIG5lZWRlZFxuXHRcdGV4cG9ydHM6IHt9XG5cdH07XG5cblx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG5cdF9fd2VicGFja19tb2R1bGVzX19bbW9kdWxlSWRdKG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG5cdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG5cdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbn1cblxuIiwiX193ZWJwYWNrX3JlcXVpcmVfXy5hbWRPID0ge307IiwiLy8gZ2V0RGVmYXVsdEV4cG9ydCBmdW5jdGlvbiBmb3IgY29tcGF0aWJpbGl0eSB3aXRoIG5vbi1oYXJtb255IG1vZHVsZXNcbl9fd2VicGFja19yZXF1aXJlX18ubiA9IChtb2R1bGUpID0+IHtcblx0dmFyIGdldHRlciA9IG1vZHVsZSAmJiBtb2R1bGUuX19lc01vZHVsZSA/XG5cdFx0KCkgPT4gKG1vZHVsZVsnZGVmYXVsdCddKSA6XG5cdFx0KCkgPT4gKG1vZHVsZSk7XG5cdF9fd2VicGFja19yZXF1aXJlX18uZChnZXR0ZXIsIHsgYTogZ2V0dGVyIH0pO1xuXHRyZXR1cm4gZ2V0dGVyO1xufTsiLCIvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9ucyBmb3IgaGFybW9ueSBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSAoZXhwb3J0cywgZGVmaW5pdGlvbikgPT4ge1xuXHRmb3IodmFyIGtleSBpbiBkZWZpbml0aW9uKSB7XG5cdFx0aWYoX193ZWJwYWNrX3JlcXVpcmVfXy5vKGRlZmluaXRpb24sIGtleSkgJiYgIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBrZXkpKSB7XG5cdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywga2V5LCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZGVmaW5pdGlvbltrZXldIH0pO1xuXHRcdH1cblx0fVxufTsiLCJfX3dlYnBhY2tfcmVxdWlyZV9fLmcgPSAoZnVuY3Rpb24oKSB7XG5cdGlmICh0eXBlb2YgZ2xvYmFsVGhpcyA9PT0gJ29iamVjdCcpIHJldHVybiBnbG9iYWxUaGlzO1xuXHR0cnkge1xuXHRcdHJldHVybiB0aGlzIHx8IG5ldyBGdW5jdGlvbigncmV0dXJuIHRoaXMnKSgpO1xuXHR9IGNhdGNoIChlKSB7XG5cdFx0aWYgKHR5cGVvZiB3aW5kb3cgPT09ICdvYmplY3QnKSByZXR1cm4gd2luZG93O1xuXHR9XG59KSgpOyIsIl9fd2VicGFja19yZXF1aXJlX18ubyA9IChvYmosIHByb3ApID0+IChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqLCBwcm9wKSkiLCIvLyBkZWZpbmUgX19lc01vZHVsZSBvbiBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLnIgPSAoZXhwb3J0cykgPT4ge1xuXHRpZih0eXBlb2YgU3ltYm9sICE9PSAndW5kZWZpbmVkJyAmJiBTeW1ib2wudG9TdHJpbmdUYWcpIHtcblx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgU3ltYm9sLnRvU3RyaW5nVGFnLCB7IHZhbHVlOiAnTW9kdWxlJyB9KTtcblx0fVxuXHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7IHZhbHVlOiB0cnVlIH0pO1xufTsiLCJpbXBvcnQgU2ltcGxlS2V5Y2xvYWsgZnJvbSAnLi9zaW1wbGVLZXljbG9hayc7XG5pbXBvcnQge2RlY29kZVRva2VuLCBpc1Rva2VuRXhwaXJlZH0gZnJvbSAnLi9rZXljbG9ha1V0aWxzJztcblxuZXhwb3J0IHsgZGVjb2RlVG9rZW4sIGlzVG9rZW5FeHBpcmVkLCBTaW1wbGVLZXljbG9hayB9O1xuIl0sIm5hbWVzIjpbIktFWUNMT0FLX0NBTExCQUNLX1BSRUZJWCIsIlRPS0VOX1NUT1JBR0VfTkFNRSIsImNsZWFyRXhwaXJlZCIsImtleWNsb2FrQ2FsbGJhY2tQcmVmaXgiLCJ0aW1lIiwiRGF0ZSIsImdldFRpbWUiLCJpIiwibG9jYWxTdG9yYWdlIiwibGVuZ3RoIiwia2V5IiwiaW5kZXhPZiIsInZhbHVlIiwiZ2V0SXRlbSIsImV4cGlyZXMiLCJKU09OIiwicGFyc2UiLCJyZW1vdmVJdGVtIiwiZXJyIiwiTG9jYWxTdG9yYWdlIiwiX2NyZWF0ZUNsYXNzIiwiX3RoaXMiLCJfY2xhc3NDYWxsQ2hlY2siLCJfZGVmaW5lUHJvcGVydHkiLCJzdGF0ZSIsImNvbmNhdCIsInN0YXRlRGF0YSIsInNldEl0ZW0iLCJzdHJpbmdpZnkiLCJjb29raWVFeHBpcmF0aW9uIiwibWludXRlcyIsImV4cCIsInNldFRpbWUiLCJnZXRDb29raWUiLCJuYW1lIiwiY2EiLCJkb2N1bWVudCIsImNvb2tpZSIsInNwbGl0IiwiYyIsImNoYXJBdCIsInN1YnN0cmluZyIsInNldENvb2tpZSIsImV4cGlyYXRpb25EYXRlIiwidG9VVENTdHJpbmciLCJDb29raWVTdG9yYWdlIiwiX3RoaXMyIiwiY3JlYXRlQ2FsbGJhY2tTdG9yYWdlIiwiTG9jYWxUb2tlblN0b3JhZ2UiLCJ0b2tlblN0b3JhZ2VOYW1lIiwiX3RoaXMzIiwiZGF0YSIsIkNvb2tpZVRva2VuU3RvcmFnZSIsIl90aGlzNCIsImNyZWF0ZVRva2VuU3RvcmFnZSIsImFyZ3VtZW50cyIsInVuZGVmaW5lZCIsInNoYTI1NiIsImJhc2U2NEpzIiwiZ2VuZXJhdGVSYW5kb21EYXRhIiwibGVuIiwiYXJyYXkiLCJBcnJheSIsImoiLCJNYXRoIiwiZmxvb3IiLCJyYW5kb20iLCJnZW5lcmF0ZVJhbmRvbVN0cmluZyIsImFscGhhYmV0IiwicmFuZG9tRGF0YSIsImNoYXJzIiwiY2hhckNvZGVBdCIsIlN0cmluZyIsImZyb21DaGFyQ29kZSIsImFwcGx5IiwiZ2VuZXJhdGVDb2RlVmVyaWZpZXIiLCJnZW5lcmF0ZVBrY2VDaGFsbGVuZ2UiLCJjb2RlVmVyaWZpZXIiLCJoYXNoQnl0ZXMiLCJVaW50OEFycmF5IiwiYXJyYXlCdWZmZXIiLCJlbmNvZGVkSGFzaCIsImZyb21CeXRlQXJyYXkiLCJyZXBsYWNlIiwiY3JlYXRlVVVJRCIsImhleERpZ2l0cyIsInMiLCJzdGFydCIsInV1aWQiLCJqb2luIiwiYnVpbGRDbGFpbXNQYXJhbWV0ZXIiLCJyZXF1ZXN0ZWRBY3IiLCJpZF90b2tlbiIsImFjciIsInBhcnNlQ2FsbGJhY2tQYXJhbXMiLCJwYXJhbXNTdHJpbmciLCJzdXBwb3J0ZWRQYXJhbXMiLCJwIiwicmVzdWx0Iiwib2F1dGhQYXJhbXMiLCJzbGljZSIsInBhcnNlQ2FsbGJhY2tVcmwiLCJ1cmwiLCJxdWVyeUluZGV4IiwiZnJhZ21lbnRJbmRleCIsIm5ld1VybCIsInBhcnNlZCIsImNvZGUiLCJlcnJvciIsImRlY29kZVRva2VuIiwic3RyIiwiZGVjb2RlVVJJQ29tcG9uZW50IiwiZW5jb2RlVVJJQ29tcG9uZW50Iiwid2luZG93IiwiYXRvYiIsImlzVG9rZW5FeHBpcmVkIiwidG9rZW5EYXRhIiwibWluVmFsaWRpdHkiLCJ0aW1lU2tldyIsImV4cGlyZXNJbiIsInRva2VuX3BhcnNlZCIsImNlaWwiLCJTaW1wbGVLZXljbG9hayIsImNvbmZpZyIsInJlYWxtIiwiZXhjaGFuZ2VDb2RlIiwidmVyaWZ5VG9rZW4iLCJzZXRJbml0aWFsaXplZCIsInJlYWxtVXJsIiwiZ2V0UmVhbG1VcmwiLCJhdXRob3JpemF0aW9uX2VuZHBvaW50IiwiZW5kX3Nlc3Npb25fZW5kcG9pbnQiLCJjYWxsYmFja1N0b3JhZ2UiLCJ0b2tlblN0b3JhZ2UiLCJzZWxmIiwicHJvY2Vzc0luaXQiLCJfcmVmIiwicmVkaXJlY3RVcmkiLCJub25jZSIsImNhbGxiYWNrU3RhdGUiLCJjbGllbnRJZCIsInJlc3BvbnNlTW9kZSIsInJlc3BvbnNlVHlwZSIsInNjb3BlIiwicGtjZUNvZGVWZXJpZmllciIsInBrY2VDaGFsbGVuZ2UiLCJhZGQiLCJvcHRpb25zIiwibG9jYXRpb24iLCJhc3NpZ24iLCJjcmVhdGVMb2dpblVybCIsIl9yZWYyIiwiaWRUb2tlbiIsInJlbW92ZSIsImNyZWF0ZUxvZ291dFVybCIsIm9hdXRoIiwib2F1dGhTdGF0ZSIsImdldCIsInZhbGlkIiwic3RvcmVkTm9uY2UiLCJ0aW1lTG9jYWwiLCJfb2JqZWN0U3ByZWFkIiwicmVmcmVzaF90b2tlbiIsInJlZnJlc2hfdG9rZW5fcGFyc2VkIiwiaWRfdG9rZW5fcGFyc2VkIiwiYWNjZXNzX3Rva2VuIiwiYXV0aGVudGljYXRlZCIsImlhdCIsInNldFRva2VuIiwicGFyc2VDYWxsYmFjayIsImhyZWYiLCJoaXN0b3J5IiwicmVwbGFjZVN0YXRlIiwicHJvY2Vzc0NhbGxiYWNrIl0sInNvdXJjZVJvb3QiOiIifQ==