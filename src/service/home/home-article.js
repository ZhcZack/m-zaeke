import store from '@/store';
import { formatArticleInfomation, log } from '@/lib/lib';

/**
 * 得到个人中心的对应ID作者的全部文章
 * @param userID 作者ID
 * @returns {Promise<Response | never>}
 */
export function homeArticles(userID) {
  return fetch(`${store.state.globalIp}/main/user_detail?id=${userID}`)
    .then(result => result.json())
    .then(json => {
      return json.code === 1 ? {
        status: true,
        articles: json.data.article_list.map(article => formatArticleInfomation(article))
      } : {
        status: false,
        message: json.message
      };
    })
    .catch(error => log(error));
}