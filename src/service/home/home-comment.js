import store from '@/store';
import { log } from '@/lib/lib';

/**
 * 得到个人中心作者的评论
 * @param userID 作者ID
 * @returns {Promise<Response | never>}
 */
export function homeComments(userID) {
  return fetch(`${store.state.globalIp}/main/user_comment_list?id=${userID}`)
    .then(result => result.json())
    .then(json => {
      return json.code === 1 ? {
        status: true,
        comments: json.data.list
      } : {
        status: false,
        message: json.message
      };
    })
    .catch(error => log(error));
}