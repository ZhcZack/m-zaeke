import { log } from '@/lib/lib';
import store from '@/store';

export function getIdentifierCode(phone) {
  return fetch(`${store.state.globalIp}/main/sendmsm?phone=${phone}`)
    .then(result => result.json())
    .then(json => {
      return json.code === 1 ? {
        success: true,
        message: json.message
      } : {
        success: false,
        message: json.message
      };
    })
    .catch(error => log(error));
}

export function registerNewUser(username = '', password = '', phone = '', code = '') {
  return fetch(`${store.state.globalIp}/user/register`, {
    method: 'post',
    mode: 'cors',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({account: username, password, phone, code})
  }).then(response => response.json()).then(result => {
    if (result.code === 1) {
      return {
        success: true,
        message: '注册成功'
      };
    } else if (result.code === 4) {
      return {
        success: false,
        message: '该手机已经绑定过知客账号，请更换手机'
      };
    } else {
      return {
        success: false,
        message: result.message
      };
    }
  }).catch(error => log(error));
}