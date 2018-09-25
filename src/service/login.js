import store from '../store';
import { log } from '../lib/lib';
import { userInfo } from '@/service/user';
// import { userInfo } from '@/service/user';

/**
 * 用户登录
 *
 * 返回一个promise，包含得到的登录账号信息（account，token）
 * @param username 用户名
 * @param password 密码
 * @returns {Promise<Response>}
 */
export function userLogin(username, password) {
  let ip = store.state.globalIp;
  return fetch(`${ip}/user/login`, {
    method: 'POST',
    mode: 'cors',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({account: username, password})
  }).then(response => response.json()).then(result => {
    log(result);
    if (result.code === 1) {
      store.commit('updateAccountInfo', result.data);
        return userInfo(result.data.account, result.data.token).then(result => {
          if (result.status) {
            store.commit('updateUserInfo', result.info);
            return {
              status: true
            };
          } else {
            return {
              status: false,
              message: result.message
            };
          }
        });
    } else {
      return {
        status: false,
        message: result.message
      };
    }
  }).catch(error => log(error));

}

/**
 * 退出登录
 *
 * 调用store里的logout，清除保存的账号内容。
 */
export function userLogout() {
  this.$store.commit('userLogout');
}