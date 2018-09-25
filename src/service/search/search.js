import store from '@/store';
import { log } from '@/lib/lib';

/**
 * 得到与关键字相关的所有文章
 * @param keyword 搜索关键字
 * @param skipnum 跳过的搜索条数
 * @param length 单次搜索的结果数
 * @returns {Promise<Response | never>}
 */
export function articles(keyword = '', skipnum = 0, length = 10) {
  return fetch(`${store.state.globalIp}/main/search?keyword=${keyword}&skipnum=${skipnum}&length=${length}`)
    .then(result => result.json())
    .then(json => {
      return json.code === 1 ? {
        status: true,
        articles: json.data.article_list,
        total: json.data.article_total
      } : {
        status: false,
        message: json.message
      };
    })
    .catch(error => log(error));
}

/**
 * 得到与关键字相关的所有评论（这个API设置skipnum和length是无效的，一次返回所有结果……）
 * @param keyword 搜索关键字
 * @returns {Promise<Response | never>}
 */
export function comments(keyword = '') {
  return fetch(`${store.state.globalIp}/main/search_comment?keyword=${keyword}`)
    .then(result => result.json())
    .then(json => {
      return json.code === 1 ? {
        status: true,
        comments: json.data.comment_list,
        total: json.data.comment_total
      } : {
        status: false,
        message: json.message
      };
    })
    .catch(error => log(error));
}

/**
 * 得到与关键字相关的所有标签（这个API设置skipnum和length是无效的，一次返回所有结果……）
 * @param keyword 搜索关键字
 * @param skipnum 跳过的搜索结果数
 * @param length 单次搜索的结果数
 * @returns {Promise<Response | never>}
 */
export function tags(keyword = '', skipnum = 0, length = 100) {
  return fetch(`${store.state.globalIp}/main/search_tag?keyword=${keyword}&skipnum=${skipnum}&length=${length}`)
    .then(result => result.json())
    .then(json => {
      return json.code === 1 ? {
        status: true,
        tags: json.data.tag_list
      } : {
        status: false,
        message: json.message
      };
    })
    .catch(error => log(error));
}