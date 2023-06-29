import {sha256} from 'js-sha256';
import * as base64Js from 'base64-js';

const generateRandomData = (len) => {
  const array = new Array(len);
  for (let j = 0; j < array.length; j++) {
    array[j] = Math.floor(256 * Math.random());
  }
  return array;
}

const generateRandomString = (len, alphabet) => {
  const randomData = generateRandomData(len);
  const chars = new Array(len);
  for (let i = 0; i < len; i++) {
    chars[i] = alphabet.charCodeAt(randomData[i] % alphabet.length);
  }
  return String.fromCharCode.apply(null, chars);
}

const generateCodeVerifier = (len) => {
  return generateRandomString(len, 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789');
}

const generatePkceChallenge = (codeVerifier) => {
      const hashBytes = new Uint8Array(sha256.arrayBuffer(codeVerifier));
      const encodedHash = base64Js.fromByteArray(hashBytes)
        .replace(/\+/g, '-')
        .replace(/\//g, '_')
        .replace(/\=/g, '');
      return encodedHash;
}

const createUUID = () => {
  const hexDigits = '0123456789abcdef';
  const s = generateRandomString(36, hexDigits).split("");
  s[14] = '4';
  // s[19] = hexDigits.substr((s[19] & 0x3) | 0x8, 1);
  const start = (s[19] & 0x3) | 0x8;
  s[19] = hexDigits.substring(start, start+1);
  s[8] = s[13] = s[18] = s[23] = '-';
  const uuid = s.join('');
  return uuid;
}

const buildClaimsParameter = (requestedAcr) => JSON.stringify({
  id_token: {
    acr: requestedAcr
  }
});

const parseCallbackParams = (paramsString, supportedParams) => {
  const p = paramsString.split('&');
  const result = {
    paramsString: '',
    oauthParams: {}
  };
  for (let i = 0; i < p.length; i++) {
    const split = p[i].indexOf("=");
    const key = p[i].slice(0, split);
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
}

const parseCallbackUrl = (url) => {
  const supportedParams = ['code', 'state', 'session_state', 'error', 'error_description', 'error_uri'];
  // если приходит ошибка то кейклоку все равно какой запрос возвращает аттрибуты после знака вопросика
  const queryIndex = url.indexOf('?');
  const fragmentIndex = url.indexOf('#');
  let newUrl;
  let parsed;
  if (fragmentIndex !== -1) {
    newUrl = url.substring(0, fragmentIndex);
    parsed = parseCallbackParams(url.substring(fragmentIndex + 1), supportedParams);
    if (parsed.paramsString !== '') {
      newUrl += '#' + parsed.paramsString;
    }
  }else if(fragmentIndex === -1 && queryIndex !== -1){
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

}

const decodeToken = (str) => {
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
}

const isTokenExpired = function(tokenData, minValidity=5) {
  if (tokenData.timeSkew == null) {
    return true;
  }

  let expiresIn = tokenData.token_parsed['exp'] - Math.ceil(new Date().getTime() / 1000) + tokenData.timeSkew;
  expiresIn -= minValidity;
  return expiresIn < 0;
};


export {
  buildClaimsParameter,
  generateCodeVerifier,
  generatePkceChallenge,
  createUUID,
  parseCallbackUrl,
  decodeToken,
  isTokenExpired,
};
