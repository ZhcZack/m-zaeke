import store from '@/store';
import { formatArticleInfomation, log } from '@/lib/lib';

export function industryNews(skipnum = 0, length = 10) {
  return fetch(`${store.state.globalIp}/main/column_detail?skipnum=${skipnum}&length=${length}&id=11`)
    .then(response => response.json()).then(json => {
      if (json.code === 1) {
        return json.data.article_list.map(article => formatArticleInfomation(article));
      } else {
        return null;
      }
    })
    .catch(error => log(error));
}