import store from '../store';
import { log } from '../lib/lib';

/**
 * 拿到用户账号详情
 *
 * @param account 用户名
 * @param token token
 * @returns {Promise<Response | never>}
 */
export function userInfo(account, token) {
  return fetch(`${store.state.globalIp}/user/info?account=${account}&token=${token}`)
    .then(response => response.json()).then(result => {
      if (result.code === 1) {
        return {
          status: true,
          info: result.data
        };
      } else {
        return {
          status: false,
          message: result.message
        };
      }
    })
    .catch(error => log(error));
}

export function userDetail(userID) {
  return fetch(`${store.state.globalIp}/main/user_detail?id=${userID}`)
    .then(result => result.json())
    .then(json => {
      if (json.code === 1) {
        return {
          status: true,
          detail: json.data
        };
      } else {
        return {
          status: false,
          message: json.message
        };
      }
    })
    .catch(error => log(error));
}

/**
 * 得到用户的等级
 * @param userID 用户ID
 * @returns {Promise<Response | never>} 用户等级
 */
export function userLevel(userID) {
  return fetch(`${store.state.globalIp}/main/user_level?id=${userID}`)
    .then(result => result.json())
    .then(json => {
      return (json.code === 1) ? {
        status: true,
        level: Number(json.data.type)
      } : {
        status: false,
        message: json.message
      };
    })
    .catch(error => log(error));
}

/**
 * 返回VIP用户的资料
 * @param vipID VIP用户ID
 * @returns {Promise<Response | never>}
 */
export function vipDetail(vipID) {
  return fetch(`${store.state.globalIp}/main/vip_detail?id=${vipID}`)
    .then(result => result.json())
    .then(json => {
      return json.code === 1 ? {
        success: true,
        detail: {
          id: json.data.id,
          nickname: json.data.nickname,
          img: json.data.img,
          cover: json.data.cover,
          mark: json.data.mark,
          total: json.data.article_total
        }
      } : {
        success: false,
        message: json.message
      };
    })
    .catch(error => log(error));
}