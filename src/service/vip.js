import store from '@/store';
import { formatArticleInfomation, log } from '@/lib/lib';

export function vipArticles(vipID, skipnum = 0, length = 10) {
  return fetch(`${store.state.globalIp}/main/vip_detail?id=${vipID}&skipnum=${skipnum}&length=${length}`)
    .then(result => result.json())
    .then(json => {
      return json.code === 1 ? {
        success: true,
        articles: json.data.article_list.map(article => {
          let result = formatArticleInfomation(article);
          result.authorName = json.data.nickname;
          result.authorImage = json.data.img;
          return result;
        })
      } : {
        success: false,
        message: json.message
      };
    })
    .catch(error => log(error));
}

export function vipComments(vipID, skipnum = 0, length = 10) {
  return fetch(`${store.state.globalIp}/main/vip_comment_list?id=${vipID}&skipnum=${skipnum}&length=${length}`)
    .then(result => result.json())
    .then(json => {
      return json.code === 1 ? {
        success: true,
        comments: json.data.list
      } : {
        success: false,
        message: json.message
      };
    })
    .catch(error => log(error));
}

export function vipThumbs(vipID, skipnum = 0, length = 10) {
  return fetch(`${store.state.globalIp}/main/vip_thumb_list?id=${vipID}&skipnum=${skipnum}&length=${length}`)
    .then(result => result.json())
    .then(json => {
      return json.code === 1 ? {
        success: true,
        thumbs: json.data.list.map(thumb => formatArticleInfomation(thumb))
      } : {
        success: false,
        message: json.message
      };
    })
    .catch(error => log(error));
}

export function vipAmass(vipID, skipnum = 0, length = 10) {
  return fetch(`${store.state.globalIp}/main/vip_amass_list?id=${vipID}&skipnum=${skipnum}&length=${length}`)
    .then(result => result.json())
    .then(json => {
      return json.code === 1 ? {
        success: true,
        amasses: json.data.list.map(amass => formatArticleInfomation(amass))
      } : {
        success: false,
        message: json.message
      };
    })
    .catch(error => log(error));
}